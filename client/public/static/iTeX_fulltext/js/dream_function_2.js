const _0x5c2b81 = _0x2eb9;
(function (_0x54b789, _0x31f012) {
  const _0xd0f949 = _0x2eb9,
    _0x4cbd0a = _0x54b789();
  while (!![]) {
    try {
      const _0x28824f =
        (-parseInt(_0xd0f949(0x1f8)) / 0x1) *
          (parseInt(_0xd0f949(0x20f)) / 0x2) +
        -parseInt(_0xd0f949(0x204)) / 0x3 +
        (parseInt(_0xd0f949(0x22a)) / 0x4) *
          (-parseInt(_0xd0f949(0x228)) / 0x5) +
        -parseInt(_0xd0f949(0x1d1)) / 0x6 +
        parseInt(_0xd0f949(0x20e)) / 0x7 +
        (parseInt(_0xd0f949(0x1e8)) / 0x8) *
          (parseInt(_0xd0f949(0x203)) / 0x9) +
        (parseInt(_0xd0f949(0x212)) / 0xa) * (parseInt(_0xd0f949(0x206)) / 0xb);
      if (_0x28824f === _0x31f012) break;
      else _0x4cbd0a["push"](_0x4cbd0a["shift"]());
    } catch (_0x126e03) {
      _0x4cbd0a["push"](_0x4cbd0a["shift"]());
    }
  }
})(_0x5c7a, 0x2c04a);
function _0x2eb9(_0x3dec31, _0xa12e1) {
  const _0x5c7a1c = _0x5c7a();
  return (
    (_0x2eb9 = function (_0x2eb9f9, _0x2091dc) {
      _0x2eb9f9 = _0x2eb9f9 - 0x1c9;
      let _0xd21253 = _0x5c7a1c[_0x2eb9f9];
      return _0xd21253;
    }),
    _0x2eb9(_0x3dec31, _0xa12e1)
  );
}
function _0x5c7a() {
  const _0x25aa3c = [
    "tag_exam",
    "template",
    "/hml_image",
    "createElement",
    "name",
    "closest",
    "querySelectorAll",
    "recoverynew_no_click",
    "onreadystatechange",
    "append",
    "data",
    "74GLvENR",
    "tag_commentary",
    "tag_hint",
    "join",
    "image.png",
    "map",
    "imgUUID",
    "setContent",
    "div",
    "log",
    "block",
    "3204SnxeUy",
    "668307PRYdvj",
    "get",
    "440JkBdbK",
    "innerHTML",
    "setAttribute",
    "false",
    "match",
    "blob",
    "readyState",
    "tag_exam_sm",
    "1004696HnLSjb",
    "2522eoMCMp",
    "Error\x20uploading\x20image",
    "add",
    "105390jJNzEA",
    "getAttribute",
    "send",
    "Error\x20in\x20math\x20render:",
    "parse",
    "text/html",
    "content",
    ".itex_hml_convert_view",
    "json",
    "contenteditable",
    "appendChild",
    "getElementById",
    "function",
    "outerHTML",
    "getContent",
    "tinyeditor",
    "#exam_save",
    "tag_concept",
    "img_save_type",
    "parseFromString",
    "modal_block",
    "/qnapi_dream/hml_upload",
    "1724435GJRPts",
    "replace",
    "4GLRSgB",
    "style",
    "tag_example",
    "includes",
    "exam_box",
    "from",
    "responseText",
    "file_name",
    "src",
    "img",
    "removeAttribute",
    "open",
    "file",
    "190560TaaGQq",
    "querySelector",
    "변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.",
    "substring",
    "itexdata",
    ".exam_box",
    "/uploadImage",
    "POST",
    "error",
    "target",
    "수정할\x20요소가\x20선택되지\x20않았습니다.",
    "tag_tip",
    "classList",
    "display",
    "tag_group",
    "textContent",
    "length",
    "forEach",
    "push",
    "tl_answer",
    "trim",
    "className",
    "exam_box_",
    "6920FAhoss",
    ".origin_img_area",
    "getExamCodenum",
    "Editor\x20not\x20found",
    "tag_content",
  ];
  _0x5c7a = function () {
    return _0x25aa3c;
  };
  return _0x5c7a();
}
const examSave = document[_0x5c2b81(0x1d2)](_0x5c2b81(0x222));
async function uploadImageToServer(_0x31a249, _0x28703a) {
  const _0x356763 = _0x5c2b81,
    _0x34e2dd = new FormData(),
    _0x5b50ce = await fetch(_0x28703a),
    _0x4d3855 = await _0x5b50ce[_0x356763(0x20b)]();
  _0x34e2dd["append"]("file", _0x4d3855, _0x356763(0x1fc)),
    _0x34e2dd[_0x356763(0x1f6)](_0x356763(0x224), _0x31a249);
  const _0x33f260 = await fetch(dream_server_url + _0x356763(0x1d7), {
    method: _0x356763(0x1d8),
    body: _0x34e2dd,
  });
  if (!_0x33f260["ok"]) throw new Error(_0x356763(0x210));
  const _0x32be36 = await _0x33f260[_0x356763(0x21a)]();
  return _0x32be36[_0x356763(0x1fe)];
}
function clearEditorContent() {
  const _0x1e7b10 = _0x5c2b81,
    _0x17568f = tinymce[_0x1e7b10(0x205)]("tinyeditor");
  _0x17568f
    ? _0x17568f[_0x1e7b10(0x1ff)]("")
    : console["error"](_0x1e7b10(0x1eb));
}
function hml_upload(_0x253321) {
  const _0x2e7e1f = _0x5c2b81;
  var _0x5e0beb = new FormData();
  _0x5e0beb[_0x2e7e1f(0x1f6)](_0x2e7e1f(0x1cb), _0x253321[_0x2e7e1f(0x1f1)]),
    _0x5e0beb[_0x2e7e1f(0x1f6)]("file", _0x253321);
  var _0x2a5d35 = new XMLHttpRequest();
  _0x2a5d35["open"]("POST", dream_server_url + _0x2e7e1f(0x227), !![]),
    _0x2a5d35[_0x2e7e1f(0x214)](_0x5e0beb),
    (_0x2a5d35[_0x2e7e1f(0x1f5)] = function () {
      const _0x680b65 = _0x2e7e1f;
      if (_0x2a5d35[_0x680b65(0x20c)] == 0x4 && _0x2a5d35["status"] == 0xc8) {
        const _0x81abea = document[_0x680b65(0x1d2)](_0x680b65(0x219));
        var _0x27ef4f = JSON["parse"](_0x2a5d35["responseText"]);
        (_0x81abea[_0x680b65(0x207)] = _0x27ef4f[_0x680b65(0x1d5)]),
          document[_0x680b65(0x1d2)](".origin_img_area")?.[_0x680b65(0x1dd)][
            _0x680b65(0x211)
          ]("itex_area_hidden"),
          iTeXEQ[_0x680b65(0x1f4)](_0x81abea),
          (document[_0x680b65(0x21d)](_0x680b65(0x226))[_0x680b65(0x22b)][
            "display"
          ] = "none"),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
let lastClickedBoxId = null,
  currentEditorContent = "";
function htmlStringToNode(_0x470aa8) {
  const _0x156cf7 = _0x5c2b81;
  var _0x2ef917 = document[_0x156cf7(0x1f0)](_0x156cf7(0x1ee));
  return (_0x2ef917[_0x156cf7(0x207)] = _0x470aa8), _0x2ef917[_0x156cf7(0x218)];
}
async function hml_edit_finish() {
  const _0x3e76d7 = _0x5c2b81;
  if (!lastClickedBoxId) {
    console["error"](_0x3e76d7(0x1db));
    return;
  }
  const _0x6de8f4 = tinymce["get"](_0x3e76d7(0x221))[_0x3e76d7(0x220)](),
    _0x57229f = document[_0x3e76d7(0x1d2)](".itex_hml_convert_view"),
    _0x4fbef3 = document[_0x3e76d7(0x21d)](lastClickedBoxId);
  if (_0x4fbef3) {
    const _0x59fcf8 = htmlStringToNode(_0x6de8f4);
    try {
      const _0x298896 = await iTeXDBW_mathrender_hml(_0x59fcf8),
        _0x24d9d6 = document[_0x3e76d7(0x1f0)](_0x3e76d7(0x200));
      _0x24d9d6[_0x3e76d7(0x21c)](_0x298896),
        (_0x4fbef3[_0x3e76d7(0x21f)] = _0x24d9d6[_0x3e76d7(0x207)]),
        iTeXEQ[_0x3e76d7(0x1f4)](_0x57229f),
        tinymce[_0x3e76d7(0x205)]("tinyeditor")[_0x3e76d7(0x1ff)](""),
        (lastClickedBoxId = null),
        (currentEditorContent = "");
    } catch (_0x2ea6e9) {
      console[_0x3e76d7(0x1d9)](_0x3e76d7(0x215), _0x2ea6e9);
    }
  } else console[_0x3e76d7(0x1d9)]("원래\x20자리를\x20찾을\x20수\x20없습니다.");
}
async function hml_upload_frame(_0x206418) {
  const _0x396ec5 = _0x5c2b81;
  document[_0x396ec5(0x21d)]("modal_block")[_0x396ec5(0x22b)][
    _0x396ec5(0x1de)
  ] = _0x396ec5(0x202);
  var _0x446d46 = new FormData();
  _0x446d46[_0x396ec5(0x1f6)](_0x396ec5(0x1cb), _0x206418[_0x396ec5(0x1f1)]),
    _0x446d46[_0x396ec5(0x1f6)](_0x396ec5(0x1d0), _0x206418);
  var _0x281c2b = new XMLHttpRequest();
  _0x281c2b[_0x396ec5(0x1cf)](
    _0x396ec5(0x1d8),
    dream_server_url + _0x396ec5(0x227),
    !![]
  ),
    _0x281c2b[_0x396ec5(0x214)](_0x446d46),
    (_0x281c2b[_0x396ec5(0x1f5)] = async function () {
      const _0x57caac = _0x396ec5;
      if (_0x281c2b["readyState"] == 0x4 && _0x281c2b["status"] == 0xc8) {
        const _0x53f403 = document[_0x57caac(0x1d2)](_0x57caac(0x219));
        var _0x16b299 = JSON[_0x57caac(0x216)](_0x281c2b[_0x57caac(0x1ca)]);
        const _0x55304e = iTeX_hml_tag_parser(_0x16b299[_0x57caac(0x1d5)]);
        console[_0x57caac(0x201)](_0x55304e),
          (_0x53f403[_0x57caac(0x207)] = _0x55304e),
          _0x53f403["addEventListener"]("click", async function (_0x427669) {
            const _0x271e65 = _0x57caac;
            if (_0x427669[_0x271e65(0x1da)]["closest"](".exam_box")) {
              const _0x3bb388 = _0x427669[_0x271e65(0x1da)][_0x271e65(0x1f2)](
                  _0x271e65(0x1d6)
                ),
                _0x217156 = _0x3bb388[_0x271e65(0x213)]("id");
              lastClickedBoxId &&
                tinymce[_0x271e65(0x205)]("tinyeditor")[_0x271e65(0x220)]() !==
                  currentEditorContent &&
                confirm(_0x271e65(0x1d3)) &&
                (await hml_edit_finish());
              const _0x50b42d = htmlStringToNode(_0x3bb388[_0x271e65(0x21f)]);
              lastClickedBoxId = _0x217156;
              try {
                const _0x2872fa = await iTeXDBW_mathrender_hml(_0x50b42d),
                  _0x5109a9 = document[_0x271e65(0x1f0)](_0x271e65(0x200));
                _0x5109a9[_0x271e65(0x21c)](_0x2872fa),
                  tinymce["get"](_0x271e65(0x221))[_0x271e65(0x1ff)](
                    _0x5109a9["innerHTML"]
                  ),
                  (currentEditorContent = _0x5109a9[_0x271e65(0x207)]);
              } catch (_0x1d588f) {
                console[_0x271e65(0x1d9)](_0x271e65(0x215), _0x1d588f);
              }
              iTeXEQ["recoverynew"]();
            }
          }),
          document[_0x57caac(0x1d2)](_0x57caac(0x1e9))?.[_0x57caac(0x1dd)][
            _0x57caac(0x211)
          ]("itex_area_hidden"),
          iTeXEQ[_0x57caac(0x1f4)](_0x53f403),
          (document[_0x57caac(0x21d)](_0x57caac(0x226))["style"]["display"] =
            "none");
      }
    });
}
function processHmlData(_0x3bbc1e) {
  const _0x10aa71 = _0x5c2b81,
    _0x1f3211 = [],
    _0x5ac4e9 = Array[_0x10aa71(0x1c9)](_0x3bbc1e["querySelectorAll"]("p"));
  let _0x51ec5e = [],
    _0x4d6e24 = ![];
  return (
    _0x5ac4e9[_0x10aa71(0x1e2)]((_0x1fc191) => {
      const _0x4b7930 = _0x10aa71;
      divideKey[_0x4b7930(0x22d)](_0x1fc191[_0x4b7930(0x1e6)])
        ? (_0x51ec5e["length"] > 0x0 &&
            (_0x1f3211[_0x4b7930(0x1e3)](
              _0x51ec5e[_0x4b7930(0x1fd)](
                (_0x1dba4a) => _0x1dba4a[_0x4b7930(0x21f)]
              )[_0x4b7930(0x1fb)]("")
            ),
            (_0x51ec5e = [])),
          _0x51ec5e[_0x4b7930(0x1e3)](_0x1fc191))
        : _0x51ec5e[_0x4b7930(0x1e3)](_0x1fc191);
    }),
    _0x51ec5e[_0x10aa71(0x1e1)] > 0x0 &&
      _0x1f3211[_0x10aa71(0x1e3)](
        _0x51ec5e[_0x10aa71(0x1fd)]((_0x1a5781) => _0x1a5781[_0x10aa71(0x21f)])[
          _0x10aa71(0x1fb)
        ]("")
      ),
    _0x1f3211
  );
}
window["addEventListener"]("message", (_0x191af0) => {
  const _0x1cd75a = _0x5c2b81,
    { functionName: _0x27c36b, args: _0x195cf0 } = _0x191af0[_0x1cd75a(0x1f7)];
  _0x27c36b === "setExamData" &&
    typeof window[_0x27c36b] === "function" &&
    window[_0x27c36b](_0x195cf0[0x0]),
    _0x27c36b === "setExamList" &&
      typeof window[_0x27c36b] === "function" &&
      window[_0x27c36b](_0x195cf0[0x0]),
    _0x27c36b === _0x1cd75a(0x1ea) &&
      typeof window[_0x27c36b] === "function" &&
      window[_0x27c36b](_0x195cf0[0x0]),
    _0x27c36b === "saveExamData" &&
      typeof window[_0x27c36b] === _0x1cd75a(0x21e) &&
      window[_0x27c36b](_0x195cf0[0x0]);
});
function iTeX_hml_tag_parser(_0x3bfc0c) {
  const _0x508eec = _0x5c2b81,
    _0x46d905 = new DOMParser(),
    _0x3538ea = _0x46d905[_0x508eec(0x225)](_0x3bfc0c, _0x508eec(0x217)),
    _0x38980c = _0x3538ea["querySelectorAll"]("p"),
    _0x40acc4 = {
      그룹: _0x508eec(0x1df),
      대발문: "tag_bigcontent",
      지문: _0x508eec(0x1ec),
      문제: _0x508eec(0x1ed),
      소문제: _0x508eec(0x20d),
      보기: _0x508eec(0x22c),
      선지: "tag_choices",
      정답: _0x508eec(0x1e4),
      해설: _0x508eec(0x1f9),
      힌트: _0x508eec(0x1fa),
      개념: _0x508eec(0x223),
      제목: "tag_title",
      팁: _0x508eec(0x1dc),
    };
  let _0x37516e = "",
    _0x25bad8 = null,
    _0x7d0c9f = 0x0;
  return (
    _0x38980c["forEach"]((_0x444a0b) => {
      const _0x4870a7 = _0x508eec;
      _0x444a0b[_0x4870a7(0x1ce)]("style");
      const _0x44406b = _0x444a0b[_0x4870a7(0x1f3)](_0x4870a7(0x1cd));
      _0x44406b[_0x4870a7(0x1e2)]((_0x932388) => {
        const _0x24d1d6 = _0x4870a7,
          _0x2f6960 = _0x932388[_0x24d1d6(0x213)](_0x24d1d6(0x1cc)),
          _0x4b648d =
            "" +
            uploaded_img_url +
            _0x2f6960[_0x24d1d6(0x1d4)](_0x2f6960["indexOf"](_0x24d1d6(0x1ef)));
        _0x932388[_0x24d1d6(0x208)](_0x24d1d6(0x1cc), _0x4b648d);
      });
      let _0x251374 = _0x444a0b[_0x4870a7(0x1e0)][_0x4870a7(0x1e5)]();
      const _0x2c6c10 = _0x251374[_0x4870a7(0x20a)](/^\[(.*?)\]$/);
      if (_0x2c6c10) {
        const _0x3a1bbc = _0x2c6c10[0x1][_0x4870a7(0x229)](/\s+/g, "");
        _0x3a1bbc in _0x40acc4 &&
          (_0x444a0b?.["classList"][_0x4870a7(0x211)](_0x40acc4[_0x3a1bbc]),
          _0x444a0b["setAttribute"](_0x4870a7(0x21b), _0x4870a7(0x209)),
          _0x40acc4[_0x3a1bbc] === _0x4870a7(0x1df) &&
            (_0x25bad8 && (_0x37516e += _0x25bad8[_0x4870a7(0x21f)]),
            (_0x25bad8 = document[_0x4870a7(0x1f0)]("div")),
            _0x25bad8?.[_0x4870a7(0x1dd)][_0x4870a7(0x211)](_0x4870a7(0x22e)),
            _0x25bad8["setAttribute"]("id", _0x4870a7(0x1e7) + _0x7d0c9f++)));
      }
      _0x25bad8 && _0x25bad8["appendChild"](_0x444a0b);
    }),
    _0x25bad8 && (_0x37516e += _0x25bad8[_0x508eec(0x21f)]),
    _0x37516e
  );
}
