import { atom } from 'recoil';

import { GroupListProps } from '../components/managements/metainfotab';
import { ContentWithScore } from '../types/WorkbookType';

// 페이지네이션 공통아톰
export const totalPageAtom = atom({
  key: 'totalPageAtom',
  default: 1,
});

export const pageAtom = atom({
  key: 'pageAtom',
  default: 1,
});

// main메뉴 슬라이드 아톰
export const openNaviationBoolAtom = atom({
  key: 'openNaviationBoolAtom',
  default: true,
});

// 해더 IndexInfo 인덱스 텍스트 아톰
export const pageIndexAtom = atom({
  key: 'pageIndexAtom',
  default: ['콘텐츠 제작', '문항 제작'],
});

//학습지 총점 누적 아톰
export const contentQuotient = atom<ContentWithScore[]>({
  key: 'contentQuotient',
  default: [],
});

//학습지 수정 아톰
export const isEditWorkbookAtom = atom({
  key: 'isEditWorkbookAtom',
  default: 0,
});

//카테고리 선택 아톰
export const groupItem = atom<GroupListProps[]>({
  key: 'groupItem',
  default: [],
});
