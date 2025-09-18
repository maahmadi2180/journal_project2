
import { GoogleGenAI } from "@google/genai";
import type { Trade } from '../types';

// FIX: API_KEY should not be a global constant if it can be missing.
// It's better to check for it inside the function that uses it.

const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: "AIzaSyDQwOLbDmdLf11Nzl4eJu5ELcu890cz7ZE" }) : null;

if (!ai) {
  console.warn("API_KEY for Gemini is not set. AI features will not work.");
}

export const analyzeJournal = async (trades: Trade[], initialCapital: number): Promise<string> => {
    if (!ai) {
        return "خطا: کلید API برای Gemini تنظیم نشده است. لطفا متغیر محیطی API_KEY را تنظیم کنید.";
    }

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
        // FIX: According to Gemini API guidelines, response.text should be used to get the text.
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            return `خطا در برقراری ارتباط با سرویس هوش مصنوعی: ${error.message}`;
        }
        return "خطا در برقراری ارتباط با سرویس هوش مصنوعی.";
    }
};
