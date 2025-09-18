
import React, { useState } from 'react';
import { useJournal } from '../hooks/useJournal';
import type { Trade } from '../types';
import { XIcon } from './icons';

interface CloseTradeModalProps {
    trade: Trade;
    onClose: () => void;
}

const CloseTradeModal: React.FC<CloseTradeModalProps> = ({ trade, onClose }) => {
    const { closeTrade } = useJournal();
    const [exitPrice, setExitPrice] = useState('');
    const [exitDate, setExitDate] = useState('');
    const [exitReason, setExitReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!exitPrice || !exitDate || !exitReason) {
            alert('لطفا تمام فیلدها را پر کنید.');
            return;
        }
        closeTrade(trade.id, {
            exitPrice: parseFloat(exitPrice),
            exitDate,
            exitReason,
        });
        onClose();
    };

    const inputClasses = "w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-emerald-500 focus:border-emerald-500 outline-none transition";
    const labelClasses = "block mb-2 text-sm font-medium text-gray-300";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
            <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-lg p-6 border border-gray-700 m-4" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">بستن معامله: {trade.symbol}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="exitDate" className={labelClasses}>تاریخ، ساعت و دقیقه خروج</label>
                        <input id="exitDate" type="text" value={exitDate} onChange={e => setExitDate(e.target.value)} className={inputClasses} placeholder="مثلا: 1403/05/12 14:00" required />
                    </div>
                    <div>
                        <label htmlFor="exitPrice" className={labelClasses}>قیمت خروج</label>
                        <input id="exitPrice" type="number" value={exitPrice} onChange={e => setExitPrice(e.target.value)} className={inputClasses} placeholder="قیمت فروش یا بازخرید" required />
                    </div>
                    <div>
                        <label htmlFor="exitReason" className={labelClasses}>علت خروج از معامله</label>
                        <textarea id="exitReason" value={exitReason} onChange={e => setExitReason(e.target.value)} className={`${inputClasses} h-24`} placeholder="رسیدن به حد سود/ضرر، تغییر شرایط بازار و ..." required></textarea>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition">
                            ثبت خروج
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CloseTradeModal;
