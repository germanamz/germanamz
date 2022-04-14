import { combineReducers } from '@reduxjs/toolkit';

import news from './slices/news';

const reducer = combineReducers({
  news,
});

export default reducer;
