import { atom } from 'recoil';

export const createListCodeValueAtom = atom({
  key: 'createListCodeValueAtom',
  default: 'CNC_Q',
});

export const searchValueAtom = atom({
  key: 'searchValueAtom',
  default: '',
});

export const checkBoxValueAtom = atom({
  key: 'checkBoxValueAtom',
  default: <number[]>[],
});
