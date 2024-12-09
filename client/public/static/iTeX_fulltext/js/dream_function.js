/* eslint-disable prettier/prettier */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-empty */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable no-redeclare */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-constant-condition */
/* eslint-disable no-func-assign */
/* eslint-disable no-undef */
const _0xc6c358 = _0x383b;
(function (_0xab39e0, _0x55715d) {
  const _0x3a42df = _0x383b,
    _0x5d95b2 = _0xab39e0();
  while (!![]) {
    try {
      const _0x19600f =
        parseInt(_0x3a42df(0x117)) / 0x1 +
        parseInt(_0x3a42df(0x13d)) / 0x2 +
        (parseInt(_0x3a42df(0x113)) / 0x3) *
          (parseInt(_0x3a42df(0x14b)) / 0x4) +
        -parseInt(_0x3a42df(0x12e)) / 0x5 +
        (-parseInt(_0x3a42df(0x154)) / 0x6) *
          (parseInt(_0x3a42df(0x16b)) / 0x7) +
        (-parseInt(_0x3a42df(0x175)) / 0x8) *
          (parseInt(_0x3a42df(0x12a)) / 0x9) +
        -parseInt(_0x3a42df(0x137)) / 0xa;
      if (_0x19600f === _0x55715d) break;
      else _0x5d95b2["push"](_0x5d95b2["shift"]());
    } catch (_0x3f4d50) {
      _0x5d95b2["push"](_0x5d95b2["shift"]());
    }
  }
})(_0x5a15, 0x1f6d6),
  (window["openEQ"] = (_0x4ff5db) => {
    const _0x1582d5 = _0x383b,
      _0x22314b = document[_0x1582d5(0x127)](iTeXEQ[_0x1582d5(0x140)]);
    function _0x147e3f() {
      const _0xf42cc6 = _0x1582d5;
      (onlyEQ = !![]),
        (onlyEQNode = _0x4ff5db),
        _0x22314b?.[_0xf42cc6(0x17e)][_0xf42cc6(0x185)](_0xf42cc6(0x134)),
        iTeXEQ[_0xf42cc6(0x157)]();
    }
    function _0x34d994() {
      (onlyEQ = ![]),
        (onlyEQNode = ""),
        _0x22314b?.["classList"]["add"]("display_inactive");
    }
    _0x22314b?.[_0x1582d5(0x17e)]["contains"]("display_inactive")
      ? _0x147e3f()
      : _0x34d994();
  }),
  (window[_0xc6c358(0x194)] = function setExamData(_0x467a81) {
    const _0x22e2e2 = _0xc6c358;
    try {
      const _0x3a38f5 = tinymce[_0x22e2e2(0x152)](_0x22e2e2(0x150));
      return _0x3a38f5
        ? (_0x3a38f5[_0x22e2e2(0x18e)]["setContent"](_0x467a81), !![])
        : (console["error"](_0x22e2e2(0x121)), ![]);
    } catch (_0x32a3e9) {
      return console[_0x22e2e2(0x16e)](_0x22e2e2(0x12b), _0x32a3e9), ![];
    }
  });
async function uploadImageToServer(_0x515522, _0xa868e5) {
  const _0x157875 = _0xc6c358,
    _0x2b2910 = new FormData();
  _0x2b2910[_0x157875(0x115)](_0x157875(0x122), _0xa868e5),
    _0x2b2910["append"]("img_save_type", _0x515522),
    _0x2b2910[_0x157875(0x115)]("save_path", dream_server_url);
  const _0x2327c8 = await fetch(dream_server_url + _0x157875(0x166), {
    method: _0x157875(0x149),
    body: _0x2b2910,
  });
  if (!_0x2327c8["ok"]) throw new Error(_0x157875(0x174));
  const _0x400b2d = await _0x2327c8[_0x157875(0x163)]();
  return _0x400b2d;
}
function clearEditorContent() {
  const _0x78f807 = _0xc6c358,
    _0x2d768c = tinymce[_0x78f807(0x152)]("tinyeditor");
  _0x2d768c
    ? _0x2d768c[_0x78f807(0x147)]("")
    : console["error"](_0x78f807(0x104));
}
window[_0xc6c358(0x107)] = async function () {
  const _0x4ba96e = _0xc6c358;
  try {
    const _0x179709 =
        tinymce["activeEditor"][_0x4ba96e(0x11b)][_0x4ba96e(0x158)] ||
        tinymce["activeEditor"][_0x4ba96e(0x169)][_0x4ba96e(0x158)],
      _0x530ed0 = iTeXEQ[_0x4ba96e(0x11d)](
        _0x179709[_0x4ba96e(0x17c)](_0x4ba96e(0x184))
      );
    if (!_0x530ed0) return console[_0x4ba96e(0x16e)](_0x4ba96e(0x125)), ![];
    const _0x418fa1 = [
        _0x4ba96e(0x14c),
        _0x4ba96e(0x13e),
        _0x4ba96e(0x130),
        _0x4ba96e(0x170),
        "tag_example",
        _0x4ba96e(0x109),
        _0x4ba96e(0x101),
        "tag_commentary",
        _0x4ba96e(0x106),
        _0x4ba96e(0x165),
        _0x4ba96e(0x181),
        _0x4ba96e(0x138),
      ],
      _0x213b13 = _0x530ed0["querySelectorAll"]("p");
    if (_0x213b13[_0x4ba96e(0x153)] > 0x0) {
      const _0x4d8184 = _0x213b13[0x0][_0x4ba96e(0x17c)](
          "br[data-mce-bogus=\x221\x22]"
        ),
        _0x511598 = Array["from"](_0x213b13[0x0]?.[_0x4ba96e(0x17e)])[
          _0x4ba96e(0x168)
        ]((_0x13d6c1) => _0x418fa1["includes"](_0x13d6c1)),
        _0x480576 = Array["from"](_0x213b13)[_0x4ba96e(0x168)](
          (_0x5e1003) =>
            _0x5e1003?.[_0x4ba96e(0x17e)][_0x4ba96e(0x151)](_0x4ba96e(0x130)) ||
            _0x5e1003?.[_0x4ba96e(0x17e)][_0x4ba96e(0x151)](_0x4ba96e(0x14c)) ||
            _0x5e1003?.[_0x4ba96e(0x17e)][_0x4ba96e(0x151)](_0x4ba96e(0x13e))
        ),
        _0x5da656 = Array[_0x4ba96e(0x171)](_0x213b13)[_0x4ba96e(0x168)](
          (_0x24eb18) =>
            _0x24eb18?.[_0x4ba96e(0x17e)][_0x4ba96e(0x151)](_0x4ba96e(0x15d))
        );
      if (_0x4d8184)
        return alert("내용\x20앞에\x20태그를\x20입력해주세요."), ![];
      if (!_0x511598)
        return alert(_0x4ba96e(0x139)), iTeXEQ[_0x4ba96e(0x155)](), ![];
      if (!_0x480576)
        return (
          alert("문제\x20or\x20대발문\x20or\x20지문\x20태그가\x20필요합니다!"),
          ![]
        );
    } else
      return (
        alert("No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document."),
        ![]
      );
    const _0x324941 = _0x530ed0[_0x4ba96e(0x183)](_0x4ba96e(0x17d)),
      _0x3a280b = Array[_0x4ba96e(0x171)](_0x324941)["map"](
        (_0x55bdae) => _0x55bdae[_0x4ba96e(0x18a)]
      );
    try {
      const _0x3686b7 = await uploadImageToServer(img_save_type, _0x3a280b);
      _0x3686b7[_0x4ba96e(0xff)]((_0x3c8c69, _0x5aa063) => {
        const _0x5ceb74 = _0x4ba96e,
          { imgUUID: _0x2f6870, imgURL: _0x32c2b3 } = _0x3c8c69,
          _0x1cfbe4 = _0x324941[_0x5aa063];
        if (img_save_type === 0x1)
          _0x1cfbe4[_0x5ceb74(0x12c)](
            _0x5ceb74(0x18a),
            dream_server_url + _0x32c2b3
          );
        else {
          if (img_save_type === 0x2)
            _0x1cfbe4[_0x5ceb74(0x12c)](_0x5ceb74(0x18a), _0x32c2b3);
          else
            img_save_type === 0x3 &&
              _0x1cfbe4[_0x5ceb74(0x12c)](_0x5ceb74(0x18a), _0x32c2b3);
        }
        _0x1cfbe4[_0x5ceb74(0x189)]("data-mce-src");
      });
    } catch (_0x7e681) {
      console[_0x4ba96e(0x16e)](_0x4ba96e(0x164), _0x7e681);
    }
    const _0x2b73f2 = _0x530ed0["innerHTML"],
      _0x54972a = {
        tag_group: _0x2b73f2,
        tag_bigcontent: [],
        tag_content: [],
        tag_exam: [],
        tag_exam_sm: [],
        tag_example: [],
        tag_choices: [],
        tl_answer: [],
        tag_commentary: [],
        tag_hint: [],
        tag_concept: [],
        tag_title: [],
        tag_tip: [],
      },
      _0x33c668 = new DOMParser(),
      _0x38c334 = _0x33c668[_0x4ba96e(0x17a)](_0x2b73f2, "text/html");
    let _0x16795f = null,
      _0x38747f = "";
    if (!_0x38c334[_0x4ba96e(0x184)])
      return console[_0x4ba96e(0x16e)](_0x4ba96e(0x118)), ![];
    const _0x1087b3 = (_0x5bf434, _0x352671) => {
      const _0x3610c0 = _0x4ba96e;
      Array[_0x3610c0(0x178)](_0x54972a[_0x5bf434]) &&
        _0x54972a[_0x5bf434][_0x3610c0(0x146)](_0x352671);
    };
    Array[_0x4ba96e(0x171)](_0x38c334[_0x4ba96e(0x184)][_0x4ba96e(0x179)])[
      _0x4ba96e(0xff)
    ]((_0x4caa26) => {
      const _0x3fd669 = _0x4ba96e;
      if (_0x4caa26[_0x3fd669(0x14f)] === Node["ELEMENT_NODE"]) {
        const _0xefe437 = Array[_0x3fd669(0x171)](
            _0x4caa26?.[_0x3fd669(0x17e)]
          ),
          _0x42bf7d = _0xefe437[_0x3fd669(0x168)]((_0x41ce54) =>
            _0x418fa1[_0x3fd669(0x141)](_0x41ce54)
          );
        if (_0x42bf7d)
          _0x16795f && _0x1087b3(_0x16795f, _0x38747f),
            (_0x16795f = _0x42bf7d),
            (_0x38747f = _0x4caa26[_0x3fd669(0x10f)]);
        else _0x16795f && (_0x38747f += _0x4caa26[_0x3fd669(0x10f)]);
      }
    });
    _0x16795f && _0x1087b3(_0x16795f, _0x38747f);
    const _0x2b5cba = JSON[_0x4ba96e(0x132)](_0x54972a, null, 0x2);
    return iTeXEQ[_0x4ba96e(0x155)](), clearEditorContent(), _0x2b5cba;
  } catch (_0x28f67a) {
    return console["error"](_0x4ba96e(0x12f), _0x28f67a), ![];
  }
};
function hml_upload(_0x4ac44b) {
  const _0x5b6a53 = _0xc6c358;
  var _0x2a8284 = new FormData();
  _0x2a8284[_0x5b6a53(0x115)]("file_name", _0x4ac44b[_0x5b6a53(0x105)]),
    _0x2a8284[_0x5b6a53(0x115)]("file", _0x4ac44b),
    _0x2a8284[_0x5b6a53(0x115)](_0x5b6a53(0x11a), img_save_type),
    _0x2a8284[_0x5b6a53(0x115)]("save_path", dream_server_url);
  var _0x4722d5 = new XMLHttpRequest();
  _0x4722d5[_0x5b6a53(0x176)](
    _0x5b6a53(0x149),
    dream_server_url + "/qnapi_dream/hml_upload",
    !![]
  ),
    _0x4722d5[_0x5b6a53(0x162)](_0x2a8284),
    (_0x4722d5[_0x5b6a53(0x16d)] = function () {
      const _0x2bfcb9 = _0x5b6a53;
      if (_0x4722d5["readyState"] == 0x4 && _0x4722d5["status"] == 0xc8) {
        const _0x48065b = document[_0x2bfcb9(0x17c)](_0x2bfcb9(0x172));
        var _0x140db9 = JSON["parse"](_0x4722d5[_0x2bfcb9(0x15a)]);
        (_0x48065b[_0x2bfcb9(0x182)] = _0x140db9[_0x2bfcb9(0x131)]),
          document[_0x2bfcb9(0x17c)](_0x2bfcb9(0x129))?.["classList"]["add"](
            _0x2bfcb9(0x177)
          ),
          iTeXEQ[_0x2bfcb9(0x120)](_0x48065b),
          (document[_0x2bfcb9(0x127)](_0x2bfcb9(0x114))["style"][
            _0x2bfcb9(0x193)
          ] = _0x2bfcb9(0x11c)),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
let lastClickedBoxId = null,
  currentEditorContent = "";
function htmlStringToNode(_0x3ba4e9) {
  const _0x370e26 = _0xc6c358;
  var _0x5254ad = document[_0x370e26(0x143)]("template");
  return (_0x5254ad[_0x370e26(0x182)] = _0x3ba4e9), _0x5254ad[_0x370e26(0x103)];
}
function _0x5a15() {
  const _0x50f3b2 = [
    "setExamList",
    "display_inactive",
    "log",
    "replace",
    "2249750XEzfiL",
    "tag_tip",
    "내용\x20앞에\x20태그를\x20입력해\x20주세요",
    "message",
    "readyState",
    "function",
    "430224OxRjyv",
    "tag_content",
    "원래\x20자리를\x20찾을\x20수\x20없습니다.",
    "editor_container",
    "includes",
    "substring",
    "createElement",
    "COMMENTARY",
    "EXAMPLE",
    "push",
    "setContent",
    "/qnapi_dream/hml_upload",
    "POST",
    "HINT",
    "20LhsFvG",
    "tag_bigcontent",
    "target",
    "file_name",
    "nodeType",
    "tinyeditor",
    "contains",
    "get",
    "length",
    "24FTUXgg",
    "latexrecovery",
    "exam_box_",
    "editorStart",
    "document",
    "style",
    "responseText",
    "text/html",
    "status",
    "tag_group",
    "getAttribute",
    "div",
    "변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.",
    "trim",
    "send",
    "json",
    "Error\x20processing\x20image:",
    "tag_concept",
    "/uploadImage",
    "tag_example",
    "find",
    "contentDocument",
    "addEventListener",
    "62461hFXdQB",
    "file",
    "onreadystatechange",
    "error",
    "contenteditable",
    "tag_exam_sm",
    "from",
    ".itex_hml_convert_view",
    "textContent",
    "Error\x20uploading\x20image",
    "16PpegWW",
    "open",
    "itex_area_hidden",
    "isArray",
    "childNodes",
    "parseFromString",
    "에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?",
    "querySelector",
    "img",
    "classList",
    "TEXT",
    "ANSWER",
    "tag_title",
    "innerHTML",
    "querySelectorAll",
    "body",
    "remove",
    "data",
    "tag_commentary",
    "lastIndexOf",
    "removeAttribute",
    "src",
    "문서를\x20업로드\x20하세요.",
    "parse",
    "closest",
    "selection",
    "match",
    "false",
    "TITLE",
    "QUESTION",
    "display",
    "usePostJsonData",
    "para0",
    "forEach",
    "getContent",
    "tl_answer",
    "데이터가\x20존재하지\x20않습니다.",
    "content",
    "Editor\x20not\x20found",
    "name",
    "tag_hint",
    "saveExamData",
    "className",
    "tag_choices",
    "recoverynew",
    "exam_box",
    "map",
    "join",
    "수정할\x20요소가\x20선택되지\x20않았습니다.",
    "outerHTML",
    "Error\x20in\x20math\x20render:",
    "nextElementSibling",
    ".exam_box",
    "86781OttiTF",
    "modal_block",
    "append",
    "BIG",
    "176292Mdjnmc",
    "Parsed\x20document\x20does\x20not\x20contain\x20body.",
    "save_path",
    "img_save_type",
    "contentWindow",
    "none",
    "removeSVG",
    "data-mce-src",
    "saveHmlData",
    "recoverynew_no_click",
    "ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.",
    "img_data",
    "click",
    "add",
    "No\x20data\x20found\x20in\x20the\x20parsed\x20document.",
    "SMALL",
    "getElementById",
    "appendChild",
    ".origin_img_area",
    "179154BbVZmE",
    "콘텐츠\x20삽입\x20중\x20오류\x20발생:",
    "setAttribute",
    "CONCEPT",
    "534170sHQsyX",
    "Error\x20while\x20saving\x20exam\x20data:",
    "tag_exam",
    "itexdata",
    "stringify",
  ];
  _0x5a15 = function () {
    return _0x50f3b2;
  };
  return _0x5a15();
}
async function hml_edit_finish() {
  const _0x56363e = _0xc6c358;
  if (!lastClickedBoxId) {
    console["error"](_0x56363e(0x10e));
    return;
  }
  const _0x49f0b7 = tinymce[_0x56363e(0x152)]("tinyeditor")["getContent"](),
    _0x3741de = document[_0x56363e(0x17c)](_0x56363e(0x172)),
    _0x43f305 = document[_0x56363e(0x127)](lastClickedBoxId);
  if (_0x43f305) {
    const _0x18f86b = htmlStringToNode(_0x49f0b7);
    try {
      const _0x162753 = await iTeXDBW_mathrender_hml(_0x18f86b),
        _0x264313 = document[_0x56363e(0x143)](_0x56363e(0x15f));
      _0x264313["appendChild"](_0x162753),
        (_0x43f305[_0x56363e(0x10f)] = _0x264313[_0x56363e(0x182)]),
        iTeXEQ[_0x56363e(0x120)](_0x3741de),
        tinymce[_0x56363e(0x152)](_0x56363e(0x150))[_0x56363e(0x147)](""),
        (lastClickedBoxId = null),
        (currentEditorContent = "");
    } catch (_0x1b8de8) {
      console[_0x56363e(0x16e)](_0x56363e(0x110), _0x1b8de8);
    }
  } else console[_0x56363e(0x16e)](_0x56363e(0x13f));
}
function _0x383b(_0x4a89e7, _0x14bca1) {
  const _0x5a1552 = _0x5a15();
  return (
    (_0x383b = function (_0x383b71, _0x2ddd40) {
      _0x383b71 = _0x383b71 - 0xff;
      let _0x1b16bf = _0x5a1552[_0x383b71];
      return _0x1b16bf;
    }),
    _0x383b(_0x4a89e7, _0x14bca1)
  );
}
async function hml_upload_frame(_0x268d3f) {
  const _0x400333 = _0xc6c358;
  document["getElementById"]("modal_block")[_0x400333(0x159)]["display"] =
    "block";
  var _0x465382 = new FormData();
  _0x465382[_0x400333(0x115)](_0x400333(0x14e), _0x268d3f[_0x400333(0x105)]),
    _0x465382[_0x400333(0x115)](_0x400333(0x16c), _0x268d3f),
    _0x465382["append"](_0x400333(0x11a), img_save_type),
    _0x465382[_0x400333(0x115)](_0x400333(0x119), dream_server_url);
  var _0x43c087 = new XMLHttpRequest();
  _0x43c087[_0x400333(0x176)](
    _0x400333(0x149),
    dream_server_url + _0x400333(0x148),
    !![]
  ),
    _0x43c087[_0x400333(0x162)](_0x465382),
    (_0x43c087[_0x400333(0x16d)] = async function () {
      const _0x3eec68 = _0x400333;
      if (
        _0x43c087[_0x3eec68(0x13b)] == 0x4 &&
        _0x43c087[_0x3eec68(0x15c)] == 0xc8
      ) {
        const _0x1418c8 = document[_0x3eec68(0x17c)](_0x3eec68(0x172));
        var _0x2354d5 = JSON[_0x3eec68(0x18c)](_0x43c087["responseText"]);
        const _0x490d6a = iTeX_hml_tag_parser(_0x2354d5[_0x3eec68(0x131)]);
        (_0x1418c8[_0x3eec68(0x182)] = _0x490d6a),
          _0x1418c8[_0x3eec68(0x16a)](
            _0x3eec68(0x123),
            async function (_0x11d455) {
              const _0x38617c = _0x3eec68;
              if (_0x11d455["target"]["closest"](_0x38617c(0x112))) {
                const _0x42302f = _0x11d455[_0x38617c(0x14d)][_0x38617c(0x18d)](
                    _0x38617c(0x112)
                  ),
                  _0x180865 = _0x42302f[_0x38617c(0x15e)]("id");
                lastClickedBoxId &&
                  tinymce["get"](_0x38617c(0x150))[_0x38617c(0x100)]() !==
                    currentEditorContent &&
                  confirm(_0x38617c(0x160)) &&
                  (await hml_edit_finish());
                const _0x197088 = htmlStringToNode(_0x42302f[_0x38617c(0x10f)]);
                lastClickedBoxId = _0x180865;
                try {
                  const _0x267586 = await iTeXDBW_mathrender_hml(_0x197088),
                    _0x463199 = document[_0x38617c(0x143)](_0x38617c(0x15f));
                  _0x463199[_0x38617c(0x128)](_0x267586),
                    tinymce[_0x38617c(0x152)](_0x38617c(0x150))[
                      _0x38617c(0x147)
                    ](_0x463199["innerHTML"]),
                    (currentEditorContent = _0x463199[_0x38617c(0x182)]);
                } catch (_0x53e798) {
                  console[_0x38617c(0x16e)](_0x38617c(0x110), _0x53e798);
                }
                iTeXEQ[_0x38617c(0x10a)]();
              }
            }
          ),
          document[_0x3eec68(0x17c)](_0x3eec68(0x129))?.[_0x3eec68(0x17e)][
            "add"
          ]("itex_area_hidden"),
          iTeXEQ["recoverynew_no_click"](_0x1418c8),
          (document[_0x3eec68(0x127)](_0x3eec68(0x114))[_0x3eec68(0x159)][
            _0x3eec68(0x193)
          ] = _0x3eec68(0x11c));
      }
    });
}
window[_0xc6c358(0x11f)] = async function () {
  const _0x374362 = _0xc6c358,
    _0x3b79c6 = document[_0x374362(0x17c)](_0x374362(0x172))["cloneNode"](!![]);
  if (!_0x3b79c6["hasChildNodes"]()) {
    alert(_0x374362(0x18b));
    return;
  }
  const _0x25e96f = tinymce[_0x374362(0x152)]("tinyeditor")[_0x374362(0x100)]();
  if (_0x25e96f["trim"]() !== "") {
    const _0x78c4e2 = confirm(_0x374362(0x17b));
    if (!_0x78c4e2) return;
  }
  if (_0x3b79c6) {
    const _0x41126d = _0x3b79c6[_0x374362(0x183)](_0x374362(0x112)),
      _0x29b3c1 = [],
      _0x567473 = _0x3b79c6[_0x374362(0x183)](_0x374362(0x17d)),
      _0x12af7d = Array["from"](_0x567473)["map"](
        (_0x1bb16c) => _0x1bb16c[_0x374362(0x18a)]
      );
    try {
      const _0x34e6ab = await uploadImageToServer(img_save_type, _0x12af7d);
      _0x34e6ab["forEach"]((_0x446aee, _0x4a255b) => {
        const _0x1369ea = _0x374362,
          { imgUUID: _0x354ec9, imgURL: _0x587356 } = _0x446aee,
          _0x4a50e0 = _0x567473[_0x4a255b],
          _0x36aabb = _0x4a50e0[_0x1369ea(0x18a)],
          _0x3b44d9 = _0x36aabb[_0x1369ea(0x142)](
            _0x36aabb["lastIndexOf"]("/")
          ),
          _0x11698a = _0x587356["substring"](
            0x0,
            _0x587356[_0x1369ea(0x188)]("/")
          ),
          _0x1b53d9 = "" + _0x11698a + _0x3b44d9;
        if (img_save_type === 0x1)
          _0x4a50e0[_0x1369ea(0x12c)](
            _0x1369ea(0x18a),
            dream_server_url + _0x1b53d9
          );
        else {
          if (img_save_type === 0x2)
            _0x4a50e0[_0x1369ea(0x12c)](_0x1369ea(0x18a), _0x1b53d9);
          else
            img_save_type === 0x3 &&
              _0x4a50e0["setAttribute"]("src", _0x1b53d9);
        }
        _0x4a50e0[_0x1369ea(0x189)](_0x1369ea(0x11e));
      });
    } catch (_0x353196) {
      console[_0x374362(0x16e)](_0x374362(0x164), _0x353196);
    }
    return (
      _0x41126d[_0x374362(0xff)]((_0x33ea3e, _0x1c8c3d) => {
        const _0x5f907a = _0x374362,
          _0x15f784 = [];
        let _0x3be3dc = 0x1;
        const _0x1fd17d = _0x33ea3e["querySelectorAll"]("p");
        _0x1fd17d[_0x5f907a(0xff)]((_0x1c326f) => {
          const _0xbe12e2 = _0x5f907a,
            _0x339404 = _0x1c326f?.[_0xbe12e2(0x17e)];
          let _0x4e3b25 = null;
          if (_0x339404[_0xbe12e2(0x151)](_0xbe12e2(0x14c)))
            _0x4e3b25 = _0xbe12e2(0x116);
          else {
            if (_0x339404[_0xbe12e2(0x151)](_0xbe12e2(0x13e)))
              _0x4e3b25 = _0xbe12e2(0x17f);
            else {
              if (_0x339404["contains"](_0xbe12e2(0x130)))
                _0x4e3b25 = _0xbe12e2(0x192);
              else {
                if (_0x339404[_0xbe12e2(0x151)]("tag_exam_sm"))
                  _0x4e3b25 = _0xbe12e2(0x126);
                else {
                  if (_0x339404[_0xbe12e2(0x151)]("tag_example"))
                    _0x4e3b25 = _0xbe12e2(0x145);
                  else {
                    if (_0x339404[_0xbe12e2(0x151)](_0xbe12e2(0x109)))
                      _0x4e3b25 = "CHOICES";
                    else {
                      if (_0x339404["contains"](_0xbe12e2(0x101)))
                        _0x4e3b25 = _0xbe12e2(0x180);
                      else {
                        if (_0x339404[_0xbe12e2(0x151)](_0xbe12e2(0x187)))
                          _0x4e3b25 = _0xbe12e2(0x144);
                        else {
                          if (_0x339404[_0xbe12e2(0x151)](_0xbe12e2(0x106)))
                            _0x4e3b25 = _0xbe12e2(0x14a);
                          else {
                            if (_0x339404[_0xbe12e2(0x151)]("tag_concept"))
                              _0x4e3b25 = _0xbe12e2(0x12d);
                            else {
                              if (_0x339404[_0xbe12e2(0x151)](_0xbe12e2(0x181)))
                                _0x4e3b25 = _0xbe12e2(0x191);
                              else {
                                if (_0x339404[_0xbe12e2(0x151)]("tag_tip"))
                                  _0x4e3b25 = "TIP";
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (_0x4e3b25) {
            let _0x3a924e = _0x1c326f[_0xbe12e2(0x10f)],
              _0x2483d1 = _0x1c326f[_0xbe12e2(0x111)];
            while (
              _0x2483d1 &&
              !_0x2483d1[_0xbe12e2(0x17e)]["contains"](_0xbe12e2(0x14c)) &&
              !_0x2483d1[_0xbe12e2(0x17e)][_0xbe12e2(0x151)](
                _0xbe12e2(0x13e)
              ) &&
              !_0x2483d1[_0xbe12e2(0x17e)]["contains"](_0xbe12e2(0x130)) &&
              !_0x2483d1[_0xbe12e2(0x17e)][_0xbe12e2(0x151)](
                _0xbe12e2(0x170)
              ) &&
              !_0x2483d1[_0xbe12e2(0x17e)]["contains"](_0xbe12e2(0x167)) &&
              !_0x2483d1[_0xbe12e2(0x17e)]["contains"]("tag_choices") &&
              !_0x2483d1["classList"][_0xbe12e2(0x151)](_0xbe12e2(0x101)) &&
              !_0x2483d1[_0xbe12e2(0x17e)][_0xbe12e2(0x151)](
                _0xbe12e2(0x187)
              ) &&
              !_0x2483d1[_0xbe12e2(0x17e)][_0xbe12e2(0x151)](
                _0xbe12e2(0x106)
              ) &&
              !_0x2483d1["classList"]["contains"](_0xbe12e2(0x165)) &&
              !_0x2483d1[_0xbe12e2(0x17e)][_0xbe12e2(0x151)](
                _0xbe12e2(0x181)
              ) &&
              !_0x2483d1[_0xbe12e2(0x17e)][_0xbe12e2(0x151)](_0xbe12e2(0x138))
            ) {
              (_0x3a924e += _0x2483d1[_0xbe12e2(0x10f)]),
                (_0x2483d1 = _0x2483d1["nextElementSibling"]);
            }
            _0x15f784[_0xbe12e2(0x146)]({
              type: _0x4e3b25,
              content: _0x3a924e,
              sort: _0x3be3dc++,
            });
          }
        }),
          _0x29b3c1["push"]({ id: null, quizItemList: _0x15f784 });
      }),
      tinymce[_0x374362(0x152)](_0x374362(0x150))[_0x374362(0x147)](""),
      _0x29b3c1
    );
  } else return console[_0x374362(0x135)](_0x374362(0x102)), null;
};
function processHmlData(_0x6deb53) {
  const _0xcbcfb9 = _0xc6c358,
    _0x448c2b = [],
    _0x222374 = Array["from"](_0x6deb53[_0xcbcfb9(0x183)]("p"));
  let _0x17fad2 = [],
    _0x47aebe = ![];
  return (
    _0x222374[_0xcbcfb9(0xff)]((_0x40006f) => {
      const _0x78137 = _0xcbcfb9;
      divideKey[_0x78137(0x141)](_0x40006f[_0x78137(0x108)])
        ? (_0x17fad2[_0x78137(0x153)] > 0x0 &&
            (_0x448c2b["push"](
              _0x17fad2[_0x78137(0x10c)](
                (_0xa49304) => _0xa49304[_0x78137(0x10f)]
              )[_0x78137(0x10d)]("")
            ),
            (_0x17fad2 = [])),
          _0x17fad2[_0x78137(0x146)](_0x40006f))
        : _0x17fad2[_0x78137(0x146)](_0x40006f);
    }),
    _0x17fad2["length"] > 0x0 &&
      _0x448c2b[_0xcbcfb9(0x146)](
        _0x17fad2[_0xcbcfb9(0x10c)]((_0x1cb58e) => _0x1cb58e[_0xcbcfb9(0x10f)])[
          _0xcbcfb9(0x10d)
        ]("")
      ),
    _0x448c2b
  );
}
window[_0xc6c358(0x16a)](_0xc6c358(0x13a), (_0x2dc922) => {
  const _0x183081 = _0xc6c358,
    { functionName: _0x497102, args: _0xd9cc7c } = _0x2dc922[_0x183081(0x186)];
  _0x497102 === "setExamData" &&
    typeof window[_0x497102] === _0x183081(0x13c) &&
    window[_0x497102](_0xd9cc7c[0x0]),
    _0x497102 === _0x183081(0x133) &&
      typeof window[_0x497102] === _0x183081(0x13c) &&
      window[_0x497102](_0xd9cc7c[0x0]),
    _0x497102 === "getExamCodenum" &&
      typeof window[_0x497102] === _0x183081(0x13c) &&
      window[_0x497102](_0xd9cc7c[0x0]),
    _0x497102 === "saveExamData" &&
      typeof window[_0x497102] === _0x183081(0x13c) &&
      window[_0x497102](_0xd9cc7c[0x0]);
});
function iTeX_hml_tag_parser(_0x1f24da) {
  const _0x575f7a = _0xc6c358,
    _0x1b4525 = new DOMParser(),
    _0x42c378 = _0x1b4525[_0x575f7a(0x17a)](_0x1f24da, _0x575f7a(0x15b)),
    _0x39699f = _0x42c378[_0x575f7a(0x183)]("p"),
    _0x2e9a3b = {
      그룹: _0x575f7a(0x15d),
      대발문: _0x575f7a(0x14c),
      지문: _0x575f7a(0x13e),
      문제: _0x575f7a(0x130),
      소문제: _0x575f7a(0x170),
      보기: "tag_example",
      선지: _0x575f7a(0x109),
      정답: _0x575f7a(0x101),
      해설: _0x575f7a(0x187),
      힌트: _0x575f7a(0x106),
      개념: _0x575f7a(0x165),
      제목: "tag_title",
      팁: "tag_tip",
    };
  let _0x31826a = "",
    _0x5658ec = null,
    _0x31e087 = 0x0,
    _0x3d03df = ![];
  _0x39699f[_0x575f7a(0xff)]((_0x4eff9e, _0x411207) => {
    const _0x138f34 = _0x575f7a;
    _0x4eff9e[_0x138f34(0x189)]("style");
    let _0x2fb30a = _0x4eff9e["textContent"][_0x138f34(0x161)]();
    const _0x313774 = _0x2fb30a[_0x138f34(0x18f)](/^\[(.*?)\]$/);
    if (_0x313774) {
      const _0x5d5eaf = _0x313774[0x1][_0x138f34(0x136)](/\s+/g, "");
      if (_0x5d5eaf in _0x2e9a3b) {
        _0x4eff9e?.[_0x138f34(0x17e)]["add"](_0x2e9a3b[_0x5d5eaf]),
          _0x4eff9e[_0x138f34(0x12c)]("contenteditable", _0x138f34(0x190));
        if (_0x2e9a3b[_0x5d5eaf] === _0x138f34(0x15d))
          _0x3d03df
            ? (_0x3d03df = ![])
            : (_0x5658ec &&
                ((_0x31826a += _0x5658ec["outerHTML"]), (_0x5658ec = null)),
              (_0x5658ec = document[_0x138f34(0x143)](_0x138f34(0x15f))),
              _0x5658ec?.["classList"][_0x138f34(0x124)](_0x138f34(0x10b)),
              _0x5658ec[_0x138f34(0x12c)]("id", _0x138f34(0x156) + _0x31e087++),
              (_0x3d03df = !![]));
        else {
          if (_0x2e9a3b[_0x5d5eaf] === _0x138f34(0x130)) {
            if (_0x3d03df) {
            } else
              _0x5658ec &&
                ((_0x31826a += _0x5658ec[_0x138f34(0x10f)]),
                (_0x5658ec = null)),
                (_0x5658ec = document["createElement"](_0x138f34(0x15f))),
                _0x5658ec?.[_0x138f34(0x17e)][_0x138f34(0x124)](
                  _0x138f34(0x10b)
                ),
                _0x5658ec[_0x138f34(0x12c)](
                  "id",
                  _0x138f34(0x156) + _0x31e087++
                );
          }
        }
      }
    }
    _0x5658ec && _0x5658ec["appendChild"](_0x4eff9e);
  });
  if (_0x5658ec) {
    if (_0x3d03df) {
      const _0x2abb22 = document[_0x575f7a(0x143)]("p");
      _0x2abb22[_0x575f7a(0x17e)][_0x575f7a(0x124)](
        _0x575f7a(0x195),
        _0x575f7a(0x15d)
      ),
        _0x2abb22[_0x575f7a(0x12c)](_0x575f7a(0x16f), _0x575f7a(0x190)),
        (_0x2abb22[_0x575f7a(0x173)] = "[그룹]"),
        _0x5658ec[_0x575f7a(0x128)](_0x2abb22),
        (_0x31826a += _0x5658ec[_0x575f7a(0x10f)]);
    } else _0x31826a += _0x5658ec["outerHTML"];
  }
  return _0x31826a;
}
