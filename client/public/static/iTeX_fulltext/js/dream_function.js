/* eslint-disable no-empty */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable no-redeclare */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-constant-condition */
/* eslint-disable no-func-assign */
/* eslint-disable no-undef */
const _0x399797 = _0x5848;
(function (_0x466a7a, _0x2d5db2) {
  const _0x4debaa = _0x5848,
    _0x1db5db = _0x466a7a();
  while ([]) {
    try {
      const _0x20a755 =
        (-parseInt(_0x4debaa(0x253)) / 0x1) *
          (parseInt(_0x4debaa(0x219)) / 0x2) +
        -parseInt(_0x4debaa(0x252)) / 0x3 +
        parseInt(_0x4debaa(0x210)) / 0x4 +
        parseInt(_0x4debaa(0x21f)) / 0x5 +
        -parseInt(_0x4debaa(0x271)) / 0x6 +
        (parseInt(_0x4debaa(0x26f)) / 0x7) *
          (parseInt(_0x4debaa(0x224)) / 0x8) +
        -parseInt(_0x4debaa(0x26a)) / 0x9;
      if (_0x20a755 === _0x2d5db2) break;
      else _0x1db5db['push'](_0x1db5db['shift']());
    } catch (_0xe2861b) {
      _0x1db5db['push'](_0x1db5db['shift']());
    }
  }
})(_0x555e, 0x36f78),
  (window['openEQ'] = (_0x3d6e6c) => {
    const _0x2f9b65 = _0x5848,
      _0x5aa079 = document[_0x2f9b65(0x22e)](iTeXEQ['editor_container']);
    function _0x51919e() {
      const _0x9acb24 = _0x2f9b65;
      (onlyEQ = !![]),
        (onlyEQNode = _0x3d6e6c),
        _0x5aa079?.[_0x9acb24(0x20d)][_0x9acb24(0x25f)]('display_inactive'),
        iTeXEQ['editorStart']();
    }
    function _0x587d4d() {
      const _0x42fbd2 = _0x2f9b65;
      (onlyEQ = ![]),
        (onlyEQNode = ''),
        _0x5aa079?.[_0x42fbd2(0x20d)][_0x42fbd2(0x242)](_0x42fbd2(0x259));
    }
    _0x5aa079?.[_0x2f9b65(0x20d)][_0x2f9b65(0x270)]('display_inactive')
      ? _0x51919e()
      : _0x587d4d();
  }),
  (window[_0x399797(0x205)] = function setExamData(_0x109ca8) {
    const _0x40c05f = _0x399797;
    try {
      const _0x4d3881 = tinymce[_0x40c05f(0x20c)](_0x40c05f(0x248));
      return _0x4d3881
        ? (_0x4d3881[_0x40c05f(0x246)][_0x40c05f(0x1ec)](_0x109ca8), !![])
        : (console[_0x40c05f(0x244)](_0x40c05f(0x274)), ![]);
    } catch (_0x5c349c) {
      return console[_0x40c05f(0x244)](_0x40c05f(0x26b), _0x5c349c), ![];
    }
  });
async function uploadImageToServer(_0x3549f3, _0x4ef234) {
  const _0x5f102a = _0x399797,
    _0x164dc2 = new FormData();
  _0x164dc2['append'](_0x5f102a(0x234), _0x4ef234),
    _0x164dc2['append'](_0x5f102a(0x24d), _0x3549f3),
    _0x164dc2[_0x5f102a(0x21d)](_0x5f102a(0x263), dream_server_url);
  const _0x1e1ff8 = await fetch(dream_server_url + _0x5f102a(0x1ed), {
    method: _0x5f102a(0x222),
    body: _0x164dc2,
  });
  if (!_0x1e1ff8['ok']) throw new Error(_0x5f102a(0x25d));
  const _0x59bed8 = await _0x1e1ff8['json']();
  return _0x59bed8['img_url_list'];
}
function clearEditorContent() {
  const _0x57c612 = _0x399797,
    _0x5e51e9 = tinymce[_0x57c612(0x20c)]('tinyeditor');
  _0x5e51e9
    ? _0x5e51e9['setContent']('')
    : console[_0x57c612(0x244)](_0x57c612(0x21e));
}
window[_0x399797(0x201)] = async function () {
  const _0x226368 = _0x399797;
  try {
    const _0x3c931b =
        tinymce[_0x226368(0x20b)][_0x226368(0x24c)][_0x226368(0x1eb)] ||
        tinymce['activeEditor'][_0x226368(0x230)]['document'],
      _0x578bb7 = iTeXEQ[_0x226368(0x215)](
        _0x3c931b[_0x226368(0x212)](_0x226368(0x1f8)),
      );
    if (!_0x578bb7)
      return (
        console[_0x226368(0x244)](
          'No\x20data\x20found\x20in\x20the\x20parsed\x20document.',
        ),
        ![]
      );
    const _0x4a50d3 = [
        _0x226368(0x22c),
        'tag_content',
        _0x226368(0x1fc),
        _0x226368(0x1f1),
        _0x226368(0x236),
        _0x226368(0x207),
        _0x226368(0x1ee),
        _0x226368(0x25c),
        _0x226368(0x233),
        'tag_concept',
        _0x226368(0x267),
        _0x226368(0x256),
      ],
      _0x4b3b50 = _0x578bb7[_0x226368(0x1f6)]('p');
    if (_0x4b3b50[_0x226368(0x24a)] > 0x0) {
      const _0x108fe4 = _0x4b3b50[0x0]['querySelector'](_0x226368(0x251)),
        _0x3a8781 = Array[_0x226368(0x216)](_0x4b3b50[0x0]?.[_0x226368(0x20d)])[
          _0x226368(0x20e)
        ]((_0x3a00c8) => _0x4a50d3[_0x226368(0x1fe)](_0x3a00c8)),
        _0x7a0c3 = Array[_0x226368(0x216)](_0x4b3b50)[_0x226368(0x20e)](
          (_0x444b7a) =>
            _0x444b7a?.['classList'][_0x226368(0x270)](_0x226368(0x1fc)) ||
            _0x444b7a?.['classList'][_0x226368(0x270)](_0x226368(0x22c)) ||
            _0x444b7a?.[_0x226368(0x20d)][_0x226368(0x270)]('tag_content'),
        ),
        _0xa7f3ae = Array['from'](_0x4b3b50)[_0x226368(0x20e)]((_0x32797f) =>
          _0x32797f?.[_0x226368(0x20d)]['contains'](_0x226368(0x1f9)),
        );
      if (_0x108fe4) return alert(_0x226368(0x240)), ![];
      if (!_0x3a8781)
        return alert(_0x226368(0x254)), iTeXEQ[_0x226368(0x20a)](), ![];
      if (!_0x7a0c3) return alert(_0x226368(0x22f)), ![];
    } else return alert(_0x226368(0x22d)), ![];
    const _0x16073e = _0x578bb7[_0x226368(0x1f6)](_0x226368(0x223)),
      _0x348384 = Array[_0x226368(0x216)](_0x16073e)[_0x226368(0x232)](
        (_0x14f640) => _0x14f640[_0x226368(0x265)],
      );
    try {
      const _0x14a494 = await uploadImageToServer(img_save_type, _0x348384);
      _0x14a494['forEach']((_0x41c7b7, _0x59f7c4) => {
        const _0x4c7112 = _0x226368,
          { imgUUID: _0x28c123, imgURL: _0x3c4801 } = _0x41c7b7,
          _0x4d2690 = _0x16073e[_0x59f7c4];
        _0x4d2690[_0x4c7112(0x241)](_0x4c7112(0x276), _0x28c123),
          _0x4d2690[_0x4c7112(0x241)]('src', dream_server_url + _0x3c4801),
          _0x4d2690['removeAttribute'](_0x4c7112(0x273));
      });
    } catch (_0x3a0000) {
      _0x16073e['forEach']((_0x4488be) => {
        const _0x126b77 = _0x226368;
        console['error'](
          _0x126b77(0x21b),
          _0x4488be[_0x126b77(0x265)],
          _0x3a0000,
        );
      });
    }
    const _0x3a55d8 = {
        tag_group: _0x578bb7[_0x226368(0x26d)],
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
      _0x1fba30 = new DOMParser(),
      _0x1df706 = _0x1fba30[_0x226368(0x264)](
        _0x578bb7[_0x226368(0x26d)],
        _0x226368(0x20f),
      );
    let _0x40f67d = null,
      _0x3b436a = '';
    if (!_0x1df706[_0x226368(0x1f8)])
      return (
        console[_0x226368(0x244)](
          'Parsed\x20document\x20does\x20not\x20contain\x20body.',
        ),
        ![]
      );
    const _0x10d7b3 = (_0xb6b70a, _0x47316a) => {
      const _0x356ae4 = _0x226368;
      Array[_0x356ae4(0x227)](_0x3a55d8[_0xb6b70a]) &&
        _0x3a55d8[_0xb6b70a][_0x356ae4(0x239)](_0x47316a);
    };
    Array[_0x226368(0x216)](_0x1df706[_0x226368(0x1f8)][_0x226368(0x217)])[
      _0x226368(0x255)
    ]((_0x45d08a) => {
      const _0x690cff = _0x226368;
      if (_0x45d08a['nodeType'] === Node[_0x690cff(0x220)]) {
        const _0x2b0565 = Array[_0x690cff(0x216)](
            _0x45d08a?.[_0x690cff(0x20d)],
          ),
          _0x2358f5 = _0x2b0565[_0x690cff(0x20e)]((_0x5a7224) =>
            _0x4a50d3[_0x690cff(0x1fe)](_0x5a7224),
          );
        if (_0x2358f5)
          _0x40f67d && _0x10d7b3(_0x40f67d, _0x3b436a),
            (_0x40f67d = _0x2358f5),
            (_0x3b436a = _0x45d08a['outerHTML']);
        else _0x40f67d && (_0x3b436a += _0x45d08a[_0x690cff(0x22b)]);
      }
    });
    _0x40f67d && _0x10d7b3(_0x40f67d, _0x3b436a);
    const _0x3e1a56 = JSON[_0x226368(0x257)](_0x3a55d8, null, 0x2);
    return iTeXEQ['latexrecovery'](), clearEditorContent(), _0x3e1a56;
  } catch (_0x19c240) {
    return console[_0x226368(0x244)](_0x226368(0x1fd), _0x19c240), ![];
  }
};
function hml_upload(_0x16c203) {
  const _0x533c7c = _0x399797;
  var _0x37e26b = new FormData();
  _0x37e26b[_0x533c7c(0x21d)](_0x533c7c(0x1fa), _0x16c203[_0x533c7c(0x25e)]),
    _0x37e26b[_0x533c7c(0x21d)]('file', _0x16c203),
    _0x37e26b[_0x533c7c(0x21d)](_0x533c7c(0x24d), img_save_type),
    _0x37e26b['append'](_0x533c7c(0x263), dream_server_url);
  var _0xedb677 = new XMLHttpRequest();
  _0xedb677[_0x533c7c(0x1fb)](
    'POST',
    dream_server_url + _0x533c7c(0x226),
    !![],
  ),
    _0xedb677[_0x533c7c(0x1ea)](_0x37e26b),
    (_0xedb677['onreadystatechange'] = function () {
      const _0x22e75a = _0x533c7c;
      if (_0xedb677[_0x22e75a(0x214)] == 0x4 && _0xedb677['status'] == 0xc8) {
        const _0x3a3861 = document[_0x22e75a(0x212)]('.itex_hml_convert_view');
        var _0x39a674 = JSON[_0x22e75a(0x243)](_0xedb677[_0x22e75a(0x258)]);
        (_0x3a3861['innerHTML'] = _0x39a674['itexdata']),
          document['querySelector'](_0x22e75a(0x238))?.[_0x22e75a(0x20d)][
            _0x22e75a(0x242)
          ](_0x22e75a(0x268)),
          iTeXEQ[_0x22e75a(0x208)](_0x3a3861),
          (document['getElementById'](_0x22e75a(0x269))['style']['display'] =
            'none'),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
let lastClickedBoxId = null,
  currentEditorContent = '';
function htmlStringToNode(_0x5e37ba) {
  const _0x22fdc3 = _0x399797;
  var _0x303b7f = document['createElement']('template');
  return (_0x303b7f[_0x22fdc3(0x26d)] = _0x5e37ba), _0x303b7f['content'];
}
function _0x555e() {
  const _0xe577d8 = [
    '변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.',
    '.exam_box',
    'saveExamData',
    'message',
    '.itex_hml_convert_view',
    'exam_box_',
    'usePostJsonData',
    'trim',
    'tag_choices',
    'recoverynew_no_click',
    'TITLE',
    'latexrecovery',
    'activeEditor',
    'get',
    'classList',
    'find',
    'text/html',
    '719888xqvVWB',
    'display',
    'querySelector',
    'function',
    'readyState',
    'removeSVG',
    'from',
    'childNodes',
    '에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?',
    '236zexHbV',
    'para0',
    'Error\x20processing\x20image:',
    'closest',
    'append',
    'Editor\x20not\x20found',
    '1779925BXvxQW',
    'ELEMENT_NODE',
    'TEXT',
    'POST',
    'img',
    '8SwzVnP',
    'addEventListener',
    '/qnapi_dream/hml_upload',
    'isArray',
    'contenteditable',
    'textContent',
    'join',
    'outerHTML',
    'tag_bigcontent',
    'No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.',
    'getElementById',
    '문제\x20or\x20대발문\x20or\x20지문\x20태그가\x20필요합니다!',
    'contentDocument',
    'className',
    'map',
    'tag_hint',
    'img_data',
    'CHOICES',
    'tag_example',
    'appendChild',
    '.origin_img_area',
    'push',
    'saveHmlData',
    'getContent',
    'createElement',
    'Error\x20in\x20math\x20render:',
    'data',
    'removeAttribute',
    '내용\x20앞에\x20태그를\x20입력해주세요.',
    'setAttribute',
    'add',
    'parse',
    'error',
    'false',
    'selection',
    'exam_box',
    'tinyeditor',
    'setExamData',
    'length',
    'cloneNode',
    'contentWindow',
    'img_save_type',
    'TIP',
    '데이터가\x20존재하지\x20않습니다.',
    'none',
    'br[data-mce-bogus=\x221\x22]',
    '615342ahVUTh',
    '1522NbvBXW',
    '내용\x20앞에\x20태그를\x20입력해\x20주세요',
    'forEach',
    'tag_tip',
    'stringify',
    'responseText',
    'display_inactive',
    'block',
    'EXAMPLE',
    'tag_commentary',
    'Error\x20uploading\x20image',
    'name',
    'remove',
    '원래\x20자리를\x20찾을\x20수\x20없습니다.',
    'style',
    'target',
    'save_path',
    'parseFromString',
    'src',
    'replace',
    'tag_title',
    'itex_area_hidden',
    'modal_block',
    '1476171hCciQb',
    '콘텐츠\x20삽입\x20중\x20오류\x20발생:',
    'file',
    'innerHTML',
    '[그룹]',
    '2067919yJdaYW',
    'contains',
    '345006DAaPjY',
    'div',
    'data-mce-src',
    'ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.',
    'QUESTION',
    'Img_code',
    'send',
    'document',
    'setContent',
    '/uploadImage',
    'tl_answer',
    'CONCEPT',
    'match',
    'tag_exam_sm',
    'hasChildNodes',
    'tag_concept',
    'click',
    'log',
    'querySelectorAll',
    'itexdata',
    'body',
    'tag_group',
    'file_name',
    'open',
    'tag_exam',
    'Error\x20while\x20saving\x20exam\x20data:',
    'includes',
  ];
  _0x555e = function () {
    return _0xe577d8;
  };
  return _0x555e();
}
async function hml_edit_finish() {
  const _0x2c7f20 = _0x399797;
  if (!lastClickedBoxId) {
    console[_0x2c7f20(0x244)]('수정할\x20요소가\x20선택되지\x20않았습니다.');
    return;
  }
  const _0x42435d = tinymce[_0x2c7f20(0x20c)](_0x2c7f20(0x248))['getContent'](),
    _0x5b1f03 = document[_0x2c7f20(0x212)](_0x2c7f20(0x203)),
    _0x5a316d = document[_0x2c7f20(0x22e)](lastClickedBoxId);
  if (_0x5a316d) {
    const _0x534410 = htmlStringToNode(_0x42435d);
    try {
      const _0x35eef0 = await iTeXDBW_mathrender_hml(_0x534410),
        _0x228c46 = document[_0x2c7f20(0x23c)]('div');
      _0x228c46[_0x2c7f20(0x237)](_0x35eef0),
        (_0x5a316d[_0x2c7f20(0x22b)] = _0x228c46[_0x2c7f20(0x26d)]),
        iTeXEQ['recoverynew_no_click'](_0x5b1f03),
        tinymce[_0x2c7f20(0x20c)](_0x2c7f20(0x248))[_0x2c7f20(0x1ec)](''),
        (lastClickedBoxId = null),
        (currentEditorContent = '');
    } catch (_0x16241a) {
      console[_0x2c7f20(0x244)]('Error\x20in\x20math\x20render:', _0x16241a);
    }
  } else console[_0x2c7f20(0x244)](_0x2c7f20(0x260));
}
async function hml_upload_frame(_0x1c6756) {
  const _0x3a2cac = _0x399797;
  document['getElementById'](_0x3a2cac(0x269))['style'][_0x3a2cac(0x211)] =
    _0x3a2cac(0x25a);
  var _0x218d73 = new FormData();
  _0x218d73[_0x3a2cac(0x21d)](_0x3a2cac(0x1fa), _0x1c6756[_0x3a2cac(0x25e)]),
    _0x218d73['append'](_0x3a2cac(0x26c), _0x1c6756),
    _0x218d73[_0x3a2cac(0x21d)](_0x3a2cac(0x24d), img_save_type),
    _0x218d73[_0x3a2cac(0x21d)]('save_path', dream_server_url);
  var _0x1ebb15 = new XMLHttpRequest();
  _0x1ebb15['open'](
    _0x3a2cac(0x222),
    dream_server_url + _0x3a2cac(0x226),
    !![],
  ),
    _0x1ebb15[_0x3a2cac(0x1ea)](_0x218d73),
    (_0x1ebb15['onreadystatechange'] = async function () {
      const _0x12210d = _0x3a2cac;
      if (_0x1ebb15[_0x12210d(0x214)] == 0x4 && _0x1ebb15['status'] == 0xc8) {
        const _0x44d032 = document['querySelector'](_0x12210d(0x203));
        var _0x403a23 = JSON['parse'](_0x1ebb15[_0x12210d(0x258)]);
        const _0xd24eae = iTeX_hml_tag_parser(_0x403a23[_0x12210d(0x1f7)]);
        (_0x44d032['innerHTML'] = _0xd24eae),
          _0x44d032[_0x12210d(0x225)](
            _0x12210d(0x1f4),
            async function (_0x4cfb40) {
              const _0x485fae = _0x12210d;
              if (
                _0x4cfb40[_0x485fae(0x262)][_0x485fae(0x21c)](_0x485fae(0x200))
              ) {
                const _0x2be9d4 =
                    _0x4cfb40[_0x485fae(0x262)][_0x485fae(0x21c)]('.exam_box'),
                  _0x18705b = _0x2be9d4['getAttribute']('id');
                lastClickedBoxId &&
                  tinymce['get'](_0x485fae(0x248))[_0x485fae(0x23b)]() !==
                    currentEditorContent &&
                  confirm(_0x485fae(0x1ff)) &&
                  (await hml_edit_finish());
                const _0x1a50e3 = htmlStringToNode(_0x2be9d4[_0x485fae(0x22b)]);
                lastClickedBoxId = _0x18705b;
                try {
                  const _0x17cdc1 = await iTeXDBW_mathrender_hml(_0x1a50e3),
                    _0x5f2b13 = document['createElement'](_0x485fae(0x272));
                  _0x5f2b13['appendChild'](_0x17cdc1),
                    tinymce[_0x485fae(0x20c)](_0x485fae(0x248))[
                      _0x485fae(0x1ec)
                    ](_0x5f2b13['innerHTML']),
                    (currentEditorContent = _0x5f2b13[_0x485fae(0x26d)]);
                } catch (_0x33c8b2) {
                  console[_0x485fae(0x244)](_0x485fae(0x23d), _0x33c8b2);
                }
                iTeXEQ['recoverynew']();
              }
            },
          ),
          document['querySelector'](_0x12210d(0x238))?.[_0x12210d(0x20d)][
            'add'
          ]('itex_area_hidden'),
          iTeXEQ[_0x12210d(0x208)](_0x44d032),
          (document['getElementById'](_0x12210d(0x269))['style'][
            _0x12210d(0x211)
          ] = _0x12210d(0x250));
      }
    });
}
window[_0x399797(0x23a)] = async function () {
  const _0x43ef4d = _0x399797,
    _0x573b64 = document[_0x43ef4d(0x212)](_0x43ef4d(0x203))[_0x43ef4d(0x24b)](
      !![],
    );
  if (!_0x573b64[_0x43ef4d(0x1f2)]()) {
    alert('문서를\x20업로드\x20하세요.');
    return;
  }
  const _0x3eca49 = tinymce[_0x43ef4d(0x20c)](_0x43ef4d(0x248))[
    _0x43ef4d(0x23b)
  ]();
  if (_0x3eca49[_0x43ef4d(0x206)]() !== '') {
    const _0x19ccca = confirm(_0x43ef4d(0x218));
    if (!_0x19ccca) return;
  }
  if (_0x573b64) {
    const _0x4cbd66 = _0x573b64[_0x43ef4d(0x1f6)](_0x43ef4d(0x200)),
      _0x4118a3 = [],
      _0x53e98e = _0x573b64[_0x43ef4d(0x1f6)](_0x43ef4d(0x223)),
      _0x3da5a3 = Array['from'](_0x53e98e)[_0x43ef4d(0x232)](
        (_0x5da354) => _0x5da354[_0x43ef4d(0x265)],
      );
    try {
      const _0x1cc045 = await uploadImageToServer(img_save_type, _0x3da5a3);
      _0x1cc045[_0x43ef4d(0x255)]((_0x4b45ae, _0x5697fd) => {
        const _0x1abd31 = _0x43ef4d,
          { imgUUID: _0x59d020, imgURL: _0x530b56 } = _0x4b45ae,
          _0x29907c = _0x53e98e[_0x5697fd];
        _0x29907c[_0x1abd31(0x241)]('Img_code', _0x59d020),
          _0x29907c[_0x1abd31(0x241)]('src', dream_server_url + _0x530b56),
          _0x29907c[_0x1abd31(0x23f)](_0x1abd31(0x273));
      });
    } catch (_0x222782) {
      console[_0x43ef4d(0x244)](_0x43ef4d(0x21b), _0x222782);
    }
    return (
      _0x4cbd66[_0x43ef4d(0x255)]((_0x4af18f, _0x16d71c) => {
        const _0x40a1f0 = _0x43ef4d,
          _0xdb54c6 = [];
        let _0x55e8ec = 0x1;
        const _0x8fa198 = _0x4af18f[_0x40a1f0(0x1f6)]('p');
        _0x8fa198['forEach']((_0x155195) => {
          const _0x12da8b = _0x40a1f0,
            _0x9deb5b = _0x155195?.[_0x12da8b(0x20d)];
          let _0x429e25 = null;
          if (_0x9deb5b['contains']('tag_bigcontent')) _0x429e25 = 'BIG';
          else {
            if (_0x9deb5b[_0x12da8b(0x270)]('tag_content'))
              _0x429e25 = _0x12da8b(0x221);
            else {
              if (_0x9deb5b[_0x12da8b(0x270)](_0x12da8b(0x1fc)))
                _0x429e25 = _0x12da8b(0x275);
              else {
                if (_0x9deb5b[_0x12da8b(0x270)](_0x12da8b(0x1f1)))
                  _0x429e25 = 'SMALL';
                else {
                  if (_0x9deb5b[_0x12da8b(0x270)](_0x12da8b(0x236)))
                    _0x429e25 = _0x12da8b(0x25b);
                  else {
                    if (_0x9deb5b[_0x12da8b(0x270)](_0x12da8b(0x207)))
                      _0x429e25 = _0x12da8b(0x235);
                    else {
                      if (_0x9deb5b[_0x12da8b(0x270)]('tl_answer'))
                        _0x429e25 = 'ANSWER';
                      else {
                        if (_0x9deb5b[_0x12da8b(0x270)](_0x12da8b(0x25c)))
                          _0x429e25 = 'COMMENTARY';
                        else {
                          if (_0x9deb5b[_0x12da8b(0x270)]('tag_hint'))
                            _0x429e25 = 'HINT';
                          else {
                            if (_0x9deb5b[_0x12da8b(0x270)](_0x12da8b(0x1f3)))
                              _0x429e25 = _0x12da8b(0x1ef);
                            else {
                              if (_0x9deb5b[_0x12da8b(0x270)](_0x12da8b(0x267)))
                                _0x429e25 = _0x12da8b(0x209);
                              else {
                                if (
                                  _0x9deb5b[_0x12da8b(0x270)](_0x12da8b(0x256))
                                )
                                  _0x429e25 = _0x12da8b(0x24e);
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
          if (_0x429e25) {
            let _0x3fa4cf = _0x155195[_0x12da8b(0x22b)],
              _0x94a684 = _0x155195['nextElementSibling'];
            while (
              _0x94a684 &&
              !_0x94a684['classList'][_0x12da8b(0x270)](_0x12da8b(0x22c)) &&
              !_0x94a684['classList']['contains']('tag_content') &&
              !_0x94a684[_0x12da8b(0x20d)][_0x12da8b(0x270)](
                _0x12da8b(0x1fc),
              ) &&
              !_0x94a684[_0x12da8b(0x20d)][_0x12da8b(0x270)](
                _0x12da8b(0x1f1),
              ) &&
              !_0x94a684[_0x12da8b(0x20d)][_0x12da8b(0x270)]('tag_example') &&
              !_0x94a684[_0x12da8b(0x20d)][_0x12da8b(0x270)](
                _0x12da8b(0x207),
              ) &&
              !_0x94a684['classList'][_0x12da8b(0x270)](_0x12da8b(0x1ee)) &&
              !_0x94a684[_0x12da8b(0x20d)]['contains']('tag_commentary') &&
              !_0x94a684[_0x12da8b(0x20d)][_0x12da8b(0x270)]('tag_hint') &&
              !_0x94a684[_0x12da8b(0x20d)][_0x12da8b(0x270)](
                _0x12da8b(0x1f3),
              ) &&
              !_0x94a684['classList'][_0x12da8b(0x270)](_0x12da8b(0x267)) &&
              !_0x94a684[_0x12da8b(0x20d)]['contains'](_0x12da8b(0x256))
            ) {
              (_0x3fa4cf += _0x94a684['outerHTML']),
                (_0x94a684 = _0x94a684['nextElementSibling']);
            }
            _0xdb54c6['push']({
              type: _0x429e25,
              content: _0x3fa4cf,
              sort: _0x55e8ec++,
            });
          }
        }),
          _0x4118a3[_0x40a1f0(0x239)]({ id: null, quizItemList: _0xdb54c6 });
      }),
      tinymce[_0x43ef4d(0x20c)](_0x43ef4d(0x248))[_0x43ef4d(0x1ec)](''),
      _0x4118a3
    );
  } else return console[_0x43ef4d(0x1f5)](_0x43ef4d(0x24f)), null;
};
function processHmlData(_0x39d24c) {
  const _0x3ee383 = _0x399797,
    _0x557b8e = [],
    _0xf05961 = Array[_0x3ee383(0x216)](_0x39d24c['querySelectorAll']('p'));
  let _0x2dd9c6 = [],
    _0x50de21 = ![];
  return (
    _0xf05961[_0x3ee383(0x255)]((_0x3ff572) => {
      const _0x3f21f1 = _0x3ee383;
      divideKey[_0x3f21f1(0x1fe)](_0x3ff572[_0x3f21f1(0x231)])
        ? (_0x2dd9c6['length'] > 0x0 &&
            (_0x557b8e[_0x3f21f1(0x239)](
              _0x2dd9c6[_0x3f21f1(0x232)](
                (_0x27cbf3) => _0x27cbf3['outerHTML'],
              )[_0x3f21f1(0x22a)](''),
            ),
            (_0x2dd9c6 = [])),
          _0x2dd9c6[_0x3f21f1(0x239)](_0x3ff572))
        : _0x2dd9c6[_0x3f21f1(0x239)](_0x3ff572);
    }),
    _0x2dd9c6['length'] > 0x0 &&
      _0x557b8e[_0x3ee383(0x239)](
        _0x2dd9c6[_0x3ee383(0x232)]((_0x329ab6) => _0x329ab6[_0x3ee383(0x22b)])[
          'join'
        ](''),
      ),
    _0x557b8e
  );
}
function _0x5848(_0x293946, _0x531369) {
  const _0x555ec9 = _0x555e();
  return (
    (_0x5848 = function (_0x584811, _0x58ee33) {
      _0x584811 = _0x584811 - 0x1ea;
      let _0x16af54 = _0x555ec9[_0x584811];
      return _0x16af54;
    }),
    _0x5848(_0x293946, _0x531369)
  );
}
window[_0x399797(0x225)](_0x399797(0x202), (_0x312863) => {
  const _0x2f4051 = _0x399797,
    { functionName: _0x2a16bc, args: _0x2f484b } = _0x312863[_0x2f4051(0x23e)];
  _0x2a16bc === _0x2f4051(0x249) &&
    typeof window[_0x2a16bc] === _0x2f4051(0x213) &&
    window[_0x2a16bc](_0x2f484b[0x0]),
    _0x2a16bc === 'setExamList' &&
      typeof window[_0x2a16bc] === _0x2f4051(0x213) &&
      window[_0x2a16bc](_0x2f484b[0x0]),
    _0x2a16bc === 'getExamCodenum' &&
      typeof window[_0x2a16bc] === 'function' &&
      window[_0x2a16bc](_0x2f484b[0x0]),
    _0x2a16bc === _0x2f4051(0x201) &&
      typeof window[_0x2a16bc] === 'function' &&
      window[_0x2a16bc](_0x2f484b[0x0]);
});
function iTeX_hml_tag_parser(_0x24e3e2) {
  const _0x24009d = _0x399797,
    _0x22f006 = new DOMParser(),
    _0x188e63 = _0x22f006[_0x24009d(0x264)](_0x24e3e2, _0x24009d(0x20f)),
    _0x24cca9 = _0x188e63['querySelectorAll']('p'),
    _0x156818 = {
      그룹: _0x24009d(0x1f9),
      대발문: _0x24009d(0x22c),
      지문: 'tag_content',
      문제: _0x24009d(0x1fc),
      소문제: 'tag_exam_sm',
      보기: _0x24009d(0x236),
      선지: 'tag_choices',
      정답: _0x24009d(0x1ee),
      해설: _0x24009d(0x25c),
      힌트: 'tag_hint',
      개념: _0x24009d(0x1f3),
      제목: 'tag_title',
      팁: _0x24009d(0x256),
    };
  let _0x52a340 = '',
    _0x3d79f6 = null,
    _0x3d3c05 = 0x0,
    _0x32184a = ![];
  _0x24cca9[_0x24009d(0x255)]((_0x3b6515, _0x101bd8) => {
    const _0x5091ae = _0x24009d;
    _0x3b6515['removeAttribute'](_0x5091ae(0x261));
    let _0x1bfbd3 = _0x3b6515[_0x5091ae(0x229)]['trim']();
    const _0x194eee = _0x1bfbd3[_0x5091ae(0x1f0)](/^\[(.*?)\]$/);
    if (_0x194eee) {
      const _0xeed079 = _0x194eee[0x1][_0x5091ae(0x266)](/\s+/g, '');
      if (_0xeed079 in _0x156818) {
        _0x3b6515?.[_0x5091ae(0x20d)][_0x5091ae(0x242)](_0x156818[_0xeed079]),
          _0x3b6515[_0x5091ae(0x241)](_0x5091ae(0x228), _0x5091ae(0x245));
        if (_0x156818[_0xeed079] === _0x5091ae(0x1f9))
          _0x32184a
            ? (_0x32184a = ![])
            : (_0x3d79f6 &&
                ((_0x52a340 += _0x3d79f6[_0x5091ae(0x22b)]),
                (_0x3d79f6 = null)),
              (_0x3d79f6 = document[_0x5091ae(0x23c)](_0x5091ae(0x272))),
              _0x3d79f6?.[_0x5091ae(0x20d)][_0x5091ae(0x242)](_0x5091ae(0x247)),
              _0x3d79f6['setAttribute']('id', 'exam_box_' + _0x3d3c05++),
              (_0x32184a = !![]));
        else {
          if (_0x156818[_0xeed079] === _0x5091ae(0x1fc)) {
            if (_0x32184a) {
            } else
              _0x3d79f6 &&
                ((_0x52a340 += _0x3d79f6[_0x5091ae(0x22b)]),
                (_0x3d79f6 = null)),
                (_0x3d79f6 = document[_0x5091ae(0x23c)](_0x5091ae(0x272))),
                _0x3d79f6?.[_0x5091ae(0x20d)][_0x5091ae(0x242)]('exam_box'),
                _0x3d79f6[_0x5091ae(0x241)](
                  'id',
                  _0x5091ae(0x204) + _0x3d3c05++,
                );
          }
        }
      }
    }
    _0x3d79f6 && _0x3d79f6[_0x5091ae(0x237)](_0x3b6515);
  });
  if (_0x3d79f6) {
    if (_0x32184a) {
      const _0x4e42bc = document[_0x24009d(0x23c)]('p');
      _0x4e42bc[_0x24009d(0x20d)]['add'](_0x24009d(0x21a), _0x24009d(0x1f9)),
        _0x4e42bc['setAttribute'](_0x24009d(0x228), _0x24009d(0x245)),
        (_0x4e42bc[_0x24009d(0x229)] = _0x24009d(0x26e)),
        _0x3d79f6['appendChild'](_0x4e42bc),
        (_0x52a340 += _0x3d79f6[_0x24009d(0x22b)]);
    } else _0x52a340 += _0x3d79f6[_0x24009d(0x22b)];
  }
  return _0x52a340;
}
