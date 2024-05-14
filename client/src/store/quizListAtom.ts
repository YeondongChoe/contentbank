import { atom } from 'recoil';

import { QuizListType } from '../types';

// 문항 둥록 및 수정시 리스트데이터
export const quizListAtom = atom<QuizListType[]>({
  key: 'quizListAtom',
  default: [],
});
