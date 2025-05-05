import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Cryptocurrency } from '../types';

export const selectAllCryptos = (state: RootState): Cryptocurrency[] => state.crypto.cryptos;

export const selectStatus = (state: RootState): string => state.crypto.status;

export const selectError = (state: RootState): string | null => state.crypto.error;

export const selectCryptoById = createSelector(
  [selectAllCryptos, (_, id: string) => id],
  (cryptos, id) => cryptos.find(crypto => crypto.id === id)
);

export const selectCryptosByRank = createSelector(
  [selectAllCryptos],
  (cryptos) => [...cryptos].sort((a, b) => a.rank - b.rank)
);