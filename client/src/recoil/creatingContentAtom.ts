import { atom } from 'recoil';

export const createContentPopupBoolAtom = atom({
  key: 'createContentPopupBoolAtom',
  default: false,
});

export const uploadBoolAtom = atom({
  key: 'uploadBoolAtom',
  default: false,
});

export const creatingNewContentBoolAtom = atom({
  key: 'creatingNewContentBoolAtom',
  default: false,
});

export const uploadFileBoolAtom = atom({
  key: 'uploadFileBoolAtom',
  default: false,
});
