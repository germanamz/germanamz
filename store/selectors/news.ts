import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { NewsState } from '../slices/news';

export const selectNews = (state: RootState) => state.news;

export const selectNewsByTarget = createSelector(
  selectNews,
  (state: RootState, target: string) => target,
  (news: NewsState, target: string) => news[target]
);
