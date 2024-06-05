//학습지 리스트 타입
export type WorksheetListType = {
  code: string;
  tag: string;
  isFavorite: boolean;
  createdAt: string;
  createdBy: string;
  examiner: string;
  grade: string;
  idx: number;
  isAutoGrade: boolean;
  isDelete: boolean;
  isUse: boolean;
  lastArticle?: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  name: string;
  quizCnt: number;
  userKey: string;
  type?: string;
};

export type QuestionTableType = {
  contentSeq: number;
  questionSeq: number;
  favorited: boolean;
  questionCode: string; //문항코드
  curriculum: string; //개정과정
  schoolLevel: string; //학교급
  schoolYear: string; //학년
  semester: string; //학기
  unitMajor: string; //대분류
  unitMiddle: string; //중분류
  questionType: string; //문항타입??
  questionCreatedByName: string; //작성자
  questionCreatedDate: string; //일자
  serviced: boolean; //오픈여부
  // 더미데이터
  id?: number;
  tag?: string;
  worksheetName?: string;
  createdAt?: string;
  creater?: string;

  seq?: number;
  authority?: {
    seq: number;
    code: string;
    name: string;
    sort: number;
  };
  name?: string;
  key?: string;

  comment?: null;
  createdBy?: null;
  createdDate?: string;
  lastModifiedBy?: null;
  lastModifiedDate?: string;
  enabled?: boolean;
};

// 더미데이터 _수능/모의고사
export type MockexamType = {
  seq: number;
  grade: string;
  year: string;
  month: string;
  isChecked?: boolean;
  content: {
    seq: number;
    title: string;
    isChecked?: boolean;
  }[];
};

export type MemberTypeB = {
  seq: number;
  authority: {
    seq: number;
    code: string;
    name: string;
    sort: number;
  };
  name: string;
  key: string;
  id: string;
  comment: null;
  createdBy: null;
  createdDate: string;
  lastModifiedBy: null;
  lastModifiedDate: string;
  enabled: boolean;

  contentSeq?: number;
  questionSeq?: number;
  favorited?: boolean;
  questionCode?: string; //문항코드
  curriculum?: string; //개정과정
  schoolLevel?: string; //학교급
  schoolYear?: string; //학년
  semester?: string; //학기
  unitMajor?: string; //대분류
  unitMiddle?: string; //중분류
  questionType?: string; //문항타입??
  questionCreatedByName?: string; //작성자
  questionCreatedDate?: string; //일자
  serviced?: boolean; //오픈여부
  // 더미데이터
  tag?: string;
  worksheetName?: string;
  createdAt?: string;
  creater?: string;
};
