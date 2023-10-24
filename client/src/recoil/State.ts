import { atom } from 'recoil';

export const alertState = atom({
  key: 'alertState',
  default: false,
});

/*
export const memberState = atom({
  key: 'memberState',
  default: {
    id: null,
    name: null,
    key: null,
    authority: null,
    comment: null,
    enabled: null,
  },
});
*/
