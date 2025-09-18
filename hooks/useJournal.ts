
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { Trade } from '../types';
import { TradeStatus, TradeType } from '../types';
import { useAuth } from './useAuth';

interface JournalContextType {
    trades: Trade[];
    addTrade: (trade: Omit<Trade, 'id' | 'status'>) => void;
    closeTrade: (tradeId: string, exitData: { exitPrice: number; exitDate: string; exitReason: string }) => void;
    initialCapital: number;
    setInitialCapital: (amount: number) => void;
}

const JournalContext = createContext<JournalContextType | null>(null);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [initialCapital, setInitialCapitalState] = useState<number>(0);
    const { currentUser } = useAuth();
    
    const getStorageKey = useCallback((key: string) => {
      return currentUser ? `journal_${currentUser.username}_${key}` : null;
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) return;
        
        try {
            const tradesKey = getStorageKey('trades');
            const capitalKey = getStorageKey('capital');

            const storedTrades = tradesKey ? localStorage.getItem(tradesKey) : null;
            if (storedTrades) {
                setTrades(JSON.parse(storedTrades));
            } else {
                setTrades([]);
            }

            const storedCapital = capitalKey ? localStorage.getItem(capitalKey) : null;
            if (storedCapital) {
                setInitialCapitalState(JSON.parse(storedCapital));
            } else {
                setInitialCapitalState(0);
            }
        } catch (error) {
            console.error("Failed to parse data from localStorage", error);
        }
    }, [currentUser, getStorageKey]);

    const saveData = useCallback((newTrades: Trade[], newCapital: number) => {
        if (!currentUser) return;
        const tradesKey = getStorageKey('trades');
        const capitalKey = getStorageKey('capital');
        
        if (tradesKey) localStorage.setItem(tradesKey, JSON.stringify(newTrades));
        if (capitalKey) localStorage.setItem(capitalKey, JSON.stringify(newCapital));

        setTrades(newTrades);
        setInitialCapitalState(newCapital);
    }, [currentUser, getStorageKey]);

    const addTrade = useCallback((tradeData: Omit<Trade, 'id' | 'status'>) => {
        const newTrade: Trade = {
            ...tradeData,
            id: new Date().toISOString() + Math.random(),
            status: TradeStatus.Open,
        };
        const newTrades = [...trades, newTrade];
        saveData(newTrades, initialCapital);
    }, [trades, initialCapital, saveData]);

    const closeTrade = useCallback((tradeId: string, exitData: { exitPrice: number; exitDate: string; exitReason: string }) => {
        const newTrades = trades.map(trade => {
            if (trade.id === tradeId) {
                const pnl = (exitData.exitPrice - trade.entryPrice) * trade.quantity * (trade.tradeType === TradeType.Buy ? 1 : -1);
                return {
                    ...trade,
                    status: TradeStatus.Closed,
                    exitPrice: exitData.exitPrice,
                    exitDate: exitData.exitDate,
                    exitReason: exitData.exitReason,
                    pnl: pnl,
                };
            }
            return trade;
        });
        saveData(newTrades, initialCapital);
    }, [trades, initialCapital, saveData]);

    const setInitialCapital = (amount: number) => {
        saveData(trades, amount);
    };

    // FIX: Replaced JSX with React.createElement because .ts files do not support JSX syntax.
    return React.createElement(JournalContext.Provider, { value: { trades, addTrade, closeTrade, initialCapital, setInitialCapital } }, children);
};

export const useJournal = () => {
    const context = useContext(JournalContext);
    if (!context) {
        throw new Error('useJournal must be used within a JournalProvider');
    }
    return context;
};
