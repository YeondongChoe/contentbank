/* eslint-disable no-empty */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable no-redeclare */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-constant-condition */
/* eslint-disable no-func-assign */
/* eslint-disable no-undef */
const _0x41b220 = _0x5b0c;
(function (_0x50333e, _0x5f4b10) {
  const _0x416c42 = _0x5b0c,
    _0x159bee = _0x50333e();
  while ([]) {
    try {
      const _0x4aca0f =
        parseInt(_0x416c42(0xcb)) / 0x1 +
        (parseInt(_0x416c42(0xf5)) / 0x2) * (parseInt(_0x416c42(0x108)) / 0x3) +
        -parseInt(_0x416c42(0xde)) / 0x4 +
        (parseInt(_0x416c42(0xd1)) / 0x5) *
          (-parseInt(_0x416c42(0x14e)) / 0x6) +
        parseInt(_0x416c42(0x100)) / 0x7 +
        parseInt(_0x416c42(0xe5)) / 0x8 +
        (parseInt(_0x416c42(0xda)) / 0x9) * (parseInt(_0x416c42(0xca)) / 0xa);
      if (_0x4aca0f === _0x5f4b10) break;
      else _0x159bee['push'](_0x159bee['shift']());
    } catch (_0x483f65) {
      _0x159bee['push'](_0x159bee['shift']());
    }
  }
})(_0x2218, 0xe0269),
  (window['openEQ'] = (_0x45240c) => {
    const _0x19d7ab = _0x5b0c,
      _0x461278 = document[_0x19d7ab(0xd5)](iTeXEQ[_0x19d7ab(0xe7)]);
    function _0x54b7fe() {
      const _0x1f1536 = _0x19d7ab;
      (onlyEQ = !![]),
        (onlyEQNode = _0x45240c),
        _0x461278?.[_0x1f1536(0x12b)][_0x1f1536(0x11b)](_0x1f1536(0x114)),
        iTeXEQ[_0x1f1536(0x14d)]();
    }
    function _0xf9e4d9() {
      const _0x165bf3 = _0x19d7ab;
      (onlyEQ = ![]),
        (onlyEQNode = ''),
        _0x461278?.['classList']['add'](_0x165bf3(0x114));
    }
    _0x461278?.[_0x19d7ab(0x12b)][_0x19d7ab(0xc8)](_0x19d7ab(0x114))
      ? _0x54b7fe()
      : _0xf9e4d9();
  }),
  (window[_0x41b220(0xc0)] = function setExamData(_0x2eacad) {
    const _0x237646 = _0x41b220;
    try {
      const _0x117360 = tinymce[_0x237646(0x143)](_0x237646(0x150));
      return _0x117360
        ? (_0x117360[_0x237646(0xd9)][_0x237646(0xf6)](_0x2eacad), !![])
        : (console[_0x237646(0x133)](_0x237646(0x139)), ![]);
    } catch (_0x4ee8ff) {
      return console[_0x237646(0x133)](_0x237646(0x119), _0x4ee8ff), ![];
    }
  });
async function uploadImageToServer(_0x26ae3d, _0x2a626b) {
  const _0x180c92 = _0x41b220,
    _0x2e9d63 = new FormData();
  _0x2e9d63['append'](_0x180c92(0x11f), _0x2a626b),
    _0x2e9d63[_0x180c92(0xf7)]('img_save_type', _0x26ae3d),
    _0x2e9d63[_0x180c92(0xf7)]('save_path', dream_server_url);
  const _0x3d71a6 = await fetch(dream_server_url + '/uploadImage', {
    method: _0x180c92(0x14a),
    body: _0x2e9d63,
  });
  if (!_0x3d71a6['ok']) throw new Error(_0x180c92(0xc6));
  const _0x4202c8 = await _0x3d71a6['json']();
  return (
    console[_0x180c92(0xbe)](_0x180c92(0x12a), _0x4202c8[_0x180c92(0x13a)]),
    _0x4202c8['img_url_list']
  );
}
function clearEditorContent() {
  const _0x29d73b = _0x41b220,
    _0x20dc20 = tinymce[_0x29d73b(0x143)](_0x29d73b(0x150));
  _0x20dc20
    ? _0x20dc20[_0x29d73b(0xf6)]('')
    : console['error'](_0x29d73b(0x122));
}
function _0x2218() {
  const _0x258dd1 = [
    'onreadystatechange',
    '.exam_box',
    'tag_tip',
    '내용\x20앞에\x20태그를\x20입력해\x20주세요',
    'ID가\x20\x27tinyeditor\x27인\x20TinyMCE\x20에디터가\x20없습니다.',
    'img_url_list',
    'img',
    'modal_block',
    'TEXT',
    'join',
    'className',
    '(적용전)img.src:\x20',
    'saveExamData',
    'tag_exam_sm',
    'get',
    'No\x20<p>\x20tag\x20found\x20in\x20the\x20parsed\x20document.',
    'nextElementSibling',
    'parseFromString',
    'responseText',
    'cloneNode',
    'CHOICES',
    'POST',
    'tl_answer',
    'getContent',
    'editorStart',
    '12YEBlyI',
    'style',
    'tinyeditor',
    'createElement',
    'br[data-mce-bogus=\x221\x22]',
    'replace',
    'nodeType',
    'log',
    'outerHTML',
    'usePostJsonData',
    '문서를\x20업로드\x20하세요.',
    'recoverynew_no_click',
    'target',
    'ELEMENT_NODE',
    'add',
    'Error\x20uploading\x20image',
    'document',
    'contains',
    'BIG',
    '858620JLxVQL',
    '73290LYolUm',
    'COMMENTARY',
    '변경사항을\x20저장하고\x20불러오시겠습니까?\x20\x27확인\x27을\x20클릭하면\x20저장\x20후\x20불러오고,\x20\x27취소\x27를\x20클릭하면\x20변경\x20없이\x20불러옵니다.',
    'textContent',
    'div',
    'display',
    '1499845XArTnd',
    'querySelector',
    'tag_bigcontent',
    '[그룹]',
    'getElementById',
    'function',
    'push',
    'tag_example',
    'selection',
    '63SkMVdq',
    'HINT',
    'tag_concept',
    'recoverynew',
    '5696264wcaJAi',
    'innerHTML',
    '데이터가\x20존재하지\x20않습니다.',
    'setAttribute',
    'itex_area_hidden',
    '.origin_img_area',
    'text/html',
    '1698728guXlHh',
    'contentWindow',
    'editor_container',
    'from',
    'status',
    '(적용후)img.src:\x20',
    'para0',
    'src',
    'find',
    'data-mce-src',
    'exam_box_',
    'Parsed\x20document\x20does\x20not\x20contain\x20body.',
    'tag_choices',
    '.itex_hml_convert_view',
    'childNodes',
    'Img_code',
    '3166UgjVvQ',
    'setContent',
    'append',
    'QUESTION',
    'tag_title',
    'Error\x20processing\x20image:',
    'open',
    'querySelectorAll',
    'getExamCodenum',
    'getAttribute',
    'save_path',
    '7362866WobKnR',
    'send',
    'No\x20data\x20found\x20in\x20the\x20parsed\x20document.',
    'body',
    'itexdata',
    'name',
    'block',
    'parse',
    '1902nPIYMi',
    '에디터에\x20편집하던\x20내용을\x20적용하지\x20않고\x20저장하시겠습니까?',
    'map',
    'Error\x20while\x20saving\x20exam\x20data:',
    'tag_exam',
    'activeEditor',
    'match',
    'ANSWER',
    'false',
    'removeAttribute',
    'file',
    'EXAMPLE',
    'display_inactive',
    'removeSVG',
    'exam_box',
    'setExamData',
    'appendChild',
    '콘텐츠\x20삽입\x20중\x20오류\x20발생:',
    'hasChildNodes',
    'remove',
    'length',
    'forEach',
    'tag_group',
    'img_data',
    'contenteditable',
    'latexrecovery',
    'Editor\x20not\x20found',
    'img_save_type',
    '문제\x20or\x20대발문\x20or\x20지문\x20태그가\x20필요합니다!',
    'trim',
    'includes',
    'TITLE',
    'CONCEPT',
    'tag_commentary',
    'data:\x20',
    'classList',
    'data',
    'message',
    'closest',
    'tag_content',
    'stringify',
    'none',
    'tag_hint',
    'error',
    'readyState',
  ];
  _0x2218 = function () {
    return _0x258dd1;
  };
  return _0x2218();
}
function _0x5b0c(_0xdd09ed, _0xd15b30) {
  const _0x2218f8 = _0x2218();
  return (
    (_0x5b0c = function (_0x5b0cbd, _0x4763f7) {
      _0x5b0cbd = _0x5b0cbd - 0xbc;
      let _0x3efc92 = _0x2218f8[_0x5b0cbd];
      return _0x3efc92;
    }),
    _0x5b0c(_0xdd09ed, _0xd15b30)
  );
}
window[_0x41b220(0x141)] = async function () {
  const _0x522fb5 = _0x41b220;
  try {
    const _0xec40a8 =
        tinymce['activeEditor'][_0x522fb5(0xe6)][_0x522fb5(0xc7)] ||
        tinymce[_0x522fb5(0x10d)]['contentDocument'][_0x522fb5(0xc7)],
      _0xc0af12 = iTeXEQ[_0x522fb5(0x115)](
        _0xec40a8[_0x522fb5(0xd2)](_0x522fb5(0x103)),
      );
    if (!_0xc0af12) return console[_0x522fb5(0x133)](_0x522fb5(0x102)), ![];
    const _0x23640d = [
        _0x522fb5(0xd3),
        _0x522fb5(0x12f),
        _0x522fb5(0x10c),
        _0x522fb5(0x142),
        _0x522fb5(0xd8),
        _0x522fb5(0xf1),
        'tl_answer',
        _0x522fb5(0x129),
        _0x522fb5(0x132),
        'tag_concept',
        'tag_title',
        _0x522fb5(0x137),
      ],
      _0x30ad03 = _0xc0af12[_0x522fb5(0xfc)]('p');
    if (_0x30ad03[_0x522fb5(0x11c)] > 0x0) {
      const _0x28b37c = _0x30ad03[0x0][_0x522fb5(0xd2)](_0x522fb5(0x152)),
        _0x5670df = Array[_0x522fb5(0xe8)](_0x30ad03[0x0]?.['classList'])[
          _0x522fb5(0xed)
        ]((_0x56f5ec) => _0x23640d['includes'](_0x56f5ec)),
        _0x4a84b6 = Array[_0x522fb5(0xe8)](_0x30ad03)['find'](
          (_0x54acf2) =>
            _0x54acf2?.[_0x522fb5(0x12b)][_0x522fb5(0xc8)](_0x522fb5(0x10c)) ||
            _0x54acf2?.[_0x522fb5(0x12b)][_0x522fb5(0xc8)](_0x522fb5(0xd3)) ||
            _0x54acf2?.[_0x522fb5(0x12b)][_0x522fb5(0xc8)]('tag_content'),
        ),
        _0xbae352 = Array[_0x522fb5(0xe8)](_0x30ad03)[_0x522fb5(0xed)](
          (_0xcc8cdc) =>
            _0xcc8cdc?.[_0x522fb5(0x12b)][_0x522fb5(0xc8)](_0x522fb5(0x11e)),
        );
      if (_0x28b37c)
        return alert('내용\x20앞에\x20태그를\x20입력해주세요.'), ![];
      if (!_0x5670df)
        return alert(_0x522fb5(0x138)), iTeXEQ[_0x522fb5(0x121)](), ![];
      if (!_0x4a84b6) return alert(_0x522fb5(0x124)), ![];
    } else return alert(_0x522fb5(0x144)), ![];
    const _0x1772fb = _0xc0af12[_0x522fb5(0xfc)]('img'),
      _0x3d927a = Array[_0x522fb5(0xe8)](_0x1772fb)['map'](
        (_0x67a7b0) => _0x67a7b0[_0x522fb5(0xec)],
      );
    try {
      const _0x483548 = await uploadImageToServer(img_save_type, _0x3d927a);
      _0x483548[_0x522fb5(0x11d)]((_0x65ebf1, _0x3d7aed) => {
        const _0x4968ae = _0x522fb5,
          { imgUUID: _0x126771, imgURL: _0xb4d71c } = _0x65ebf1,
          _0x3205b8 = _0x1772fb[_0x3d7aed];
        _0x3205b8[_0x4968ae(0xe1)](_0x4968ae(0xf4), _0x126771),
          console[_0x4968ae(0xbe)](
            '(적용전)img.src:\x20',
            _0x3205b8[_0x4968ae(0xec)],
          );
        if (img_save_type === 0x1)
          _0x3205b8[_0x4968ae(0xe1)]('src', dream_server_url + _0xb4d71c);
        else {
          if (img_save_type === 0x2)
            _0x3205b8[_0x4968ae(0xe1)](_0x4968ae(0xec), _0xb4d71c);
          else
            img_save_type === 0x3 &&
              _0x3205b8[_0x4968ae(0xe1)](_0x4968ae(0xec), _0xb4d71c);
        }
        console[_0x4968ae(0xbe)](_0x4968ae(0xea), _0x3205b8[_0x4968ae(0xec)]),
          _0x3205b8['removeAttribute']('data-mce-src');
      });
    } catch (_0x469ade) {
      _0x1772fb['forEach']((_0x15c6e1) => {
        const _0xbac2fc = _0x522fb5;
        console[_0xbac2fc(0x133)](
          'Error\x20processing\x20image:',
          _0x15c6e1[_0xbac2fc(0xec)],
          _0x469ade,
        );
      });
    }
    const _0x359cc5 = {
        tag_group: _0xc0af12[_0x522fb5(0xdf)],
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
      _0x4c1381 = new DOMParser(),
      _0x4f3941 = _0x4c1381[_0x522fb5(0x146)](
        _0xc0af12['innerHTML'],
        _0x522fb5(0xe4),
      );
    let _0x1752ad = null,
      _0x32f306 = '';
    if (!_0x4f3941[_0x522fb5(0x103)])
      return console[_0x522fb5(0x133)](_0x522fb5(0xf0)), ![];
    const _0x36d667 = (_0x5effb6, _0x21baf3) => {
      const _0x36056a = _0x522fb5;
      Array['isArray'](_0x359cc5[_0x5effb6]) &&
        _0x359cc5[_0x5effb6][_0x36056a(0xd7)](_0x21baf3);
    };
    Array[_0x522fb5(0xe8)](_0x4f3941[_0x522fb5(0x103)][_0x522fb5(0xf3)])[
      _0x522fb5(0x11d)
    ]((_0x2aaa67) => {
      const _0x466485 = _0x522fb5;
      if (_0x2aaa67[_0x466485(0xbd)] === Node[_0x466485(0xc4)]) {
        const _0xfb57a5 = Array[_0x466485(0xe8)](_0x2aaa67?.['classList']),
          _0x6403eb = _0xfb57a5[_0x466485(0xed)]((_0x5d1b8e) =>
            _0x23640d[_0x466485(0x126)](_0x5d1b8e),
          );
        if (_0x6403eb)
          _0x1752ad && _0x36d667(_0x1752ad, _0x32f306),
            (_0x1752ad = _0x6403eb),
            (_0x32f306 = _0x2aaa67[_0x466485(0xbf)]);
        else _0x1752ad && (_0x32f306 += _0x2aaa67[_0x466485(0xbf)]);
      }
    });
    _0x1752ad && _0x36d667(_0x1752ad, _0x32f306);
    const _0x29fd24 = JSON[_0x522fb5(0x130)](_0x359cc5, null, 0x2);
    return iTeXEQ[_0x522fb5(0x121)](), clearEditorContent(), _0x29fd24;
  } catch (_0x2cecf6) {
    return console[_0x522fb5(0x133)](_0x522fb5(0x10b), _0x2cecf6), ![];
  }
};
function hml_upload(_0x2bf986) {
  const _0x3e1254 = _0x41b220;
  var _0x53a192 = new FormData();
  _0x53a192['append']('file_name', _0x2bf986['name']),
    _0x53a192[_0x3e1254(0xf7)](_0x3e1254(0x112), _0x2bf986),
    _0x53a192['append']('img_save_type', img_save_type),
    _0x53a192[_0x3e1254(0xf7)](_0x3e1254(0xff), dream_server_url);
  var _0x184be3 = new XMLHttpRequest();
  _0x184be3[_0x3e1254(0xfb)](
    _0x3e1254(0x14a),
    dream_server_url + '/qnapi_dream/hml_upload',
    !![],
  ),
    _0x184be3[_0x3e1254(0x101)](_0x53a192),
    (_0x184be3[_0x3e1254(0x135)] = function () {
      const _0xcff37 = _0x3e1254;
      if (
        _0x184be3[_0xcff37(0x134)] == 0x4 &&
        _0x184be3[_0xcff37(0xe9)] == 0xc8
      ) {
        const _0x26c4df = document[_0xcff37(0xd2)](_0xcff37(0xf2));
        var _0x15a9cf = JSON[_0xcff37(0x107)](_0x184be3[_0xcff37(0x147)]);
        (_0x26c4df['innerHTML'] = _0x15a9cf[_0xcff37(0x104)]),
          document[_0xcff37(0xd2)]('.origin_img_area')?.[_0xcff37(0x12b)][
            _0xcff37(0xc5)
          ]('itex_area_hidden'),
          iTeXEQ['recoverynew_no_click'](_0x26c4df),
          (document['getElementById'](_0xcff37(0x13c))[_0xcff37(0x14f)][
            _0xcff37(0xd0)
          ] = _0xcff37(0x131)),
          updateButtonStates(!![], ![], ![], ![], ![]);
      }
    });
}
let lastClickedBoxId = null,
  currentEditorContent = '';
function htmlStringToNode(_0x4a16ab) {
  const _0x1ad5f8 = _0x41b220;
  var _0x10339b = document[_0x1ad5f8(0x151)]('template');
  return (_0x10339b[_0x1ad5f8(0xdf)] = _0x4a16ab), _0x10339b['content'];
}
async function hml_edit_finish() {
  const _0x1f6819 = _0x41b220;
  if (!lastClickedBoxId) {
    console[_0x1f6819(0x133)]('수정할\x20요소가\x20선택되지\x20않았습니다.');
    return;
  }
  const _0xdccc45 = tinymce[_0x1f6819(0x143)](_0x1f6819(0x150))['getContent'](),
    _0x9ec788 = document[_0x1f6819(0xd2)](_0x1f6819(0xf2)),
    _0x41728c = document[_0x1f6819(0xd5)](lastClickedBoxId);
  if (_0x41728c) {
    const _0x2fdfc0 = htmlStringToNode(_0xdccc45);
    try {
      const _0x37faba = await iTeXDBW_mathrender_hml(_0x2fdfc0),
        _0x205e21 = document[_0x1f6819(0x151)]('div');
      _0x205e21['appendChild'](_0x37faba),
        (_0x41728c[_0x1f6819(0xbf)] = _0x205e21['innerHTML']),
        iTeXEQ[_0x1f6819(0xc2)](_0x9ec788),
        tinymce[_0x1f6819(0x143)]('tinyeditor')[_0x1f6819(0xf6)](''),
        (lastClickedBoxId = null),
        (currentEditorContent = '');
    } catch (_0x509c73) {
      console['error']('Error\x20in\x20math\x20render:', _0x509c73);
    }
  } else console['error']('원래\x20자리를\x20찾을\x20수\x20없습니다.');
}
async function hml_upload_frame(_0x3838b7) {
  const _0x44935a = _0x41b220;
  document[_0x44935a(0xd5)]('modal_block')[_0x44935a(0x14f)][_0x44935a(0xd0)] =
    _0x44935a(0x106);
  var _0x4f09e2 = new FormData();
  _0x4f09e2[_0x44935a(0xf7)]('file_name', _0x3838b7[_0x44935a(0x105)]),
    _0x4f09e2[_0x44935a(0xf7)]('file', _0x3838b7),
    _0x4f09e2['append'](_0x44935a(0x123), img_save_type),
    _0x4f09e2['append'](_0x44935a(0xff), dream_server_url);
  var _0x5443f6 = new XMLHttpRequest();
  _0x5443f6[_0x44935a(0xfb)](
    _0x44935a(0x14a),
    dream_server_url + '/qnapi_dream/hml_upload',
    !![],
  ),
    _0x5443f6[_0x44935a(0x101)](_0x4f09e2),
    (_0x5443f6['onreadystatechange'] = async function () {
      const _0x10b4f8 = _0x44935a;
      if (
        _0x5443f6[_0x10b4f8(0x134)] == 0x4 &&
        _0x5443f6[_0x10b4f8(0xe9)] == 0xc8
      ) {
        const _0x165ecc = document['querySelector'](_0x10b4f8(0xf2));
        var _0x454829 = JSON[_0x10b4f8(0x107)](_0x5443f6['responseText']);
        const _0x3ad05b = iTeX_hml_tag_parser(_0x454829[_0x10b4f8(0x104)]);
        (_0x165ecc[_0x10b4f8(0xdf)] = _0x3ad05b),
          _0x165ecc['addEventListener']('click', async function (_0x2a0ff7) {
            const _0x5cbdb7 = _0x10b4f8;
            if (_0x2a0ff7['target'][_0x5cbdb7(0x12e)](_0x5cbdb7(0x136))) {
              const _0x54932f = _0x2a0ff7[_0x5cbdb7(0xc3)][_0x5cbdb7(0x12e)](
                  _0x5cbdb7(0x136),
                ),
                _0x3b03c8 = _0x54932f[_0x5cbdb7(0xfe)]('id');
              lastClickedBoxId &&
                tinymce[_0x5cbdb7(0x143)](_0x5cbdb7(0x150))[
                  _0x5cbdb7(0x14c)
                ]() !== currentEditorContent &&
                confirm(_0x5cbdb7(0xcd)) &&
                (await hml_edit_finish());
              const _0x3171a9 = htmlStringToNode(_0x54932f[_0x5cbdb7(0xbf)]);
              lastClickedBoxId = _0x3b03c8;
              try {
                const _0x41cb6e = await iTeXDBW_mathrender_hml(_0x3171a9),
                  _0x17b1e8 = document[_0x5cbdb7(0x151)](_0x5cbdb7(0xcf));
                _0x17b1e8[_0x5cbdb7(0x118)](_0x41cb6e),
                  tinymce[_0x5cbdb7(0x143)](_0x5cbdb7(0x150))[_0x5cbdb7(0xf6)](
                    _0x17b1e8['innerHTML'],
                  ),
                  (currentEditorContent = _0x17b1e8[_0x5cbdb7(0xdf)]);
              } catch (_0x146ae9) {
                console[_0x5cbdb7(0x133)](
                  'Error\x20in\x20math\x20render:',
                  _0x146ae9,
                );
              }
              iTeXEQ[_0x5cbdb7(0xdd)]();
            }
          }),
          document[_0x10b4f8(0xd2)](_0x10b4f8(0xe3))?.[_0x10b4f8(0x12b)]['add'](
            _0x10b4f8(0xe2),
          ),
          iTeXEQ[_0x10b4f8(0xc2)](_0x165ecc),
          (document[_0x10b4f8(0xd5)](_0x10b4f8(0x13c))['style'][
            _0x10b4f8(0xd0)
          ] = 'none');
      }
    });
}
window['saveHmlData'] = async function () {
  const _0x430a90 = _0x41b220,
    _0x181566 = document[_0x430a90(0xd2)](_0x430a90(0xf2))[_0x430a90(0x148)](
      !![],
    );
  if (!_0x181566[_0x430a90(0x11a)]()) {
    alert(_0x430a90(0xc1));
    return;
  }
  const _0x2930f0 = tinymce[_0x430a90(0x143)](_0x430a90(0x150))[
    _0x430a90(0x14c)
  ]();
  if (_0x2930f0[_0x430a90(0x125)]() !== '') {
    const _0x3ffa31 = confirm(_0x430a90(0x109));
    if (!_0x3ffa31) return;
  }
  if (_0x181566) {
    const _0x23ab55 = _0x181566[_0x430a90(0xfc)](_0x430a90(0x136)),
      _0x479e73 = [],
      _0x132927 = _0x181566[_0x430a90(0xfc)](_0x430a90(0x13b)),
      _0xabf16a = Array[_0x430a90(0xe8)](_0x132927)[_0x430a90(0x10a)](
        (_0x1a95b7) => _0x1a95b7[_0x430a90(0xec)],
      );
    try {
      const _0x1a81a6 = await uploadImageToServer(img_save_type, _0xabf16a);
      _0x1a81a6[_0x430a90(0x11d)]((_0x53b19b, _0x4e0e17) => {
        const _0x3fe6b4 = _0x430a90,
          { imgUUID: _0x28eca5, imgURL: _0x3c06db } = _0x53b19b,
          _0x4b7e6b = _0x132927[_0x4e0e17];
        _0x4b7e6b[_0x3fe6b4(0xe1)](_0x3fe6b4(0xf4), _0x28eca5),
          console[_0x3fe6b4(0xbe)](_0x3fe6b4(0x140), _0x4b7e6b['src']);
        if (img_save_type === 0x1)
          _0x4b7e6b[_0x3fe6b4(0xe1)](
            _0x3fe6b4(0xec),
            dream_server_url + _0x3c06db,
          );
        else {
          if (img_save_type === 0x2)
            _0x4b7e6b[_0x3fe6b4(0xe1)](_0x3fe6b4(0xec), _0x3c06db);
          else
            img_save_type === 0x3 &&
              _0x4b7e6b['setAttribute'](_0x3fe6b4(0xec), _0x3c06db);
        }
        _0x4b7e6b[_0x3fe6b4(0x111)](_0x3fe6b4(0xee)),
          console['log']('(적용후)img.src:\x20', _0x4b7e6b[_0x3fe6b4(0xec)]);
      });
    } catch (_0x5e0058) {
      console[_0x430a90(0x133)](_0x430a90(0xfa), _0x5e0058);
    }
    return (
      _0x23ab55[_0x430a90(0x11d)]((_0x3f3c64, _0x293a37) => {
        const _0x505f2c = _0x430a90,
          _0x501b07 = [];
        let _0x5d24e7 = 0x1;
        const _0x38f0f6 = _0x3f3c64['querySelectorAll']('p');
        _0x38f0f6[_0x505f2c(0x11d)]((_0x14dfce) => {
          const _0x30457d = _0x505f2c,
            _0x355d3d = _0x14dfce?.['classList'];
          let _0x1bd90b = null;
          if (_0x355d3d[_0x30457d(0xc8)](_0x30457d(0xd3)))
            _0x1bd90b = _0x30457d(0xc9);
          else {
            if (_0x355d3d[_0x30457d(0xc8)](_0x30457d(0x12f)))
              _0x1bd90b = _0x30457d(0x13d);
            else {
              if (_0x355d3d['contains'](_0x30457d(0x10c)))
                _0x1bd90b = _0x30457d(0xf8);
              else {
                if (_0x355d3d['contains'](_0x30457d(0x142)))
                  _0x1bd90b = 'SMALL';
                else {
                  if (_0x355d3d[_0x30457d(0xc8)](_0x30457d(0xd8)))
                    _0x1bd90b = _0x30457d(0x113);
                  else {
                    if (_0x355d3d['contains']('tag_choices'))
                      _0x1bd90b = _0x30457d(0x149);
                    else {
                      if (_0x355d3d[_0x30457d(0xc8)]('tl_answer'))
                        _0x1bd90b = _0x30457d(0x10f);
                      else {
                        if (_0x355d3d[_0x30457d(0xc8)](_0x30457d(0x129)))
                          _0x1bd90b = _0x30457d(0xcc);
                        else {
                          if (_0x355d3d['contains'](_0x30457d(0x132)))
                            _0x1bd90b = _0x30457d(0xdb);
                          else {
                            if (_0x355d3d['contains'](_0x30457d(0xdc)))
                              _0x1bd90b = _0x30457d(0x128);
                            else {
                              if (_0x355d3d[_0x30457d(0xc8)](_0x30457d(0xf9)))
                                _0x1bd90b = _0x30457d(0x127);
                              else {
                                if (
                                  _0x355d3d[_0x30457d(0xc8)](_0x30457d(0x137))
                                )
                                  _0x1bd90b = 'TIP';
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
          if (_0x1bd90b) {
            let _0x56cf1d = _0x14dfce[_0x30457d(0xbf)],
              _0x12b0fe = _0x14dfce[_0x30457d(0x145)];
            while (
              _0x12b0fe &&
              !_0x12b0fe[_0x30457d(0x12b)][_0x30457d(0xc8)](_0x30457d(0xd3)) &&
              !_0x12b0fe[_0x30457d(0x12b)][_0x30457d(0xc8)](_0x30457d(0x12f)) &&
              !_0x12b0fe[_0x30457d(0x12b)]['contains'](_0x30457d(0x10c)) &&
              !_0x12b0fe[_0x30457d(0x12b)][_0x30457d(0xc8)](_0x30457d(0x142)) &&
              !_0x12b0fe[_0x30457d(0x12b)][_0x30457d(0xc8)](_0x30457d(0xd8)) &&
              !_0x12b0fe[_0x30457d(0x12b)][_0x30457d(0xc8)]('tag_choices') &&
              !_0x12b0fe[_0x30457d(0x12b)][_0x30457d(0xc8)](_0x30457d(0x14b)) &&
              !_0x12b0fe['classList'][_0x30457d(0xc8)](_0x30457d(0x129)) &&
              !_0x12b0fe['classList'][_0x30457d(0xc8)](_0x30457d(0x132)) &&
              !_0x12b0fe['classList'][_0x30457d(0xc8)](_0x30457d(0xdc)) &&
              !_0x12b0fe[_0x30457d(0x12b)][_0x30457d(0xc8)](_0x30457d(0xf9)) &&
              !_0x12b0fe[_0x30457d(0x12b)]['contains']('tag_tip')
            ) {
              (_0x56cf1d += _0x12b0fe[_0x30457d(0xbf)]),
                (_0x12b0fe = _0x12b0fe[_0x30457d(0x145)]);
            }
            _0x501b07[_0x30457d(0xd7)]({
              type: _0x1bd90b,
              content: _0x56cf1d,
              sort: _0x5d24e7++,
            });
          }
        }),
          _0x479e73['push']({ id: null, quizItemList: _0x501b07 });
      }),
      tinymce[_0x430a90(0x143)](_0x430a90(0x150))[_0x430a90(0xf6)](''),
      _0x479e73
    );
  } else return console['log'](_0x430a90(0xe0)), null;
};
function processHmlData(_0x30ff10) {
  const _0x2aefdc = _0x41b220,
    _0x2d4c0f = [],
    _0x14315e = Array[_0x2aefdc(0xe8)](_0x30ff10[_0x2aefdc(0xfc)]('p'));
  let _0x280cd4 = [],
    _0x659627 = ![];
  return (
    _0x14315e[_0x2aefdc(0x11d)]((_0x2c1af2) => {
      const _0x249319 = _0x2aefdc;
      divideKey[_0x249319(0x126)](_0x2c1af2[_0x249319(0x13f)])
        ? (_0x280cd4[_0x249319(0x11c)] > 0x0 &&
            (_0x2d4c0f[_0x249319(0xd7)](
              _0x280cd4[_0x249319(0x10a)](
                (_0x19a37b) => _0x19a37b[_0x249319(0xbf)],
              )[_0x249319(0x13e)](''),
            ),
            (_0x280cd4 = [])),
          _0x280cd4[_0x249319(0xd7)](_0x2c1af2))
        : _0x280cd4['push'](_0x2c1af2);
    }),
    _0x280cd4[_0x2aefdc(0x11c)] > 0x0 &&
      _0x2d4c0f[_0x2aefdc(0xd7)](
        _0x280cd4['map']((_0xa84f9b) => _0xa84f9b[_0x2aefdc(0xbf)])[
          _0x2aefdc(0x13e)
        ](''),
      ),
    _0x2d4c0f
  );
}
window['addEventListener'](_0x41b220(0x12d), (_0x4d062b) => {
  const _0x2de3ef = _0x41b220,
    { functionName: _0x32ba13, args: _0x192370 } = _0x4d062b[_0x2de3ef(0x12c)];
  _0x32ba13 === _0x2de3ef(0x117) &&
    typeof window[_0x32ba13] === 'function' &&
    window[_0x32ba13](_0x192370[0x0]),
    _0x32ba13 === 'setExamList' &&
      typeof window[_0x32ba13] === _0x2de3ef(0xd6) &&
      window[_0x32ba13](_0x192370[0x0]),
    _0x32ba13 === _0x2de3ef(0xfd) &&
      typeof window[_0x32ba13] === _0x2de3ef(0xd6) &&
      window[_0x32ba13](_0x192370[0x0]),
    _0x32ba13 === _0x2de3ef(0x141) &&
      typeof window[_0x32ba13] === _0x2de3ef(0xd6) &&
      window[_0x32ba13](_0x192370[0x0]);
});
function iTeX_hml_tag_parser(_0x200160) {
  const _0xc36c28 = _0x41b220,
    _0x13f4bb = new DOMParser(),
    _0x529684 = _0x13f4bb['parseFromString'](_0x200160, _0xc36c28(0xe4)),
    _0x487479 = _0x529684[_0xc36c28(0xfc)]('p'),
    _0x25948d = {
      그룹: _0xc36c28(0x11e),
      대발문: _0xc36c28(0xd3),
      지문: 'tag_content',
      문제: _0xc36c28(0x10c),
      소문제: _0xc36c28(0x142),
      보기: _0xc36c28(0xd8),
      선지: 'tag_choices',
      정답: _0xc36c28(0x14b),
      해설: _0xc36c28(0x129),
      힌트: _0xc36c28(0x132),
      개념: _0xc36c28(0xdc),
      제목: 'tag_title',
      팁: _0xc36c28(0x137),
    };
  let _0x22b5f4 = '',
    _0x5b6db1 = null,
    _0x2bda14 = 0x0,
    _0x45ded4 = ![];
  _0x487479[_0xc36c28(0x11d)]((_0x3f71d, _0x2fe675) => {
    const _0x3053dd = _0xc36c28;
    _0x3f71d[_0x3053dd(0x111)](_0x3053dd(0x14f));
    let _0x4d821e = _0x3f71d['textContent'][_0x3053dd(0x125)]();
    const _0x2411ed = _0x4d821e[_0x3053dd(0x10e)](/^\[(.*?)\]$/);
    if (_0x2411ed) {
      const _0x4cf14c = _0x2411ed[0x1][_0x3053dd(0xbc)](/\s+/g, '');
      if (_0x4cf14c in _0x25948d) {
        _0x3f71d?.[_0x3053dd(0x12b)]['add'](_0x25948d[_0x4cf14c]),
          _0x3f71d[_0x3053dd(0xe1)](_0x3053dd(0x120), 'false');
        if (_0x25948d[_0x4cf14c] === _0x3053dd(0x11e))
          _0x45ded4
            ? (_0x45ded4 = ![])
            : (_0x5b6db1 &&
                ((_0x22b5f4 += _0x5b6db1[_0x3053dd(0xbf)]), (_0x5b6db1 = null)),
              (_0x5b6db1 = document[_0x3053dd(0x151)](_0x3053dd(0xcf))),
              _0x5b6db1?.[_0x3053dd(0x12b)][_0x3053dd(0xc5)](_0x3053dd(0x116)),
              _0x5b6db1[_0x3053dd(0xe1)]('id', _0x3053dd(0xef) + _0x2bda14++),
              (_0x45ded4 = !![]));
        else {
          if (_0x25948d[_0x4cf14c] === _0x3053dd(0x10c)) {
            if (_0x45ded4) {
            } else
              _0x5b6db1 &&
                ((_0x22b5f4 += _0x5b6db1[_0x3053dd(0xbf)]), (_0x5b6db1 = null)),
                (_0x5b6db1 = document['createElement'](_0x3053dd(0xcf))),
                _0x5b6db1?.[_0x3053dd(0x12b)][_0x3053dd(0xc5)](
                  _0x3053dd(0x116),
                ),
                _0x5b6db1['setAttribute']('id', 'exam_box_' + _0x2bda14++);
          }
        }
      }
    }
    _0x5b6db1 && _0x5b6db1['appendChild'](_0x3f71d);
  });
  if (_0x5b6db1) {
    if (_0x45ded4) {
      const _0x186f2e = document[_0xc36c28(0x151)]('p');
      _0x186f2e['classList'][_0xc36c28(0xc5)](
        _0xc36c28(0xeb),
        _0xc36c28(0x11e),
      ),
        _0x186f2e['setAttribute'](_0xc36c28(0x120), _0xc36c28(0x110)),
        (_0x186f2e[_0xc36c28(0xce)] = _0xc36c28(0xd4)),
        _0x5b6db1['appendChild'](_0x186f2e),
        (_0x22b5f4 += _0x5b6db1[_0xc36c28(0xbf)]);
    } else _0x22b5f4 += _0x5b6db1[_0xc36c28(0xbf)];
  }
  return _0x22b5f4;
}
