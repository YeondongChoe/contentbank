export type TableItemType = {
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
};

// export type TableWorksheetType = {
//   id: number;
//   favorited: boolean;
//   schoolLevel: string; //학교급
//   tag: string;
//   worksheetName: string;
//   createdAt: string;
//   creater: string;
// };
