/* eslint-disable no-func-assign */
/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
const _0x46d5ad = _0x5413;
(function (_0x534c29, _0x4bf054) {
  const _0x5e4ae9 = _0x5413,
    _0x3069cc = _0x534c29();
  while ([]) {
    try {
      const _0x3293b1 =
        parseInt(_0x5e4ae9(0xd7)) / 0x1 +
        (-parseInt(_0x5e4ae9(0x8f)) / 0x2) * (parseInt(_0x5e4ae9(0xf7)) / 0x3) +
        -parseInt(_0x5e4ae9(0x91)) / 0x4 +
        (-parseInt(_0x5e4ae9(0xd1)) / 0x5) * (parseInt(_0x5e4ae9(0xf2)) / 0x6) +
        (parseInt(_0x5e4ae9(0x9d)) / 0x7) * (-parseInt(_0x5e4ae9(0xb7)) / 0x8) +
        -parseInt(_0x5e4ae9(0xca)) / 0x9 +
        parseInt(_0x5e4ae9(0x70)) / 0xa;
      if (_0x3293b1 === _0x4bf054) break;
      else _0x3069cc['push'](_0x3069cc['shift']());
    } catch (_0xb0c58b) {
      _0x3069cc['push'](_0x3069cc['shift']());
    }
  }
})(_0x126d, 0x8f98b),
  (window[_0x46d5ad(0xb3)] = (_0x88e3cf) => {
    const _0x31e3f9 = _0x46d5ad,
      _0x5c8033 = document[_0x31e3f9(0xb8)](iTeXEQ[_0x31e3f9(0x95)]);
    function _0x1c6896() {
      const _0xab67d4 = _0x31e3f9;
      (onlyEQ = !![]),
        (onlyEQNode = _0x88e3cf),
        _0x5c8033?.[_0xab67d4(0xc6)][_0xab67d4(0xd5)](_0xab67d4(0xec)),
        iTeXEQ['editorStart']();
    }
    function _0x1273aa() {
      const _0x529e5f = _0x31e3f9;
      (onlyEQ = ![]),
        (onlyEQNode = ''),
        _0x5c8033?.[_0x529e5f(0xc6)][_0x529e5f(0x71)]('display_inactive');
    }
    _0x5c8033?.[_0x31e3f9(0xc6)][_0x31e3f9(0xc9)](_0x31e3f9(0xec))
      ? _0x1c6896()
      : _0x1273aa();
  }),
  (window['usePostJsonData'] = function setExamData(_0x4ff1f) {
    const _0x2cc53c = _0x46d5ad;
    try {
      const _0x228d81 = tinymce[_0x2cc53c(0xa7)](_0x2cc53c(0xa1));
      return _0x228d81
        ? (_0x228d81['selection'][_0x2cc53c(0x6a)](_0x4ff1f), !![])
        : (console[_0x2cc53c(0x89)](
            'ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.',
          ),
          ![]);
    } catch (_0x1fd10a) {
      return console[_0x2cc53c(0x89)](_0x2cc53c(0xb6), _0x1fd10a), ![];
    }
  });
async function uploadImageToServer(_0x34fc74, _0x33c956) {
  const _0x2d625b = _0x46d5ad,
    _0x4454e3 = new FormData(),
    _0x26524c = await fetch(_0x33c956),
    _0xc0d9d6 = await _0x26524c[_0x2d625b(0xce)]();
  console[_0x2d625b(0x7c)]('blob:\x20', _0xc0d9d6),
    _0x4454e3[_0x2d625b(0x7f)](_0x2d625b(0x9b), _0xc0d9d6, _0x2d625b(0xd4)),
    _0x4454e3[_0x2d625b(0x7f)]('img_save_type', img_save_type),
    _0x4454e3['append'](_0x2d625b(0x74), dream_server_url);
  const _0xdc5c83 = await fetch(dream_server_url + _0x2d625b(0x6d), {
    method: _0x2d625b(0x80),
    body: _0x4454e3,
  });
  if (!_0xdc5c83['ok']) throw new Error(_0x2d625b(0x68));
  const _0x59568e = await _0xdc5c83[_0x2d625b(0xa6)]();
  return console[_0x2d625b(0x7c)](_0x2d625b(0xc5), _0x59568e), _0x59568e;
}
function _0x5413(_0x5b6eae, _0x2d976b) {
  const _0x126d70 = _0x126d();
  return (
    (_0x5413 = function (_0x541386, _0x2c8cde) {
      _0x541386 = _0x541386 - 0x67;
      let _0x5f0750 = _0x126d70[_0x541386];
      return _0x5f0750;
    }),
    _0x5413(_0x5b6eae, _0x2d976b)
  );
}
function clearEditorContent() {
  const _0xc58eed = _0x46d5ad,
    _0xe22151 = tinymce[_0xc58eed(0xa7)](_0xc58eed(0xa1));
  _0xe22151
    ? _0xe22151[_0xc58eed(0x6a)]('')
    : console[_0xc58eed(0x89)](_0xc58eed(0xa8));
}
window[_0x46d5ad(0xdb)] = async function () {
  const _0x2e9a8e = _0x46d5ad;
  try {
    const _0x1b6924 =
        tinymce[_0x2e9a8e(0xa3)][_0x2e9a8e(0xcd)][_0x2e9a8e(0xad)] ||
        tinymce[_0x2e9a8e(0xa3)][_0x2e9a8e(0xba)][_0x2e9a8e(0xad)],
      _0x2521b2 = iTeXEQ['removeSVG'](
        _0x1b6924['querySelector'](_0x2e9a8e(0xb9)),
      );
    if (!_0x2521b2) return console['error'](_0x2e9a8e(0xcb)), ![];
    const _0x47b61f = [
        _0x2e9a8e(0xea),
        _0x2e9a8e(0xac),
        _0x2e9a8e(0xc3),
        'tag_exam_sm',
        _0x2e9a8e(0x6b),
        _0x2e9a8e(0xda),
        _0x2e9a8e(0xaf),
        _0x2e9a8e(0xde),
        _0x2e9a8e(0x86),
        _0x2e9a8e(0xe9),
        _0x2e9a8e(0x88),
        _0x2e9a8e(0xe5),
      ],
      _0x33ab98 = _0x2521b2[_0x2e9a8e(0xee)]('p');
    if (_0x33ab98) {
      const _0xaf4e33 = _0x33ab98[0x0][_0x2e9a8e(0x87)](_0x2e9a8e(0x9e)),
        _0x5a8575 = Array[_0x2e9a8e(0x8e)](_0x33ab98[0x0]?.[_0x2e9a8e(0xc6)])[
          _0x2e9a8e(0x75)
        ]((_0x1499c3) => _0x47b61f['includes'](_0x1499c3)),
        _0x39eeb6 = Array[_0x2e9a8e(0x8e)](_0x33ab98)[_0x2e9a8e(0x75)](
          (_0x3c7789) =>
            _0x3c7789?.[_0x2e9a8e(0xc6)][_0x2e9a8e(0xc9)](_0x2e9a8e(0xc3)),
        ),
        _0x52c9e4 = Array[_0x2e9a8e(0x8e)](_0x33ab98)[_0x2e9a8e(0x75)](
          (_0x8f5fd5) =>
            _0x8f5fd5?.['classList'][_0x2e9a8e(0xc9)](_0x2e9a8e(0xbc)),
        );
      if (_0xaf4e33) return alert(_0x2e9a8e(0xf9)), ![];
      if (!_0x5a8575)
        return alert(_0x2e9a8e(0xef)), iTeXEQ['latexrecovery'](), ![];
      if (!_0x39eeb6) return alert(_0x2e9a8e(0xdf)), ![];
    } else return alert(_0x2e9a8e(0x6c)), ![];
    const _0x589f51 = _0x2521b2[_0x2e9a8e(0xee)]('img');
    for (const _0x2da5a5 of _0x589f51) {
      try {
        const { imgUUID: _0x45ca5d, imgURL: _0x82f3a6 } =
          await uploadImageToServer(img_save_type, _0x2da5a5[_0x2e9a8e(0xe6)]);
        console['log'](_0x2e9a8e(0x8d), dream_server_url + _0x82f3a6),
          _0x2da5a5[_0x2e9a8e(0xd8)](_0x2e9a8e(0x72), _0x45ca5d),
          _0x2da5a5[_0x2e9a8e(0xd8)](
            _0x2e9a8e(0xe6),
            dream_server_url + _0x82f3a6,
          );
      } catch (_0x16f6c9) {
        console[_0x2e9a8e(0x89)](
          _0x2e9a8e(0xb1),
          _0x2da5a5[_0x2e9a8e(0xe6)],
          _0x16f6c9,
        );
      }
    }
    const _0x5956cf = {
        tag_group: _0x2521b2['innerHTML'],
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
      _0x1a7325 = new DOMParser(),
      _0x3db7e1 = _0x1a7325[_0x2e9a8e(0xe8)](
        _0x2521b2[_0x2e9a8e(0xa9)],
        _0x2e9a8e(0x7b),
      );
    let _0x42900b = null,
      _0x55c484 = '';
    if (!_0x3db7e1[_0x2e9a8e(0xb9)])
      return (
        console[_0x2e9a8e(0x89)](
          'Parsed\x20document\x20does\x20not\x20contain\x20body.',
        ),
        ![]
      );
    const _0x59678d = (_0x3e5887, _0x3cd44d) => {
      const _0x416900 = _0x2e9a8e;
      Array[_0x416900(0xd6)](_0x5956cf[_0x3e5887]) &&
        _0x5956cf[_0x3e5887]['push'](_0x3cd44d);
    };
    Array[_0x2e9a8e(0x8e)](_0x3db7e1['body']['childNodes'])[_0x2e9a8e(0x67)](
      (_0x527a3b) => {
        const _0x5b589e = _0x2e9a8e;
        if (_0x527a3b['nodeType'] === Node[_0x5b589e(0xe4)]) {
          const _0x2a347d = Array[_0x5b589e(0x8e)](
              _0x527a3b?.[_0x5b589e(0xc6)],
            ),
            _0xe464d9 = _0x2a347d[_0x5b589e(0x75)]((_0x19940d) =>
              _0x47b61f[_0x5b589e(0xbb)](_0x19940d),
            );
          if (_0xe464d9)
            _0x42900b && _0x59678d(_0x42900b, _0x55c484),
              (_0x42900b = _0xe464d9),
              (_0x55c484 = _0x527a3b['outerHTML']);
          else _0x42900b && (_0x55c484 += _0x527a3b[_0x5b589e(0x79)]);
        }
      },
    );
    _0x42900b && _0x59678d(_0x42900b, _0x55c484);
    const _0x3c391f = JSON[_0x2e9a8e(0xe0)](_0x5956cf, null, 0x2);
    return iTeXEQ['latexrecovery'](), clearEditorContent(), _0x3c391f;
  } catch (_0x2ff00a) {
    return console[_0x2e9a8e(0x89)](_0x2e9a8e(0xd0), _0x2ff00a), ![];
  }
};
function hml_upload(_0x56128e) {
  const _0x294efe = _0x46d5ad;
  var _0xcfc062 = new FormData();
  _0xcfc062[_0x294efe(0x7f)](_0x294efe(0xc4), _0x56128e[_0x294efe(0xae)]),
    _0xcfc062[_0x294efe(0x7f)]('file', _0x56128e),
    _0xcfc062[_0x294efe(0x7f)](_0x294efe(0xe2), img_save_type),
    _0xcfc062[_0x294efe(0x7f)](_0x294efe(0x74), dream_server_url);
  var _0x74bfa3 = new XMLHttpRequest();
  _0x74bfa3[_0x294efe(0xb4)](
    _0x294efe(0x80),
    dream_server_url + _0x294efe(0xe3),
    !![],
  ),
    _0x74bfa3[_0x294efe(0x8b)](_0xcfc062),
    (_0x74bfa3[_0x294efe(0xc8)] = function () {
      const _0x105654 = _0x294efe;
      if (
        _0x74bfa3['readyState'] == 0x4 &&
        _0x74bfa3[_0x105654(0x78)] == 0xc8
      ) {
        const _0xb9155a = document[_0x105654(0x87)](_0x105654(0xc2));
        var _0x23e578 = JSON[_0x105654(0xa2)](_0x74bfa3[_0x105654(0x9c)]);
        (_0xb9155a[_0x105654(0xa9)] = _0x23e578[_0x105654(0x7a)]),
          document['querySelector'](_0x105654(0x92))?.['classList'][
            _0x105654(0x71)
          ](_0x105654(0x77)),
          iTeXEQ[_0x105654(0xab)](_0xb9155a),
          (document['getElementById']('modal_block')[_0x105654(0x83)][
            _0x105654(0x8c)
          ] = _0x105654(0x76)),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
function _0x126d() {
  const _0x19c3ac = [
    'Editor\x20not\x20found',
    'innerHTML',
    'false',
    'recoverynew_no_click',
    'tag_content',
    'document',
    'name',
    'tl_answer',
    'SMALL',
    'Error\x20processing\x20image:',
    'addEventListener',
    'openEQ',
    'open',
    'QUESTION',
    '콘텐츠\x20삽입\x20중\x20오류\x20발생:',
    '2944rcQSCg',
    'getElementById',
    'body',
    'contentDocument',
    'includes',
    'tag_group',
    'recoverynew',
    'modal_block',
    'TEXT',
    'data',
    'setExamData',
    '.itex_hml_convert_view',
    'tag_exam',
    'file_name',
    'data:\x20',
    'classList',
    '.exam_box',
    'onreadystatechange',
    'contains',
    '5767659aznMYE',
    'No\x20data\x20found\x20in\x20the\x20parsed\x20document.',
    '원래\x20자리를\x20찾을\x20수\x20없습니다.',
    'contentWindow',
    'blob',
    'appendChild',
    'Error\x20while\x20saving\x20exam\x20data:',
    '5hxfOJR',
    'getExamCodenum',
    'TITLE',
    'image.png',
    'remove',
    'isArray',
    '786828DDMDYm',
    'setAttribute',
    'exam_box_',
    'tag_choices',
    'saveExamData',
    'trim',
    'Error\x20in\x20math\x20render:',
    'tag_commentary',
    '문제\x20태그가\x20필요합니다!',
    'stringify',
    'match',
    'img_save_type',
    '/qnapi_dream/hml_upload',
    'ELEMENT_NODE',
    'tag_tip',
    'src',
    'CONCEPT',
    'parseFromString',
    'tag_concept',
    'tag_bigcontent',
    '에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?',
    'display_inactive',
    'nextElementSibling',
    'querySelectorAll',
    '내용\x20앞에\x20태그를\x20입력해\x20주세요',
    '수정할\x20요소가\x20선택되지\x20않았습니다.',
    'cloneNode',
    '6030726ugjDFF',
    'CHOICES',
    'className',
    'push',
    'hasChildNodes',
    '93rLThFi',
    '문서를\x20업로드\x20하세요.',
    '내용\x20앞에\x20태그를\x20입력해주세요.',
    'forEach',
    'Error\x20uploading\x20image',
    'COMMENTARY',
    'setContent',
    'tag_example',
    'No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.',
    '/uploadImage',
    'EXAMPLE',
    'closest',
    '24849420QHIAMq',
    'add',
    'Img_code',
    'join',
    'save_path',
    'find',
    'none',
    'itex_area_hidden',
    'status',
    'outerHTML',
    'itexdata',
    'text/html',
    'log',
    'tag_exam_sm',
    'click',
    'append',
    'POST',
    'length',
    'function',
    'style',
    'message',
    'BIG',
    'tag_hint',
    'querySelector',
    'tag_title',
    'error',
    'block',
    'send',
    'display',
    'img_url:\x20',
    'from',
    '30350pDnznK',
    'dream_server_url:\x20',
    '1412104nisJZb',
    '.origin_img_area',
    'readyState',
    'div',
    'editor_container',
    'HINT',
    'map',
    'getContent',
    'createElement',
    'saveHmlData',
    'file',
    'responseText',
    '4074HTmfDI',
    'br[data-mce-bogus=\x221\x22]',
    'ANSWER',
    'contenteditable',
    'tinyeditor',
    'parse',
    'activeEditor',
    '데이터가\x20존재하지\x20않습니다.',
    'setExamList',
    'json',
    'get',
  ];
  _0x126d = function () {
    return _0x19c3ac;
  };
  return _0x126d();
}
let lastClickedBoxId = null,
  currentEditorContent = '';
function htmlStringToNode(_0x3dac72) {
  const _0x11834d = _0x46d5ad;
  var _0xf23d03 = document['createElement']('template');
  return (_0xf23d03[_0x11834d(0xa9)] = _0x3dac72), _0xf23d03['content'];
}
async function hml_edit_finish() {
  const _0x3105f0 = _0x46d5ad;
  if (!lastClickedBoxId) {
    console[_0x3105f0(0x89)](_0x3105f0(0xf0));
    return;
  }
  const _0x432d63 = tinymce[_0x3105f0(0xa7)](_0x3105f0(0xa1))[
      _0x3105f0(0x98)
    ](),
    _0x1b61b4 = document[_0x3105f0(0x87)](_0x3105f0(0xc2)),
    _0x3125cd = document['getElementById'](lastClickedBoxId);
  if (_0x3125cd) {
    const _0x4ad786 = htmlStringToNode(_0x432d63);
    try {
      const _0x492197 = await iTeXDBW_mathrender_hml(_0x4ad786),
        _0x184646 = document[_0x3105f0(0x99)](_0x3105f0(0x94));
      _0x184646[_0x3105f0(0xcf)](_0x492197),
        (_0x3125cd[_0x3105f0(0x79)] = _0x184646['innerHTML']),
        iTeXEQ[_0x3105f0(0xab)](_0x1b61b4),
        tinymce[_0x3105f0(0xa7)](_0x3105f0(0xa1))[_0x3105f0(0x6a)](''),
        (lastClickedBoxId = null),
        (currentEditorContent = '');
    } catch (_0x4fac0c) {
      console[_0x3105f0(0x89)]('Error\x20in\x20math\x20render:', _0x4fac0c);
    }
  } else console[_0x3105f0(0x89)](_0x3105f0(0xcc));
}
async function hml_upload_frame(_0x5ef9dc) {
  const _0x557656 = _0x46d5ad;
  document[_0x557656(0xb8)](_0x557656(0xbe))[_0x557656(0x83)][_0x557656(0x8c)] =
    _0x557656(0x8a);
  var _0x2dbac4 = new FormData();
  _0x2dbac4[_0x557656(0x7f)](_0x557656(0xc4), _0x5ef9dc[_0x557656(0xae)]),
    _0x2dbac4[_0x557656(0x7f)](_0x557656(0x9b), _0x5ef9dc),
    _0x2dbac4['append'](_0x557656(0xe2), img_save_type),
    _0x2dbac4['append']('save_path', dream_server_url);
  var _0x59f3d8 = new XMLHttpRequest();
  console[_0x557656(0x7c)](_0x557656(0x90), dream_server_url),
    _0x59f3d8['open'](
      _0x557656(0x80),
      dream_server_url + _0x557656(0xe3),
      !![],
    ),
    _0x59f3d8['send'](_0x2dbac4),
    (_0x59f3d8[_0x557656(0xc8)] = async function () {
      const _0x3c60ec = _0x557656;
      if (
        _0x59f3d8[_0x3c60ec(0x93)] == 0x4 &&
        _0x59f3d8[_0x3c60ec(0x78)] == 0xc8
      ) {
        const _0x31ca22 = document[_0x3c60ec(0x87)](_0x3c60ec(0xc2));
        console[_0x3c60ec(0x7c)](_0x59f3d8[_0x3c60ec(0x9c)]);
        var _0x2f6fdf = JSON['parse'](_0x59f3d8[_0x3c60ec(0x9c)]);
        const _0x4aa9f0 = iTeX_hml_tag_parser(_0x2f6fdf[_0x3c60ec(0x7a)]);
        (_0x31ca22[_0x3c60ec(0xa9)] = _0x4aa9f0),
          _0x31ca22[_0x3c60ec(0xb2)](
            _0x3c60ec(0x7e),
            async function (_0x10e6e8) {
              const _0x4fd5a2 = _0x3c60ec;
              if (_0x10e6e8['target'][_0x4fd5a2(0x6f)](_0x4fd5a2(0xc7))) {
                const _0x1926b9 = _0x10e6e8['target'][_0x4fd5a2(0x6f)](
                    _0x4fd5a2(0xc7),
                  ),
                  _0x28b18d = _0x1926b9['getAttribute']('id');
                lastClickedBoxId &&
                  tinymce[_0x4fd5a2(0xa7)]('tinyeditor')[_0x4fd5a2(0x98)]() !==
                    currentEditorContent &&
                  confirm(
                    '변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.',
                  ) &&
                  (await hml_edit_finish());
                const _0x42fc9a = htmlStringToNode(_0x1926b9[_0x4fd5a2(0x79)]);
                lastClickedBoxId = _0x28b18d;
                try {
                  const _0x1ffafb = await iTeXDBW_mathrender_hml(_0x42fc9a),
                    _0x5b74f3 = document[_0x4fd5a2(0x99)](_0x4fd5a2(0x94));
                  _0x5b74f3[_0x4fd5a2(0xcf)](_0x1ffafb),
                    tinymce[_0x4fd5a2(0xa7)]('tinyeditor')['setContent'](
                      _0x5b74f3[_0x4fd5a2(0xa9)],
                    ),
                    (currentEditorContent = _0x5b74f3['innerHTML']);
                } catch (_0x22c49f) {
                  console[_0x4fd5a2(0x89)](_0x4fd5a2(0xdd), _0x22c49f);
                }
                iTeXEQ[_0x4fd5a2(0xbd)]();
              }
            },
          ),
          document[_0x3c60ec(0x87)]('.origin_img_area')?.[_0x3c60ec(0xc6)][
            _0x3c60ec(0x71)
          ]('itex_area_hidden'),
          iTeXEQ[_0x3c60ec(0xab)](_0x31ca22),
          (document['getElementById'](_0x3c60ec(0xbe))[_0x3c60ec(0x83)][
            _0x3c60ec(0x8c)
          ] = _0x3c60ec(0x76));
      }
    });
}
window[_0x46d5ad(0x9a)] = function () {
  const _0x41fbd8 = _0x46d5ad,
    _0x3aa432 = document[_0x41fbd8(0x87)](_0x41fbd8(0xc2))[_0x41fbd8(0xf1)](
      !![],
    );
  if (!_0x3aa432[_0x41fbd8(0xf6)]()) {
    alert(_0x41fbd8(0xf8));
    return;
  }
  const _0x19626f = tinymce[_0x41fbd8(0xa7)](_0x41fbd8(0xa1))[
    _0x41fbd8(0x98)
  ]();
  if (_0x19626f['trim']() !== '') {
    const _0x19f7b3 = confirm(_0x41fbd8(0xeb));
    if (!_0x19f7b3) return;
  }
  if (_0x3aa432) {
    const _0x656798 = _0x3aa432['querySelectorAll'](_0x41fbd8(0xc7)),
      _0x491273 = [];
    return (
      _0x656798['forEach']((_0x5b61f8, _0x7a45fa) => {
        const _0x517c05 = _0x41fbd8,
          _0x5d301a = [];
        let _0x217f2b = 0x1;
        const _0x135e2f = _0x5b61f8[_0x517c05(0xee)]('p');
        _0x135e2f['forEach']((_0x1ce12f) => {
          const _0x109f95 = _0x517c05,
            _0x3fc25d = _0x1ce12f?.['classList'];
          let _0xe34eaf = null;
          if (_0x3fc25d[_0x109f95(0xc9)](_0x109f95(0xea)))
            _0xe34eaf = _0x109f95(0x85);
          else {
            if (_0x3fc25d[_0x109f95(0xc9)]('tag_content'))
              _0xe34eaf = _0x109f95(0xbf);
            else {
              if (_0x3fc25d[_0x109f95(0xc9)](_0x109f95(0xc3)))
                _0xe34eaf = _0x109f95(0xb5);
              else {
                if (_0x3fc25d['contains']('tag_exam_sm'))
                  _0xe34eaf = _0x109f95(0xb0);
                else {
                  if (_0x3fc25d[_0x109f95(0xc9)](_0x109f95(0x6b)))
                    _0xe34eaf = _0x109f95(0x6e);
                  else {
                    if (_0x3fc25d[_0x109f95(0xc9)](_0x109f95(0xda)))
                      _0xe34eaf = _0x109f95(0xf3);
                    else {
                      if (_0x3fc25d['contains'](_0x109f95(0xaf)))
                        _0xe34eaf = _0x109f95(0x9f);
                      else {
                        if (_0x3fc25d['contains'](_0x109f95(0xde)))
                          _0xe34eaf = _0x109f95(0x69);
                        else {
                          if (_0x3fc25d[_0x109f95(0xc9)](_0x109f95(0x86)))
                            _0xe34eaf = _0x109f95(0x96);
                          else {
                            if (_0x3fc25d[_0x109f95(0xc9)](_0x109f95(0xe9)))
                              _0xe34eaf = _0x109f95(0xe7);
                            else {
                              if (_0x3fc25d[_0x109f95(0xc9)](_0x109f95(0x88)))
                                _0xe34eaf = _0x109f95(0xd3);
                              else {
                                if (_0x3fc25d[_0x109f95(0xc9)](_0x109f95(0xe5)))
                                  _0xe34eaf = 'TIP';
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
          if (_0xe34eaf) {
            let _0x56978b = _0x1ce12f['outerHTML'],
              _0x108316 = _0x1ce12f[_0x109f95(0xed)];
            while (
              _0x108316 &&
              !_0x108316[_0x109f95(0xc6)][_0x109f95(0xc9)](_0x109f95(0xea)) &&
              !_0x108316[_0x109f95(0xc6)][_0x109f95(0xc9)](_0x109f95(0xac)) &&
              !_0x108316['classList']['contains'](_0x109f95(0xc3)) &&
              !_0x108316[_0x109f95(0xc6)][_0x109f95(0xc9)](_0x109f95(0x7d)) &&
              !_0x108316['classList'][_0x109f95(0xc9)](_0x109f95(0x6b)) &&
              !_0x108316['classList']['contains'](_0x109f95(0xda)) &&
              !_0x108316[_0x109f95(0xc6)][_0x109f95(0xc9)](_0x109f95(0xaf)) &&
              !_0x108316['classList'][_0x109f95(0xc9)](_0x109f95(0xde)) &&
              !_0x108316[_0x109f95(0xc6)][_0x109f95(0xc9)](_0x109f95(0x86)) &&
              !_0x108316[_0x109f95(0xc6)][_0x109f95(0xc9)](_0x109f95(0xe9)) &&
              !_0x108316[_0x109f95(0xc6)][_0x109f95(0xc9)](_0x109f95(0x88)) &&
              !_0x108316[_0x109f95(0xc6)][_0x109f95(0xc9)](_0x109f95(0xe5))
            ) {
              (_0x56978b += _0x108316[_0x109f95(0x79)]),
                (_0x108316 = _0x108316[_0x109f95(0xed)]);
            }
            _0x5d301a[_0x109f95(0xf5)]({
              type: _0xe34eaf,
              content: _0x56978b,
              sort: _0x217f2b++,
            });
          }
        }),
          _0x491273['push']({ id: null, quizItemList: _0x5d301a });
      }),
      tinymce[_0x41fbd8(0xa7)](_0x41fbd8(0xa1))[_0x41fbd8(0x6a)](''),
      _0x491273
    );
  } else return console['log'](_0x41fbd8(0xa4)), null;
};
function processHmlData(_0x462056) {
  const _0x5f4ddb = _0x46d5ad,
    _0x3edba1 = [],
    _0x625afc = Array[_0x5f4ddb(0x8e)](_0x462056['querySelectorAll']('p'));
  let _0x451687 = [],
    _0xbc33b7 = ![];
  return (
    _0x625afc['forEach']((_0x284a98) => {
      const _0x4a401d = _0x5f4ddb;
      divideKey['includes'](_0x284a98[_0x4a401d(0xf4)])
        ? (_0x451687[_0x4a401d(0x81)] > 0x0 &&
            (_0x3edba1[_0x4a401d(0xf5)](
              _0x451687[_0x4a401d(0x97)](
                (_0x1aca24) => _0x1aca24[_0x4a401d(0x79)],
              )[_0x4a401d(0x73)](''),
            ),
            (_0x451687 = [])),
          _0x451687[_0x4a401d(0xf5)](_0x284a98))
        : _0x451687[_0x4a401d(0xf5)](_0x284a98);
    }),
    _0x451687[_0x5f4ddb(0x81)] > 0x0 &&
      _0x3edba1[_0x5f4ddb(0xf5)](
        _0x451687[_0x5f4ddb(0x97)]((_0x7d4eec) => _0x7d4eec[_0x5f4ddb(0x79)])[
          'join'
        ](''),
      ),
    _0x3edba1
  );
}
window[_0x46d5ad(0xb2)](_0x46d5ad(0x84), (_0x5d2832) => {
  const _0x259e50 = _0x46d5ad,
    { functionName: _0x5260dd, args: _0x71fcca } = _0x5d2832[_0x259e50(0xc0)];
  _0x5260dd === _0x259e50(0xc1) &&
    typeof window[_0x5260dd] === _0x259e50(0x82) &&
    window[_0x5260dd](_0x71fcca[0x0]),
    _0x5260dd === _0x259e50(0xa5) &&
      typeof window[_0x5260dd] === 'function' &&
      window[_0x5260dd](_0x71fcca[0x0]),
    _0x5260dd === _0x259e50(0xd2) &&
      typeof window[_0x5260dd] === _0x259e50(0x82) &&
      window[_0x5260dd](_0x71fcca[0x0]),
    _0x5260dd === 'saveExamData' &&
      typeof window[_0x5260dd] === _0x259e50(0x82) &&
      window[_0x5260dd](_0x71fcca[0x0]);
});
function iTeX_hml_tag_parser(_0x305998) {
  const _0x7332c6 = _0x46d5ad,
    _0x544549 = new DOMParser(),
    _0x5009ff = _0x544549[_0x7332c6(0xe8)](_0x305998, 'text/html'),
    _0x5207f1 = _0x5009ff['querySelectorAll']('p'),
    _0x5aafd8 = {
      그룹: 'tag_group',
      대발문: _0x7332c6(0xea),
      지문: 'tag_content',
      문제: _0x7332c6(0xc3),
      소문제: _0x7332c6(0x7d),
      보기: _0x7332c6(0x6b),
      선지: 'tag_choices',
      정답: _0x7332c6(0xaf),
      해설: _0x7332c6(0xde),
      힌트: _0x7332c6(0x86),
      개념: _0x7332c6(0xe9),
      제목: _0x7332c6(0x88),
      팁: _0x7332c6(0xe5),
    };
  let _0xf70dc2 = '',
    _0x235ca5 = null,
    _0x5441c = 0x0;
  return (
    _0x5207f1[_0x7332c6(0x67)]((_0x6d7bdb) => {
      const _0x2eacdf = _0x7332c6;
      _0x6d7bdb['removeAttribute']('style');
      let _0x389fc8 = _0x6d7bdb['textContent'][_0x2eacdf(0xdc)]();
      const _0x521d5b = _0x389fc8[_0x2eacdf(0xe1)](/^\[(.*?)\]$/);
      if (_0x521d5b) {
        const _0x592113 = _0x521d5b[0x1]['replace'](/\s+/g, '');
        _0x592113 in _0x5aafd8 &&
          (_0x6d7bdb?.[_0x2eacdf(0xc6)][_0x2eacdf(0x71)](_0x5aafd8[_0x592113]),
          _0x6d7bdb[_0x2eacdf(0xd8)](_0x2eacdf(0xa0), _0x2eacdf(0xaa)),
          _0x5aafd8[_0x592113] === _0x2eacdf(0xbc) &&
            (_0x235ca5 && (_0xf70dc2 += _0x235ca5['outerHTML']),
            (_0x235ca5 = document[_0x2eacdf(0x99)](_0x2eacdf(0x94))),
            _0x235ca5?.[_0x2eacdf(0xc6)][_0x2eacdf(0x71)]('exam_box'),
            _0x235ca5[_0x2eacdf(0xd8)]('id', _0x2eacdf(0xd9) + _0x5441c++)));
      }
      _0x235ca5 && _0x235ca5[_0x2eacdf(0xcf)](_0x6d7bdb);
    }),
    _0x235ca5 && (_0xf70dc2 += _0x235ca5[_0x7332c6(0x79)]),
    _0xf70dc2
  );
}
