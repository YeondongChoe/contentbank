import { atom } from 'recoil';

export const totalPageAtom = atom({
  key: 'totalPageAtom',
  default: 1,
});

export const pageAtom = atom({
  key: 'pageAtom',
  default: 1,
});

export const openNaviationBoolAtom = atom({
  key: 'openNaviationBoolAtom',
  default: true,
});
