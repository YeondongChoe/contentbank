// 테이블 기본 값설정
// 문항 테이블
export const contentColWidth = [
  { width: '5%' },
  { width: '5%' },
  { width: '280px' },
  { width: '10%' },
  { width: '10%' },
  { width: '5%' },
  { width: '5%' },
  { width: '10%' },
  { width: '10%' },
  { width: '10%' },
  { width: '10%' },
  { width: '15%' },
  { width: '5%' },
];
export const contentTheadList = [
  { th: [{ title: '', rowSpan: 2 }] },
  { th: [{ title: '문항코드', rowSpan: 2 }] },
  { th: [{ title: '개정과정', rowSpan: 2 }] },
  { th: [{ title: '학교', rowSpan: 2 }] },
  { th: [{ title: '학년', rowSpan: 2 }] },
  { th: [{ title: '학기', rowSpan: 2 }] },
  { th: [{ title: '대분류', rowSpan: 2 }] },
  { th: [{ title: '중분류', rowSpan: 2 }] },
  { th: [{ title: '문항타입', rowSpan: 2 }] },
  { th: [{ title: '업로드', colspan: 3 }] },
  {
    th: [{ title: '작성자' }, { title: '일자' }, { title: '활성화' }],
  },
];

// 학습지 테이블
export const worksheetColWidth = [
  { width: '5%' },
  { width: '5%' },
  { width: '10%' },
  { width: '*' },
  { width: '10%' },
  { width: '10%' },
  { width: '5%' },
  { width: '5%' },
];
export const worksheetTheadList = [
  { th: [{ title: '' }] },
  { th: [{ title: '학년' }] },
  { th: [{ title: '태그' }] },
  { th: [{ title: '학습지명' }] },
  { th: [{ title: '등록일' }] },
  { th: [{ title: '작성자' }] },
  { th: [{ title: '미리보기' }] },
  { th: [{ title: '설정' }] },
];

//회원 테이블
export const memberColWidth = [
  { width: '5%' },
  { width: '20%' },
  { width: '20%' },
  { width: '20%' },
  { width: '20%' },
  { width: '10%' },
  { width: '10%' },
];
export const memberTheadList = [
  { th: [{ title: '', rowSpan: 2 }] },
  { th: [{ title: '이름', rowSpan: 2 }] },
  { th: [{ title: '아이디', rowSpan: 2 }] },
  { th: [{ title: '권한', rowSpan: 2 }] },
  { th: [{ title: '등록일', rowSpan: 2 }] },
  { th: [{ title: '상태', rowSpan: 2 }] },
  { th: [{ title: '상세정보', rowSpan: 2 }] },
];
