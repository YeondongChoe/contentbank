import { atom } from 'recoil';

// 페이지네이션 공통아톰
export const totalPageAtom = atom({
  key: 'totalPageAtom',
  default: 1,
});

export const pageAtom = atom({
  key: 'pageAtom',
  default: 1,
});

// 메뉴슬라이드 아톰
export const openNaviationBoolAtom = atom({
  key: 'openNaviationBoolAtom',
  default: true,
});
