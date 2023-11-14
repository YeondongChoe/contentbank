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

export const editCreateContent = atom({
  key: 'editCreateContent',
  default: false,
});

export const editCreateList = atom({
  key: 'editCreateContentList',
  default: false,
});

export const editCreateContentWorksheet = atom({
  key: 'editCreateContentWorksheet',
  default: false,
});

export const editManagementContent = atom({
  key: 'editManagementContent',
  default: false,
});

export const editManagementList = atom({
  key: 'editManagementList',
  default: false,
});

export const editManagementTree = atom({
  key: 'editManagementTree',
  default: false,
});

export const editOperation = atom({
  key: 'editOperation',
  default: false,
});

export const editMember = atom({
  key: 'editMember',
  default: false,
});

export const editAuthority = atom({
  key: 'editAuthority',
  default: false,
});

export const manageCreateContent = atom({
  key: 'manageCreateContent',
  default: false,
});

export const manageCreateList = atom({
  key: 'manageCreateList',
  default: false,
});

export const manageCreateContentWorksheet = atom({
  key: 'manageCreateContentWorksheet',
  default: false,
});

export const manageManagementContent = atom({
  key: 'manageManagementContent',
  default: false,
});

export const manageManagementList = atom({
  key: 'manageManagementList',
  default: false,
});

export const manageManagementTree = atom({
  key: 'manageManagementTree',
  default: false,
});

export const manageOperation = atom({
  key: 'manageOperation',
  default: false,
});

export const manageMember = atom({
  key: 'manageMember',
  default: false,
});

export const manageAuthority = atom({
  key: 'manageAuthority',
  default: false,
});
