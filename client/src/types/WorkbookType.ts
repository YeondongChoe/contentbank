export interface LastArticle {
  idx: number;
  type: string;
  originalName: string;
  storedPath: string;
  extension: string;
  createdBy: string;
  createdAt: string;
}

export interface QuizItemList {
  idx: number;
  code: string;
  type: string;
  content: string;
  sort: number;
}

export interface QuizCategory {
  sources: {
    출처: string;
    기출명: string;
  };
  난이도: string;
  문항타입: string;
  교과: string;
  학교급: string;
  유형?: string;
}

export interface QuizCategoryList {
  quizCategory: QuizCategory;
}

export interface QuizList {
  idx: number;
  code: string;
  num: number;
  type: string;
  score: number;
  height: number;
  userKey: string;
  createdBy: string;
  createdAt: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
  lastArticle: LastArticle | null;
  quizItemList: QuizItemList[];
  quizCategoryList: QuizCategoryList[];
  isFavorite: boolean;
  isUse: boolean;
  isDelete: boolean;
}

export type SimilarQuizList = {
  quizList: QuizList[];
};

export interface TagClassList {
  idx: number;
  name: string;
  use: boolean;
}

export interface TemplateList {
  idx: number;
  color: string;
  type: string;
  multiLevel: string;
  assign: string;
  itemType: number;
  isDate: boolean;
  isQuizType: boolean;
}

export interface Data {
  idx: number;
  name: string;
  code: string;
  examiner: string;
  grade: string;
  quizCnt: number;
  userKey: string;
  createdBy: string;
  createdAt: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
  lastArticle: LastArticle | null;
  quizList: QuizList[];
  tagClassList: TagClassList[];
  templateList: TemplateList[];
  isFavorite: boolean;
  isUse: boolean;
  isDelete: boolean;
  isAutoGrade: boolean;
  isEditWorkbook?: number;
}

export interface WorkbookData {
  code: string;
  timestamp: string;
  data: Data;
}

export interface WorkbookQuotientData {
  equalScore: number;
  equalTotalValue: string;
  maxQuotient: number;
  minQuotient: number;
  nextRemainderContent: number;
  quotient: number;
  remainderContent: number;
}
export interface WorkbookCategoryData {
  itemTreeKey: {
    교육과정: string;
    학교급: string;
    학기: string;
    학년: string;
  };
  itemTreeIdxList: number[];
}

export interface ContentWithScore {
  index: number;
  num: number;
  score: number;
  code: string;
}

export type DifficultyDataType = {
  type: string;
  lower: number;
  medium: number;
  intermediate: number;
  upper: number;
  best: number;
  total?: number;
  title?: string;
};

export type FavoriteQuizList = {
  quizList: QuizList[];
};

export type selectedListType = {
  name: string;
  idx: number;
  view: boolean;
  search: boolean;
  type?: string;
};
