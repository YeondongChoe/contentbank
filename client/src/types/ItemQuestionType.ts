export type ItemQuestionType = {
  it_title: string | number;
  // quest_no: string;
  // total_no: string;
  // it_quest_context_p: string | null;
  // it_code: string;
  doc_num?: string;
  it_answer: string[];
  // type: string;
  // it_subject: string;
  // it_tip: string;
  // it_class: string;
  // it_id: string;
  // group_id: string | null;
  // it_season: string;
  it_quest: string;
  // it_point: string;
  // it_hint: string | null;
};

export type Article = {
  createdAt: string;
  createdBy: string;
  extension: string;
  idx: number;
  originalName: string;
  storedPath: string;
  type: string;
};

export type QuizType = {
  idx: number;
  code: string;
  type: string;
  content: string;
  sort: number;
};

export type QuizListType = {
  code: string;
  createdAt: string;
  createdBy: string;
  idx: number;
  isDelete: boolean;
  isUse: boolean;
  isFavorite?: boolean;
  lastArticle: Article;
  lastModifiedAt: string;
  lastModifiedBy: string;
  type: string;
  userKey: string;
  quizCategoryList: QuizCategoryList[];
  quizItemList?: QuizType[];
  quizList: QuizType[];
  process?: string;
  condition?: string;
};

export type QuizCategoryList = {
  quizCategory: QuizCategory;
};

export type ItemTreeIdxListType = {
  itemTreeIdxList: number[];
};

//TODO : 데이터 다 들어갈시 명확히
export type Source = {
  출처: string;
  문항번호?: string;
  출제년도?: string;
  교재속성?: string;
  출판사?: string;
  시리즈?: string;
  교재명?: string;
  교재페이지?: string;
  교재번호?: string;
  출판년도?: string;
  내신형식?: string;
  학교명?: string;
  학사일정?: string;
  내신페이지?: string;
  내신배점?: string;
  기출속성?: string;
  주관사?: string;
  기출명?: string;
  시행학제?: string;
  시행학년?: string;
  시험지타입?: string;
  기출배점?: string;
  기출일시?: string;
};
export type Categorie = {
  대유형?: string; // 1뎁스
  중유형?: string;
  소유형?: string;
  유형?: string; // 4뎁스
};

export type QuizCategory = {
  교육과정?: string;
  교과?: string;
  과목?: string;
  학년?: number;
  학기?: number;
  난이도?: string;
  학교급?: string;
  문항타입?: string;
  대단원?: string;
  소단원?: string;
  중단원?: string;
  행동요소1?: string[];
  행동요소2?: string[];
  대유형?: string; // 1뎁스
  중유형?: string;
  소유형?: string;
  유형?: string; // 4뎁스
  sources?: Source[] | any[];
  categories?: Categorie[] | any[];
};

// 등록시
interface QuizItem {
  code: string | null;
  type: string;
  content: string;
  sort: number;
}

export type QuizItemListType = QuizItem[];

export type EditorDataType = {
  [key: string]: string[];
};

export type AddQuestionListType = {
  commandCode: number;
  quizIdx: null;
  articleList: never[];
  quizItemList: QuizItemListType;
  quizClassList: QuestionClassListType;
}[];

export type QuestionClassListType = {
  type: string;
  quizCategory: QuizCategory;
}[];
