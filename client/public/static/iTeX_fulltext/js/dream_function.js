// eslint-disable-next-line no-undef
// iTeXEQ.editor_container = 'editor_container';
const _0x4dca9b = _0x5454;
(function (_0x6f17ea, _0x3d6cff) {
  const _0x3b3e38 = _0x5454,
    _0x143d0d = _0x6f17ea();
  while ([]) {
    try {
      const _0x6c88d3 =
        (-parseInt(_0x3b3e38(0x1bb)) / 0x1) *
          (parseInt(_0x3b3e38(0x1fa)) / 0x2) +
        (-parseInt(_0x3b3e38(0x216)) / 0x3) *
          (parseInt(_0x3b3e38(0x1af)) / 0x4) +
        (parseInt(_0x3b3e38(0x204)) / 0x5) *
          (-parseInt(_0x3b3e38(0x195)) / 0x6) +
        (parseInt(_0x3b3e38(0x1cd)) / 0x7) *
          (parseInt(_0x3b3e38(0x1a7)) / 0x8) +
        (-parseInt(_0x3b3e38(0x1e0)) / 0x9) *
          (-parseInt(_0x3b3e38(0x21a)) / 0xa) +
        (parseInt(_0x3b3e38(0x1f1)) / 0xb) *
          (-parseInt(_0x3b3e38(0x20e)) / 0xc) +
        parseInt(_0x3b3e38(0x20f)) / 0xd;
      if (_0x6c88d3 === _0x3d6cff) break;
      else _0x143d0d['push'](_0x143d0d['shift']());
    } catch (_0x6ed755) {
      _0x143d0d['push'](_0x143d0d['shift']());
    }
  }
})(_0x5226, 0x78621),
  (window[_0x4dca9b(0x1a8)] = () => {
    const _0x35887a = _0x4dca9b,
      _0x1c19ef = document[_0x35887a(0x1fe)](iTeXEQ[_0x35887a(0x20b)]);
    function _0x3e27d5() {
      const _0x585779 = _0x35887a;
      (onlyEQ = !![]),
        _0x1c19ef?.[_0x585779(0x214)][_0x585779(0x1df)](_0x585779(0x18f)),
        iTeXEQ[_0x585779(0x218)]();
    }
    function _0x2c15f2() {
      const _0x467756 = _0x35887a;
      (onlyEQ = ![]),
        _0x1c19ef?.[_0x467756(0x214)][_0x467756(0x1e9)](_0x467756(0x18f));
    }
    _0x1c19ef?.['classList']['contains'](_0x35887a(0x18f))
      ? _0x3e27d5()
      : _0x2c15f2();
  }),
  (window[_0x4dca9b(0x1ae)] = function setExamData(_0x57247d) {
    const _0x582e04 = _0x4dca9b;
    try {
      const _0x4368f8 = tinymce[_0x582e04(0x19c)](_0x582e04(0x202));
      return _0x4368f8
        ? (_0x4368f8[_0x582e04(0x213)][_0x582e04(0x1ce)](_0x57247d), !![])
        : (console[_0x582e04(0x1c0)](_0x582e04(0x1fc)), ![]);
    } catch (_0x38744b) {
      return (
        console[_0x582e04(0x1c0)](
          '콘텐츠\x20삽입\x20중\x20오류\x20발생:',
          _0x38744b,
        ),
        ![]
      );
    }
  });
async function uploadImageToServer(_0x8ad88c, _0x54d341) {
  const _0x66ea7a = _0x4dca9b,
    _0x52d732 = new FormData(),
    _0x4e615c = await fetch(_0x54d341),
    _0x171320 = await _0x4e615c[_0x66ea7a(0x192)]();
  _0x52d732[_0x66ea7a(0x1f7)](_0x66ea7a(0x1e6), _0x171320, 'image.png'),
    _0x52d732[_0x66ea7a(0x1f7)](_0x66ea7a(0x1ec), _0x8ad88c);
  const _0x2ab186 = await fetch(dream_server_url + _0x66ea7a(0x1d8), {
    method: 'POST',
    body: _0x52d732,
  });
  if (!_0x2ab186['ok']) throw new Error('Error\x20uploading\x20image');
  const _0x3fc57a = await _0x2ab186[_0x66ea7a(0x18c)]();
  return _0x3fc57a[_0x66ea7a(0x215)];
}
function _0x5226() {
  const _0x54d8dd = [
    'setContent',
    'push',
    'Img_code',
    'No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.',
    'file_name',
    'TIP',
    'tag_content',
    'outerHTML',
    'log',
    'tag_concept',
    '/uploadImage',
    'readyState',
    'stringify',
    'tag_exam_sm',
    '문제\x20태그가\x20필요합니다!',
    'none',
    'contains',
    'remove',
    '9vdylPG',
    'Error\x20while\x20saving\x20exam\x20data:',
    'SMALL',
    'removeSVG',
    'querySelector',
    'COMMENTARY',
    'file',
    'style',
    'tag_example',
    'add',
    'TEXT',
    'itexdata',
    'img_save_type',
    'Error\x20in\x20math\x20render:',
    'setExamList',
    'img',
    'tag_group',
    '3058DETvDb',
    'document',
    'br[data-mce-bogus=\x221\x22]',
    'nodeType',
    'BIG',
    'removeAttribute',
    'append',
    '내용을\x20입력해주세요.',
    'closest',
    '2NXUZGu',
    'POST',
    'ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.',
    'TITLE',
    'getElementById',
    '.exam_box',
    'tag_commentary',
    'No\x20data\x20found\x20in\x20the\x20parsed\x20document.',
    'tinyeditor',
    '.origin_img_area',
    '310akypWa',
    'tl_answer',
    'saveHmlData',
    'nextElementSibling',
    'recoverynew',
    '.itex_hml_convert_view',
    'forEach',
    'editor_container',
    'contentWindow',
    'send',
    '41136XYVbTG',
    '15159352kxKAnS',
    'tag_choices',
    '에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?',
    'latexrecovery',
    'selection',
    'classList',
    'imgUUID',
    '3ZYfWGm',
    'includes',
    'editorStart',
    'exam_box_',
    '7367210KghqqO',
    'addEventListener',
    'json',
    'getContent',
    'saveExamData',
    'display_inactive',
    'activeEditor',
    'onreadystatechange',
    'blob',
    'responseText',
    'EXAMPLE',
    '40410YpzROQ',
    'QUESTION',
    '/hml_image',
    'click',
    'getExamCodenum',
    'parse',
    'createElement',
    'get',
    'name',
    'setAttribute',
    'ELEMENT_NODE',
    '/qnapi_dream/hml_upload',
    'querySelectorAll',
    'Parsed\x20document\x20does\x20not\x20contain\x20body.',
    'match',
    'status',
    'ANSWER',
    'tag_exam',
    '467528fMmUli',
    'openEQ',
    'tag_tip',
    'textContent',
    'div',
    'find',
    'tag_title',
    'usePostJsonData',
    '760qCiKNl',
    'cloneNode',
    'tag_bigcontent',
    'getAttribute',
    'trim',
    'join',
    'appendChild',
    'text/html',
    'src',
    'block',
    'body',
    'tag_hint',
    '214315RSZsRU',
    'recoverynew_no_click',
    'itex_area_hidden',
    'modal_block',
    'from',
    'error',
    'HINT',
    'target',
    '원래\x20자리를\x20찾을\x20수\x20없습니다.',
    '문서를\x20업로드\x20하세요.',
    'innerHTML',
    'indexOf',
    'function',
    'display',
    'hasChildNodes',
    'message',
    'parseFromString',
    'template',
    '21KHXkgw',
  ];
  _0x5226 = function () {
    return _0x54d8dd;
  };
  return _0x5226();
}
function clearEditorContent() {
  const _0xf0eca4 = _0x4dca9b,
    _0x548ab1 = tinymce[_0xf0eca4(0x19c)](_0xf0eca4(0x202));
  _0x548ab1
    ? _0x548ab1[_0xf0eca4(0x1ce)]('')
    : console[_0xf0eca4(0x1c0)]('Editor\x20not\x20found');
}
window['saveExamData'] = async function () {
  const _0x5045de = _0x4dca9b;
  try {
    const _0x45170e =
        tinymce[_0x5045de(0x190)][_0x5045de(0x20c)][_0x5045de(0x1f2)] ||
        tinymce[_0x5045de(0x190)]['contentDocument'][_0x5045de(0x1f2)],
      _0x2fc308 = iTeXEQ[_0x5045de(0x1e3)](
        _0x45170e['querySelector'](_0x5045de(0x1b9)),
      );
    if (!_0x2fc308) return console[_0x5045de(0x1c0)](_0x5045de(0x201)), ![];
    const _0x56eba8 = [
        _0x5045de(0x1b1),
        'tag_content',
        _0x5045de(0x1a6),
        _0x5045de(0x1db),
        _0x5045de(0x1e8),
        _0x5045de(0x210),
        'tl_answer',
        _0x5045de(0x200),
        _0x5045de(0x1ba),
        _0x5045de(0x1d7),
        'tag_title',
        'tag_tip',
      ],
      _0x1c3d8b = _0x2fc308[_0x5045de(0x1a1)]('p');
    if (_0x1c3d8b) {
      const _0x46e5dd = _0x1c3d8b[0x0][_0x5045de(0x1e4)](_0x5045de(0x1f3)),
        _0x379400 = Array['from'](_0x1c3d8b[0x0]?.[_0x5045de(0x214)])[
          _0x5045de(0x1ac)
        ]((_0x3c926a) => _0x56eba8['includes'](_0x3c926a)),
        _0xc7e1e4 = Array['from'](_0x1c3d8b)[_0x5045de(0x1ac)]((_0x3b8d2a) =>
          _0x3b8d2a?.[_0x5045de(0x214)][_0x5045de(0x1de)](_0x5045de(0x1a6)),
        ),
        _0x1778dd = Array[_0x5045de(0x1bf)](_0x1c3d8b)[_0x5045de(0x1ac)](
          (_0xb89dc9) =>
            _0xb89dc9?.['classList'][_0x5045de(0x1de)](_0x5045de(0x1f0)),
        );
      if (_0x46e5dd) return alert(_0x5045de(0x1f8)), ![];
      if (!_0x379400)
        return (
          alert('내용\x20앞에\x20태그를\x20입력해\x20주세요'),
          iTeXEQ[_0x5045de(0x212)](),
          ![]
        );
      if (!_0xc7e1e4) return alert(_0x5045de(0x1dc)), ![];
    } else return alert(_0x5045de(0x1d1)), ![];
    const _0x4df2e6 = _0x2fc308[_0x5045de(0x1a1)](_0x5045de(0x1ef));
    for (const _0x114c47 of _0x4df2e6) {
      try {
        const _0x367b88 = await uploadImageToServer(
          img_save_type,
          _0x114c47[_0x5045de(0x1b7)],
        );
        _0x114c47[_0x5045de(0x19e)](_0x5045de(0x1d0), _0x367b88);
      } catch (_0x37b755) {
        console[_0x5045de(0x1c0)](
          'Error\x20processing\x20image:',
          _0x114c47[_0x5045de(0x1b7)],
          _0x37b755,
        );
      }
    }
    const _0x2a1f48 = {
        tag_group: _0x2fc308[_0x5045de(0x1c5)],
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
      _0xebd00 = new DOMParser(),
      _0x567fb0 = _0xebd00[_0x5045de(0x1cb)](
        _0x2fc308[_0x5045de(0x1c5)],
        'text/html',
      );
    let _0x4c1628 = null,
      _0x18821e = '';
    if (!_0x567fb0['body']) return console['error'](_0x5045de(0x1a2)), ![];
    const _0x400cf1 = (_0x4fa846, _0x4f39ff) => {
      const _0x2d2885 = _0x5045de;
      Array['isArray'](_0x2a1f48[_0x4fa846]) &&
        _0x2a1f48[_0x4fa846][_0x2d2885(0x1cf)](_0x4f39ff);
    };
    Array[_0x5045de(0x1bf)](_0x567fb0[_0x5045de(0x1b9)]['childNodes'])[
      _0x5045de(0x20a)
    ]((_0x338670) => {
      const _0x3d3716 = _0x5045de;
      if (_0x338670[_0x3d3716(0x1f4)] === Node[_0x3d3716(0x19f)]) {
        const _0x3a6dcf = Array[_0x3d3716(0x1bf)](
            _0x338670?.[_0x3d3716(0x214)],
          ),
          _0x35bd02 = _0x3a6dcf[_0x3d3716(0x1ac)]((_0x3686be) =>
            _0x56eba8['includes'](_0x3686be),
          );
        if (_0x35bd02)
          _0x4c1628 && _0x400cf1(_0x4c1628, _0x18821e),
            (_0x4c1628 = _0x35bd02),
            (_0x18821e = _0x338670[_0x3d3716(0x1d5)]);
        else _0x4c1628 && (_0x18821e += _0x338670['outerHTML']);
      }
    });
    _0x4c1628 && _0x400cf1(_0x4c1628, _0x18821e);
    const _0x21a64a = JSON[_0x5045de(0x1da)](_0x2a1f48, null, 0x2);
    return iTeXEQ[_0x5045de(0x212)](), clearEditorContent(), _0x21a64a;
  } catch (_0x496135) {
    return console[_0x5045de(0x1c0)](_0x5045de(0x1e1), _0x496135), ![];
  }
};
function _0x5454(_0x6970df, _0x2730ee) {
  const _0x522628 = _0x5226();
  return (
    (_0x5454 = function (_0x54547d, _0x36e847) {
      _0x54547d = _0x54547d - 0x18c;
      let _0x56e6cf = _0x522628[_0x54547d];
      return _0x56e6cf;
    }),
    _0x5454(_0x6970df, _0x2730ee)
  );
}
function hml_upload(_0xa404cc) {
  const _0x22409c = _0x4dca9b;
  var _0x10a437 = new FormData();
  _0x10a437[_0x22409c(0x1f7)](_0x22409c(0x1d2), _0xa404cc[_0x22409c(0x19d)]),
    _0x10a437[_0x22409c(0x1f7)](_0x22409c(0x1e6), _0xa404cc);
  var _0x3b2d17 = new XMLHttpRequest();
  _0x3b2d17['open'](
    _0x22409c(0x1fb),
    dream_server_url + _0x22409c(0x1a0),
    !![],
  ),
    _0x3b2d17['send'](_0x10a437),
    (_0x3b2d17[_0x22409c(0x191)] = function () {
      const _0x39cad5 = _0x22409c;
      if (_0x3b2d17[_0x39cad5(0x1d9)] == 0x4 && _0x3b2d17['status'] == 0xc8) {
        const _0x2c695f = document[_0x39cad5(0x1e4)]('.itex_hml_convert_view');
        var _0x343598 = JSON[_0x39cad5(0x19a)](_0x3b2d17[_0x39cad5(0x193)]);
        (_0x2c695f['innerHTML'] = _0x343598[_0x39cad5(0x1eb)]),
          document['querySelector']('.origin_img_area')?.[_0x39cad5(0x214)][
            'add'
          ](_0x39cad5(0x1bd)),
          iTeXEQ[_0x39cad5(0x1bc)](_0x2c695f),
          (document['getElementById'](_0x39cad5(0x1be))['style'][
            _0x39cad5(0x1c8)
          ] = _0x39cad5(0x1dd)),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
let lastClickedBoxId = null,
  currentEditorContent = '';
function htmlStringToNode(_0x40d12f) {
  const _0x4e0fb6 = _0x4dca9b;
  var _0x4c7aef = document[_0x4e0fb6(0x19b)](_0x4e0fb6(0x1cc));
  return (_0x4c7aef[_0x4e0fb6(0x1c5)] = _0x40d12f), _0x4c7aef['content'];
}
async function hml_edit_finish() {
  const _0x62de = _0x4dca9b;
  if (!lastClickedBoxId) {
    console['error']('수정할\x20요소가\x20선택되지\x20않았습니다.');
    return;
  }
  const _0x27f935 = tinymce[_0x62de(0x19c)](_0x62de(0x202))['getContent'](),
    _0x4e67ce = document[_0x62de(0x1e4)](_0x62de(0x209)),
    _0x34e74a = document['getElementById'](lastClickedBoxId);
  if (_0x34e74a) {
    const _0x6d52f3 = htmlStringToNode(_0x27f935);
    try {
      const _0x15e2eb = await iTeXDBW_mathrender_hml(_0x6d52f3),
        _0xa438fa = document[_0x62de(0x19b)](_0x62de(0x1ab));
      _0xa438fa[_0x62de(0x1b5)](_0x15e2eb),
        (_0x34e74a['outerHTML'] = _0xa438fa['innerHTML']),
        iTeXEQ[_0x62de(0x1bc)](_0x4e67ce),
        tinymce[_0x62de(0x19c)](_0x62de(0x202))['setContent'](''),
        (lastClickedBoxId = null),
        (currentEditorContent = '');
    } catch (_0x4b0e96) {
      console['error'](_0x62de(0x1ed), _0x4b0e96);
    }
  } else console[_0x62de(0x1c0)](_0x62de(0x1c3));
}
async function hml_upload_frame(_0x2ffe36) {
  const _0x31e61d = _0x4dca9b;
  document['getElementById'](_0x31e61d(0x1be))['style']['display'] =
    _0x31e61d(0x1b8);
  var _0x556a32 = new FormData();
  _0x556a32[_0x31e61d(0x1f7)](_0x31e61d(0x1d2), _0x2ffe36[_0x31e61d(0x19d)]),
    _0x556a32[_0x31e61d(0x1f7)](_0x31e61d(0x1e6), _0x2ffe36);
  var _0x37832b = new XMLHttpRequest();
  _0x37832b['open'](
    _0x31e61d(0x1fb),
    dream_server_url + _0x31e61d(0x1a0),
    !![],
  ),
    _0x37832b[_0x31e61d(0x20d)](_0x556a32),
    (_0x37832b[_0x31e61d(0x191)] = async function () {
      const _0x2a31a7 = _0x31e61d;
      if (
        _0x37832b[_0x2a31a7(0x1d9)] == 0x4 &&
        _0x37832b[_0x2a31a7(0x1a4)] == 0xc8
      ) {
        const _0x1ee140 = document['querySelector'](_0x2a31a7(0x209));
        var _0x4e2ee6 = JSON['parse'](_0x37832b[_0x2a31a7(0x193)]);
        const _0x35c2b5 = iTeX_hml_tag_parser(_0x4e2ee6['itexdata']);
        console[_0x2a31a7(0x1d6)](_0x35c2b5),
          (_0x1ee140[_0x2a31a7(0x1c5)] = _0x35c2b5),
          _0x1ee140[_0x2a31a7(0x21b)](
            _0x2a31a7(0x198),
            async function (_0xd99b67) {
              const _0x83f849 = _0x2a31a7;
              if (
                _0xd99b67[_0x83f849(0x1c2)][_0x83f849(0x1f9)](_0x83f849(0x1ff))
              ) {
                const _0x3ec2bf = _0xd99b67[_0x83f849(0x1c2)][_0x83f849(0x1f9)](
                    _0x83f849(0x1ff),
                  ),
                  _0x4620bf = _0x3ec2bf[_0x83f849(0x1b2)]('id');
                lastClickedBoxId &&
                  tinymce[_0x83f849(0x19c)](_0x83f849(0x202))[
                    _0x83f849(0x18d)
                  ]() !== currentEditorContent &&
                  confirm(
                    '변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.',
                  ) &&
                  (await hml_edit_finish());
                const _0x369d34 = htmlStringToNode(_0x3ec2bf[_0x83f849(0x1d5)]);
                lastClickedBoxId = _0x4620bf;
                try {
                  const _0x42b95f = await iTeXDBW_mathrender_hml(_0x369d34),
                    _0x159b07 = document['createElement'](_0x83f849(0x1ab));
                  _0x159b07[_0x83f849(0x1b5)](_0x42b95f),
                    tinymce[_0x83f849(0x19c)]('tinyeditor')[_0x83f849(0x1ce)](
                      _0x159b07[_0x83f849(0x1c5)],
                    ),
                    (currentEditorContent = _0x159b07[_0x83f849(0x1c5)]);
                } catch (_0x37aaf8) {
                  console[_0x83f849(0x1c0)](_0x83f849(0x1ed), _0x37aaf8);
                }
                iTeXEQ[_0x83f849(0x208)]();
              }
            },
          ),
          document[_0x2a31a7(0x1e4)](_0x2a31a7(0x203))?.['classList'][
            _0x2a31a7(0x1e9)
          ]('itex_area_hidden'),
          iTeXEQ[_0x2a31a7(0x1bc)](_0x1ee140),
          (document['getElementById'](_0x2a31a7(0x1be))['style'][
            _0x2a31a7(0x1c8)
          ] = _0x2a31a7(0x1dd));
      }
    });
}
window[_0x4dca9b(0x206)] = function () {
  const _0x399842 = _0x4dca9b,
    _0x5d5bfc = document[_0x399842(0x1e4)](_0x399842(0x209))[_0x399842(0x1b0)](
      !![],
    );
  if (!_0x5d5bfc[_0x399842(0x1c9)]()) {
    alert(_0x399842(0x1c4));
    return;
  }
  const _0x2315df = tinymce[_0x399842(0x19c)](_0x399842(0x202))[
    _0x399842(0x18d)
  ]();
  if (_0x2315df[_0x399842(0x1b3)]() !== '') {
    const _0x277770 = confirm(_0x399842(0x211));
    if (!_0x277770) return;
  }
  if (_0x5d5bfc) {
    const _0x538713 = _0x5d5bfc[_0x399842(0x1a1)]('.exam_box'),
      _0x5653d1 = [];
    return (
      _0x538713[_0x399842(0x20a)]((_0xef9cb5, _0x4d8619) => {
        const _0xac67e9 = _0x399842,
          _0x2c5617 = [];
        let _0x10c6cd = 0x1;
        const _0x1a91f6 = _0xef9cb5[_0xac67e9(0x1a1)]('p');
        _0x1a91f6['forEach']((_0x42adb2) => {
          const _0x335403 = _0xac67e9,
            _0x2b912a = _0x42adb2?.['classList'];
          let _0x110ab3 = null;
          if (_0x2b912a[_0x335403(0x1de)](_0x335403(0x1b1)))
            _0x110ab3 = _0x335403(0x1f5);
          else {
            if (_0x2b912a['contains'](_0x335403(0x1d4)))
              _0x110ab3 = _0x335403(0x1ea);
            else {
              if (_0x2b912a[_0x335403(0x1de)](_0x335403(0x1a6)))
                _0x110ab3 = _0x335403(0x196);
              else {
                if (_0x2b912a[_0x335403(0x1de)](_0x335403(0x1db)))
                  _0x110ab3 = _0x335403(0x1e2);
                else {
                  if (_0x2b912a[_0x335403(0x1de)]('tag_example'))
                    _0x110ab3 = _0x335403(0x194);
                  else {
                    if (_0x2b912a[_0x335403(0x1de)](_0x335403(0x210)))
                      _0x110ab3 = 'CHOICES';
                    else {
                      if (_0x2b912a['contains'](_0x335403(0x205)))
                        _0x110ab3 = _0x335403(0x1a5);
                      else {
                        if (_0x2b912a[_0x335403(0x1de)](_0x335403(0x200)))
                          _0x110ab3 = _0x335403(0x1e5);
                        else {
                          if (_0x2b912a[_0x335403(0x1de)](_0x335403(0x1ba)))
                            _0x110ab3 = _0x335403(0x1c1);
                          else {
                            if (_0x2b912a[_0x335403(0x1de)]('tag_concept'))
                              _0x110ab3 = 'CONCEPT';
                            else {
                              if (_0x2b912a['contains'](_0x335403(0x1ad)))
                                _0x110ab3 = _0x335403(0x1fd);
                              else {
                                if (_0x2b912a[_0x335403(0x1de)]('tag_tip'))
                                  _0x110ab3 = _0x335403(0x1d3);
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
          if (_0x110ab3) {
            let _0x339cfa = _0x42adb2[_0x335403(0x1d5)],
              _0x3a8269 = _0x42adb2[_0x335403(0x207)];
            while (
              _0x3a8269 &&
              !_0x3a8269['classList'][_0x335403(0x1de)](_0x335403(0x1b1)) &&
              !_0x3a8269[_0x335403(0x214)]['contains'](_0x335403(0x1d4)) &&
              !_0x3a8269[_0x335403(0x214)]['contains'](_0x335403(0x1a6)) &&
              !_0x3a8269[_0x335403(0x214)][_0x335403(0x1de)](
                _0x335403(0x1db),
              ) &&
              !_0x3a8269['classList']['contains'](_0x335403(0x1e8)) &&
              !_0x3a8269['classList'][_0x335403(0x1de)](_0x335403(0x210)) &&
              !_0x3a8269['classList']['contains'](_0x335403(0x205)) &&
              !_0x3a8269[_0x335403(0x214)]['contains']('tag_commentary') &&
              !_0x3a8269['classList'][_0x335403(0x1de)](_0x335403(0x1ba)) &&
              !_0x3a8269[_0x335403(0x214)][_0x335403(0x1de)]('tag_concept') &&
              !_0x3a8269[_0x335403(0x214)][_0x335403(0x1de)](
                _0x335403(0x1ad),
              ) &&
              !_0x3a8269[_0x335403(0x214)]['contains'](_0x335403(0x1a9))
            ) {
              (_0x339cfa += _0x3a8269['outerHTML']),
                (_0x3a8269 = _0x3a8269['nextElementSibling']);
            }
            _0x2c5617[_0x335403(0x1cf)]({
              type: _0x110ab3,
              content: _0x339cfa,
              sort: _0x10c6cd++,
            });
          }
        }),
          _0x5653d1[_0xac67e9(0x1cf)]({ id: null, quizItemList: _0x2c5617 });
      }),
      tinymce['get'](_0x399842(0x202))[_0x399842(0x1ce)](''),
      _0x5653d1
    );
  } else return console['log']('데이터가\x20존재하지\x20않습니다.'), null;
};
function processHmlData(_0x2fe045) {
  const _0x47fd8a = _0x4dca9b,
    _0x7d0376 = [],
    _0x2f8c8 = Array[_0x47fd8a(0x1bf)](_0x2fe045['querySelectorAll']('p'));
  let _0x57e45d = [],
    _0x62f8a7 = ![];
  return (
    _0x2f8c8['forEach']((_0x21d1cb) => {
      const _0x522493 = _0x47fd8a;
      divideKey[_0x522493(0x217)](_0x21d1cb['className'])
        ? (_0x57e45d['length'] > 0x0 &&
            (_0x7d0376[_0x522493(0x1cf)](
              _0x57e45d['map']((_0x4bf3af) => _0x4bf3af['outerHTML'])[
                _0x522493(0x1b4)
              ](''),
            ),
            (_0x57e45d = [])),
          _0x57e45d[_0x522493(0x1cf)](_0x21d1cb))
        : _0x57e45d['push'](_0x21d1cb);
    }),
    _0x57e45d['length'] > 0x0 &&
      _0x7d0376[_0x47fd8a(0x1cf)](
        _0x57e45d['map']((_0x44592b) => _0x44592b['outerHTML'])[
          _0x47fd8a(0x1b4)
        ](''),
      ),
    _0x7d0376
  );
}
window[_0x4dca9b(0x21b)](_0x4dca9b(0x1ca), (_0x53abfa) => {
  const _0x3aa638 = _0x4dca9b,
    { functionName: _0x3686b6, args: _0xf2350a } = _0x53abfa['data'];
  _0x3686b6 === 'setExamData' &&
    typeof window[_0x3686b6] === _0x3aa638(0x1c7) &&
    window[_0x3686b6](_0xf2350a[0x0]),
    _0x3686b6 === _0x3aa638(0x1ee) &&
      typeof window[_0x3686b6] === _0x3aa638(0x1c7) &&
      window[_0x3686b6](_0xf2350a[0x0]),
    _0x3686b6 === _0x3aa638(0x199) &&
      typeof window[_0x3686b6] === _0x3aa638(0x1c7) &&
      window[_0x3686b6](_0xf2350a[0x0]),
    _0x3686b6 === _0x3aa638(0x18e) &&
      typeof window[_0x3686b6] === _0x3aa638(0x1c7) &&
      window[_0x3686b6](_0xf2350a[0x0]);
});
function iTeX_hml_tag_parser(_0x2a6122) {
  const _0x197872 = _0x4dca9b,
    _0x25401e = new DOMParser(),
    _0x1e137f = _0x25401e[_0x197872(0x1cb)](_0x2a6122, _0x197872(0x1b6)),
    _0x4dea5e = _0x1e137f[_0x197872(0x1a1)]('p'),
    _0x2e048a = {
      그룹: _0x197872(0x1f0),
      대발문: 'tag_bigcontent',
      지문: _0x197872(0x1d4),
      문제: _0x197872(0x1a6),
      소문제: _0x197872(0x1db),
      보기: 'tag_example',
      선지: _0x197872(0x210),
      정답: _0x197872(0x205),
      해설: 'tag_commentary',
      힌트: 'tag_hint',
      개념: _0x197872(0x1d7),
      제목: 'tag_title',
      팁: _0x197872(0x1a9),
    };
  let _0x29f405 = '',
    _0x2b9a32 = null,
    _0x8131cc = 0x0;
  return (
    _0x4dea5e['forEach']((_0x116d4a) => {
      const _0x3a6e76 = _0x197872;
      _0x116d4a[_0x3a6e76(0x1f6)](_0x3a6e76(0x1e7));
      const _0x4db58a = _0x116d4a[_0x3a6e76(0x1a1)](_0x3a6e76(0x1ef));
      _0x4db58a[_0x3a6e76(0x20a)]((_0x58e98e) => {
        const _0x150c97 = _0x3a6e76,
          _0x16deed = _0x58e98e['getAttribute'](_0x150c97(0x1b7)),
          _0x47a6c3 =
            '' +
            uploaded_img_url +
            _0x16deed['substring'](
              _0x16deed[_0x150c97(0x1c6)](_0x150c97(0x197)),
            );
        _0x58e98e[_0x150c97(0x19e)]('src', _0x47a6c3);
      });
      let _0x16c7cd = _0x116d4a[_0x3a6e76(0x1aa)][_0x3a6e76(0x1b3)]();
      const _0x336d8a = _0x16c7cd[_0x3a6e76(0x1a3)](/^\[(.*?)\]$/);
      if (_0x336d8a) {
        const _0x167581 = _0x336d8a[0x1]['replace'](/\s+/g, '');
        _0x167581 in _0x2e048a &&
          (_0x116d4a?.['classList'][_0x3a6e76(0x1e9)](_0x2e048a[_0x167581]),
          _0x116d4a['setAttribute']('contenteditable', 'false'),
          _0x2e048a[_0x167581] === _0x3a6e76(0x1f0) &&
            (_0x2b9a32 && (_0x29f405 += _0x2b9a32[_0x3a6e76(0x1d5)]),
            (_0x2b9a32 = document[_0x3a6e76(0x19b)](_0x3a6e76(0x1ab))),
            _0x2b9a32?.['classList']['add']('exam_box'),
            _0x2b9a32['setAttribute']('id', _0x3a6e76(0x219) + _0x8131cc++)));
      }
      _0x2b9a32 && _0x2b9a32['appendChild'](_0x116d4a);
    }),
    _0x2b9a32 && (_0x29f405 += _0x2b9a32[_0x197872(0x1d5)]),
    _0x29f405
  );
}
