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
  year: string;
  quizNumberList: CastquizNumberListType[];
};

export type CastquizNumberListType = {
  code: string;
  idx: number;
  quizNumber: string;
};

type QuizType = {
  idx: number;
  code: string;
  isChecked: boolean;
};

type HierarchicalDataType = {
  [key: string]: HierarchicalDataType | QuizType[];
};

type NodeDataType = {
  hierarchicalData: HierarchicalDataType;
};

export type csatListType = {
  grade: number;
  level: string;
  month: number;
  year: string;
  nodeData: NodeDataType;
};
