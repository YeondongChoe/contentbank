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
const _0x2fdc29 = _0x2091;
(function (_0x45ee77, _0x3ba44d) {
  const _0x336b63 = _0x2091,
    _0x482abf = _0x45ee77();
  while (!![]) {
    try {
      const _0x17981b =
        (parseInt(_0x336b63(0x19e)) / 0x1) *
          (-parseInt(_0x336b63(0x17b)) / 0x2) +
        (-parseInt(_0x336b63(0x1af)) / 0x3) *
          (parseInt(_0x336b63(0x19a)) / 0x4) +
        parseInt(_0x336b63(0x16b)) / 0x5 +
        -parseInt(_0x336b63(0x1b1)) / 0x6 +
        (parseInt(_0x336b63(0x1d2)) / 0x7) *
          (-parseInt(_0x336b63(0x16d)) / 0x8) +
        parseInt(_0x336b63(0x1a0)) / 0x9 +
        (parseInt(_0x336b63(0x18b)) / 0xa) * (parseInt(_0x336b63(0x198)) / 0xb);
      if (_0x17981b === _0x3ba44d) break;
      else _0x482abf["push"](_0x482abf["shift"]());
    } catch (_0xf827b1) {
      _0x482abf["push"](_0x482abf["shift"]());
    }
  }
})(_0x149b, 0xce99e),
  (window[_0x2fdc29(0x14b)] = (_0x578f14) => {
    const _0x5adfde = _0x2fdc29,
      _0x10b2ec = document[_0x5adfde(0x153)](iTeXEQ[_0x5adfde(0x17e)]);
    function _0x4c907b() {
      const _0x5bd7cc = _0x5adfde;
      (onlyEQ = !![]),
        (onlyEQNode = _0x578f14),
        _0x10b2ec?.[_0x5bd7cc(0x178)][_0x5bd7cc(0x15d)](_0x5bd7cc(0x1d4)),
        iTeXEQ["editorStart"]();
    }
    function _0xc7066b() {
      const _0xbd901a = _0x5adfde;
      (onlyEQ = ![]),
        (onlyEQNode = ""),
        _0x10b2ec?.[_0xbd901a(0x178)]["add"](_0xbd901a(0x1d4));
    }
    _0x10b2ec?.[_0x5adfde(0x178)][_0x5adfde(0x199)](_0x5adfde(0x1d4))
      ? _0x4c907b()
      : _0xc7066b();
  }),
  (window["usePostJsonData"] = function setExamData(_0x2248c7) {
    const _0xe94919 = _0x2fdc29;
    try {
      const _0x557241 = tinymce[_0xe94919(0x155)](_0xe94919(0x1d1));
      return _0x557241
        ? (_0x557241[_0xe94919(0x165)][_0xe94919(0x1c0)](_0x2248c7), !![])
        : (console[_0xe94919(0x1a2)](_0xe94919(0x182)), ![]);
    } catch (_0x530130) {
      return console[_0xe94919(0x1a2)](_0xe94919(0x183), _0x530130), ![];
    }
  });
async function uploadImageToServer(_0x4b0e7c, _0x4c6cad) {
  const _0x805732 = _0x2fdc29,
    _0x36d483 = new FormData();
  _0x36d483["append"]("img_data", _0x4c6cad),
    _0x36d483["append"]("img_save_type", _0x4b0e7c),
    _0x36d483["append"](_0x805732(0x157), dream_server_url);
  const _0x277e17 = await fetch(dream_server_url + _0x805732(0x166), {
    method: _0x805732(0x170),
    body: _0x36d483,
  });
  if (!_0x277e17["ok"]) throw new Error(_0x805732(0x193));
  const _0x2b3646 = await _0x277e17[_0x805732(0x1c3)]();
  return _0x2b3646;
}
function clearEditorContent() {
  const _0x260a0d = _0x2fdc29,
    _0x105837 = tinymce[_0x260a0d(0x155)](_0x260a0d(0x1d1));
  _0x105837
    ? _0x105837[_0x260a0d(0x1c0)]("")
    : console[_0x260a0d(0x1a2)](_0x260a0d(0x172));
}
window["saveExamData"] = async function () {
  const _0x280347 = _0x2fdc29;
  try {
    const _0x282cf0 =
        tinymce["activeEditor"][_0x280347(0x190)][_0x280347(0x1a7)] ||
        tinymce["activeEditor"]["contentDocument"][_0x280347(0x1a7)],
      _0x3558bc = iTeXEQ["removeSVG"](
        _0x282cf0[_0x280347(0x1cf)](_0x280347(0x163))
      );
    if (!_0x3558bc) return console[_0x280347(0x1a2)](_0x280347(0x15c)), ![];
    const _0x465fd8 = [
        _0x280347(0x177),
        _0x280347(0x1a3),
        _0x280347(0x1bd),
        _0x280347(0x1ce),
        _0x280347(0x15e),
        _0x280347(0x1d7),
        "tl_answer",
        _0x280347(0x184),
        "tag_hint",
        _0x280347(0x186),
        "tag_title",
        _0x280347(0x14f),
      ],
      _0x1077df = _0x3558bc[_0x280347(0x1c1)]("p");
    if (_0x1077df[_0x280347(0x168)] > 0x0) {
      const _0x4d754b = _0x1077df[0x0][_0x280347(0x1cf)](_0x280347(0x160)),
        _0x5ddef5 = Array[_0x280347(0x19c)](_0x1077df[0x0]?.[_0x280347(0x178)])[
          _0x280347(0x1db)
        ]((_0x36cf61) => _0x465fd8["includes"](_0x36cf61)),
        _0x4d0153 = Array["from"](_0x1077df)[_0x280347(0x1db)](
          (_0xa8e59d) =>
            _0xa8e59d?.[_0x280347(0x178)][_0x280347(0x199)](_0x280347(0x1bd)) ||
            _0xa8e59d?.[_0x280347(0x178)]["contains"](_0x280347(0x177)) ||
            _0xa8e59d?.["classList"][_0x280347(0x199)](_0x280347(0x1a3))
        ),
        _0x5449a4 = Array[_0x280347(0x19c)](_0x1077df)[_0x280347(0x1db)](
          (_0x4c3de7) =>
            _0x4c3de7?.[_0x280347(0x178)]["contains"](_0x280347(0x1b3))
        );
      if (_0x4d754b) return alert(_0x280347(0x158)), ![];
      if (!_0x5ddef5)
        return alert(_0x280347(0x14c)), iTeXEQ[_0x280347(0x164)](), ![];
      if (!_0x4d0153) return alert(_0x280347(0x1cb)), ![];
    } else return alert(_0x280347(0x1d5)), ![];
    const _0x4f67e6 = _0x3558bc[_0x280347(0x1c1)](_0x280347(0x156)),
      _0x39be1b = Array["from"](_0x4f67e6)["map"](
        (_0x4a31e1) => _0x4a31e1["src"]
      );
    try {
      console["log"](_0x280347(0x1c7), _0x39be1b);
      const _0x16934e = await uploadImageToServer(img_save_type, _0x39be1b);
      _0x16934e[_0x280347(0x16f)]((_0x455b5f, _0x5d14c9) => {
        const _0xc72a09 = _0x280347,
          { imgUUID: _0x1aa6ca, imgURL: _0x1d244d } = _0x455b5f,
          _0x28e179 = _0x4f67e6[_0x5d14c9];
        if (img_save_type === 0x1)
          _0x28e179[_0xc72a09(0x1a5)](
            _0xc72a09(0x1c9),
            dream_server_url + _0x1d244d
          );
        else {
          if (img_save_type === 0x2)
            _0x28e179["setAttribute"](_0xc72a09(0x1c9), _0x1d244d);
          else
            img_save_type === 0x3 &&
              _0x28e179["setAttribute"]("src", _0x1d244d);
        }
        _0x28e179[_0xc72a09(0x162)](_0xc72a09(0x1c2));
      });
    } catch (_0x3f2869) {
      console[_0x280347(0x1a2)](_0x280347(0x1b6), _0x3f2869);
    }
    const _0x170fd2 = _0x3558bc["innerHTML"],
      _0x4ff08f = {
        tag_group: _0x170fd2,
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
      _0x5818d7 = new DOMParser(),
      _0x2ca68f = _0x5818d7["parseFromString"](_0x170fd2, _0x280347(0x19f));
    let _0x4e1e35 = null,
      _0x4b7aaa = "";
    if (!_0x2ca68f["body"])
      return (
        console["error"](
          "Parsed\x20document\x20does\x20not\x20contain\x20body."
        ),
        ![]
      );
    const _0x4992f3 = (_0x4676b6, _0x2fbfb6) => {
      const _0x38250c = _0x280347;
      Array[_0x38250c(0x16a)](_0x4ff08f[_0x4676b6]) &&
        _0x4ff08f[_0x4676b6][_0x38250c(0x148)](_0x2fbfb6);
    };
    Array["from"](_0x2ca68f[_0x280347(0x163)][_0x280347(0x1ae)])["forEach"](
      (_0x20f30b) => {
        const _0x3b85bd = _0x280347;
        if (_0x20f30b[_0x3b85bd(0x16e)] === Node[_0x3b85bd(0x1bf)]) {
          const _0x2a090f = Array[_0x3b85bd(0x19c)](_0x20f30b?.["classList"]),
            _0x1cbee5 = _0x2a090f["find"]((_0x2c2248) =>
              _0x465fd8[_0x3b85bd(0x176)](_0x2c2248)
            );
          if (_0x1cbee5)
            _0x4e1e35 && _0x4992f3(_0x4e1e35, _0x4b7aaa),
              (_0x4e1e35 = _0x1cbee5),
              (_0x4b7aaa = _0x20f30b[_0x3b85bd(0x189)]);
          else _0x4e1e35 && (_0x4b7aaa += _0x20f30b["outerHTML"]);
        }
      }
    );
    _0x4e1e35 && _0x4992f3(_0x4e1e35, _0x4b7aaa);
    const _0xcdb397 = JSON[_0x280347(0x1da)](_0x4ff08f, null, 0x2);
    return iTeXEQ[_0x280347(0x164)](), clearEditorContent(), _0xcdb397;
  } catch (_0x43ef4e) {
    return console["error"](_0x280347(0x1ac), _0x43ef4e), ![];
  }
};
function hml_upload(_0x3caec8) {
  const _0x127925 = _0x2fdc29;
  var _0x368183 = new FormData();
  _0x368183[_0x127925(0x15f)](_0x127925(0x17a), _0x3caec8["name"]),
    _0x368183[_0x127925(0x15f)](_0x127925(0x149), _0x3caec8),
    _0x368183["append"]("img_save_type", img_save_type),
    _0x368183["append"](_0x127925(0x157), dream_server_url);
  var _0x17f799 = new XMLHttpRequest();
  _0x17f799[_0x127925(0x15a)](
    _0x127925(0x170),
    dream_server_url + _0x127925(0x1c4),
    !![]
  ),
    _0x17f799[_0x127925(0x18c)](_0x368183),
    (_0x17f799["onreadystatechange"] = function () {
      const _0x23e7be = _0x127925;
      if (
        _0x17f799["readyState"] == 0x4 &&
        _0x17f799[_0x23e7be(0x191)] == 0xc8
      ) {
        const _0x241ff0 = document[_0x23e7be(0x1cf)](_0x23e7be(0x187));
        var _0x152ffc = JSON[_0x23e7be(0x173)](_0x17f799[_0x23e7be(0x1cd)]);
        (_0x241ff0["innerHTML"] = _0x152ffc[_0x23e7be(0x17d)]),
          document[_0x23e7be(0x1cf)](_0x23e7be(0x1b8))?.[_0x23e7be(0x178)][
            _0x23e7be(0x180)
          ](_0x23e7be(0x1be)),
          iTeXEQ[_0x23e7be(0x17f)](_0x241ff0),
          (document["getElementById"](_0x23e7be(0x1aa))[_0x23e7be(0x14a)][
            "display"
          ] = _0x23e7be(0x192)),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
let lastClickedBoxId = null,
  currentEditorContent = "";
function htmlStringToNode(_0x336c4b) {
  const _0x3e73f0 = _0x2fdc29;
  var _0x4acebc = document[_0x3e73f0(0x1d9)](_0x3e73f0(0x1b0));
  return (_0x4acebc[_0x3e73f0(0x14d)] = _0x336c4b), _0x4acebc[_0x3e73f0(0x18a)];
}
function _0x2091(_0x295763, _0x25434b) {
  const _0x149b0e = _0x149b();
  return (
    (_0x2091 = function (_0x2091c8, _0x621e3) {
      _0x2091c8 = _0x2091c8 - 0x146;
      let _0x4ac6ac = _0x149b0e[_0x2091c8];
      return _0x4ac6ac;
    }),
    _0x2091(_0x295763, _0x25434b)
  );
}
function _0x149b() {
  const _0x5056b0 = [
    "text/html",
    "5971068frFaAZ",
    "saveHmlData",
    "error",
    "tag_content",
    "img_save_type",
    "setAttribute",
    "className",
    "document",
    "TITLE",
    "tag_hint",
    "modal_block",
    "EXAMPLE",
    "Error\x20while\x20saving\x20exam\x20data:",
    "onreadystatechange",
    "childNodes",
    "14643rXZgjy",
    "template",
    "4573500jvvgcm",
    "문서를\x20업로드\x20하세요.",
    "tag_group",
    "name",
    "getContent",
    "Error\x20processing\x20image:",
    "textContent",
    ".origin_img_area",
    ".exam_box",
    "hasChildNodes",
    "TIP",
    "trim",
    "tag_exam",
    "itex_area_hidden",
    "ELEMENT_NODE",
    "setContent",
    "querySelectorAll",
    "data-mce-src",
    "json",
    "/qnapi_dream/hml_upload",
    "COMMENTARY",
    "display",
    "imgSrcs:\x20",
    "cloneNode",
    "src",
    "에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?",
    "문제\x20or\x20대발문\x20or\x20지문\x20태그가\x20필요합니다!",
    "원래\x20자리를\x20찾을\x20수\x20없습니다.",
    "responseText",
    "tag_exam_sm",
    "querySelector",
    "exam_box_",
    "tinyeditor",
    "3115lTLQMj",
    "수정할\x20요소가\x20선택되지\x20않았습니다.",
    "display_inactive",
    "No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.",
    "saveExamData",
    "tag_choices",
    "SMALL",
    "createElement",
    "stringify",
    "find",
    "[그룹]",
    "parseFromString",
    "closest",
    "nextElementSibling",
    "push",
    "file",
    "style",
    "openEQ",
    "내용\x20앞에\x20태그를\x20입력해\x20주세요",
    "innerHTML",
    "tl_answer",
    "tag_tip",
    "setExamList",
    "map",
    "CONCEPT",
    "getElementById",
    "div",
    "get",
    "img",
    "save_path",
    "내용\x20앞에\x20태그를\x20입력해주세요.",
    "QUESTION",
    "open",
    "function",
    "No\x20data\x20found\x20in\x20the\x20parsed\x20document.",
    "remove",
    "tag_example",
    "append",
    "br[data-mce-bogus=\x221\x22]",
    "imgSrcArray:\x20",
    "removeAttribute",
    "body",
    "latexrecovery",
    "selection",
    "/uploadImage",
    "데이터가\x20존재하지\x20않습니다.",
    "length",
    "target",
    "isArray",
    "5257090ilgJbl",
    "addEventListener",
    "1008OmcVZp",
    "nodeType",
    "forEach",
    "POST",
    "false",
    "Editor\x20not\x20found",
    "parse",
    "tag_title",
    "data",
    "includes",
    "tag_bigcontent",
    "classList",
    "getExamCodenum",
    "file_name",
    "4LlxQks",
    "contenteditable",
    "itexdata",
    "editor_container",
    "recoverynew_no_click",
    "add",
    "para0",
    "ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.",
    "콘텐츠\x20삽입\x20중\x20오류\x20발생:",
    "tag_commentary",
    "BIG",
    "tag_concept",
    ".itex_hml_convert_view",
    "match",
    "outerHTML",
    "content",
    "30291330reAstD",
    "send",
    "CHOICES",
    "ANSWER",
    "recoverynew",
    "contentWindow",
    "status",
    "none",
    "Error\x20uploading\x20image",
    "exam_box",
    "appendChild",
    "join",
    "getAttribute",
    "11sfOmNU",
    "contains",
    "1276kvrAuI",
    "message",
    "from",
    "Error\x20in\x20math\x20render:",
    "761203ZcheOP",
  ];
  _0x149b = function () {
    return _0x5056b0;
  };
  return _0x149b();
}
async function hml_edit_finish() {
  const _0x2095fa = _0x2fdc29;
  if (!lastClickedBoxId) {
    console["error"](_0x2095fa(0x1d3));
    return;
  }
  const _0x35d152 = tinymce["get"](_0x2095fa(0x1d1))["getContent"](),
    _0x249df8 = document[_0x2095fa(0x1cf)](_0x2095fa(0x187)),
    _0x18e2e1 = document[_0x2095fa(0x153)](lastClickedBoxId);
  if (_0x18e2e1) {
    const _0x281b39 = htmlStringToNode(_0x35d152);
    try {
      const _0x33d41d = await iTeXDBW_mathrender_hml(_0x281b39),
        _0x2ff571 = document[_0x2095fa(0x1d9)](_0x2095fa(0x154));
      _0x2ff571[_0x2095fa(0x195)](_0x33d41d),
        (_0x18e2e1[_0x2095fa(0x189)] = _0x2ff571[_0x2095fa(0x14d)]),
        iTeXEQ[_0x2095fa(0x17f)](_0x249df8),
        tinymce["get"](_0x2095fa(0x1d1))[_0x2095fa(0x1c0)](""),
        (lastClickedBoxId = null),
        (currentEditorContent = "");
    } catch (_0x38d97f) {
      console[_0x2095fa(0x1a2)](_0x2095fa(0x19d), _0x38d97f);
    }
  } else console[_0x2095fa(0x1a2)](_0x2095fa(0x1cc));
}
async function hml_upload_frame(_0x1594b4) {
  const _0x388c75 = _0x2fdc29;
  document[_0x388c75(0x153)](_0x388c75(0x1aa))["style"][_0x388c75(0x1c6)] =
    "block";
  var _0x2cfcda = new FormData();
  _0x2cfcda[_0x388c75(0x15f)](_0x388c75(0x17a), _0x1594b4[_0x388c75(0x1b4)]),
    _0x2cfcda[_0x388c75(0x15f)](_0x388c75(0x149), _0x1594b4),
    _0x2cfcda["append"](_0x388c75(0x1a4), img_save_type),
    _0x2cfcda[_0x388c75(0x15f)]("save_path", dream_server_url);
  var _0x425ff8 = new XMLHttpRequest();
  _0x425ff8[_0x388c75(0x15a)](
    _0x388c75(0x170),
    dream_server_url + _0x388c75(0x1c4),
    !![]
  ),
    _0x425ff8[_0x388c75(0x18c)](_0x2cfcda),
    (_0x425ff8[_0x388c75(0x1ad)] = async function () {
      const _0x54fc0f = _0x388c75;
      if (_0x425ff8["readyState"] == 0x4 && _0x425ff8["status"] == 0xc8) {
        const _0x564f32 = document[_0x54fc0f(0x1cf)](".itex_hml_convert_view");
        var _0x5d4eec = JSON["parse"](_0x425ff8[_0x54fc0f(0x1cd)]);
        const _0x25393c = iTeX_hml_tag_parser(_0x5d4eec["itexdata"]);
        (_0x564f32["innerHTML"] = _0x25393c),
          _0x564f32[_0x54fc0f(0x16c)]("click", async function (_0x29ab45) {
            const _0x4b4699 = _0x54fc0f;
            if (_0x29ab45["target"][_0x4b4699(0x146)](_0x4b4699(0x1b9))) {
              const _0x14bcf9 = _0x29ab45[_0x4b4699(0x169)][_0x4b4699(0x146)](
                  _0x4b4699(0x1b9)
                ),
                _0x2bda05 = _0x14bcf9[_0x4b4699(0x197)]("id");
              lastClickedBoxId &&
                tinymce[_0x4b4699(0x155)](_0x4b4699(0x1d1))["getContent"]() !==
                  currentEditorContent &&
                confirm(
                  "변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다."
                ) &&
                (await hml_edit_finish());
              const _0x1aa89f = htmlStringToNode(_0x14bcf9[_0x4b4699(0x189)]);
              lastClickedBoxId = _0x2bda05;
              try {
                const _0x58d658 = await iTeXDBW_mathrender_hml(_0x1aa89f),
                  _0x54416e = document["createElement"](_0x4b4699(0x154));
                _0x54416e[_0x4b4699(0x195)](_0x58d658),
                  tinymce[_0x4b4699(0x155)]("tinyeditor")[_0x4b4699(0x1c0)](
                    _0x54416e[_0x4b4699(0x14d)]
                  ),
                  (currentEditorContent = _0x54416e[_0x4b4699(0x14d)]);
              } catch (_0x1ca3d5) {
                console[_0x4b4699(0x1a2)](_0x4b4699(0x19d), _0x1ca3d5);
              }
              iTeXEQ[_0x4b4699(0x18f)]();
            }
          }),
          document[_0x54fc0f(0x1cf)](_0x54fc0f(0x1b8))?.["classList"][
            _0x54fc0f(0x180)
          ](_0x54fc0f(0x1be)),
          iTeXEQ[_0x54fc0f(0x17f)](_0x564f32),
          (document["getElementById"]("modal_block")["style"]["display"] =
            "none");
      }
    });
}
window[_0x2fdc29(0x1a1)] = async function () {
  const _0x2ac0b4 = _0x2fdc29,
    _0xb34e09 = document[_0x2ac0b4(0x1cf)](_0x2ac0b4(0x187))[_0x2ac0b4(0x1c8)](
      !![]
    );
  if (!_0xb34e09[_0x2ac0b4(0x1ba)]()) {
    alert(_0x2ac0b4(0x1b2));
    return;
  }
  const _0x2afa31 = tinymce[_0x2ac0b4(0x155)](_0x2ac0b4(0x1d1))[
    _0x2ac0b4(0x1b5)
  ]();
  if (_0x2afa31[_0x2ac0b4(0x1bc)]() !== "") {
    const _0x1d23ec = confirm(_0x2ac0b4(0x1ca));
    if (!_0x1d23ec) return;
  }
  if (_0xb34e09) {
    const _0x1ce1fa = _0xb34e09[_0x2ac0b4(0x1c1)](_0x2ac0b4(0x1b9)),
      _0x5f0f10 = [],
      _0x99fd47 = _0xb34e09[_0x2ac0b4(0x1c1)](_0x2ac0b4(0x156)),
      _0x21a3c9 = Array[_0x2ac0b4(0x19c)](_0x99fd47)[_0x2ac0b4(0x151)](
        (_0x5e1bfe) => _0x5e1bfe[_0x2ac0b4(0x1c9)]
      );
    try {
      console["log"](_0x2ac0b4(0x161), _0x21a3c9);
      const _0x39d712 = await uploadImageToServer(img_save_type, _0x21a3c9);
      _0x39d712[_0x2ac0b4(0x16f)]((_0x40cc04, _0x1c0f64) => {
        const _0x19bdf9 = _0x2ac0b4,
          { imgUUID: _0xc1a44, imgURL: _0x236cd5 } = _0x40cc04,
          _0x563be4 = _0x99fd47[_0x1c0f64];
        if (img_save_type === 0x1)
          _0x563be4[_0x19bdf9(0x1a5)]("src", dream_server_url + _0x236cd5);
        else {
          if (img_save_type === 0x2)
            _0x563be4[_0x19bdf9(0x1a5)]("src", _0x236cd5);
          else
            img_save_type === 0x3 &&
              _0x563be4[_0x19bdf9(0x1a5)](_0x19bdf9(0x1c9), _0x236cd5);
        }
        _0x563be4["removeAttribute"](_0x19bdf9(0x1c2));
      });
    } catch (_0x4853c5) {
      console["error"](_0x2ac0b4(0x1b6), _0x4853c5);
    }
    return (
      _0x1ce1fa[_0x2ac0b4(0x16f)]((_0x22e3b6, _0x460847) => {
        const _0x16578d = _0x2ac0b4,
          _0x19a9a6 = [];
        let _0x29f5a1 = 0x1;
        const _0x2d201c = _0x22e3b6[_0x16578d(0x1c1)]("p");
        _0x2d201c["forEach"]((_0x345d7f) => {
          const _0x197424 = _0x16578d,
            _0x221561 = _0x345d7f?.[_0x197424(0x178)];
          let _0x295da4 = null;
          if (_0x221561["contains"]("tag_bigcontent"))
            _0x295da4 = _0x197424(0x185);
          else {
            if (_0x221561[_0x197424(0x199)]("tag_content")) _0x295da4 = "TEXT";
            else {
              if (_0x221561[_0x197424(0x199)]("tag_exam"))
                _0x295da4 = _0x197424(0x159);
              else {
                if (_0x221561["contains"](_0x197424(0x1ce)))
                  _0x295da4 = _0x197424(0x1d8);
                else {
                  if (_0x221561[_0x197424(0x199)](_0x197424(0x15e)))
                    _0x295da4 = _0x197424(0x1ab);
                  else {
                    if (_0x221561[_0x197424(0x199)]("tag_choices"))
                      _0x295da4 = _0x197424(0x18d);
                    else {
                      if (_0x221561["contains"](_0x197424(0x14e)))
                        _0x295da4 = _0x197424(0x18e);
                      else {
                        if (_0x221561[_0x197424(0x199)](_0x197424(0x184)))
                          _0x295da4 = _0x197424(0x1c5);
                        else {
                          if (_0x221561["contains"](_0x197424(0x1a9)))
                            _0x295da4 = "HINT";
                          else {
                            if (_0x221561["contains"](_0x197424(0x186)))
                              _0x295da4 = _0x197424(0x152);
                            else {
                              if (_0x221561["contains"](_0x197424(0x174)))
                                _0x295da4 = _0x197424(0x1a8);
                              else {
                                if (
                                  _0x221561[_0x197424(0x199)](_0x197424(0x14f))
                                )
                                  _0x295da4 = _0x197424(0x1bb);
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
          if (_0x295da4) {
            let _0x4fcd86 = _0x345d7f[_0x197424(0x189)],
              _0x5c79e4 = _0x345d7f["nextElementSibling"];
            while (
              _0x5c79e4 &&
              !_0x5c79e4[_0x197424(0x178)]["contains"](_0x197424(0x177)) &&
              !_0x5c79e4["classList"][_0x197424(0x199)]("tag_content") &&
              !_0x5c79e4[_0x197424(0x178)]["contains"](_0x197424(0x1bd)) &&
              !_0x5c79e4[_0x197424(0x178)]["contains"](_0x197424(0x1ce)) &&
              !_0x5c79e4["classList"][_0x197424(0x199)](_0x197424(0x15e)) &&
              !_0x5c79e4["classList"][_0x197424(0x199)](_0x197424(0x1d7)) &&
              !_0x5c79e4[_0x197424(0x178)]["contains"]("tl_answer") &&
              !_0x5c79e4["classList"]["contains"](_0x197424(0x184)) &&
              !_0x5c79e4["classList"][_0x197424(0x199)](_0x197424(0x1a9)) &&
              !_0x5c79e4["classList"][_0x197424(0x199)](_0x197424(0x186)) &&
              !_0x5c79e4[_0x197424(0x178)][_0x197424(0x199)]("tag_title") &&
              !_0x5c79e4[_0x197424(0x178)][_0x197424(0x199)](_0x197424(0x14f))
            ) {
              (_0x4fcd86 += _0x5c79e4[_0x197424(0x189)]),
                (_0x5c79e4 = _0x5c79e4[_0x197424(0x147)]);
            }
            _0x19a9a6[_0x197424(0x148)]({
              type: _0x295da4,
              content: _0x4fcd86,
              sort: _0x29f5a1++,
            });
          }
        }),
          _0x5f0f10[_0x16578d(0x148)]({ id: null, quizItemList: _0x19a9a6 });
      }),
      tinymce[_0x2ac0b4(0x155)](_0x2ac0b4(0x1d1))[_0x2ac0b4(0x1c0)](""),
      _0x5f0f10
    );
  } else return console["log"](_0x2ac0b4(0x167)), null;
};
function processHmlData(_0x4ef6e3) {
  const _0x38f272 = _0x2fdc29,
    _0x56c2d3 = [],
    _0x3c16cd = Array[_0x38f272(0x19c)](_0x4ef6e3[_0x38f272(0x1c1)]("p"));
  let _0x2740be = [],
    _0x4153fc = ![];
  return (
    _0x3c16cd["forEach"]((_0x2ab4ce) => {
      const _0x3f668e = _0x38f272;
      divideKey[_0x3f668e(0x176)](_0x2ab4ce[_0x3f668e(0x1a6)])
        ? (_0x2740be[_0x3f668e(0x168)] > 0x0 &&
            (_0x56c2d3[_0x3f668e(0x148)](
              _0x2740be[_0x3f668e(0x151)](
                (_0x5bcd6e) => _0x5bcd6e[_0x3f668e(0x189)]
              )[_0x3f668e(0x196)]("")
            ),
            (_0x2740be = [])),
          _0x2740be[_0x3f668e(0x148)](_0x2ab4ce))
        : _0x2740be["push"](_0x2ab4ce);
    }),
    _0x2740be[_0x38f272(0x168)] > 0x0 &&
      _0x56c2d3[_0x38f272(0x148)](
        _0x2740be["map"]((_0x158d66) => _0x158d66[_0x38f272(0x189)])[
          _0x38f272(0x196)
        ]("")
      ),
    _0x56c2d3
  );
}
window[_0x2fdc29(0x16c)](_0x2fdc29(0x19b), (_0xff5287) => {
  const _0x895df8 = _0x2fdc29,
    { functionName: _0xd54588, args: _0x2c7a2d } = _0xff5287[_0x895df8(0x175)];
  _0xd54588 === "setExamData" &&
    typeof window[_0xd54588] === "function" &&
    window[_0xd54588](_0x2c7a2d[0x0]),
    _0xd54588 === _0x895df8(0x150) &&
      typeof window[_0xd54588] === "function" &&
      window[_0xd54588](_0x2c7a2d[0x0]),
    _0xd54588 === _0x895df8(0x179) &&
      typeof window[_0xd54588] === _0x895df8(0x15b) &&
      window[_0xd54588](_0x2c7a2d[0x0]),
    _0xd54588 === _0x895df8(0x1d6) &&
      typeof window[_0xd54588] === _0x895df8(0x15b) &&
      window[_0xd54588](_0x2c7a2d[0x0]);
});
function iTeX_hml_tag_parser(_0xc585b3) {
  const _0x1eca04 = _0x2fdc29,
    _0x2d060a = new DOMParser(),
    _0x137c78 = _0x2d060a[_0x1eca04(0x1dd)](_0xc585b3, "text/html"),
    _0x2ee513 = _0x137c78["querySelectorAll"]("p"),
    _0x5605fd = {
      그룹: "tag_group",
      대발문: _0x1eca04(0x177),
      지문: "tag_content",
      문제: _0x1eca04(0x1bd),
      소문제: "tag_exam_sm",
      보기: _0x1eca04(0x15e),
      선지: _0x1eca04(0x1d7),
      정답: "tl_answer",
      해설: _0x1eca04(0x184),
      힌트: _0x1eca04(0x1a9),
      개념: _0x1eca04(0x186),
      제목: _0x1eca04(0x174),
      팁: _0x1eca04(0x14f),
    };
  let _0x24c69d = "",
    _0x3dfeb4 = null,
    _0x4dbd1 = 0x0,
    _0x28ba9b = ![];
  _0x2ee513[_0x1eca04(0x16f)]((_0x3e4a04, _0xfb23ea) => {
    const _0x149130 = _0x1eca04;
    _0x3e4a04["removeAttribute"]("style");
    let _0x4066a1 = _0x3e4a04[_0x149130(0x1b7)]["trim"]();
    const _0x3d589c = _0x4066a1[_0x149130(0x188)](/^\[(.*?)\]$/);
    if (_0x3d589c) {
      const _0x41d468 = _0x3d589c[0x1]["replace"](/\s+/g, "");
      if (_0x41d468 in _0x5605fd) {
        _0x3e4a04?.[_0x149130(0x178)]["add"](_0x5605fd[_0x41d468]),
          _0x3e4a04[_0x149130(0x1a5)]("contenteditable", _0x149130(0x171));
        if (_0x5605fd[_0x41d468] === _0x149130(0x1b3))
          _0x28ba9b
            ? (_0x28ba9b = ![])
            : (_0x3dfeb4 &&
                ((_0x24c69d += _0x3dfeb4["outerHTML"]), (_0x3dfeb4 = null)),
              (_0x3dfeb4 = document[_0x149130(0x1d9)](_0x149130(0x154))),
              _0x3dfeb4?.["classList"][_0x149130(0x180)](_0x149130(0x194)),
              _0x3dfeb4["setAttribute"]("id", _0x149130(0x1d0) + _0x4dbd1++),
              (_0x28ba9b = !![]));
        else {
          if (_0x5605fd[_0x41d468] === _0x149130(0x1bd)) {
            if (_0x28ba9b) {
            } else
              _0x3dfeb4 &&
                ((_0x24c69d += _0x3dfeb4[_0x149130(0x189)]),
                (_0x3dfeb4 = null)),
                (_0x3dfeb4 = document["createElement"]("div")),
                _0x3dfeb4?.[_0x149130(0x178)][_0x149130(0x180)](
                  _0x149130(0x194)
                ),
                _0x3dfeb4[_0x149130(0x1a5)](
                  "id",
                  _0x149130(0x1d0) + _0x4dbd1++
                );
          }
        }
      }
    }
    _0x3dfeb4 && _0x3dfeb4[_0x149130(0x195)](_0x3e4a04);
  });
  if (_0x3dfeb4) {
    if (_0x28ba9b) {
      const _0x45bc34 = document["createElement"]("p");
      _0x45bc34[_0x1eca04(0x178)][_0x1eca04(0x180)](
        _0x1eca04(0x181),
        _0x1eca04(0x1b3)
      ),
        _0x45bc34[_0x1eca04(0x1a5)](_0x1eca04(0x17c), _0x1eca04(0x171)),
        (_0x45bc34[_0x1eca04(0x1b7)] = _0x1eca04(0x1dc)),
        _0x3dfeb4["appendChild"](_0x45bc34),
        (_0x24c69d += _0x3dfeb4[_0x1eca04(0x189)]);
    } else _0x24c69d += _0x3dfeb4[_0x1eca04(0x189)];
  }
  return _0x24c69d;
}
