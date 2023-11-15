import { atom } from 'recoil';

export const register = atom({
  key: 'register',
  default: false,
});

export const editer = atom({
  key: 'editer',
  default: false,
});

export const memberKeyValue = atom({
  key: 'memberKeyValue',
  default: '',
});
