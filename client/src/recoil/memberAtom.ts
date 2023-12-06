import { atom } from 'recoil';

export const registerBoolAtom = atom({
  key: 'registerBoolAtom',
  default: false,
});

export const editerBoolAtom = atom({
  key: 'editerBoolAtom',
  default: false,
});

export const memberKeyValueAtom = atom({
  key: 'memberKeyValueAtom',
  default: '',
});
