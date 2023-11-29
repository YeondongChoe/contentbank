import { atom } from 'recoil';

export const CreateContentPopupState = atom({
  key: 'CreateContentPopupState',
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
