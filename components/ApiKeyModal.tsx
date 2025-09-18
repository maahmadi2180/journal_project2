
import React, { useState } from 'react';
import { useApiKey } from '../hooks/useApiKey';
import { XIcon, KeyIcon, EyeIcon, EyeOffIcon } from './icons';

interface ApiKeyModalProps {
    onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onClose }) => {
    const { setApiKey } = useApiKey();
    const [key, setKey] = useState('');
    const [showKey, setShowKey] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (key.trim()) {
            setApiKey(key.trim());
            onClose();
        }
    };

    const inputClasses = "w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 pr-10 text-white focus:ring-emerald-500 focus:border-emerald-500 outline-none transition";
    const labelClasses = "block mb-2 text-sm font-medium text-gray-300";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-lg p-6 border border-gray-700" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <KeyIcon className="w-6 h-6 text-amber-400" />
                        <h2 className="text-xl font-bold text-white">تنظیم کلید API گوگل Gemini</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                 <p className="text-gray-400 text-sm mb-4">
                    برای استفاده از تحلیل هوش مصنوعی، به یک کلید API از Google AI Studio نیاز دارید. می‌توانید کلید خود را به صورت رایگان از 
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline mx-1">اینجا</a>
                    دریافت کنید.
                </p>
                <p className="text-xs text-amber-400 mb-6">
                    توجه: کلید شما به صورت امن در حافظه مرورگر شما ذخیره می‌شود و به هیچ سروری ارسال نمی‌گردد.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="apiKey" className={labelClasses}>کلید API</label>
                        <div className="relative">
                            <KeyIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                            <input 
                                id="apiKey" 
                                type={showKey ? 'text' : 'password'} 
                                value={key} 
                                onChange={e => setKey(e.target.value)} 
                                className={inputClasses} 
                                placeholder="کلید API خود را اینجا وارد کنید" 
                                required 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowKey(!showKey)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                aria-label={showKey ? "پنهان کردن کلید" : "نمایش کلید"}
                            >
                                {showKey ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition">
                            ذخیره و ادامه
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApiKeyModal;
