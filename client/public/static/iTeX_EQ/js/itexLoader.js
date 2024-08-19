(async function () {
  try {
    await new Promise((resolve) => {
      const checkLoaded = () => {
        if (typeof window.MathJax !== "undefined") {
          resolve();
        } else {
          setTimeout(checkLoaded, 500);
        }
      };
      checkLoaded();
    });

    let otherScriptUrls = [
      "/static/iTeX_EQ/js/ds.min.js",
      "/static/iTeX_EQ/js/hangul.min.js",
      "/static/iTeX_EQ/js/itex_eq_common.js?v=0.1",
      editorType
        ? "/static/iTeX_EQ/js/itex_keyboard_v3_pc.js"
        : window.editorType_s
        ? "/static/iTeX_EQ/js/itex_keyboard_v3_pc.js"
        : "/static/iTeX_EQ/js/itex_keyboard_v3.js",
      "/static/iTeX_EQ/js/itex_setting.js?v=0.1",
      "/static/iTeX_EQ/js/tex_list.js",
    ];

    const loadScript = (url) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
      });

    for (const url of otherScriptUrls) {
      await loadScript(url);
    }
  } catch (error) {
    console.error("이후 스크립트 로딩 실패", error);
  }
})()
  .then(async () => {
    // console.log("스크립트 로드 완료.");
    // 모바일 환경이면 true / pc환경이면 false
    try {
      function isMobile() {
        const userAgent = window.navigator.userAgent;
        if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
          return true;
        }
        return false;
      }
      iTeXEQ.envilonment = isMobile();
    } catch (error) {
      console.log(error);
      console.log("모바일 / pc 환경 체크 실패");
    }

    // 키보드만: type1 / OCR만: type2 / 둘다: type3
    try {
      // editorType?await iTeXEQ.dreamPCEditor():
      await iTeXEQ.createEditorLayout("type3");
      // if (editorType === 1) {
      //   await iTeXEQ.dreamPCEditor();
      // } else if (editorType === 2) {
      //   await iTeXEQ.createEditorLayout("type3");
      // } else {
      //   console.log("editorType을 설정해주세요.");
      // }
    } catch (error) {
      console.log(error);
      console.log("수식편집기 레이아웃 그리기 실패");
    }
    console.log("editorType_s: ", window.editorType_s);
    // 키보드 데이터 불러오기
    try {
      const key_data_file = editorType
        ? "/static/iTeX_EQ/key_data_pc.json"
        : window.editorType_s
        ? "/static/iTeX_EQ/key_data_pc.json"
        : "/static/iTeX_EQ/key_data.json";
      await iTeXEQ.fetchJsonFile(key_data_file);
    } catch (error) {
      console.log(error);
      console.log("json 데이터 불러오기 실패");
    }
  })
  .then(async () => {
    iTeXEQ
      .init({
        mode: "custom", //normal 또는 custom
        path: "/static",
        // type: "type1",
        event: "click", //click 또는 touchstart
        element: "#display_container", //수식편집기 생성 위치 class 또는 id 지정
        // container: "itex_eq_editor_container", // 수식편집기 키보드 위치
        iframe: ".iframe_wrap", // 키보드 iframe이 들어가는 부모 element class 또는 id
        size: "24px", //편집기 화면 수식크기 지정
        editormode: "ui", //수식편집 모드 선택 ocr 또는 ui
        imemode: "en", //한영전환 전역변수 할당 en 또는 ko
        eqnLiveCheck: "off", //실시간 동기화 on 또는 off
        enterMove: "on", //엔터입력시 박스 위치 이동 옵션 활성화 on 또는 off
        innerClickClass: [iTeXEQ.editor_container], //수식 커서 포커싱 가능영역 class명 등록
        charSmRegular: "on", //on이면 키보드 소문자 입력시 레귤러 폰트 off이면 이탤릭 폰트
        textEditorMode: "on", //on이면 텍스트입력모드 off또는 값이 없으면 수식편집기모드
      })
      .then((result) => {
        // console.log(document.getElementById("tinyeditor"))
        function tinyloadcheck() {
          if (
            tinymce.activeEditor.contentWindow ||
            tinymce.activeEditor.contentDocument
          ) {
            iTeXEQ.itex_se2iframe =
              tinymce.activeEditor.contentWindow ||
              tinymce.activeEditor.contentDocument;
            console.log("TinyMCE ready!");
            // itex_equation_boot();
            document.getElementById("modal_block").style.display = "none";
            return;
          }
          console.log("TinyMCE loading...");
          window.setTimeout(tinyloadcheck, 50);
        }
        iTeXEQ.itexCustomSetting(); //custom 모드일 때 적용
        // console.log(result);
        // 수식편집기 이벤트 할당
        tinyloadcheck();
        iTeXEQ.editorEventHandler();
      });
    // .then(() => {
    //   document.querySelectorAll("#itex_open")[0].click();
    // });
  });

// css 불러오기
const cssUrls = [
  "/static/iTeX_EQ/css/itex_keyboard_v2.css",
  "/static/iTeX_EQ/css/itexeqneditor_n.css",
];

const loadCss = (url) =>
  new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
    document.head.appendChild(link);
  });

(async function () {
  try {
    console.log("css 불러오기 시작");
    for (const url of cssUrls) {
      await loadCss(url);
      // console.log(`Loaded CSS: ${url}`);
    }
    console.log("css 로드 완료");
  } catch (error) {
    console.error("Failed to load CSS files", error);
  }
})();
