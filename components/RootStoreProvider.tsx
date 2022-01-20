import { FC } from 'react';

import { RootStoreContext, rootStoreFactory } from '../store';

const RootStoreProvider: FC = ({ children }) => {
  const store = rootStoreFactory();

  return (<RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>);
};

export default RootStoreProvider;
