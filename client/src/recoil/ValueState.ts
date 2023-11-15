import { atom } from 'recoil';

export const CreateListCodeValue = atom({
  key: 'CreateListCodeValue',
  default: 'CNC_Q',
});

export const SearchValue = atom({
  key: 'SearchValue',
  default: '',
});

export const CheckBoxValue = atom({
  key: 'CheckBoxValue',
  default: <number[]>[],
});

export const IsChangedServicedValue = atom({
  key: 'IsChangedServicedValue',
  default: false,
});
