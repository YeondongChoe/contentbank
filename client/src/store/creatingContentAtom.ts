import { atom } from 'recoil';

// 콘텐츠 제작 아이콘 팝업
export const createContentPopupBoolAtom = atom({
  key: 'createContentPopupBoolAtom',
  default: false,
});
// 단일 콘텐츠 생성 팝업
export const creatingNewContentBoolAtom = atom({
  key: 'creatingNewContentBoolAtom',
  default: false,
});
// 복수 콘텐츠 생성 및 수정 팝업
export const uploadBoolAtom = atom({
  key: 'uploadBoolAtom',
  default: false,
});
// 콘텐츠 수정 시
export const updateBoolAtom = atom({
  key: 'updateBoolAtom',
  default: false,
});

export const uploadFileBoolAtom = atom({
  key: 'uploadFileBoolAtom',
  default: false,
});
