import { atom } from 'recoil';

export const CreatePopupState = atom({
  key: 'CreatePopupState',
  default: false,
});

export const UploadState = atom({
  key: 'UploadState',
  default: false,
});

export const CreatingNewContentState = atom({
  key: 'CreatingNewContentState',
  default: false,
});

export const UploadFileState = atom({
  key: 'UploadFileState',
  default: false,
});
