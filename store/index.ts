import { enableStaticRendering } from 'mobx-react';
import { Context, createContext } from 'react';

import { factory as rootStoreFactory, RootStore } from './RootStore';

enableStaticRendering(typeof window === 'undefined');

const RootStoreContext: Context<RootStore> = createContext<any>(null);

export type {
  RootStore
};

export {
  RootStoreContext,
  rootStoreFactory
};
