/* eslint-disable no-empty */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable no-redeclare */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-constant-condition */
/* eslint-disable no-func-assign */
/* eslint-disable no-undef */
const _0x316806 = _0x464a;
(function (_0x5c9641, _0x476986) {
  const _0x19e4db = _0x464a,
    _0x24a9cd = _0x5c9641();
  while (!![]) {
    try {
      const _0x254676 =
        (parseInt(_0x19e4db(0x17f)) / 0x1) *
          (-parseInt(_0x19e4db(0x10e)) / 0x2) +
        parseInt(_0x19e4db(0x177)) / 0x3 +
        -parseInt(_0x19e4db(0x11a)) / 0x4 +
        -parseInt(_0x19e4db(0x15d)) / 0x5 +
        -parseInt(_0x19e4db(0x12b)) / 0x6 +
        parseInt(_0x19e4db(0x118)) / 0x7 +
        (-parseInt(_0x19e4db(0x14c)) / 0x8) *
          (-parseInt(_0x19e4db(0x11c)) / 0x9);
      if (_0x254676 === _0x476986) break;
      else _0x24a9cd["push"](_0x24a9cd["shift"]());
    } catch (_0x5b5f3f) {
      _0x24a9cd["push"](_0x24a9cd["shift"]());
    }
  }
})(_0x32d6, 0x9aef4),
  (window[_0x316806(0x124)] = (_0x32dab4) => {
    const _0xdd5224 = _0x316806,
      _0x3f6282 = document["getElementById"](iTeXEQ[_0xdd5224(0x117)]);
    function _0x10c72e() {
      const _0x3ef01f = _0xdd5224;
      (onlyEQ = !![]),
        (onlyEQNode = _0x32dab4),
        _0x3f6282?.[_0x3ef01f(0x144)]["remove"](_0x3ef01f(0x13a)),
        iTeXEQ[_0x3ef01f(0x189)]();
    }
    function _0x596644() {
      const _0x25e993 = _0xdd5224;
      (onlyEQ = ![]),
        (onlyEQNode = ""),
        _0x3f6282?.[_0x25e993(0x144)][_0x25e993(0x18d)](_0x25e993(0x13a));
    }
    _0x3f6282?.[_0xdd5224(0x144)]["contains"](_0xdd5224(0x13a))
      ? _0x10c72e()
      : _0x596644();
  }),
  (window["usePostJsonData"] = function setExamData(_0x51dc39) {
    const _0x265d3c = _0x316806;
    try {
      const _0x37b80a = tinymce[_0x265d3c(0x123)](_0x265d3c(0x168));
      return _0x37b80a
        ? (_0x37b80a[_0x265d3c(0x12f)]["setContent"](_0x51dc39), !![])
        : (console[_0x265d3c(0x182)](
            "ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다."
          ),
          ![]);
    } catch (_0x5094b7) {
      return console["error"](_0x265d3c(0x142), _0x5094b7), ![];
    }
  });
async function uploadImageToServer(_0x73df53, _0x4a59a0) {
  const _0x2e9212 = _0x316806,
    _0x1be867 = new FormData();
  _0x1be867[_0x2e9212(0x188)]("img_data", _0x4a59a0),
    _0x1be867[_0x2e9212(0x188)](_0x2e9212(0x18a), _0x73df53),
    _0x1be867["append"](_0x2e9212(0x146), dream_server_url);
  const _0x2fb2af = await fetch(dream_server_url + "/uploadImage", {
    method: "POST",
    body: _0x1be867,
  });
  if (!_0x2fb2af["ok"]) throw new Error("Error\x20uploading\x20image");
  const _0x453490 = await _0x2fb2af["json"]();
  return console[_0x2e9212(0x14b)](_0x2e9212(0x172), _0x453490), _0x453490;
}
function clearEditorContent() {
  const _0x4c4076 = _0x316806,
    _0x4e33bc = tinymce[_0x4c4076(0x123)](_0x4c4076(0x168));
  _0x4e33bc
    ? _0x4e33bc[_0x4c4076(0x161)]("")
    : console[_0x4c4076(0x182)]("Editor\x20not\x20found");
}
window["saveExamData"] = async function () {
  const _0x4d1d69 = _0x316806;
  try {
    const _0x442cdc =
        tinymce[_0x4d1d69(0x165)][_0x4d1d69(0x140)][_0x4d1d69(0x10f)] ||
        tinymce[_0x4d1d69(0x165)][_0x4d1d69(0x133)][_0x4d1d69(0x10f)],
      _0x145231 = iTeXEQ[_0x4d1d69(0x116)](_0x442cdc[_0x4d1d69(0x15c)]("body"));
    if (!_0x145231) return console[_0x4d1d69(0x182)](_0x4d1d69(0x166)), ![];
    const _0x373802 = [
        "tag_bigcontent",
        _0x4d1d69(0x187),
        _0x4d1d69(0x136),
        _0x4d1d69(0x115),
        _0x4d1d69(0x11d),
        _0x4d1d69(0x181),
        _0x4d1d69(0x16b),
        _0x4d1d69(0x185),
        _0x4d1d69(0x175),
        _0x4d1d69(0x171),
        _0x4d1d69(0x162),
        _0x4d1d69(0x153),
      ],
      _0x471cc5 = _0x145231["querySelectorAll"]("p");
    if (_0x471cc5["length"] > 0x0) {
      const _0x1c9c2f = _0x471cc5[0x0][_0x4d1d69(0x15c)](_0x4d1d69(0x107)),
        _0x575858 = Array[_0x4d1d69(0x132)](_0x471cc5[0x0]?.[_0x4d1d69(0x144)])[
          _0x4d1d69(0x17a)
        ]((_0x56641b) => _0x373802["includes"](_0x56641b)),
        _0x5e0d3f = Array[_0x4d1d69(0x132)](_0x471cc5)[_0x4d1d69(0x17a)](
          (_0x2574bc) =>
            _0x2574bc?.[_0x4d1d69(0x144)]["contains"](_0x4d1d69(0x136)) ||
            _0x2574bc?.["classList"][_0x4d1d69(0x151)](_0x4d1d69(0x170)) ||
            _0x2574bc?.["classList"]["contains"](_0x4d1d69(0x187))
        ),
        _0x113748 = Array[_0x4d1d69(0x132)](_0x471cc5)["find"]((_0x45f46e) =>
          _0x45f46e?.[_0x4d1d69(0x144)][_0x4d1d69(0x151)](_0x4d1d69(0x18e))
        );
      if (_0x1c9c2f)
        return alert("내용\x20앞에\x20태그를\x20입력해주세요."), ![];
      if (!_0x575858)
        return (
          alert("내용\x20앞에\x20태그를\x20입력해\x20주세요"),
          iTeXEQ[_0x4d1d69(0x126)](),
          ![]
        );
      if (!_0x5e0d3f)
        return (
          alert("문제\x20or\x20대발문\x20or\x20지문\x20태그가\x20필요합니다!"),
          ![]
        );
    } else return alert(_0x4d1d69(0x178)), ![];
    const _0x113874 = _0x145231[_0x4d1d69(0x106)](_0x4d1d69(0x11f)),
      _0x38897f = Array[_0x4d1d69(0x132)](_0x113874)[_0x4d1d69(0x180)](
        (_0x2fd03b) => _0x2fd03b[_0x4d1d69(0x113)]
      );
    try {
      const _0x203ee2 = await uploadImageToServer(img_save_type, _0x38897f);
      console[_0x4d1d69(0x14b)](_0x4d1d69(0x18b), _0x203ee2);
      if (_0x203ee2[_0x4d1d69(0x16a)]) {
        const _0x3ac5c2 = _0x203ee2[_0x4d1d69(0x16a)][_0x4d1d69(0x15a)](",");
        _0x113874[_0x4d1d69(0x184)]((_0x2d3483, _0x36ab44) => {
          const _0x2a8693 = _0x4d1d69;
          _0x3ac5c2[_0x36ab44] &&
            (_0x2d3483["setAttribute"]("src", _0x3ac5c2[_0x36ab44]),
            _0x2d3483[_0x2a8693(0x157)]("data-mce-src"));
        });
      }
    } catch (_0x3cf990) {
      console[_0x4d1d69(0x182)](_0x4d1d69(0x13e), _0x3cf990);
    }
    const _0x348430 = _0x145231[_0x4d1d69(0x145)],
      _0x34f20a = {
        tag_group: _0x348430,
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
      _0x9d2a4 = new DOMParser(),
      _0x434167 = _0x9d2a4[_0x4d1d69(0x143)](_0x348430, _0x4d1d69(0x150));
    let _0x3a35ae = null,
      _0x370684 = "";
    if (!_0x434167["body"])
      return console[_0x4d1d69(0x182)](_0x4d1d69(0x16e)), ![];
    const _0x5f1e01 = (_0x48f196, _0x6634f3) => {
      const _0x3fe55f = _0x4d1d69;
      Array["isArray"](_0x34f20a[_0x48f196]) &&
        _0x34f20a[_0x48f196][_0x3fe55f(0x190)](_0x6634f3);
    };
    Array[_0x4d1d69(0x132)](_0x434167[_0x4d1d69(0x127)][_0x4d1d69(0x14d)])[
      _0x4d1d69(0x184)
    ]((_0x1422b3) => {
      const _0x137413 = _0x4d1d69;
      if (_0x1422b3[_0x137413(0x160)] === Node[_0x137413(0x141)]) {
        const _0x1b762a = Array[_0x137413(0x132)](_0x1422b3?.["classList"]),
          _0x309225 = _0x1b762a[_0x137413(0x17a)]((_0x1d51aa) =>
            _0x373802[_0x137413(0x10b)](_0x1d51aa)
          );
        if (_0x309225)
          _0x3a35ae && _0x5f1e01(_0x3a35ae, _0x370684),
            (_0x3a35ae = _0x309225),
            (_0x370684 = _0x1422b3[_0x137413(0x14e)]);
        else _0x3a35ae && (_0x370684 += _0x1422b3["outerHTML"]);
      }
    });
    _0x3a35ae && _0x5f1e01(_0x3a35ae, _0x370684);
    const _0x56f87d = JSON[_0x4d1d69(0x163)](_0x34f20a, null, 0x2);
    return iTeXEQ[_0x4d1d69(0x126)](), clearEditorContent(), _0x56f87d;
  } catch (_0x2a930b) {
    return (
      console["error"]("Error\x20while\x20saving\x20exam\x20data:", _0x2a930b),
      ![]
    );
  }
};
function _0x464a(_0x5e94a5, _0xfcb048) {
  const _0x32d6a9 = _0x32d6();
  return (
    (_0x464a = function (_0x464a3b, _0x1dc144) {
      _0x464a3b = _0x464a3b - 0x106;
      let _0x1d5989 = _0x32d6a9[_0x464a3b];
      return _0x1d5989;
    }),
    _0x464a(_0x5e94a5, _0xfcb048)
  );
}
function hml_upload(_0xe5152d) {
  const _0x5c0287 = _0x316806;
  var _0xd41df8 = new FormData();
  _0xd41df8["append"](_0x5c0287(0x13d), _0xe5152d["name"]),
    _0xd41df8[_0x5c0287(0x188)](_0x5c0287(0x17e), _0xe5152d),
    _0xd41df8[_0x5c0287(0x188)](_0x5c0287(0x18a), img_save_type),
    _0xd41df8["append"](_0x5c0287(0x146), dream_server_url);
  var _0x53b531 = new XMLHttpRequest();
  _0x53b531[_0x5c0287(0x139)](
    "POST",
    dream_server_url + _0x5c0287(0x173),
    !![]
  ),
    _0x53b531["send"](_0xd41df8),
    (_0x53b531["onreadystatechange"] = function () {
      const _0x17848f = _0x5c0287;
      if (
        _0x53b531[_0x17848f(0x10c)] == 0x4 &&
        _0x53b531[_0x17848f(0x12d)] == 0xc8
      ) {
        const _0x3203e6 = document[_0x17848f(0x15c)](_0x17848f(0x13f));
        var _0x350245 = JSON[_0x17848f(0x176)](_0x53b531["responseText"]);
        (_0x3203e6[_0x17848f(0x145)] = _0x350245[_0x17848f(0x15f)]),
          document[_0x17848f(0x15c)](_0x17848f(0x16c))?.[_0x17848f(0x144)][
            _0x17848f(0x18d)
          ]("itex_area_hidden"),
          iTeXEQ[_0x17848f(0x135)](_0x3203e6),
          (document[_0x17848f(0x114)](_0x17848f(0x167))["style"]["display"] =
            "none"),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
function _0x32d6() {
  const _0x189f6e = [
    "TIP",
    "find",
    "match",
    "COMMENTARY",
    "false",
    "file",
    "2TeqkWy",
    "map",
    "tag_choices",
    "error",
    "appendChild",
    "forEach",
    "tag_commentary",
    "trim",
    "tag_content",
    "append",
    "editorStart",
    "img_save_type",
    "uploadResults:\x20",
    "원래\x20자리를\x20찾을\x20수\x20없습니다.",
    "add",
    "tag_group",
    "display",
    "push",
    "querySelectorAll",
    "br[data-mce-bogus=\x221\x22]",
    "data-mce-src",
    "exam_box",
    ".exam_box",
    "includes",
    "readyState",
    "function",
    "1072782JplyAA",
    "document",
    "data",
    "setAttribute",
    "setExamData",
    "src",
    "getElementById",
    "tag_exam_sm",
    "removeSVG",
    "editor_container",
    "4779747jEyZZd",
    "className",
    "3513248EMKhlW",
    "saveHmlData",
    "14825907MDyaQk",
    "tag_example",
    "cloneNode",
    "img",
    "contenteditable",
    "template",
    "문서를\x20업로드\x20하세요.",
    "get",
    "openEQ",
    "hasChildNodes",
    "latexrecovery",
    "body",
    "addEventListener",
    "POST",
    "closest",
    "1235418ZZgUNu",
    "div",
    "status",
    "textContent",
    "selection",
    "exam_box_",
    "content",
    "from",
    "contentDocument",
    "style",
    "recoverynew_no_click",
    "tag_exam",
    "saveExamData",
    "getContent",
    "open",
    "display_inactive",
    "CHOICES",
    "send",
    "file_name",
    "Error\x20processing\x20image:",
    ".itex_hml_convert_view",
    "contentWindow",
    "ELEMENT_NODE",
    "콘텐츠\x20삽입\x20중\x20오류\x20발생:",
    "parseFromString",
    "classList",
    "innerHTML",
    "save_path",
    "responseText",
    "setExamList",
    "target",
    "length",
    "log",
    "8XWjQCz",
    "childNodes",
    "outerHTML",
    "Error\x20in\x20math\x20render:",
    "text/html",
    "contains",
    "HINT",
    "tag_tip",
    "none",
    "join",
    "getExamCodenum",
    "removeAttribute",
    "getAttribute",
    "QUESTION",
    "split",
    "createElement",
    "querySelector",
    "2740125vbqwHr",
    "itex_area_hidden",
    "itexdata",
    "nodeType",
    "setContent",
    "tag_title",
    "stringify",
    "데이터가\x20존재하지\x20않습니다.",
    "activeEditor",
    "No\x20data\x20found\x20in\x20the\x20parsed\x20document.",
    "modal_block",
    "tinyeditor",
    "recoverynew",
    "imgURL",
    "tl_answer",
    ".origin_img_area",
    "[그룹]",
    "Parsed\x20document\x20does\x20not\x20contain\x20body.",
    "BIG",
    "tag_bigcontent",
    "tag_concept",
    "data:\x20",
    "/qnapi_dream/hml_upload",
    "SMALL",
    "tag_hint",
    "parse",
    "3028470MNwepP",
    "No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.",
  ];
  _0x32d6 = function () {
    return _0x189f6e;
  };
  return _0x32d6();
}
let lastClickedBoxId = null,
  currentEditorContent = "";
function htmlStringToNode(_0x34dcaa) {
  const _0xe72154 = _0x316806;
  var _0x35d532 = document[_0xe72154(0x15b)](_0xe72154(0x121));
  return (_0x35d532[_0xe72154(0x145)] = _0x34dcaa), _0x35d532[_0xe72154(0x131)];
}
async function hml_edit_finish() {
  const _0x5f254b = _0x316806;
  if (!lastClickedBoxId) {
    console[_0x5f254b(0x182)]("수정할\x20요소가\x20선택되지\x20않았습니다.");
    return;
  }
  const _0x400d52 = tinymce[_0x5f254b(0x123)](_0x5f254b(0x168))["getContent"](),
    _0x44d59f = document[_0x5f254b(0x15c)](_0x5f254b(0x13f)),
    _0x20d074 = document[_0x5f254b(0x114)](lastClickedBoxId);
  if (_0x20d074) {
    const _0x3e2c84 = htmlStringToNode(_0x400d52);
    try {
      const _0x33d289 = await iTeXDBW_mathrender_hml(_0x3e2c84),
        _0x4e8c22 = document[_0x5f254b(0x15b)](_0x5f254b(0x12c));
      _0x4e8c22["appendChild"](_0x33d289),
        (_0x20d074[_0x5f254b(0x14e)] = _0x4e8c22["innerHTML"]),
        iTeXEQ[_0x5f254b(0x135)](_0x44d59f),
        tinymce[_0x5f254b(0x123)]("tinyeditor")[_0x5f254b(0x161)](""),
        (lastClickedBoxId = null),
        (currentEditorContent = "");
    } catch (_0x28e77a) {
      console[_0x5f254b(0x182)](_0x5f254b(0x14f), _0x28e77a);
    }
  } else console[_0x5f254b(0x182)](_0x5f254b(0x18c));
}
async function hml_upload_frame(_0x1437e7) {
  const _0x5482af = _0x316806;
  document[_0x5482af(0x114)](_0x5482af(0x167))["style"][_0x5482af(0x18f)] =
    "block";
  var _0xc86939 = new FormData();
  _0xc86939[_0x5482af(0x188)](_0x5482af(0x13d), _0x1437e7["name"]),
    _0xc86939[_0x5482af(0x188)]("file", _0x1437e7),
    _0xc86939[_0x5482af(0x188)]("img_save_type", img_save_type),
    _0xc86939[_0x5482af(0x188)](_0x5482af(0x146), dream_server_url);
  var _0x493844 = new XMLHttpRequest();
  _0x493844[_0x5482af(0x139)](
    _0x5482af(0x129),
    dream_server_url + _0x5482af(0x173),
    !![]
  ),
    _0x493844[_0x5482af(0x13c)](_0xc86939),
    (_0x493844["onreadystatechange"] = async function () {
      const _0x3ef73c = _0x5482af;
      if (_0x493844[_0x3ef73c(0x10c)] == 0x4 && _0x493844["status"] == 0xc8) {
        const _0x5c37b9 = document["querySelector"](_0x3ef73c(0x13f));
        var _0x5a2830 = JSON[_0x3ef73c(0x176)](_0x493844[_0x3ef73c(0x147)]);
        const _0x2f27c2 = iTeX_hml_tag_parser(_0x5a2830[_0x3ef73c(0x15f)]);
        (_0x5c37b9[_0x3ef73c(0x145)] = _0x2f27c2),
          _0x5c37b9[_0x3ef73c(0x128)]("click", async function (_0x45bf92) {
            const _0x166682 = _0x3ef73c;
            if (_0x45bf92["target"]["closest"](_0x166682(0x10a))) {
              const _0x59beb7 = _0x45bf92[_0x166682(0x149)][_0x166682(0x12a)](
                  _0x166682(0x10a)
                ),
                _0x5e878f = _0x59beb7[_0x166682(0x158)]("id");
              lastClickedBoxId &&
                tinymce["get"](_0x166682(0x168))["getContent"]() !==
                  currentEditorContent &&
                confirm(
                  "변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다."
                ) &&
                (await hml_edit_finish());
              const _0x22cfe4 = htmlStringToNode(_0x59beb7[_0x166682(0x14e)]);
              lastClickedBoxId = _0x5e878f;
              try {
                const _0xbae333 = await iTeXDBW_mathrender_hml(_0x22cfe4),
                  _0x2f9847 = document[_0x166682(0x15b)]("div");
                _0x2f9847[_0x166682(0x183)](_0xbae333),
                  tinymce[_0x166682(0x123)](_0x166682(0x168))[_0x166682(0x161)](
                    _0x2f9847[_0x166682(0x145)]
                  ),
                  (currentEditorContent = _0x2f9847[_0x166682(0x145)]);
              } catch (_0x235707) {
                console[_0x166682(0x182)](_0x166682(0x14f), _0x235707);
              }
              iTeXEQ[_0x166682(0x169)]();
            }
          }),
          document[_0x3ef73c(0x15c)](_0x3ef73c(0x16c))?.[_0x3ef73c(0x144)][
            _0x3ef73c(0x18d)
          ](_0x3ef73c(0x15e)),
          iTeXEQ[_0x3ef73c(0x135)](_0x5c37b9),
          (document[_0x3ef73c(0x114)](_0x3ef73c(0x167))[_0x3ef73c(0x134)][
            _0x3ef73c(0x18f)
          ] = _0x3ef73c(0x154));
      }
    });
}
window[_0x316806(0x11b)] = async function () {
  const _0x54096c = _0x316806,
    _0x1cb7ed = document[_0x54096c(0x15c)](_0x54096c(0x13f))[_0x54096c(0x11e)](
      !![]
    );
  if (!_0x1cb7ed[_0x54096c(0x125)]()) {
    alert(_0x54096c(0x122));
    return;
  }
  const _0x2dc35f = tinymce[_0x54096c(0x123)](_0x54096c(0x168))[
    _0x54096c(0x138)
  ]();
  if (_0x2dc35f[_0x54096c(0x186)]() !== "") {
    const _0x50fa8a = confirm(
      "에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?"
    );
    if (!_0x50fa8a) return;
  }
  if (_0x1cb7ed) {
    const _0x1a92cb = _0x1cb7ed["querySelectorAll"](_0x54096c(0x10a)),
      _0x311985 = [],
      _0x14e943 = _0x1cb7ed[_0x54096c(0x106)](_0x54096c(0x11f)),
      _0x46c441 = Array[_0x54096c(0x132)](_0x14e943)["map"](
        (_0x1a35c0) => _0x1a35c0[_0x54096c(0x113)]
      );
    try {
      const _0x2f1c59 = await uploadImageToServer(img_save_type, _0x46c441);
      console["log"](_0x54096c(0x18b), _0x2f1c59);
      if (_0x2f1c59["imgURL"]) {
        const _0x202cf4 = _0x2f1c59[_0x54096c(0x16a)][_0x54096c(0x15a)](",");
        _0x14e943[_0x54096c(0x184)]((_0x471d4e, _0x18ec46) => {
          const _0x22227d = _0x54096c;
          _0x202cf4[_0x18ec46] &&
            (_0x471d4e[_0x22227d(0x111)]("src", _0x202cf4[_0x18ec46]),
            _0x471d4e[_0x22227d(0x157)](_0x22227d(0x108)));
        });
      }
    } catch (_0x4c3a67) {
      console[_0x54096c(0x182)](_0x54096c(0x13e), _0x4c3a67);
    }
    return (
      _0x1a92cb["forEach"]((_0x474c01, _0x41e987) => {
        const _0x1f6ff8 = _0x54096c,
          _0x395ccf = [];
        let _0x3b7a98 = 0x1;
        const _0x407243 = _0x474c01["querySelectorAll"]("p");
        _0x407243[_0x1f6ff8(0x184)]((_0x1cff5f) => {
          const _0x54237b = _0x1f6ff8,
            _0xbdf4a6 = _0x1cff5f?.[_0x54237b(0x144)];
          let _0x521bc2 = null;
          if (_0xbdf4a6[_0x54237b(0x151)](_0x54237b(0x170)))
            _0x521bc2 = _0x54237b(0x16f);
          else {
            if (_0xbdf4a6[_0x54237b(0x151)](_0x54237b(0x187)))
              _0x521bc2 = "TEXT";
            else {
              if (_0xbdf4a6[_0x54237b(0x151)](_0x54237b(0x136)))
                _0x521bc2 = _0x54237b(0x159);
              else {
                if (_0xbdf4a6[_0x54237b(0x151)]("tag_exam_sm"))
                  _0x521bc2 = _0x54237b(0x174);
                else {
                  if (_0xbdf4a6[_0x54237b(0x151)]("tag_example"))
                    _0x521bc2 = "EXAMPLE";
                  else {
                    if (_0xbdf4a6[_0x54237b(0x151)](_0x54237b(0x181)))
                      _0x521bc2 = _0x54237b(0x13b);
                    else {
                      if (_0xbdf4a6[_0x54237b(0x151)](_0x54237b(0x16b)))
                        _0x521bc2 = "ANSWER";
                      else {
                        if (_0xbdf4a6["contains"]("tag_commentary"))
                          _0x521bc2 = _0x54237b(0x17c);
                        else {
                          if (_0xbdf4a6[_0x54237b(0x151)](_0x54237b(0x175)))
                            _0x521bc2 = _0x54237b(0x152);
                          else {
                            if (_0xbdf4a6[_0x54237b(0x151)](_0x54237b(0x171)))
                              _0x521bc2 = "CONCEPT";
                            else {
                              if (_0xbdf4a6[_0x54237b(0x151)](_0x54237b(0x162)))
                                _0x521bc2 = "TITLE";
                              else {
                                if (_0xbdf4a6["contains"](_0x54237b(0x153)))
                                  _0x521bc2 = _0x54237b(0x179);
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
          if (_0x521bc2) {
            let _0x29f1fd = _0x1cff5f[_0x54237b(0x14e)],
              _0x4caa9e = _0x1cff5f["nextElementSibling"];
            while (
              _0x4caa9e &&
              !_0x4caa9e[_0x54237b(0x144)]["contains"](_0x54237b(0x170)) &&
              !_0x4caa9e["classList"]["contains"](_0x54237b(0x187)) &&
              !_0x4caa9e["classList"]["contains"](_0x54237b(0x136)) &&
              !_0x4caa9e["classList"][_0x54237b(0x151)](_0x54237b(0x115)) &&
              !_0x4caa9e[_0x54237b(0x144)][_0x54237b(0x151)](
                _0x54237b(0x11d)
              ) &&
              !_0x4caa9e[_0x54237b(0x144)][_0x54237b(0x151)](
                _0x54237b(0x181)
              ) &&
              !_0x4caa9e[_0x54237b(0x144)][_0x54237b(0x151)](
                _0x54237b(0x16b)
              ) &&
              !_0x4caa9e[_0x54237b(0x144)][_0x54237b(0x151)](
                "tag_commentary"
              ) &&
              !_0x4caa9e[_0x54237b(0x144)]["contains"](_0x54237b(0x175)) &&
              !_0x4caa9e["classList"][_0x54237b(0x151)](_0x54237b(0x171)) &&
              !_0x4caa9e["classList"][_0x54237b(0x151)]("tag_title") &&
              !_0x4caa9e[_0x54237b(0x144)][_0x54237b(0x151)](_0x54237b(0x153))
            ) {
              (_0x29f1fd += _0x4caa9e[_0x54237b(0x14e)]),
                (_0x4caa9e = _0x4caa9e["nextElementSibling"]);
            }
            _0x395ccf[_0x54237b(0x190)]({
              type: _0x521bc2,
              content: _0x29f1fd,
              sort: _0x3b7a98++,
            });
          }
        }),
          _0x311985["push"]({ id: null, quizItemList: _0x395ccf });
      }),
      tinymce["get"](_0x54096c(0x168))[_0x54096c(0x161)](""),
      _0x311985
    );
  } else return console[_0x54096c(0x14b)](_0x54096c(0x164)), null;
};
function processHmlData(_0x55ee85) {
  const _0x42c0c5 = _0x316806,
    _0x1af46a = [],
    _0x2acd05 = Array[_0x42c0c5(0x132)](_0x55ee85[_0x42c0c5(0x106)]("p"));
  let _0xa14f68 = [],
    _0x35b774 = ![];
  return (
    _0x2acd05[_0x42c0c5(0x184)]((_0x3a89bf) => {
      const _0x16b3dd = _0x42c0c5;
      divideKey[_0x16b3dd(0x10b)](_0x3a89bf[_0x16b3dd(0x119)])
        ? (_0xa14f68[_0x16b3dd(0x14a)] > 0x0 &&
            (_0x1af46a[_0x16b3dd(0x190)](
              _0xa14f68[_0x16b3dd(0x180)](
                (_0x3f368e) => _0x3f368e[_0x16b3dd(0x14e)]
              )[_0x16b3dd(0x155)]("")
            ),
            (_0xa14f68 = [])),
          _0xa14f68[_0x16b3dd(0x190)](_0x3a89bf))
        : _0xa14f68[_0x16b3dd(0x190)](_0x3a89bf);
    }),
    _0xa14f68["length"] > 0x0 &&
      _0x1af46a[_0x42c0c5(0x190)](
        _0xa14f68[_0x42c0c5(0x180)]((_0x1f1295) => _0x1f1295[_0x42c0c5(0x14e)])[
          _0x42c0c5(0x155)
        ]("")
      ),
    _0x1af46a
  );
}
window["addEventListener"]("message", (_0x11aaec) => {
  const _0x5012d4 = _0x316806,
    { functionName: _0x526c44, args: _0xfb79a0 } = _0x11aaec[_0x5012d4(0x110)];
  _0x526c44 === _0x5012d4(0x112) &&
    typeof window[_0x526c44] === _0x5012d4(0x10d) &&
    window[_0x526c44](_0xfb79a0[0x0]),
    _0x526c44 === _0x5012d4(0x148) &&
      typeof window[_0x526c44] === _0x5012d4(0x10d) &&
      window[_0x526c44](_0xfb79a0[0x0]),
    _0x526c44 === _0x5012d4(0x156) &&
      typeof window[_0x526c44] === "function" &&
      window[_0x526c44](_0xfb79a0[0x0]),
    _0x526c44 === _0x5012d4(0x137) &&
      typeof window[_0x526c44] === _0x5012d4(0x10d) &&
      window[_0x526c44](_0xfb79a0[0x0]);
});
function iTeX_hml_tag_parser(_0x512140) {
  const _0x48858a = _0x316806,
    _0x134653 = new DOMParser(),
    _0x10a458 = _0x134653[_0x48858a(0x143)](_0x512140, _0x48858a(0x150)),
    _0x42d4b4 = _0x10a458[_0x48858a(0x106)]("p"),
    _0x230913 = {
      그룹: _0x48858a(0x18e),
      대발문: _0x48858a(0x170),
      지문: _0x48858a(0x187),
      문제: _0x48858a(0x136),
      소문제: "tag_exam_sm",
      보기: _0x48858a(0x11d),
      선지: _0x48858a(0x181),
      정답: _0x48858a(0x16b),
      해설: _0x48858a(0x185),
      힌트: _0x48858a(0x175),
      개념: _0x48858a(0x171),
      제목: _0x48858a(0x162),
      팁: _0x48858a(0x153),
    };
  let _0x5d8cae = "",
    _0x546c4e = null,
    _0x3da7a7 = 0x0,
    _0x472a76 = ![];
  _0x42d4b4["forEach"]((_0x1b6fcc, _0x447268) => {
    const _0x37f102 = _0x48858a;
    _0x1b6fcc[_0x37f102(0x157)](_0x37f102(0x134));
    let _0x44ebde = _0x1b6fcc["textContent"][_0x37f102(0x186)]();
    const _0x4d436d = _0x44ebde[_0x37f102(0x17b)](/^\[(.*?)\]$/);
    if (_0x4d436d) {
      const _0x2e383a = _0x4d436d[0x1]["replace"](/\s+/g, "");
      if (_0x2e383a in _0x230913) {
        _0x1b6fcc?.[_0x37f102(0x144)][_0x37f102(0x18d)](_0x230913[_0x2e383a]),
          _0x1b6fcc["setAttribute"](_0x37f102(0x120), "false");
        if (_0x230913[_0x2e383a] === _0x37f102(0x18e))
          _0x472a76
            ? (_0x472a76 = ![])
            : (_0x546c4e &&
                ((_0x5d8cae += _0x546c4e["outerHTML"]), (_0x546c4e = null)),
              (_0x546c4e = document["createElement"](_0x37f102(0x12c))),
              _0x546c4e?.[_0x37f102(0x144)][_0x37f102(0x18d)](_0x37f102(0x109)),
              _0x546c4e["setAttribute"]("id", _0x37f102(0x130) + _0x3da7a7++),
              (_0x472a76 = !![]));
        else {
          if (_0x230913[_0x2e383a] === _0x37f102(0x136)) {
            if (_0x472a76) {
            } else
              _0x546c4e &&
                ((_0x5d8cae += _0x546c4e[_0x37f102(0x14e)]),
                (_0x546c4e = null)),
                (_0x546c4e = document[_0x37f102(0x15b)]("div")),
                _0x546c4e?.[_0x37f102(0x144)][_0x37f102(0x18d)](
                  _0x37f102(0x109)
                ),
                _0x546c4e[_0x37f102(0x111)]("id", "exam_box_" + _0x3da7a7++);
          }
        }
      }
    }
    _0x546c4e && _0x546c4e[_0x37f102(0x183)](_0x1b6fcc);
  });
  if (_0x546c4e) {
    if (_0x472a76) {
      const _0x2b3001 = document[_0x48858a(0x15b)]("p");
      _0x2b3001[_0x48858a(0x144)][_0x48858a(0x18d)]("para0", "tag_group"),
        _0x2b3001[_0x48858a(0x111)](_0x48858a(0x120), _0x48858a(0x17d)),
        (_0x2b3001[_0x48858a(0x12e)] = _0x48858a(0x16d)),
        _0x546c4e["appendChild"](_0x2b3001),
        (_0x5d8cae += _0x546c4e["outerHTML"]);
    } else _0x5d8cae += _0x546c4e["outerHTML"];
  }
  return _0x5d8cae;
}
