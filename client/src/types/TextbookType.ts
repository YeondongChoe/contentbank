// 시중교재
export type TextbookInfoType = {
  idx: number;
  schoolLevel: string;
  grade: string;
  semester: string;
  subject: string;
  properties: string;
  publisher: string;
  series: string;
  title: string;
  page: number;
  number: number;
  year: string;
};

export type TextbookListType = {
  textbookList: TextbookInfoType[];
};
export type TextbookQuizListType = {
  idx: number;
  code: string;
  bookQuizNumber: string;
};

export type TextBookDetailType = {
  subChapter: string;
  bookPage: string;
  quizList: TextbookQuizListType[];
};
