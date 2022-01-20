import storeFactory from './storeFactory';

export type RootStore = {
  experiences: Map<string, any>;
  isDarkMode: boolean;
}

export const factory = () => storeFactory<RootStore>({
  experiences: new Map<string, any>(),
  isDarkMode: false,
});
