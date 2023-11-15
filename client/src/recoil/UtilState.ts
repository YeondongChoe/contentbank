import { atom } from 'recoil';

export const alertState = atom({
  key: 'alertState',
  default: false,
});

export const CreatePopupState = atom({
  key: 'CreatePopupState',
  default: false,
});

export const PageAtom = atom({
  key: 'PageAtom',
  default: 1,
});
