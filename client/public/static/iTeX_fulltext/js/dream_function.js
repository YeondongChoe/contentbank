/* eslint-disable no-func-assign */
/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
const _0x55c2fc = _0x5716;
(function (_0x1e2f42, _0x28aa96) {
  const _0x1b8cb0 = _0x5716,
    _0x5109fd = _0x1e2f42();
  while ([]) {
    try {
      const _0x136ac8 =
        (parseInt(_0x1b8cb0(0x20b)) / 0x1) *
          (-parseInt(_0x1b8cb0(0x1ff)) / 0x2) +
        parseInt(_0x1b8cb0(0x1cd)) / 0x3 +
        parseInt(_0x1b8cb0(0x1d4)) / 0x4 +
        parseInt(_0x1b8cb0(0x205)) / 0x5 +
        (parseInt(_0x1b8cb0(0x1a2)) / 0x6) *
          (parseInt(_0x1b8cb0(0x1d9)) / 0x7) +
        (parseInt(_0x1b8cb0(0x20a)) / 0x8) *
          (-parseInt(_0x1b8cb0(0x1ef)) / 0x9) +
        -parseInt(_0x1b8cb0(0x19b)) / 0xa;
      if (_0x136ac8 === _0x28aa96) break;
      else _0x5109fd['push'](_0x5109fd['shift']());
    } catch (_0x476015) {
      _0x5109fd['push'](_0x5109fd['shift']());
    }
  }
})(_0x7c64, 0xaea71),
  (window[_0x55c2fc(0x200)] = (_0x50143e) => {
    const _0x208990 = _0x55c2fc,
      _0x357119 = document[_0x208990(0x1d7)](iTeXEQ[_0x208990(0x1f2)]);
    function _0x5194ac() {
      const _0x24413b = _0x208990;
      (onlyEQ = !![]),
        (onlyEQNode = _0x50143e),
        _0x357119?.[_0x24413b(0x1be)][_0x24413b(0x1ee)](_0x24413b(0x1f5)),
        iTeXEQ[_0x24413b(0x203)]();
    }
    function _0x3fd948() {
      const _0x308794 = _0x208990;
      (onlyEQ = ![]),
        (onlyEQNode = ''),
        _0x357119?.['classList'][_0x308794(0x1f7)](_0x308794(0x1f5));
    }
    _0x357119?.[_0x208990(0x1be)][_0x208990(0x18c)](_0x208990(0x1f5))
      ? _0x5194ac()
      : _0x3fd948();
  }),
  (window['usePostJsonData'] = function setExamData(_0xb78887) {
    const _0x3fbed0 = _0x55c2fc;
    try {
      const _0x2cf8e9 = tinymce[_0x3fbed0(0x1a9)]('tinyeditor');
      return _0x2cf8e9
        ? (_0x2cf8e9['selection']['setContent'](_0xb78887), !![])
        : (console[_0x3fbed0(0x198)](_0x3fbed0(0x1bc)), ![]);
    } catch (_0x475940) {
      return console[_0x3fbed0(0x198)](_0x3fbed0(0x1d3), _0x475940), ![];
    }
  });
async function uploadImageToServer(_0x34997, _0x3805e7) {
  const _0x25e938 = _0x55c2fc,
    _0x51dfcd = new FormData(),
    _0x4b8b7b = await fetch(_0x3805e7),
    _0x1cc2ec = await _0x4b8b7b['blob']();
  console[_0x25e938(0x1d6)](_0x25e938(0x1cb), _0x1cc2ec),
    _0x51dfcd[_0x25e938(0x18f)](_0x25e938(0x1b3), _0x1cc2ec, 'image.png'),
    _0x51dfcd[_0x25e938(0x18f)]('img_save_type', img_save_type),
    _0x51dfcd[_0x25e938(0x18f)]('save_path', dream_server_url);
  const _0x31ef2f = await fetch(dream_server_url + _0x25e938(0x1eb), {
    method: _0x25e938(0x207),
    body: _0x51dfcd,
  });
  if (!_0x31ef2f['ok']) throw new Error(_0x25e938(0x191));
  const _0x1a8ae3 = await _0x31ef2f[_0x25e938(0x1af)]();
  return console['log']('data:\x20', _0x1a8ae3), _0x1a8ae3;
}
function clearEditorContent() {
  const _0x112d24 = _0x55c2fc,
    _0x31d807 = tinymce[_0x112d24(0x1a9)](_0x112d24(0x1a1));
  _0x31d807
    ? _0x31d807[_0x112d24(0x192)]('')
    : console[_0x112d24(0x198)](_0x112d24(0x1c7));
}
window['saveExamData'] = async function () {
  const _0x172da7 = _0x55c2fc;
  try {
    const _0x1005ec =
        tinymce['activeEditor']['contentWindow'][_0x172da7(0x1a4)] ||
        tinymce[_0x172da7(0x1c4)][_0x172da7(0x1a5)][_0x172da7(0x1a4)],
      _0x33c2c2 = iTeXEQ[_0x172da7(0x1d8)](_0x1005ec[_0x172da7(0x202)]('body'));
    if (!_0x33c2c2) return console[_0x172da7(0x198)](_0x172da7(0x1b4)), ![];
    const _0x42a1d6 = [
        _0x172da7(0x1e6),
        _0x172da7(0x208),
        _0x172da7(0x211),
        _0x172da7(0x1df),
        'tag_example',
        _0x172da7(0x1b1),
        _0x172da7(0x1e1),
        'tag_commentary',
        _0x172da7(0x1f9),
        _0x172da7(0x1b6),
        _0x172da7(0x213),
        _0x172da7(0x1ae),
      ],
      _0x1e4730 = _0x33c2c2[_0x172da7(0x1a0)]('p');
    if (_0x1e4730) {
      const _0x48be0e = _0x1e4730[0x0][_0x172da7(0x202)](_0x172da7(0x210)),
        _0x74d879 = Array[_0x172da7(0x19a)](_0x1e4730[0x0]?.[_0x172da7(0x1be)])[
          _0x172da7(0x1c8)
        ]((_0xabd033) => _0x42a1d6['includes'](_0xabd033)),
        _0x571d78 = Array[_0x172da7(0x19a)](_0x1e4730)[_0x172da7(0x1c8)](
          (_0x3a28ac) =>
            _0x3a28ac?.[_0x172da7(0x1be)][_0x172da7(0x18c)](_0x172da7(0x211)),
        ),
        _0x37eb2a = Array[_0x172da7(0x19a)](_0x1e4730)['find']((_0x4b291c) =>
          _0x4b291c?.[_0x172da7(0x1be)]['contains'](_0x172da7(0x1db)),
        );
      if (_0x48be0e) return alert(_0x172da7(0x1b7)), ![];
      if (!_0x74d879)
        return alert(_0x172da7(0x1b5)), iTeXEQ['latexrecovery'](), ![];
      if (!_0x571d78) return alert(_0x172da7(0x1ab)), ![];
    } else
      return (
        alert('No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.'),
        ![]
      );
    const _0x149e44 = _0x33c2c2[_0x172da7(0x1a0)]('img');
    for (const _0x502437 of _0x149e44) {
      try {
        const { imgUUID: _0x196b4a, imgURL: _0x2ecf2f } =
          await uploadImageToServer(img_save_type, _0x502437['src']);
        console[_0x172da7(0x1d6)](
          _0x172da7(0x1f1),
          dream_server_url + _0x2ecf2f,
        ),
          _0x502437[_0x172da7(0x1d0)](_0x172da7(0x1e3), _0x196b4a),
          _0x502437[_0x172da7(0x1d0)](
            _0x172da7(0x199),
            dream_server_url + _0x2ecf2f,
          );
      } catch (_0x22a285) {
        console[_0x172da7(0x198)](
          _0x172da7(0x1c6),
          _0x502437[_0x172da7(0x199)],
          _0x22a285,
        );
      }
    }
    const _0x1a9d46 = {
        tag_group: _0x33c2c2[_0x172da7(0x20f)],
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
      _0x36f29d = new DOMParser(),
      _0x3864c8 = _0x36f29d[_0x172da7(0x19f)](
        _0x33c2c2[_0x172da7(0x20f)],
        _0x172da7(0x1c2),
      );
    let _0x5a1fc9 = null,
      _0x48f861 = '';
    if (!_0x3864c8[_0x172da7(0x1dc)])
      return console[_0x172da7(0x198)](_0x172da7(0x1bd)), ![];
    const _0x1657d1 = (_0x12666e, _0x5eff19) => {
      const _0x1dbe71 = _0x172da7;
      Array[_0x1dbe71(0x1f8)](_0x1a9d46[_0x12666e]) &&
        _0x1a9d46[_0x12666e][_0x1dbe71(0x206)](_0x5eff19);
    };
    Array['from'](_0x3864c8[_0x172da7(0x1dc)][_0x172da7(0x1d2)])[
      _0x172da7(0x1e7)
    ]((_0x360df0) => {
      const _0x67a89c = _0x172da7;
      if (_0x360df0['nodeType'] === Node[_0x67a89c(0x209)]) {
        const _0x14f340 = Array[_0x67a89c(0x19a)](
            _0x360df0?.[_0x67a89c(0x1be)],
          ),
          _0x54b862 = _0x14f340[_0x67a89c(0x1c8)]((_0x55b3d5) =>
            _0x42a1d6[_0x67a89c(0x1e5)](_0x55b3d5),
          );
        if (_0x54b862)
          _0x5a1fc9 && _0x1657d1(_0x5a1fc9, _0x48f861),
            (_0x5a1fc9 = _0x54b862),
            (_0x48f861 = _0x360df0['outerHTML']);
        else _0x5a1fc9 && (_0x48f861 += _0x360df0[_0x67a89c(0x20d)]);
      }
    });
    _0x5a1fc9 && _0x1657d1(_0x5a1fc9, _0x48f861);
    const _0x102162 = JSON[_0x172da7(0x204)](_0x1a9d46, null, 0x2);
    return iTeXEQ[_0x172da7(0x18b)](), clearEditorContent(), _0x102162;
  } catch (_0x8cbaed) {
    return console['error'](_0x172da7(0x18a), _0x8cbaed), ![];
  }
};
function hml_upload(_0x158e99) {
  const _0x1304b8 = _0x55c2fc;
  console[_0x1304b8(0x1d6)]('save_path:\x20', dream_server_url);
  var _0x2626b4 = new FormData();
  _0x2626b4[_0x1304b8(0x18f)](_0x1304b8(0x1d5), _0x158e99[_0x1304b8(0x1fe)]),
    _0x2626b4['append'](_0x1304b8(0x1b3), _0x158e99),
    _0x2626b4[_0x1304b8(0x18f)]('img_save_type', img_save_type),
    _0x2626b4[_0x1304b8(0x18f)](_0x1304b8(0x1ec), dream_server_url);
  var _0x65e465 = new XMLHttpRequest();
  _0x65e465[_0x1304b8(0x20e)](
    _0x1304b8(0x207),
    dream_server_url + '/qnapi_dream/hml_upload',
    !![],
  ),
    _0x65e465[_0x1304b8(0x1b0)](_0x2626b4),
    (_0x65e465['onreadystatechange'] = function () {
      const _0xacba14 = _0x1304b8;
      if (
        _0x65e465[_0xacba14(0x1ba)] == 0x4 &&
        _0x65e465[_0xacba14(0x1d1)] == 0xc8
      ) {
        const _0x1ecea2 = document[_0xacba14(0x202)](_0xacba14(0x18d));
        var _0x4f60c0 = JSON[_0xacba14(0x1a3)](_0x65e465[_0xacba14(0x195)]);
        (_0x1ecea2[_0xacba14(0x20f)] = _0x4f60c0[_0xacba14(0x215)]),
          document[_0xacba14(0x202)](_0xacba14(0x1f0))?.['classList'][
            _0xacba14(0x1f7)
          ]('itex_area_hidden'),
          iTeXEQ[_0xacba14(0x193)](_0x1ecea2),
          (document['getElementById'](_0xacba14(0x1f4))['style'][
            _0xacba14(0x1c3)
          ] = _0xacba14(0x1ce)),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
function _0x5716(_0x3ba883, _0x2b1316) {
  const _0x7c64d5 = _0x7c64();
  return (
    (_0x5716 = function (_0x5716c4, _0x5be2e3) {
      _0x5716c4 = _0x5716c4 - 0x187;
      let _0x1a9c08 = _0x7c64d5[_0x5716c4];
      return _0x1a9c08;
    }),
    _0x5716(_0x3ba883, _0x2b1316)
  );
}
let lastClickedBoxId = null,
  currentEditorContent = '';
function htmlStringToNode(_0x54cdc3) {
  const _0xaa6626 = _0x55c2fc;
  var _0x36a126 = document[_0xaa6626(0x20c)](_0xaa6626(0x1dd));
  return (_0x36a126[_0xaa6626(0x20f)] = _0x54cdc3), _0x36a126[_0xaa6626(0x18e)];
}
async function hml_edit_finish() {
  const _0x1de23e = _0x55c2fc;
  if (!lastClickedBoxId) {
    console[_0x1de23e(0x198)](_0x1de23e(0x1bf));
    return;
  }
  const _0x35479a = tinymce[_0x1de23e(0x1a9)](_0x1de23e(0x1a1))['getContent'](),
    _0x51035a = document[_0x1de23e(0x202)]('.itex_hml_convert_view'),
    _0x140a03 = document[_0x1de23e(0x1d7)](lastClickedBoxId);
  if (_0x140a03) {
    const _0x5abb39 = htmlStringToNode(_0x35479a);
    try {
      const _0x547661 = await iTeXDBW_mathrender_hml(_0x5abb39),
        _0x363294 = document[_0x1de23e(0x20c)]('div');
      _0x363294['appendChild'](_0x547661),
        (_0x140a03[_0x1de23e(0x20d)] = _0x363294[_0x1de23e(0x20f)]),
        iTeXEQ['recoverynew_no_click'](_0x51035a),
        tinymce[_0x1de23e(0x1a9)](_0x1de23e(0x1a1))['setContent'](''),
        (lastClickedBoxId = null),
        (currentEditorContent = '');
    } catch (_0xa389ea) {
      console[_0x1de23e(0x198)](_0x1de23e(0x194), _0xa389ea);
    }
  } else console[_0x1de23e(0x198)](_0x1de23e(0x19d));
}
async function hml_upload_frame(_0x2531e6) {
  const _0x27cb6f = _0x55c2fc;
  console[_0x27cb6f(0x1d6)](_0x27cb6f(0x1ad)),
    (document[_0x27cb6f(0x1d7)](_0x27cb6f(0x1f4))[_0x27cb6f(0x1e2)][
      _0x27cb6f(0x1c3)
    ] = _0x27cb6f(0x188));
  var _0x40f8e2 = new FormData();
  _0x40f8e2[_0x27cb6f(0x18f)]('file_name', _0x2531e6[_0x27cb6f(0x1fe)]),
    _0x40f8e2[_0x27cb6f(0x18f)](_0x27cb6f(0x1b3), _0x2531e6),
    _0x40f8e2['append']('img_save_type', img_save_type),
    _0x40f8e2['append']('save_path', dream_server_url);
  var _0x4563ac = new XMLHttpRequest();
  _0x4563ac['open'](
    _0x27cb6f(0x207),
    dream_server_url + _0x27cb6f(0x19c),
    !![],
  ),
    _0x4563ac[_0x27cb6f(0x1b0)](_0x40f8e2),
    (_0x4563ac[_0x27cb6f(0x201)] = async function () {
      const _0x261921 = _0x27cb6f;
      if (
        _0x4563ac[_0x261921(0x1ba)] == 0x4 &&
        _0x4563ac[_0x261921(0x1d1)] == 0xc8
      ) {
        const _0x39a150 = document[_0x261921(0x202)](_0x261921(0x18d));
        console[_0x261921(0x1d6)](_0x4563ac[_0x261921(0x195)]);
        var _0x39b269 = JSON[_0x261921(0x1a3)](_0x4563ac[_0x261921(0x195)]);
        const _0x3efa1d = iTeX_hml_tag_parser(_0x39b269[_0x261921(0x215)]);
        (_0x39a150[_0x261921(0x20f)] = _0x3efa1d),
          _0x39a150[_0x261921(0x190)]('click', async function (_0x1ee5b6) {
            const _0x154bb7 = _0x261921;
            if (
              _0x1ee5b6[_0x154bb7(0x1c9)][_0x154bb7(0x1aa)](_0x154bb7(0x189))
            ) {
              const _0x141e9e = _0x1ee5b6[_0x154bb7(0x1c9)]['closest'](
                  _0x154bb7(0x189),
                ),
                _0xfed3f = _0x141e9e[_0x154bb7(0x1b2)]('id');
              lastClickedBoxId &&
                tinymce['get'](_0x154bb7(0x1a1))[_0x154bb7(0x1cf)]() !==
                  currentEditorContent &&
                confirm(_0x154bb7(0x1e8)) &&
                (await hml_edit_finish());
              const _0x85ac84 = htmlStringToNode(_0x141e9e[_0x154bb7(0x20d)]);
              lastClickedBoxId = _0xfed3f;
              try {
                const _0x1e5615 = await iTeXDBW_mathrender_hml(_0x85ac84),
                  _0xdb8ed3 = document[_0x154bb7(0x20c)](_0x154bb7(0x1e4));
                _0xdb8ed3[_0x154bb7(0x214)](_0x1e5615),
                  tinymce[_0x154bb7(0x1a9)]('tinyeditor')[_0x154bb7(0x192)](
                    _0xdb8ed3['innerHTML'],
                  ),
                  (currentEditorContent = _0xdb8ed3[_0x154bb7(0x20f)]);
              } catch (_0x5bec98) {
                console[_0x154bb7(0x198)](_0x154bb7(0x194), _0x5bec98);
              }
              iTeXEQ[_0x154bb7(0x1f6)]();
            }
          }),
          document[_0x261921(0x202)]('.origin_img_area')?.[_0x261921(0x1be)][
            'add'
          ]('itex_area_hidden'),
          iTeXEQ[_0x261921(0x193)](_0x39a150),
          (document[_0x261921(0x1d7)]('modal_block')[_0x261921(0x1e2)][
            'display'
          ] = _0x261921(0x1ce));
      }
    });
}
window[_0x55c2fc(0x1cc)] = function () {
  const _0x183252 = _0x55c2fc,
    _0x350287 = document[_0x183252(0x202)](_0x183252(0x18d))['cloneNode'](!![]);
  if (!_0x350287['hasChildNodes']()) {
    alert(_0x183252(0x1ed));
    return;
  }
  const _0x124569 = tinymce['get'](_0x183252(0x1a1))[_0x183252(0x1cf)]();
  if (_0x124569[_0x183252(0x187)]() !== '') {
    const _0x1cde5c = confirm(_0x183252(0x1e0));
    if (!_0x1cde5c) return;
  }
  if (_0x350287) {
    const _0x3045df = _0x350287[_0x183252(0x1a0)](_0x183252(0x189)),
      _0x52ee95 = [];
    return (
      _0x3045df[_0x183252(0x1e7)]((_0x3f7155, _0x1bd35d) => {
        const _0x198856 = _0x183252,
          _0x428ca9 = [];
        let _0x67a7ef = 0x1;
        const _0x4b9da9 = _0x3f7155[_0x198856(0x1a0)]('p');
        _0x4b9da9[_0x198856(0x1e7)]((_0x4f2e74) => {
          const _0x8757d = _0x198856,
            _0xaa13f9 = _0x4f2e74?.['classList'];
          let _0x5dd24d = null;
          if (_0xaa13f9[_0x8757d(0x18c)]('tag_bigcontent')) _0x5dd24d = 'BIG';
          else {
            if (_0xaa13f9[_0x8757d(0x18c)](_0x8757d(0x208)))
              _0x5dd24d = _0x8757d(0x1bb);
            else {
              if (_0xaa13f9[_0x8757d(0x18c)](_0x8757d(0x211)))
                _0x5dd24d = 'QUESTION';
              else {
                if (_0xaa13f9[_0x8757d(0x18c)]('tag_exam_sm'))
                  _0x5dd24d = _0x8757d(0x1c0);
                else {
                  if (_0xaa13f9[_0x8757d(0x18c)](_0x8757d(0x1fc)))
                    _0x5dd24d = 'EXAMPLE';
                  else {
                    if (_0xaa13f9['contains']('tag_choices'))
                      _0x5dd24d = _0x8757d(0x197);
                    else {
                      if (_0xaa13f9[_0x8757d(0x18c)](_0x8757d(0x1e1)))
                        _0x5dd24d = 'ANSWER';
                      else {
                        if (_0xaa13f9[_0x8757d(0x18c)](_0x8757d(0x1fb)))
                          _0x5dd24d = 'COMMENTARY';
                        else {
                          if (_0xaa13f9[_0x8757d(0x18c)](_0x8757d(0x1f9)))
                            _0x5dd24d = _0x8757d(0x1c1);
                          else {
                            if (_0xaa13f9['contains'](_0x8757d(0x1b6)))
                              _0x5dd24d = _0x8757d(0x1ea);
                            else {
                              if (_0xaa13f9['contains'](_0x8757d(0x213)))
                                _0x5dd24d = _0x8757d(0x1f3);
                              else {
                                if (_0xaa13f9[_0x8757d(0x18c)](_0x8757d(0x1ae)))
                                  _0x5dd24d = _0x8757d(0x1c5);
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
          if (_0x5dd24d) {
            let _0x3ba333 = _0x4f2e74['outerHTML'],
              _0x11ae87 = _0x4f2e74['nextElementSibling'];
            while (
              _0x11ae87 &&
              !_0x11ae87[_0x8757d(0x1be)][_0x8757d(0x18c)]('tag_bigcontent') &&
              !_0x11ae87['classList']['contains'](_0x8757d(0x208)) &&
              !_0x11ae87['classList'][_0x8757d(0x18c)](_0x8757d(0x211)) &&
              !_0x11ae87[_0x8757d(0x1be)][_0x8757d(0x18c)]('tag_exam_sm') &&
              !_0x11ae87[_0x8757d(0x1be)][_0x8757d(0x18c)]('tag_example') &&
              !_0x11ae87[_0x8757d(0x1be)]['contains'](_0x8757d(0x1b1)) &&
              !_0x11ae87[_0x8757d(0x1be)]['contains'](_0x8757d(0x1e1)) &&
              !_0x11ae87[_0x8757d(0x1be)][_0x8757d(0x18c)]('tag_commentary') &&
              !_0x11ae87[_0x8757d(0x1be)][_0x8757d(0x18c)](_0x8757d(0x1f9)) &&
              !_0x11ae87['classList'][_0x8757d(0x18c)](_0x8757d(0x1b6)) &&
              !_0x11ae87['classList']['contains'](_0x8757d(0x213)) &&
              !_0x11ae87[_0x8757d(0x1be)][_0x8757d(0x18c)](_0x8757d(0x1ae))
            ) {
              (_0x3ba333 += _0x11ae87[_0x8757d(0x20d)]),
                (_0x11ae87 = _0x11ae87[_0x8757d(0x1ca)]);
            }
            _0x428ca9[_0x8757d(0x206)]({
              type: _0x5dd24d,
              content: _0x3ba333,
              sort: _0x67a7ef++,
            });
          }
        }),
          _0x52ee95[_0x198856(0x206)]({ id: null, quizItemList: _0x428ca9 });
      }),
      tinymce[_0x183252(0x1a9)]('tinyeditor')['setContent'](''),
      _0x52ee95
    );
  } else
    return console[_0x183252(0x1d6)]('데이터가\x20존재하지\x20않습니다.'), null;
};
function processHmlData(_0x201561) {
  const _0x4a27d1 = _0x55c2fc,
    _0x1bb107 = [],
    _0x570e13 = Array['from'](_0x201561[_0x4a27d1(0x1a0)]('p'));
  let _0x24bdb5 = [],
    _0x2aae99 = ![];
  return (
    _0x570e13[_0x4a27d1(0x1e7)]((_0x58608b) => {
      const _0x4a17ec = _0x4a27d1;
      divideKey[_0x4a17ec(0x1e5)](_0x58608b[_0x4a17ec(0x212)])
        ? (_0x24bdb5[_0x4a17ec(0x196)] > 0x0 &&
            (_0x1bb107[_0x4a17ec(0x206)](
              _0x24bdb5[_0x4a17ec(0x1a7)](
                (_0x3f80b1) => _0x3f80b1[_0x4a17ec(0x20d)],
              )[_0x4a17ec(0x1ac)](''),
            ),
            (_0x24bdb5 = [])),
          _0x24bdb5['push'](_0x58608b))
        : _0x24bdb5['push'](_0x58608b);
    }),
    _0x24bdb5[_0x4a27d1(0x196)] > 0x0 &&
      _0x1bb107[_0x4a27d1(0x206)](
        _0x24bdb5[_0x4a27d1(0x1a7)]((_0x5ca1fc) => _0x5ca1fc['outerHTML'])[
          'join'
        ](''),
      ),
    _0x1bb107
  );
}
window[_0x55c2fc(0x190)]('message', (_0x2231d8) => {
  const _0x416b36 = _0x55c2fc,
    { functionName: _0x5940c1, args: _0x310901 } = _0x2231d8['data'];
  _0x5940c1 === _0x416b36(0x216) &&
    typeof window[_0x5940c1] === _0x416b36(0x1fa) &&
    window[_0x5940c1](_0x310901[0x0]),
    _0x5940c1 === _0x416b36(0x19e) &&
      typeof window[_0x5940c1] === _0x416b36(0x1fa) &&
      window[_0x5940c1](_0x310901[0x0]),
    _0x5940c1 === _0x416b36(0x1fd) &&
      typeof window[_0x5940c1] === _0x416b36(0x1fa) &&
      window[_0x5940c1](_0x310901[0x0]),
    _0x5940c1 === _0x416b36(0x1a8) &&
      typeof window[_0x5940c1] === _0x416b36(0x1fa) &&
      window[_0x5940c1](_0x310901[0x0]);
});
function _0x7c64() {
  const _0x741f4e = [
    'replace',
    'CONCEPT',
    '/uploadImage',
    'save_path',
    '문서를\x20업로드\x20하세요.',
    'remove',
    '1564443JURTKa',
    '.origin_img_area',
    'img_url:\x20',
    'editor_container',
    'TITLE',
    'modal_block',
    'display_inactive',
    'recoverynew',
    'add',
    'isArray',
    'tag_hint',
    'function',
    'tag_commentary',
    'tag_example',
    'getExamCodenum',
    'name',
    '121118CPVRjN',
    'openEQ',
    'onreadystatechange',
    'querySelector',
    'editorStart',
    'stringify',
    '3533205hPabGh',
    'push',
    'POST',
    'tag_content',
    'ELEMENT_NODE',
    '56jCKBKx',
    '17XofUCl',
    'createElement',
    'outerHTML',
    'open',
    'innerHTML',
    'br[data-mce-bogus=\x221\x22]',
    'tag_exam',
    'className',
    'tag_title',
    'appendChild',
    'itexdata',
    'setExamData',
    'trim',
    'block',
    '.exam_box',
    'Error\x20while\x20saving\x20exam\x20data:',
    'latexrecovery',
    'contains',
    '.itex_hml_convert_view',
    'content',
    'append',
    'addEventListener',
    'Error\x20uploading\x20image',
    'setContent',
    'recoverynew_no_click',
    'Error\x20in\x20math\x20render:',
    'responseText',
    'length',
    'CHOICES',
    'error',
    'src',
    'from',
    '2333290dtLWFO',
    '/qnapi_dream/hml_upload',
    '원래\x20자리를\x20찾을\x20수\x20없습니다.',
    'setExamList',
    'parseFromString',
    'querySelectorAll',
    'tinyeditor',
    '18VNmhcq',
    'parse',
    'document',
    'contentDocument',
    'contenteditable',
    'map',
    'saveExamData',
    'get',
    'closest',
    '문제\x20태그가\x20필요합니다!',
    'join',
    'hml_upload_frame\x20들옴',
    'tag_tip',
    'json',
    'send',
    'tag_choices',
    'getAttribute',
    'file',
    'No\x20data\x20found\x20in\x20the\x20parsed\x20document.',
    '내용\x20앞에\x20태그를\x20입력해\x20주세요',
    'tag_concept',
    '내용\x20앞에\x20태그를\x20입력해주세요.',
    'exam_box_',
    'removeAttribute',
    'readyState',
    'TEXT',
    'ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.',
    'Parsed\x20document\x20does\x20not\x20contain\x20body.',
    'classList',
    '수정할\x20요소가\x20선택되지\x20않았습니다.',
    'SMALL',
    'HINT',
    'text/html',
    'display',
    'activeEditor',
    'TIP',
    'Error\x20processing\x20image:',
    'Editor\x20not\x20found',
    'find',
    'target',
    'nextElementSibling',
    'blob:\x20',
    'saveHmlData',
    '205560FSkolV',
    'none',
    'getContent',
    'setAttribute',
    'status',
    'childNodes',
    '콘텐츠\x20삽입\x20중\x20오류\x20발생:',
    '4040776VkCogX',
    'file_name',
    'log',
    'getElementById',
    'removeSVG',
    '3289167vzeiYM',
    'exam_box',
    'tag_group',
    'body',
    'template',
    'false',
    'tag_exam_sm',
    '에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?',
    'tl_answer',
    'style',
    'Img_code',
    'div',
    'includes',
    'tag_bigcontent',
    'forEach',
    '변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.',
  ];
  _0x7c64 = function () {
    return _0x741f4e;
  };
  return _0x7c64();
}
function iTeX_hml_tag_parser(_0x130e2d) {
  const _0x50c3b1 = _0x55c2fc,
    _0x3e485f = new DOMParser(),
    _0x5aabac = _0x3e485f[_0x50c3b1(0x19f)](_0x130e2d, _0x50c3b1(0x1c2)),
    _0x286791 = _0x5aabac[_0x50c3b1(0x1a0)]('p'),
    _0x33d0a1 = {
      그룹: 'tag_group',
      대발문: 'tag_bigcontent',
      지문: _0x50c3b1(0x208),
      문제: _0x50c3b1(0x211),
      소문제: _0x50c3b1(0x1df),
      보기: _0x50c3b1(0x1fc),
      선지: _0x50c3b1(0x1b1),
      정답: 'tl_answer',
      해설: _0x50c3b1(0x1fb),
      힌트: _0x50c3b1(0x1f9),
      개념: _0x50c3b1(0x1b6),
      제목: _0x50c3b1(0x213),
      팁: _0x50c3b1(0x1ae),
    };
  let _0x4a17ab = '',
    _0x39a1b7 = null,
    _0xeed24 = 0x0;
  return (
    _0x286791[_0x50c3b1(0x1e7)]((_0x24ab66) => {
      const _0x2f63ba = _0x50c3b1;
      _0x24ab66[_0x2f63ba(0x1b9)]('style');
      let _0x512384 = _0x24ab66['textContent'][_0x2f63ba(0x187)]();
      const _0x474a1b = _0x512384['match'](/^\[(.*?)\]$/);
      if (_0x474a1b) {
        const _0x5cebd4 = _0x474a1b[0x1][_0x2f63ba(0x1e9)](/\s+/g, '');
        _0x5cebd4 in _0x33d0a1 &&
          (_0x24ab66?.['classList']['add'](_0x33d0a1[_0x5cebd4]),
          _0x24ab66[_0x2f63ba(0x1d0)](_0x2f63ba(0x1a6), _0x2f63ba(0x1de)),
          _0x33d0a1[_0x5cebd4] === _0x2f63ba(0x1db) &&
            (_0x39a1b7 && (_0x4a17ab += _0x39a1b7[_0x2f63ba(0x20d)]),
            (_0x39a1b7 = document[_0x2f63ba(0x20c)](_0x2f63ba(0x1e4))),
            _0x39a1b7?.[_0x2f63ba(0x1be)][_0x2f63ba(0x1f7)](_0x2f63ba(0x1da)),
            _0x39a1b7[_0x2f63ba(0x1d0)]('id', _0x2f63ba(0x1b8) + _0xeed24++)));
      }
      _0x39a1b7 && _0x39a1b7[_0x2f63ba(0x214)](_0x24ab66);
    }),
    _0x39a1b7 && (_0x4a17ab += _0x39a1b7[_0x50c3b1(0x20d)]),
    _0x4a17ab
  );
}
