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

// 더미데이터 학습지
export type WorksheetTableType = {
  id?: number;
  favorited?: boolean;
  schoolLevel?: string; //학교급
  tag?: string;
  worksheetName?: string;
  createdAt?: string;
  creater?: string;
  contentSeq?: number;
  questionSeq?: number;
  questionCode?: string; //문항코드
  curriculum?: string; //개정과정
  schoolYear?: string; //학년
  semester?: string; //학기
  unitMajor?: string; //대분류
  unitMiddle?: string; //중분류
  questionType?: string; //문항타입??
  questionCreatedByName?: string; //작성자
  questionCreatedDate?: string; //일자
  serviced?: boolean; //오픈여부

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

// 더미데이터 시중교재
export type TextbookType = {
  schoolGrade?: string;
  title?: string;
  series?: string;
  publisher?: string;
  type?: {
    title: string;
    page: {
      seq: number;
      title: string;
      content: string[];
    }[];
  }[];
};

export type MemberTableType = {
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
