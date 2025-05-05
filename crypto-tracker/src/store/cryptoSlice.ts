import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoState, Cryptocurrency } from '../types';
import { initialCryptoData } from '../utils/mockData';

const initialState: CryptoState = {
  cryptos: initialCryptoData,
  status: 'idle',
  error: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (
      state,
      action: PayloadAction<{ id: string; price: number; percentChange1h: number; percentChange24h: number; volume24h: number }>
    ) => {
      const { id, price, percentChange1h, percentChange24h, volume24h } = action.payload;
      const crypto = state.cryptos.find(c => c.id === id);
      
      if (crypto) {
        crypto.price = price;
        crypto.percentChange1h = percentChange1h;
        crypto.percentChange24h = percentChange24h;
        crypto.volume24h = volume24h;
        
        // Update the chart data by removing the oldest data point and adding the newest price
        crypto.chartData = [...crypto.chartData.slice(1), price];
      }
    },
    
    setCryptos: (state, action: PayloadAction<Cryptocurrency[]>) => {
      state.cryptos = action.payload;
      state.status = 'succeeded';
    },
    
    setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
      state.status = action.payload;
    },
    
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { updateCryptoPrice, setCryptos, setStatus, setError } = cryptoSlice.actions;

export default cryptoSlice.reducer;