// Abstraction for real data providers. Replace mock with real HTTP calls.

export type Candle = { time: number; open: number; high: number; low: number; close: number };

export type MarketProvider = {
  getCandles(params: { symbol: string; timeframe: string; limit?: number }): Promise<Candle[]>;
};

export class AlphaVantageProvider implements MarketProvider {
  constructor(private readonly apiKey = process.env.ALPHA_VANTAGE_KEY) {}
  async getCandles({ symbol, timeframe, limit = 300 }: { symbol: string; timeframe: string; limit?: number }): Promise<Candle[]> {
    if (!this.apiKey) throw new Error("Missing ALPHA_VANTAGE_KEY");
    // TODO: Implement AV FX_INTRADAY calls and map to candles
    throw new Error("AlphaVantageProvider not implemented");
  }
}

export class OandaProvider implements MarketProvider {
  constructor(private readonly apiKey = process.env.OANDA_API_KEY, private readonly accountId = process.env.OANDA_ACCOUNT_ID) {}
  async getCandles({ symbol, timeframe, limit = 300 }: { symbol: string; timeframe: string; limit?: number }): Promise<Candle[]> {
    if (!this.apiKey || !this.accountId) throw new Error("Missing OANDA credentials");
    // TODO: Implement OANDA candles endpoint
    throw new Error("OandaProvider not implemented");
  }
}

export class TwelveDataProvider implements MarketProvider {
  constructor(private readonly apiKey = process.env.TWELVEDATA_KEY) {}
  async getCandles({ symbol, timeframe, limit = 300 }: { symbol: string; timeframe: string; limit?: number }): Promise<Candle[]> {
    if (!this.apiKey) throw new Error("Missing TWELVEDATA_KEY");
    // TODO: Implement TwelveData time series
    throw new Error("TwelveDataProvider not implemented");
  }
}

