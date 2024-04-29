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

type Article = {
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
  quizItemList: QuizType[];
  type: string;
  userKey: string;
};
