import type { Trade } from "../types";
import OpenAI from "openai";

export const analyzeJournal = async (
  apiKey: string,
  trades: Trade[],
  initialCapital: number
): Promise<string> => {
  if (!apiKey) {
    return "خطا: کلید API برای Gemini تنظیم نشده است. لطفا از طریق تنظیمات، کلید API خود را وارد کنید.";
  }
  const endpoint = "https://models.github.ai/inference";
  const model = "openai/gpt-4.1";
  const client = new OpenAI({ baseURL: endpoint, apiKey: apiKey , dangerouslyAllowBrowser: true});

  const closedTrades = trades.filter((t) => t.status === "CLOSED");
  if (closedTrades.length === 0) {
    return "برای تحلیل، حداقل یک معامله بسته شده نیاز است.";
  }

  const tradesData = closedTrades.map((trade) => ({
    نماد: trade.symbol,
    نوع: trade.tradeType,
    "تاریخ ورود": trade.entryDate,
    "قیمت ورود": trade.entryPrice,
    "دلیل ورود": trade.entryReason,
    "تاریخ خروج": trade.exitDate,
    "قیمت خروج": trade.exitPrice,
    "دلیل خروج": trade.exitReason,
    "سود/زیان": trade.pnl?.toFixed(2),
  }));

  const system_prompt = `
        شما یک تحلیلگر حرفه‌ای معاملات در بازار اختیار معامله هستید. لطفا ژورنال معاملاتی زیر را به زبان فارسی به صورت خلاصه و مفید تحلیل کنید.
        لطفا موارد زیر را در تحلیل خود پوشش دهید:
        1.  **عملکرد کلی**: سود یا زیان کل چقدر بوده است؟ نرخ برد (Win Rate) چقدر است؟
        2.  **نقاط قوت**: به طور خلاصه به 1-2 الگوی مثبت اصلی اشاره کنید.
        3.  **نقاط ضعف**: به طور خلاصه به 1-2 اشتباه تکرارشونده اصلی اشاره کنید.
        4.  **پیشنهادات برای بهبود**: 2-3 توصیه کلیدی و عملی برای بهبود عملکرد ارائه دهید.

        تحلیل خود را به صورت واضح، ساختاریافته، مختصر و مفید و با لحنی حرفه‌ای و سازنده ارائه دهید. از توضیحات طولانی پرهیز کرده و تنها به نکات کلیدی اشاره کنید.
    `;

  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: ` سرمایه اولیه: ${initialCapital}
        لیست معاملات:
        ${JSON.stringify(tradesData, null, 2)} `,
        },
        { role: "user", content: system_prompt },
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: model,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
      return "خطا: کلید API وارد شده نامعتبر است. لطفا آن را بررسی کرده و مجددا وارد نمایید.";
    }
    if (error instanceof Error) {
      return `خطا در برقراری ارتباط با سرویس هوش مصنوعی: ${error.message}`;
    }
    return "خطا در برقراری ارتباط با سرویس هوش مصنوعی.";
  }
};
