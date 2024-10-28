const _0x32e5ed = _0x2fea;
(function (_0x53f6d7, _0x1f320a) {
  const _0x51dd81 = _0x2fea,
    _0x30389b = _0x53f6d7();
  while (!![]) {
    try {
      const _0x3fdf7c =
        (-parseInt(_0x51dd81(0x25c)) / 0x1) *
          (parseInt(_0x51dd81(0x24f)) / 0x2) +
        parseInt(_0x51dd81(0x221)) / 0x3 +
        -parseInt(_0x51dd81(0x241)) / 0x4 +
        (-parseInt(_0x51dd81(0x215)) / 0x5) *
          (parseInt(_0x51dd81(0x253)) / 0x6) +
        -parseInt(_0x51dd81(0x22e)) / 0x7 +
        (-parseInt(_0x51dd81(0x24e)) / 0x8) *
          (parseInt(_0x51dd81(0x23a)) / 0x9) +
        parseInt(_0x51dd81(0x256)) / 0xa;
      if (_0x3fdf7c === _0x1f320a) break;
      else _0x30389b["push"](_0x30389b["shift"]());
    } catch (_0x22efe9) {
      _0x30389b["push"](_0x30389b["shift"]());
    }
  }
})(_0x373b, 0x54eee),
  (window["openEQ"] = (_0x1de13e) => {
    const _0x39e757 = _0x2fea,
      _0x11eeda = document[_0x39e757(0x257)](iTeXEQ[_0x39e757(0x20e)]);
    function _0xa74cdd() {
      const _0x3aaeaa = _0x39e757;
      (onlyEQ = !![]),
        (onlyEQNode = _0x1de13e),
        _0x11eeda?.[_0x3aaeaa(0x255)][_0x3aaeaa(0x219)](_0x3aaeaa(0x23b)),
        iTeXEQ[_0x3aaeaa(0x24a)]();
    }
    function _0x46e4a6() {
      const _0x231d00 = _0x39e757;
      (onlyEQ = ![]),
        (onlyEQNode = ""),
        _0x11eeda?.["classList"][_0x231d00(0x1f3)](_0x231d00(0x23b));
    }
    _0x11eeda?.["classList"][_0x39e757(0x210)]("display_inactive")
      ? _0xa74cdd()
      : _0x46e4a6();
  }),
  (window[_0x32e5ed(0x1f5)] = function setExamData(_0x43d557) {
    const _0x577a5b = _0x32e5ed;
    try {
      const _0x1b5d83 = tinymce[_0x577a5b(0x27e)](_0x577a5b(0x238));
      return _0x1b5d83
        ? (_0x1b5d83[_0x577a5b(0x235)][_0x577a5b(0x264)](_0x43d557), !![])
        : (console["error"](_0x577a5b(0x27b)), ![]);
    } catch (_0x1d5b68) {
      return console[_0x577a5b(0x1fc)](_0x577a5b(0x207), _0x1d5b68), ![];
    }
  });
async function uploadImageToServer(_0x489ccb, _0x9b42d) {
  const _0x2f9412 = _0x32e5ed,
    _0xd52bf4 = new FormData(),
    _0x4beeaa = await fetch(_0x9b42d),
    _0x4f8756 = await _0x4beeaa[_0x2f9412(0x23f)]();
  _0xd52bf4[_0x2f9412(0x20c)](_0x2f9412(0x22b), _0x4f8756, _0x2f9412(0x27a)),
    _0xd52bf4[_0x2f9412(0x20c)]("img_save_type", img_save_type),
    _0xd52bf4[_0x2f9412(0x20c)](_0x2f9412(0x20f), dream_server_url);
  const _0x3969ea = await fetch(dream_server_url + _0x2f9412(0x236), {
    method: "POST",
    body: _0xd52bf4,
  });
  if (!_0x3969ea["ok"]) throw new Error(_0x2f9412(0x220));
  const _0x445820 = await _0x3969ea[_0x2f9412(0x265)]();
  return console["log"](_0x2f9412(0x275), _0x445820), _0x445820;
}
function clearEditorContent() {
  const _0x81273f = _0x32e5ed,
    _0x1b58ca = tinymce[_0x81273f(0x27e)](_0x81273f(0x238));
  _0x1b58ca
    ? _0x1b58ca[_0x81273f(0x264)]("")
    : console[_0x81273f(0x1fc)]("Editor\x20not\x20found");
}
window[_0x32e5ed(0x23c)] = async function () {
  const _0x2c82a8 = _0x32e5ed;
  try {
    const _0x4aa2e7 =
        tinymce[_0x2c82a8(0x218)]["contentWindow"][_0x2c82a8(0x212)] ||
        tinymce["activeEditor"][_0x2c82a8(0x229)][_0x2c82a8(0x212)],
      _0x47f83b = iTeXEQ[_0x2c82a8(0x202)](_0x4aa2e7[_0x2c82a8(0x272)]("body"));
    if (!_0x47f83b) return console[_0x2c82a8(0x1fc)](_0x2c82a8(0x239)), ![];
    const _0x1886fc = [
        _0x2c82a8(0x223),
        _0x2c82a8(0x243),
        _0x2c82a8(0x222),
        _0x2c82a8(0x268),
        "tag_example",
        _0x2c82a8(0x25e),
        _0x2c82a8(0x201),
        _0x2c82a8(0x211),
        _0x2c82a8(0x27f),
        "tag_concept",
        "tag_title",
        _0x2c82a8(0x225),
      ],
      _0x1cd908 = _0x47f83b[_0x2c82a8(0x205)]("p");
    if (_0x1cd908) {
      const _0x1d7106 = _0x1cd908[0x0]["querySelector"](_0x2c82a8(0x217)),
        _0x37e468 = Array["from"](_0x1cd908[0x0]?.[_0x2c82a8(0x255)])["find"](
          (_0x8d5181) => _0x1886fc[_0x2c82a8(0x232)](_0x8d5181)
        ),
        _0x17517d = Array["from"](_0x1cd908)["find"]((_0x5e5984) =>
          _0x5e5984?.[_0x2c82a8(0x255)][_0x2c82a8(0x210)](_0x2c82a8(0x222))
        ),
        _0x2273cb = Array[_0x2c82a8(0x1f9)](_0x1cd908)[_0x2c82a8(0x244)](
          (_0x2950ba) =>
            _0x2950ba?.[_0x2c82a8(0x255)]["contains"](_0x2c82a8(0x226))
        );
      if (_0x1d7106) return alert(_0x2c82a8(0x21b)), ![];
      if (!_0x37e468)
        return alert(_0x2c82a8(0x1f7)), iTeXEQ["latexrecovery"](), ![];
      if (!_0x17517d) return alert("문제\x20태그가\x20필요합니다!"), ![];
    } else return alert(_0x2c82a8(0x26e)), ![];
    const _0x6bd48d = _0x47f83b[_0x2c82a8(0x205)]("img");
    for (const _0x277912 of _0x6bd48d) {
      try {
        const { imgUUID: _0x2f122d, imgURL: _0x1aa266 } =
          await uploadImageToServer(_0x277912[_0x2c82a8(0x245)]);
        console[_0x2c82a8(0x22f)](
          _0x2c82a8(0x237),
          dream_server_url + _0x1aa266
        ),
          _0x277912["setAttribute"](_0x2c82a8(0x21c), _0x2f122d),
          _0x277912[_0x2c82a8(0x1f6)](
            _0x2c82a8(0x245),
            dream_server_url + _0x1aa266
          );
      } catch (_0x39c7be) {
        console["error"](
          _0x2c82a8(0x231),
          _0x277912[_0x2c82a8(0x245)],
          _0x39c7be
        );
      }
    }
    const _0x3dde5 = {
        tag_group: _0x47f83b["innerHTML"],
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
      _0x37e609 = new DOMParser(),
      _0x1b4f3b = _0x37e609[_0x2c82a8(0x278)](
        _0x47f83b["innerHTML"],
        _0x2c82a8(0x279)
      );
    let _0x3ed3cb = null,
      _0x35636e = "";
    if (!_0x1b4f3b[_0x2c82a8(0x203)])
      return console[_0x2c82a8(0x1fc)](_0x2c82a8(0x1fa)), ![];
    const _0x46863e = (_0x548bda, _0x1d546e) => {
      const _0xc0e992 = _0x2c82a8;
      Array[_0xc0e992(0x27d)](_0x3dde5[_0x548bda]) &&
        _0x3dde5[_0x548bda][_0xc0e992(0x263)](_0x1d546e);
    };
    Array["from"](_0x1b4f3b[_0x2c82a8(0x203)][_0x2c82a8(0x204)])[
      _0x2c82a8(0x1ff)
    ]((_0xe7794d) => {
      const _0x26e199 = _0x2c82a8;
      if (_0xe7794d["nodeType"] === Node[_0x26e199(0x260)]) {
        const _0x1a7cfb = Array[_0x26e199(0x1f9)](
            _0xe7794d?.[_0x26e199(0x255)]
          ),
          _0x299ea7 = _0x1a7cfb["find"]((_0x12cc48) =>
            _0x1886fc[_0x26e199(0x232)](_0x12cc48)
          );
        if (_0x299ea7)
          _0x3ed3cb && _0x46863e(_0x3ed3cb, _0x35636e),
            (_0x3ed3cb = _0x299ea7),
            (_0x35636e = _0xe7794d[_0x26e199(0x234)]);
        else _0x3ed3cb && (_0x35636e += _0xe7794d["outerHTML"]);
      }
    });
    _0x3ed3cb && _0x46863e(_0x3ed3cb, _0x35636e);
    const _0x23923d = JSON["stringify"](_0x3dde5, null, 0x2);
    return iTeXEQ[_0x2c82a8(0x262)](), clearEditorContent(), _0x23923d;
  } catch (_0x35ccec) {
    return (
      console[_0x2c82a8(0x1fc)](
        "Error\x20while\x20saving\x20exam\x20data:",
        _0x35ccec
      ),
      ![]
    );
  }
};
function hml_upload(_0x2fde70) {
  const _0x36d584 = _0x32e5ed;
  console["log"]("hml_upload\x20들옴");
  var _0x2ce958 = new FormData();
  _0x2ce958[_0x36d584(0x20c)](_0x36d584(0x259), _0x2fde70[_0x36d584(0x248)]),
    _0x2ce958[_0x36d584(0x20c)](_0x36d584(0x22b), _0x2fde70);
  var _0x481149 = new XMLHttpRequest();
  _0x481149[_0x36d584(0x22a)](
    _0x36d584(0x206),
    dream_server_url + _0x36d584(0x26c),
    !![]
  ),
    _0x481149["send"](_0x2ce958),
    (_0x481149[_0x36d584(0x21d)] = function () {
      const _0xb9496b = _0x36d584;
      if (
        _0x481149[_0xb9496b(0x280)] == 0x4 &&
        _0x481149[_0xb9496b(0x1f1)] == 0xc8
      ) {
        const _0x3f4c00 = document["querySelector"](".itex_hml_convert_view");
        var _0x148668 = JSON[_0xb9496b(0x25b)](_0x481149["responseText"]);
        (_0x3f4c00[_0xb9496b(0x25a)] = _0x148668[_0xb9496b(0x283)]),
          document["querySelector"](_0xb9496b(0x277))?.[_0xb9496b(0x255)][
            _0xb9496b(0x1f3)
          ](_0xb9496b(0x246)),
          iTeXEQ[_0xb9496b(0x285)](_0x3f4c00),
          (document[_0xb9496b(0x257)](_0xb9496b(0x230))["style"]["display"] =
            _0xb9496b(0x228)),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
let lastClickedBoxId = null,
  currentEditorContent = "";
function _0x373b() {
  const _0x394d40 = [
    "tag_hint",
    "readyState",
    "send",
    "데이터가\x20존재하지\x20않습니다.",
    "itexdata",
    "closest",
    "recoverynew_no_click",
    "status",
    "click",
    "add",
    "setExamList",
    "usePostJsonData",
    "setAttribute",
    "내용\x20앞에\x20태그를\x20입력해\x20주세요",
    "block",
    "from",
    "Parsed\x20document\x20does\x20not\x20contain\x20body.",
    "Error\x20in\x20math\x20render:",
    "error",
    "replace",
    "createElement",
    "forEach",
    "contenteditable",
    "tl_answer",
    "removeSVG",
    "body",
    "childNodes",
    "querySelectorAll",
    "POST",
    "콘텐츠\x20삽입\x20중\x20오류\x20발생:",
    "responseText",
    "TITLE",
    "setExamData",
    "변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.",
    "append",
    "false",
    "editor_container",
    "save_path",
    "contains",
    "tag_commentary",
    "document",
    "EXAMPLE",
    "TIP",
    "10OWuPdU",
    "TEXT",
    "br[data-mce-bogus=\x221\x22]",
    "activeEditor",
    "remove",
    ".itex_hml_convert_view",
    "내용을\x20입력해주세요.",
    "Img_code",
    "onreadystatechange",
    "nextElementSibling",
    "className",
    "Error\x20uploading\x20image",
    "174912IRTzVG",
    "tag_exam",
    "tag_bigcontent",
    "cloneNode",
    "tag_tip",
    "tag_group",
    "img_save_type",
    "none",
    "contentDocument",
    "open",
    "file",
    "removeAttribute",
    "exam_box",
    "2846445sDcuSL",
    "log",
    "modal_block",
    "Error\x20processing\x20image:",
    "includes",
    "getExamCodenum",
    "outerHTML",
    "selection",
    "/uploadImage",
    "img_url:\x20",
    "tinyeditor",
    "No\x20data\x20found\x20in\x20the\x20parsed\x20document.",
    "9XPbFTH",
    "display_inactive",
    "saveExamData",
    "CONCEPT",
    "map",
    "blob",
    "문서를\x20업로드\x20하세요.",
    "457396BCkHjY",
    "length",
    "tag_content",
    "find",
    "src",
    "itex_area_hidden",
    "getContent",
    "name",
    "appendChild",
    "editorStart",
    "CHOICES",
    "exam_box_",
    "addEventListener",
    "5488712LkUExv",
    "1086pPzIzs",
    "style",
    "saveHmlData",
    "tag_concept",
    "96834wuUWDA",
    "div",
    "classList",
    "21213460gpkuqM",
    "getElementById",
    "수정할\x20요소가\x20선택되지\x20않았습니다.",
    "file_name",
    "innerHTML",
    "parse",
    "1091xsGKpw",
    "tag_title",
    "tag_choices",
    "원래\x20자리를\x20찾을\x20수\x20없습니다.",
    "ELEMENT_NODE",
    "content",
    "latexrecovery",
    "push",
    "setContent",
    "json",
    "HINT",
    "BIG",
    "tag_exam_sm",
    "join",
    "QUESTION",
    "data",
    "/qnapi_dream/hml_upload",
    "hasChildNodes",
    "No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.",
    "COMMENTARY",
    "recoverynew",
    ".exam_box",
    "querySelector",
    "message",
    "display",
    "data:\x20",
    "function",
    ".origin_img_area",
    "parseFromString",
    "text/html",
    "image.png",
    "ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.",
    "tag_example",
    "isArray",
    "get",
  ];
  _0x373b = function () {
    return _0x394d40;
  };
  return _0x373b();
}
function htmlStringToNode(_0x187785) {
  const _0x4352ac = _0x32e5ed;
  var _0x31c582 = document[_0x4352ac(0x1fe)]("template");
  return (_0x31c582[_0x4352ac(0x25a)] = _0x187785), _0x31c582[_0x4352ac(0x261)];
}
async function hml_edit_finish() {
  const _0x53a7b3 = _0x32e5ed;
  if (!lastClickedBoxId) {
    console[_0x53a7b3(0x1fc)](_0x53a7b3(0x258));
    return;
  }
  const _0x3d0d2e = tinymce[_0x53a7b3(0x27e)]("tinyeditor")[_0x53a7b3(0x247)](),
    _0x394040 = document[_0x53a7b3(0x272)](_0x53a7b3(0x21a)),
    _0x4bc8ec = document[_0x53a7b3(0x257)](lastClickedBoxId);
  if (_0x4bc8ec) {
    const _0x531920 = htmlStringToNode(_0x3d0d2e);
    try {
      const _0x1f4298 = await iTeXDBW_mathrender_hml(_0x531920),
        _0x4e57ec = document[_0x53a7b3(0x1fe)](_0x53a7b3(0x254));
      _0x4e57ec[_0x53a7b3(0x249)](_0x1f4298),
        (_0x4bc8ec[_0x53a7b3(0x234)] = _0x4e57ec[_0x53a7b3(0x25a)]),
        iTeXEQ["recoverynew_no_click"](_0x394040),
        tinymce[_0x53a7b3(0x27e)]("tinyeditor")[_0x53a7b3(0x264)](""),
        (lastClickedBoxId = null),
        (currentEditorContent = "");
    } catch (_0x1e28ba) {
      console[_0x53a7b3(0x1fc)]("Error\x20in\x20math\x20render:", _0x1e28ba);
    }
  } else console["error"](_0x53a7b3(0x25f));
}
async function hml_upload_frame(_0x6a8d44) {
  const _0x5d0747 = _0x32e5ed;
  console["log"]("hml_upload_frame\x20들옴"),
    (document[_0x5d0747(0x257)](_0x5d0747(0x230))["style"][_0x5d0747(0x274)] =
      _0x5d0747(0x1f8));
  var _0x31d5d9 = new FormData();
  _0x31d5d9["append"](_0x5d0747(0x259), _0x6a8d44[_0x5d0747(0x248)]),
    _0x31d5d9[_0x5d0747(0x20c)](_0x5d0747(0x22b), _0x6a8d44),
    _0x31d5d9[_0x5d0747(0x20c)](_0x5d0747(0x227), img_save_type),
    _0x31d5d9[_0x5d0747(0x20c)](_0x5d0747(0x20f), dream_server_url);
  var _0x460203 = new XMLHttpRequest();
  _0x460203[_0x5d0747(0x22a)](
    _0x5d0747(0x206),
    dream_server_url + "/qnapi_dream/hml_upload",
    !![]
  ),
    _0x460203[_0x5d0747(0x281)](_0x31d5d9),
    (_0x460203[_0x5d0747(0x21d)] = async function () {
      const _0x1b8453 = _0x5d0747;
      if (
        _0x460203[_0x1b8453(0x280)] == 0x4 &&
        _0x460203[_0x1b8453(0x1f1)] == 0xc8
      ) {
        const _0x44080a = document[_0x1b8453(0x272)](_0x1b8453(0x21a));
        var _0x1e20e4 = JSON["parse"](_0x460203[_0x1b8453(0x208)]);
        const _0x25a498 = iTeX_hml_tag_parser(_0x1e20e4[_0x1b8453(0x283)]);
        (_0x44080a[_0x1b8453(0x25a)] = _0x25a498),
          _0x44080a[_0x1b8453(0x24d)](
            _0x1b8453(0x1f2),
            async function (_0x232b5b) {
              const _0x2ddcd1 = _0x1b8453;
              if (_0x232b5b["target"][_0x2ddcd1(0x284)](_0x2ddcd1(0x271))) {
                const _0x149aac = _0x232b5b["target"][_0x2ddcd1(0x284)](
                    _0x2ddcd1(0x271)
                  ),
                  _0xc02cad = _0x149aac["getAttribute"]("id");
                lastClickedBoxId &&
                  tinymce[_0x2ddcd1(0x27e)](_0x2ddcd1(0x238))[
                    "getContent"
                  ]() !== currentEditorContent &&
                  confirm(_0x2ddcd1(0x20b)) &&
                  (await hml_edit_finish());
                const _0xefa67c = htmlStringToNode(_0x149aac[_0x2ddcd1(0x234)]);
                lastClickedBoxId = _0xc02cad;
                try {
                  const _0x3cf10c = await iTeXDBW_mathrender_hml(_0xefa67c),
                    _0x3fec7b = document["createElement"]("div");
                  _0x3fec7b["appendChild"](_0x3cf10c),
                    tinymce[_0x2ddcd1(0x27e)]("tinyeditor")[_0x2ddcd1(0x264)](
                      _0x3fec7b[_0x2ddcd1(0x25a)]
                    ),
                    (currentEditorContent = _0x3fec7b[_0x2ddcd1(0x25a)]);
                } catch (_0x572747) {
                  console[_0x2ddcd1(0x1fc)](_0x2ddcd1(0x1fb), _0x572747);
                }
                iTeXEQ[_0x2ddcd1(0x270)]();
              }
            }
          ),
          document["querySelector"](_0x1b8453(0x277))?.[_0x1b8453(0x255)][
            _0x1b8453(0x1f3)
          ]("itex_area_hidden"),
          iTeXEQ["recoverynew_no_click"](_0x44080a),
          (document[_0x1b8453(0x257)](_0x1b8453(0x230))[_0x1b8453(0x250)][
            _0x1b8453(0x274)
          ] = _0x1b8453(0x228));
      }
    });
}
window[_0x32e5ed(0x251)] = function () {
  const _0x34884b = _0x32e5ed,
    _0x2df27e = document[_0x34884b(0x272)](".itex_hml_convert_view")[
      _0x34884b(0x224)
    ](!![]);
  if (!_0x2df27e[_0x34884b(0x26d)]()) {
    alert(_0x34884b(0x240));
    return;
  }
  const _0x3f5c9b = tinymce[_0x34884b(0x27e)](_0x34884b(0x238))[
    _0x34884b(0x247)
  ]();
  if (_0x3f5c9b["trim"]() !== "") {
    const _0x231681 = confirm(
      "에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?"
    );
    if (!_0x231681) return;
  }
  if (_0x2df27e) {
    const _0x104a5d = _0x2df27e[_0x34884b(0x205)](_0x34884b(0x271)),
      _0x5ef47e = [];
    return (
      _0x104a5d[_0x34884b(0x1ff)]((_0x1e0420, _0x391849) => {
        const _0x48cf8a = _0x34884b,
          _0x40b656 = [];
        let _0x5bed62 = 0x1;
        const _0x161ef2 = _0x1e0420[_0x48cf8a(0x205)]("p");
        _0x161ef2["forEach"]((_0x267952) => {
          const _0x2f7b4e = _0x48cf8a,
            _0x364760 = _0x267952?.[_0x2f7b4e(0x255)];
          let _0x2483e2 = null;
          if (_0x364760["contains"](_0x2f7b4e(0x223)))
            _0x2483e2 = _0x2f7b4e(0x267);
          else {
            if (_0x364760[_0x2f7b4e(0x210)](_0x2f7b4e(0x243)))
              _0x2483e2 = _0x2f7b4e(0x216);
            else {
              if (_0x364760["contains"]("tag_exam"))
                _0x2483e2 = _0x2f7b4e(0x26a);
              else {
                if (_0x364760[_0x2f7b4e(0x210)](_0x2f7b4e(0x268)))
                  _0x2483e2 = "SMALL";
                else {
                  if (_0x364760[_0x2f7b4e(0x210)](_0x2f7b4e(0x27c)))
                    _0x2483e2 = _0x2f7b4e(0x213);
                  else {
                    if (_0x364760[_0x2f7b4e(0x210)]("tag_choices"))
                      _0x2483e2 = _0x2f7b4e(0x24b);
                    else {
                      if (_0x364760[_0x2f7b4e(0x210)](_0x2f7b4e(0x201)))
                        _0x2483e2 = "ANSWER";
                      else {
                        if (_0x364760[_0x2f7b4e(0x210)](_0x2f7b4e(0x211)))
                          _0x2483e2 = _0x2f7b4e(0x26f);
                        else {
                          if (_0x364760[_0x2f7b4e(0x210)](_0x2f7b4e(0x27f)))
                            _0x2483e2 = _0x2f7b4e(0x266);
                          else {
                            if (_0x364760[_0x2f7b4e(0x210)](_0x2f7b4e(0x252)))
                              _0x2483e2 = _0x2f7b4e(0x23d);
                            else {
                              if (_0x364760[_0x2f7b4e(0x210)](_0x2f7b4e(0x25d)))
                                _0x2483e2 = _0x2f7b4e(0x209);
                              else {
                                if (_0x364760["contains"](_0x2f7b4e(0x225)))
                                  _0x2483e2 = _0x2f7b4e(0x214);
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
          if (_0x2483e2) {
            let _0x93f20e = _0x267952["outerHTML"],
              _0xccb631 = _0x267952[_0x2f7b4e(0x21e)];
            while (
              _0xccb631 &&
              !_0xccb631[_0x2f7b4e(0x255)][_0x2f7b4e(0x210)](
                _0x2f7b4e(0x223)
              ) &&
              !_0xccb631[_0x2f7b4e(0x255)]["contains"](_0x2f7b4e(0x243)) &&
              !_0xccb631[_0x2f7b4e(0x255)]["contains"]("tag_exam") &&
              !_0xccb631["classList"][_0x2f7b4e(0x210)](_0x2f7b4e(0x268)) &&
              !_0xccb631["classList"][_0x2f7b4e(0x210)](_0x2f7b4e(0x27c)) &&
              !_0xccb631[_0x2f7b4e(0x255)][_0x2f7b4e(0x210)](
                _0x2f7b4e(0x25e)
              ) &&
              !_0xccb631["classList"][_0x2f7b4e(0x210)]("tl_answer") &&
              !_0xccb631[_0x2f7b4e(0x255)][_0x2f7b4e(0x210)](
                _0x2f7b4e(0x211)
              ) &&
              !_0xccb631[_0x2f7b4e(0x255)][_0x2f7b4e(0x210)](
                _0x2f7b4e(0x27f)
              ) &&
              !_0xccb631["classList"][_0x2f7b4e(0x210)]("tag_concept") &&
              !_0xccb631["classList"][_0x2f7b4e(0x210)](_0x2f7b4e(0x25d)) &&
              !_0xccb631[_0x2f7b4e(0x255)][_0x2f7b4e(0x210)]("tag_tip")
            ) {
              (_0x93f20e += _0xccb631["outerHTML"]),
                (_0xccb631 = _0xccb631["nextElementSibling"]);
            }
            _0x40b656[_0x2f7b4e(0x263)]({
              type: _0x2483e2,
              content: _0x93f20e,
              sort: _0x5bed62++,
            });
          }
        }),
          _0x5ef47e[_0x48cf8a(0x263)]({ id: null, quizItemList: _0x40b656 });
      }),
      tinymce[_0x34884b(0x27e)](_0x34884b(0x238))[_0x34884b(0x264)](""),
      _0x5ef47e
    );
  } else return console[_0x34884b(0x22f)](_0x34884b(0x282)), null;
};
function processHmlData(_0x5597af) {
  const _0x48f8f6 = _0x32e5ed,
    _0x3a064c = [],
    _0x17f102 = Array[_0x48f8f6(0x1f9)](_0x5597af[_0x48f8f6(0x205)]("p"));
  let _0x1946c3 = [],
    _0x477f5e = ![];
  return (
    _0x17f102[_0x48f8f6(0x1ff)]((_0xb50516) => {
      const _0x36ea15 = _0x48f8f6;
      divideKey[_0x36ea15(0x232)](_0xb50516[_0x36ea15(0x21f)])
        ? (_0x1946c3["length"] > 0x0 &&
            (_0x3a064c[_0x36ea15(0x263)](
              _0x1946c3[_0x36ea15(0x23e)](
                (_0x4d5348) => _0x4d5348[_0x36ea15(0x234)]
              )["join"]("")
            ),
            (_0x1946c3 = [])),
          _0x1946c3[_0x36ea15(0x263)](_0xb50516))
        : _0x1946c3[_0x36ea15(0x263)](_0xb50516);
    }),
    _0x1946c3[_0x48f8f6(0x242)] > 0x0 &&
      _0x3a064c[_0x48f8f6(0x263)](
        _0x1946c3[_0x48f8f6(0x23e)]((_0x2fff46) => _0x2fff46["outerHTML"])[
          _0x48f8f6(0x269)
        ]("")
      ),
    _0x3a064c
  );
}
window["addEventListener"](_0x32e5ed(0x273), (_0x6d02b3) => {
  const _0x5162cf = _0x32e5ed,
    { functionName: _0x3c2936, args: _0x5df07a } = _0x6d02b3[_0x5162cf(0x26b)];
  _0x3c2936 === _0x5162cf(0x20a) &&
    typeof window[_0x3c2936] === _0x5162cf(0x276) &&
    window[_0x3c2936](_0x5df07a[0x0]),
    _0x3c2936 === _0x5162cf(0x1f4) &&
      typeof window[_0x3c2936] === _0x5162cf(0x276) &&
      window[_0x3c2936](_0x5df07a[0x0]),
    _0x3c2936 === _0x5162cf(0x233) &&
      typeof window[_0x3c2936] === "function" &&
      window[_0x3c2936](_0x5df07a[0x0]),
    _0x3c2936 === _0x5162cf(0x23c) &&
      typeof window[_0x3c2936] === "function" &&
      window[_0x3c2936](_0x5df07a[0x0]);
});
function _0x2fea(_0x5157e3, _0x2799f0) {
  const _0x373b1d = _0x373b();
  return (
    (_0x2fea = function (_0x2fea55, _0x350475) {
      _0x2fea55 = _0x2fea55 - 0x1f1;
      let _0x2a15ea = _0x373b1d[_0x2fea55];
      return _0x2a15ea;
    }),
    _0x2fea(_0x5157e3, _0x2799f0)
  );
}
function iTeX_hml_tag_parser(_0x4dfdfb) {
  const _0x2df5c6 = _0x32e5ed,
    _0x9e29b0 = new DOMParser(),
    _0x304d84 = _0x9e29b0[_0x2df5c6(0x278)](_0x4dfdfb, "text/html"),
    _0xde13ea = _0x304d84[_0x2df5c6(0x205)]("p"),
    _0x25de6a = {
      그룹: _0x2df5c6(0x226),
      대발문: "tag_bigcontent",
      지문: _0x2df5c6(0x243),
      문제: _0x2df5c6(0x222),
      소문제: _0x2df5c6(0x268),
      보기: _0x2df5c6(0x27c),
      선지: _0x2df5c6(0x25e),
      정답: _0x2df5c6(0x201),
      해설: _0x2df5c6(0x211),
      힌트: _0x2df5c6(0x27f),
      개념: _0x2df5c6(0x252),
      제목: _0x2df5c6(0x25d),
      팁: "tag_tip",
    };
  let _0x3639a2 = "",
    _0x3cdbc2 = null,
    _0x128deb = 0x0;
  return (
    _0xde13ea[_0x2df5c6(0x1ff)]((_0x752def) => {
      const _0x561eee = _0x2df5c6;
      _0x752def[_0x561eee(0x22c)]("style");
      let _0x106729 = _0x752def["textContent"]["trim"]();
      const _0x3265a7 = _0x106729["match"](/^\[(.*?)\]$/);
      if (_0x3265a7) {
        const _0x532d01 = _0x3265a7[0x1][_0x561eee(0x1fd)](/\s+/g, "");
        _0x532d01 in _0x25de6a &&
          (_0x752def?.[_0x561eee(0x255)][_0x561eee(0x1f3)](
            _0x25de6a[_0x532d01]
          ),
          _0x752def[_0x561eee(0x1f6)](_0x561eee(0x200), _0x561eee(0x20d)),
          _0x25de6a[_0x532d01] === _0x561eee(0x226) &&
            (_0x3cdbc2 && (_0x3639a2 += _0x3cdbc2[_0x561eee(0x234)]),
            (_0x3cdbc2 = document[_0x561eee(0x1fe)](_0x561eee(0x254))),
            _0x3cdbc2?.[_0x561eee(0x255)][_0x561eee(0x1f3)](_0x561eee(0x22d)),
            _0x3cdbc2[_0x561eee(0x1f6)]("id", _0x561eee(0x24c) + _0x128deb++)));
      }
      _0x3cdbc2 && _0x3cdbc2[_0x561eee(0x249)](_0x752def);
    }),
    _0x3cdbc2 && (_0x3639a2 += _0x3cdbc2[_0x2df5c6(0x234)]),
    _0x3639a2
  );
}
