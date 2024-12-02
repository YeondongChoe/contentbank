/* eslint-disable no-undef */
// 업로드 다운로드 요청 url
var dream_server_url = 'https://j-dev01.dreamonesys.co.kr/file'; // 드림원시스 쪽 노드서버 연결

// 업로드 이미지 URL
// var uploaded_img_url = 'https://itex-dev-image.s3.ap-northeast-2.amazonaws.com';
// var uploaded_img_url =
//   'https://contentbank20241017.s3.ap-northeast-2.amazonaws.com/webdev2test';

// 데이터 로드 화면 탭 개수 설정
var tabCount = 5;

// 즐겨찾기 개수
var bookmarkCount = 10;
var bookmarkCount_pc = 30;

// 편집기 종류(PC: true, tab: false);
var editorType;
// var editorType = false;
const userAgent = window.navigator.userAgent;
if (/iPhone|iPad|iPod|Android|Linux/i.test(userAgent)) {
  // alert("모바일");
  editorType = false;
} else if (/Windows|Macintosh/i.test(userAgent)) {
  // alert("PC");
  editorType = true;
} else {
  // alert("기타");
  editorType = true;
}

// redo, undo 단계 설정
var undo_redo_level = 10;

// 다문항 저장 시 문제 단위 설정
// 문제 분할 단위 p태그 class명 설정
// BIG(대발문): tag_bigcontent
// TEXT(지문): tag_content
// QUESTION(문제): tag_exam
// SMALL(소문제): tag_exam_sm
// EXAMPLE(보기): tag_example
// CHOICES(선지): tag_choices
// ANSWER(정답): tl_answer
// COMMENTARY(해설): tag_commentary
// HINT(힌트): tag_hint
// CONCEPT(개념): tag_concept
// TITLE(제목): tag_title
// TIP(팁): tag_tip
// GROUP(그룹): tag_group
// var divideKey = ["tag_bigcontent", "tag_exam"];
var divideKey = ['tag_group'];

// 이미지 저장 설정 (1: 로컬, 2: ftp, 3: s3)
var img_save_type = 1;

// 수식 입력 버튼 누를때 출력되는 값 반환

// 수식만 넣을때 수식을 넣는 공간의 class명
var onlyEQ = false;
var onlyEQNode = 'eq_wrap_node'; // 수식 입력창 열리는 곳 부모요소
var getEQData = () => {
  const output = document.querySelector(`.${onlyEQNode}`);
  iTeXEQ
    .insertEqn()
    .then((node) => {
      window.openEQ();
      console.log(node);
      console.log(node[0].html);
      // result에 들어가는 값
      const result = node[0].html;
      output.innerHTML += result;
    })
    .then(() => {
      iTeXEQ.recoverynew(output);
      const target = output.querySelector(`.itexmath`);
      target.addEventListener('click', iTeXEQ.eqn_click, false);
    })
    .catch(() => {
      console.log('수식 입력 실패');
    });
};

// 태그 컨트롤
var tag_control = {
  tag_group: {
    // 그룹
    use: false,
    available_num: 1,
  },
  tag_bigcontent: {
    // 대발문
    use: true,
    available_num: 1,
  },
  tag_content: {
    // 지문
    use: true,
    available_num: 1,
  },
  tag_exam: {
    // 문제
    use: true,
    available_num: 2,
  },
  tag_exam_sm: {
    // 소문제
    use: false,
    available_num: 1,
  },
  tag_example: {
    // 보기
    use: false,
    available_num: 3,
  },
  tag_choices: {
    // 선지
    use: true,
    available_num: 3,
  },
  tl_answer: {
    // 정답
    use: true,
    available_num: 3,
  },
  tag_commentary: {
    // 해설
    use: true,
    available_num: 3,
  },
  tag_hint: {
    // 힌트
    use: false,
    available_num: 3,
  },
  tag_concept: {
    // 개념
    use: true,
    available_num: 3,
  },
  tag_title: {
    // 제목
    use: false,
    available_num: 3,
  },
  tag_tip: {
    // 팁
    use: false,
    available_num: 3,
  },
};
