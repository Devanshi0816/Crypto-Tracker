export interface Cryptocurrency {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: number[];
  logoUrl: string;
}

export interface CryptoState {
  cryptos: Cryptocurrency[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}