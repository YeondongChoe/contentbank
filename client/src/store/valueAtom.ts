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

export const checkListValueAtom = atom({
  key: 'checkListValueAtom',
  default: <number[]>[],
});

export const servicedValueBoolAtom = atom({
  key: 'servicedValueBoolAtom',
  default: false,
});
