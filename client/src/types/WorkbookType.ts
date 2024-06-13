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

export interface SimilarQuizList {
  quizList: QuizList[];
}

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
  date: boolean;
  quizType: boolean;
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
  favorite: boolean;
  use: boolean;
  delete: boolean;
  autoGrade: boolean;
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

export interface ContentNumQuotient {
  quizNum: number;
  quotient: number;
}
