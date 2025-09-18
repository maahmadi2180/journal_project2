import React, { useState, useMemo } from 'react';
import { useJournal } from '../hooks/useJournal';
import type { Trade } from '../types';
import { TradeStatus } from '../types';
import Header from './Header';
import NewTradeForm from './NewTradeForm';
import CloseTradeModal from './CloseTradeModal';
import AnalysisModal from './AnalysisModal';
import { analyzeJournal } from '../services/geminiService';
import { DollarSignIcon, BrainCircuitIcon } from './icons';
import { TradeCard } from './TradeCard';
import { useApiKey } from '../hooks/useApiKey';
import ApiKeyModal from './ApiKeyModal';
import PerformanceChart from './PerformanceChart';

const JournalDashboard: React.FC = () => {
    const { trades, initialCapital, setInitialCapital } = useJournal();
    const [tradeToClose, setTradeToClose] = useState<Trade | null>(null);
    const [isAnalysisModalOpen, setAnalysisModalOpen] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { apiKey } = useApiKey();
    const [isApiKeyModalOpen, setApiKeyModalOpen] = useState(false);


    const { openTrades, closedTrades, totalPnl, winRate, totalTrades, chartData } = useMemo(() => {
        const open = trades.filter(t => t.status === TradeStatus.Open);
        const closed = trades.filter(t => t.status === TradeStatus.Closed);
        
        const pnl = closed.reduce((acc, trade) => acc + (trade.pnl || 0), 0);
        
        const wins = closed.filter(t => (t.pnl || 0) > 0).length;
        const totalClosed = closed.length;
        const rate = totalClosed > 0 ? (wins / totalClosed) * 100 : 0;
        
        let cumulativePnl = 0;
        const sortedClosedTrades = closed
            .slice()
            .sort((a, b) => (a.exitDate || '').localeCompare(b.exitDate || ''));

        const dataPoints = sortedClosedTrades.map((trade, index) => {
            cumulativePnl += trade.pnl || 0;
            return {
                name: `معامله ${index + 1}`,
                pnl: cumulativePnl,
            };
        });
        
        const finalChartData = [{ name: 'شروع', pnl: 0 }, ...dataPoints];

        return { 
            openTrades: open, 
            closedTrades: closed, 
            totalPnl: pnl, 
            winRate: rate, 
            totalTrades: trades.length,
            chartData: finalChartData
        };
    }, [trades]);

    const handleOpenAnalysis = async () => {
        if (!apiKey) {
            setApiKeyModalOpen(true);
            return;
        }
        setAnalysisModalOpen(true);
        setIsAnalyzing(true);
        const result = await analyzeJournal(apiKey, trades, initialCapital);
        setAnalysisResult(result);
        setIsAnalyzing(false);
    };

    const handleCapitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setInitialCapital(value);
        } else {
            setInitialCapital(0);
        }
    };

    return (
        <>
            <Header onOpenSettings={() => setApiKeyModalOpen(true)} />
            <main className="container mx-auto p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                     <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-300 mb-3">سرمایه اولیه</h3>
                        <div className="relative">
                            <DollarSignIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="number"
                                value={initialCapital || ''}
                                onChange={handleCapitalChange}
                                placeholder="مقدار سرمایه اولیه"
                                className="w-full bg-gray-700 text-white p-3 pr-10 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                    </div>
                    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 text-center">
                        <h3 className="text-lg font-semibold text-gray-300">سود/زیان کل</h3>
                        <p className={`text-3xl font-bold mt-2 ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {totalPnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 text-center">
                        <h3 className="text-lg font-semibold text-gray-300">نرخ برد (Win Rate)</h3>
                        <p className="text-3xl font-bold mt-2 text-cyan-400">{winRate.toFixed(1)}%</p>
                    </div>
                </div>

                <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">نمودار عملکرد تجمعی</h3>
                    <PerformanceChart data={chartData} />
                </div>

                <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-2xl font-bold text-white">معاملات من ({totalTrades})</h2>
                        <div className="flex gap-4">
                             <button
                                onClick={handleOpenAnalysis}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                <BrainCircuitIcon className="w-5 h-5"/>
                                تحلیل با هوش مصنوعی
                            </button>
                            <button
                                onClick={() => setIsFormVisible(!isFormVisible)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                {isFormVisible ? 'بستن فرم' : 'ثبت معامله جدید'}
                            </button>
                        </div>
                    </div>
                    {isFormVisible && <NewTradeForm onFormSubmit={() => setIsFormVisible(false)} />}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-bold mb-4">معاملات باز ({openTrades.length})</h3>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                           {openTrades.length > 0 ? (
                                openTrades.map(trade => (
                                    <TradeCard key={trade.id} trade={trade} onAction={() => setTradeToClose(trade)} actionLabel="بستن معامله" />
                                ))
                           ) : (
                                <p className="text-gray-400 text-center py-8">هیچ معامله بازی وجود ندارد.</p>
                           )}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-4">معاملات بسته ({closedTrades.length})</h3>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {closedTrades.length > 0 ? (
                                closedTrades.map(trade => (
                                    <TradeCard key={trade.id} trade={trade} />
                                ))
                            ) : (
                                <p className="text-gray-400 text-center py-8">هیچ معامله بسته‌ای وجود ندارد.</p>
                            )}
                        </div>
                    </div>
                </div>

                {tradeToClose && (
                    <CloseTradeModal
                        trade={tradeToClose}
                        onClose={() => setTradeToClose(null)}
                    />
                )}
                {isApiKeyModalOpen && (
                    <ApiKeyModal onClose={() => setApiKeyModalOpen(false)} />
                )}
                {isAnalysisModalOpen && (
                    <AnalysisModal
                        onClose={() => setAnalysisModalOpen(false)}
                        analysis={analysisResult}
                        isLoading={isAnalyzing}
                    />
                )}
            </main>
        </>
    );
};

export default JournalDashboard;