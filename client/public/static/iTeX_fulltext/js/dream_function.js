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
const _0x4ed671 = _0x1fa0;
(function (_0x492f41, _0x11bff2) {
  const _0x4f0a4b = _0x1fa0,
    _0x3f150c = _0x492f41();
  while (!![]) {
    try {
      const _0x83790c =
        (parseInt(_0x4f0a4b(0x202)) / 0x1) *
          (parseInt(_0x4f0a4b(0x216)) / 0x2) +
        parseInt(_0x4f0a4b(0x267)) / 0x3 +
        -parseInt(_0x4f0a4b(0x225)) / 0x4 +
        parseInt(_0x4f0a4b(0x22e)) / 0x5 +
        (parseInt(_0x4f0a4b(0x21c)) / 0x6) *
          (-parseInt(_0x4f0a4b(0x1fb)) / 0x7) +
        parseInt(_0x4f0a4b(0x241)) / 0x8 +
        (-parseInt(_0x4f0a4b(0x211)) / 0x9) *
          (parseInt(_0x4f0a4b(0x210)) / 0xa);
      if (_0x83790c === _0x11bff2) break;
      else _0x3f150c["push"](_0x3f150c["shift"]());
    } catch (_0x557a8c) {
      _0x3f150c["push"](_0x3f150c["shift"]());
    }
  }
})(_0x2ef4, 0xb2490),
  (window["openEQ"] = (_0x4af378) => {
    const _0x2778cf = _0x1fa0,
      _0x596bfd = document[_0x2778cf(0x24a)](iTeXEQ["editor_container"]);
    function _0x5b7852() {
      const _0x554aa3 = _0x2778cf;
      (onlyEQ = !![]),
        (onlyEQNode = _0x4af378),
        _0x596bfd?.[_0x554aa3(0x21f)]["remove"](_0x554aa3(0x261)),
        iTeXEQ[_0x554aa3(0x21a)]();
    }
    function _0x40368b() {
      const _0x4d6fd9 = _0x2778cf;
      (onlyEQ = ![]),
        (onlyEQNode = ""),
        _0x596bfd?.[_0x4d6fd9(0x21f)][_0x4d6fd9(0x206)]("display_inactive");
    }
    _0x596bfd?.["classList"][_0x2778cf(0x219)]("display_inactive")
      ? _0x5b7852()
      : _0x40368b();
  }),
  (window[_0x4ed671(0x224)] = function setExamData(_0x44266d) {
    const _0x479bc6 = _0x4ed671;
    try {
      const _0x2ea2d9 = tinymce[_0x479bc6(0x262)](_0x479bc6(0x1f6));
      return _0x2ea2d9
        ? (_0x2ea2d9[_0x479bc6(0x1f3)][_0x479bc6(0x1ed)](_0x44266d), !![])
        : (console["error"](_0x479bc6(0x25f)), ![]);
    } catch (_0x18f044) {
      return console[_0x479bc6(0x1f4)](_0x479bc6(0x268), _0x18f044), ![];
    }
  });
async function uploadImageToServer(_0x3d6d3e, _0x3a177e) {
  const _0xf0c3a6 = _0x4ed671,
    _0x14929b = new FormData();
  _0x14929b[_0xf0c3a6(0x260)](_0xf0c3a6(0x201), _0x3a177e),
    _0x14929b["append"]("img_save_type", _0x3d6d3e),
    _0x14929b[_0xf0c3a6(0x260)](_0xf0c3a6(0x1e3), dream_server_url);
  const _0x534bbe = await fetch(dream_server_url + _0xf0c3a6(0x20b), {
    method: _0xf0c3a6(0x22d),
    body: _0x14929b,
  });
  if (!_0x534bbe["ok"]) throw new Error("Error\x20uploading\x20image");
  const _0x3b288f = await _0x534bbe[_0xf0c3a6(0x250)]();
  return _0x3b288f[0x0];
}
function clearEditorContent() {
  const _0x36490d = _0x4ed671,
    _0x5606ef = tinymce["get"](_0x36490d(0x1f6));
  _0x5606ef
    ? _0x5606ef[_0x36490d(0x1ed)]("")
    : console[_0x36490d(0x1f4)](_0x36490d(0x227));
}
window[_0x4ed671(0x239)] = async function () {
  const _0x5cbe24 = _0x4ed671;
  try {
    const _0x3a1767 =
        tinymce["activeEditor"]["contentWindow"][_0x5cbe24(0x242)] ||
        tinymce["activeEditor"][_0x5cbe24(0x1ee)][_0x5cbe24(0x242)],
      _0x3315b1 = iTeXEQ[_0x5cbe24(0x20f)](_0x3a1767[_0x5cbe24(0x200)]("body"));
    if (!_0x3315b1)
      return (
        console["error"](
          "No\x20data\x20found\x20in\x20the\x20parsed\x20document."
        ),
        ![]
      );
    const _0x459e52 = [
        _0x5cbe24(0x1e7),
        _0x5cbe24(0x25e),
        _0x5cbe24(0x1ef),
        _0x5cbe24(0x272),
        "tag_example",
        _0x5cbe24(0x21e),
        _0x5cbe24(0x252),
        _0x5cbe24(0x217),
        "tag_hint",
        "tag_concept",
        _0x5cbe24(0x253),
        "tag_tip",
      ],
      _0x253848 = _0x3315b1[_0x5cbe24(0x265)]("p");
    if (_0x253848["length"] > 0x0) {
      const _0x3a3efc = _0x253848[0x0][_0x5cbe24(0x200)](_0x5cbe24(0x263)),
        _0x56a526 = Array[_0x5cbe24(0x1fc)](_0x253848[0x0]?.[_0x5cbe24(0x21f)])[
          _0x5cbe24(0x26a)
        ]((_0xc9e3c5) => _0x459e52["includes"](_0xc9e3c5)),
        _0x122087 = Array[_0x5cbe24(0x1fc)](_0x253848)[_0x5cbe24(0x26a)](
          (_0x351172) =>
            _0x351172?.[_0x5cbe24(0x21f)][_0x5cbe24(0x219)](_0x5cbe24(0x1ef)) ||
            _0x351172?.[_0x5cbe24(0x21f)]["contains"]("tag_bigcontent") ||
            _0x351172?.[_0x5cbe24(0x21f)]["contains"](_0x5cbe24(0x25e))
        ),
        _0x186095 = Array["from"](_0x253848)[_0x5cbe24(0x26a)]((_0x4ad15a) =>
          _0x4ad15a?.[_0x5cbe24(0x21f)][_0x5cbe24(0x219)](_0x5cbe24(0x22b))
        );
      if (_0x3a3efc) return alert(_0x5cbe24(0x1e0)), ![];
      if (!_0x56a526)
        return alert(_0x5cbe24(0x231)), iTeXEQ[_0x5cbe24(0x234)](), ![];
      if (!_0x122087) return alert(_0x5cbe24(0x212)), ![];
    } else
      return (
        alert("No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document."),
        ![]
      );
    const _0x18293a = _0x3315b1["querySelectorAll"](_0x5cbe24(0x248)),
      _0x3b0e64 = Array["from"](_0x18293a)[_0x5cbe24(0x1e6)](
        (_0x2ba662) => _0x2ba662[_0x5cbe24(0x1df)]
      );
    try {
      const _0xfb8eff = await uploadImageToServer(img_save_type, _0x3b0e64);
      console[_0x5cbe24(0x20a)]("uploadResults:\x20", _0xfb8eff);
      if (_0xfb8eff[_0x5cbe24(0x24e)]) {
        const _0x4d6586 = _0xfb8eff["imgURL"][_0x5cbe24(0x254)](",");
        _0x18293a[_0x5cbe24(0x25d)]((_0x303270, _0x50c832) => {
          const _0x4a8ec0 = _0x5cbe24;
          _0x4d6586[_0x50c832] &&
            _0x303270[_0x4a8ec0(0x240)](_0x4a8ec0(0x1df), _0x4d6586[_0x50c832]),
            _0x303270[_0x4a8ec0(0x233)](_0x4a8ec0(0x222));
        });
      }
    } catch (_0x361ad4) {
      console[_0x5cbe24(0x1f4)](_0x5cbe24(0x1f9), _0x361ad4);
    }
    const _0x508258 = _0x3315b1[_0x5cbe24(0x228)],
      _0x2edf44 = {
        tag_group: _0x508258,
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
      _0x258323 = new DOMParser(),
      _0x4a9072 = _0x258323["parseFromString"](_0x508258, _0x5cbe24(0x22a));
    let _0x43550d = null,
      _0x15b5b5 = "";
    if (!_0x4a9072[_0x5cbe24(0x1ea)])
      return console[_0x5cbe24(0x1f4)](_0x5cbe24(0x1f1)), ![];
    const _0x5eab1a = (_0x38d290, _0x5d03d3) => {
      const _0x4bd89c = _0x5cbe24;
      Array["isArray"](_0x2edf44[_0x38d290]) &&
        _0x2edf44[_0x38d290][_0x4bd89c(0x237)](_0x5d03d3);
    };
    Array["from"](_0x4a9072[_0x5cbe24(0x1ea)]["childNodes"])[_0x5cbe24(0x25d)](
      (_0x38bd4e) => {
        const _0x55344f = _0x5cbe24;
        if (_0x38bd4e["nodeType"] === Node[_0x55344f(0x259)]) {
          const _0x10acd0 = Array["from"](_0x38bd4e?.[_0x55344f(0x21f)]),
            _0x3bf106 = _0x10acd0[_0x55344f(0x26a)]((_0x4a718c) =>
              _0x459e52["includes"](_0x4a718c)
            );
          if (_0x3bf106)
            _0x43550d && _0x5eab1a(_0x43550d, _0x15b5b5),
              (_0x43550d = _0x3bf106),
              (_0x15b5b5 = _0x38bd4e[_0x55344f(0x214)]);
          else _0x43550d && (_0x15b5b5 += _0x38bd4e[_0x55344f(0x214)]);
        }
      }
    );
    _0x43550d && _0x5eab1a(_0x43550d, _0x15b5b5);
    const _0x41dc6f = JSON[_0x5cbe24(0x1e4)](_0x2edf44, null, 0x2);
    return iTeXEQ["latexrecovery"](), clearEditorContent(), _0x41dc6f;
  } catch (_0x34dc0a) {
    return console[_0x5cbe24(0x1f4)](_0x5cbe24(0x20d), _0x34dc0a), ![];
  }
};
function hml_upload(_0x24ec68) {
  const _0x3bb672 = _0x4ed671;
  var _0x2a7146 = new FormData();
  _0x2a7146[_0x3bb672(0x260)](_0x3bb672(0x24d), _0x24ec68[_0x3bb672(0x23b)]),
    _0x2a7146[_0x3bb672(0x260)](_0x3bb672(0x1f8), _0x24ec68),
    _0x2a7146[_0x3bb672(0x260)](_0x3bb672(0x26f), img_save_type),
    _0x2a7146[_0x3bb672(0x260)](_0x3bb672(0x1e3), dream_server_url);
  var _0x486a36 = new XMLHttpRequest();
  _0x486a36[_0x3bb672(0x249)](
    _0x3bb672(0x22d),
    dream_server_url + _0x3bb672(0x205),
    !![]
  ),
    _0x486a36[_0x3bb672(0x236)](_0x2a7146),
    (_0x486a36[_0x3bb672(0x209)] = function () {
      const _0x1c33a4 = _0x3bb672;
      if (
        _0x486a36[_0x1c33a4(0x1f2)] == 0x4 &&
        _0x486a36[_0x1c33a4(0x1e9)] == 0xc8
      ) {
        const _0xdb124b = document[_0x1c33a4(0x200)](".itex_hml_convert_view");
        var _0x1e247c = JSON["parse"](_0x486a36[_0x1c33a4(0x244)]);
        (_0xdb124b[_0x1c33a4(0x228)] = _0x1e247c[_0x1c33a4(0x23f)]),
          document["querySelector"](_0x1c33a4(0x23d))?.[_0x1c33a4(0x21f)][
            _0x1c33a4(0x206)
          ](_0x1c33a4(0x1f5)),
          iTeXEQ[_0x1c33a4(0x1ff)](_0xdb124b),
          (document[_0x1c33a4(0x24a)](_0x1c33a4(0x203))["style"][
            _0x1c33a4(0x215)
          ] = "none"),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
let lastClickedBoxId = null,
  currentEditorContent = "";
function htmlStringToNode(_0x20f54e) {
  const _0x4ab5fd = _0x4ed671;
  var _0x4ac412 = document[_0x4ab5fd(0x1ec)](_0x4ab5fd(0x25a));
  return (_0x4ac412[_0x4ab5fd(0x228)] = _0x20f54e), _0x4ac412[_0x4ab5fd(0x24c)];
}
async function hml_edit_finish() {
  const _0xb787a0 = _0x4ed671;
  if (!lastClickedBoxId) {
    console[_0xb787a0(0x1f4)](_0xb787a0(0x269));
    return;
  }
  const _0x10c011 = tinymce[_0xb787a0(0x262)](_0xb787a0(0x1f6))[
      _0xb787a0(0x243)
    ](),
    _0x57842d = document[_0xb787a0(0x200)](_0xb787a0(0x207)),
    _0x5b0083 = document[_0xb787a0(0x24a)](lastClickedBoxId);
  if (_0x5b0083) {
    const _0x2dd63c = htmlStringToNode(_0x10c011);
    try {
      const _0xc0a296 = await iTeXDBW_mathrender_hml(_0x2dd63c),
        _0x3ff8a1 = document[_0xb787a0(0x1ec)]("div");
      _0x3ff8a1["appendChild"](_0xc0a296),
        (_0x5b0083["outerHTML"] = _0x3ff8a1[_0xb787a0(0x228)]),
        iTeXEQ[_0xb787a0(0x1ff)](_0x57842d),
        tinymce[_0xb787a0(0x262)](_0xb787a0(0x1f6))["setContent"](""),
        (lastClickedBoxId = null),
        (currentEditorContent = "");
    } catch (_0x50d06c) {
      console["error"](_0xb787a0(0x238), _0x50d06c);
    }
  } else console[_0xb787a0(0x1f4)]("원래\x20자리를\x20찾을\x20수\x20없습니다.");
}
async function hml_upload_frame(_0x4efec1) {
  const _0x2527f5 = _0x4ed671;
  document["getElementById"](_0x2527f5(0x203))[_0x2527f5(0x271)][
    _0x2527f5(0x215)
  ] = _0x2527f5(0x264);
  var _0x500924 = new FormData();
  _0x500924["append"]("file_name", _0x4efec1[_0x2527f5(0x23b)]),
    _0x500924[_0x2527f5(0x260)]("file", _0x4efec1),
    _0x500924[_0x2527f5(0x260)](_0x2527f5(0x26f), img_save_type),
    _0x500924[_0x2527f5(0x260)](_0x2527f5(0x1e3), dream_server_url);
  var _0x498bce = new XMLHttpRequest();
  _0x498bce[_0x2527f5(0x249)](
    "POST",
    dream_server_url + "/qnapi_dream/hml_upload",
    !![]
  ),
    _0x498bce["send"](_0x500924),
    (_0x498bce["onreadystatechange"] = async function () {
      const _0x12220f = _0x2527f5;
      if (_0x498bce[_0x12220f(0x1f2)] == 0x4 && _0x498bce["status"] == 0xc8) {
        const _0x21bdc8 = document[_0x12220f(0x200)](_0x12220f(0x207));
        var _0x2585ec = JSON[_0x12220f(0x229)](_0x498bce[_0x12220f(0x244)]);
        const _0x13a4dc = iTeX_hml_tag_parser(_0x2585ec[_0x12220f(0x23f)]);
        (_0x21bdc8[_0x12220f(0x228)] = _0x13a4dc),
          _0x21bdc8[_0x12220f(0x26b)](
            _0x12220f(0x255),
            async function (_0xb6a9ea) {
              const _0x112808 = _0x12220f;
              if (
                _0xb6a9ea[_0x112808(0x23c)][_0x112808(0x1eb)](_0x112808(0x257))
              ) {
                const _0x24cb32 = _0xb6a9ea[_0x112808(0x23c)][_0x112808(0x1eb)](
                    _0x112808(0x257)
                  ),
                  _0x4baf91 = _0x24cb32["getAttribute"]("id");
                lastClickedBoxId &&
                  tinymce[_0x112808(0x262)](_0x112808(0x1f6))[
                    "getContent"
                  ]() !== currentEditorContent &&
                  confirm(_0x112808(0x1fe)) &&
                  (await hml_edit_finish());
                const _0x44793f = htmlStringToNode(_0x24cb32[_0x112808(0x214)]);
                lastClickedBoxId = _0x4baf91;
                try {
                  const _0x1701f1 = await iTeXDBW_mathrender_hml(_0x44793f),
                    _0x4ba4fc = document[_0x112808(0x1ec)]("div");
                  _0x4ba4fc[_0x112808(0x245)](_0x1701f1),
                    tinymce[_0x112808(0x262)](_0x112808(0x1f6))[
                      _0x112808(0x1ed)
                    ](_0x4ba4fc[_0x112808(0x228)]),
                    (currentEditorContent = _0x4ba4fc[_0x112808(0x228)]);
                } catch (_0x3a5ca6) {
                  console[_0x112808(0x1f4)](_0x112808(0x238), _0x3a5ca6);
                }
                iTeXEQ[_0x112808(0x1fd)]();
              }
            }
          ),
          document[_0x12220f(0x200)](_0x12220f(0x23d))?.[_0x12220f(0x21f)][
            "add"
          ](_0x12220f(0x1f5)),
          iTeXEQ["recoverynew_no_click"](_0x21bdc8),
          (document["getElementById"]("modal_block")["style"][
            _0x12220f(0x215)
          ] = "none");
      }
    });
}
window["saveHmlData"] = async function () {
  const _0x344b31 = _0x4ed671,
    _0x3c3b9e = document[_0x344b31(0x200)](_0x344b31(0x207))[_0x344b31(0x23a)](
      !![]
    );
  if (!_0x3c3b9e[_0x344b31(0x204)]()) {
    alert(_0x344b31(0x26e));
    return;
  }
  const _0x53e4a9 = tinymce["get"](_0x344b31(0x1f6))["getContent"]();
  if (_0x53e4a9[_0x344b31(0x258)]() !== "") {
    const _0x4f5561 = confirm(
      "에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?"
    );
    if (!_0x4f5561) return;
  }
  if (_0x3c3b9e) {
    const _0x55e81a = _0x3c3b9e[_0x344b31(0x265)](_0x344b31(0x257)),
      _0x3d6b48 = [],
      _0x2edc56 = _0x3c3b9e["querySelectorAll"](_0x344b31(0x248)),
      _0x47cfa0 = Array[_0x344b31(0x1fc)](_0x2edc56)[_0x344b31(0x1e6)](
        (_0x23efc5) => _0x23efc5[_0x344b31(0x1df)]
      );
    try {
      const _0x416c7c = await uploadImageToServer(img_save_type, _0x47cfa0);
      console[_0x344b31(0x20a)](_0x344b31(0x21d), _0x416c7c);
      if (_0x416c7c[_0x344b31(0x24e)]) {
        const _0x4e2fb6 = _0x416c7c[_0x344b31(0x24e)][_0x344b31(0x254)](",");
        _0x2edc56[_0x344b31(0x25d)]((_0x4b6e5d, _0x2062a5) => {
          const _0x16e4d8 = _0x344b31;
          _0x4e2fb6[_0x2062a5] &&
            _0x4b6e5d[_0x16e4d8(0x240)]("src", _0x4e2fb6[_0x2062a5]),
            _0x4b6e5d[_0x16e4d8(0x233)]("data-mce-src");
        });
      }
    } catch (_0x7c0e20) {
      console["error"](_0x344b31(0x1f9), _0x7c0e20);
    }
    return (
      _0x55e81a["forEach"]((_0x202468, _0x4ec520) => {
        const _0x1257e7 = _0x344b31,
          _0x558182 = [];
        let _0x3dee76 = 0x1;
        const _0x31f81f = _0x202468[_0x1257e7(0x265)]("p");
        _0x31f81f[_0x1257e7(0x25d)]((_0x341de1) => {
          const _0x56a90e = _0x1257e7,
            _0x2eff2c = _0x341de1?.["classList"];
          let _0x58d6e0 = null;
          if (_0x2eff2c["contains"](_0x56a90e(0x1e7)))
            _0x58d6e0 = _0x56a90e(0x213);
          else {
            if (_0x2eff2c[_0x56a90e(0x219)](_0x56a90e(0x25e)))
              _0x58d6e0 = _0x56a90e(0x24f);
            else {
              if (_0x2eff2c["contains"](_0x56a90e(0x1ef)))
                _0x58d6e0 = _0x56a90e(0x235);
              else {
                if (_0x2eff2c["contains"](_0x56a90e(0x272)))
                  _0x58d6e0 = _0x56a90e(0x25c);
                else {
                  if (_0x2eff2c["contains"](_0x56a90e(0x25b)))
                    _0x58d6e0 = "EXAMPLE";
                  else {
                    if (_0x2eff2c["contains"](_0x56a90e(0x21e)))
                      _0x58d6e0 = _0x56a90e(0x232);
                    else {
                      if (_0x2eff2c[_0x56a90e(0x219)](_0x56a90e(0x252)))
                        _0x58d6e0 = _0x56a90e(0x208);
                      else {
                        if (_0x2eff2c["contains"](_0x56a90e(0x217)))
                          _0x58d6e0 = "COMMENTARY";
                        else {
                          if (_0x2eff2c[_0x56a90e(0x219)](_0x56a90e(0x24b)))
                            _0x58d6e0 = _0x56a90e(0x1e2);
                          else {
                            if (_0x2eff2c[_0x56a90e(0x219)](_0x56a90e(0x20e)))
                              _0x58d6e0 = _0x56a90e(0x218);
                            else {
                              if (_0x2eff2c[_0x56a90e(0x219)](_0x56a90e(0x253)))
                                _0x58d6e0 = _0x56a90e(0x20c);
                              else {
                                if (_0x2eff2c["contains"]("tag_tip"))
                                  _0x58d6e0 = _0x56a90e(0x266);
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
          if (_0x58d6e0) {
            let _0x51ad13 = _0x341de1[_0x56a90e(0x214)],
              _0x9088a = _0x341de1[_0x56a90e(0x270)];
            while (
              _0x9088a &&
              !_0x9088a[_0x56a90e(0x21f)][_0x56a90e(0x219)](_0x56a90e(0x1e7)) &&
              !_0x9088a[_0x56a90e(0x21f)][_0x56a90e(0x219)]("tag_content") &&
              !_0x9088a["classList"][_0x56a90e(0x219)]("tag_exam") &&
              !_0x9088a["classList"][_0x56a90e(0x219)]("tag_exam_sm") &&
              !_0x9088a["classList"]["contains"](_0x56a90e(0x25b)) &&
              !_0x9088a[_0x56a90e(0x21f)]["contains"](_0x56a90e(0x21e)) &&
              !_0x9088a[_0x56a90e(0x21f)]["contains"](_0x56a90e(0x252)) &&
              !_0x9088a[_0x56a90e(0x21f)][_0x56a90e(0x219)](_0x56a90e(0x217)) &&
              !_0x9088a[_0x56a90e(0x21f)][_0x56a90e(0x219)](_0x56a90e(0x24b)) &&
              !_0x9088a[_0x56a90e(0x21f)]["contains"](_0x56a90e(0x20e)) &&
              !_0x9088a["classList"][_0x56a90e(0x219)](_0x56a90e(0x253)) &&
              !_0x9088a[_0x56a90e(0x21f)][_0x56a90e(0x219)](_0x56a90e(0x21b))
            ) {
              (_0x51ad13 += _0x9088a[_0x56a90e(0x214)]),
                (_0x9088a = _0x9088a["nextElementSibling"]);
            }
            _0x558182[_0x56a90e(0x237)]({
              type: _0x58d6e0,
              content: _0x51ad13,
              sort: _0x3dee76++,
            });
          }
        }),
          _0x3d6b48["push"]({ id: null, quizItemList: _0x558182 });
      }),
      tinymce[_0x344b31(0x262)](_0x344b31(0x1f6))[_0x344b31(0x1ed)](""),
      _0x3d6b48
    );
  } else return console[_0x344b31(0x20a)](_0x344b31(0x23e)), null;
};
function processHmlData(_0x4b4f4a) {
  const _0x327be8 = _0x4ed671,
    _0x316cc4 = [],
    _0x16bf38 = Array[_0x327be8(0x1fc)](_0x4b4f4a["querySelectorAll"]("p"));
  let _0x110109 = [],
    _0x2bc0e6 = ![];
  return (
    _0x16bf38[_0x327be8(0x25d)]((_0x161352) => {
      const _0x12ca10 = _0x327be8;
      divideKey[_0x12ca10(0x256)](_0x161352[_0x12ca10(0x230)])
        ? (_0x110109[_0x12ca10(0x1e8)] > 0x0 &&
            (_0x316cc4[_0x12ca10(0x237)](
              _0x110109[_0x12ca10(0x1e6)](
                (_0x36bcfd) => _0x36bcfd[_0x12ca10(0x214)]
              )["join"]("")
            ),
            (_0x110109 = [])),
          _0x110109[_0x12ca10(0x237)](_0x161352))
        : _0x110109["push"](_0x161352);
    }),
    _0x110109[_0x327be8(0x1e8)] > 0x0 &&
      _0x316cc4[_0x327be8(0x237)](
        _0x110109[_0x327be8(0x1e6)]((_0x2902e5) => _0x2902e5[_0x327be8(0x214)])[
          _0x327be8(0x247)
        ]("")
      ),
    _0x316cc4
  );
}
window[_0x4ed671(0x26b)](_0x4ed671(0x1f7), (_0x3fb608) => {
  const _0x505d2a = _0x4ed671,
    { functionName: _0x15aa10, args: _0xb56267 } = _0x3fb608[_0x505d2a(0x26d)];
  _0x15aa10 === _0x505d2a(0x220) &&
    typeof window[_0x15aa10] === _0x505d2a(0x1f0) &&
    window[_0x15aa10](_0xb56267[0x0]),
    _0x15aa10 === _0x505d2a(0x246) &&
      typeof window[_0x15aa10] === "function" &&
      window[_0x15aa10](_0xb56267[0x0]),
    _0x15aa10 === _0x505d2a(0x251) &&
      typeof window[_0x15aa10] === "function" &&
      window[_0x15aa10](_0xb56267[0x0]),
    _0x15aa10 === "saveExamData" &&
      typeof window[_0x15aa10] === _0x505d2a(0x1f0) &&
      window[_0x15aa10](_0xb56267[0x0]);
});
function _0x1fa0(_0x21813e, _0x2fbb44) {
  const _0x2ef4fb = _0x2ef4();
  return (
    (_0x1fa0 = function (_0x1fa0c3, _0x265d9e) {
      _0x1fa0c3 = _0x1fa0c3 - 0x1df;
      let _0x836238 = _0x2ef4fb[_0x1fa0c3];
      return _0x836238;
    }),
    _0x1fa0(_0x21813e, _0x2fbb44)
  );
}
function iTeX_hml_tag_parser(_0x51b94a) {
  const _0x1e644b = _0x4ed671,
    _0x10220e = new DOMParser(),
    _0x576627 = _0x10220e["parseFromString"](_0x51b94a, "text/html"),
    _0x3da84d = _0x576627[_0x1e644b(0x265)]("p"),
    _0x1e6a7e = {
      그룹: _0x1e644b(0x22b),
      대발문: _0x1e644b(0x1e7),
      지문: _0x1e644b(0x25e),
      문제: _0x1e644b(0x1ef),
      소문제: _0x1e644b(0x272),
      보기: _0x1e644b(0x25b),
      선지: _0x1e644b(0x21e),
      정답: _0x1e644b(0x252),
      해설: _0x1e644b(0x217),
      힌트: _0x1e644b(0x24b),
      개념: _0x1e644b(0x20e),
      제목: _0x1e644b(0x253),
      팁: _0x1e644b(0x21b),
    };
  let _0x4e4f69 = "",
    _0x2f10c1 = null,
    _0x41e4d9 = 0x0,
    _0x4048de = ![];
  _0x3da84d["forEach"]((_0x91076f, _0x22f89d) => {
    const _0x5af592 = _0x1e644b;
    _0x91076f[_0x5af592(0x233)](_0x5af592(0x271));
    let _0x3aa42c = _0x91076f[_0x5af592(0x1fa)]["trim"]();
    const _0x2f2589 = _0x3aa42c[_0x5af592(0x22f)](/^\[(.*?)\]$/);
    if (_0x2f2589) {
      const _0x3d5773 = _0x2f2589[0x1][_0x5af592(0x223)](/\s+/g, "");
      if (_0x3d5773 in _0x1e6a7e) {
        _0x91076f?.[_0x5af592(0x21f)][_0x5af592(0x206)](_0x1e6a7e[_0x3d5773]),
          _0x91076f[_0x5af592(0x240)]("contenteditable", _0x5af592(0x26c));
        if (_0x1e6a7e[_0x3d5773] === "tag_group")
          _0x4048de
            ? (_0x4048de = ![])
            : (_0x2f10c1 &&
                ((_0x4e4f69 += _0x2f10c1[_0x5af592(0x214)]),
                (_0x2f10c1 = null)),
              (_0x2f10c1 = document[_0x5af592(0x1ec)](_0x5af592(0x1e1))),
              _0x2f10c1?.[_0x5af592(0x21f)][_0x5af592(0x206)](_0x5af592(0x221)),
              _0x2f10c1[_0x5af592(0x240)]("id", "exam_box_" + _0x41e4d9++),
              (_0x4048de = !![]));
        else {
          if (_0x1e6a7e[_0x3d5773] === "tag_exam") {
            if (_0x4048de) {
            } else
              _0x2f10c1 &&
                ((_0x4e4f69 += _0x2f10c1["outerHTML"]), (_0x2f10c1 = null)),
                (_0x2f10c1 = document[_0x5af592(0x1ec)](_0x5af592(0x1e1))),
                _0x2f10c1?.["classList"][_0x5af592(0x206)]("exam_box"),
                _0x2f10c1[_0x5af592(0x240)]("id", "exam_box_" + _0x41e4d9++);
          }
        }
      }
    }
    _0x2f10c1 && _0x2f10c1["appendChild"](_0x91076f);
  });
  if (_0x2f10c1) {
    if (_0x4048de) {
      const _0x16efbf = document["createElement"]("p");
      _0x16efbf[_0x1e644b(0x21f)]["add"](_0x1e644b(0x1e5), _0x1e644b(0x22b)),
        _0x16efbf["setAttribute"](_0x1e644b(0x22c), _0x1e644b(0x26c)),
        (_0x16efbf["textContent"] = _0x1e644b(0x226)),
        _0x2f10c1["appendChild"](_0x16efbf),
        (_0x4e4f69 += _0x2f10c1[_0x1e644b(0x214)]);
    } else _0x4e4f69 += _0x2f10c1[_0x1e644b(0x214)];
  }
  return _0x4e4f69;
}
function _0x2ef4() {
  const _0x3f3bcb = [
    "문제\x20or\x20대발문\x20or\x20지문\x20태그가\x20필요합니다!",
    "BIG",
    "outerHTML",
    "display",
    "4LbQRnx",
    "tag_commentary",
    "CONCEPT",
    "contains",
    "editorStart",
    "tag_tip",
    "3174JIaImF",
    "uploadResults:\x20",
    "tag_choices",
    "classList",
    "setExamData",
    "exam_box",
    "data-mce-src",
    "replace",
    "usePostJsonData",
    "1423256YmdCZc",
    "[그룹]",
    "Editor\x20not\x20found",
    "innerHTML",
    "parse",
    "text/html",
    "tag_group",
    "contenteditable",
    "POST",
    "1445355MHqUuY",
    "match",
    "className",
    "내용\x20앞에\x20태그를\x20입력해\x20주세요",
    "CHOICES",
    "removeAttribute",
    "latexrecovery",
    "QUESTION",
    "send",
    "push",
    "Error\x20in\x20math\x20render:",
    "saveExamData",
    "cloneNode",
    "name",
    "target",
    ".origin_img_area",
    "데이터가\x20존재하지\x20않습니다.",
    "itexdata",
    "setAttribute",
    "11487864NcHhIJ",
    "document",
    "getContent",
    "responseText",
    "appendChild",
    "setExamList",
    "join",
    "img",
    "open",
    "getElementById",
    "tag_hint",
    "content",
    "file_name",
    "imgURL",
    "TEXT",
    "json",
    "getExamCodenum",
    "tl_answer",
    "tag_title",
    "split",
    "click",
    "includes",
    ".exam_box",
    "trim",
    "ELEMENT_NODE",
    "template",
    "tag_example",
    "SMALL",
    "forEach",
    "tag_content",
    "ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.",
    "append",
    "display_inactive",
    "get",
    "br[data-mce-bogus=\x221\x22]",
    "block",
    "querySelectorAll",
    "TIP",
    "1619253waqBKe",
    "콘텐츠\x20삽입\x20중\x20오류\x20발생:",
    "수정할\x20요소가\x20선택되지\x20않았습니다.",
    "find",
    "addEventListener",
    "false",
    "data",
    "문서를\x20업로드\x20하세요.",
    "img_save_type",
    "nextElementSibling",
    "style",
    "tag_exam_sm",
    "src",
    "내용\x20앞에\x20태그를\x20입력해주세요.",
    "div",
    "HINT",
    "save_path",
    "stringify",
    "para0",
    "map",
    "tag_bigcontent",
    "length",
    "status",
    "body",
    "closest",
    "createElement",
    "setContent",
    "contentDocument",
    "tag_exam",
    "function",
    "Parsed\x20document\x20does\x20not\x20contain\x20body.",
    "readyState",
    "selection",
    "error",
    "itex_area_hidden",
    "tinyeditor",
    "message",
    "file",
    "Error\x20processing\x20image:",
    "textContent",
    "6251oAriOX",
    "from",
    "recoverynew",
    "변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.",
    "recoverynew_no_click",
    "querySelector",
    "img_data",
    "655377WtbPMm",
    "modal_block",
    "hasChildNodes",
    "/qnapi_dream/hml_upload",
    "add",
    ".itex_hml_convert_view",
    "ANSWER",
    "onreadystatechange",
    "log",
    "/uploadImage",
    "TITLE",
    "Error\x20while\x20saving\x20exam\x20data:",
    "tag_concept",
    "removeSVG",
    "87320QXAwJv",
    "2079EjmhZt",
  ];
  _0x2ef4 = function () {
    return _0x3f3bcb;
  };
  return _0x2ef4();
}
