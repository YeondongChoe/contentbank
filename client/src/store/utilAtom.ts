import { atom } from 'recoil';

export const alertBoolAtom = atom({
  key: 'alertBoolAtom',
  default: false,
});

export const totalPageAtom = atom({
  key: 'totalPageAtom',
  default: 1,
});

export const pageAtom = atom({
  key: 'pageAtom',
  default: 1,
});

export const updateBoolAtom = atom({
  key: 'updateBoolAtom',
  default: false,
});
