import { observable } from 'mobx';

const storeFactory = <S extends object>(state: S) => observable<S>(state || {});

export default storeFactory;
