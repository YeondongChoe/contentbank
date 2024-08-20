import { atom } from 'recoil';

export const accessTokenAtom = atom({
  key: 'accessTokenAtom',
  default: '',
});

export const refreshTokenAtom = atom({
  key: 'refreshTokenAtom',
  default: '',
});

export const sessionIdAtom = atom({
  key: 'sessionIdAtom',
  default: '',
});
