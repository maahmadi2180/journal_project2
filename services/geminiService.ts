
import { GoogleGenAI } from "@google/genai";
import type { Trade } from '../types';

export const analyzeJournal = async (apiKey: string, trades: Trade[], initialCapital: number): Promise<string> => {
    if (!apiKey) {
        return "خطا: کلید API برای Gemini تنظیم نشده است. لطفا از طریق تنظیمات، کلید API خود را وارد کنید.";
    }

    const ai = new GoogleGenAI({ apiKey });

    const closedTrades = trades.filter(t => t.status === 'CLOSED');
    if (closedTrades.length === 0) {
        return "برای تحلیل، حداقل یک معامله بسته شده نیاز است.";
    }

    const tradesData = closedTrades.map(trade => ({
        'نماد': trade.symbol,
        'نوع': trade.tradeType,
        'تاریخ ورود': trade.entryDate,
        'قیمت ورود': trade.entryPrice,
        'دلیل ورود': trade.entryReason,
        'تاریخ خروج': trade.exitDate,
        'قیمت خروج': trade.exitPrice,
        'دلیل خروج': trade.exitReason,
        'سود/زیان': trade.pnl?.toFixed(2)
    }));
    
    const prompt = `
        شما یک تحلیلگر حرفه‌ای معاملات در بازار اختیار معامله هستید. لطفا ژورنال معاملاتی زیر را به زبان فارسی تحلیل کنید.
        سرمایه اولیه: ${initialCapital}
        لیست معاملات:
        ${JSON.stringify(tradesData, null, 2)}

        لطفا موارد زیر را در تحلیل خود پوشش دهید:
        1.  **عملکرد کلی**: سود یا زیان کل چقدر بوده است؟ نرخ برد (Win Rate) چقدر است؟
        2.  **نقاط قوت**: بهترین معاملات کدام‌ها بودند؟ چه الگوهای مثبتی در معاملات سودده مشاهده می‌شود؟ (مثلاً دلایل ورود خوب، مدیریت ریسک مناسب)
        3.  **نقاط ضعف**: بدترین معاملات کدام‌ها بودند؟ چه اشتباهات یا الگوهای تکرارشونده‌ای در معاملات زیان‌ده وجود دارد؟ (مثلاً خروج زودهنگام، ورود احساسی)
        4.  **پیشنهادات برای بهبود**: بر اساس تحلیل بالا، چه توصیه‌های مشخصی برای بهبود عملکرد این معامله‌گر دارید؟

        تحلیل خود را به صورت واضح، ساختاریافته و با لحنی حرفه‌ای و سازنده ارائه دهید.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error && error.message.includes('API key not valid')) {
             return "خطا: کلید API وارد شده نامعتبر است. لطفا آن را بررسی کرده و مجددا وارد نمایید.";
        }
        if (error instanceof Error) {
            return `خطا در برقراری ارتباط با سرویس هوش مصنوعی: ${error.message}`;
        }
        return "خطا در برقراری ارتباط با سرویس هوش مصنوعی.";
    }
};
