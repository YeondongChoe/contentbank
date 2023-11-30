import { atom } from 'recoil';

export const alertState = atom({
  key: 'alertState',
  default: false,
});

export const totalPageState = atom({
  key: 'totalPageState',
  default: 1,
});

export const PageAtom = atom({
  key: 'PageAtom',
  default: 1,
});

export const editState = atom({
  key: 'editState',
  default: false,
});
