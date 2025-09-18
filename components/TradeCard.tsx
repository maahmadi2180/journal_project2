
import React from 'react';
import type { Trade } from '../types';
import { TradeStatus, TradeType } from '../types';

interface TradeCardProps {
    trade: Trade;
    onAction?: () => void;
    actionLabel?: string;
}

export const TradeCard: React.FC<TradeCardProps> = ({ trade, onAction, actionLabel }) => {
    const isBuy = trade.tradeType === TradeType.Buy;
    const isClosed = trade.status === TradeStatus.Closed;
    const pnl = trade.pnl || 0;
    const isProfit = pnl > 0;
    
    return (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 shadow-md hover:border-emerald-500 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isBuy ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {trade.tradeType}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-2">{trade.symbol}</h4>
                </div>
                {isClosed && (
                     <div className={`text-lg font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                        {pnl.toFixed(2)}
                     </div>
                )}
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-300 mb-3">
                <div className="flex justify-between"><span className="text-gray-400">تاریخ ورود:</span> <strong>{trade.entryDate}</strong></div>
                <div className="flex justify-between"><span className="text-gray-400">قیمت ورود:</span> <strong>{trade.entryPrice}</strong></div>
                {isClosed && (
                    <>
                        <div className="flex justify-between"><span className="text-gray-400">تاریخ خروج:</span> <strong>{trade.exitDate}</strong></div>
                        <div className="flex justify-between"><span className="text-gray-400">قیمت خروج:</span> <strong>{trade.exitPrice}</strong></div>
                    </>
                )}
                <div className="flex justify-between"><span className="text-gray-400">تعداد:</span> <strong>{trade.quantity}</strong></div>
            </div>

            <div className="text-sm space-y-2 mt-4 border-t border-gray-700 pt-3">
                <p><strong className="text-gray-400">دلیل ورود:</strong> {trade.entryReason}</p>
                {isClosed && trade.exitReason && <p><strong className="text-gray-400">دلیل خروج:</strong> {trade.exitReason}</p>}
            </div>

            {onAction && actionLabel && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onAction}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 text-sm rounded-lg transition-colors"
                    >
                        {actionLabel}
                    </button>
                </div>
            )}
        </div>
    );
};
