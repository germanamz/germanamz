import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import News from '../../types/News';

export type NewsState = Record<string, News[]>;

const initialState: NewsState = {};

const newsSlice = createSlice({
  name: 'ycom',
  initialState,
  reducers: {
    setNews: {
      reducer: (state, action: PayloadAction<{ id: string, list: News[] }>) => {
        state[action.payload.id] = action.payload.list;
      },
      prepare: (id: string, list: News[]) => ({ payload: { id, list } }),
    },
  },
});

export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;
