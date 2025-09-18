
export enum TradeStatus {
    Open = 'OPEN',
    Closed = 'CLOSED',
}

export enum TradeType {
    Buy = 'خرید',
    Sell = 'فروش',
}

export interface Trade {
    id: string;
    symbol: string;
    tradeType: TradeType;
    entryDate: string;
    entryPrice: number;
    entryReason: string;
    exitDate?: string;
    exitPrice?: number;
    exitReason?: string;
    status: TradeStatus;
    pnl?: number;
    quantity: number;
}

export interface User {
    username: string;
}
