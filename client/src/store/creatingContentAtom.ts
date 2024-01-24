import { atom } from 'recoil';

// 콘텐츠 제작 아이콘 팝업
export const createContentPopupBoolAtom = atom({
  key: 'createContentPopupBoolAtom',
  default: false,
});
// DT&Editing,문항 분류, 개체라벨링 팝업
export const uploadPopupBoolAtom = atom({
  key: 'uploadPopupBoolAtom',
  default: false,
});
// 단일 콘텐츠 생성 팝업
export const creatingNewContentBoolAtom = atom({
  key: 'creatingNewContentBoolAtom',
  default: false,
});
// 복수 콘텐츠 생성 및 수정 팝업
export const uploadFileBoolAtom = atom({
  key: 'uploadFileBoolAtom',
  default: false,
});
// 콘텐츠를 수정할때
export const editingBoolAtom = atom({
  key: 'editingBoolAtom',
  default: false,
});
