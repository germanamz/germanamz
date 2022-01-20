import { useContext } from 'react';

import { RootStoreContext } from '../store';

const useStore = () => {
  const store = useContext(RootStoreContext);

  if (store === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  return store;
};

export default useStore;
