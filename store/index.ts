import { configureStore } from '@reduxjs/toolkit';
import { merge } from 'lodash';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import reducer from './reducer';
import { NewsState } from './slices/news';

export type RootState = {
  news: NewsState,
};

const makeStore = () => configureStore<RootState>({
  reducer: (state, action) => {
    switch (action.type) {
      case HYDRATE:
        return merge({}, state, action.payload);
      default:
        return reducer(state, action);
    }
  },
});

const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV !== 'production' });

export default wrapper;
