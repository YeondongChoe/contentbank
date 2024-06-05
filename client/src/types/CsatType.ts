// 수능/모의고사
export type CastListType = {
  csatList: csatListType[];
  option: number;
  subject: string;
  quizList: CastQuizListType[];
};

export type CastQuizListType = {
  [x: string]: any;
  grade: number;
  level: string;
  month: number;
  year: number;
  quizNumberList: CastquizNumberListType[];
};

export type CastquizNumberListType = {
  code: string;
  idx: number;
  quizNumber: string;
};

export type csatListType = {
  grade: number;
  level: string;
  month: number;
  year: number;
  nodeData: { hierarchicalData: any };
};
