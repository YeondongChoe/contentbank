var dream_url = "dddd";

// 데이터 로드 화면 탭 개수 설정
var tabCount = 5;

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
var divideKey = ["tag_bigcontent", "tag_exam"];

// 수식 입력 버튼 누를때 출력되는 값 반환

var onlyEQ = false;
// 수식만 넣을때 수식을 넣는 공간의 class명
var onlyEQNode = "";
var getEQData = () => {
  const output = document.querySelector(`.${onlyEQNode}`);
  iTeXEQ
    .insertEqn()
    .then((node) => {
      // console.log(node.html);
      // result에 들어가는 값
      const result = node.html;
      output.innerHTML = result;
    })
    .then(() => {
      iTeXEQ.recoverynew(output);
      const target = output.querySelector(`.itexmath`);
      target.addEventListener("click", iTeXEQ.eqn_click, false);
    });
};
