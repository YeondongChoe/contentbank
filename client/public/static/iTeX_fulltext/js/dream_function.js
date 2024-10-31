/* eslint-disable no-func-assign */
/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
const _0xd87c5c = _0x50fc;
(function (_0x3b607f, _0x2d2ad4) {
  const _0x937fa7 = _0x50fc,
    _0x5bf381 = _0x3b607f();
  while ([]) {
    try {
      const _0x296c0c =
        -parseInt(_0x937fa7(0x1f5)) / 0x1 +
        (parseInt(_0x937fa7(0x166)) / 0x2) *
          (-parseInt(_0x937fa7(0x1c5)) / 0x3) +
        (parseInt(_0x937fa7(0x199)) / 0x4) *
          (parseInt(_0x937fa7(0x187)) / 0x5) +
        -parseInt(_0x937fa7(0x193)) / 0x6 +
        parseInt(_0x937fa7(0x1a6)) / 0x7 +
        (parseInt(_0x937fa7(0x1f7)) / 0x8) *
          (-parseInt(_0x937fa7(0x1cb)) / 0x9) +
        (parseInt(_0x937fa7(0x175)) / 0xa) * (parseInt(_0x937fa7(0x1b5)) / 0xb);
      if (_0x296c0c === _0x2d2ad4) break;
      else _0x5bf381['push'](_0x5bf381['shift']());
    } catch (_0x57060f) {
      _0x5bf381['push'](_0x5bf381['shift']());
    }
  }
})(_0x1448, 0xb12de),
  (window[_0xd87c5c(0x1c9)] = (_0xac226) => {
    const _0x1b9855 = _0xd87c5c,
      _0x5ce8db = document[_0x1b9855(0x1d5)](iTeXEQ['editor_container']);
    function _0x175fef() {
      const _0x11da79 = _0x1b9855;
      (onlyEQ = !![]),
        (onlyEQNode = _0xac226),
        _0x5ce8db?.[_0x11da79(0x17a)][_0x11da79(0x1c8)]('display_inactive'),
        iTeXEQ[_0x11da79(0x1f3)]();
    }
    function _0x998a4a() {
      const _0x1014e5 = _0x1b9855;
      (onlyEQ = ![]),
        (onlyEQNode = ''),
        _0x5ce8db?.[_0x1014e5(0x17a)][_0x1014e5(0x1bb)](_0x1014e5(0x1ad));
    }
    _0x5ce8db?.[_0x1b9855(0x17a)][_0x1b9855(0x19f)](_0x1b9855(0x1ad))
      ? _0x175fef()
      : _0x998a4a();
  }),
  (window['usePostJsonData'] = function setExamData(_0x5a2511) {
    const _0x4aaef7 = _0xd87c5c;
    try {
      const _0x3f1a90 = tinymce['get'](_0x4aaef7(0x1a8));
      return _0x3f1a90
        ? (_0x3f1a90['selection']['setContent'](_0x5a2511), !![])
        : (console[_0x4aaef7(0x1b7)](_0x4aaef7(0x1e8)), ![]);
    } catch (_0x1df935) {
      return (
        console[_0x4aaef7(0x1b7)](
          '콘텐츠\x20삽입\x20중\x20오류\x20발생:',
          _0x1df935,
        ),
        ![]
      );
    }
  });
async function uploadImageToServer(_0x559e9a, _0x285a1a) {
  const _0x507f7a = _0xd87c5c,
    _0x16d945 = new FormData(),
    _0x1ad5ad = await fetch(_0x285a1a),
    _0x4fd8e0 = await _0x1ad5ad[_0x507f7a(0x1c6)]();
  _0x16d945['append']('file', _0x4fd8e0, _0x507f7a(0x1be)),
    _0x16d945['append'](_0x507f7a(0x1a3), img_save_type),
    _0x16d945[_0x507f7a(0x1e7)](_0x507f7a(0x1c7), dream_server_url);
  const _0x3b2810 = await fetch(dream_server_url + '/uploadImage', {
    method: _0x507f7a(0x1f9),
    body: _0x16d945,
  });
  if (!_0x3b2810['ok']) throw new Error(_0x507f7a(0x1b8));
  const _0x12bf7e = await _0x3b2810[_0x507f7a(0x196)]();
  return console[_0x507f7a(0x178)](_0x507f7a(0x18f), _0x12bf7e), _0x12bf7e;
}
function _0x1448() {
  const _0x44228a = [
    'function',
    'parse',
    'CONCEPT',
    'file',
    'document',
    'data:\x20',
    'CHOICES',
    'innerHTML',
    'includes',
    '6483030gMFTiv',
    'send',
    'contentWindow',
    'json',
    'EXAMPLE',
    'tag_example',
    '16GlyWgL',
    'modal_block',
    'readyState',
    'br[data-mce-bogus=\x221\x22]',
    'img_url:\x20',
    'Parsed\x20document\x20does\x20not\x20contain\x20body.',
    'contains',
    'stringify',
    '문서를\x20업로드\x20하세요.',
    'name',
    'img_save_type',
    'template',
    'tl_answer',
    '7690123ATJZZG',
    '문제\x20태그가\x20필요합니다!',
    'tinyeditor',
    'TIP',
    'Error\x20in\x20math\x20render:',
    'forEach',
    'data',
    'display_inactive',
    'trim',
    'appendChild',
    'No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.',
    'body',
    'itexdata',
    'tag_tip',
    'childNodes',
    '18701507doAHqq',
    'text/html',
    'error',
    'Error\x20uploading\x20image',
    'status',
    'from',
    'add',
    'querySelector',
    'removeAttribute',
    'image.png',
    '.origin_img_area',
    'none',
    'tag_choices',
    'itex_area_hidden',
    'onreadystatechange',
    'open',
    '1524525WIYKgg',
    'blob',
    'save_path',
    'remove',
    'openEQ',
    'src',
    '9oHRDEi',
    'tag_hint',
    'recoverynew_no_click',
    'saveExamData',
    '내용\x20앞에\x20태그를\x20입력해\x20주세요',
    'div',
    'getExamCodenum',
    '데이터가\x20존재하지\x20않습니다.',
    'match',
    'ANSWER',
    'getElementById',
    '.exam_box',
    'tag_exam_sm',
    'createElement',
    'file_name',
    'addEventListener',
    'removeSVG',
    '변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.',
    '원래\x20자리를\x20찾을\x20수\x20없습니다.',
    'ELEMENT_NODE',
    'tag_bigcontent',
    'tag_concept',
    'saveHmlData',
    'TEXT',
    'map',
    'setExamData',
    'hml_upload\x20들옴',
    'contenteditable',
    'append',
    'ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.',
    'push',
    'length',
    'exam_box',
    'target',
    'No\x20data\x20found\x20in\x20the\x20parsed\x20document.',
    'setContent',
    'QUESTION',
    'activeEditor',
    'isArray',
    '.itex_hml_convert_view',
    'editorStart',
    'latexrecovery',
    '583884vgsdBV',
    'responseText',
    '797536MijvYD',
    '내용을\x20입력해주세요.',
    'POST',
    '2GMWsFt',
    'recoverynew',
    'textContent',
    'querySelectorAll',
    'tag_group',
    'find',
    'nextElementSibling',
    'display',
    'HINT',
    'className',
    'get',
    'setAttribute',
    'hasChildNodes',
    'getContent',
    '/qnapi_dream/hml_upload',
    '10iJgpKC',
    'tag_commentary',
    'TITLE',
    'log',
    'tag_title',
    'classList',
    'BIG',
    'getAttribute',
    'setExamList',
    'tag_exam',
    'Error\x20while\x20saving\x20exam\x20data:',
    'click',
    'replace',
    'style',
    '에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?',
    'join',
    'outerHTML',
    'nodeType',
    '249070ldVICv',
    'tag_content',
    'closest',
  ];
  _0x1448 = function () {
    return _0x44228a;
  };
  return _0x1448();
}
function clearEditorContent() {
  const _0x78c9b1 = _0xd87c5c,
    _0x359caa = tinymce[_0x78c9b1(0x170)]('tinyeditor');
  _0x359caa
    ? _0x359caa[_0x78c9b1(0x1ee)]('')
    : console['error']('Editor\x20not\x20found');
}
window[_0xd87c5c(0x1ce)] = async function () {
  const _0x15289d = _0xd87c5c;
  try {
    const _0xbc4ef5 =
        tinymce[_0x15289d(0x1f0)][_0x15289d(0x195)][_0x15289d(0x18e)] ||
        tinymce[_0x15289d(0x1f0)]['contentDocument'][_0x15289d(0x18e)],
      _0x275d4c = iTeXEQ[_0x15289d(0x1db)](
        _0xbc4ef5['querySelector'](_0x15289d(0x1b1)),
      );
    if (!_0x275d4c) return console[_0x15289d(0x1b7)](_0x15289d(0x1ed)), ![];
    const _0x2a9136 = [
        _0x15289d(0x1df),
        _0x15289d(0x188),
        'tag_exam',
        _0x15289d(0x1d7),
        _0x15289d(0x198),
        'tag_choices',
        _0x15289d(0x1a5),
        _0x15289d(0x176),
        _0x15289d(0x1cc),
        _0x15289d(0x1e0),
        'tag_title',
        _0x15289d(0x1b3),
      ],
      _0x206ab4 = _0x275d4c[_0x15289d(0x169)]('p');
    if (_0x206ab4) {
      const _0x4b4a59 = _0x206ab4[0x0]['querySelector'](_0x15289d(0x19c)),
        _0xe48ed5 = Array['from'](_0x206ab4[0x0]?.['classList'])[
          _0x15289d(0x16b)
        ]((_0xf9d19) => _0x2a9136['includes'](_0xf9d19)),
        _0x1b480d = Array[_0x15289d(0x1ba)](_0x206ab4)['find']((_0x399bd8) =>
          _0x399bd8?.[_0x15289d(0x17a)][_0x15289d(0x19f)](_0x15289d(0x17e)),
        ),
        _0xa58319 = Array['from'](_0x206ab4)['find']((_0x43e846) =>
          _0x43e846?.[_0x15289d(0x17a)]['contains'](_0x15289d(0x16a)),
        );
      if (_0x4b4a59) return alert(_0x15289d(0x1f8)), ![];
      if (!_0xe48ed5)
        return alert(_0x15289d(0x1cf)), iTeXEQ[_0x15289d(0x1f4)](), ![];
      if (!_0x1b480d) return alert(_0x15289d(0x1a7)), ![];
    } else return alert(_0x15289d(0x1b0)), ![];
    const _0xd31c31 = _0x275d4c[_0x15289d(0x169)]('img');
    for (const _0xc4a1ab of _0xd31c31) {
      try {
        const { imgUUID: _0x23d2a1, imgURL: _0x63a439 } =
          await uploadImageToServer(_0xc4a1ab['src']);
        console[_0x15289d(0x178)](
          _0x15289d(0x19d),
          dream_server_url + _0x63a439,
        ),
          _0xc4a1ab[_0x15289d(0x171)]('Img_code', _0x23d2a1),
          _0xc4a1ab['setAttribute'](
            _0x15289d(0x1ca),
            dream_server_url + _0x63a439,
          );
      } catch (_0x3b1caf) {
        console[_0x15289d(0x1b7)](
          'Error\x20processing\x20image:',
          _0xc4a1ab[_0x15289d(0x1ca)],
          _0x3b1caf,
        );
      }
    }
    const _0x5e53f4 = {
        tag_group: _0x275d4c[_0x15289d(0x191)],
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
      _0x2c45bc = new DOMParser(),
      _0x5b2c9e = _0x2c45bc['parseFromString'](
        _0x275d4c[_0x15289d(0x191)],
        _0x15289d(0x1b6),
      );
    let _0x2178eb = null,
      _0x41bb55 = '';
    if (!_0x5b2c9e[_0x15289d(0x1b1)])
      return console[_0x15289d(0x1b7)](_0x15289d(0x19e)), ![];
    const _0x6190e4 = (_0x2e0ad6, _0x283346) => {
      const _0x102abb = _0x15289d;
      Array[_0x102abb(0x1f1)](_0x5e53f4[_0x2e0ad6]) &&
        _0x5e53f4[_0x2e0ad6]['push'](_0x283346);
    };
    Array[_0x15289d(0x1ba)](_0x5b2c9e[_0x15289d(0x1b1)][_0x15289d(0x1b4)])[
      _0x15289d(0x1ab)
    ]((_0x4e4053) => {
      const _0x12d888 = _0x15289d;
      if (_0x4e4053[_0x12d888(0x186)] === Node[_0x12d888(0x1de)]) {
        const _0x5b0edf = Array[_0x12d888(0x1ba)](
            _0x4e4053?.[_0x12d888(0x17a)],
          ),
          _0x5610ff = _0x5b0edf['find']((_0x20b0cc) =>
            _0x2a9136[_0x12d888(0x192)](_0x20b0cc),
          );
        if (_0x5610ff)
          _0x2178eb && _0x6190e4(_0x2178eb, _0x41bb55),
            (_0x2178eb = _0x5610ff),
            (_0x41bb55 = _0x4e4053[_0x12d888(0x185)]);
        else _0x2178eb && (_0x41bb55 += _0x4e4053[_0x12d888(0x185)]);
      }
    });
    _0x2178eb && _0x6190e4(_0x2178eb, _0x41bb55);
    const _0x4539fc = JSON[_0x15289d(0x1a0)](_0x5e53f4, null, 0x2);
    return iTeXEQ[_0x15289d(0x1f4)](), clearEditorContent(), _0x4539fc;
  } catch (_0x36595f) {
    return console['error'](_0x15289d(0x17f), _0x36595f), ![];
  }
};
function _0x50fc(_0x414dd6, _0x45c298) {
  const _0x1448ae = _0x1448();
  return (
    (_0x50fc = function (_0x50fc80, _0x5e8179) {
      _0x50fc80 = _0x50fc80 - 0x166;
      let _0xa153e1 = _0x1448ae[_0x50fc80];
      return _0xa153e1;
    }),
    _0x50fc(_0x414dd6, _0x45c298)
  );
}
function hml_upload(_0x416a07) {
  const _0x5cda29 = _0xd87c5c;
  console[_0x5cda29(0x178)](_0x5cda29(0x1e5));
  var _0x48445e = new FormData();
  _0x48445e[_0x5cda29(0x1e7)](_0x5cda29(0x1d9), _0x416a07[_0x5cda29(0x1a2)]),
    _0x48445e[_0x5cda29(0x1e7)](_0x5cda29(0x18d), _0x416a07);
  var _0x3d2c88 = new XMLHttpRequest();
  _0x3d2c88[_0x5cda29(0x1c4)](
    _0x5cda29(0x1f9),
    dream_server_url + '/qnapi_dream/hml_upload',
    !![],
  ),
    _0x3d2c88['send'](_0x48445e),
    (_0x3d2c88[_0x5cda29(0x1c3)] = function () {
      const _0x489761 = _0x5cda29;
      if (
        _0x3d2c88[_0x489761(0x19b)] == 0x4 &&
        _0x3d2c88[_0x489761(0x1b9)] == 0xc8
      ) {
        const _0x3b20fd = document[_0x489761(0x1bc)](_0x489761(0x1f2));
        var _0x538ad7 = JSON[_0x489761(0x18b)](_0x3d2c88[_0x489761(0x1f6)]);
        (_0x3b20fd[_0x489761(0x191)] = _0x538ad7[_0x489761(0x1b2)]),
          document[_0x489761(0x1bc)](_0x489761(0x1bf))?.['classList'][
            _0x489761(0x1bb)
          ](_0x489761(0x1c2)),
          iTeXEQ[_0x489761(0x1cd)](_0x3b20fd),
          (document[_0x489761(0x1d5)]('modal_block')[_0x489761(0x182)][
            _0x489761(0x16d)
          ] = _0x489761(0x1c0)),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
let lastClickedBoxId = null,
  currentEditorContent = '';
function htmlStringToNode(_0x43be0c) {
  const _0x249f0e = _0xd87c5c;
  var _0xb7f1c8 = document['createElement'](_0x249f0e(0x1a4));
  return (_0xb7f1c8[_0x249f0e(0x191)] = _0x43be0c), _0xb7f1c8['content'];
}
async function hml_edit_finish() {
  const _0x17aa42 = _0xd87c5c;
  if (!lastClickedBoxId) {
    console['error']('수정할\x20요소가\x20선택되지\x20않았습니다.');
    return;
  }
  const _0xa3cad3 = tinymce[_0x17aa42(0x170)](_0x17aa42(0x1a8))[
      _0x17aa42(0x173)
    ](),
    _0x533462 = document['querySelector'](_0x17aa42(0x1f2)),
    _0x2effa9 = document['getElementById'](lastClickedBoxId);
  if (_0x2effa9) {
    const _0x4df5c3 = htmlStringToNode(_0xa3cad3);
    try {
      const _0x36e0cc = await iTeXDBW_mathrender_hml(_0x4df5c3),
        _0x1225f0 = document['createElement'](_0x17aa42(0x1d0));
      _0x1225f0[_0x17aa42(0x1af)](_0x36e0cc),
        (_0x2effa9[_0x17aa42(0x185)] = _0x1225f0[_0x17aa42(0x191)]),
        iTeXEQ[_0x17aa42(0x1cd)](_0x533462),
        tinymce[_0x17aa42(0x170)]('tinyeditor')[_0x17aa42(0x1ee)](''),
        (lastClickedBoxId = null),
        (currentEditorContent = '');
    } catch (_0x3b69cb) {
      console[_0x17aa42(0x1b7)](_0x17aa42(0x1aa), _0x3b69cb);
    }
  } else console[_0x17aa42(0x1b7)](_0x17aa42(0x1dd));
}
async function hml_upload_frame(_0x1bf653) {
  const _0x51ab77 = _0xd87c5c;
  console['log']('hml_upload_frame\x20들옴'),
    (document[_0x51ab77(0x1d5)]('modal_block')[_0x51ab77(0x182)]['display'] =
      'block');
  var _0x4033e8 = new FormData();
  _0x4033e8[_0x51ab77(0x1e7)](_0x51ab77(0x1d9), _0x1bf653['name']),
    _0x4033e8[_0x51ab77(0x1e7)](_0x51ab77(0x18d), _0x1bf653),
    _0x4033e8[_0x51ab77(0x1e7)](_0x51ab77(0x1a3), img_save_type),
    _0x4033e8[_0x51ab77(0x1e7)](_0x51ab77(0x1c7), dream_server_url);
  var _0x28f554 = new XMLHttpRequest();
  _0x28f554['open'](
    _0x51ab77(0x1f9),
    dream_server_url + _0x51ab77(0x174),
    !![],
  ),
    _0x28f554[_0x51ab77(0x194)](_0x4033e8),
    (_0x28f554['onreadystatechange'] = async function () {
      const _0x150734 = _0x51ab77;
      if (
        _0x28f554[_0x150734(0x19b)] == 0x4 &&
        _0x28f554[_0x150734(0x1b9)] == 0xc8
      ) {
        const _0x486f54 = document[_0x150734(0x1bc)]('.itex_hml_convert_view');
        console[_0x150734(0x178)](_0x28f554[_0x150734(0x1f6)]);
        var _0x11d687 = JSON[_0x150734(0x18b)](_0x28f554[_0x150734(0x1f6)]);
        const _0x11a476 = iTeX_hml_tag_parser(_0x11d687[_0x150734(0x1b2)]);
        (_0x486f54['innerHTML'] = _0x11a476),
          _0x486f54[_0x150734(0x1da)](
            _0x150734(0x180),
            async function (_0x1da1a0) {
              const _0x333589 = _0x150734;
              if (_0x1da1a0[_0x333589(0x1ec)]['closest']('.exam_box')) {
                const _0x536a98 =
                    _0x1da1a0[_0x333589(0x1ec)][_0x333589(0x189)]('.exam_box'),
                  _0x7e82c7 = _0x536a98[_0x333589(0x17c)]('id');
                lastClickedBoxId &&
                  tinymce[_0x333589(0x170)](_0x333589(0x1a8))[
                    _0x333589(0x173)
                  ]() !== currentEditorContent &&
                  confirm(_0x333589(0x1dc)) &&
                  (await hml_edit_finish());
                const _0x415fe0 = htmlStringToNode(_0x536a98[_0x333589(0x185)]);
                lastClickedBoxId = _0x7e82c7;
                try {
                  const _0x3339d5 = await iTeXDBW_mathrender_hml(_0x415fe0),
                    _0x14c1a2 = document[_0x333589(0x1d8)](_0x333589(0x1d0));
                  _0x14c1a2['appendChild'](_0x3339d5),
                    tinymce[_0x333589(0x170)](_0x333589(0x1a8))[
                      _0x333589(0x1ee)
                    ](_0x14c1a2[_0x333589(0x191)]),
                    (currentEditorContent = _0x14c1a2[_0x333589(0x191)]);
                } catch (_0x523c5a) {
                  console[_0x333589(0x1b7)](_0x333589(0x1aa), _0x523c5a);
                }
                iTeXEQ[_0x333589(0x167)]();
              }
            },
          ),
          document[_0x150734(0x1bc)]('.origin_img_area')?.[_0x150734(0x17a)][
            _0x150734(0x1bb)
          ](_0x150734(0x1c2)),
          iTeXEQ[_0x150734(0x1cd)](_0x486f54),
          (document[_0x150734(0x1d5)](_0x150734(0x19a))[_0x150734(0x182)][
            _0x150734(0x16d)
          ] = _0x150734(0x1c0));
      }
    });
}
window[_0xd87c5c(0x1e1)] = function () {
  const _0x3fa8a3 = _0xd87c5c,
    _0x34a79a = document['querySelector'](_0x3fa8a3(0x1f2))['cloneNode'](!![]);
  if (!_0x34a79a[_0x3fa8a3(0x172)]()) {
    alert(_0x3fa8a3(0x1a1));
    return;
  }
  const _0x45fa60 = tinymce['get']('tinyeditor')[_0x3fa8a3(0x173)]();
  if (_0x45fa60[_0x3fa8a3(0x1ae)]() !== '') {
    const _0x1e6643 = confirm(_0x3fa8a3(0x183));
    if (!_0x1e6643) return;
  }
  if (_0x34a79a) {
    const _0x44e4b3 = _0x34a79a[_0x3fa8a3(0x169)](_0x3fa8a3(0x1d6)),
      _0x45ff5e = [];
    return (
      _0x44e4b3['forEach']((_0x106b60, _0x4168d5) => {
        const _0x5f1337 = _0x3fa8a3,
          _0x5aad4d = [];
        let _0x3150a1 = 0x1;
        const _0x58f98e = _0x106b60[_0x5f1337(0x169)]('p');
        _0x58f98e[_0x5f1337(0x1ab)]((_0x4b2bba) => {
          const _0x5e987f = _0x5f1337,
            _0x5ac0ba = _0x4b2bba?.[_0x5e987f(0x17a)];
          let _0x15a45c = null;
          if (_0x5ac0ba['contains'](_0x5e987f(0x1df)))
            _0x15a45c = _0x5e987f(0x17b);
          else {
            if (_0x5ac0ba[_0x5e987f(0x19f)](_0x5e987f(0x188)))
              _0x15a45c = _0x5e987f(0x1e2);
            else {
              if (_0x5ac0ba[_0x5e987f(0x19f)](_0x5e987f(0x17e)))
                _0x15a45c = _0x5e987f(0x1ef);
              else {
                if (_0x5ac0ba[_0x5e987f(0x19f)](_0x5e987f(0x1d7)))
                  _0x15a45c = 'SMALL';
                else {
                  if (_0x5ac0ba[_0x5e987f(0x19f)](_0x5e987f(0x198)))
                    _0x15a45c = _0x5e987f(0x197);
                  else {
                    if (_0x5ac0ba[_0x5e987f(0x19f)](_0x5e987f(0x1c1)))
                      _0x15a45c = _0x5e987f(0x190);
                    else {
                      if (_0x5ac0ba['contains'](_0x5e987f(0x1a5)))
                        _0x15a45c = _0x5e987f(0x1d4);
                      else {
                        if (_0x5ac0ba[_0x5e987f(0x19f)](_0x5e987f(0x176)))
                          _0x15a45c = 'COMMENTARY';
                        else {
                          if (_0x5ac0ba[_0x5e987f(0x19f)](_0x5e987f(0x1cc)))
                            _0x15a45c = _0x5e987f(0x16e);
                          else {
                            if (_0x5ac0ba[_0x5e987f(0x19f)](_0x5e987f(0x1e0)))
                              _0x15a45c = _0x5e987f(0x18c);
                            else {
                              if (_0x5ac0ba['contains'](_0x5e987f(0x179)))
                                _0x15a45c = _0x5e987f(0x177);
                              else {
                                if (
                                  _0x5ac0ba[_0x5e987f(0x19f)](_0x5e987f(0x1b3))
                                )
                                  _0x15a45c = _0x5e987f(0x1a9);
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
          if (_0x15a45c) {
            let _0x424c62 = _0x4b2bba[_0x5e987f(0x185)],
              _0x59760c = _0x4b2bba[_0x5e987f(0x16c)];
            while (
              _0x59760c &&
              !_0x59760c['classList'][_0x5e987f(0x19f)]('tag_bigcontent') &&
              !_0x59760c[_0x5e987f(0x17a)][_0x5e987f(0x19f)](
                _0x5e987f(0x188),
              ) &&
              !_0x59760c['classList'][_0x5e987f(0x19f)](_0x5e987f(0x17e)) &&
              !_0x59760c['classList'][_0x5e987f(0x19f)](_0x5e987f(0x1d7)) &&
              !_0x59760c[_0x5e987f(0x17a)][_0x5e987f(0x19f)]('tag_example') &&
              !_0x59760c[_0x5e987f(0x17a)][_0x5e987f(0x19f)](
                _0x5e987f(0x1c1),
              ) &&
              !_0x59760c['classList'][_0x5e987f(0x19f)](_0x5e987f(0x1a5)) &&
              !_0x59760c[_0x5e987f(0x17a)][_0x5e987f(0x19f)](
                'tag_commentary',
              ) &&
              !_0x59760c[_0x5e987f(0x17a)][_0x5e987f(0x19f)](
                _0x5e987f(0x1cc),
              ) &&
              !_0x59760c['classList'][_0x5e987f(0x19f)]('tag_concept') &&
              !_0x59760c[_0x5e987f(0x17a)][_0x5e987f(0x19f)](
                _0x5e987f(0x179),
              ) &&
              !_0x59760c[_0x5e987f(0x17a)][_0x5e987f(0x19f)](_0x5e987f(0x1b3))
            ) {
              (_0x424c62 += _0x59760c[_0x5e987f(0x185)]),
                (_0x59760c = _0x59760c['nextElementSibling']);
            }
            _0x5aad4d[_0x5e987f(0x1e9)]({
              type: _0x15a45c,
              content: _0x424c62,
              sort: _0x3150a1++,
            });
          }
        }),
          _0x45ff5e[_0x5f1337(0x1e9)]({ id: null, quizItemList: _0x5aad4d });
      }),
      tinymce['get']('tinyeditor')[_0x3fa8a3(0x1ee)](''),
      _0x45ff5e
    );
  } else return console[_0x3fa8a3(0x178)](_0x3fa8a3(0x1d2)), null;
};
function processHmlData(_0x50bcd7) {
  const _0x3f3921 = _0xd87c5c,
    _0x2e7815 = [],
    _0x4f5e72 = Array[_0x3f3921(0x1ba)](_0x50bcd7[_0x3f3921(0x169)]('p'));
  let _0xfb5420 = [],
    _0x34cd4f = ![];
  return (
    _0x4f5e72[_0x3f3921(0x1ab)]((_0x324c3d) => {
      const _0xca5fd4 = _0x3f3921;
      divideKey[_0xca5fd4(0x192)](_0x324c3d[_0xca5fd4(0x16f)])
        ? (_0xfb5420['length'] > 0x0 &&
            (_0x2e7815[_0xca5fd4(0x1e9)](
              _0xfb5420[_0xca5fd4(0x1e3)](
                (_0x314c6d) => _0x314c6d[_0xca5fd4(0x185)],
              )[_0xca5fd4(0x184)](''),
            ),
            (_0xfb5420 = [])),
          _0xfb5420[_0xca5fd4(0x1e9)](_0x324c3d))
        : _0xfb5420['push'](_0x324c3d);
    }),
    _0xfb5420[_0x3f3921(0x1ea)] > 0x0 &&
      _0x2e7815[_0x3f3921(0x1e9)](
        _0xfb5420['map']((_0x325b83) => _0x325b83[_0x3f3921(0x185)])['join'](
          '',
        ),
      ),
    _0x2e7815
  );
}
window[_0xd87c5c(0x1da)]('message', (_0x2bf71a) => {
  const _0xb754f6 = _0xd87c5c,
    { functionName: _0x2ef86b, args: _0x91793b } = _0x2bf71a[_0xb754f6(0x1ac)];
  _0x2ef86b === _0xb754f6(0x1e4) &&
    typeof window[_0x2ef86b] === _0xb754f6(0x18a) &&
    window[_0x2ef86b](_0x91793b[0x0]),
    _0x2ef86b === _0xb754f6(0x17d) &&
      typeof window[_0x2ef86b] === 'function' &&
      window[_0x2ef86b](_0x91793b[0x0]),
    _0x2ef86b === _0xb754f6(0x1d1) &&
      typeof window[_0x2ef86b] === _0xb754f6(0x18a) &&
      window[_0x2ef86b](_0x91793b[0x0]),
    _0x2ef86b === 'saveExamData' &&
      typeof window[_0x2ef86b] === _0xb754f6(0x18a) &&
      window[_0x2ef86b](_0x91793b[0x0]);
});
function iTeX_hml_tag_parser(_0x14b0fa) {
  const _0x6617e = _0xd87c5c,
    _0x303b00 = new DOMParser(),
    _0x5aa4ff = _0x303b00['parseFromString'](_0x14b0fa, _0x6617e(0x1b6)),
    _0x203ec9 = _0x5aa4ff[_0x6617e(0x169)]('p'),
    _0x4b543d = {
      그룹: _0x6617e(0x16a),
      대발문: 'tag_bigcontent',
      지문: 'tag_content',
      문제: 'tag_exam',
      소문제: _0x6617e(0x1d7),
      보기: 'tag_example',
      선지: _0x6617e(0x1c1),
      정답: 'tl_answer',
      해설: _0x6617e(0x176),
      힌트: _0x6617e(0x1cc),
      개념: _0x6617e(0x1e0),
      제목: _0x6617e(0x179),
      팁: _0x6617e(0x1b3),
    };
  let _0x515ab8 = '',
    _0x593d3d = null,
    _0x3190ff = 0x0;
  return (
    _0x203ec9[_0x6617e(0x1ab)]((_0x1de408) => {
      const _0x477917 = _0x6617e;
      _0x1de408[_0x477917(0x1bd)](_0x477917(0x182));
      let _0x27513e = _0x1de408[_0x477917(0x168)]['trim']();
      const _0xd10761 = _0x27513e[_0x477917(0x1d3)](/^\[(.*?)\]$/);
      if (_0xd10761) {
        const _0x376e25 = _0xd10761[0x1][_0x477917(0x181)](/\s+/g, '');
        _0x376e25 in _0x4b543d &&
          (_0x1de408?.[_0x477917(0x17a)][_0x477917(0x1bb)](
            _0x4b543d[_0x376e25],
          ),
          _0x1de408[_0x477917(0x171)](_0x477917(0x1e6), 'false'),
          _0x4b543d[_0x376e25] === 'tag_group' &&
            (_0x593d3d && (_0x515ab8 += _0x593d3d[_0x477917(0x185)]),
            (_0x593d3d = document['createElement'](_0x477917(0x1d0))),
            _0x593d3d?.[_0x477917(0x17a)][_0x477917(0x1bb)](_0x477917(0x1eb)),
            _0x593d3d[_0x477917(0x171)]('id', 'exam_box_' + _0x3190ff++)));
      }
      _0x593d3d && _0x593d3d[_0x477917(0x1af)](_0x1de408);
    }),
    _0x593d3d && (_0x515ab8 += _0x593d3d[_0x6617e(0x185)]),
    _0x515ab8
  );
}
