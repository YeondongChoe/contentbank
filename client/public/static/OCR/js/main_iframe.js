/* eslint-disable no-case-declarations */
/* eslint-disable no-empty */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable no-redeclare */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-constant-condition */
/* eslint-disable no-func-assign */
/* eslint-disable no-undef */
var _0x47159c = _0x6c00;
(function (_0x2fdcd9, _0x2693d8) {
  var _0x2de05d = _0x6c00,
    _0x26e881 = _0x2fdcd9();
  while ([]) {
    try {
      var _0x28c217 =
        -parseInt(_0x2de05d(0x2f6)) / 0x1 +
        parseInt(_0x2de05d(0x279)) / 0x2 +
        parseInt(_0x2de05d(0x23a)) / 0x3 +
        -parseInt(_0x2de05d(0x2ff)) / 0x4 +
        (-parseInt(_0x2de05d(0x1f8)) / 0x5) *
          (-parseInt(_0x2de05d(0x321)) / 0x6) +
        (-parseInt(_0x2de05d(0x2f4)) / 0x7) *
          (-parseInt(_0x2de05d(0x284)) / 0x8) +
        (-parseInt(_0x2de05d(0x240)) / 0x9) *
          (-parseInt(_0x2de05d(0x2ce)) / 0xa);
      if (_0x28c217 === _0x2693d8) break;
      else _0x26e881['push'](_0x26e881['shift']());
    } catch (_0x46aca3) {
      _0x26e881['push'](_0x26e881['shift']());
    }
  }
})(_0x682e, 0xa40f4);
var cropper,
  btn_gp = ![],
  wolfram_rst = '',
  mathpapa_rst = '',
  google_rst = '',
  sketch_el,
  sketch_pad,
  popup_window,
  candidate,
  candidate_temp,
  rst_latex,
  itex_wr_ready = ![],
  traces = [],
  thandX = [],
  thandY = [],
  minX = Infinity,
  minY = Infinity,
  maxX = -Infinity,
  maxY = -Infinity,
  isDrawingx = ![];
if (window[_0x47159c(0x336)][_0x47159c(0x290)] == 'http')
  var eqn_ocr_url = _0x47159c(0x1ff);
else var eqn_ocr_url = _0x47159c(0x330);
var ocr_header_key = _0x47159c(0x2b5),
  timefn,
  tooltipTriggerList = [][_0x47159c(0x2e9)][_0x47159c(0x22a)](
    document[_0x47159c(0x1d1)](_0x47159c(0x1d2)),
  ),
  tooltipList = tooltipTriggerList[_0x47159c(0x201)](function (_0x14fd4b) {
    return new bootstrap['Tooltip'](_0x14fd4b);
  }),
  evtclk;
navigator[_0x47159c(0x29b)]['match'](
  /BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|Android/,
)
  ? (evtclk = _0x47159c(0x286))
  : (evtclk = _0x47159c(0x308));
function isTouchEvent(_0x3c02d4) {
  var _0x2d9c56 = _0x47159c;
  return (
    _0x3c02d4[_0x2d9c56(0x234)][_0x2d9c56(0x20c)](_0x2d9c56(0x313)) !== -0x1
  );
}
var main_wd, main_hg;
function handleResize() {
  var _0x30dbfb = _0x47159c;
  sketch_el = document[_0x30dbfb(0x1e2)](_0x30dbfb(0x1eb));
  var _0xe888ad = sketch_el[_0x30dbfb(0x225)]('2d'),
    _0x3f3e65 = _0xe888ad['getImageData'](
      0x0,
      0x0,
      sketch_el[_0x30dbfb(0x29d)],
      sketch_el[_0x30dbfb(0x2cf)],
    );
  parent[_0x30dbfb(0x22e)][_0x30dbfb(0x2e6)] == _0x30dbfb(0x22f)
    ? ((main_wd = parent[_0x30dbfb(0x33a)][_0x30dbfb(0x1f3)]),
      (main_hg = parent[_0x30dbfb(0x33a)][_0x30dbfb(0x209)] / 0x2))
    : ((main_wd = parent[_0x30dbfb(0x276)]
        ['querySelector'](parent[_0x30dbfb(0x22e)][_0x30dbfb(0x2c6)])
        [_0x30dbfb(0x273)]()['width']),
      (main_hg = parent[_0x30dbfb(0x276)]
        ['querySelector'](parent[_0x30dbfb(0x22e)]['iframe'])
        [_0x30dbfb(0x273)]()[_0x30dbfb(0x2cf)])),
    parent[_0x30dbfb(0x276)]
      ['getElementById'](_0x30dbfb(0x25a))
      ['setAttribute']('width', main_wd),
    parent[_0x30dbfb(0x276)]
      [_0x30dbfb(0x1e2)](_0x30dbfb(0x25a))
      [_0x30dbfb(0x2be)]('height', main_hg),
    (sketch_el['width'] = main_wd),
    (sketch_el[_0x30dbfb(0x2cf)] = main_hg),
    sketch_pad[_0x30dbfb(0x2d7)](),
    (document[_0x30dbfb(0x1e2)](_0x30dbfb(0x280))[_0x30dbfb(0x1b8)][
      _0x30dbfb(0x2cf)
    ] = main_hg + 'px'),
    (document[_0x30dbfb(0x1e2)]('eqn_wrap')[_0x30dbfb(0x1b8)][
      _0x30dbfb(0x2cf)
    ] = main_hg + 'px'),
    (document['getElementById']('ui_wrap')[_0x30dbfb(0x1b8)][_0x30dbfb(0x2cf)] =
      main_hg + 'px'),
    (document[_0x30dbfb(0x1e2)]('tab_hand_block')[_0x30dbfb(0x1b8)]['height'] =
      main_hg + 'px'),
    (document[_0x30dbfb(0x1e2)]('tab_img_block')[_0x30dbfb(0x1b8)]['height'] =
      main_hg + 'px'),
    _0xe888ad[_0x30dbfb(0x2bc)](_0x3f3e65, 0x0, 0x0);
}
(window[_0x47159c(0x2c2)] = function () {
  var _0x20208e = _0x47159c;
  parent[_0x20208e(0x22e)][_0x20208e(0x2e6)] == 'normal'
    ? ((main_wd = parent[_0x20208e(0x33a)][_0x20208e(0x1f3)]),
      (main_hg = parent[_0x20208e(0x33a)][_0x20208e(0x209)] / 0x2))
    : ((main_wd = parent[_0x20208e(0x276)]
        [_0x20208e(0x334)]('#itex_frame_area')
        [_0x20208e(0x250)]['getBoundingClientRect']()[_0x20208e(0x29d)]),
      (main_hg = parent[_0x20208e(0x276)]
        ['querySelector'](_0x20208e(0x1c3))
        [_0x20208e(0x250)][_0x20208e(0x273)]()['height'])),
    parent[_0x20208e(0x276)]
      ['getElementById'](_0x20208e(0x25a))
      [_0x20208e(0x2be)](_0x20208e(0x29d), main_wd),
    parent['document']
      [_0x20208e(0x1e2)](_0x20208e(0x25a))
      ['setAttribute'](_0x20208e(0x2cf), main_hg),
    (sketch_el = document['getElementById'](_0x20208e(0x1eb))),
    (sketch_pad = new Atrament(document['getElementById'](_0x20208e(0x1eb)), {
      width: main_wd,
      height: main_hg,
      color: '#000000',
      weight: 0x2,
      smoothing: 0.3,
      adaptiveStroke: ![],
    })),
    (document['getElementById'](_0x20208e(0x280))['style']['height'] =
      main_hg + 'px'),
    (document['getElementById'](_0x20208e(0x197))['style']['height'] =
      main_hg + 'px'),
    (document[_0x20208e(0x1e2)](_0x20208e(0x338))[_0x20208e(0x1b8)]['height'] =
      main_hg + 'px'),
    (document[_0x20208e(0x1e2)](_0x20208e(0x1d9))[_0x20208e(0x1b8)][
      _0x20208e(0x2cf)
    ] = main_hg + 'px'),
    (document[_0x20208e(0x1e2)]('tab_img_block')['style'][_0x20208e(0x2cf)] =
      main_hg + 'px'),
    $(sketch_el)[_0x20208e(0x1e3)](_0x20208e(0x21f), function (_0x3abb09) {
      var _0x239708 = _0x20208e;
      (parent[_0x239708(0x22e)][_0x239708(0x2b2)] = !![]), (isDrawingx = !![]);
      if (
        document[_0x239708(0x334)](_0x239708(0x294)) ||
        document['querySelector'](_0x239708(0x25f))
      ) {
        (thandX = []), (thandY = []);
        var _0x46001f, _0x2bd682;
        (_0x46001f =
          typeof _0x3abb09[_0x239708(0x1c8)] !== _0x239708(0x2bd)
            ? _0x3abb09[_0x239708(0x1c8)]
            : _0x3abb09[_0x239708(0x261)]),
          (_0x2bd682 =
            typeof _0x3abb09[_0x239708(0x2fe)] !== _0x239708(0x2bd)
              ? _0x3abb09[_0x239708(0x2fe)]
              : _0x3abb09[_0x239708(0x2aa)]),
          thandX[_0x239708(0x1c9)](_0x46001f),
          thandY['push'](_0x2bd682);
      }
    }),
    $(sketch_el)[_0x20208e(0x1e3)](_0x20208e(0x30a), function (_0x128836) {
      var _0x497271 = _0x20208e;
      isDrawingx = ![];
      if (
        document[_0x497271(0x334)]('.ko_input_mode') ||
        document['querySelector'](_0x497271(0x25f))
      ) {
        var _0x3d31fa = [];
        _0x3d31fa[_0x497271(0x1c9)](thandX),
          _0x3d31fa[_0x497271(0x1c9)](thandY),
          _0x3d31fa['push']([]),
          traces[_0x497271(0x1c9)](_0x3d31fa);
      }
    }),
    $(sketch_el)['bind'](_0x20208e(0x19b), function (_0x3dd445) {
      var _0x387d87 = _0x20208e;
      if (isDrawingx === !![]) {
        var _0x4bb464, _0x42e2ca;
        (_0x4bb464 =
          typeof _0x3dd445[_0x387d87(0x1c8)] !== _0x387d87(0x2bd)
            ? _0x3dd445[_0x387d87(0x1c8)]
            : _0x3dd445[_0x387d87(0x261)]),
          (_0x42e2ca =
            typeof _0x3dd445[_0x387d87(0x2fe)] !== _0x387d87(0x2bd)
              ? _0x3dd445[_0x387d87(0x2fe)]
              : _0x3dd445['layerY']),
          (minX = Math[_0x387d87(0x2b7)](minX, _0x4bb464)),
          (minY = Math['min'](minY, _0x42e2ca)),
          (maxX = Math['max'](maxX, _0x4bb464)),
          (maxY = Math[_0x387d87(0x1a2)](maxY, _0x42e2ca));
      }
    }),
    $(sketch_el)['bind'](_0x20208e(0x299), function (_0x119ca1) {
      var _0x13bf2e = _0x20208e;
      (parent[_0x13bf2e(0x22e)][_0x13bf2e(0x2b2)] = !![]), (isDrawingx = !![]);
      if (
        document['querySelector'](_0x13bf2e(0x294)) ||
        document['querySelector']('.en_input_mode')
      ) {
        (thandX = []), (thandY = []);
        var _0x489b2e,
          _0x15cbe9,
          _0x37778c = $(sketch_el)[_0x13bf2e(0x1f6)]()[_0x13bf2e(0x24c)],
          _0x5ed2d2 = $(sketch_el)[_0x13bf2e(0x1f6)]()['top'];
        (_0x489b2e = Math[_0x13bf2e(0x328)](
          _0x119ca1[_0x13bf2e(0x20a)]['touches'][0x0][_0x13bf2e(0x1c6)] -
            _0x37778c,
        )),
          (_0x15cbe9 = Math[_0x13bf2e(0x328)](
            _0x119ca1[_0x13bf2e(0x20a)][_0x13bf2e(0x2e8)][0x0][
              _0x13bf2e(0x320)
            ] - _0x5ed2d2,
          )),
          thandX[_0x13bf2e(0x1c9)](_0x489b2e),
          thandY[_0x13bf2e(0x1c9)](_0x15cbe9);
      }
    }),
    $(sketch_el)[_0x20208e(0x1e3)](_0x20208e(0x286), function (_0x3b38a9) {
      var _0x1e430e = _0x20208e;
      isDrawingx = ![];
      if (
        document[_0x1e430e(0x334)](_0x1e430e(0x294)) ||
        document[_0x1e430e(0x334)]('.en_input_mode')
      ) {
        var _0x239ad7 = [];
        _0x239ad7[_0x1e430e(0x1c9)](thandX),
          _0x239ad7['push'](thandY),
          _0x239ad7[_0x1e430e(0x1c9)]([]),
          traces[_0x1e430e(0x1c9)](_0x239ad7);
      }
    }),
    $(sketch_el)[_0x20208e(0x1e3)](_0x20208e(0x2fc), function (_0x2c23f2) {
      var _0x3f713a = _0x20208e;
      if (isDrawingx === !![]) {
        var _0x265a69 = $(this)[_0x3f713a(0x1f6)]()[_0x3f713a(0x24c)],
          _0x4c42f7 = $(this)[_0x3f713a(0x1f6)]()['top'],
          _0x3bf152,
          _0x4ededd,
          _0x265a69 = $(sketch_el)[_0x3f713a(0x1f6)]()[_0x3f713a(0x24c)],
          _0x4c42f7 = $(sketch_el)['offset']()['top'];
        (_0x3bf152 = Math[_0x3f713a(0x328)](
          _0x2c23f2[_0x3f713a(0x20a)][_0x3f713a(0x2e8)][0x0][_0x3f713a(0x1c6)] -
            _0x265a69,
        )),
          (_0x4ededd = Math[_0x3f713a(0x328)](
            _0x2c23f2[_0x3f713a(0x20a)][_0x3f713a(0x2e8)][0x0][
              _0x3f713a(0x320)
            ] - _0x4c42f7,
          )),
          (minX = Math['min'](minX, _0x3bf152)),
          (minY = Math[_0x3f713a(0x2b7)](minY, _0x4ededd)),
          (maxX = Math[_0x3f713a(0x1a2)](maxX, _0x3bf152)),
          (maxY = Math[_0x3f713a(0x1a2)](maxY, _0x4ededd));
      }
    });
}),
  document[_0x47159c(0x1e2)](_0x47159c(0x1ab))['addEventListener'](
    evtclk,
    eqn_convert,
    ![],
  );
function eqneditor_change() {
  var _0x5d28f4 = _0x47159c;
  (parent[_0x5d28f4(0x276)][_0x5d28f4(0x1e2)]('iframe_ocr_box')[
    _0x5d28f4(0x1b8)
  ]['display'] = _0x5d28f4(0x26f)),
    setTimeout(function () {
      var _0x2cc871 = _0x5d28f4;
      parent[_0x2cc871(0x276)]
        ['querySelector'](parent[_0x2cc871(0x22e)][_0x2cc871(0x25c)])
        [_0x2cc871(0x20f)][_0x2cc871(0x1d5)](_0x2cc871(0x217)),
        parent['document']
          ['querySelector'](parent[_0x2cc871(0x22e)][_0x2cc871(0x25c)])
          [_0x2cc871(0x20f)][_0x2cc871(0x2f8)](_0x2cc871(0x24d));
      var _0x1af6b7 = document[_0x2cc871(0x334)]('#mjx-editing-area')[
        _0x2cc871(0x2c0)
      ](_0x2cc871(0x19f));
      document['querySelector'](_0x2cc871(0x1f9))['removeAttribute'](
        'data-latex',
      );
      if (!_0x1af6b7)
        _0x1af6b7 = parent[_0x2cc871(0x22e)]['itex_classchange2'](
          _0x2cc871(0x208),
        );
      else
        _0x1af6b7[_0x2cc871(0x312)](/^\s*\\displaystyle\s*$/)
          ? (_0x1af6b7 = parent[_0x2cc871(0x22e)][_0x2cc871(0x2c3)](
              _0x2cc871(0x208),
            ))
          : (_0x1af6b7 = _0x1af6b7[_0x2cc871(0x29f)](/\\displaystyle\s*/, ''));
      parent[_0x2cc871(0x22e)][_0x2cc871(0x1a7)](_0x1af6b7), ocrmode_hidden();
    }, 0xa);
}
function eqneditor_change_custom() {
  var _0x10c327 = _0x47159c;
  (parent[_0x10c327(0x22e)]['editormode'] = 'ui'),
    setTimeout(function () {
      var _0x15ec81 = _0x10c327,
        _0x451ae2 = document[_0x15ec81(0x334)](_0x15ec81(0x1f9))[
          _0x15ec81(0x2c0)
        ]('data-latex');
      document[_0x15ec81(0x334)](_0x15ec81(0x1f9))['removeAttribute'](
        'data-latex',
      );
      if (!_0x451ae2)
        _0x451ae2 = parent[_0x15ec81(0x22e)][_0x15ec81(0x2c3)](
          _0x15ec81(0x208),
        );
      else
        _0x451ae2[_0x15ec81(0x312)](/^\s*\\displaystyle\s*$/)
          ? (_0x451ae2 = parent[_0x15ec81(0x22e)]['itex_classchange2'](
              '\x5cclass{itexblank}{@}\x5ccssId{itexcursorbox}{}',
            ))
          : (_0x451ae2 = _0x451ae2[_0x15ec81(0x29f)](/\\displaystyle\s*/, ''));
      parent[_0x15ec81(0x22e)][_0x15ec81(0x1a7)](_0x451ae2), app_reset();
    }, 0xa);
}
function child_return_data(_0x2fdf6d) {
  var _0x5a9b13 = _0x47159c;
  handleResize();
  var _0x1b3fba = MathJax[_0x5a9b13(0x193)](
    parent[_0x5a9b13(0x22e)][_0x5a9b13(0x2c3)](_0x2fdf6d),
  );
  if (!_0x1b3fba[_0x5a9b13(0x334)]('mjx-assistive-mml\x20merror')) {
    var _0x1ff07c = document['querySelector'](_0x5a9b13(0x1f9));
    _0x1ff07c[_0x5a9b13(0x2be)](_0x5a9b13(0x19f), _0x2fdf6d),
      (_0x1ff07c[_0x5a9b13(0x2ca)] = ''),
      _0x1ff07c[_0x5a9b13(0x232)](_0x1b3fba),
      parent['iTeXEQ']['symbol_change'](_0x1ff07c),
      (rst_latex = _0x2fdf6d);
  } else return ![];
  var _0x11272a = parseFloat(
      parent[_0x5a9b13(0x22e)][_0x5a9b13(0x2d0)]['replace'](/px/, ''),
    ),
    _0x55fcaa =
      parseFloat(
        _0x1ff07c[_0x5a9b13(0x334)]('mjx-container>svg')
          [_0x5a9b13(0x2c0)](_0x5a9b13(0x29d))
          [_0x5a9b13(0x29f)](/ex/, ''),
      ) *
      (_0x11272a * 0.8),
    _0x36d96c =
      parseFloat(
        _0x1ff07c['querySelector'](_0x5a9b13(0x254))
          ['getAttribute']('height')
          [_0x5a9b13(0x29f)](/ex/, ''),
      ) *
      (_0x11272a * 0.8);
  _0x1ff07c['querySelector'](_0x5a9b13(0x254))[_0x5a9b13(0x2be)](
    _0x5a9b13(0x29d),
    _0x55fcaa + 'px',
  ),
    _0x1ff07c[_0x5a9b13(0x334)]('mjx-container>svg')[_0x5a9b13(0x2be)](
      _0x5a9b13(0x2cf),
      _0x36d96c + 'px',
    ),
    document[_0x5a9b13(0x334)](_0x5a9b13(0x1f9))[_0x5a9b13(0x335)](
      evtclk,
      function (_0x43739e) {
        var _0x362f9f = _0x5a9b13;
        _0x43739e[_0x362f9f(0x1e9)]();
      },
      ![],
    ),
    clear();
  var _0x4baa58 = document[_0x5a9b13(0x334)]('#sketchpad'),
    _0x188539 = _0x4baa58[_0x5a9b13(0x225)]('2d');
  _0x188539['clearRect'](
    0x0,
    0x0,
    _0x4baa58[_0x5a9b13(0x29d)],
    _0x4baa58[_0x5a9b13(0x2cf)],
  ),
    document[_0x5a9b13(0x334)]('#tab_img_block')[_0x5a9b13(0x20f)]['contains'](
      _0x5a9b13(0x2cb),
    ) &&
      (document['querySelector'](_0x5a9b13(0x323))[_0x5a9b13(0x20f)][
        _0x5a9b13(0x1d5)
      ](_0x5a9b13(0x2cb)),
      document[_0x5a9b13(0x334)](_0x5a9b13(0x323))[_0x5a9b13(0x20f)][
        _0x5a9b13(0x2f8)
      ](_0x5a9b13(0x1af))),
    cropper && cropper[_0x5a9b13(0x1a4)]();
}
function ocr_eqn_save(_0x3ff616) {
  return new Promise(function (_0x567cb1, _0xcf9f53) {
    var _0x405cb = _0x6c00,
      _0x48ffc2 = document['querySelector'](_0x405cb(0x1f9))[_0x405cb(0x2c0)](
        _0x405cb(0x19f),
      );
    _0x48ffc2 &&
      (_0x48ffc2 = _0x48ffc2[_0x405cb(0x29f)](/\\displaystyle\s*/, '')),
      !_0x48ffc2 || _0x48ffc2[_0x405cb(0x312)](/^\s*$/)
        ? (_0x3ff616 && app_reset(), _0x567cb1({ error: _0x405cb(0x226) }))
        : ((_0x48ffc2 = parent[_0x405cb(0x22e)][_0x405cb(0x2c3)](_0x48ffc2)),
          parent[_0x405cb(0x22e)]
            [_0x405cb(0x2d2)](_0x48ffc2)
            [_0x405cb(0x23f)](([_0xa80363, _0x2be863, _0x4b6e21]) => {
              var _0x4cf52c = _0x405cb;
              document[_0x4cf52c(0x334)](_0x4cf52c(0x1f9))[_0x4cf52c(0x266)](
                'data-latex',
              ),
                app_reset(),
                _0x567cb1([_0xa80363, _0x2be863, _0x4b6e21]);
            }));
  });
}
document['querySelector'](_0x47159c(0x1bb)) &&
  document['querySelector'](_0x47159c(0x1bb))[_0x47159c(0x335)](
    evtclk,
    ocrmode_close,
    ![],
  );
function ocrmode_close() {
  var _0x4b853a = _0x47159c;
  parent[_0x4b853a(0x22e)][_0x4b853a(0x2e6)] == _0x4b853a(0x22f)
    ? ocrmode_close_normal()
    : ocrmode_close_custom();
}
function ocrmode_close_normal() {
  var _0x4dc514 = _0x47159c,
    _0x4f51ab =
      document['querySelector']('#mjx-editing-area')[_0x4dc514(0x2c0)](
        'data-latex',
      );
  document[_0x4dc514(0x334)](_0x4dc514(0x1f9))[_0x4dc514(0x266)](
    _0x4dc514(0x19f),
  ),
    parent[_0x4dc514(0x22e)][_0x4dc514(0x1fd)](),
    app_reset(),
    (parent[_0x4dc514(0x276)]['getElementById']('iframe_ocr_box')[
      _0x4dc514(0x1b8)
    ][_0x4dc514(0x2d1)] = _0x4dc514(0x26f));
}
function ocrmode_close_custom() {
  var _0x4caf71 = _0x47159c,
    _0x2f07c0 = document['querySelector'](_0x4caf71(0x1f9))['getAttribute'](
      _0x4caf71(0x19f),
    );
  document[_0x4caf71(0x334)](_0x4caf71(0x1f9))[_0x4caf71(0x266)]('data-latex'),
    parent['iTeXEQ'][_0x4caf71(0x1fd)](),
    app_reset();
}
function ocrmode_hidden() {
  var _0x2b16dd = _0x47159c;
  app_reset(),
    (parent[_0x2b16dd(0x276)][_0x2b16dd(0x1e2)]('iframe_ocr_box')[
      _0x2b16dd(0x1b8)
    ][_0x2b16dd(0x2d1)] = 'none');
}
function eqn_or_text() {
  var _0x45181c = _0x47159c;
  app_reset();
  if (this[_0x45181c(0x20f)][_0x45181c(0x270)](_0x45181c(0x32b)))
    (this[_0x45181c(0x285)] = 'ko'),
      this[_0x45181c(0x20f)]['remove']('eqn_input_mode'),
      this[_0x45181c(0x20f)][_0x45181c(0x2f8)](_0x45181c(0x2e0));
  else
    this[_0x45181c(0x20f)][_0x45181c(0x270)](_0x45181c(0x2e0))
      ? ((this[_0x45181c(0x285)] = 'en'),
        this['classList'][_0x45181c(0x1d5)](_0x45181c(0x2e0)),
        this[_0x45181c(0x20f)][_0x45181c(0x2f8)]('en_input_mode'))
      : ((this[_0x45181c(0x285)] = '수식'),
        this[_0x45181c(0x20f)][_0x45181c(0x1d5)](_0x45181c(0x1ef)),
        this[_0x45181c(0x20f)][_0x45181c(0x2f8)](_0x45181c(0x32b)));
}
function eqn_convert() {
  return new Promise(function (_0x549c71, _0x66d6af) {
    var _0x1e4c7a = _0x6c00;
    if (itex_wr_ready == ![]) itex_wr_ready = !![];
    else return console[_0x1e4c7a(0x1cf)]('block'), _0x66d6af(![]), ![];
    document[_0x1e4c7a(0x334)](_0x1e4c7a(0x339)) &&
      document[_0x1e4c7a(0x334)](_0x1e4c7a(0x339))[_0x1e4c7a(0x250)][
        _0x1e4c7a(0x26e)
      ](document[_0x1e4c7a(0x334)](_0x1e4c7a(0x339)));
    if (!document[_0x1e4c7a(0x334)]('.cropper-container')) {
      document[_0x1e4c7a(0x334)](_0x1e4c7a(0x339)) &&
        document['querySelector'](_0x1e4c7a(0x339))[_0x1e4c7a(0x250)][
          _0x1e4c7a(0x26e)
        ](document[_0x1e4c7a(0x334)](_0x1e4c7a(0x339)));
      var _0x3aa439, _0x39b876, _0x2fe44d, _0x470c2e;
      if (document['querySelector'](_0x1e4c7a(0x1d7))) {
        var _0x1d14c7 = document[_0x1e4c7a(0x334)]('#mjx-editing-area\x20svg')[
          _0x1e4c7a(0x273)
        ]();
        console[_0x1e4c7a(0x1cf)](minX, minY, maxX, maxY),
          _0x1d14c7['width'] > 0x1 && _0x1d14c7[_0x1e4c7a(0x2cf)] > 0x1
            ? ((_0x3aa439 = 0x0), (_0x39b876 = 0x0))
            : ((_0x3aa439 = minX - 0x14), (_0x39b876 = minY - 0x14)),
          maxX > _0x1d14c7[_0x1e4c7a(0x221)]
            ? (_0x2fe44d = maxX + 0x14)
            : (_0x2fe44d = _0x1d14c7['right'] + 0x14),
          maxY > _0x1d14c7['bottom']
            ? (_0x470c2e = maxY + 0x14)
            : (_0x470c2e = _0x1d14c7[_0x1e4c7a(0x277)] + 0x14),
          _0x3aa439 < 0x0 && (_0x3aa439 = 0x0),
          _0x39b876 < 0x0 && (_0x39b876 = 0x0),
          _0x2fe44d >
            document[_0x1e4c7a(0x334)](_0x1e4c7a(0x1c0))[
              'getBoundingClientRect'
            ]()[_0x1e4c7a(0x221)] &&
            (_0x2fe44d = document[_0x1e4c7a(0x334)](_0x1e4c7a(0x1c0))[
              _0x1e4c7a(0x273)
            ]()[_0x1e4c7a(0x221)]),
          _0x470c2e >
            document[_0x1e4c7a(0x334)](_0x1e4c7a(0x1c0))[_0x1e4c7a(0x273)]()[
              _0x1e4c7a(0x277)
            ] &&
            (_0x470c2e = document[_0x1e4c7a(0x334)](_0x1e4c7a(0x1c0))[
              'getBoundingClientRect'
            ]()['bottom']);
      } else
        (_0x3aa439 = minX - 0x14),
          (_0x39b876 = minY - 0x14),
          (_0x2fe44d = maxX + 0x14),
          (_0x470c2e = maxY + 0x14);
      html2canvas(document[_0x1e4c7a(0x334)](_0x1e4c7a(0x1c0)), {
        x: _0x3aa439,
        y: _0x39b876,
        width: _0x2fe44d - _0x3aa439,
        height: _0x470c2e - _0x39b876,
        scale: 0x1,
      })['then']((_0x56db06) => {
        var _0x1b7997 = _0x1e4c7a,
          _0x3cf59d = new Object();
        _0x3cf59d[_0x1b7997(0x198)] = _0x56db06['toDataURL'](_0x1b7997(0x1f4));
        var _0x194434 = _0x1b7997(0x28d),
          _0x396285 = Math[_0x1b7997(0x307)](
            ((_0x3cf59d[_0x1b7997(0x198)][_0x1b7997(0x259)] -
              _0x194434[_0x1b7997(0x259)]) *
              0x3) /
              0x4,
          );
        mpx_res_dream(_0x3cf59d);
      });
    }
  });
}
function contrastImage(_0x2db430, _0x4a0b45) {
  var _0x1aba47 = _0x47159c,
    _0x55c000 = _0x2db430[_0x1aba47(0x2e5)];
  _0x4a0b45 = _0x4a0b45 / 0x64 + 0x1;
  var _0x3d6b45 = 0x80 * (0x1 - _0x4a0b45);
  for (var _0x68c90a = 0x0; _0x68c90a < _0x55c000['length']; _0x68c90a += 0x4) {
    (_0x55c000[_0x68c90a] = _0x55c000[_0x68c90a] * _0x4a0b45 + _0x3d6b45),
      (_0x55c000[_0x68c90a + 0x1] =
        _0x55c000[_0x68c90a + 0x1] * _0x4a0b45 + _0x3d6b45),
      (_0x55c000[_0x68c90a + 0x2] =
        _0x55c000[_0x68c90a + 0x2] * _0x4a0b45 + _0x3d6b45);
  }
  return _0x2db430;
}
var wsite = document['querySelectorAll'](_0x47159c(0x298));
for (var i = 0x0; i < wsite[_0x47159c(0x259)]; i++) {
  wsite[i]['addEventListener'](
    evtclk,
    function () {
      var _0x22418c = _0x47159c;
      if (
        document[_0x22418c(0x334)](_0x22418c(0x1a1)) &&
        !wolfram_rst &&
        !document['querySelector']('.cropper-container')
      )
        return alert(_0x22418c(0x303)), ![];
      if (this['id'] == _0x22418c(0x21a) && wolfram_rst != '')
        return wolfram_call(wolfram_rst), !![];
      (this['id'] == _0x22418c(0x2a9) || this['id'] == 'google') &&
        (popup_window = window[_0x22418c(0x2c5)]());
      if (this['id'] == _0x22418c(0x2a9) && mathpapa_rst != '')
        return mathpapa_call(mathpapa_rst), !![];
      if (this['id'] == _0x22418c(0x1be) && google_rst != '')
        return google_call(google_rst), !![];
      this[_0x22418c(0x20f)][_0x22418c(0x2f8)](_0x22418c(0x1ec));
      if (!document[_0x22418c(0x334)](_0x22418c(0x28b)))
        html2canvas(document[_0x22418c(0x334)](_0x22418c(0x1c0)), {
          scale: 0x1,
          useCORS: !![],
        })[_0x22418c(0x23f)]((_0x497131) => {
          var _0x2677e8 = _0x22418c,
            _0x2f4869 = new Object(),
            _0x26f3b1 = new Image();
          (_0x26f3b1[_0x2677e8(0x198)] = _0x497131[_0x2677e8(0x2e1)](
            _0x2677e8(0x1f4),
          )),
            (_0x26f3b1['id'] = _0x2677e8(0x204)),
            (_0x2f4869[_0x2677e8(0x198)] = _0x26f3b1[_0x2677e8(0x198)]);
          var _0x17344f = _0x2677e8(0x28d),
            _0x2ea4ef = Math[_0x2677e8(0x307)](
              ((_0x26f3b1[_0x2677e8(0x198)]['length'] - _0x17344f['length']) *
                0x3) /
                0x4,
            );
          mpx_res(_0x2f4869);
        });
      else {
        var _0x3d04cc = new Object(),
          _0x52fc22 = new Image();
        (_0x52fc22['id'] = _0x22418c(0x204)),
          (_0x52fc22[_0x22418c(0x198)] = getBase64Image(
            cropper[_0x22418c(0x1e1)]({ fillColor: _0x22418c(0x272) }),
          )),
          (_0x3d04cc['src'] = _0x52fc22['src']);
        var _0x356848 = 'data:image/jpeg;base64,',
          _0x257042 = Math[_0x22418c(0x307)](
            ((_0x52fc22[_0x22418c(0x198)][_0x22418c(0x259)] -
              _0x356848[_0x22418c(0x259)]) *
              0x3) /
              0x4,
          );
        mpx_res(_0x3d04cc);
      }
    },
    ![],
  );
}
function app_reset() {
  var _0x5ebfd3 = _0x47159c;
  (document[_0x5ebfd3(0x1e2)]('mjx-editing-area')['innerHTML'] = ''),
    document[_0x5ebfd3(0x1e2)](_0x5ebfd3(0x309))[_0x5ebfd3(0x2be)](
      _0x5ebfd3(0x19f),
      '',
    ),
    (document[_0x5ebfd3(0x334)](_0x5ebfd3(0x1a6))[_0x5ebfd3(0x2ca)] =
      '<span\x20class=\x22null_box\x22></span>'),
    clear(),
    (document['getElementById'](_0x5ebfd3(0x280))[_0x5ebfd3(0x2ca)] = '');
  var _0x358a40 = new Image();
  (_0x358a40['id'] = _0x5ebfd3(0x204)),
    document[_0x5ebfd3(0x1e2)]('img_box')[_0x5ebfd3(0x232)](_0x358a40),
    (document['getElementById'](_0x5ebfd3(0x1ca))[_0x5ebfd3(0x1b8)][
      _0x5ebfd3(0x2d1)
    ] = _0x5ebfd3(0x26f)),
    (document[_0x5ebfd3(0x1e2)](_0x5ebfd3(0x1ca))['innerHTML'] = ''),
    (document[_0x5ebfd3(0x334)](_0x5ebfd3(0x224))[_0x5ebfd3(0x1b8)][
      _0x5ebfd3(0x30f)
    ] = 0x2),
    document[_0x5ebfd3(0x1e2)](_0x5ebfd3(0x27a))[_0x5ebfd3(0x2be)](
      'data-state',
      _0x5ebfd3(0x2b8),
    ),
    (document['getElementById']('eq_box')[_0x5ebfd3(0x1dc)] = ''),
    cropper && cropper[_0x5ebfd3(0x1a4)](),
    (eq_arr = []),
    (wolfram_rst = ''),
    (mathpapa_rst = ''),
    handwriting_pen(),
    document[_0x5ebfd3(0x334)](_0x5ebfd3(0x1a6))[_0x5ebfd3(0x20f)][
      _0x5ebfd3(0x1d5)
    ](_0x5ebfd3(0x1a3)),
    document[_0x5ebfd3(0x334)](_0x5ebfd3(0x1a6))[_0x5ebfd3(0x20f)][
      _0x5ebfd3(0x2f8)
    ](_0x5ebfd3(0x229)),
    (parent['iTeXEQ'][_0x5ebfd3(0x2b2)] = ![]),
    (minX = Infinity),
    (minY = Infinity),
    (maxX = -Infinity),
    (maxY = -Infinity);
}
function temp_reset() {
  var _0x190358 = _0x47159c;
  window[_0x190358(0x336)][_0x190358(0x22d)]();
}
document['getElementById']('img_file_up')[_0x47159c(0x335)](
  'change',
  function () {
    var _0x42a410 = _0x47159c;
    if (this[_0x42a410(0x1a9)] && this[_0x42a410(0x1a9)][0x0]) {
      var _0x140a25 = new FileReader();
      _0x140a25[_0x42a410(0x335)](_0x42a410(0x1b3), function (_0x441f3d) {
        var _0x313019 = _0x42a410,
          _0x198665 = document[_0x313019(0x1e2)]('img');
        (_0x198665[_0x313019(0x198)] =
          _0x441f3d[_0x313019(0x2c7)][_0x313019(0x32e)]),
          (cropper = new Cropper(_0x198665, { viewMode: 0x0 }));
      }),
        _0x140a25['readAsDataURL'](this[_0x42a410(0x1a9)][0x0]);
    }
  },
  ![],
);
function getBase64Image(_0x1e240b) {
  var _0x5dd00d = _0x47159c,
    _0xd869e2 = document[_0x5dd00d(0x1bc)](_0x5dd00d(0x2ef)),
    _0x47dbe1 = 0x190,
    _0x16ded2 = 0x190,
    _0x41f60c = _0x1e240b[_0x5dd00d(0x29d)],
    _0x5f0ecd = _0x1e240b['height'];
  _0x41f60c > _0x5f0ecd
    ? _0x41f60c > _0x47dbe1 &&
      ((_0x5f0ecd *= _0x47dbe1 / _0x41f60c), (_0x41f60c = _0x47dbe1))
    : _0x5f0ecd > _0x16ded2 &&
      ((_0x41f60c *= _0x16ded2 / _0x5f0ecd), (_0x5f0ecd = _0x16ded2));
  _0x41f60c < 0x190
    ? ((_0xd869e2['width'] = 0x190),
      (_0xd869e2[_0x5dd00d(0x2cf)] = _0x5f0ecd * (0x190 / _0x41f60c)))
    : ((_0xd869e2[_0x5dd00d(0x29d)] = _0x41f60c),
      (_0xd869e2[_0x5dd00d(0x2cf)] = _0x5f0ecd));
  var _0x5b12a4 = _0xd869e2['getContext']('2d');
  return (
    _0x5b12a4['drawImage'](_0x1e240b, 0x0, 0x0, _0x41f60c, _0x5f0ecd),
    (dataURL = _0xd869e2['toDataURL'](_0x5dd00d(0x1f4)))
  );
}
function dataURItoBlob(_0x352c4f, _0x323c51) {
  var _0x5b62e9 = _0x47159c,
    _0x5b3092;
  if (
    _0x352c4f[_0x5b62e9(0x199)](',')[0x0][_0x5b62e9(0x20c)](_0x5b62e9(0x2c9)) >=
    0x0
  )
    _0x5b3092 = atob(_0x352c4f[_0x5b62e9(0x199)](',')[0x1]);
  else _0x5b3092 = unescape(_0x352c4f['split'](',')[0x1]);
  var _0x300d1d = _0x352c4f[_0x5b62e9(0x199)](',')[0x0]
      [_0x5b62e9(0x199)](':')[0x1]
      [_0x5b62e9(0x199)](';')[0x0],
    _0x4a1c3d = new Uint8Array(_0x5b3092[_0x5b62e9(0x259)]);
  for (var _0x1ace63 = 0x0; _0x1ace63 < _0x5b3092['length']; _0x1ace63++) {
    _0x4a1c3d[_0x1ace63] = _0x5b3092['charCodeAt'](_0x1ace63);
  }
  return new Blob([_0x4a1c3d], { type: _0x300d1d });
}
function textRecognize() {
  var _0x14f12d = _0x47159c,
    _0x1beef9 = 'ko';
  document[_0x14f12d(0x334)](_0x14f12d(0x25f)) && (_0x1beef9 = 'en');
  var _0xd546a7 = JSON[_0x14f12d(0x202)]({
      options: 'enable_pre_space',
      requests: [
        {
          writing_guide: {
            writing_area_width:
              document[_0x14f12d(0x1e2)]('sketchpad')[_0x14f12d(0x29d)] ||
              this[_0x14f12d(0x29d)] ||
              undefined,
            writing_area_height:
              document[_0x14f12d(0x1e2)](_0x14f12d(0x1eb))[_0x14f12d(0x2cf)] ||
              this[_0x14f12d(0x29d)] ||
              undefined,
          },
          ink: traces,
          language: _0x1beef9 || 'ko',
        },
      ],
    }),
    _0x281c13 = new XMLHttpRequest();
  _0x281c13[_0x14f12d(0x335)](_0x14f12d(0x319), function () {
    var _0x390755 = _0x14f12d;
    if (this['readyState'] === 0x4 && this[_0x390755(0x23e)] === 0xc8) {
      var _0x476a1e = JSON[_0x390755(0x1de)](this[_0x390755(0x289)]),
        _0x5ec679 = _0x476a1e[0x1][0x0][0x1];
      clear(), (traces = []);
      var _0x50c706 = document[_0x390755(0x281)](_0x5ec679[0x0]),
        _0x5c7524 = document['createElement'](_0x390755(0x200));
      _0x5c7524[_0x390755(0x232)](_0x50c706);
      var _0x4e9d59 = document[_0x390755(0x334)](_0x390755(0x1f9));
      (_0x4e9d59[_0x390755(0x2ca)] = ''),
        _0x4e9d59[_0x390755(0x232)](_0x5c7524),
        (document[_0x390755(0x1e2)](_0x390755(0x1d9))[_0x390755(0x1b8)][
          _0x390755(0x30f)
        ] = 0x1),
        (document[_0x390755(0x1e2)](_0x390755(0x197))['style']['zIndex'] = 0x2),
        document[_0x390755(0x1e2)](_0x390755(0x295))[_0x390755(0x20f)][
          'remove'
        ](_0x390755(0x216)),
        document[_0x390755(0x1e2)](_0x390755(0x2ea))[_0x390755(0x20f)][
          _0x390755(0x1d5)
        ]('sel_tool'),
        document[_0x390755(0x1e2)](_0x390755(0x1b0))[_0x390755(0x20f)][
          _0x390755(0x2f8)
        ]('sel_tool');
      var _0x1f5531 = document['getElementById']('myPopup');
      _0x1f5531['innerHTML'] = '';
      for (
        var _0x4cc6db = 0x0;
        _0x4cc6db < _0x5ec679[_0x390755(0x259)];
        _0x4cc6db++
      ) {
        var _0x1337dd = document[_0x390755(0x1bc)]('span');
        (_0x1337dd[_0x390755(0x1d0)] = _0x390755(0x2ab)),
          (_0x1337dd['textContent'] = _0x5ec679[_0x4cc6db]),
          _0x1f5531[_0x390755(0x232)](_0x1337dd);
      }
      _0x5c7524['addEventListener'](
        evtclk,
        function (_0x487b37) {
          var _0xf8dbba = _0x390755;
          _0x487b37['stopPropagation'](),
            document[_0xf8dbba(0x1e2)](_0xf8dbba(0x28f))[_0xf8dbba(0x20f)][
              _0xf8dbba(0x288)
            ]('tipshow');
        },
        ![],
      );
      var _0x4a008f = document[_0x390755(0x1d1)]('.txtelem');
      for (
        var _0x4cc6db = 0x0;
        _0x4cc6db < _0x4a008f[_0x390755(0x259)];
        _0x4cc6db++
      ) {
        _0x4a008f[_0x4cc6db][_0x390755(0x335)](
          evtclk,
          function () {
            var _0x410a9c = _0x390755;
            (_0x5c7524[_0x410a9c(0x285)] = this[_0x410a9c(0x285)]),
              document[_0x410a9c(0x1e2)]('myPopup')[_0x410a9c(0x20f)][
                _0x410a9c(0x1d5)
              ](_0x410a9c(0x20d));
          },
          ![],
        );
      }
    }
  }),
    _0x281c13['open'](_0x14f12d(0x31b), _0x14f12d(0x2fa)),
    _0x281c13[_0x14f12d(0x1d4)]('content-type', _0x14f12d(0x214)),
    _0x281c13[_0x14f12d(0x1e0)](_0xd546a7);
}
function mpx_res(_0x298947) {
  return new Promise(function (_0x64c01a, _0x1e15fc) {
    var _0x443f81 = _0x6c00;
    try {
      document[_0x443f81(0x1e2)](_0x443f81(0x197))[_0x443f81(0x20f)][
        _0x443f81(0x2f8)
      ]('eqn_tranfer'),
        document[_0x443f81(0x1e2)](_0x443f81(0x1d9))[_0x443f81(0x20f)]['add'](
          _0x443f81(0x262),
        );
      var _0x1bcd1c = new FormData();
      _0x1bcd1c['append'](
        _0x443f81(0x283),
        dataURItoBlob(_0x298947[_0x443f81(0x198)], 'jpeg'),
      );
      var _0x2b8903 = new XMLHttpRequest();
      _0x2b8903[_0x443f81(0x2c5)](_0x443f81(0x31b), eqn_ocr_url, !![]),
        _0x2b8903['setRequestHeader']('app_key', ocr_header_key),
        _0x2b8903['send'](_0x1bcd1c),
        (_0x2b8903[_0x443f81(0x2a1)] = function () {
          var _0x8476e8 = _0x443f81;
          if (
            _0x2b8903[_0x8476e8(0x1fc)] == 0x4 &&
            _0x2b8903['status'] == 0xc8
          ) {
            var _0x562b64 = JSON[_0x8476e8(0x1de)](_0x2b8903[_0x8476e8(0x289)]);
            if (_0x562b64['error'])
              return (
                alert(_0x8476e8(0x206) + _0x562b64['error']),
                loader_hide(),
                (btn_gp = ![]),
                _0x1e15fc(![]),
                ![]
              );
            command_gen(_0x562b64),
              eqn_render(_0x562b64[_0x8476e8(0x220)][0x0]),
              document[_0x8476e8(0x1e2)](_0x8476e8(0x197))['classList'][
                _0x8476e8(0x1d5)
              ](_0x8476e8(0x262)),
              document['getElementById'](_0x8476e8(0x1d9))[_0x8476e8(0x20f)][
                _0x8476e8(0x1d5)
              ](_0x8476e8(0x262)),
              (wolfram_rst = _0x562b64['wolfram']),
              (mathpapa_rst = _0x562b64[_0x8476e8(0x241)]),
              (google_rst = _0x562b64[_0x8476e8(0x21a)]),
              (candidate = _0x562b64[_0x8476e8(0x2a3)]),
              (candidate_temp = JSON[_0x8476e8(0x1de)](
                JSON[_0x8476e8(0x202)](candidate),
              )),
              (document['getElementById'](_0x8476e8(0x1d9))['style'][
                _0x8476e8(0x30f)
              ] = 0x1),
              (document['getElementById'](_0x8476e8(0x197))[_0x8476e8(0x1b8)][
                _0x8476e8(0x30f)
              ] = 0x2),
              (parent[_0x8476e8(0x22e)][_0x8476e8(0x2b2)] = ![]),
              _0x64c01a(!![]);
            if (
              document[_0x8476e8(0x1e2)]('wolfram')[_0x8476e8(0x20f)][
                _0x8476e8(0x270)
              ](_0x8476e8(0x1ec))
            )
              console[_0x8476e8(0x1cf)](wolfram_rst), wolfram_call(wolfram_rst);
            else {
              if (
                document[_0x8476e8(0x1e2)]('mathpapa')[_0x8476e8(0x20f)][
                  _0x8476e8(0x270)
                ](_0x8476e8(0x1ec))
              )
                console['log'](mathpapa_rst), mathpapa_call(mathpapa_rst);
              else {
                if (
                  document[_0x8476e8(0x1e2)]('google')[_0x8476e8(0x20f)][
                    _0x8476e8(0x270)
                  ](_0x8476e8(0x1ec))
                )
                  console[_0x8476e8(0x1cf)](google_rst),
                    google_call(google_rst);
                else {
                }
              }
            }
            itex_wr_ready = ![];
          } else itex_wr_ready = ![];
        });
    } catch (_0x1a6abd) {
      console[_0x443f81(0x1cf)](_0x443f81(0x2a8), _0x1a6abd),
        (itex_wr_ready = ![]);
    }
  });
}
function mpx_res_dream(_0x3fb234) {
  return new Promise(function (_0x52f799, _0x13e0c4) {
    var _0x5e2f68 = _0x6c00;
    try {
      document[_0x5e2f68(0x1e2)](_0x5e2f68(0x197))[_0x5e2f68(0x20f)][
        _0x5e2f68(0x2f8)
      ](_0x5e2f68(0x262)),
        document[_0x5e2f68(0x1e2)](_0x5e2f68(0x1d9))[_0x5e2f68(0x20f)][
          _0x5e2f68(0x2f8)
        ]('eqn_tranfer'),
        console[_0x5e2f68(0x1cf)](_0x3fb234[_0x5e2f68(0x198)]);
      var _0x1495da = new FormData();
      _0x1495da[_0x5e2f68(0x24b)](
        _0x5e2f68(0x283),
        dataURItoBlob(_0x3fb234['src'], _0x5e2f68(0x1a5)),
      );
      var _0x380fdc = new XMLHttpRequest();
      _0x380fdc['open'](
        _0x5e2f68(0x31b),
        window[_0x5e2f68(0x2f9)][_0x5e2f68(0x19c)] + _0x5e2f68(0x2e4),
        !![],
      ),
        _0x380fdc[_0x5e2f68(0x1e0)](_0x1495da),
        (_0x380fdc[_0x5e2f68(0x2a1)] = function () {
          var _0x5e98d6 = _0x5e2f68;
          if (
            _0x380fdc['readyState'] == 0x4 &&
            _0x380fdc[_0x5e98d6(0x23e)] == 0xc8
          ) {
            var _0x290a30 = JSON['parse'](_0x380fdc[_0x5e98d6(0x289)]);
            if (_0x290a30['error'])
              return (
                alert(_0x5e98d6(0x206) + _0x290a30[_0x5e98d6(0x1c4)]),
                loader_hide(),
                (btn_gp = ![]),
                _0x13e0c4(![]),
                ![]
              );
            command_gen(_0x290a30[0x0]),
              eqn_render(_0x290a30[0x0][_0x5e98d6(0x28a)][0x0]),
              document[_0x5e98d6(0x1e2)](_0x5e98d6(0x197))['classList'][
                _0x5e98d6(0x1d5)
              ]('eqn_tranfer'),
              document['getElementById'](_0x5e98d6(0x1d9))[_0x5e98d6(0x20f)][
                _0x5e98d6(0x1d5)
              ](_0x5e98d6(0x262)),
              (wolfram_rst = _0x290a30[0x0][_0x5e98d6(0x21a)]),
              (mathpapa_rst = _0x290a30[0x0][_0x5e98d6(0x241)]),
              (google_rst = _0x290a30[0x0][_0x5e98d6(0x21a)]),
              (candidate = _0x290a30[0x0][_0x5e98d6(0x2a3)]),
              (candidate_temp = JSON[_0x5e98d6(0x1de)](
                JSON[_0x5e98d6(0x202)](candidate),
              )),
              (document[_0x5e98d6(0x1e2)](_0x5e98d6(0x1d9))[_0x5e98d6(0x1b8)][
                'zIndex'
              ] = 0x1),
              (document[_0x5e98d6(0x1e2)](_0x5e98d6(0x197))[_0x5e98d6(0x1b8)][
                _0x5e98d6(0x30f)
              ] = 0x2),
              (parent['iTeXEQ'][_0x5e98d6(0x2b2)] = ![]),
              _0x52f799(!![]);
            if (
              document[_0x5e98d6(0x1e2)]('wolfram')[_0x5e98d6(0x20f)][
                _0x5e98d6(0x270)
              ](_0x5e98d6(0x1ec))
            )
              console[_0x5e98d6(0x1cf)](wolfram_rst), wolfram_call(wolfram_rst);
            else {
              if (
                document['getElementById'](_0x5e98d6(0x2a9))['classList'][
                  _0x5e98d6(0x270)
                ](_0x5e98d6(0x1ec))
              )
                console[_0x5e98d6(0x1cf)](mathpapa_rst),
                  mathpapa_call(mathpapa_rst);
              else
                document[_0x5e98d6(0x1e2)](_0x5e98d6(0x1be))[_0x5e98d6(0x20f)][
                  _0x5e98d6(0x270)
                ](_0x5e98d6(0x1ec)) &&
                  (console[_0x5e98d6(0x1cf)](google_rst),
                  google_call(google_rst));
            }
            itex_wr_ready = ![];
          } else itex_wr_ready = ![];
        });
    } catch (_0x1b9d67) {
      console[_0x5e2f68(0x1cf)]('mpx_res\x20error:\x20', _0x1b9d67),
        (itex_wr_ready = ![]);
    }
  });
}
function background_evt(_0xcd78d) {
  var _0x2745ab = _0x47159c;
  _0xcd78d['stopPropagation'](),
    document['getElementById'](_0x2745ab(0x28f))[_0x2745ab(0x20f)][
      _0x2745ab(0x1d5)
    ](_0x2745ab(0x20d)),
    document[_0x2745ab(0x334)](_0x2745ab(0x2a7)) &&
      document[_0x2745ab(0x334)](_0x2745ab(0x2a7))[_0x2745ab(0x20f)][
        _0x2745ab(0x1d5)
      ](_0x2745ab(0x2f0)),
    (document[_0x2745ab(0x1e2)](_0x2745ab(0x1d9))[_0x2745ab(0x1b8)][
      _0x2745ab(0x30f)
    ] = 0x2),
    (document[_0x2745ab(0x1e2)](_0x2745ab(0x197))[_0x2745ab(0x1b8)][
      _0x2745ab(0x30f)
    ] = 0x1);
}
function command_gen(_0x2c3164) {
  var _0x2cd546 = _0x47159c;
  for (
    var _0x5a01f4 = 0x0;
    _0x5a01f4 < _0x2c3164[_0x2cd546(0x2a3)][0x0][_0x2cd546(0x259)];
    _0x5a01f4++
  ) {
    var _0x126d22 = _0x2c3164[_0x2cd546(0x2a3)][0x0][_0x5a01f4];
    for (var _0x58c7ea = 0x0; _0x58c7ea < _0x126d22['length']; _0x58c7ea++) {
      var _0x15c47a = _0x126d22[_0x58c7ea];
      (_0x15c47a = _0x15c47a[_0x2cd546(0x29f)](/\\textrm/g, '\x5cmathrm')),
        (_0x15c47a = _0x15c47a[_0x2cd546(0x29f)](/\/\//g, '⫽')),
        (_0x15c47a = _0x15c47a['replace'](/\\mathrm\{⫽\}/g, '⫽')),
        (_0x15c47a = _0x15c47a[_0x2cd546(0x29f)](/\\sim/g, '〜')),
        (_0x15c47a = _0x15c47a[_0x2cd546(0x29f)](/\\mathrm\{∽\}/g, '∼')),
        (_0x15c47a = _0x15c47a['replace'](/\\bigcirc/g, '○')),
        (_0x15c47a = _0x15c47a[_0x2cd546(0x29f)](/\\vert/g, '|')),
        (_0x15c47a = _0x15c47a['replace'](
          /\\begin\{cases\}/g,
          _0x2cd546(0x244),
        )),
        (_0x15c47a = _0x15c47a[_0x2cd546(0x29f)](
          /\\end{cases}/g,
          _0x2cd546(0x231),
        )),
        (_0x126d22[_0x58c7ea] = _0x15c47a);
    }
  }
  var _0x102c2e = _0x2c3164[_0x2cd546(0x28a)][0x0];
  (_0x102c2e = _0x102c2e['replace'](/\\textrm/g, '\x5cmathrm')),
    (_0x102c2e = _0x102c2e['replace'](/\/\//g, '⫽')),
    (_0x102c2e = _0x102c2e[_0x2cd546(0x29f)](/\\mathrm\{⫽\}/g, '⫽')),
    (_0x102c2e = _0x102c2e[_0x2cd546(0x29f)](/\\sim/g, '〜')),
    (_0x102c2e = _0x102c2e['replace'](/\\mathrm\{∽\}/g, '∼')),
    (_0x102c2e = _0x102c2e[_0x2cd546(0x29f)](/\\bigcirc/g, '○')),
    (_0x102c2e = _0x102c2e[_0x2cd546(0x29f)](/\\vert/g, '|')),
    (_0x102c2e = _0x102c2e[_0x2cd546(0x29f)](
      /\\begin\{cases\}/g,
      _0x2cd546(0x244),
    )),
    (_0x102c2e = _0x102c2e[_0x2cd546(0x29f)](
      /\\end{cases}/g,
      '\x5cend{array}\x5cright.}',
    )),
    (_0x2c3164[_0x2cd546(0x28a)][0x0] = _0x102c2e);
}
function eqn_render(_0x2d45ec) {
  var _0x47a8ad = _0x47159c;
  (_0x2d45ec = _0x2d45ec[_0x47a8ad(0x29f)](
    /(\\sqrt\s)\[(\s.*?\s)\]/g,
    _0x47a8ad(0x1d8),
  )),
    (_0x2d45ec = _0x2d45ec['replace'](/\\sim/g, '〜'));
  var _0x2bc26d = [],
    _0x43b33a = _0x2d45ec[_0x47a8ad(0x199)]('\x20'),
    _0x26a2d1 = [
      _0x47a8ad(0x1cd),
      _0x47a8ad(0x19e),
      '^\x5c\x5cvert$',
      _0x47a8ad(0x210),
      '^\x5c\x5clambda$',
      _0x47a8ad(0x1b1),
      '^\x5c\x5cOmega$',
      '^\x5c\x5cvarepsilon$',
      _0x47a8ad(0x2a6),
      _0x47a8ad(0x327),
      _0x47a8ad(0x2bf),
      _0x47a8ad(0x29a),
      _0x47a8ad(0x2a5),
      _0x47a8ad(0x1f2),
      _0x47a8ad(0x28e),
      '^\x5c\x5c}$',
      _0x47a8ad(0x27f),
      '^\x5c]$',
      _0x47a8ad(0x2b6),
      _0x47a8ad(0x2f1),
      _0x47a8ad(0x32c),
      _0x47a8ad(0x1ce),
      _0x47a8ad(0x2db),
      _0x47a8ad(0x24a),
      _0x47a8ad(0x2af),
      '^\x5c\x5ctau$',
      _0x47a8ad(0x1b5),
      _0x47a8ad(0x287),
      _0x47a8ad(0x1ac),
      '^\x5c\x5cleq$',
      _0x47a8ad(0x233),
      _0x47a8ad(0x326),
      _0x47a8ad(0x27e),
      '^\x5c\x5ccup$',
      _0x47a8ad(0x243),
      _0x47a8ad(0x1a8),
      '^\x5c\x5csquare$',
      '^\x5c\x5cpi$',
      _0x47a8ad(0x19a),
      '^\x5c\x5crangle$',
      '^\x5c\x5ccirc$',
      '^\x5c\x5ctherefore$',
      _0x47a8ad(0x1fe),
      _0x47a8ad(0x316),
      _0x47a8ad(0x332),
      _0x47a8ad(0x1cb),
      _0x47a8ad(0x1d6),
      '^\x5c\x5cwedge$',
      _0x47a8ad(0x2d5),
      _0x47a8ad(0x282),
      _0x47a8ad(0x2ac),
      _0x47a8ad(0x248),
      '^\x5c\x5cforall$',
      _0x47a8ad(0x27d),
      _0x47a8ad(0x29c),
      '^\x5c\x5comega$',
      _0x47a8ad(0x219),
      '^\x5c\x5cldots$',
      _0x47a8ad(0x329),
      _0x47a8ad(0x23c),
      '^\x5c\x5cvee$',
      _0x47a8ad(0x333),
      _0x47a8ad(0x306),
      _0x47a8ad(0x301),
      '^\x5c\x5cnot\x5c\x5csubset$',
      '^\x5c\x5cangle$',
      '^\x5c.$',
      _0x47a8ad(0x245),
      _0x47a8ad(0x2b4),
      _0x47a8ad(0x2ae),
      _0x47a8ad(0x242),
      _0x47a8ad(0x236),
      _0x47a8ad(0x1ee),
      _0x47a8ad(0x2a4),
      _0x47a8ad(0x239),
      '^\x5c\x5cvarnothing$',
      '^\x5c\x5cnot\x5c\x5csupset$',
      _0x47a8ad(0x23b),
      '^\x5c\x5cmathrm\x5c{.\x5c}$',
      _0x47a8ad(0x23d),
      _0x47a8ad(0x264),
      _0x47a8ad(0x1e6),
      _0x47a8ad(0x1f1),
      _0x47a8ad(0x1f5),
      '^\x5c\x5csum$',
      _0x47a8ad(0x1c5),
      _0x47a8ad(0x275),
      '^\x5c\x5cbot$',
    ];
  for (
    var _0x2805d0 = 0x0;
    _0x2805d0 < _0x43b33a[_0x47a8ad(0x259)];
    _0x2805d0++
  ) {
    var _0x44bcc5 = !![];
    for (
      var _0xbacbf8 = 0x0;
      _0xbacbf8 < _0x26a2d1[_0x47a8ad(0x259)];
      _0xbacbf8++
    ) {
      var _0x15ed36 = new RegExp(_0x26a2d1[_0xbacbf8]);
      _0x15ed36[_0x47a8ad(0x1cc)](_0x43b33a[_0x2805d0]) &&
        (_0x2bc26d[_0x47a8ad(0x1c9)](
          _0x47a8ad(0x2f3) + _0x2805d0 + '}{' + _0x43b33a[_0x2805d0] + '}}',
        ),
        (_0x44bcc5 = ![]));
    }
    _0x44bcc5 === !![] && _0x2bc26d['push'](_0x43b33a[_0x2805d0]);
  }
  var _0x5139db = _0x2bc26d['join']('\x20');
  (_0x5139db = _0x5139db['replace'](/^/, _0x47a8ad(0x31d))),
    (_0x5139db = _0x5139db[_0x47a8ad(0x29f)](/(\\lim\}\})/, '$1\x5climits')),
    (_0x5139db = _0x5139db['replace'](/(\\sum\}\})/, '$1\x5climits')),
    (_0x5139db = _0x5139db[_0x47a8ad(0x29f)](/@@/g, '[')),
    (_0x5139db = _0x5139db[_0x47a8ad(0x29f)](/##/g, ']'));
  var _0x2271a8 = MathJax['tex2svg'](_0x5139db);
  if (!_0x2271a8[_0x47a8ad(0x334)](_0x47a8ad(0x2dc))) {
    var _0x20534e = document[_0x47a8ad(0x334)](_0x47a8ad(0x1f9));
    _0x20534e[_0x47a8ad(0x2be)](_0x47a8ad(0x19f), _0x47a8ad(0x31d) + _0x2d45ec),
      (_0x20534e[_0x47a8ad(0x2ca)] = ''),
      _0x20534e[_0x47a8ad(0x232)](_0x2271a8),
      parent[_0x47a8ad(0x22e)]['symbol_change'](_0x20534e),
      (rst_latex = _0x2d45ec);
  } else
    return (
      (candidate = JSON[_0x47a8ad(0x1de)](
        JSON[_0x47a8ad(0x202)](candidate_temp),
      )),
      ![]
    );
  var _0xc79e7c = parseFloat(
      parent[_0x47a8ad(0x22e)]['mathSize'][_0x47a8ad(0x29f)](/px/, ''),
    ),
    _0x237b87 =
      parseFloat(
        _0x20534e[_0x47a8ad(0x334)](_0x47a8ad(0x254))
          [_0x47a8ad(0x2c0)](_0x47a8ad(0x29d))
          ['replace'](/ex/, ''),
      ) *
      (_0xc79e7c * 0.8),
    _0x1f350b =
      parseFloat(
        _0x20534e[_0x47a8ad(0x334)](_0x47a8ad(0x254))
          [_0x47a8ad(0x2c0)]('height')
          [_0x47a8ad(0x29f)](/ex/, ''),
      ) *
      (_0xc79e7c * 0.8);
  _0x20534e[_0x47a8ad(0x334)](_0x47a8ad(0x254))[_0x47a8ad(0x2be)](
    _0x47a8ad(0x29d),
    _0x237b87 + 'px',
  ),
    _0x20534e[_0x47a8ad(0x334)](_0x47a8ad(0x254))['setAttribute'](
      _0x47a8ad(0x2cf),
      _0x1f350b + 'px',
    );
  var _0x1a00bd = _0x20534e[_0x47a8ad(0x1d1)](_0x47a8ad(0x253));
  for (
    var _0x2805d0 = 0x0;
    _0x2805d0 < _0x1a00bd[_0x47a8ad(0x259)];
    _0x2805d0++
  ) {
    var _0x554669 = create_selbox(_0x1a00bd[_0x2805d0]);
    _0x1a00bd[_0x2805d0]['insertBefore'](
      _0x554669,
      _0x1a00bd[_0x2805d0]['firstChild'],
    ),
      _0x554669[_0x47a8ad(0x335)](
        evtclk,
        function (_0x5e33bd) {
          var _0x5ec09c = _0x47a8ad;
          _0x5e33bd[_0x5ec09c(0x1e9)](), eqn_element_evt(this, !![]);
        },
        ![],
      ),
      _0x1a00bd[_0x2805d0]['addEventListener'](
        evtclk,
        function (_0x5d78c2) {
          var _0x2aa5dd = _0x47a8ad;
          _0x5d78c2[_0x2aa5dd(0x1e9)](), eqn_element_evt(this, ![]);
        },
        ![],
      );
  }
  document[_0x47a8ad(0x334)]('#mjx-editing-area')[_0x47a8ad(0x335)](
    evtclk,
    function (_0x252ea6) {
      var _0x4740da = _0x47a8ad;
      _0x252ea6['stopPropagation'](),
        document[_0x4740da(0x1e2)]('myPopup')[_0x4740da(0x20f)][
          _0x4740da(0x1d5)
        ](_0x4740da(0x20d)),
        document[_0x4740da(0x334)](_0x4740da(0x2a7)) &&
          document[_0x4740da(0x334)](_0x4740da(0x2a7))[_0x4740da(0x20f)][
            _0x4740da(0x1d5)
          ](_0x4740da(0x2f0)),
        (document[_0x4740da(0x1e2)](_0x4740da(0x1d9))['style'][
          _0x4740da(0x30f)
        ] = 0x2),
        (document[_0x4740da(0x1e2)](_0x4740da(0x197))[_0x4740da(0x1b8)][
          _0x4740da(0x30f)
        ] = 0x1);
    },
    ![],
  ),
    document[_0x47a8ad(0x334)](_0x47a8ad(0x2ee))['addEventListener'](
      evtclk,
      function (_0x4362c2) {
        var _0x546caa = _0x47a8ad;
        _0x4362c2[_0x546caa(0x1e9)]();
      },
      ![],
    ),
    clear(),
    document[_0x47a8ad(0x334)](_0x47a8ad(0x323))['classList'][_0x47a8ad(0x270)](
      _0x47a8ad(0x2cb),
    ) &&
      (document[_0x47a8ad(0x334)](_0x47a8ad(0x323))['classList'][
        _0x47a8ad(0x1d5)
      ](_0x47a8ad(0x2cb)),
      document['querySelector'](_0x47a8ad(0x323))[_0x47a8ad(0x20f)]['add'](
        _0x47a8ad(0x1af),
      )),
    cropper && cropper[_0x47a8ad(0x1a4)]();
}
function eqn_element_evt(_0x2b41a3, _0x4d193d) {
  var _0x1a867b = _0x47159c;
  candidate_temp = JSON[_0x1a867b(0x1de)](JSON['stringify'](candidate));
  document[_0x1a867b(0x334)](_0x1a867b(0x2a7)) &&
    document[_0x1a867b(0x334)]('#mjx-editing-area\x20.sel_elem')[
      _0x1a867b(0x20f)
    ]['remove']('sel_elem');
  var _0x57ee1c;
  _0x4d193d
    ? ((_0x57ee1c = parseInt(
        _0x2b41a3['parentNode']
          ['getAttributeNS']('', _0x1a867b(0x251))
          ['split']('\x20')[0x1]
          [_0x1a867b(0x199)]('_')[0x1],
      )),
      _0x2b41a3['parentNode']['classList']['add'](_0x1a867b(0x2f0)))
    : ((_0x57ee1c = parseInt(
        _0x2b41a3[_0x1a867b(0x27b)]('', _0x1a867b(0x251))
          [_0x1a867b(0x199)]('\x20')[0x1]
          [_0x1a867b(0x199)]('_')[0x1],
      )),
      _0x2b41a3['classList']['add'](_0x1a867b(0x2f0)));
  var _0x2893e6 = document[_0x1a867b(0x1e2)](_0x1a867b(0x28f));
  (_0x2893e6[_0x1a867b(0x2ca)] = ''),
    _0x2893e6[_0x1a867b(0x20f)][_0x1a867b(0x270)](_0x1a867b(0x20d)) &&
      _0x2893e6[_0x1a867b(0x20f)][_0x1a867b(0x1d5)](_0x1a867b(0x20d)),
    setTimeout(function () {
      var _0xee16f0 = _0x1a867b;
      _0x2893e6[_0xee16f0(0x20f)]['add']('tipshow');
      var _0x13657e = candidate[0x0][_0x57ee1c];
      for (
        var _0x4a5917 = 0x0;
        _0x4a5917 < _0x13657e[_0xee16f0(0x259)];
        _0x4a5917++
      ) {
        try {
          _0x2893e6[_0xee16f0(0x232)](
            MathJax[_0xee16f0(0x193)](_0x13657e[_0x4a5917]),
          ),
            parent[_0xee16f0(0x22e)][_0xee16f0(0x1b9)](_0x2893e6),
            _0x2893e6[_0xee16f0(0x1d1)](_0xee16f0(0x268))[_0x4a5917][
              'querySelector'
            ](_0xee16f0(0x2dc)) &&
              (_0x2893e6[_0xee16f0(0x1d1)](_0xee16f0(0x268))[_0x4a5917][
                _0xee16f0(0x1b8)
              ][_0xee16f0(0x2d1)] = _0xee16f0(0x26f));
        } catch (_0x94287a) {
          _0x2893e6[_0xee16f0(0x232)](
            document['createTextNode'](_0xee16f0(0x1c4)),
          );
        }
      }
      var _0x3897eb = document[_0xee16f0(0x1d1)](_0xee16f0(0x32a));
      for (var _0x4a5917 = 0x0; _0x4a5917 < _0x3897eb['length']; _0x4a5917++) {
        _0x3897eb[_0x4a5917][_0xee16f0(0x2be)](
          _0xee16f0(0x2d1),
          _0xee16f0(0x2d9),
        ),
          _0x3897eb[_0x4a5917][_0xee16f0(0x2be)](
            _0xee16f0(0x311),
            _0x57ee1c + ';' + _0x4a5917,
          ),
          _0x3897eb[_0x4a5917][_0xee16f0(0x335)](
            evtclk,
            function () {
              var _0x1a7604 = _0xee16f0,
                _0x2109fd =
                  this[_0x1a7604(0x2c0)]('data-num')[_0x1a7604(0x199)](';'),
                _0x3237d9 = rst_latex[_0x1a7604(0x199)]('\x20');
              (_0x3237d9[parseInt(_0x2109fd[0x0])] =
                candidate[0x0][parseInt(_0x2109fd[0x0])][_0x2109fd[0x1]]),
                (rst_latex = _0x3237d9[_0x1a7604(0x2b1)]('\x20')),
                console[_0x1a7604(0x1cf)](rst_latex),
                eqn_render(_0x3237d9[_0x1a7604(0x2b1)]('\x20')),
                document[_0x1a7604(0x1e2)](_0x1a7604(0x28f))['classList'][
                  'remove'
                ](_0x1a7604(0x20d));
            },
            ![],
          );
      }
      var _0x2eb07b = document[_0xee16f0(0x1bc)](_0xee16f0(0x200));
      _0x2eb07b[_0xee16f0(0x20f)][_0xee16f0(0x2f8)](_0xee16f0(0x1d3));
      var _0x4d0bd5 = document[_0xee16f0(0x281)]('x²');
      _0x2eb07b[_0xee16f0(0x232)](_0x4d0bd5),
        _0x2893e6[_0xee16f0(0x232)](_0x2eb07b),
        _0x2eb07b['addEventListener'](
          evtclk,
          function () {
            var _0x887e52 = _0xee16f0,
              _0x1d71eb = rst_latex[_0x887e52(0x199)]('\x20');
            if (
              _0x1d71eb[parseInt(_0x57ee1c) - 0x2] &&
              _0x1d71eb[parseInt(_0x57ee1c) - 0x2] === '^'
            )
              return (
                document[_0x887e52(0x1e2)](_0x887e52(0x28f))[_0x887e52(0x20f)][
                  _0x887e52(0x1d5)
                ](_0x887e52(0x20d)),
                ![]
              );
            if (
              _0x1d71eb[parseInt(_0x57ee1c) - 0x2] &&
              _0x1d71eb[parseInt(_0x57ee1c) - 0x2] === '_'
            )
              return (
                (_0x1d71eb[parseInt(_0x57ee1c) - 0x2] = '^'),
                eqn_render(_0x1d71eb[_0x887e52(0x2b1)]('\x20')),
                document[_0x887e52(0x1e2)](_0x887e52(0x28f))[_0x887e52(0x20f)][
                  _0x887e52(0x1d5)
                ](_0x887e52(0x20d)),
                ![]
              );
            (_0x1d71eb[parseInt(_0x57ee1c)] =
              _0x887e52(0x1c7) + _0x1d71eb[parseInt(_0x57ee1c)] + '\x20}'),
              candidate[0x0][_0x887e52(0x255)](
                parseInt(_0x57ee1c),
                0x0,
                ['^'],
                ['{'],
              ),
              candidate[0x0][_0x887e52(0x255)](parseInt(_0x57ee1c) + 0x3, 0x0, [
                '}',
              ]),
              eqn_render(_0x1d71eb[_0x887e52(0x2b1)]('\x20')),
              document[_0x887e52(0x1e2)]('myPopup')['classList'][
                _0x887e52(0x1d5)
              ]('tipshow');
          },
          ![],
        );
      var _0x1e386d = document['createElement'](_0xee16f0(0x200));
      _0x1e386d['classList']['add'](_0xee16f0(0x26a));
      var _0xf88c9f = document[_0xee16f0(0x281)]('x₂');
      _0x1e386d[_0xee16f0(0x232)](_0xf88c9f),
        _0x2893e6['appendChild'](_0x1e386d),
        _0x1e386d[_0xee16f0(0x335)](
          evtclk,
          function () {
            var _0x3ca6a6 = _0xee16f0,
              _0x1e5a96 = rst_latex[_0x3ca6a6(0x199)]('\x20');
            if (
              _0x1e5a96[parseInt(_0x57ee1c) - 0x2] &&
              _0x1e5a96[parseInt(_0x57ee1c) - 0x2] === '_'
            )
              return (
                document[_0x3ca6a6(0x1e2)](_0x3ca6a6(0x28f))[_0x3ca6a6(0x20f)][
                  'remove'
                ]('tipshow'),
                ![]
              );
            if (
              _0x1e5a96[parseInt(_0x57ee1c) - 0x2] &&
              _0x1e5a96[parseInt(_0x57ee1c) - 0x2] === '^'
            )
              return (
                (_0x1e5a96[parseInt(_0x57ee1c) - 0x2] = '_'),
                eqn_render(_0x1e5a96[_0x3ca6a6(0x2b1)]('\x20')),
                document[_0x3ca6a6(0x1e2)](_0x3ca6a6(0x28f))['classList'][
                  _0x3ca6a6(0x1d5)
                ](_0x3ca6a6(0x20d)),
                ![]
              );
            (_0x1e5a96[parseInt(_0x57ee1c)] =
              _0x3ca6a6(0x2b0) + _0x1e5a96[parseInt(_0x57ee1c)] + '\x20}'),
              candidate[0x0][_0x3ca6a6(0x255)](
                parseInt(_0x57ee1c),
                0x0,
                ['_'],
                ['{'],
              ),
              candidate[0x0]['splice'](parseInt(_0x57ee1c) + 0x3, 0x0, ['}']),
              eqn_render(_0x1e5a96[_0x3ca6a6(0x2b1)]('\x20')),
              document[_0x3ca6a6(0x1e2)](_0x3ca6a6(0x28f))[_0x3ca6a6(0x20f)][
                'remove'
              ](_0x3ca6a6(0x20d));
          },
          ![],
        );
      var _0x1639e3 = document[_0xee16f0(0x1bc)](_0xee16f0(0x200));
      _0x1639e3['classList'][_0xee16f0(0x2f8)](_0xee16f0(0x31e));
      var _0x8d43 = document[_0xee16f0(0x281)]('x2');
      _0x1639e3['appendChild'](_0x8d43),
        _0x2893e6[_0xee16f0(0x232)](_0x1639e3),
        _0x1639e3['addEventListener'](
          evtclk,
          function () {
            var _0x41c736 = _0xee16f0,
              _0x423639 = rst_latex[_0x41c736(0x199)]('\x20');
            if (
              !_0x423639[parseInt(_0x57ee1c) - 0x2] ||
              (_0x423639[parseInt(_0x57ee1c) - 0x2] &&
                _0x423639[parseInt(_0x57ee1c) - 0x2] != '_' &&
                _0x423639[parseInt(_0x57ee1c) - 0x2] != '^')
            )
              return (
                document['getElementById'](_0x41c736(0x28f))[_0x41c736(0x20f)][
                  _0x41c736(0x1d5)
                ](_0x41c736(0x20d)),
                ![]
              );
            if (
              _0x423639[parseInt(_0x57ee1c) - 0x2] &&
              (_0x423639[parseInt(_0x57ee1c) - 0x2] === '^' ||
                _0x423639[parseInt(_0x57ee1c) - 0x2] === '_')
            )
              return (
                _0x423639[_0x41c736(0x255)](parseInt(_0x57ee1c) + 0x1, 0x1),
                _0x423639[_0x41c736(0x255)](parseInt(_0x57ee1c) - 0x2, 0x2),
                candidate[0x0][_0x41c736(0x255)](
                  parseInt(_0x57ee1c) + 0x1,
                  0x1,
                ),
                candidate[0x0][_0x41c736(0x255)](
                  parseInt(_0x57ee1c) - 0x2,
                  0x2,
                ),
                eqn_render(_0x423639[_0x41c736(0x2b1)]('\x20')),
                document[_0x41c736(0x1e2)](_0x41c736(0x28f))['classList'][
                  _0x41c736(0x1d5)
                ]('tipshow'),
                ![]
              );
            _0x423639[parseInt(_0x57ee1c)] =
              _0x41c736(0x22f) + _0x423639[parseInt(_0x57ee1c)];
            var _0x4e9584 = _0x423639[_0x41c736(0x2b1)]('\x20');
            (_0x4e9584 = _0x4e9584['replace'](
              /\^\s\{\snormal([^\s]+)\s\}/,
              '$1',
            )),
              (_0x4e9584 = _0x4e9584[_0x41c736(0x29f)](
                /_\s\{\snormal([^\s]+)\s\}/,
                '$1',
              )),
              (_0x4e9584 = _0x4e9584[_0x41c736(0x29f)](/normal/, '')),
              eqn_render(_0x4e9584),
              document[_0x41c736(0x1e2)](_0x41c736(0x28f))['classList'][
                _0x41c736(0x1d5)
              ](_0x41c736(0x20d));
          },
          ![],
        );
    }, 0x64);
}
function create_selbox(_0x2ae1a5) {
  var _0x57f7a2 = _0x47159c,
    _0x483c51 = _0x2ae1a5[_0x57f7a2(0x1da)](),
    _0x40d13a = document[_0x57f7a2(0x218)](_0x57f7a2(0x2fd), _0x57f7a2(0x227));
  return (
    _0x483c51[_0x57f7a2(0x2cf)] < 0x258
      ? (_0x40d13a['setAttribute'](
          'y',
          _0x483c51['y'] - (0x258 - _0x483c51[_0x57f7a2(0x2cf)]) / 0x2,
        ),
        _0x483c51['width'] < 0xc8
          ? (_0x40d13a['setAttribute'](
              'x',
              _0x483c51['x'] - (0xc8 - _0x483c51[_0x57f7a2(0x29d)]) / 0x2,
            ),
            _0x40d13a['setAttribute']('width', 0xc8))
          : (_0x40d13a[_0x57f7a2(0x2be)]('x', _0x483c51['x']),
            _0x40d13a[_0x57f7a2(0x2be)]('width', _0x483c51[_0x57f7a2(0x29d)])),
        _0x40d13a[_0x57f7a2(0x2be)](_0x57f7a2(0x2cf), 0x258),
        _0x40d13a['setAttribute'](_0x57f7a2(0x1b8), _0x57f7a2(0x256)))
      : (_0x40d13a['setAttribute']('y', _0x483c51['y']),
        _0x483c51[_0x57f7a2(0x29d)] < 0xc8
          ? (_0x40d13a[_0x57f7a2(0x2be)](
              'x',
              _0x483c51['x'] - (0xc8 - _0x483c51[_0x57f7a2(0x29d)]) / 0x2,
            ),
            _0x40d13a[_0x57f7a2(0x2be)]('width', 0xc8))
          : (_0x40d13a[_0x57f7a2(0x2be)]('x', _0x483c51['x']),
            _0x40d13a['setAttribute'](
              _0x57f7a2(0x29d),
              _0x483c51[_0x57f7a2(0x29d)],
            )),
        _0x40d13a[_0x57f7a2(0x2be)]('height', _0x483c51[_0x57f7a2(0x2cf)]),
        _0x40d13a[_0x57f7a2(0x2be)](_0x57f7a2(0x1b8), _0x57f7a2(0x256))),
    _0x40d13a[_0x57f7a2(0x20f)][_0x57f7a2(0x2f8)]('select_box'),
    _0x40d13a
  );
}
var mj2img = function (_0x580275, _0x1c52ee) {
  var _0x4d1254 = _0x47159c,
    _0x39d3db = { svg: '', img: '' },
    _0x380994 = _0x580275[_0x4d1254(0x334)](_0x4d1254(0x223)),
    _0x10e65a = _0x380994[_0x4d1254(0x1b8)][_0x4d1254(0x2f7)],
    _0x326075 = _0x380994['getAttributeNS']('', 'width')[_0x4d1254(0x29f)](
      'ex',
      '',
    ),
    _0x40a2e6 = _0x380994[_0x4d1254(0x27b)]('', _0x4d1254(0x2cf))[
      _0x4d1254(0x29f)
    ]('ex', '');
  _0x380994['setAttribute'](_0x4d1254(0x1f7), 'http://www.w3.org/2000/svg');
  var _0x93a67d = new XMLSerializer()[_0x4d1254(0x325)](_0x380994),
    _0x5c9040 = self[_0x4d1254(0x2d8)] || self[_0x4d1254(0x291)] || self,
    _0x520a2e = new Image(),
    _0x33a2ee = new Blob([_0x93a67d], { type: _0x4d1254(0x2fb) }),
    _0x121933 = _0x5c9040[_0x4d1254(0x1aa)](_0x33a2ee);
  (_0x520a2e[_0x4d1254(0x2c2)] = function () {
    _0x1c52ee(_0x520a2e, _0x10e65a, _0x326075, _0x40a2e6, _0x380994);
  }),
    (_0x520a2e['src'] = _0x121933);
};
function mathcale(_0x4c6bc3, _0x364627) {
  var _0x3dab70 = _0x47159c;
  (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\\left\s*\(/g, '(')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\\right\s*\)/g, ')')),
    (_0x364627 = _0x364627['replace'](
      /\\begin\{array\}\s*\{\s*.\s*\}\s*\{/g,
      '',
    )),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\}\s*\\end\{array\}/g, '')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\}\s*\\\\\s*\{/g, '')),
    (_0x364627 = latex_parse(_0x364627));
  var _0x8903ef = _0x364627['match'](
      /\\sum\s*_\s*\{.*?\}\s*\^\s*\{\s*\d+\s*\}\s*[\{|\(]/i,
    ),
    _0x5c52e4 = _0x364627['match'](
      /\\sum\s*_\s*\{.*?\}\s*\^\s*\{\s*\d+\s*\}\s*\\left/i,
    );
  !_0x8903ef &&
    !_0x5c52e4 &&
    (_0x364627 = _0x364627['replace'](
      /(\\sum\s*_\s*\{.*?\}\s*\^\s*\{\s*\d+\s*\})\s*([^\+\-]+)/gi,
      _0x3dab70(0x258),
    ));
  var _0x8903ef = _0x364627[_0x3dab70(0x312)](/\\lim\s*_\s*\{.*?\}\s*[\{|\(]/i),
    _0x5c52e4 = _0x364627[_0x3dab70(0x312)](/\\lim\s*_\s*\{.*?\}\s*\\left/i);
  !_0x8903ef &&
    !_0x5c52e4 &&
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /(\\lim\s*_\{.*?\})\s*([^\+\-]+)/gi,
      _0x3dab70(0x258),
    ));
  (_0x364627 = _0x364627[_0x3dab70(0x29f)](/d\s+([a-z])/g, _0x3dab70(0x2c4))),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /(\\int\s*_\s*\{.*?\}\s*\^\s*\{.*?\})\s*(.+?)(d[a-z])/gi,
      _0x3dab70(0x1e8),
    )),
    (_0x364627 = _0x364627['replace'](/(\\int)\s+_/g, _0x3dab70(0x1e7))),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /\\int(\s*[^_\s])/g,
      _0x3dab70(0x324),
    )),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /(igre)\s*(.+?)\s*(d[a-z])/gi,
      _0x3dab70(0x1e8),
    )),
    (_0x364627 = _0x364627['replace'](/(\d)\s([a-zA-Z])/gi, _0x3dab70(0x2f5))),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /(\d[a-zA-Z]+)\s([a-zA-Z]+)/gi,
      _0x3dab70(0x2f5),
    )),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /(\d[a-zA-Z]+)\s([a-zA-Z]+)/gi,
      _0x3dab70(0x2f5),
    )),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\s+_/g, '_')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\s+\^/g, '^')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\\times/g, '*')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\\div/g, '/')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /sqrt\s*(\d+)/g,
      _0x3dab70(0x1b7),
    )),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /sqrt\s*([a-zA-Z])/g,
      _0x3dab70(0x1b7),
    )),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\)\s*\(/g, _0x3dab70(0x21b))),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\\limits/g, '')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\s+/g, '\x20')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\s+\{/g, '{')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\}\s+/g, '}')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\\mathrm/g, '')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\\rm/g, '')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\\%/g, _0x3dab70(0x2de))),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/C\s*m/gi, 'cm')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/k\s*m/gi, 'km')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /\{\s*m\s*\}\s*\{\s*m\s*\}/g,
      _0x3dab70(0x1b2),
    )),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/(\d)m\s+l/g, _0x3dab70(0x1e5))),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /(\d)m\s*\/\s*5/g,
      _0x3dab70(0x317),
    )),
    (_0x364627 = _0x364627['replace'](/(\d)km\s*\/\s*n/g, '$1km/h')),
    (_0x364627 = _0x364627['replace'](/\s*\+\s*/g, _0x3dab70(0x21d))),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\s*\-\s*/g, _0x3dab70(0x1c2)));
  while (_0x364627[_0x3dab70(0x312)](/\d\s*x\s*\d/)) {
    _0x364627 = _0x364627[_0x3dab70(0x29f)](
      /(\d)\s*x\s*(\d)/g,
      _0x3dab70(0x20e),
    );
  }
  (_0x364627 = _0x364627[_0x3dab70(0x29f)](/^\s*y\s*\=/, '')),
    (_0x364627 = _0x364627['replace'](/^\s*f\s*\(\s*x\s*\)\s*\=/, '')),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /([^a-zA-Z][a-zA-Z])\s*\\/g,
      _0x3dab70(0x304),
    )),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](
      /(^[a-zA-Z])\s*\\/g,
      _0x3dab70(0x304),
    )),
    (_0x364627 = _0x364627[_0x3dab70(0x29f)](/\*\s*([\)\}])/g, '$1')),
    (_0x364627 = _0x364627['replace'](/([\(\{])\s*\*/g, '$1'));
  var _0x57927d = [_0x3dab70(0x24e)];
  for (
    var _0x471bdd = 0x0;
    _0x471bdd < _0x57927d[_0x3dab70(0x259)];
    _0x471bdd++
  ) {
    var _0x2db577 = new RegExp(_0x57927d[_0x471bdd]);
    if (_0x364627[_0x3dab70(0x312)](_0x2db577))
      return alert(_0x3dab70(0x310)), loader_hide(), ![];
  }
  try {
    var _0x24d06b = nerdamer[_0x3dab70(0x2ec)](_0x364627)['toString']();
  } catch (_0x2e1bd8) {
    return (
      console['log'](_0x2e1bd8), alert(_0x3dab70(0x310)), loader_hide(), ![]
    );
  }
  console[_0x3dab70(0x1cf)](_0x24d06b);
  var _0x32ce57;
  try {
    if (
      _0x24d06b[_0x3dab70(0x312)](/int/) ||
      _0x24d06b[_0x3dab70(0x312)](/igre/)
    ) {
      var _0x19f5ce = _0x24d06b[_0x3dab70(0x312)](
        /int\s*_\((.*?)\)\s*\^\((.*?)\)(.*?)d([a-z])/,
      );
      if (_0x19f5ce) {
        _0x24d06b = _0x24d06b['replace'](
          /int\s*_\(.*?\)\s*\^\(.*?\).*?d[a-z]/,
          _0x3dab70(0x2d4),
        );
        var _0x36322e = nerdamer(
          _0x3dab70(0x31f) +
            _0x19f5ce[0x3] +
            ',' +
            _0x19f5ce[0x1] +
            ',' +
            _0x19f5ce[0x2] +
            ',' +
            _0x19f5ce[0x4] +
            ')',
        )[_0x3dab70(0x2dd)]();
        (_0x24d06b = _0x24d06b[_0x3dab70(0x29f)](
          /intinsert/,
          '(' + _0x36322e + ')',
        )),
          (_0x24d06b = _0x24d06b[_0x3dab70(0x29f)](
            /\)\s*\(/g,
            _0x3dab70(0x21b),
          ));
      } else {
        var _0x19f5ce = _0x24d06b['match'](/igre\s*(.*?)d([a-z])/);
        _0x24d06b = _0x24d06b[_0x3dab70(0x29f)](
          /igre\s*.*?d[a-z]/,
          _0x3dab70(0x2d4),
        );
        var _0x36322e = nerdamer(
          'integrate(' + _0x19f5ce[0x1] + ',' + _0x19f5ce[0x2] + ')',
        )[_0x3dab70(0x2dd)]();
        (_0x24d06b = _0x24d06b[_0x3dab70(0x29f)](
          /intinsert/,
          '(' + _0x36322e + ')',
        )),
          (_0x24d06b = _0x24d06b[_0x3dab70(0x29f)](
            /\)\s*\(/g,
            _0x3dab70(0x21b),
          ));
      }
    }
    if (_0x32ce57 == _0x3dab70(0x26b)) {
      var _0x1e4d5f,
        _0x360206 = nerdamer(_0x24d06b)[_0x3dab70(0x2df)]();
      if (_0x360206[_0x3dab70(0x259)] > 0x1) {
        for (
          var _0x471bdd = 0x0;
          _0x471bdd < _0x360206[_0x3dab70(0x259)];
          _0x471bdd++
        ) {
          _0x360206[_0x471bdd][_0x3dab70(0x2dd)]() == 'x' && (_0x1e4d5f = 'x');
        }
        !_0x1e4d5f &&
          (_0x1e4d5f = nerdamer(_0x24d06b)
            [_0x3dab70(0x2df)]()[0x0]
            [_0x3dab70(0x2dd)]());
      } else
        _0x1e4d5f = nerdamer(_0x24d06b)
          [_0x3dab70(0x2df)]()[0x0]
          [_0x3dab70(0x2dd)]();
      console['log'](_0x3dab70(0x25e)),
        (_0x24d06b = nerdamer[_0x3dab70(0x26b)](_0x24d06b, _0x1e4d5f)[
          _0x3dab70(0x2dd)
        ]());
    }
    if (_0x32ce57 == _0x3dab70(0x27c)) {
      var _0x1e4d5f,
        _0x360206 = nerdamer(_0x24d06b)[_0x3dab70(0x2df)]();
      if (_0x360206[_0x3dab70(0x259)] > 0x1) {
        for (
          var _0x471bdd = 0x0;
          _0x471bdd < _0x360206[_0x3dab70(0x259)];
          _0x471bdd++
        ) {
          _0x360206[_0x471bdd]['toString']() == 'x' && (_0x1e4d5f = 'x');
        }
        !_0x1e4d5f &&
          (_0x1e4d5f = nerdamer(_0x24d06b)
            [_0x3dab70(0x2df)]()[0x0]
            [_0x3dab70(0x2dd)]());
      } else
        _0x1e4d5f = nerdamer(_0x24d06b)
          [_0x3dab70(0x2df)]()[0x0]
          [_0x3dab70(0x2dd)]();
      console[_0x3dab70(0x1cf)](_0x3dab70(0x25d)),
        (_0x24d06b = Algebrite['factor'](_0x24d06b, _0x1e4d5f)[
          _0x3dab70(0x2dd)
        ]());
    }
    _0x24d06b[_0x3dab70(0x312)](/^\(\d+\)$/) &&
      ((_0x24d06b = Algebrite[_0x3dab70(0x27c)](_0x24d06b)[_0x3dab70(0x2dd)]()),
      (_0x32ce57 = _0x3dab70(0x27c)));
  } catch (_0x1a61d9) {
    return (
      console[_0x3dab70(0x1cf)](_0x1a61d9),
      alert(_0x3dab70(0x20b)),
      loader_hide(),
      ![]
    );
  }
  (_0x24d06b = _0x24d06b[_0x3dab70(0x29f)](/\)([a-zA-Z])/g, _0x3dab70(0x1b4))),
    (_0x24d06b = _0x24d06b[_0x3dab70(0x29f)](
      /([a-zA-Z0-9])(\(log)/g,
      _0x3dab70(0x20e),
    )),
    (document[_0x3dab70(0x1e2)]('eq_box')[_0x3dab70(0x1dc)] = _0x24d06b),
    document[_0x3dab70(0x1e2)](_0x3dab70(0x27a))['setAttribute'](
      'data-state',
      'ready',
    ),
    console[_0x3dab70(0x1cf)](_0x24d06b);
  if (_0x24d06b[_0x3dab70(0x312)](/\=/) && btn_gp != !![]) {
    console['log'](_0x3dab70(0x1fb));
    var _0x1e4d5f = nerdamer(_0x24d06b)
      [_0x3dab70(0x2df)]()[0x0]
      [_0x3dab70(0x2dd)]();
    try {
      var _0x3a7e91 =
        Algebrite[_0x3dab70(0x252)](_0x24d06b)[_0x3dab70(0x2dd)]();
      if (_0x3a7e91[_0x3dab70(0x259)] > 0x64) {
        if (
          confirm(
            '해가\x20너무\x20지저분하군요.\x20그래프로\x20확인하는게\x20어떨까요?',
          ) == !![]
        ) {
          (btn_gp = !![]),
            (_0x24d06b = _0x24d06b[_0x3dab70(0x29f)](/\=\s*0/, ''));
          if (_0x24d06b[_0x3dab70(0x312)](/\=/)) {
            var _0x1f0169 = _0x24d06b[_0x3dab70(0x199)]('=');
            _0x24d06b = _0x1f0169[0x0] + '-' + _0x1f0169[0x1];
          }
          var _0x51f864 = expression_result(_0x24d06b, _0x32ce57);
        } else {
          _0x3a7e91 = _0x3a7e91['replace'](/\[|\]/g, '');
          var _0xef135e = _0x3a7e91[_0x3dab70(0x199)](','),
            _0x51f864 = '';
          for (
            var _0x471bdd = 0x0;
            _0x471bdd < _0xef135e[_0x3dab70(0x259)];
            _0x471bdd++
          ) {
            _0x51f864 +=
              expression_result(_0xef135e[_0x471bdd], _0x3dab70(0x260)) + ',~';
          }
          (_0x51f864 = _0x1e4d5f + '=' + _0x51f864['replace'](/,$/, '')),
            (_0x51f864 = _0x51f864[_0x3dab70(0x29f)](/,\~$/, ''));
        }
      } else {
        _0x3a7e91 = _0x3a7e91['replace'](/\[|\]/g, '');
        var _0xef135e = _0x3a7e91[_0x3dab70(0x199)](','),
          _0x51f864 = '';
        for (
          var _0x471bdd = 0x0;
          _0x471bdd < _0xef135e[_0x3dab70(0x259)];
          _0x471bdd++
        ) {
          _0x51f864 += expression_result(_0xef135e[_0x471bdd], 'sol_eq') + ',~';
        }
        (_0x51f864 = _0x1e4d5f + '=' + _0x51f864[_0x3dab70(0x29f)](/,$/, '')),
          (_0x51f864 = _0x51f864[_0x3dab70(0x29f)](/,\~$/, ''));
      }
    } catch (_0x3d665f) {
      alert(_0x3dab70(0x305)),
        (btn_gp = !![]),
        (_0x24d06b = _0x24d06b[_0x3dab70(0x29f)](/\=\s*0/, ''));
      if (_0x24d06b['match'](/\=/)) {
        var _0x1f0169 = _0x24d06b[_0x3dab70(0x199)]('=');
        _0x24d06b = _0x1f0169[0x0] + '-' + _0x1f0169[0x1];
      }
      var _0x51f864 = expression_result(_0x24d06b, _0x32ce57);
    }
  } else {
    _0x24d06b = _0x24d06b[_0x3dab70(0x29f)](/\=\s*0/, '');
    if (_0x24d06b[_0x3dab70(0x312)](/\=/)) {
      var _0x1f0169 = _0x24d06b['split']('=');
      _0x24d06b = _0x1f0169[0x0] + '-' + _0x1f0169[0x1];
    }
    var _0x51f864 = expression_result(_0x24d06b, _0x32ce57);
  }
  console[_0x3dab70(0x1cf)](_0x51f864);
  if (!_0x51f864)
    return (
      alert(
        '적절한\x20답을\x20찾지\x20못했습니다.\x20웹\x20검색을\x20해보세요.',
      ),
      document[_0x3dab70(0x1e2)](_0x3dab70(0x27a))[_0x3dab70(0x2be)](
        _0x3dab70(0x29e),
        _0x3dab70(0x2b8),
      ),
      (btn_gp = ![]),
      loader_hide(),
      ![]
    );
  if (
    document[_0x3dab70(0x1e2)](_0x3dab70(0x1ca))[_0x3dab70(0x1b8)][
      _0x3dab70(0x2d1)
    ] == _0x3dab70(0x2f2) &&
    _0x51f864[_0x3dab70(0x312)](/^x\=[\d\.\-\+]+$/)
  ) {
    (wolfram_rst = ''), (mathpapa_rst = '');
    var _0x21d320 = _0x51f864[_0x3dab70(0x312)](/x\=([\d\.\-\+]+)/);
    document[_0x3dab70(0x1e2)]('eq_box')['setAttribute'](
      _0x3dab70(0x29e),
      _0x3dab70(0x2b8),
    );
    if (eq_arr[_0x3dab70(0x259)] == 0x1) {
      eq_arr[0x0] = eq_arr[0x0]['replace'](/\=\s*0/, '');
      if (eq_arr[0x0][_0x3dab70(0x312)](/\=/)) {
        var _0x1f0169 = eq_arr[0x0]['split']('=');
        eq_arr[0x0] = _0x1f0169[0x0] + '-' + _0x1f0169[0x1];
      }
      var _0x9c6e2f = math[_0x3dab70(0x1ad)](eq_arr[0x0]),
        _0x472d37 = [],
        _0x301635 = [];
      console[_0x3dab70(0x1cf)](math[_0x3dab70(0x1ae)](_0x21d320[0x1])),
        eq_arr[_0x3dab70(0x1c9)](
          _0x3dab70(0x2cd) +
            math[_0x3dab70(0x1ae)](_0x21d320[0x1]) +
            ';' +
            _0x9c6e2f['evaluate']({ x: _0x21d320[0x1] }),
        );
    } else {
      var _0x4fa4ce = _0x3dab70(0x2cd) + math[_0x3dab70(0x1ae)](_0x21d320[0x1]);
      for (
        var _0x471bdd = 0x0;
        _0x471bdd < eq_arr[_0x3dab70(0x259)];
        _0x471bdd++
      ) {
        var _0x9c6e2f = math[_0x3dab70(0x1ad)](eq_arr[_0x471bdd]);
        _0x4fa4ce += ';' + _0x9c6e2f[_0x3dab70(0x1ae)]({ x: _0x21d320[0x1] });
      }
      eq_arr[_0x3dab70(0x1c9)](_0x4fa4ce);
    }
    return draw(), loader_hide(), (btn_gp = ![]), !![];
  }
  (_0x51f864 = _0x51f864[_0x3dab70(0x29f)](
    /\\log\s*_\s*\{\s*e\s*\}/g,
    _0x3dab70(0x30d),
  )),
    (_0x51f864 = _0x51f864['replace'](/\\lim/g, _0x3dab70(0x2e3))),
    (_0x51f864 = _0x51f864[_0x3dab70(0x29f)](/\\sum/g, _0x3dab70(0x238))),
    (_0x51f864 = _0x51f864[_0x3dab70(0x29f)](/^/, _0x3dab70(0x31d))),
    (document['querySelector']('.answerbox')[_0x3dab70(0x2ca)] =
      _0x3dab70(0x1bd));
  var _0x30dd03 = MathJax[_0x3dab70(0x2c8)](
    document[_0x3dab70(0x334)](_0x3dab70(0x1a6)),
  );
  (_0x30dd03['display'] = ![]),
    document[_0x3dab70(0x334)]('.answerbox')['appendChild'](
      MathJax['tex2svg'](_0x51f864, _0x30dd03),
    ),
    btn_gp == !![] &&
      (document[_0x3dab70(0x1e2)]('plot')['style'][_0x3dab70(0x2d1)] ==
        'none' &&
        (document['getElementById']('plot')[_0x3dab70(0x1b8)][
          _0x3dab70(0x2d1)
        ] = 'block'),
      eq_arr[_0x3dab70(0x1c9)](_0x24d06b),
      draw()),
    loader_hide(),
    (btn_gp = ![]);
}
function expression_result(_0x111ce6, _0x4b5baa) {
  var _0x497f10 = _0x47159c;
  try {
    if (math[_0x497f10(0x1ae)](_0x111ce6)[_0x497f10(0x203)]) {
      console[_0x497f10(0x1cf)](_0x497f10(0x1c1)),
        (_0x111ce6 = math['evaluate'](_0x111ce6)[_0x497f10(0x2dd)]()),
        (_0x111ce6 = _0x111ce6[_0x497f10(0x312)](/(^[\d|\.]+)\s*(.*$)/));
      var _0x3f70fb = _0x111ce6[0x2];
      _0x111ce6 = _0x111ce6[0x1];
    }
  } catch (_0x1c8910) {
    console[_0x497f10(0x1cf)](_0x1c8910),
      console[_0x497f10(0x1cf)](_0x497f10(0x26d));
  }
  var _0x15e207 = ![];
  try {
    var _0x492692 = math[_0x497f10(0x1de)](_0x111ce6);
    (_0x492692 = _0x492692[_0x497f10(0x31c)](
      function (_0x29293b, _0x46cf0b, _0x4a9a4a) {
        var _0x497758 = _0x497f10;
        if (
          _0x29293b['fn'] &&
          _0x29293b['fn'][_0x497758(0x205)] == _0x497758(0x1cf)
        )
          return (
            !math[_0x497758(0x30e)](_0x29293b)['value'] &&
              (_0x29293b['fn'][_0x497758(0x205)] = _0x497758(0x314)),
            math[_0x497758(0x30e)](_0x29293b)
          );
        return _0x29293b;
      },
    )),
      (_0x111ce6 = _0x492692[_0x497f10(0x2dd)]());
    if (_0x4b5baa == _0x497f10(0x27c)) var _0x5b0835 = _0x111ce6;
    else {
      obj_data = Algebrite['simplify'](_0x111ce6);
      var _0x5b0835 = obj_data[_0x497f10(0x2dd)]();
    }
    _0x5b0835['match'](/\.\.\./) &&
      ((_0x5b0835 = _0x5b0835[_0x497f10(0x29f)](/\.\.\./g, '')),
      !_0x5b0835['match'](/a-zA-Z/) && (_0x15e207 = !![]));
    _0x5b0835 = _0x5b0835['replace'](/leg/g, 'log');
    var _0x127e9e = math[_0x497f10(0x1de)](_0x5b0835);
    return (
      (_0x127e9e = _0x127e9e[_0x497f10(0x31c)](
        function (_0x18746e, _0xb684ce, _0x4281d0) {
          var _0x726718 = _0x497f10;
          return (
            _0x18746e['fn'] == _0x726718(0x331) &&
              _0x18746e['args'][0x1]
                [_0x726718(0x2dd)]()
                ['match'](/\(1\s*\/\s*2\)/) &&
              (_0x18746e = new math['parse'](
                _0x726718(0x2cc) +
                  _0x18746e[_0x726718(0x263)][0x0]['toString']() +
                  ')',
              )),
            _0x18746e
          );
        },
      )),
      _0x4b5baa != _0x497f10(0x260) &&
        (document[_0x497f10(0x1e2)](_0x497f10(0x27a))[_0x497f10(0x1dc)] =
          _0x127e9e[_0x497f10(0x2dd)]()),
      (latex = _0x127e9e[_0x497f10(0x1b6)]({
        parenthesis: _0x497f10(0x1ed),
        implicit: _0x497f10(0x195),
      })),
      (latex = latex[_0x497f10(0x29f)](/\\cdot(10\^)/, _0x497f10(0x230))),
      _0x15e207 == !![] && (latex = _0x497f10(0x2ed) + latex),
      _0x3f70fb &&
        (_0x3f70fb == 'l'
          ? (latex += _0x3f70fb)
          : (latex += _0x497f10(0x257) + _0x3f70fb + '}')),
      latex
    );
  } catch (_0x5d8183) {
    return console['log'](_0x5d8183), ![];
  }
}
var plotdata,
  plotlayout,
  eq_arr = [];
function draw() {
  var _0x3e2e4e = _0x47159c;
  try {
    var _0x406f46 = math_compile(),
      _0x19f834 =
        document['getElementById'](_0x3e2e4e(0x338))['getBoundingClientRect']()[
          _0x3e2e4e(0x2cf)
        ] -
        window[_0x3e2e4e(0x209)] * 0.05;
    const _0x3fb2e4 = {
      x: _0x406f46[0x0],
      y: _0x406f46[0x1],
      type: _0x3e2e4e(0x194),
    };
    (plotlayout = {
      margin: { l: 0x14, r: 0x14, t: 0x14, b: 0x32 },
      height: _0x19f834,
      xaxis: { autotick: !![], scaleanchor: 'y' },
      yaxis: { autotick: !![] },
      dragmode: _0x3e2e4e(0x322),
      hovermode: _0x3e2e4e(0x28c),
    }),
      (plotdata = [_0x3fb2e4]),
      Plotly[_0x3e2e4e(0x337)](_0x3e2e4e(0x1ca), plotdata, plotlayout, {
        scrollZoom: !![],
      }),
      document['getElementById']('plot')['on'](
        _0x3e2e4e(0x1dd),
        math_relayout,
        ![],
      ),
      document[_0x3e2e4e(0x1e2)](_0x3e2e4e(0x2ea))['classList'][
        _0x3e2e4e(0x1d5)
      ](_0x3e2e4e(0x216)),
      document[_0x3e2e4e(0x1e2)](_0x3e2e4e(0x295))['classList']['remove'](
        'sel_tool',
      ),
      (document[_0x3e2e4e(0x334)](_0x3e2e4e(0x224))[_0x3e2e4e(0x1b8)][
        _0x3e2e4e(0x30f)
      ] = 0x2),
      math_relayout();
  } catch (_0x162688) {
    return (
      eq_arr['pop'](),
      console[_0x3e2e4e(0x1c4)](_0x162688),
      alert(_0x3e2e4e(0x1e4)),
      loader_hide(),
      ![]
    );
  }
}
function math_relayout() {
  var _0x4590ed = _0x47159c,
    _0x57b2ba = document[_0x4590ed(0x19d)](_0x4590ed(0x296))[0x0][
      _0x4590ed(0x273)
    ]()[_0x4590ed(0x29d)];
  plotlayout[_0x4590ed(0x29d)] = _0x57b2ba;
  var _0x5ade40, _0x4e4c20, _0x45dbd4, _0x19659a;
  Math['ceil'](Math['abs'](plotlayout[_0x4590ed(0x2eb)]['range'][0x0])) >
  Math[_0x4590ed(0x213)](
    Math[_0x4590ed(0x2e7)](plotlayout['yaxis'][_0x4590ed(0x235)][0x1]),
  )
    ? ((_0x45dbd4 = -Math[_0x4590ed(0x213)](
        Math[_0x4590ed(0x2e7)](
          plotlayout[_0x4590ed(0x2eb)][_0x4590ed(0x235)][0x0],
        ),
      )),
      (_0x19659a = Math[_0x4590ed(0x213)](
        Math[_0x4590ed(0x2e7)](plotlayout['yaxis'][_0x4590ed(0x235)][0x0]),
      )))
    : ((_0x45dbd4 = -Math[_0x4590ed(0x213)](
        Math[_0x4590ed(0x2e7)](plotlayout[_0x4590ed(0x2eb)]['range'][0x1]),
      )),
      (_0x19659a = Math[_0x4590ed(0x213)](
        Math[_0x4590ed(0x2e7)](
          plotlayout[_0x4590ed(0x2eb)][_0x4590ed(0x235)][0x1],
        ),
      )));
  (_0x5ade40 = Math[_0x4590ed(0x328)](
    plotlayout[_0x4590ed(0x292)]['range'][0x0],
  )),
    (_0x4e4c20 = Math[_0x4590ed(0x213)](
      plotlayout[_0x4590ed(0x292)][_0x4590ed(0x235)][0x1],
    ));
  var _0x986222 = math_compile(_0x5ade40, _0x4e4c20, _0x45dbd4, _0x19659a);
  for (
    var _0x72af5d = 0x1;
    _0x72af5d < _0x986222[_0x4590ed(0x259)];
    _0x72af5d++
  ) {
    if (
      Array['isArray'](_0x986222[_0x72af5d]) == ![] &&
      _0x986222[_0x72af5d][_0x4590ed(0x312)](/point/)
    ) {
      var _0x394704 =
          eq_arr[eq_arr[_0x4590ed(0x259)] - 0x1][_0x4590ed(0x199)](/;/),
        _0x1858f0 = [],
        _0x23ef55 = [];
      for (
        var _0x2d426a = 0x2;
        _0x2d426a < _0x394704[_0x4590ed(0x259)];
        _0x2d426a++
      ) {
        _0x1858f0[_0x4590ed(0x1c9)](_0x394704[0x1]),
          _0x23ef55['push'](_0x394704[_0x2d426a]);
      }
      var _0x2037a4;
      if (_0x23ef55[_0x4590ed(0x259)] > 0x1) _0x2037a4 = _0x4590ed(0x274);
      else {
        if (_0x394704[0x2][_0x4590ed(0x312)](/i/)) _0x2037a4 = _0x4590ed(0x2bd);
        else {
          var _0x4bb338 = _0x394704[0x2];
          _0x2037a4 = Math[_0x4590ed(0x307)](_0x4bb338 * 0x186a0) / 0x186a0;
        }
      }
      var _0x4e8b0b = {
        x: _0x1858f0,
        y: _0x23ef55,
        name: '(' + _0x394704[0x1] + ',' + _0x2037a4 + ')',
        type: _0x4590ed(0x194),
        mode: 'markers',
        marker: { size: 0x10, color: _0x4590ed(0x215) },
      };
      (plotdata[_0x72af5d - 0x1] = _0x4e8b0b), eq_arr[_0x4590ed(0x2a2)]();
    } else {
      var _0x4e8b0b = {
        x: _0x986222[0x0],
        y: _0x986222[_0x72af5d],
        name: eq_arr[_0x72af5d - 0x1],
        type: _0x4590ed(0x194),
      };
      plotdata[_0x72af5d - 0x1] = _0x4e8b0b;
    }
  }
  Plotly['redraw'](_0x4590ed(0x1ca)),
    document[_0x4590ed(0x1e2)](_0x4590ed(0x27a))[_0x4590ed(0x2be)](
      _0x4590ed(0x29e),
      'start',
    );
}
function math_compile(_0x243519, _0x3900c0, _0x1fa5a2, _0x17d516) {
  var _0x356c0f = _0x47159c;
  !_0x243519 &&
    ((_0x243519 = -0xa),
    (_0x3900c0 = 0xa),
    (_0x1fa5a2 = -0xa),
    (_0x17d516 = 0xa));
  var _0x5755f3 = Math[_0x356c0f(0x2e7)](_0x3900c0 - _0x243519) / 0x1388;
  console[_0x356c0f(0x1cf)](_0x5755f3);
  var _0x36b493 = math[_0x356c0f(0x235)](_0x243519, _0x3900c0, _0x5755f3)[
      _0x356c0f(0x1db)
    ](),
    _0x1e0c06 = [_0x36b493];
  for (var _0x185100 = 0x0; _0x185100 < eq_arr[_0x356c0f(0x259)]; _0x185100++) {
    if (eq_arr[_0x185100][_0x356c0f(0x312)](/point/))
      _0x1e0c06[_0x356c0f(0x1c9)](_0x356c0f(0x22b));
    else {
      var _0x398a49 = eq_arr[_0x185100];
      _0x398a49 = _0x398a49[_0x356c0f(0x29f)](/\=\s*0/, '');
      if (_0x398a49['match'](/\=/)) {
        var _0x2f16e1 = _0x398a49[_0x356c0f(0x199)]('=');
        _0x398a49 = _0x2f16e1[0x0] + '-' + _0x2f16e1[0x1];
      }
      var _0x4ca2ae = math[_0x356c0f(0x1ad)](_0x398a49),
        _0x281935 = _0x36b493[_0x356c0f(0x201)](function (_0x3f4cc2) {
          var _0x22f3fb = _0x356c0f,
            _0x34c102 = _0x4ca2ae[_0x22f3fb(0x1ae)]({ x: _0x3f4cc2 });
          if (_0x34c102 > _0x1fa5a2 && _0x34c102 < _0x17d516) return _0x34c102;
        });
      _0x1e0c06[_0x356c0f(0x1c9)](_0x281935);
    }
  }
  return _0x1e0c06;
}
function clear() {
  var _0x13b3c6 = _0x47159c;
  sketch_pad[_0x13b3c6(0x2d7)]();
}
function eqn_edit() {
  var _0x53b33c = _0x47159c;
  (document[_0x53b33c(0x1e2)](_0x53b33c(0x1d9))['style'][_0x53b33c(0x30f)] =
    0x1),
    (document[_0x53b33c(0x1e2)]('eqn_wrap')['style'][_0x53b33c(0x30f)] = 0x2);
}
function __handwriting_pen() {
  var _0x147ca4 = _0x47159c;
  cropper && cropper[_0x147ca4(0x1a4)](),
    document['getElementById'](_0x147ca4(0x1ca))[_0x147ca4(0x1b8)]['display'] ==
    'block'
      ? document[_0x147ca4(0x1e2)](_0x147ca4(0x2ea))[_0x147ca4(0x20f)][
          _0x147ca4(0x270)
        ]('sel_tool')
        ? ((document[_0x147ca4(0x334)]('.screen_block')[_0x147ca4(0x1b8)][
            'zIndex'
          ] = 0x2),
          document[_0x147ca4(0x1e2)](_0x147ca4(0x2ea))[_0x147ca4(0x20f)][
            'remove'
          ](_0x147ca4(0x216)),
          document[_0x147ca4(0x1e2)]('eqn_edit')[_0x147ca4(0x20f)][
            _0x147ca4(0x1d5)
          ]('sel_tool'),
          sketch_pad[_0x147ca4(0x2d7)]())
        : ((document[_0x147ca4(0x334)](_0x147ca4(0x224))[_0x147ca4(0x1b8)][
            _0x147ca4(0x30f)
          ] = 0x4),
          document['getElementById']('eraser')[_0x147ca4(0x20f)]['remove'](
            'sel_tool',
          ),
          document[_0x147ca4(0x1e2)](_0x147ca4(0x1b0))['classList'][
            _0x147ca4(0x1d5)
          ](_0x147ca4(0x216)),
          document[_0x147ca4(0x1e2)](_0x147ca4(0x2ea))[_0x147ca4(0x20f)][
            _0x147ca4(0x2f8)
          ]('sel_tool'),
          (sketch_pad['weight'] = 0x2),
          (sketch_pad[_0x147ca4(0x25b)] = _0x147ca4(0x30c)),
          (sketch_pad[_0x147ca4(0x2e6)] = _0x147ca4(0x2d3)))
      : (document[_0x147ca4(0x1e2)]('eraser')['classList'][_0x147ca4(0x1d5)](
          _0x147ca4(0x216),
        ),
        document[_0x147ca4(0x1e2)](_0x147ca4(0x1b0))['classList'][
          _0x147ca4(0x1d5)
        ](_0x147ca4(0x216)),
        document[_0x147ca4(0x1e2)](_0x147ca4(0x2ea))[_0x147ca4(0x20f)][
          _0x147ca4(0x2f8)
        ](_0x147ca4(0x216)),
        (sketch_pad[_0x147ca4(0x26c)] = 0x2),
        (sketch_pad[_0x147ca4(0x25b)] = '#000000'),
        (sketch_pad[_0x147ca4(0x2e6)] = _0x147ca4(0x2d3))),
    (document[_0x147ca4(0x1e2)](_0x147ca4(0x1d9))[_0x147ca4(0x1b8)]['zIndex'] =
      0x2),
    (document['getElementById'](_0x147ca4(0x197))[_0x147ca4(0x1b8)][
      _0x147ca4(0x30f)
    ] = 0x1),
    document['getElementById']('myPopup')[_0x147ca4(0x20f)][_0x147ca4(0x1d5)](
      _0x147ca4(0x20d),
    ),
    document[_0x147ca4(0x334)]('#mjx-editing-area\x20.sel_elem') &&
      document['querySelector'](_0x147ca4(0x2a7))['classList']['remove'](
        _0x147ca4(0x2f0),
      );
}
function handwriting_pen() {
  var _0x1f04c4 = _0x47159c;
  cropper && cropper[_0x1f04c4(0x1a4)](),
    (sketch_pad['weight'] = 0x2),
    (sketch_pad[_0x1f04c4(0x25b)] = _0x1f04c4(0x30c)),
    (sketch_pad['mode'] = _0x1f04c4(0x2d3)),
    (document[_0x1f04c4(0x1e2)](_0x1f04c4(0x1d9))[_0x1f04c4(0x1b8)][
      _0x1f04c4(0x30f)
    ] = 0x2),
    (document['getElementById'](_0x1f04c4(0x197))['style'][_0x1f04c4(0x30f)] =
      0x1),
    document['getElementById']('myPopup')['classList'][_0x1f04c4(0x1d5)](
      'tipshow',
    ),
    document[_0x1f04c4(0x334)](_0x1f04c4(0x2a7)) &&
      document[_0x1f04c4(0x334)](_0x1f04c4(0x2a7))[_0x1f04c4(0x20f)][
        _0x1f04c4(0x1d5)
      ](_0x1f04c4(0x2f0));
}
function eraser_evt() {
  var _0x2fab1f = _0x47159c;
  cropper && cropper[_0x2fab1f(0x1a4)](),
    (sketch_pad[_0x2fab1f(0x26c)] = 0xa),
    document[_0x2fab1f(0x1e2)](_0x2fab1f(0x1ca))[_0x2fab1f(0x1b8)][
      _0x2fab1f(0x2d1)
    ] == _0x2fab1f(0x2f2)
      ? (sketch_pad[_0x2fab1f(0x2e6)] = _0x2fab1f(0x22c))
      : ((sketch_pad[_0x2fab1f(0x25b)] = _0x2fab1f(0x249)),
        (sketch_pad[_0x2fab1f(0x2e6)] = _0x2fab1f(0x2d3))),
    (document[_0x2fab1f(0x1e2)]('tab_hand_block')[_0x2fab1f(0x1b8)][
      _0x2fab1f(0x30f)
    ] = 0x2),
    (document[_0x2fab1f(0x1e2)](_0x2fab1f(0x197))[_0x2fab1f(0x1b8)][
      _0x2fab1f(0x30f)
    ] = 0x1),
    document[_0x2fab1f(0x1e2)]('myPopup')[_0x2fab1f(0x20f)][_0x2fab1f(0x1d5)](
      _0x2fab1f(0x20d),
    ),
    document[_0x2fab1f(0x334)](_0x2fab1f(0x2a7)) &&
      document[_0x2fab1f(0x334)](_0x2fab1f(0x2a7))['classList']['remove'](
        _0x2fab1f(0x2f0),
      );
}
var lastTouchEnd = 0x0,
  all_btn = document[_0x47159c(0x1d1)](_0x47159c(0x246));
for (var i = 0x0; i < all_btn[_0x47159c(0x259)]; i++) {
  all_btn[i][_0x47159c(0x335)](
    _0x47159c(0x286),
    function (_0x2f8395) {
      var _0x109d9e = _0x47159c,
        _0x533e9b = new Date()[_0x109d9e(0x24f)]();
      _0x533e9b - lastTouchEnd <= 0x12c && _0x2f8395[_0x109d9e(0x2a0)](),
        (lastTouchEnd = _0x533e9b);
    },
    ![],
  );
}
function latex_parse(_0x61857e) {
  var _0x61857e = latex_parse_upper(_0x61857e),
    _0x61857e = latex_parse_frac(_0x61857e),
    _0x61857e = latex_parse_log_under(_0x61857e),
    _0x61857e = latex_parse_root(_0x61857e);
  return _0x61857e;
}
function latex_parse_upper(_0x1db2fb) {
  var _0x314c0c = _0x47159c;
  (_0x1db2fb = _0x1db2fb[_0x314c0c(0x29f)](
    /(\\int\s*_.*?)\^/g,
    _0x314c0c(0x1ea),
  )),
    (_0x1db2fb = _0x1db2fb['replace'](/(\\sum\s*_.*?)\^/g, '$1itexuper')),
    (_0x1db2fb = _0x1db2fb[_0x314c0c(0x29f)](
      /([a-zA-Z0-9\.]+)\s*\^/g,
      _0x314c0c(0x1ba),
    )),
    (_0x1db2fb = _0x1db2fb[_0x314c0c(0x29f)](/\\left\s*\\\{/g, 'ltemp')),
    (_0x1db2fb = _0x1db2fb[_0x314c0c(0x29f)](/\\right\s*\\\}/g, 'rtemp'));
  var _0x2a10cc = 0x0;
  while (_0x1db2fb[_0x314c0c(0x312)](/\{[^\{\}]*?\}/)) {
    (_0x1db2fb = _0x1db2fb[_0x314c0c(0x29f)](
      /\{([^\{\}]*?)\}/,
      _0x314c0c(0x2ba) +
        _0x2a10cc +
        '\x20$1\x20' +
        _0x314c0c(0x2c1) +
        _0x2a10cc,
    )),
      _0x2a10cc++;
  }
  while (_0x1db2fb[_0x314c0c(0x312)](/rbs\d+\s*\^\s*lbs\d+/)) {
    var _0x53656d = _0x1db2fb[_0x314c0c(0x312)](/rbs(\d+)\s*\^\s*lbs(\d+)/),
      _0x5a8042 = new RegExp(
        _0x314c0c(0x31a) +
          _0x53656d[0x1] +
          '.*?rbs' +
          _0x53656d[0x1] +
          '\x5cs*)\x5c^(\x5cs*' +
          'lbs' +
          _0x53656d[0x2] +
          '.*?rbs' +
          _0x53656d[0x2] +
          ')',
      );
    _0x1db2fb = _0x1db2fb['replace'](_0x5a8042, '{$1tempup$2}');
  }
  return (
    (_0x1db2fb = _0x1db2fb[_0x314c0c(0x29f)](/ltemp/g, _0x314c0c(0x222))),
    (_0x1db2fb = _0x1db2fb['replace'](/rtemp/g, '\x5cright\x5c}')),
    (_0x1db2fb = _0x1db2fb[_0x314c0c(0x29f)](/rbs\d+/g, '}')),
    (_0x1db2fb = _0x1db2fb['replace'](/lbs\d+/g, '{')),
    (_0x1db2fb = _0x1db2fb[_0x314c0c(0x29f)](/tempup/g, '^')),
    (_0x1db2fb = _0x1db2fb['replace'](/itexuper/g, '^')),
    _0x1db2fb
  );
}
function _0x682e() {
  var _0x19b67f = [
    'none',
    'contains',
    'orientationchange',
    '#fff',
    'getBoundingClientRect',
    'multiple',
    '^○$',
    'document',
    'bottom',
    '{\x20\x5clog\x20{\x20$1,\x20{\x20e\x20}\x20}\x20}',
    '730098CYZwWB',
    'eq_box',
    'getAttributeNS',
    'factor',
    '^\x5c\x5ctheta$',
    '^\x5c\x5cni$',
    '^\x5c\x5c{$',
    'img_box',
    'createTextNode',
    '^\x5c\x5cprod$',
    'upload',
    '104YBROHL',
    'textContent',
    'touchend',
    '^\x5c\x5ccdots$',
    'toggle',
    'responseText',
    'latexs',
    '.cropper-container',
    'closest',
    'data:image/jpeg;base64,',
    '^\x5c\x5coplus$',
    'myPopup',
    'protocol',
    'webkitURL',
    'xaxis',
    '\x5c\x5cfrac(\x5cs*lbs',
    '.ko_input_mode',
    'eraser',
    'body',
    '\x5cright\x5c}',
    '.wsite',
    'touchstart',
    '^\x5c\x5csubset$',
    'userAgent',
    '^\x5c\x5cmu$',
    'width',
    'data-state',
    'replace',
    'preventDefault',
    'onreadystatechange',
    'pop',
    'candidates',
    '^\x5c\x5ccot$',
    '^\x5c\x5ctriangle$',
    '^\x5c\x5ctimes$',
    '#mjx-editing-area\x20.sel_elem',
    'mpx_res\x20error:\x20',
    'mathpapa',
    'layerY',
    'txtelem',
    '^\x5c\x5cprime$',
    '$1\x20{\x20$2\x20}',
    '^\x5c\x5ccos$',
    '^\x5c\x5cgamma$',
    '_\x20{\x20',
    'join',
    'drawingcheck',
    '\x5c\x5cleg(.*?)\x5c\x5clcg\x5cs*',
    '^\x5c\x5csin$',
    'futurenurikice20211212',
    '^\x5c[$',
    'min',
    'start',
    '.*?',
    'lbs',
    '\x5cfrac',
    'putImageData',
    'undefined',
    'setAttribute',
    '^\x5c\x5cnotin$',
    'getAttribute',
    'rbs',
    'onload',
    'itex_classchange2',
    'd$1',
    'open',
    'iframe',
    'target',
    'getMetricsFor',
    'base64',
    'innerHTML',
    'screen_block',
    'sqrt(',
    'point;',
    '399100IKuGst',
    'height',
    'mathSize',
    'display',
    'insertEqn',
    'draw',
    'intinsert',
    '^\x5c\x5codot$',
    '\x5c\x5cln\x5cs*',
    'clear',
    'URL',
    'false',
    '\x5cs*lbs(\x5cd+)',
    '^\x5c\x5cbeta$',
    'mjx-assistive-mml\x20merror',
    'toString',
    '/100',
    'variables',
    'ko_input_mode',
    'toDataURL',
    'wf_hidden',
    '\x5clim\x5climits\x20',
    '/qnapi_dream/fulltext_draw',
    'data',
    'mode',
    'abs',
    'touches',
    'slice',
    'wpen',
    'yaxis',
    'convertFromLaTeX',
    '\x5csimeq',
    '#myPopup',
    'canvas',
    'sel_elem',
    '^\x5c\x5cinfty$',
    'block',
    '{\x5cclass{texevt\x20tex_',
    '320089MpQTzb',
    '$1$2',
    '862760gvkNiJ',
    'verticalAlign',
    'add',
    'parent',
    'https://www.google.com/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8',
    'image/svg+xml',
    'touchmove',
    'http://www.w3.org/2000/svg',
    'offsetY',
    '4970172vdERhn',
    'loader_show',
    '^\x5c\x5cint$',
    'href',
    '변환할\x20수식이\x20없습니다.\x0a크롭\x20메뉴을\x20이용하여\x20선택해\x20주십시오.',
    '$1*\x5c',
    '계산이\x20쉽지\x20않군요.\x20그래프로\x20확인해\x20볼게요.',
    '^\x5c\x5cln$',
    'round',
    'click',
    'mjx-editing-area',
    'mouseup',
    'https://www.mathpapa.com/algebra-calculator.html?q=',
    '#000000',
    '\x5cln\x20',
    'simplify',
    'zIndex',
    '수식을\x20인식했습니다만\x20연산\x20처리에\x20문제가\x20있네요.\x20웹\x20검색을\x20해보시겠어요?',
    'data-num',
    'match',
    'touch',
    'leg',
    '{\x20\x5clog\x20{\x20$2,\x20$1\x20}}',
    '^\x5c\x5cphi$',
    '$1m/s',
    '.wf_show',
    'readystatechange',
    '(lbs',
    'POST',
    'transform',
    '\x5cdisplaystyle\x20',
    'itex_normal',
    'defint(',
    'pageY',
    '30462QcZHlc',
    'pan',
    '#tab_img_block',
    'igre\x20$1',
    'serializeToString',
    '^\x5c\x5cin$',
    '^\x5c\x5cgeqq$',
    'floor',
    '^\x5c\x5cneq$',
    '#myPopup\x20mjx-container',
    'eqn_input_mode',
    '^\x5c\x5cbecause$',
    '.itexmath_check',
    'result',
    'ltemp',
    'https://dev2.itexsolution.co.kr:5001/router_api',
    'pow',
    '^\x5c\x5crho$',
    '^\x5c\x5cotimes$',
    'querySelector',
    'addEventListener',
    'location',
    'newPlot',
    'ui_wrap',
    'mjx-assistive-mml',
    'window',
    'tex2svg',
    'scatter',
    'hide',
    'https://www.wolframalpha.com/input/?i=',
    'eqn_wrap',
    'src',
    'split',
    '^\x5c\x5clangle$',
    'mousemove',
    'dream_server_url',
    'getElementsByTagName',
    '^[\x5c+\x5c-\x5c=\x5c!<>\x5c(\x5c)〜,]$',
    'data-latex',
    '{$1\x20^{\x20\x5cfrac\x20{\x201\x20}\x20{\x20',
    '.plot-container',
    'max',
    'ans_show',
    'destroy',
    'jpeg',
    '.answerbox',
    'eqn_reflash',
    '^\x5c\x5cpropto$',
    'files',
    'createObjectURL',
    'eqn_converter',
    '^\x5c\x5cgeq$',
    'compile',
    'evaluate',
    'screen_none',
    'eqn_edit',
    '^\x5c\x5calpha$',
    '{mm}',
    'load',
    ')*$1',
    '^\x5c\x5ccdot$',
    'toTex',
    'sqrt($1)',
    'style',
    'symbol_change',
    '{$1}^',
    '.btn-close',
    'createElement',
    '<span\x20class=\x22null_box\x22></span>',
    'google',
    'rtemp',
    '#ui_wrap',
    '단위연산입니다.',
    '\x20-\x20',
    '#itex_frame_area',
    'error',
    '^\x5c\x5cbigstar$',
    'pageX',
    '^\x20{\x20',
    'offsetX',
    'push',
    'plot',
    '^\x5c\x5cvarphi$',
    'exec',
    '^[a-zA-Z0-9]+$',
    '^\x5c\x5csigma$',
    'log',
    'className',
    'querySelectorAll',
    '[data-bs-toggle=\x22tooltip\x22]',
    'itex_supscript',
    'setRequestHeader',
    'remove',
    '^\x5c\x5cdiv$',
    '#mjx-editing-area\x20svg',
    '$1@@$2##',
    'tab_hand_block',
    'getBBox',
    'toArray',
    'value',
    'plotly_relayout',
    'parse',
    '\x5c\x5cfrac\x5cs*lbs',
    'send',
    'getCroppedCanvas',
    'getElementById',
    'bind',
    '그래프\x20처리에\x20문제가\x20있네요.\x20웹\x20검색을\x20해보세요.',
    '$1ml',
    '^\x5c\x5cleftarrow$',
    '$1_',
    '$1($2)$3',
    'stopPropagation',
    '$1itexuper',
    'sketchpad',
    'trans_checked',
    'keep',
    '^\x5c\x5ccsc$',
    'en_input_mode',
    'goltemp',
    '^\x5c\x5cleftrightarrow$',
    '^\x5c\x5cDelta$',
    'innerWidth',
    'image/jpeg',
    '^\x5c\x5cLeftrightarrow$',
    'offset',
    'xmlns',
    '40QpmNok',
    '#mjx-editing-area',
    '\x5clog\x20_',
    '방정식\x20처리\x20시작',
    'readyState',
    'eqn_close',
    '^\x5c\x5cpm$',
    'http://dev2.itexsolution.co.kr:5000/router_api',
    'span',
    'map',
    'stringify',
    'units',
    'img',
    'name',
    'error:',
    '\x5clog\x20_\x20{\x2010\x20}',
    '\x5cclass{itexblank}{@}\x5ccssId{itexcursorbox}{}',
    'innerHeight',
    'originalEvent',
    '수식인식에\x20오류가\x20있습니다.\x20수식을\x20다시\x20입력해\x20주십시오.',
    'indexOf',
    'tipshow',
    '$1*$2',
    'classList',
    '^\x5c\x5cexists$',
    '{smb\x20',
    '\x20$1\x20',
    'ceil',
    'application/json',
    '#C54C82',
    'sel_tool',
    'eq_config_hidden',
    'createElementNS',
    '^/$',
    'wolfram',
    ')*(',
    '.site_iframe',
    '\x20+\x20',
    '\x5cs*lbs',
    'mousedown',
    'etoos_latex',
    'right',
    '\x5cleft\x5c{',
    'svg',
    '.screen_block',
    'getContext',
    'content\x20null',
    'rect',
    '\x5cleg\x20$1\x20\x5clcg\x20',
    'ans_hidden',
    'call',
    'point',
    'erase',
    'reload',
    'iTeXEQ',
    'normal',
    '\x5ctimes$1',
    '\x5cend{array}\x5cright.}',
    'appendChild',
    '^\x5c\x5cequiv$',
    'type',
    'range',
    '^\x5c\x5csec$',
    'log\x20($1,\x2010)',
    '\x5csum\x5climits\x20',
    '^\x5c\x5c%$',
    '662055kIUhJe',
    '^\x5c\x5clim$',
    '^\x5c\x5cleqq$',
    '^\x5c\x5clog$',
    'status',
    'then',
    '351XpNJIe',
    'latex_styled',
    '^\x5c\x5ctan$',
    '^\x5c\x5ccap$',
    '{\x5cleft\x5c{\x5cbegin{array}{l}',
    '^\x5c\x5cpsi$',
    'button',
    '}*$1',
    '^\x5c\x5csim$',
    '#ffffff',
    '^\x5c\x5cdelta$',
    'append',
    'left',
    'eq_config_show',
    '\x5c\x5cpm',
    'getTime',
    'parentNode',
    'class',
    'roots',
    'svg\x20.texevt',
    'mjx-container>svg',
    'splice',
    'fill-opacity:0;stroke-opacity:0;',
    '\x5cmathrm{',
    '$1($2)',
    'length',
    'itex_frame_area',
    'color',
    'element',
    '인수분해합니다.',
    '미분합니다',
    '.en_input_mode',
    'sol_eq',
    'layerX',
    'eqn_tranfer',
    'args',
    '^\x5c\x5crightarrow$',
    'log\x5cs*',
    'removeAttribute',
    '.loader_wrap',
    'mjx-container',
    '.*?rbs',
    'itex_subscript',
    'diff',
    'weight',
    '단위연산이\x20아닙니다.',
    'removeChild',
  ];
  _0x682e = function () {
    return _0x19b67f;
  };
  return _0x682e();
}
function latex_parse_frac(_0x4820a3) {
  var _0x18dbb4 = _0x47159c;
  (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](/\\left\s*\\\{/g, _0x18dbb4(0x32f))),
    (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](
      /\\right\s*\\\}/g,
      _0x18dbb4(0x1bf),
    ));
  var _0x19e44d = 0x0;
  while (_0x4820a3[_0x18dbb4(0x312)](/\{[^\{\}]*?\}/)) {
    (_0x4820a3 = _0x4820a3['replace'](
      /\{([^\{\}]*?)\}/,
      _0x18dbb4(0x2ba) +
        _0x19e44d +
        _0x18dbb4(0x212) +
        _0x18dbb4(0x2c1) +
        _0x19e44d,
    )),
      _0x19e44d++;
  }
  while (_0x4820a3[_0x18dbb4(0x312)](/\\frac\s*lbs\d+/)) {
    var _0x12324b = _0x4820a3[_0x18dbb4(0x312)](/\\frac\s*lbs(\d+)/),
      _0x318754 = new RegExp(
        _0x18dbb4(0x1df) +
          _0x12324b[0x1] +
          _0x18dbb4(0x2b9) +
          _0x18dbb4(0x2c1) +
          _0x12324b[0x1] +
          _0x18dbb4(0x2da),
      ),
      _0x14417f = _0x4820a3[_0x18dbb4(0x312)](_0x318754),
      _0x4c340e = new RegExp(
        _0x18dbb4(0x293) +
          _0x12324b[0x1] +
          _0x18dbb4(0x269) +
          _0x12324b[0x1] +
          _0x18dbb4(0x21e) +
          _0x14417f[0x1] +
          '.*?rbs' +
          _0x14417f[0x1] +
          ')',
      );
    (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](_0x4c340e, '{tempfc$1}check')),
      (_0x4820a3 = _0x4820a3['replace'](/\}check\s*([a-zA-Z])/g, '}*$1')),
      (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](
        /\}check\s*([\{\(])/g,
        _0x18dbb4(0x247),
      )),
      (_0x4820a3 = _0x4820a3['replace'](
        /\}check\s*(\\sin)/g,
        _0x18dbb4(0x247),
      )),
      (_0x4820a3 = _0x4820a3['replace'](
        /\}check\s*(\\cos)/g,
        _0x18dbb4(0x247),
      )),
      (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](/\}check\s*(\\tan)/g, '}*$1')),
      (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](
        /\}check\s*(\\sec)/g,
        _0x18dbb4(0x247),
      )),
      (_0x4820a3 = _0x4820a3['replace'](/\}check\s*(\\csc)/g, '}*$1')),
      (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](
        /\}check\s*(\\cot)/g,
        _0x18dbb4(0x247),
      )),
      (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](
        /\}check\s*(\\log)/g,
        _0x18dbb4(0x247),
      )),
      (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](
        /\}check\s*(\\ln)/g,
        _0x18dbb4(0x247),
      )),
      (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](/\}check/g, '}'));
  }
  return (
    (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](/ltemp/g, '\x5cleft\x5c{')),
    (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](/rtemp/g, _0x18dbb4(0x297))),
    (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](/rbs\d+/g, '}')),
    (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](/lbs\d+/g, '{')),
    (_0x4820a3 = _0x4820a3[_0x18dbb4(0x29f)](/tempfc/g, _0x18dbb4(0x2bb))),
    _0x4820a3
  );
}
function latex_parse_log_under(_0x448756) {
  var _0x525c30 = _0x47159c;
  (_0x448756 = _0x448756[_0x525c30(0x29f)](
    /\\ln\s*([a-zA-Z0-9\.]+)/g,
    '\x5cln\x20{$1}',
  )),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/\\log\s*_/g, _0x525c30(0x1f0))),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/\\log/g, _0x525c30(0x207))),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/goltemp/g, _0x525c30(0x1fa))),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/\\left\s*\\\{/g, 'ltemp')),
    (_0x448756 = _0x448756['replace'](/\\right\s*\\\}/g, _0x525c30(0x1bf))),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/\(/g, _0x525c30(0x211))),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/\)/g, '\x20smb}'));
  var _0x18d1b7 = 0x0;
  while (_0x448756[_0x525c30(0x312)](/\{[^\{\}]*?\}/)) {
    (_0x448756 = _0x448756[_0x525c30(0x29f)](
      /\{([^\{\}]*?)\}/,
      _0x525c30(0x2ba) +
        _0x18d1b7 +
        _0x525c30(0x212) +
        _0x525c30(0x2c1) +
        _0x18d1b7,
    )),
      _0x18d1b7++;
  }
  while (_0x448756['match'](/\\log\s*_\s*lbs\d+/)) {
    var _0x34dfc1 = _0x448756['match'](/\\log\s*_\s*lbs(\d+)/),
      _0x5b992d = new RegExp(
        '\x5c\x5clog\x5cs*_(\x5cs*' +
          _0x525c30(0x2ba) +
          _0x34dfc1[0x1] +
          _0x525c30(0x269) +
          _0x34dfc1[0x1] +
          ')',
      );
    _0x448756 = _0x448756['replace'](_0x5b992d, _0x525c30(0x228));
  }
  (_0x448756 = _0x448756[_0x525c30(0x29f)](/ltemp/g, '\x5cleft\x5c{')),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/rtemp/g, _0x525c30(0x297))),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/rbs\d+/g, '}')),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/lbs\d+/g, '{')),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](
      /(\\lcg\s*)([a-zA-Z0-9\.]+)/g,
      _0x525c30(0x2ad),
    )),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](
      /\\left\s*\\\{/g,
      _0x525c30(0x32f),
    )),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/\\right\s*\\\}/g, 'rtemp'));
  var _0x18d1b7 = 0x0;
  while (_0x448756[_0x525c30(0x312)](/\{[^\{\}]*?\}/)) {
    (_0x448756 = _0x448756[_0x525c30(0x29f)](
      /\{([^\{\}]*?)\}/,
      _0x525c30(0x2ba) +
        _0x18d1b7 +
        _0x525c30(0x212) +
        _0x525c30(0x2c1) +
        _0x18d1b7,
    )),
      _0x18d1b7++;
  }
  while (_0x448756['match'](/\\lcg\s*lbs\d+/)) {
    var _0x34dfc1 = _0x448756[_0x525c30(0x312)](/\\lcg\s*lbs(\d+)/),
      _0x5b992d = new RegExp(
        _0x525c30(0x2b3) +
          _0x525c30(0x31a) +
          _0x34dfc1[0x1] +
          '.*?rbs' +
          _0x34dfc1[0x1] +
          ')',
      );
    _0x448756 = _0x448756[_0x525c30(0x29f)](_0x5b992d, _0x525c30(0x315));
  }
  while (_0x448756[_0x525c30(0x312)](/\\ln\s*lbs\d+/)) {
    var _0x34dfc1 = _0x448756[_0x525c30(0x312)](/\\ln\s*lbs(\d+)/),
      _0x5b992d = new RegExp(
        _0x525c30(0x2d6) +
          '(lbs' +
          _0x34dfc1[0x1] +
          '.*?rbs' +
          _0x34dfc1[0x1] +
          ')',
      );
    _0x448756 = _0x448756['replace'](_0x5b992d, _0x525c30(0x278));
  }
  return (
    (_0x448756 = _0x448756['replace'](/ltemp/g, '\x5cleft\x5c{')),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/rtemp/g, _0x525c30(0x297))),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/rbs\d+/g, '}')),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/lbs\d+/g, '{')),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/\{\s*smb/g, '(')),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/smb\s*\}/g, ')')),
    (_0x448756 = _0x448756[_0x525c30(0x29f)](/\s+/g, '\x20')),
    _0x448756
  );
}
function _0x6c00(_0x1742f9, _0x1dd8e3) {
  var _0x682eae = _0x682e();
  return (
    (_0x6c00 = function (_0x6c00c, _0x4c2475) {
      _0x6c00c = _0x6c00c - 0x193;
      var _0x48aac1 = _0x682eae[_0x6c00c];
      return _0x48aac1;
    }),
    _0x6c00(_0x1742f9, _0x1dd8e3)
  );
}
function latex_parse_root(_0x53f6b1) {
  var _0x4b398c = _0x47159c;
  (_0x53f6b1 = _0x53f6b1[_0x4b398c(0x29f)](/\\left\s*\\\{/g, _0x4b398c(0x32f))),
    (_0x53f6b1 = _0x53f6b1[_0x4b398c(0x29f)](
      /\\right\s*\\\}/g,
      _0x4b398c(0x1bf),
    ));
  var _0x207206 = 0x0;
  while (_0x53f6b1['match'](/\{[^\{\}]*?\}/)) {
    (_0x53f6b1 = _0x53f6b1['replace'](
      /\{([^\{\}]*?)\}/,
      _0x4b398c(0x2ba) +
        _0x207206 +
        _0x4b398c(0x212) +
        _0x4b398c(0x2c1) +
        _0x207206,
    )),
      _0x207206++;
  }
  while (_0x53f6b1[_0x4b398c(0x312)](/\\sqrt\s*\[.*?\]\s*lbs\d+/)) {
    var _0x4955e9 = _0x53f6b1[_0x4b398c(0x312)](
        /\\sqrt\s*\[(.*?)\]\s*lbs(\d+)/,
      ),
      _0x3a05c7 = new RegExp(
        '\x5c\x5csqrt\x5cs*\x5c[.*?\x5c]\x5cs*(lbs' +
          _0x4955e9[0x2] +
          '.*?' +
          _0x4b398c(0x2c1) +
          _0x4955e9[0x2] +
          ')',
      );
    _0x53f6b1 = _0x53f6b1[_0x4b398c(0x29f)](
      _0x3a05c7,
      _0x4b398c(0x1a0) + _0x4955e9[0x1] + '\x20}\x20}\x20}',
    );
  }
  return (
    (_0x53f6b1 = _0x53f6b1['replace'](/ltemp/g, _0x4b398c(0x222))),
    (_0x53f6b1 = _0x53f6b1['replace'](/rtemp/g, '\x5cright\x5c}')),
    (_0x53f6b1 = _0x53f6b1[_0x4b398c(0x29f)](/rbs\d+/g, '}')),
    (_0x53f6b1 = _0x53f6b1[_0x4b398c(0x29f)](/lbs\d+/g, '{')),
    (_0x53f6b1 = _0x53f6b1['replace'](/tempfc/g, _0x4b398c(0x2bb))),
    (_0x53f6b1 = _0x53f6b1[_0x4b398c(0x29f)](/\s+/g, '\x20')),
    _0x53f6b1
  );
}
function calc_parse_log(_0x535448) {
  var _0x25a26b = _0x47159c,
    _0x2a0f29 = 0x0;
  while (_0x535448[_0x25a26b(0x312)](/\([^\(\)]*?\)/)) {
    (_0x535448 = _0x535448[_0x25a26b(0x29f)](
      /\(([^\(\)]*?)\)/,
      _0x25a26b(0x2ba) + _0x2a0f29 + '\x20$1\x20' + 'rbs' + _0x2a0f29,
    )),
      _0x2a0f29++;
  }
  while (_0x535448[_0x25a26b(0x312)](/log\s*lbs\d+/)) {
    var _0x2a6123 = _0x535448[_0x25a26b(0x312)](/log\s*lbs(\d+)/),
      _0x3e7601 = new RegExp(
        _0x25a26b(0x265) +
          _0x25a26b(0x31a) +
          _0x2a6123[0x1] +
          '.*?rbs' +
          _0x2a6123[0x1] +
          ')',
      );
    _0x535448 = _0x535448[_0x25a26b(0x29f)](_0x3e7601, _0x25a26b(0x237));
  }
  return (
    (_0x535448 = _0x535448[_0x25a26b(0x29f)](/rbs\d+/g, ')')),
    (_0x535448 = _0x535448[_0x25a26b(0x29f)](/lbs\d+/g, '(')),
    (_0x535448 = _0x535448[_0x25a26b(0x29f)](/\s*\(\s*/g, '(')),
    (_0x535448 = _0x535448[_0x25a26b(0x29f)](/\s*\)\s*/g, ')')),
    console[_0x25a26b(0x1cf)](_0x535448),
    _0x535448
  );
}
document[_0x47159c(0x334)](_0x47159c(0x1a6))[_0x47159c(0x335)](
  _0x47159c(0x308),
  function (_0x15f359) {
    var _0x4769c5 = _0x47159c;
    if (document[_0x4769c5(0x334)](_0x4769c5(0x318)))
      return (
        document[_0x4769c5(0x334)]('.site_iframe')['classList'][
          _0x4769c5(0x1d5)
        ]('wf_show'),
        document[_0x4769c5(0x334)](_0x4769c5(0x21c))[_0x4769c5(0x20f)][
          _0x4769c5(0x2f8)
        ](_0x4769c5(0x2e2)),
        !![]
      );
    this[_0x4769c5(0x20f)][_0x4769c5(0x270)]('ans_show')
      ? (this[_0x4769c5(0x20f)][_0x4769c5(0x1d5)]('ans_show'),
        this['classList'][_0x4769c5(0x2f8)]('ans_hidden'))
      : (this[_0x4769c5(0x20f)][_0x4769c5(0x1d5)](_0x4769c5(0x229)),
        this[_0x4769c5(0x20f)][_0x4769c5(0x2f8)](_0x4769c5(0x1a3)));
  },
  ![],
),
  window['addEventListener'](
    _0x47159c(0x271),
    function () {
      var _0x525ebc = _0x47159c;
      location[_0x525ebc(0x22d)]();
    },
    ![],
  );
function wolfram_call(_0x1e075b) {
  var _0x2e74e0 = _0x47159c,
    _0x476acd = _0x2e74e0(0x196) + encodeURIComponent(_0x1e075b);
  (document[_0x2e74e0(0x334)](_0x2e74e0(0x21c))[_0x2e74e0(0x198)] = _0x476acd),
    document[_0x2e74e0(0x1e2)](_0x2e74e0(0x21a))[_0x2e74e0(0x20f)][
      _0x2e74e0(0x1d5)
    ]('trans_checked'),
    loader_showing(),
    setTimeout(function () {
      var _0x254a66 = _0x2e74e0;
      document['querySelector'](_0x254a66(0x21c))[_0x254a66(0x20f)][
        _0x254a66(0x2f8)
      ]('wf_show'),
        document[_0x254a66(0x334)]('.site_iframe')[_0x254a66(0x20f)][
          _0x254a66(0x1d5)
        ]('wf_hidden'),
        loader_hide();
    }, 0xbb8);
}
function mathpapa_call(_0x3a0467) {
  var _0x24cb59 = _0x47159c,
    _0x33693c = _0x24cb59(0x30b) + encodeURIComponent(_0x3a0467);
  (popup_window[_0x24cb59(0x336)][_0x24cb59(0x302)] = _0x33693c),
    document['getElementById'](_0x24cb59(0x2a9))[_0x24cb59(0x20f)]['remove'](
      _0x24cb59(0x1ec),
    ),
    loader_showing(),
    setTimeout(function () {
      loader_hide();
    }, 0xbb8);
}
function google_call(_0x5b3bc9) {
  var _0xbc94cf = _0x47159c,
    _0xd07794 =
      'https://www.google.com/search?q=' + encodeURIComponent(_0x5b3bc9);
  console[_0xbc94cf(0x1cf)](_0xd07794),
    (popup_window[_0xbc94cf(0x336)][_0xbc94cf(0x302)] = _0xd07794),
    document[_0xbc94cf(0x1e2)]('google')[_0xbc94cf(0x20f)][_0xbc94cf(0x1d5)](
      _0xbc94cf(0x1ec),
    ),
    loader_showing(),
    setTimeout(function () {
      loader_hide();
    }, 0xbb8);
}
function loader_hide() {
  var _0x19d738 = _0x47159c;
  document[_0x19d738(0x334)](_0x19d738(0x267))[_0x19d738(0x20f)][
    _0x19d738(0x2f8)
  ]('loader_hidden'),
    document[_0x19d738(0x334)](_0x19d738(0x267))[_0x19d738(0x20f)]['remove'](
      _0x19d738(0x300),
    );
}
function eqn_createImg() {
  return new Promise(function (_0x496114, _0x2c2f1b) {
    var _0x1952b4 = _0x6c00,
      _0x299570 = parent[_0x1952b4(0x22e)]['itex_se2iframe'][_0x1952b4(0x276)];
    itex_wr_ready == ![]
      ? (itex_wr_ready = !![])
      : (console[_0x1952b4(0x1cf)]('block'), _0x2c2f1b(![]));
    document['querySelector']('mjx-assistive-mml') &&
      document['querySelector'](_0x1952b4(0x339))[_0x1952b4(0x250)][
        _0x1952b4(0x26e)
      ](document[_0x1952b4(0x334)](_0x1952b4(0x339)));
    var _0x43fb0f = _0x299570[_0x1952b4(0x334)](_0x1952b4(0x32d)),
      _0x39a7e5,
      _0xbb3a04,
      _0x522f5b,
      _0x23ad93;
    if (document[_0x1952b4(0x334)](_0x1952b4(0x1d7))) {
      var _0x2829d1 = document[_0x1952b4(0x334)](_0x1952b4(0x1d7))[
        _0x1952b4(0x273)
      ]();
      _0x2829d1[_0x1952b4(0x29d)] > 0x1 && _0x2829d1['height'] > 0x1
        ? ((_0x39a7e5 = 0x0), (_0xbb3a04 = 0x0))
        : ((_0x39a7e5 = minX - 0x14), (_0xbb3a04 = minY - 0x14)),
        maxX > _0x2829d1[_0x1952b4(0x221)]
          ? (_0x522f5b = maxX + 0x14)
          : (_0x522f5b = _0x2829d1[_0x1952b4(0x221)] + 0x14),
        maxY > _0x2829d1[_0x1952b4(0x277)]
          ? (_0x23ad93 = maxY + 0x14)
          : (_0x23ad93 = _0x2829d1['bottom'] + 0x14),
        _0x39a7e5 < 0x0 && (_0x39a7e5 = 0x0),
        _0xbb3a04 < 0x0 && (_0xbb3a04 = 0x0),
        _0x522f5b >
          document[_0x1952b4(0x334)](_0x1952b4(0x1c0))[_0x1952b4(0x273)]()[
            _0x1952b4(0x221)
          ] &&
          (_0x522f5b =
            document['querySelector']('#ui_wrap')[_0x1952b4(0x273)]()[
              _0x1952b4(0x221)
            ]),
        _0x23ad93 >
          document[_0x1952b4(0x334)](_0x1952b4(0x1c0))[_0x1952b4(0x273)]()[
            'bottom'
          ] &&
          (_0x23ad93 = document[_0x1952b4(0x334)](_0x1952b4(0x1c0))[
            _0x1952b4(0x273)
          ]()[_0x1952b4(0x277)]);
    } else
      (_0x39a7e5 = minX - 0x14),
        (_0xbb3a04 = minY - 0x14),
        (_0x522f5b = maxX + 0x14),
        (_0x23ad93 = maxY + 0x14);
    html2canvas(document[_0x1952b4(0x334)]('#ui_wrap'), {
      x: _0x39a7e5,
      y: _0xbb3a04,
      width: _0x522f5b - _0x39a7e5,
      height: _0x23ad93 - _0xbb3a04,
      scale: 0.7,
    })
      [_0x1952b4(0x23f)]((_0x1850e0) => {
        var _0x3e1a31 = _0x1952b4;
        const _0x35ce90 = _0x1850e0[_0x3e1a31(0x2e1)](_0x3e1a31(0x1f4)),
          _0x4eba43 = document['createElement'](_0x3e1a31(0x204));
        (_0x4eba43[_0x3e1a31(0x198)] = _0x35ce90),
          _0x43fb0f[_0x3e1a31(0x250)]['replaceChild'](_0x4eba43, _0x43fb0f),
          (itex_wr_ready = ![]),
          app_reset(),
          _0x496114(!![]);
      })
      ['catch']((_0x118687) => {
        var _0x2997ac = _0x1952b4;
        console[_0x2997ac(0x1c4)]('html2canvas\x20오류:\x20', _0x118687),
          _0x2c2f1b(![]);
      });
  });
}
