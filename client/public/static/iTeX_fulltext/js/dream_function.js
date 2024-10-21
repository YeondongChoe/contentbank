function _0x3e2d(_0x116222, _0x5a2e55) {
  const _0x33d1d1 = _0x33d1();
  return (
    (_0x3e2d = function (_0x3e2de6, _0x5cee09) {
      _0x3e2de6 = _0x3e2de6 - 0xf0;
      let _0x1b1358 = _0x33d1d1[_0x3e2de6];
      return _0x1b1358;
    }),
    _0x3e2d(_0x116222, _0x5a2e55)
  );
}
const _0x29bb1f = _0x3e2d;
(function (_0x28cce5, _0x325b59) {
  const _0xde196d = _0x3e2d,
    _0x1d3b8b = _0x28cce5();
  while (!![]) {
    try {
      const _0x5f10f6 =
        (parseInt(_0xde196d(0x175)) / 0x1) *
          (parseInt(_0xde196d(0x131)) / 0x2) +
        (-parseInt(_0xde196d(0x106)) / 0x3) *
          (parseInt(_0xde196d(0xfa)) / 0x4) +
        -parseInt(_0xde196d(0x16b)) / 0x5 +
        (parseInt(_0xde196d(0x122)) / 0x6) *
          (-parseInt(_0xde196d(0xfc)) / 0x7) +
        parseInt(_0xde196d(0x14c)) / 0x8 +
        (-parseInt(_0xde196d(0x137)) / 0x9) *
          (-parseInt(_0xde196d(0x157)) / 0xa) +
        -parseInt(_0xde196d(0xf8)) / 0xb;
      if (_0x5f10f6 === _0x325b59) break;
      else _0x1d3b8b["push"](_0x1d3b8b["shift"]());
    } catch (_0x262584) {
      _0x1d3b8b["push"](_0x1d3b8b["shift"]());
    }
  }
})(_0x33d1, 0xccb18),
  (window["openEQ"] = (_0xdf1148) => {
    const _0x5ac744 = _0x3e2d,
      _0x30e518 = document[_0x5ac744(0x12c)](iTeXEQ[_0x5ac744(0x120)]);
    function _0x445ebe() {
      const _0x35d682 = _0x5ac744;
      (onlyEQ = !![]),
        (onlyEQNode = _0xdf1148),
        _0x30e518?.[_0x35d682(0x111)]["remove"](_0x35d682(0x145)),
        iTeXEQ[_0x35d682(0x143)]();
    }
    function _0x4da19e() {
      const _0x43a277 = _0x5ac744;
      (onlyEQ = ![]),
        (onlyEQNode = ""),
        _0x30e518?.[_0x43a277(0x111)][_0x43a277(0x172)](_0x43a277(0x145));
    }
    _0x30e518?.[_0x5ac744(0x111)]["contains"](_0x5ac744(0x145))
      ? _0x445ebe()
      : _0x4da19e();
  }),
  (window["usePostJsonData"] = function setExamData(_0x276b51) {
    const _0x152711 = _0x3e2d;
    try {
      const _0xed6d3f = tinymce[_0x152711(0x13a)](_0x152711(0x13f));
      return _0xed6d3f
        ? (_0xed6d3f[_0x152711(0x142)][_0x152711(0x180)](_0x276b51), !![])
        : (console[_0x152711(0x10c)](_0x152711(0x161)), ![]);
    } catch (_0x29102b) {
      return console[_0x152711(0x10c)](_0x152711(0x171), _0x29102b), ![];
    }
  });
async function uploadImageToServer(_0x3faf44, _0xb02482) {
  const _0x533a1b = _0x3e2d,
    _0x50a5ed = new FormData(),
    _0x13c755 = await fetch(_0xb02482),
    _0x59c845 = await _0x13c755[_0x533a1b(0x134)]();
  _0x50a5ed[_0x533a1b(0x135)](_0x533a1b(0xfd), _0x59c845, _0x533a1b(0x123)),
    _0x50a5ed[_0x533a1b(0x135)]("img_save_type", _0x3faf44);
  const _0x242260 = await fetch(dream_server_url + "/uploadImage", {
    method: _0x533a1b(0x141),
    body: _0x50a5ed,
  });
  if (!_0x242260["ok"]) throw new Error(_0x533a1b(0x100));
  const _0x41e229 = await _0x242260[_0x533a1b(0x14e)]();
  return console["log"](_0x533a1b(0x181), _0x41e229), _0x41e229;
}
function clearEditorContent() {
  const _0x2e3ad1 = _0x3e2d,
    _0x2964bd = tinymce[_0x2e3ad1(0x13a)](_0x2e3ad1(0x13f));
  _0x2964bd
    ? _0x2964bd[_0x2e3ad1(0x180)]("")
    : console[_0x2e3ad1(0x10c)]("Editor\x20not\x20found");
}
window[_0x29bb1f(0x116)] = async function () {
  const _0x25d08c = _0x29bb1f;
  try {
    const _0x5bb228 =
        tinymce[_0x25d08c(0xff)][_0x25d08c(0x140)][_0x25d08c(0x144)] ||
        tinymce[_0x25d08c(0xff)][_0x25d08c(0x13d)]["document"],
      _0x4be9c6 = iTeXEQ[_0x25d08c(0x166)](
        _0x5bb228["querySelector"](_0x25d08c(0x156))
      );
    if (!_0x4be9c6) return console["error"](_0x25d08c(0x11b)), ![];
    const _0x545862 = [
        "tag_bigcontent",
        _0x25d08c(0x169),
        "tag_exam",
        _0x25d08c(0x112),
        _0x25d08c(0x12a),
        _0x25d08c(0x178),
        _0x25d08c(0xf1),
        _0x25d08c(0x151),
        _0x25d08c(0xf4),
        _0x25d08c(0x128),
        "tag_title",
        _0x25d08c(0x102),
      ],
      _0x5186a7 = _0x4be9c6[_0x25d08c(0x113)]("p");
    if (_0x5186a7) {
      const _0x3d4bd7 = _0x5186a7[0x0]["querySelector"](_0x25d08c(0x121)),
        _0x21664f = Array[_0x25d08c(0x136)](_0x5186a7[0x0]?.[_0x25d08c(0x111)])[
          "find"
        ]((_0x1d14c7) => _0x545862[_0x25d08c(0x13e)](_0x1d14c7)),
        _0x6ca3d8 = Array[_0x25d08c(0x136)](_0x5186a7)[_0x25d08c(0x105)](
          (_0x32e03a) =>
            _0x32e03a?.[_0x25d08c(0x111)]["contains"](_0x25d08c(0x10d))
        ),
        _0x4015a5 = Array[_0x25d08c(0x136)](_0x5186a7)[_0x25d08c(0x105)](
          (_0x26f301) => _0x26f301?.["classList"]["contains"]("tag_group")
        );
      if (_0x3d4bd7) return alert(_0x25d08c(0xf9)), ![];
      if (!_0x21664f)
        return alert(_0x25d08c(0x13b)), iTeXEQ["latexrecovery"](), ![];
      if (!_0x6ca3d8) return alert(_0x25d08c(0x124)), ![];
    } else return alert(_0x25d08c(0x15e)), ![];
    const _0xf04bdd = _0x4be9c6[_0x25d08c(0x113)]("img");
    for (const _0x39bbb3 of _0xf04bdd) {
      try {
        const { imgUUID: _0x1caa5d, imgURL: _0x13b0f6 } =
          await uploadImageToServer(img_save_type, _0x39bbb3["src"]);
        console[_0x25d08c(0x11c)](
          _0x25d08c(0x14a),
          dream_server_url + _0x13b0f6
        ),
          _0x39bbb3[_0x25d08c(0x148)](_0x25d08c(0x132), _0x1caa5d),
          _0x39bbb3[_0x25d08c(0x148)](
            _0x25d08c(0xfe),
            dream_server_url + _0x13b0f6
          );
      } catch (_0x8718af) {
        console[_0x25d08c(0x10c)](_0x25d08c(0xf5), _0x39bbb3["src"], _0x8718af);
      }
    }
    const _0x57ded0 = {
        tag_group: _0x4be9c6[_0x25d08c(0x155)],
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
      _0x5e8c0f = new DOMParser(),
      _0x4208b6 = _0x5e8c0f[_0x25d08c(0x147)](
        _0x4be9c6[_0x25d08c(0x155)],
        _0x25d08c(0x127)
      );
    let _0x197d76 = null,
      _0x313947 = "";
    if (!_0x4208b6[_0x25d08c(0x156)])
      return console[_0x25d08c(0x10c)](_0x25d08c(0x117)), ![];
    const _0x397c52 = (_0x2ad949, _0x416b47) => {
      const _0x6ec552 = _0x25d08c;
      Array[_0x6ec552(0x10f)](_0x57ded0[_0x2ad949]) &&
        _0x57ded0[_0x2ad949][_0x6ec552(0x149)](_0x416b47);
    };
    Array["from"](_0x4208b6[_0x25d08c(0x156)][_0x25d08c(0x163)])[
      _0x25d08c(0x154)
    ]((_0x24322f) => {
      const _0x17245a = _0x25d08c;
      if (_0x24322f[_0x17245a(0x125)] === Node[_0x17245a(0x14f)]) {
        const _0x25f241 = Array[_0x17245a(0x136)](
            _0x24322f?.[_0x17245a(0x111)]
          ),
          _0x1674d6 = _0x25f241[_0x17245a(0x105)]((_0x3942ce) =>
            _0x545862[_0x17245a(0x13e)](_0x3942ce)
          );
        if (_0x1674d6)
          _0x197d76 && _0x397c52(_0x197d76, _0x313947),
            (_0x197d76 = _0x1674d6),
            (_0x313947 = _0x24322f["outerHTML"]);
        else _0x197d76 && (_0x313947 += _0x24322f[_0x17245a(0x108)]);
      }
    });
    _0x197d76 && _0x397c52(_0x197d76, _0x313947);
    const _0x57f117 = JSON[_0x25d08c(0x153)](_0x57ded0, null, 0x2);
    return iTeXEQ[_0x25d08c(0x17e)](), clearEditorContent(), _0x57f117;
  } catch (_0x4ff112) {
    return console[_0x25d08c(0x10c)](_0x25d08c(0xf2), _0x4ff112), ![];
  }
};
function _0x33d1() {
  const _0x1fcc4a = [
    "6507AhMGHm",
    "setExamData",
    "template",
    "tag_choices",
    "getAttribute",
    "getExamCodenum",
    "recoverynew_no_click",
    ".exam_box",
    "원래\x20자리를\x20찾을\x20수\x20없습니다.",
    "latexrecovery",
    "contains",
    "setContent",
    "data:\x20",
    "join",
    "hasChildNodes",
    ".origin_img_area",
    "tl_answer",
    "Error\x20while\x20saving\x20exam\x20data:",
    "nextElementSibling",
    "tag_hint",
    "Error\x20processing\x20image:",
    "COMMENTARY",
    "recoverynew",
    "15450050eIgNlW",
    "내용을\x20입력해주세요.",
    "1145576jvFbqD",
    "message",
    "7FhgLLU",
    "file",
    "src",
    "activeEditor",
    "Error\x20uploading\x20image",
    "target",
    "tag_tip",
    "trim",
    "/qnapi_dream/hml_upload",
    "find",
    "3MNhUZJ",
    "getContent",
    "outerHTML",
    "responseText",
    "CONCEPT",
    "contenteditable",
    "error",
    "tag_exam",
    "length",
    "isArray",
    "itex_area_hidden",
    "classList",
    "tag_exam_sm",
    "querySelectorAll",
    "EXAMPLE",
    "tag_bigcontent",
    "saveExamData",
    "Parsed\x20document\x20does\x20not\x20contain\x20body.",
    "createElement",
    "closest",
    "status",
    "No\x20data\x20found\x20in\x20the\x20parsed\x20document.",
    "log",
    "exam_box_",
    "exam_box",
    "file_name",
    "editor_container",
    "br[data-mce-bogus=\x221\x22]",
    "2537520vzwfRM",
    "image.png",
    "문제\x20태그가\x20필요합니다!",
    "nodeType",
    "display",
    "text/html",
    "tag_concept",
    "TITLE",
    "tag_example",
    "false",
    "getElementById",
    "removeAttribute",
    "문서를\x20업로드\x20하세요.",
    "SMALL",
    "img",
    "290PJlKzI",
    "Img_code",
    "data",
    "blob",
    "append",
    "from",
    "7486434eQosMM",
    "match",
    "TEXT",
    "get",
    "내용\x20앞에\x20태그를\x20입력해\x20주세요",
    "modal_block",
    "contentDocument",
    "includes",
    "tinyeditor",
    "contentWindow",
    "POST",
    "selection",
    "editorStart",
    "document",
    "display_inactive",
    "style",
    "parseFromString",
    "setAttribute",
    "push",
    "img_url:\x20",
    "content",
    "9599184qaMSlu",
    "readyState",
    "json",
    "ELEMENT_NODE",
    "open",
    "tag_commentary",
    "tag_title",
    "stringify",
    "forEach",
    "innerHTML",
    "body",
    "10qSQktF",
    "tag_group",
    ".itex_hml_convert_view",
    "itexdata",
    "click",
    "textContent",
    "addEventListener",
    "No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.",
    "map",
    "querySelector",
    "ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.",
    "Error\x20in\x20math\x20render:",
    "childNodes",
    "function",
    "send",
    "removeSVG",
    "indexOf",
    "TIP",
    "tag_content",
    "수정할\x20요소가\x20선택되지\x20않았습니다.",
    "114755zlohpj",
    "/hml_image",
    "cloneNode",
    "none",
    "setExamList",
    "appendChild",
    "콘텐츠\x20삽입\x20중\x20오류\x20발생:",
    "add",
    "div",
    "onreadystatechange",
  ];
  _0x33d1 = function () {
    return _0x1fcc4a;
  };
  return _0x33d1();
}
function hml_upload(_0x4fc906) {
  const _0x439f8b = _0x29bb1f;
  var _0x407459 = new FormData();
  _0x407459["append"](_0x439f8b(0x11f), _0x4fc906["name"]),
    _0x407459["append"]("file", _0x4fc906);
  var _0x487ddd = new XMLHttpRequest();
  _0x487ddd[_0x439f8b(0x150)](
    _0x439f8b(0x141),
    dream_server_url + _0x439f8b(0x104),
    !![]
  ),
    _0x487ddd[_0x439f8b(0x165)](_0x407459),
    (_0x487ddd[_0x439f8b(0x174)] = function () {
      const _0x13444f = _0x439f8b;
      if (
        _0x487ddd[_0x13444f(0x14d)] == 0x4 &&
        _0x487ddd[_0x13444f(0x11a)] == 0xc8
      ) {
        const _0x29f468 = document["querySelector"](".itex_hml_convert_view");
        var _0x2865ff = JSON["parse"](_0x487ddd["responseText"]);
        (_0x29f468["innerHTML"] = _0x2865ff[_0x13444f(0x15a)]),
          document[_0x13444f(0x160)](".origin_img_area")?.["classList"]["add"](
            _0x13444f(0x110)
          ),
          iTeXEQ[_0x13444f(0x17b)](_0x29f468),
          (document[_0x13444f(0x12c)](_0x13444f(0x13c))["style"][
            _0x13444f(0x126)
          ] = _0x13444f(0x16e)),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
let lastClickedBoxId = null,
  currentEditorContent = "";
function htmlStringToNode(_0x44a1a0) {
  const _0x8cb591 = _0x29bb1f;
  var _0x4cfca5 = document[_0x8cb591(0x118)](_0x8cb591(0x177));
  return (_0x4cfca5[_0x8cb591(0x155)] = _0x44a1a0), _0x4cfca5[_0x8cb591(0x14b)];
}
async function hml_edit_finish() {
  const _0x117045 = _0x29bb1f;
  if (!lastClickedBoxId) {
    console[_0x117045(0x10c)](_0x117045(0x16a));
    return;
  }
  const _0x14936c = tinymce[_0x117045(0x13a)](_0x117045(0x13f))[
      _0x117045(0x107)
    ](),
    _0x1c8458 = document[_0x117045(0x160)](_0x117045(0x159)),
    _0x3f5030 = document["getElementById"](lastClickedBoxId);
  if (_0x3f5030) {
    const _0x9c515b = htmlStringToNode(_0x14936c);
    try {
      const _0x560d76 = await iTeXDBW_mathrender_hml(_0x9c515b),
        _0x4ca3be = document[_0x117045(0x118)](_0x117045(0x173));
      _0x4ca3be[_0x117045(0x170)](_0x560d76),
        (_0x3f5030[_0x117045(0x108)] = _0x4ca3be[_0x117045(0x155)]),
        iTeXEQ[_0x117045(0x17b)](_0x1c8458),
        tinymce[_0x117045(0x13a)](_0x117045(0x13f))[_0x117045(0x180)](""),
        (lastClickedBoxId = null),
        (currentEditorContent = "");
    } catch (_0x5af890) {
      console["error"](_0x117045(0x162), _0x5af890);
    }
  } else console[_0x117045(0x10c)](_0x117045(0x17d));
}
async function hml_upload_frame(_0x765789) {
  const _0x5e1c4d = _0x29bb1f;
  document[_0x5e1c4d(0x12c)](_0x5e1c4d(0x13c))["style"]["display"] = "block";
  var _0x304a18 = new FormData();
  _0x304a18[_0x5e1c4d(0x135)]("file_name", _0x765789["name"]),
    _0x304a18[_0x5e1c4d(0x135)](_0x5e1c4d(0xfd), _0x765789);
  var _0x215955 = new XMLHttpRequest();
  _0x215955[_0x5e1c4d(0x150)](
    "POST",
    dream_server_url + "/qnapi_dream/hml_upload",
    !![]
  ),
    _0x215955["send"](_0x304a18),
    (_0x215955[_0x5e1c4d(0x174)] = async function () {
      const _0x228c2e = _0x5e1c4d;
      if (
        _0x215955[_0x228c2e(0x14d)] == 0x4 &&
        _0x215955[_0x228c2e(0x11a)] == 0xc8
      ) {
        const _0x29d391 = document[_0x228c2e(0x160)](_0x228c2e(0x159));
        console[_0x228c2e(0x11c)](_0x215955[_0x228c2e(0x109)]);
        var _0x1175ca = JSON["parse"](_0x215955[_0x228c2e(0x109)]);
        const _0x3a8ad8 = iTeX_hml_tag_parser(_0x1175ca["itexdata"]);
        console["log"](_0x3a8ad8),
          (_0x29d391["innerHTML"] = _0x3a8ad8),
          _0x29d391[_0x228c2e(0x15d)](
            _0x228c2e(0x15b),
            async function (_0x5ebe7c) {
              const _0x25c074 = _0x228c2e;
              if (_0x5ebe7c["target"][_0x25c074(0x119)](_0x25c074(0x17c))) {
                const _0x2b68d6 = _0x5ebe7c[_0x25c074(0x101)][_0x25c074(0x119)](
                    _0x25c074(0x17c)
                  ),
                  _0x9e7e35 = _0x2b68d6[_0x25c074(0x179)]("id");
                lastClickedBoxId &&
                  tinymce[_0x25c074(0x13a)](_0x25c074(0x13f))[
                    _0x25c074(0x107)
                  ]() !== currentEditorContent &&
                  confirm(
                    "변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다."
                  ) &&
                  (await hml_edit_finish());
                const _0x33e37d = htmlStringToNode(_0x2b68d6[_0x25c074(0x108)]);
                lastClickedBoxId = _0x9e7e35;
                try {
                  const _0x3c09ef = await iTeXDBW_mathrender_hml(_0x33e37d),
                    _0x3fa298 = document[_0x25c074(0x118)](_0x25c074(0x173));
                  _0x3fa298[_0x25c074(0x170)](_0x3c09ef),
                    tinymce[_0x25c074(0x13a)](_0x25c074(0x13f))["setContent"](
                      _0x3fa298[_0x25c074(0x155)]
                    ),
                    (currentEditorContent = _0x3fa298["innerHTML"]);
                } catch (_0x472cb3) {
                  console[_0x25c074(0x10c)](_0x25c074(0x162), _0x472cb3);
                }
                iTeXEQ[_0x25c074(0xf7)]();
              }
            }
          ),
          document[_0x228c2e(0x160)](_0x228c2e(0xf0))?.[_0x228c2e(0x111)][
            _0x228c2e(0x172)
          ](_0x228c2e(0x110)),
          iTeXEQ[_0x228c2e(0x17b)](_0x29d391),
          (document[_0x228c2e(0x12c)]("modal_block")["style"][
            _0x228c2e(0x126)
          ] = "none");
      }
    });
}
window["saveHmlData"] = function () {
  const _0x597e1a = _0x29bb1f,
    _0x3e42e1 = document["querySelector"](_0x597e1a(0x159))[_0x597e1a(0x16d)](
      !![]
    );
  if (!_0x3e42e1[_0x597e1a(0x183)]()) {
    alert(_0x597e1a(0x12e));
    return;
  }
  const _0x6383d2 = tinymce["get"](_0x597e1a(0x13f))[_0x597e1a(0x107)]();
  if (_0x6383d2[_0x597e1a(0x103)]() !== "") {
    const _0x5279dc = confirm(
      "에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?"
    );
    if (!_0x5279dc) return;
  }
  if (_0x3e42e1) {
    const _0x59ab4e = _0x3e42e1[_0x597e1a(0x113)](_0x597e1a(0x17c)),
      _0x4607cc = [];
    return (
      _0x59ab4e["forEach"]((_0x3cd9a3, _0x509244) => {
        const _0xc20f8b = _0x597e1a,
          _0x3751c7 = [];
        let _0x4f67a4 = 0x1;
        const _0x1e8bd6 = _0x3cd9a3[_0xc20f8b(0x113)]("p");
        _0x1e8bd6[_0xc20f8b(0x154)]((_0x2139d9) => {
          const _0x3a057c = _0xc20f8b,
            _0x1828c6 = _0x2139d9?.[_0x3a057c(0x111)];
          let _0x4bd583 = null;
          if (_0x1828c6[_0x3a057c(0x17f)](_0x3a057c(0x115))) _0x4bd583 = "BIG";
          else {
            if (_0x1828c6[_0x3a057c(0x17f)](_0x3a057c(0x169)))
              _0x4bd583 = _0x3a057c(0x139);
            else {
              if (_0x1828c6[_0x3a057c(0x17f)](_0x3a057c(0x10d)))
                _0x4bd583 = "QUESTION";
              else {
                if (_0x1828c6[_0x3a057c(0x17f)](_0x3a057c(0x112)))
                  _0x4bd583 = _0x3a057c(0x12f);
                else {
                  if (_0x1828c6["contains"](_0x3a057c(0x12a)))
                    _0x4bd583 = _0x3a057c(0x114);
                  else {
                    if (_0x1828c6[_0x3a057c(0x17f)](_0x3a057c(0x178)))
                      _0x4bd583 = "CHOICES";
                    else {
                      if (_0x1828c6[_0x3a057c(0x17f)](_0x3a057c(0xf1)))
                        _0x4bd583 = "ANSWER";
                      else {
                        if (_0x1828c6[_0x3a057c(0x17f)](_0x3a057c(0x151)))
                          _0x4bd583 = _0x3a057c(0xf6);
                        else {
                          if (_0x1828c6[_0x3a057c(0x17f)](_0x3a057c(0xf4)))
                            _0x4bd583 = "HINT";
                          else {
                            if (_0x1828c6["contains"](_0x3a057c(0x128)))
                              _0x4bd583 = _0x3a057c(0x10a);
                            else {
                              if (_0x1828c6[_0x3a057c(0x17f)](_0x3a057c(0x152)))
                                _0x4bd583 = _0x3a057c(0x129);
                              else {
                                if (_0x1828c6[_0x3a057c(0x17f)]("tag_tip"))
                                  _0x4bd583 = _0x3a057c(0x168);
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
          if (_0x4bd583) {
            let _0x301071 = _0x2139d9[_0x3a057c(0x108)],
              _0x550ffb = _0x2139d9[_0x3a057c(0xf3)];
            while (
              _0x550ffb &&
              !_0x550ffb["classList"][_0x3a057c(0x17f)](_0x3a057c(0x115)) &&
              !_0x550ffb[_0x3a057c(0x111)][_0x3a057c(0x17f)](
                _0x3a057c(0x169)
              ) &&
              !_0x550ffb[_0x3a057c(0x111)][_0x3a057c(0x17f)](
                _0x3a057c(0x10d)
              ) &&
              !_0x550ffb[_0x3a057c(0x111)]["contains"](_0x3a057c(0x112)) &&
              !_0x550ffb["classList"][_0x3a057c(0x17f)](_0x3a057c(0x12a)) &&
              !_0x550ffb[_0x3a057c(0x111)][_0x3a057c(0x17f)](
                _0x3a057c(0x178)
              ) &&
              !_0x550ffb["classList"][_0x3a057c(0x17f)](_0x3a057c(0xf1)) &&
              !_0x550ffb[_0x3a057c(0x111)][_0x3a057c(0x17f)](
                _0x3a057c(0x151)
              ) &&
              !_0x550ffb[_0x3a057c(0x111)]["contains"](_0x3a057c(0xf4)) &&
              !_0x550ffb["classList"][_0x3a057c(0x17f)](_0x3a057c(0x128)) &&
              !_0x550ffb["classList"]["contains"](_0x3a057c(0x152)) &&
              !_0x550ffb["classList"][_0x3a057c(0x17f)]("tag_tip")
            ) {
              (_0x301071 += _0x550ffb[_0x3a057c(0x108)]),
                (_0x550ffb = _0x550ffb[_0x3a057c(0xf3)]);
            }
            _0x3751c7[_0x3a057c(0x149)]({
              type: _0x4bd583,
              content: _0x301071,
              sort: _0x4f67a4++,
            });
          }
        }),
          _0x4607cc[_0xc20f8b(0x149)]({ id: null, quizItemList: _0x3751c7 });
      }),
      tinymce[_0x597e1a(0x13a)](_0x597e1a(0x13f))["setContent"](""),
      _0x4607cc
    );
  } else
    return console[_0x597e1a(0x11c)]("데이터가\x20존재하지\x20않습니다."), null;
};
function processHmlData(_0x1d80b9) {
  const _0x4fc438 = _0x29bb1f,
    _0x40da15 = [],
    _0x59ba62 = Array[_0x4fc438(0x136)](_0x1d80b9[_0x4fc438(0x113)]("p"));
  let _0x20ed92 = [],
    _0x2db00f = ![];
  return (
    _0x59ba62[_0x4fc438(0x154)]((_0x13c32d) => {
      const _0x419cc9 = _0x4fc438;
      divideKey["includes"](_0x13c32d["className"])
        ? (_0x20ed92[_0x419cc9(0x10e)] > 0x0 &&
            (_0x40da15[_0x419cc9(0x149)](
              _0x20ed92[_0x419cc9(0x15f)](
                (_0x596215) => _0x596215[_0x419cc9(0x108)]
              )[_0x419cc9(0x182)]("")
            ),
            (_0x20ed92 = [])),
          _0x20ed92[_0x419cc9(0x149)](_0x13c32d))
        : _0x20ed92["push"](_0x13c32d);
    }),
    _0x20ed92[_0x4fc438(0x10e)] > 0x0 &&
      _0x40da15[_0x4fc438(0x149)](
        _0x20ed92[_0x4fc438(0x15f)]((_0x215a81) => _0x215a81[_0x4fc438(0x108)])[
          _0x4fc438(0x182)
        ]("")
      ),
    _0x40da15
  );
}
window[_0x29bb1f(0x15d)](_0x29bb1f(0xfb), (_0x23672c) => {
  const _0x593ac3 = _0x29bb1f,
    { functionName: _0x28f099, args: _0x12928c } = _0x23672c[_0x593ac3(0x133)];
  _0x28f099 === _0x593ac3(0x176) &&
    typeof window[_0x28f099] === "function" &&
    window[_0x28f099](_0x12928c[0x0]),
    _0x28f099 === _0x593ac3(0x16f) &&
      typeof window[_0x28f099] === _0x593ac3(0x164) &&
      window[_0x28f099](_0x12928c[0x0]),
    _0x28f099 === _0x593ac3(0x17a) &&
      typeof window[_0x28f099] === "function" &&
      window[_0x28f099](_0x12928c[0x0]),
    _0x28f099 === _0x593ac3(0x116) &&
      typeof window[_0x28f099] === _0x593ac3(0x164) &&
      window[_0x28f099](_0x12928c[0x0]);
});
function iTeX_hml_tag_parser(_0x264aee) {
  const _0x4bb345 = _0x29bb1f,
    _0x28d3d4 = new DOMParser(),
    _0x15a5bf = _0x28d3d4[_0x4bb345(0x147)](_0x264aee, "text/html"),
    _0x400a5e = _0x15a5bf["querySelectorAll"]("p"),
    _0x430725 = {
      그룹: _0x4bb345(0x158),
      대발문: "tag_bigcontent",
      지문: _0x4bb345(0x169),
      문제: _0x4bb345(0x10d),
      소문제: _0x4bb345(0x112),
      보기: _0x4bb345(0x12a),
      선지: _0x4bb345(0x178),
      정답: _0x4bb345(0xf1),
      해설: _0x4bb345(0x151),
      힌트: _0x4bb345(0xf4),
      개념: "tag_concept",
      제목: _0x4bb345(0x152),
      팁: "tag_tip",
    };
  let _0x3f8a20 = "",
    _0x1a74a9 = null,
    _0x5ad798 = 0x0;
  return (
    _0x400a5e[_0x4bb345(0x154)]((_0x59f5a2) => {
      const _0x1068d8 = _0x4bb345;
      _0x59f5a2[_0x1068d8(0x12d)](_0x1068d8(0x146));
      const _0x4eeb92 = _0x59f5a2["querySelectorAll"](_0x1068d8(0x130));
      _0x4eeb92[_0x1068d8(0x154)]((_0x90076d) => {
        const _0x20216f = _0x1068d8,
          _0x4feadd = _0x90076d["getAttribute"](_0x20216f(0xfe)),
          _0x55651f =
            "" +
            uploaded_img_url +
            _0x4feadd["substring"](
              _0x4feadd[_0x20216f(0x167)](_0x20216f(0x16c))
            );
        _0x90076d["setAttribute"](_0x20216f(0xfe), _0x55651f);
      });
      let _0x575512 = _0x59f5a2[_0x1068d8(0x15c)][_0x1068d8(0x103)]();
      const _0x52c257 = _0x575512[_0x1068d8(0x138)](/^\[(.*?)\]$/);
      if (_0x52c257) {
        const _0x1a5f29 = _0x52c257[0x1]["replace"](/\s+/g, "");
        _0x1a5f29 in _0x430725 &&
          (_0x59f5a2?.[_0x1068d8(0x111)][_0x1068d8(0x172)](
            _0x430725[_0x1a5f29]
          ),
          _0x59f5a2[_0x1068d8(0x148)](_0x1068d8(0x10b), _0x1068d8(0x12b)),
          _0x430725[_0x1a5f29] === "tag_group" &&
            (_0x1a74a9 && (_0x3f8a20 += _0x1a74a9[_0x1068d8(0x108)]),
            (_0x1a74a9 = document[_0x1068d8(0x118)](_0x1068d8(0x173))),
            _0x1a74a9?.[_0x1068d8(0x111)][_0x1068d8(0x172)](_0x1068d8(0x11e)),
            _0x1a74a9["setAttribute"]("id", _0x1068d8(0x11d) + _0x5ad798++)));
      }
      _0x1a74a9 && _0x1a74a9[_0x1068d8(0x170)](_0x59f5a2);
    }),
    _0x1a74a9 && (_0x3f8a20 += _0x1a74a9["outerHTML"]),
    _0x3f8a20
  );
}
