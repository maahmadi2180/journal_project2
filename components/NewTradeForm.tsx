
import React, { useState } from 'react';
import { useJournal } from '../hooks/useJournal';
import { TradeType } from '../types';

interface NewTradeFormProps {
    onFormSubmit: () => void;
}

const NewTradeForm: React.FC<NewTradeFormProps> = ({ onFormSubmit }) => {
    const { addTrade } = useJournal();
    const [symbol, setSymbol] = useState('');
    const [tradeType, setTradeType] = useState<TradeType>(TradeType.Buy);
    const [entryDate, setEntryDate] = useState('');
    const [entryPrice, setEntryPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [entryReason, setEntryReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!symbol || !entryDate || !entryPrice || !quantity || !entryReason) {
            alert('لطفا تمام فیلدها را پر کنید.');
            return;
        }
        addTrade({
            symbol,
            tradeType,
            entryDate,
            entryPrice: parseFloat(entryPrice),
            quantity: parseInt(quantity, 10),
            entryReason
        });
        // Reset form
        setSymbol('');
        setTradeType(TradeType.Buy);
        setEntryDate('');
        setEntryPrice('');
        setQuantity('');
        setEntryReason('');
        onFormSubmit();
    };
    
    const inputClasses = "w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-emerald-500 focus:border-emerald-500 outline-none transition";
    const labelClasses = "block mb-2 text-sm font-medium text-gray-300";

    return (
        <div className="mt-6 border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-white">ثبت معامله جدید</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="symbol" className={labelClasses}>نماد</label>
                    <input id="symbol" type="text" value={symbol} onChange={e => setSymbol(e.target.value)} className={inputClasses} placeholder="مثلا: ضخود1234" />
                </div>
                 <div>
                    <label htmlFor="tradeType" className={labelClasses}>نوع معامله</label>
                    <select id="tradeType" value={tradeType} onChange={e => setTradeType(e.target.value as TradeType)} className={inputClasses}>
                        <option value={TradeType.Buy}>خرید</option>
                        <option value={TradeType.Sell}>فروش</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="entryDate" className={labelClasses}>تاریخ، ساعت و دقیقه ورود</label>
                    <input id="entryDate" type="text" value={entryDate} onChange={e => setEntryDate(e.target.value)} className={inputClasses} placeholder="مثلا: 1403/05/10 10:30" />
                </div>
                <div>
                    <label htmlFor="entryPrice" className={labelClasses}>قیمت ورود</label>
                    <input id="entryPrice" type="number" value={entryPrice} onChange={e => setEntryPrice(e.target.value)} className={inputClasses} placeholder="مثلا: 1500" />
                </div>
                <div>
                    <label htmlFor="quantity" className={labelClasses}>تعداد</label>
                    <input id="quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className={inputClasses} placeholder="مثلا: 10" />
                </div>
                <div className="md:col-span-2 lg:col-span-1">
                    <label htmlFor="entryReason" className={labelClasses}>علت ورود به معامله</label>
                    <textarea id="entryReason" value={entryReason} onChange={e => setEntryReason(e.target.value)} className={`${inputClasses} h-24`} placeholder="تحلیل تکنیکال، فاندامنتال و ..."></textarea>
                </div>
                 <div className="md:col-span-2 lg:col-span-3 flex justify-end">
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition">
                        ثبت معامله
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewTradeForm;
