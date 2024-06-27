/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */

console.log('itexLoader start');
(async function () {
  // MathJax 세팅
  try {
    MathJax = {
      tex: { inlineMath: [['\\(', '\\)']] },
      svg: {
        scale: 0.95,
        fontCache: 'local',
        minScale: 0.6,
      },
      options: {
        renderActions: {
          addMenu: [0, '', ''],
          assistiveMML: [],
        },
        menuOptions: {
          settings: {
            assistiveMMl: true,
          },
        },
      },
    };
  } catch (error) {
    console.log('MathJax 세팅 실패');
    console.log(error);
  }
  // 스크립트 로딩
  try {
    await new Promise((resolve) => {
      const checkLoaded = () => {
        if (
          typeof window.MathJax !== 'undefined' &&
          typeof window.MathJax.getMetricsFor !== 'undefined'
        ) {
          resolve();
        } else {
          setTimeout(checkLoaded, 50);
        }
      };
      checkLoaded();
    });
    const otherScriptUrls = [
      `/static/iTeX_EQ/js/ds.min.js`,
      `/static/iTeX_EQ/js/hangul.min.js`,
      // "./iTeX_EQ/js/itex_total_eq_origin_32.js?v=0.1.1",
      `/static/iTeX_EQ/js/itex_eq_common.js?v=0.1`,
      `/static/iTeX_EQ/js/itex_keyboard_v3.js?v=0.1`,
      `/static/iTeX_EQ/js/itex_setting.js?v=0.1`,
      `/static/iTeX_EQ/js/tex_list.js`,
    ];

    const loadScript = (url) =>
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
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
    console.error('이후 스크립트 로딩 실패', error);
  }
})()
  .then(async () => {
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
      console.log('모바일 / pc 환경 체크 실패');
    }

    try {
      await iTeXEQ.createEditorLayout('type3');
    } catch (error) {
      console.log(error);
      console.log('수식편집기 레이아웃 그리기 실패');
    }
    try {
      await iTeXEQ.fetchJsonFile(iTeXEQ.keyDataFile);
    } catch (error) {
      console.log(error);
      console.log('json 데이터 불러오기 실패');
    }
  })
  .then(async () => {
    iTeXEQ
      .init({
        mode: 'custom', //normal 또는 custom
        path: '',
        // type: "type1",
        event: 'click', //click 또는 touchstart
        element: '#display_container', //수식편집기 생성 위치 class 또는 id 지정
        // container: "itex_eq_editor_container", // 수식편집기 키보드 위치
        iframe: '.iframe_wrap', // 키보드 iframe이 들어가는 부모 element class 또는 id
        size: '24px', //편집기 화면 수식크기 지정
        editormode: 'ui', //수식편집 모드 선택 ocr 또는 ui
        imemode: 'en', //한영전환 전역변수 할당 en 또는 ko
        eqnLiveCheck: 'off', //실시간 동기화 on 또는 off
        enterMove: 'on', //엔터입력시 박스 위치 이동 옵션 활성화 on 또는 off
        innerClickClass: [iTeXEQ.editor_container], //수식 커서 포커싱 가능영역 class명 등록
        charSmRegular: 'on', //on이면 키보드 소문자 입력시 레귤러 폰트 off이면 이탤릭 폰트
        textEditorMode: 'on', //on이면 텍스트입력모드 off또는 값이 없으면 수식편집기모드
      })
      .then((result) => {
        function tinyloadcheck() {
          if (
            tinymce.activeEditor.contentWindow ||
            tinymce.activeEditor.contentDocument
          ) {
            iTeXEQ.itex_se2iframe =
              tinymce.activeEditor.contentWindow ||
              tinymce.activeEditor.contentDocument;
            console.log('TinyMCE ready!');
            document.getElementById('modal_block').style.display = 'none';
            return;
          }
          console.log('TinyMCE loading...');
          window.setTimeout(tinyloadcheck, 50);
        }
        iTeXEQ.itexCustomSetting();
        console.log(result);
        tinyloadcheck();
        iTeXEQ.editorEventHandler();
      });
  });

const cssUrls = [`/static/iTeX_EQ/css/itex_keyboard_v2.css`];

const loadCss = (url) =>
  new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
    document.head.appendChild(link);
  });

(async function () {
  try {
    for (const url of cssUrls) {
      await loadCss(url);
    }
    console.log('css 로드 완료');
  } catch (error) {
    console.error('Failed to load CSS files', error);
  }
})();
console.log('itexLoader end');
