import { atom } from 'recoil';

export const alertState = atom({
  key: 'alertState',
  default: false,
});

export const contentState = atom({
  key: 'contentState',
  default: 0,
});

export const contentCreateState = atom({
  key: 'contentCreateState',
  default: 0,
});

export const contentManagementState = atom({
  key: 'contentManagementState',
  default: 0,
});

export const contentOperationState = atom({
  key: 'contentOperationState',
  default: 0,
});

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
