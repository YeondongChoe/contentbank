/* eslint-disable no-empty */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable no-redeclare */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-constant-condition */
/* eslint-disable no-func-assign */
/* eslint-disable no-undef */
const _0x40dce5 = _0x3f14;
(function (_0x3f2f5a, _0x3992e1) {
  const _0x462c97 = _0x3f14,
    _0x364798 = _0x3f2f5a();
  while ([]) {
    try {
      const _0xa3556a =
        parseInt(_0x462c97(0x1f4)) / 0x1 +
        parseInt(_0x462c97(0x173)) / 0x2 +
        (-parseInt(_0x462c97(0x19c)) / 0x3) *
          (parseInt(_0x462c97(0x1e8)) / 0x4) +
        -parseInt(_0x462c97(0x197)) / 0x5 +
        (parseInt(_0x462c97(0x1b6)) / 0x6) *
          (-parseInt(_0x462c97(0x17d)) / 0x7) +
        parseInt(_0x462c97(0x1fa)) / 0x8 +
        parseInt(_0x462c97(0x1d0)) / 0x9;
      if (_0xa3556a === _0x3992e1) break;
      else _0x364798['push'](_0x364798['shift']());
    } catch (_0x5a8ddc) {
      _0x364798['push'](_0x364798['shift']());
    }
  }
})(_0x586c, 0x78dc7),
  (window['openEQ'] = (_0x224fe4) => {
    const _0x56ce4b = _0x3f14,
      _0xa78a50 = document['getElementById'](iTeXEQ[_0x56ce4b(0x187)]);
    function _0x21b3ad() {
      const _0x29a37d = _0x56ce4b;
      (onlyEQ = !![]),
        (onlyEQNode = _0x224fe4),
        _0xa78a50?.[_0x29a37d(0x185)][_0x29a37d(0x1c8)](_0x29a37d(0x1ee)),
        iTeXEQ['editorStart']();
    }
    function _0x5d643() {
      const _0x5a3c83 = _0x56ce4b;
      (onlyEQ = ![]),
        (onlyEQNode = ''),
        _0xa78a50?.[_0x5a3c83(0x185)][_0x5a3c83(0x172)](_0x5a3c83(0x1ee));
    }
    _0xa78a50?.[_0x56ce4b(0x185)][_0x56ce4b(0x1d8)](_0x56ce4b(0x1ee))
      ? _0x21b3ad()
      : _0x5d643();
  }),
  (window[_0x40dce5(0x1ce)] = function setExamData(_0x832666) {
    const _0x2e874e = _0x40dce5;
    try {
      const _0x19f5a3 = tinymce[_0x2e874e(0x189)](_0x2e874e(0x19a));
      return _0x19f5a3
        ? (_0x19f5a3[_0x2e874e(0x1f6)][_0x2e874e(0x1f9)](_0x832666), !![])
        : (console[_0x2e874e(0x184)](
            'ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.',
          ),
          ![]);
    } catch (_0x19dec6) {
      return console[_0x2e874e(0x184)](_0x2e874e(0x19f), _0x19dec6), ![];
    }
  });
async function uploadImageToServer(_0x349204, _0x28048a) {
  const _0x489a0e = _0x40dce5,
    _0x13213a = new FormData();
  _0x13213a[_0x489a0e(0x1c0)]('img_data', _0x28048a),
    _0x13213a['append']('img_save_type', _0x349204),
    _0x13213a[_0x489a0e(0x1c0)](_0x489a0e(0x199), dream_server_url);
  const _0xd9f93d = await fetch(dream_server_url + _0x489a0e(0x1a4), {
    method: 'POST',
    body: _0x13213a,
  });
  if (!_0xd9f93d['ok']) throw new Error(_0x489a0e(0x1c5));
  const _0x5c53d3 = await _0xd9f93d[_0x489a0e(0x1a5)]();
  return (
    console[_0x489a0e(0x16e)]('data:\x20', _0x5c53d3[_0x489a0e(0x1aa)]),
    _0x5c53d3[_0x489a0e(0x1aa)]
  );
}
function clearEditorContent() {
  const _0x171448 = _0x40dce5,
    _0x291bf5 = tinymce[_0x171448(0x189)](_0x171448(0x19a));
  _0x291bf5
    ? _0x291bf5['setContent']('')
    : console['error']('Editor\x20not\x20found');
}
window[_0x40dce5(0x1c9)] = async function () {
  const _0x2c32e4 = _0x40dce5;
  try {
    const _0x2a54e1 =
        tinymce[_0x2c32e4(0x1b1)][_0x2c32e4(0x1ad)]['document'] ||
        tinymce['activeEditor'][_0x2c32e4(0x1e6)][_0x2c32e4(0x1e3)],
      _0x514b20 = iTeXEQ['removeSVG'](
        _0x2a54e1[_0x2c32e4(0x175)](_0x2c32e4(0x194)),
      );
    if (!_0x514b20) return console[_0x2c32e4(0x184)](_0x2c32e4(0x200)), ![];
    const _0x4a8a04 = [
        'tag_bigcontent',
        _0x2c32e4(0x1ff),
        'tag_exam',
        _0x2c32e4(0x1e2),
        _0x2c32e4(0x1d7),
        'tag_choices',
        _0x2c32e4(0x1a1),
        _0x2c32e4(0x1bd),
        _0x2c32e4(0x1a7),
        _0x2c32e4(0x1f3),
        _0x2c32e4(0x1a9),
        _0x2c32e4(0x16c),
      ],
      _0x285045 = _0x514b20[_0x2c32e4(0x183)]('p');
    if (_0x285045[_0x2c32e4(0x171)] > 0x0) {
      const _0x3628c1 = _0x285045[0x0][_0x2c32e4(0x175)](
          'br[data-mce-bogus=\x221\x22]',
        ),
        _0x3f6272 = Array[_0x2c32e4(0x1f8)](_0x285045[0x0]?.[_0x2c32e4(0x185)])[
          'find'
        ]((_0x365d6b) => _0x4a8a04[_0x2c32e4(0x174)](_0x365d6b)),
        _0x4b6f46 = Array[_0x2c32e4(0x1f8)](_0x285045)[_0x2c32e4(0x1d5)](
          (_0x2f453d) =>
            _0x2f453d?.[_0x2c32e4(0x185)][_0x2c32e4(0x1d8)]('tag_exam') ||
            _0x2f453d?.['classList'][_0x2c32e4(0x1d8)](_0x2c32e4(0x1a0)) ||
            _0x2f453d?.[_0x2c32e4(0x185)][_0x2c32e4(0x1d8)](_0x2c32e4(0x1ff)),
        ),
        _0x2a1c61 = Array[_0x2c32e4(0x1f8)](_0x285045)['find']((_0x5ebdcc) =>
          _0x5ebdcc?.[_0x2c32e4(0x185)]['contains'](_0x2c32e4(0x16f)),
        );
      if (_0x3628c1) return alert(_0x2c32e4(0x1d2)), ![];
      if (!_0x3f6272)
        return alert(_0x2c32e4(0x19b)), iTeXEQ[_0x2c32e4(0x1b8)](), ![];
      if (!_0x4b6f46) return alert(_0x2c32e4(0x1fe)), ![];
    } else
      return (
        alert('No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.'),
        ![]
      );
    const _0x81c71d = _0x514b20[_0x2c32e4(0x183)](_0x2c32e4(0x1fd)),
      _0x17c8d8 = Array[_0x2c32e4(0x1f8)](_0x81c71d)[_0x2c32e4(0x1c1)](
        (_0x245ba3) => _0x245ba3[_0x2c32e4(0x179)],
      );
    try {
      const _0x3d287e = await uploadImageToServer(img_save_type, _0x17c8d8);
      _0x3d287e[_0x2c32e4(0x1a2)]((_0x2b3d93, _0x17365e) => {
        const _0x18cfc4 = _0x2c32e4,
          { imgUUID: _0x3d27b2, imgURL: _0x44a9f0 } = _0x2b3d93,
          _0x10cf15 = _0x81c71d[_0x17365e];
        _0x10cf15[_0x18cfc4(0x1eb)](_0x18cfc4(0x18e), _0x3d27b2),
          console[_0x18cfc4(0x16e)]('(적용전)img.src:\x20', _0x10cf15['src']),
          console[_0x18cfc4(0x16e)](_0x18cfc4(0x18b), _0x44a9f0);
        if (img_save_type === 0x1)
          _0x10cf15[_0x18cfc4(0x1eb)](
            _0x18cfc4(0x179),
            dream_server_url + _0x44a9f0,
          );
        else {
          if (img_save_type === 0x2)
            _0x10cf15[_0x18cfc4(0x1eb)]('src', _0x44a9f0);
          else
            img_save_type === 0x3 &&
              _0x10cf15[_0x18cfc4(0x1eb)](_0x18cfc4(0x179), _0x44a9f0);
        }
        console[_0x18cfc4(0x16e)](
          _0x18cfc4(0x1fb),
          _0x10cf15[_0x18cfc4(0x179)],
        ),
          _0x10cf15[_0x18cfc4(0x1ae)]('data-mce-src');
      });
    } catch (_0x5cbfc) {
      _0x81c71d[_0x2c32e4(0x1a2)]((_0x4dbb91) => {
        const _0x3506f2 = _0x2c32e4;
        console[_0x3506f2(0x184)](
          _0x3506f2(0x1be),
          _0x4dbb91[_0x3506f2(0x179)],
          _0x5cbfc,
        );
      });
    }
    const _0x55c2c3 = _0x514b20[_0x2c32e4(0x1a3)],
      _0x519454 = {
        tag_group: _0x55c2c3,
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
      _0x4103ae = new DOMParser(),
      _0x393446 = _0x4103ae['parseFromString'](_0x55c2c3, _0x2c32e4(0x177));
    let _0x52e345 = null,
      _0x41421a = '';
    if (!_0x393446[_0x2c32e4(0x194)])
      return console[_0x2c32e4(0x184)](_0x2c32e4(0x186)), ![];
    const _0x5ae053 = (_0x3dca32, _0x5af1aa) => {
      const _0x40b704 = _0x2c32e4;
      Array[_0x40b704(0x198)](_0x519454[_0x3dca32]) &&
        _0x519454[_0x3dca32][_0x40b704(0x1cc)](_0x5af1aa);
    };
    Array['from'](_0x393446[_0x2c32e4(0x194)][_0x2c32e4(0x192)])[
      _0x2c32e4(0x1a2)
    ]((_0x4c685c) => {
      const _0x5127 = _0x2c32e4;
      if (_0x4c685c[_0x5127(0x188)] === Node[_0x5127(0x16d)]) {
        const _0x49b560 = Array['from'](_0x4c685c?.[_0x5127(0x185)]),
          _0x4fe3e7 = _0x49b560['find']((_0x2b9a79) =>
            _0x4a8a04[_0x5127(0x174)](_0x2b9a79),
          );
        if (_0x4fe3e7)
          _0x52e345 && _0x5ae053(_0x52e345, _0x41421a),
            (_0x52e345 = _0x4fe3e7),
            (_0x41421a = _0x4c685c[_0x5127(0x1f0)]);
        else _0x52e345 && (_0x41421a += _0x4c685c['outerHTML']);
      }
    });
    _0x52e345 && _0x5ae053(_0x52e345, _0x41421a);
    const _0x1a1021 = JSON[_0x2c32e4(0x1c3)](_0x519454, null, 0x2);
    return iTeXEQ[_0x2c32e4(0x1b8)](), clearEditorContent(), _0x1a1021;
  } catch (_0x448813) {
    return console[_0x2c32e4(0x184)](_0x2c32e4(0x1cf), _0x448813), ![];
  }
};
function hml_upload(_0x366094) {
  const _0x1c4d52 = _0x40dce5;
  var _0x196db6 = new FormData();
  _0x196db6[_0x1c4d52(0x1c0)]('file_name', _0x366094[_0x1c4d52(0x18d)]),
    _0x196db6[_0x1c4d52(0x1c0)](_0x1c4d52(0x1b0), _0x366094),
    _0x196db6[_0x1c4d52(0x1c0)](_0x1c4d52(0x1df), img_save_type),
    _0x196db6['append'](_0x1c4d52(0x199), dream_server_url);
  var _0x134a93 = new XMLHttpRequest();
  _0x134a93[_0x1c4d52(0x1fc)](
    _0x1c4d52(0x1c4),
    dream_server_url + _0x1c4d52(0x1ca),
    !![],
  ),
    _0x134a93[_0x1c4d52(0x1db)](_0x196db6),
    (_0x134a93['onreadystatechange'] = function () {
      const _0x49b7a6 = _0x1c4d52;
      if (
        _0x134a93[_0x49b7a6(0x181)] == 0x4 &&
        _0x134a93[_0x49b7a6(0x1dd)] == 0xc8
      ) {
        const _0x18279f = document[_0x49b7a6(0x175)](_0x49b7a6(0x1b2));
        var _0xa24ed5 = JSON[_0x49b7a6(0x18c)](_0x134a93['responseText']);
        (_0x18279f['innerHTML'] = _0xa24ed5[_0x49b7a6(0x1de)]),
          document[_0x49b7a6(0x175)]('.origin_img_area')?.[_0x49b7a6(0x185)][
            _0x49b7a6(0x172)
          ](_0x49b7a6(0x1ec)),
          iTeXEQ[_0x49b7a6(0x17e)](_0x18279f),
          (document['getElementById']('modal_block')[_0x49b7a6(0x1ab)][
            _0x49b7a6(0x1e7)
          ] = _0x49b7a6(0x1ea)),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
function _0x3f14(_0x567635, _0x109b39) {
  const _0x586c74 = _0x586c();
  return (
    (_0x3f14 = function (_0x3f142e, _0x243625) {
      _0x3f142e = _0x3f142e - 0x16b;
      let _0x4e5762 = _0x586c74[_0x3f142e];
      return _0x4e5762;
    }),
    _0x3f14(_0x567635, _0x109b39)
  );
}
let lastClickedBoxId = null,
  currentEditorContent = '';
function htmlStringToNode(_0x199174) {
  const _0x4267ad = _0x40dce5;
  var _0x56f42d = document[_0x4267ad(0x1e1)](_0x4267ad(0x1c2));
  return (_0x56f42d['innerHTML'] = _0x199174), _0x56f42d[_0x4267ad(0x170)];
}
async function hml_edit_finish() {
  const _0x39ab85 = _0x40dce5;
  if (!lastClickedBoxId) {
    console[_0x39ab85(0x184)](_0x39ab85(0x1f5));
    return;
  }
  const _0x5a5cf0 = tinymce[_0x39ab85(0x189)](_0x39ab85(0x19a))[
      _0x39ab85(0x203)
    ](),
    _0x309b20 = document['querySelector']('.itex_hml_convert_view'),
    _0x28ed28 = document[_0x39ab85(0x1bf)](lastClickedBoxId);
  if (_0x28ed28) {
    const _0x4de8dc = htmlStringToNode(_0x5a5cf0);
    try {
      const _0x484afb = await iTeXDBW_mathrender_hml(_0x4de8dc),
        _0x4f5950 = document['createElement']('div');
      _0x4f5950[_0x39ab85(0x19e)](_0x484afb),
        (_0x28ed28['outerHTML'] = _0x4f5950[_0x39ab85(0x1a3)]),
        iTeXEQ[_0x39ab85(0x17e)](_0x309b20),
        tinymce[_0x39ab85(0x189)](_0x39ab85(0x19a))['setContent'](''),
        (lastClickedBoxId = null),
        (currentEditorContent = '');
    } catch (_0x9f7d70) {
      console[_0x39ab85(0x184)](_0x39ab85(0x17f), _0x9f7d70);
    }
  } else console[_0x39ab85(0x184)](_0x39ab85(0x1a6));
}
async function hml_upload_frame(_0x291c24) {
  const _0x171c69 = _0x40dce5;
  document[_0x171c69(0x1bf)](_0x171c69(0x1ef))['style'][_0x171c69(0x1e7)] =
    'block';
  var _0x346437 = new FormData();
  _0x346437[_0x171c69(0x1c0)]('file_name', _0x291c24[_0x171c69(0x18d)]),
    _0x346437[_0x171c69(0x1c0)](_0x171c69(0x1b0), _0x291c24),
    _0x346437['append'](_0x171c69(0x1df), img_save_type),
    _0x346437[_0x171c69(0x1c0)](_0x171c69(0x199), dream_server_url);
  var _0x4958d8 = new XMLHttpRequest();
  _0x4958d8[_0x171c69(0x1fc)](
    'POST',
    dream_server_url + '/qnapi_dream/hml_upload',
    !![],
  ),
    _0x4958d8[_0x171c69(0x1db)](_0x346437),
    (_0x4958d8[_0x171c69(0x17a)] = async function () {
      const _0x78fda5 = _0x171c69;
      if (
        _0x4958d8[_0x78fda5(0x181)] == 0x4 &&
        _0x4958d8[_0x78fda5(0x1dd)] == 0xc8
      ) {
        const _0x35c4bf = document[_0x78fda5(0x175)](_0x78fda5(0x1b2));
        var _0x130416 = JSON[_0x78fda5(0x18c)](_0x4958d8[_0x78fda5(0x17c)]);
        const _0x4364c5 = iTeX_hml_tag_parser(_0x130416[_0x78fda5(0x1de)]);
        (_0x35c4bf[_0x78fda5(0x1a3)] = _0x4364c5),
          _0x35c4bf[_0x78fda5(0x196)]('click', async function (_0x78448f) {
            const _0x217d1e = _0x78fda5;
            if (_0x78448f[_0x217d1e(0x1d4)][_0x217d1e(0x1d6)]('.exam_box')) {
              const _0x2779fd = _0x78448f['target']['closest'](
                  _0x217d1e(0x182),
                ),
                _0x160502 = _0x2779fd[_0x217d1e(0x1b4)]('id');
              lastClickedBoxId &&
                tinymce[_0x217d1e(0x189)](_0x217d1e(0x19a))[
                  _0x217d1e(0x203)
                ]() !== currentEditorContent &&
                confirm(_0x217d1e(0x202)) &&
                (await hml_edit_finish());
              const _0x468489 = htmlStringToNode(_0x2779fd['outerHTML']);
              lastClickedBoxId = _0x160502;
              try {
                const _0x926554 = await iTeXDBW_mathrender_hml(_0x468489),
                  _0xe5d312 = document[_0x217d1e(0x1e1)](_0x217d1e(0x1bc));
                _0xe5d312[_0x217d1e(0x19e)](_0x926554),
                  tinymce['get'](_0x217d1e(0x19a))['setContent'](
                    _0xe5d312[_0x217d1e(0x1a3)],
                  ),
                  (currentEditorContent = _0xe5d312[_0x217d1e(0x1a3)]);
              } catch (_0x1155e3) {
                console['error']('Error\x20in\x20math\x20render:', _0x1155e3);
              }
              iTeXEQ['recoverynew']();
            }
          }),
          document[_0x78fda5(0x175)](_0x78fda5(0x1ed))?.[_0x78fda5(0x185)][
            _0x78fda5(0x172)
          ]('itex_area_hidden'),
          iTeXEQ['recoverynew_no_click'](_0x35c4bf),
          (document[_0x78fda5(0x1bf)]('modal_block')[_0x78fda5(0x1ab)][
            'display'
          ] = _0x78fda5(0x1ea));
      }
    });
}
window[_0x40dce5(0x204)] = async function () {
  const _0x30b3ba = _0x40dce5,
    _0x1ef6b1 = document['querySelector'](_0x30b3ba(0x1b2))[_0x30b3ba(0x1dc)](
      !![],
    );
  if (!_0x1ef6b1['hasChildNodes']()) {
    alert('문서를\x20업로드\x20하세요.');
    return;
  }
  const _0x585c0d = tinymce[_0x30b3ba(0x189)](_0x30b3ba(0x19a))[
    _0x30b3ba(0x203)
  ]();
  if (_0x585c0d[_0x30b3ba(0x1b9)]() !== '') {
    const _0x2e8393 = confirm(_0x30b3ba(0x1b5));
    if (!_0x2e8393) return;
  }
  if (_0x1ef6b1) {
    const _0x37adb3 = _0x1ef6b1[_0x30b3ba(0x183)](_0x30b3ba(0x182)),
      _0x55a4ac = [],
      _0x2b3f8b = _0x1ef6b1[_0x30b3ba(0x183)](_0x30b3ba(0x1fd)),
      _0x2359a3 = Array[_0x30b3ba(0x1f8)](_0x2b3f8b)[_0x30b3ba(0x1c1)](
        (_0x27cabb) => _0x27cabb[_0x30b3ba(0x179)],
      );
    try {
      const _0x2e7b71 = await uploadImageToServer(img_save_type, _0x2359a3);
      _0x2e7b71[_0x30b3ba(0x1a2)]((_0x37c9e4, _0xdd8a6a) => {
        const _0x7b393e = _0x30b3ba,
          { imgUUID: _0x2e3e89, imgURL: _0x20bb68 } = _0x37c9e4,
          _0x2469fd = _0x2b3f8b[_0xdd8a6a];
        _0x2469fd[_0x7b393e(0x1eb)](_0x7b393e(0x18e), _0x2e3e89),
          console[_0x7b393e(0x16e)]('(적용전)img.src:\x20', _0x2469fd['src']);
        if (img_save_type === 0x1)
          _0x2469fd['setAttribute'](
            _0x7b393e(0x179),
            dream_server_url + _0x20bb68,
          );
        else {
          if (img_save_type === 0x2)
            _0x2469fd[_0x7b393e(0x1eb)](_0x7b393e(0x179), _0x20bb68);
          else
            img_save_type === 0x3 &&
              _0x2469fd['setAttribute'](_0x7b393e(0x179), _0x20bb68);
        }
        _0x2469fd[_0x7b393e(0x1ae)](_0x7b393e(0x191)),
          console[_0x7b393e(0x16e)](_0x7b393e(0x1fb), _0x2469fd['src']);
      });
    } catch (_0x2e2b76) {
      console[_0x30b3ba(0x184)](_0x30b3ba(0x1be), _0x2e2b76);
    }
    return (
      _0x37adb3[_0x30b3ba(0x1a2)]((_0x510442, _0xe5034c) => {
        const _0x2c3b90 = _0x30b3ba,
          _0x41915f = [];
        let _0x54e64f = 0x1;
        const _0x3b8ee4 = _0x510442[_0x2c3b90(0x183)]('p');
        _0x3b8ee4['forEach']((_0x11d2cd) => {
          const _0x4e5068 = _0x2c3b90,
            _0xb85716 = _0x11d2cd?.[_0x4e5068(0x185)];
          let _0x496fe0 = null;
          if (_0xb85716[_0x4e5068(0x1d8)](_0x4e5068(0x1a0)))
            _0x496fe0 = _0x4e5068(0x18f);
          else {
            if (_0xb85716['contains'](_0x4e5068(0x1ff)))
              _0x496fe0 = _0x4e5068(0x1e9);
            else {
              if (_0xb85716[_0x4e5068(0x1d8)](_0x4e5068(0x178)))
                _0x496fe0 = _0x4e5068(0x1ba);
              else {
                if (_0xb85716[_0x4e5068(0x1d8)](_0x4e5068(0x1e2)))
                  _0x496fe0 = _0x4e5068(0x1cb);
                else {
                  if (_0xb85716['contains'](_0x4e5068(0x1d7)))
                    _0x496fe0 = _0x4e5068(0x1e4);
                  else {
                    if (_0xb85716[_0x4e5068(0x1d8)](_0x4e5068(0x1d9)))
                      _0x496fe0 = _0x4e5068(0x1bb);
                    else {
                      if (_0xb85716['contains'](_0x4e5068(0x1a1)))
                        _0x496fe0 = _0x4e5068(0x18a);
                      else {
                        if (_0xb85716[_0x4e5068(0x1d8)](_0x4e5068(0x1bd)))
                          _0x496fe0 = _0x4e5068(0x180);
                        else {
                          if (_0xb85716['contains'](_0x4e5068(0x1a7)))
                            _0x496fe0 = _0x4e5068(0x1f7);
                          else {
                            if (_0xb85716[_0x4e5068(0x1d8)](_0x4e5068(0x1f3)))
                              _0x496fe0 = _0x4e5068(0x201);
                            else {
                              if (_0xb85716[_0x4e5068(0x1d8)](_0x4e5068(0x1a9)))
                                _0x496fe0 = _0x4e5068(0x1d3);
                              else {
                                if (_0xb85716[_0x4e5068(0x1d8)]('tag_tip'))
                                  _0x496fe0 = _0x4e5068(0x1c6);
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
          if (_0x496fe0) {
            let _0x1afc6c = _0x11d2cd[_0x4e5068(0x1f0)],
              _0x199fc9 = _0x11d2cd[_0x4e5068(0x1b3)];
            while (
              _0x199fc9 &&
              !_0x199fc9['classList'][_0x4e5068(0x1d8)](_0x4e5068(0x1a0)) &&
              !_0x199fc9[_0x4e5068(0x185)][_0x4e5068(0x1d8)](
                _0x4e5068(0x1ff),
              ) &&
              !_0x199fc9[_0x4e5068(0x185)]['contains'](_0x4e5068(0x178)) &&
              !_0x199fc9[_0x4e5068(0x185)][_0x4e5068(0x1d8)](
                _0x4e5068(0x1e2),
              ) &&
              !_0x199fc9['classList'][_0x4e5068(0x1d8)](_0x4e5068(0x1d7)) &&
              !_0x199fc9[_0x4e5068(0x185)]['contains'](_0x4e5068(0x1d9)) &&
              !_0x199fc9['classList'][_0x4e5068(0x1d8)]('tl_answer') &&
              !_0x199fc9[_0x4e5068(0x185)][_0x4e5068(0x1d8)](
                'tag_commentary',
              ) &&
              !_0x199fc9[_0x4e5068(0x185)][_0x4e5068(0x1d8)](
                _0x4e5068(0x1a7),
              ) &&
              !_0x199fc9[_0x4e5068(0x185)][_0x4e5068(0x1d8)](
                _0x4e5068(0x1f3),
              ) &&
              !_0x199fc9[_0x4e5068(0x185)][_0x4e5068(0x1d8)](
                _0x4e5068(0x1a9),
              ) &&
              !_0x199fc9[_0x4e5068(0x185)][_0x4e5068(0x1d8)]('tag_tip')
            ) {
              (_0x1afc6c += _0x199fc9[_0x4e5068(0x1f0)]),
                (_0x199fc9 = _0x199fc9['nextElementSibling']);
            }
            _0x41915f['push']({
              type: _0x496fe0,
              content: _0x1afc6c,
              sort: _0x54e64f++,
            });
          }
        }),
          _0x55a4ac[_0x2c3b90(0x1cc)]({ id: null, quizItemList: _0x41915f });
      }),
      tinymce['get'](_0x30b3ba(0x19a))[_0x30b3ba(0x1f9)](''),
      _0x55a4ac
    );
  } else return console[_0x30b3ba(0x16e)](_0x30b3ba(0x17b)), null;
};
function processHmlData(_0x3c69d0) {
  const _0x5eae59 = _0x40dce5,
    _0x191e0f = [],
    _0x4628ed = Array['from'](_0x3c69d0[_0x5eae59(0x183)]('p'));
  let _0xf34356 = [],
    _0xd4bf73 = ![];
  return (
    _0x4628ed[_0x5eae59(0x1a2)]((_0x117431) => {
      const _0x32cf86 = _0x5eae59;
      divideKey[_0x32cf86(0x174)](_0x117431[_0x32cf86(0x19d)])
        ? (_0xf34356['length'] > 0x0 &&
            (_0x191e0f[_0x32cf86(0x1cc)](
              _0xf34356[_0x32cf86(0x1c1)](
                (_0x604722) => _0x604722[_0x32cf86(0x1f0)],
              )['join'](''),
            ),
            (_0xf34356 = [])),
          _0xf34356[_0x32cf86(0x1cc)](_0x117431))
        : _0xf34356[_0x32cf86(0x1cc)](_0x117431);
    }),
    _0xf34356[_0x5eae59(0x171)] > 0x0 &&
      _0x191e0f[_0x5eae59(0x1cc)](
        _0xf34356[_0x5eae59(0x1c1)]((_0x338bd9) => _0x338bd9['outerHTML'])[
          _0x5eae59(0x1af)
        ](''),
      ),
    _0x191e0f
  );
}
window[_0x40dce5(0x196)](_0x40dce5(0x16b), (_0x49fa81) => {
  const _0x6a3c4 = _0x40dce5,
    { functionName: _0x3a5b78, args: _0x2d5bac } = _0x49fa81[_0x6a3c4(0x1a8)];
  _0x3a5b78 === _0x6a3c4(0x1f1) &&
    typeof window[_0x3a5b78] === _0x6a3c4(0x195) &&
    window[_0x3a5b78](_0x2d5bac[0x0]),
    _0x3a5b78 === _0x6a3c4(0x1f2) &&
      typeof window[_0x3a5b78] === _0x6a3c4(0x195) &&
      window[_0x3a5b78](_0x2d5bac[0x0]),
    _0x3a5b78 === _0x6a3c4(0x176) &&
      typeof window[_0x3a5b78] === _0x6a3c4(0x195) &&
      window[_0x3a5b78](_0x2d5bac[0x0]),
    _0x3a5b78 === _0x6a3c4(0x1c9) &&
      typeof window[_0x3a5b78] === 'function' &&
      window[_0x3a5b78](_0x2d5bac[0x0]);
});
function _0x586c() {
  const _0x1459df = [
    'img',
    '문제\x20or\x20대발문\x20or\x20지문\x20태그가\x20필요합니다!',
    'tag_content',
    'No\x20data\x20found\x20in\x20the\x20parsed\x20document.',
    'CONCEPT',
    '변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.',
    'getContent',
    'saveHmlData',
    'message',
    'tag_tip',
    'ELEMENT_NODE',
    'log',
    'tag_group',
    'content',
    'length',
    'add',
    '1651642VOyenk',
    'includes',
    'querySelector',
    'getExamCodenum',
    'text/html',
    'tag_exam',
    'src',
    'onreadystatechange',
    '데이터가\x20존재하지\x20않습니다.',
    'responseText',
    '751240VmfdeW',
    'recoverynew_no_click',
    'Error\x20in\x20math\x20render:',
    'COMMENTARY',
    'readyState',
    '.exam_box',
    'querySelectorAll',
    'error',
    'classList',
    'Parsed\x20document\x20does\x20not\x20contain\x20body.',
    'editor_container',
    'nodeType',
    'get',
    'ANSWER',
    '적용할\x20src:\x20',
    'parse',
    'name',
    'Img_code',
    'BIG',
    'para0',
    'data-mce-src',
    'childNodes',
    '[그룹]',
    'body',
    'function',
    'addEventListener',
    '4365990ZRaIBS',
    'isArray',
    'save_path',
    'tinyeditor',
    '내용\x20앞에\x20태그를\x20입력해\x20주세요',
    '110127Joeawo',
    'className',
    'appendChild',
    '콘텐츠\x20삽입\x20중\x20오류\x20발생:',
    'tag_bigcontent',
    'tl_answer',
    'forEach',
    'innerHTML',
    '/uploadImage',
    'json',
    '원래\x20자리를\x20찾을\x20수\x20없습니다.',
    'tag_hint',
    'data',
    'tag_title',
    'img_url_list',
    'style',
    'parseFromString',
    'contentWindow',
    'removeAttribute',
    'join',
    'file',
    'activeEditor',
    '.itex_hml_convert_view',
    'nextElementSibling',
    'getAttribute',
    '에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?',
    '6lMqGzk',
    'match',
    'latexrecovery',
    'trim',
    'QUESTION',
    'CHOICES',
    'div',
    'tag_commentary',
    'Error\x20processing\x20image:',
    'getElementById',
    'append',
    'map',
    'template',
    'stringify',
    'POST',
    'Error\x20uploading\x20image',
    'TIP',
    'textContent',
    'remove',
    'saveExamData',
    '/qnapi_dream/hml_upload',
    'SMALL',
    'push',
    'exam_box',
    'usePostJsonData',
    'Error\x20while\x20saving\x20exam\x20data:',
    '7583337ixcFeV',
    'contenteditable',
    '내용\x20앞에\x20태그를\x20입력해주세요.',
    'TITLE',
    'target',
    'find',
    'closest',
    'tag_example',
    'contains',
    'tag_choices',
    'false',
    'send',
    'cloneNode',
    'status',
    'itexdata',
    'img_save_type',
    'exam_box_',
    'createElement',
    'tag_exam_sm',
    'document',
    'EXAMPLE',
    'replace',
    'contentDocument',
    'display',
    '104uBoQRZ',
    'TEXT',
    'none',
    'setAttribute',
    'itex_area_hidden',
    '.origin_img_area',
    'display_inactive',
    'modal_block',
    'outerHTML',
    'setExamData',
    'setExamList',
    'tag_concept',
    '11377Ymnrmf',
    '수정할\x20요소가\x20선택되지\x20않았습니다.',
    'selection',
    'HINT',
    'from',
    'setContent',
    '6001664FPoiJP',
    '(적용후)img.src:\x20',
    'open',
  ];
  _0x586c = function () {
    return _0x1459df;
  };
  return _0x586c();
}
function iTeX_hml_tag_parser(_0x29f736) {
  const _0x4aeebb = _0x40dce5,
    _0x4a63c3 = new DOMParser(),
    _0x368030 = _0x4a63c3[_0x4aeebb(0x1ac)](_0x29f736, _0x4aeebb(0x177)),
    _0x51c0b4 = _0x368030[_0x4aeebb(0x183)]('p'),
    _0x397a9b = {
      그룹: _0x4aeebb(0x16f),
      대발문: 'tag_bigcontent',
      지문: _0x4aeebb(0x1ff),
      문제: 'tag_exam',
      소문제: _0x4aeebb(0x1e2),
      보기: _0x4aeebb(0x1d7),
      선지: _0x4aeebb(0x1d9),
      정답: 'tl_answer',
      해설: _0x4aeebb(0x1bd),
      힌트: 'tag_hint',
      개념: _0x4aeebb(0x1f3),
      제목: _0x4aeebb(0x1a9),
      팁: 'tag_tip',
    };
  let _0x534951 = '',
    _0x4876ca = null,
    _0x504b5b = 0x0,
    _0x5bd9d8 = ![];
  _0x51c0b4[_0x4aeebb(0x1a2)]((_0x167c25, _0x3f5d3c) => {
    const _0x1fb6eb = _0x4aeebb;
    _0x167c25[_0x1fb6eb(0x1ae)]('style');
    let _0x33b465 = _0x167c25[_0x1fb6eb(0x1c7)][_0x1fb6eb(0x1b9)]();
    const _0x3f102f = _0x33b465[_0x1fb6eb(0x1b7)](/^\[(.*?)\]$/);
    if (_0x3f102f) {
      const _0x284041 = _0x3f102f[0x1][_0x1fb6eb(0x1e5)](/\s+/g, '');
      if (_0x284041 in _0x397a9b) {
        _0x167c25?.[_0x1fb6eb(0x185)][_0x1fb6eb(0x172)](_0x397a9b[_0x284041]),
          _0x167c25[_0x1fb6eb(0x1eb)](_0x1fb6eb(0x1d1), 'false');
        if (_0x397a9b[_0x284041] === _0x1fb6eb(0x16f))
          _0x5bd9d8
            ? (_0x5bd9d8 = ![])
            : (_0x4876ca &&
                ((_0x534951 += _0x4876ca[_0x1fb6eb(0x1f0)]),
                (_0x4876ca = null)),
              (_0x4876ca = document[_0x1fb6eb(0x1e1)]('div')),
              _0x4876ca?.[_0x1fb6eb(0x185)][_0x1fb6eb(0x172)](_0x1fb6eb(0x1cd)),
              _0x4876ca[_0x1fb6eb(0x1eb)]('id', _0x1fb6eb(0x1e0) + _0x504b5b++),
              (_0x5bd9d8 = !![]));
        else {
          if (_0x397a9b[_0x284041] === _0x1fb6eb(0x178)) {
            if (_0x5bd9d8) {
            } else
              _0x4876ca &&
                ((_0x534951 += _0x4876ca['outerHTML']), (_0x4876ca = null)),
                (_0x4876ca = document[_0x1fb6eb(0x1e1)]('div')),
                _0x4876ca?.[_0x1fb6eb(0x185)][_0x1fb6eb(0x172)](
                  _0x1fb6eb(0x1cd),
                ),
                _0x4876ca[_0x1fb6eb(0x1eb)]('id', 'exam_box_' + _0x504b5b++);
          }
        }
      }
    }
    _0x4876ca && _0x4876ca[_0x1fb6eb(0x19e)](_0x167c25);
  });
  if (_0x4876ca) {
    if (_0x5bd9d8) {
      const _0x249e23 = document[_0x4aeebb(0x1e1)]('p');
      _0x249e23[_0x4aeebb(0x185)][_0x4aeebb(0x172)](
        _0x4aeebb(0x190),
        'tag_group',
      ),
        _0x249e23[_0x4aeebb(0x1eb)]('contenteditable', _0x4aeebb(0x1da)),
        (_0x249e23['textContent'] = _0x4aeebb(0x193)),
        _0x4876ca[_0x4aeebb(0x19e)](_0x249e23),
        (_0x534951 += _0x4876ca[_0x4aeebb(0x1f0)]);
    } else _0x534951 += _0x4876ca[_0x4aeebb(0x1f0)];
  }
  return _0x534951;
}
