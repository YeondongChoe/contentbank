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
var _0x403d68 = _0x4f8a;
(function (_0x4fe242, _0x4c251e) {
  var _0x483fcf = _0x4f8a,
    _0x5400ef = _0x4fe242();
  while ([]) {
    try {
      var _0x32a231 =
        (-parseInt(_0x483fcf(0x312)) / 0x1) *
          (parseInt(_0x483fcf(0x24b)) / 0x2) +
        (parseInt(_0x483fcf(0x2b0)) / 0x3) *
          (-parseInt(_0x483fcf(0x318)) / 0x4) +
        (parseInt(_0x483fcf(0x2c3)) / 0x5) *
          (parseInt(_0x483fcf(0x1fb)) / 0x6) +
        -parseInt(_0x483fcf(0x1c3)) / 0x7 +
        -parseInt(_0x483fcf(0x1f8)) / 0x8 +
        -parseInt(_0x483fcf(0x224)) / 0x9 +
        (-parseInt(_0x483fcf(0x2e5)) / 0xa) *
          (-parseInt(_0x483fcf(0x20e)) / 0xb);
      if (_0x32a231 === _0x4c251e) break;
      else _0x5400ef['push'](_0x5400ef['shift']());
    } catch (_0x31c0f3) {
      _0x5400ef['push'](_0x5400ef['shift']());
    }
  }
})(_0x3ee9, 0x28cfb);
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
if (window[_0x403d68(0x2fb)][_0x403d68(0x25e)] == _0x403d68(0x2d9))
  var eqn_ocr_url = _0x403d68(0x343);
else var eqn_ocr_url = _0x403d68(0x2c7);
var ocr_header_key = _0x403d68(0x1d8),
  timefn,
  tooltipTriggerList = [][_0x403d68(0x285)][_0x403d68(0x1d6)](
    document[_0x403d68(0x2dd)]('[data-bs-toggle=\x22tooltip\x22]'),
  ),
  tooltipList = tooltipTriggerList['map'](function (_0xd93e83) {
    var _0x380b21 = _0x403d68;
    return new bootstrap[_0x380b21(0x28b)](_0xd93e83);
  }),
  evtclk;
navigator['userAgent'][_0x403d68(0x33b)](
  /BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|Android/,
)
  ? (evtclk = _0x403d68(0x2b4))
  : (evtclk = _0x403d68(0x1b8));
function isTouchEvent(_0x562eb6) {
  var _0x217c88 = _0x403d68;
  return _0x562eb6[_0x217c88(0x227)][_0x217c88(0x21e)]('touch') !== -0x1;
}
var main_wd, main_hg;
function handleResize() {
  var _0x75afb8 = _0x403d68;
  sketch_el = document[_0x75afb8(0x2bd)](_0x75afb8(0x1bb));
  var _0x186828 = sketch_el['getContext']('2d'),
    _0x195e36 = _0x186828[_0x75afb8(0x1fc)](
      0x0,
      0x0,
      sketch_el['width'],
      sketch_el[_0x75afb8(0x2cb)],
    );
  parent[_0x75afb8(0x2f4)][_0x75afb8(0x2ec)] == _0x75afb8(0x2f3)
    ? ((main_wd = parent[_0x75afb8(0x1e8)][_0x75afb8(0x223)]),
      (main_hg = parent[_0x75afb8(0x1e8)][_0x75afb8(0x21c)] / 0x2))
    : ((main_wd = parent['document']
        ['querySelector'](parent[_0x75afb8(0x2f4)][_0x75afb8(0x2e6)])
        ['getBoundingClientRect']()[_0x75afb8(0x1fe)]),
      (main_hg = parent[_0x75afb8(0x2fa)]
        [_0x75afb8(0x279)](parent['iTeXEQ'][_0x75afb8(0x2e6)])
        ['getBoundingClientRect']()[_0x75afb8(0x2cb)])),
    parent[_0x75afb8(0x2fa)]
      [_0x75afb8(0x2bd)](_0x75afb8(0x305))
      [_0x75afb8(0x1ff)](_0x75afb8(0x1fe), main_wd),
    parent['document']
      [_0x75afb8(0x2bd)](_0x75afb8(0x305))
      [_0x75afb8(0x1ff)](_0x75afb8(0x2cb), main_hg),
    (sketch_el['width'] = main_wd),
    (sketch_el[_0x75afb8(0x2cb)] = main_hg),
    sketch_pad[_0x75afb8(0x276)](),
    (document[_0x75afb8(0x2bd)](_0x75afb8(0x2a3))['style']['height'] =
      main_hg + 'px'),
    (document['getElementById'](_0x75afb8(0x25d))[_0x75afb8(0x2ae)]['height'] =
      main_hg + 'px'),
    (document['getElementById'](_0x75afb8(0x351))[_0x75afb8(0x2ae)]['height'] =
      main_hg + 'px'),
    (document[_0x75afb8(0x2bd)](_0x75afb8(0x229))[_0x75afb8(0x2ae)]['height'] =
      main_hg + 'px'),
    (document['getElementById'](_0x75afb8(0x1da))[_0x75afb8(0x2ae)][
      _0x75afb8(0x2cb)
    ] = main_hg + 'px'),
    _0x186828[_0x75afb8(0x2ee)](_0x195e36, 0x0, 0x0);
}
(window[_0x403d68(0x2a5)] = function () {
  var _0x38d66b = _0x403d68;
  parent[_0x38d66b(0x2f4)][_0x38d66b(0x2ec)] == _0x38d66b(0x2f3)
    ? ((main_wd = parent['window']['innerWidth']),
      (main_hg = parent['window']['innerHeight'] / 0x2))
    : ((main_wd = parent[_0x38d66b(0x2fa)]
        [_0x38d66b(0x279)](_0x38d66b(0x29d))
        [_0x38d66b(0x258)]['getBoundingClientRect']()[_0x38d66b(0x1fe)]),
      (main_hg = parent[_0x38d66b(0x2fa)]
        ['querySelector'](_0x38d66b(0x29d))
        [_0x38d66b(0x258)]['getBoundingClientRect']()[_0x38d66b(0x2cb)])),
    parent[_0x38d66b(0x2fa)]
      ['getElementById'](_0x38d66b(0x305))
      [_0x38d66b(0x1ff)](_0x38d66b(0x1fe), main_wd),
    parent[_0x38d66b(0x2fa)]
      [_0x38d66b(0x2bd)](_0x38d66b(0x305))
      ['setAttribute'](_0x38d66b(0x2cb), main_hg),
    (sketch_el = document[_0x38d66b(0x2bd)](_0x38d66b(0x1bb))),
    (sketch_pad = new Atrament(document[_0x38d66b(0x2bd)]('sketchpad'), {
      width: main_wd,
      height: main_hg,
      color: '#000000',
      weight: 0x2,
      smoothing: 0.3,
      adaptiveStroke: ![],
    })),
    (document['getElementById'](_0x38d66b(0x2a3))['style'][_0x38d66b(0x2cb)] =
      main_hg + 'px'),
    (document['getElementById'](_0x38d66b(0x25d))['style'][_0x38d66b(0x2cb)] =
      main_hg + 'px'),
    (document['getElementById'](_0x38d66b(0x351))[_0x38d66b(0x2ae)][
      _0x38d66b(0x2cb)
    ] = main_hg + 'px'),
    (document[_0x38d66b(0x2bd)](_0x38d66b(0x229))[_0x38d66b(0x2ae)]['height'] =
      main_hg + 'px'),
    (document['getElementById']('tab_img_block')['style'][_0x38d66b(0x2cb)] =
      main_hg + 'px'),
    $(sketch_el)[_0x38d66b(0x1ce)]('mousedown', function (_0x4779f8) {
      var _0x325bb7 = _0x38d66b;
      (parent[_0x325bb7(0x2f4)][_0x325bb7(0x295)] = !![]), (isDrawingx = !![]);
      if (
        document[_0x325bb7(0x279)](_0x325bb7(0x20f)) ||
        document[_0x325bb7(0x279)](_0x325bb7(0x33f))
      ) {
        (thandX = []), (thandY = []);
        var _0x11585c, _0x33bf09;
        (_0x11585c =
          typeof _0x4779f8[_0x325bb7(0x1e0)] !== _0x325bb7(0x2dc)
            ? _0x4779f8[_0x325bb7(0x1e0)]
            : _0x4779f8[_0x325bb7(0x2a2)]),
          (_0x33bf09 =
            typeof _0x4779f8[_0x325bb7(0x31d)] !== 'undefined'
              ? _0x4779f8['offsetY']
              : _0x4779f8[_0x325bb7(0x252)]),
          thandX['push'](_0x11585c),
          thandY[_0x325bb7(0x350)](_0x33bf09);
      }
    }),
    $(sketch_el)[_0x38d66b(0x1ce)](_0x38d66b(0x1eb), function (_0x5d9edb) {
      var _0x35b88b = _0x38d66b;
      isDrawingx = ![];
      if (
        document[_0x35b88b(0x279)](_0x35b88b(0x20f)) ||
        document[_0x35b88b(0x279)](_0x35b88b(0x33f))
      ) {
        var _0x3bacb3 = [];
        _0x3bacb3['push'](thandX),
          _0x3bacb3[_0x35b88b(0x350)](thandY),
          _0x3bacb3[_0x35b88b(0x350)]([]),
          traces[_0x35b88b(0x350)](_0x3bacb3);
      }
    }),
    $(sketch_el)['bind'](_0x38d66b(0x270), function (_0x51e875) {
      var _0x554b62 = _0x38d66b;
      if (isDrawingx === !![]) {
        var _0x4ce5cc, _0x596088;
        (_0x4ce5cc =
          typeof _0x51e875[_0x554b62(0x1e0)] !== 'undefined'
            ? _0x51e875[_0x554b62(0x1e0)]
            : _0x51e875[_0x554b62(0x2a2)]),
          (_0x596088 =
            typeof _0x51e875[_0x554b62(0x31d)] !== _0x554b62(0x2dc)
              ? _0x51e875[_0x554b62(0x31d)]
              : _0x51e875[_0x554b62(0x252)]),
          (minX = Math[_0x554b62(0x32a)](minX, _0x4ce5cc)),
          (minY = Math[_0x554b62(0x32a)](minY, _0x596088)),
          (maxX = Math['max'](maxX, _0x4ce5cc)),
          (maxY = Math[_0x554b62(0x2c4)](maxY, _0x596088));
      }
    }),
    $(sketch_el)[_0x38d66b(0x1ce)](_0x38d66b(0x1cc), function (_0x3c8d1a) {
      var _0x33e54b = _0x38d66b;
      (parent['iTeXEQ'][_0x33e54b(0x295)] = !![]), (isDrawingx = !![]);
      if (
        document['querySelector'](_0x33e54b(0x20f)) ||
        document['querySelector']('.en_input_mode')
      ) {
        (thandX = []), (thandY = []);
        var _0x223023,
          _0x58631d,
          _0x52a83d = $(sketch_el)[_0x33e54b(0x336)]()[_0x33e54b(0x1e1)],
          _0x5070f3 = $(sketch_el)[_0x33e54b(0x336)]()['top'];
        (_0x223023 = Math[_0x33e54b(0x216)](
          _0x3c8d1a[_0x33e54b(0x259)]['touches'][0x0]['pageX'] - _0x52a83d,
        )),
          (_0x58631d = Math['floor'](
            _0x3c8d1a[_0x33e54b(0x259)][_0x33e54b(0x20c)][0x0][
              _0x33e54b(0x205)
            ] - _0x5070f3,
          )),
          thandX['push'](_0x223023),
          thandY[_0x33e54b(0x350)](_0x58631d);
      }
    }),
    $(sketch_el)[_0x38d66b(0x1ce)]('touchend', function (_0x317334) {
      var _0x1738b3 = _0x38d66b;
      isDrawingx = ![];
      if (
        document[_0x1738b3(0x279)]('.ko_input_mode') ||
        document['querySelector'](_0x1738b3(0x33f))
      ) {
        var _0x1f2c71 = [];
        _0x1f2c71[_0x1738b3(0x350)](thandX),
          _0x1f2c71[_0x1738b3(0x350)](thandY),
          _0x1f2c71['push']([]),
          traces['push'](_0x1f2c71);
      }
    }),
    $(sketch_el)[_0x38d66b(0x1ce)](_0x38d66b(0x1db), function (_0x277bf9) {
      var _0x43c4e4 = _0x38d66b;
      if (isDrawingx === !![]) {
        var _0x3f587d = $(this)[_0x43c4e4(0x336)]()['left'],
          _0x472bf8 = $(this)[_0x43c4e4(0x336)]()[_0x43c4e4(0x260)],
          _0x45d7ed,
          _0x12a42f,
          _0x3f587d = $(sketch_el)[_0x43c4e4(0x336)]()[_0x43c4e4(0x1e1)],
          _0x472bf8 = $(sketch_el)[_0x43c4e4(0x336)]()[_0x43c4e4(0x260)];
        (_0x45d7ed = Math[_0x43c4e4(0x216)](
          _0x277bf9[_0x43c4e4(0x259)][_0x43c4e4(0x20c)][0x0]['pageX'] -
            _0x3f587d,
        )),
          (_0x12a42f = Math[_0x43c4e4(0x216)](
            _0x277bf9[_0x43c4e4(0x259)][_0x43c4e4(0x20c)][0x0][
              _0x43c4e4(0x205)
            ] - _0x472bf8,
          )),
          (minX = Math[_0x43c4e4(0x32a)](minX, _0x45d7ed)),
          (minY = Math[_0x43c4e4(0x32a)](minY, _0x12a42f)),
          (maxX = Math[_0x43c4e4(0x2c4)](maxX, _0x45d7ed)),
          (maxY = Math[_0x43c4e4(0x2c4)](maxY, _0x12a42f));
      }
    });
}),
  document[_0x403d68(0x2bd)]('eqn_converter')[_0x403d68(0x2e2)](
    evtclk,
    eqn_convert,
    ![],
  );
function eqneditor_change() {
  var _0x3f8e5b = _0x403d68;
  (parent[_0x3f8e5b(0x2fa)][_0x3f8e5b(0x2bd)](_0x3f8e5b(0x29f))[
    _0x3f8e5b(0x2ae)
  ][_0x3f8e5b(0x240)] = _0x3f8e5b(0x339)),
    setTimeout(function () {
      var _0x330e2a = _0x3f8e5b;
      parent[_0x330e2a(0x2fa)]
        ['querySelector'](parent[_0x330e2a(0x2f4)][_0x330e2a(0x1c6)])
        [_0x330e2a(0x32e)][_0x330e2a(0x349)](_0x330e2a(0x201)),
        parent[_0x330e2a(0x2fa)]
          [_0x330e2a(0x279)](parent['iTeXEQ']['element'])
          [_0x330e2a(0x32e)][_0x330e2a(0x26e)](_0x330e2a(0x2f5));
      var _0x225ec0 = document[_0x330e2a(0x279)](_0x330e2a(0x200))[
        _0x330e2a(0x220)
      ](_0x330e2a(0x1e6));
      document[_0x330e2a(0x279)]('#mjx-editing-area')[_0x330e2a(0x2fe)](
        _0x330e2a(0x1e6),
      );
      if (!_0x225ec0)
        _0x225ec0 = parent[_0x330e2a(0x2f4)][_0x330e2a(0x2fc)](
          _0x330e2a(0x2d0),
        );
      else
        _0x225ec0[_0x330e2a(0x33b)](/^\s*\\displaystyle\s*$/)
          ? (_0x225ec0 = parent[_0x330e2a(0x2f4)][_0x330e2a(0x2fc)](
              '\x5cclass{itexblank}{@}\x5ccssId{itexcursorbox}{}',
            ))
          : (_0x225ec0 = _0x225ec0[_0x330e2a(0x2d7)](/\\displaystyle\s*/, ''));
      parent[_0x330e2a(0x2f4)][_0x330e2a(0x1e3)](_0x225ec0), ocrmode_hidden();
    }, 0xa);
}
function eqneditor_change_custom() {
  var _0x215334 = _0x403d68;
  (parent['iTeXEQ'][_0x215334(0x272)] = 'ui'),
    setTimeout(function () {
      var _0x1a1fe3 = _0x215334,
        _0x550b33 = document['querySelector']('#mjx-editing-area')[
          'getAttribute'
        ](_0x1a1fe3(0x1e6));
      document['querySelector'](_0x1a1fe3(0x200))[_0x1a1fe3(0x2fe)](
        _0x1a1fe3(0x1e6),
      );
      if (!_0x550b33)
        _0x550b33 = parent[_0x1a1fe3(0x2f4)]['itex_classchange2'](
          _0x1a1fe3(0x2d0),
        );
      else
        _0x550b33[_0x1a1fe3(0x33b)](/^\s*\\displaystyle\s*$/)
          ? (_0x550b33 = parent[_0x1a1fe3(0x2f4)]['itex_classchange2'](
              '\x5cclass{itexblank}{@}\x5ccssId{itexcursorbox}{}',
            ))
          : (_0x550b33 = _0x550b33[_0x1a1fe3(0x2d7)](/\\displaystyle\s*/, ''));
      parent[_0x1a1fe3(0x2f4)][_0x1a1fe3(0x1e3)](_0x550b33), app_reset();
    }, 0xa);
}
function child_return_data(_0xa7c859) {
  var _0x4b3831 = _0x403d68;
  handleResize();
  var _0x353171 = MathJax['tex2svg'](
    parent['iTeXEQ'][_0x4b3831(0x2fc)](_0xa7c859),
  );
  if (!_0x353171['querySelector'](_0x4b3831(0x1f5))) {
    var _0x330027 = document[_0x4b3831(0x279)](_0x4b3831(0x200));
    _0x330027['setAttribute'](_0x4b3831(0x1e6), _0xa7c859),
      (_0x330027[_0x4b3831(0x20b)] = ''),
      _0x330027['appendChild'](_0x353171),
      parent['iTeXEQ'][_0x4b3831(0x2c6)](_0x330027),
      (rst_latex = _0xa7c859);
  } else return ![];
  var _0x2563ef = parseFloat(
      parent[_0x4b3831(0x2f4)][_0x4b3831(0x33c)][_0x4b3831(0x2d7)](/px/, ''),
    ),
    _0x37577e =
      parseFloat(
        _0x330027[_0x4b3831(0x279)](_0x4b3831(0x348))
          ['getAttribute']('width')
          ['replace'](/ex/, ''),
      ) *
      (_0x2563ef * 0.8),
    _0x3bebaa =
      parseFloat(
        _0x330027[_0x4b3831(0x279)](_0x4b3831(0x348))
          ['getAttribute'](_0x4b3831(0x2cb))
          [_0x4b3831(0x2d7)](/ex/, ''),
      ) *
      (_0x2563ef * 0.8);
  _0x330027['querySelector'](_0x4b3831(0x348))[_0x4b3831(0x1ff)](
    _0x4b3831(0x1fe),
    _0x37577e + 'px',
  ),
    _0x330027[_0x4b3831(0x279)](_0x4b3831(0x348))[_0x4b3831(0x1ff)](
      _0x4b3831(0x2cb),
      _0x3bebaa + 'px',
    ),
    document[_0x4b3831(0x279)](_0x4b3831(0x200))['addEventListener'](
      evtclk,
      function (_0x1a7c0f) {
        var _0x25d502 = _0x4b3831;
        _0x1a7c0f[_0x25d502(0x1c5)]();
      },
      ![],
    ),
    clear();
  var _0x1336a5 = document[_0x4b3831(0x279)](_0x4b3831(0x331)),
    _0x30b7ea = _0x1336a5['getContext']('2d');
  _0x30b7ea[_0x4b3831(0x2f9)](
    0x0,
    0x0,
    _0x1336a5[_0x4b3831(0x1fe)],
    _0x1336a5['height'],
  ),
    document[_0x4b3831(0x279)](_0x4b3831(0x1d2))[_0x4b3831(0x32e)][
      _0x4b3831(0x2af)
    ]('screen_block') &&
      (document['querySelector']('#tab_img_block')[_0x4b3831(0x32e)][
        _0x4b3831(0x349)
      ](_0x4b3831(0x268)),
      document[_0x4b3831(0x279)]('#tab_img_block')[_0x4b3831(0x32e)][
        _0x4b3831(0x26e)
      ](_0x4b3831(0x1a4))),
    cropper && cropper['destroy']();
}
function ocr_eqn_save(_0x344fc2) {
  return new Promise(function (_0x5c0706, _0x3a4d05) {
    var _0x4926c7 = _0x4f8a,
      _0x137f5b = document[_0x4926c7(0x279)](_0x4926c7(0x200))[
        _0x4926c7(0x220)
      ](_0x4926c7(0x1e6));
    _0x137f5b &&
      (_0x137f5b = _0x137f5b[_0x4926c7(0x2d7)](/\\displaystyle\s*/, '')),
      !_0x137f5b || _0x137f5b[_0x4926c7(0x33b)](/^\s*$/)
        ? (_0x344fc2 && app_reset(), _0x5c0706({ error: _0x4926c7(0x23f) }))
        : ((_0x137f5b = parent[_0x4926c7(0x2f4)][_0x4926c7(0x2fc)](_0x137f5b)),
          parent[_0x4926c7(0x2f4)]
            ['insertEqn'](_0x137f5b)
            [_0x4926c7(0x28c)](([_0x526c34, _0x233e5b, _0x4ed054]) => {
              var _0x2710e7 = _0x4926c7;
              document[_0x2710e7(0x279)]('#mjx-editing-area')[_0x2710e7(0x2fe)](
                'data-latex',
              ),
                app_reset(),
                _0x5c0706([_0x526c34, _0x233e5b, _0x4ed054]);
            }));
  });
}
document[_0x403d68(0x279)](_0x403d68(0x2ab)) &&
  document['querySelector'](_0x403d68(0x2ab))[_0x403d68(0x2e2)](
    evtclk,
    ocrmode_close,
    ![],
  );
function ocrmode_close() {
  var _0x2a95d3 = _0x403d68;
  parent[_0x2a95d3(0x2f4)][_0x2a95d3(0x2ec)] == 'normal'
    ? ocrmode_close_normal()
    : ocrmode_close_custom();
}
function ocrmode_close_normal() {
  var _0x4be5ca = _0x403d68,
    _0x30cad1 = document[_0x4be5ca(0x279)](_0x4be5ca(0x200))[_0x4be5ca(0x220)](
      _0x4be5ca(0x1e6),
    );
  document[_0x4be5ca(0x279)]('#mjx-editing-area')[_0x4be5ca(0x2fe)](
    _0x4be5ca(0x1e6),
  ),
    parent[_0x4be5ca(0x2f4)]['eqn_close'](),
    app_reset(),
    (parent['document']['getElementById'](_0x4be5ca(0x29f))['style'][
      'display'
    ] = _0x4be5ca(0x339));
}
function ocrmode_close_custom() {
  var _0x541db7 = _0x403d68,
    _0x38cd2f = document[_0x541db7(0x279)](_0x541db7(0x200))['getAttribute'](
      _0x541db7(0x1e6),
    );
  document[_0x541db7(0x279)]('#mjx-editing-area')[_0x541db7(0x2fe)](
    _0x541db7(0x1e6),
  ),
    parent['iTeXEQ'][_0x541db7(0x31a)](),
    app_reset();
}
function _0x4f8a(_0x6bf8ac, _0x4a4dd4) {
  var _0x3ee996 = _0x3ee9();
  return (
    (_0x4f8a = function (_0x4f8af1, _0x305e7f) {
      _0x4f8af1 = _0x4f8af1 - 0x1a0;
      var _0x5906fb = _0x3ee996[_0x4f8af1];
      return _0x5906fb;
    }),
    _0x4f8a(_0x6bf8ac, _0x4a4dd4)
  );
}
function ocrmode_hidden() {
  var _0x1af949 = _0x403d68;
  app_reset(),
    (parent['document'][_0x1af949(0x2bd)](_0x1af949(0x29f))['style'][
      _0x1af949(0x240)
    ] = _0x1af949(0x339));
}
function eqn_or_text() {
  var _0x221466 = _0x403d68;
  app_reset();
  if (this['classList'][_0x221466(0x2af)](_0x221466(0x287)))
    (this['textContent'] = 'ko'),
      this[_0x221466(0x32e)][_0x221466(0x349)](_0x221466(0x287)),
      this[_0x221466(0x32e)][_0x221466(0x26e)](_0x221466(0x26f));
  else
    this[_0x221466(0x32e)][_0x221466(0x2af)]('ko_input_mode')
      ? ((this['textContent'] = 'en'),
        this[_0x221466(0x32e)][_0x221466(0x349)]('ko_input_mode'),
        this['classList'][_0x221466(0x26e)](_0x221466(0x2a8)))
      : ((this[_0x221466(0x2a4)] = '수식'),
        this[_0x221466(0x32e)]['remove']('en_input_mode'),
        this['classList'][_0x221466(0x26e)](_0x221466(0x287)));
}
function eqn_convert() {
  return new Promise(function (_0x40a3a7, _0x117d6a) {
    var _0x591e85 = _0x4f8a;
    if (itex_wr_ready == ![]) itex_wr_ready = !![];
    else return console[_0x591e85(0x34b)]('block'), _0x117d6a(![]), ![];
    document['querySelector'](_0x591e85(0x2ce)) &&
      document[_0x591e85(0x279)](_0x591e85(0x2ce))[_0x591e85(0x258)][
        _0x591e85(0x217)
      ](document[_0x591e85(0x279)](_0x591e85(0x2ce)));
    if (!document[_0x591e85(0x279)](_0x591e85(0x1ec))) {
      document[_0x591e85(0x279)](_0x591e85(0x2ce)) &&
        document['querySelector'](_0x591e85(0x2ce))[_0x591e85(0x258)][
          'removeChild'
        ](document['querySelector'](_0x591e85(0x2ce)));
      var _0x58c9ed, _0x9db0c5, _0xc8b191, _0x22deff;
      if (document[_0x591e85(0x279)](_0x591e85(0x289))) {
        var _0x16b0ee = document[_0x591e85(0x279)](_0x591e85(0x289))[
          _0x591e85(0x230)
        ]();
        console[_0x591e85(0x34b)](minX, minY, maxX, maxY),
          _0x16b0ee['width'] > 0x1 && _0x16b0ee[_0x591e85(0x2cb)] > 0x1
            ? ((_0x58c9ed = 0x0), (_0x9db0c5 = 0x0))
            : ((_0x58c9ed = minX - 0x14), (_0x9db0c5 = minY - 0x14)),
          maxX > _0x16b0ee[_0x591e85(0x273)]
            ? (_0xc8b191 = maxX + 0x14)
            : (_0xc8b191 = _0x16b0ee[_0x591e85(0x273)] + 0x14),
          maxY > _0x16b0ee['bottom']
            ? (_0x22deff = maxY + 0x14)
            : (_0x22deff = _0x16b0ee['bottom'] + 0x14),
          _0x58c9ed < 0x0 && (_0x58c9ed = 0x0),
          _0x9db0c5 < 0x0 && (_0x9db0c5 = 0x0),
          _0xc8b191 >
            document[_0x591e85(0x279)](_0x591e85(0x219))[
              'getBoundingClientRect'
            ]()['right'] &&
            (_0xc8b191 = document[_0x591e85(0x279)](_0x591e85(0x219))[
              _0x591e85(0x230)
            ]()[_0x591e85(0x273)]),
          _0x22deff >
            document[_0x591e85(0x279)](_0x591e85(0x219))[
              'getBoundingClientRect'
            ]()[_0x591e85(0x1f9)] &&
            (_0x22deff = document[_0x591e85(0x279)](_0x591e85(0x219))[
              _0x591e85(0x230)
            ]()[_0x591e85(0x1f9)]);
      } else
        (_0x58c9ed = minX - 0x14),
          (_0x9db0c5 = minY - 0x14),
          (_0xc8b191 = maxX + 0x14),
          (_0x22deff = maxY + 0x14);
      html2canvas(document['querySelector'](_0x591e85(0x219)), {
        x: _0x58c9ed,
        y: _0x9db0c5,
        width: _0xc8b191 - _0x58c9ed,
        height: _0x22deff - _0x9db0c5,
        scale: 0x1,
      })[_0x591e85(0x28c)]((_0x388f49) => {
        var _0x1fed70 = _0x591e85,
          _0x2ff2e7 = new Object();
        _0x2ff2e7['src'] = _0x388f49['toDataURL'](_0x1fed70(0x1f6));
        var _0x505c97 = _0x1fed70(0x1f2),
          _0x187c7f = Math[_0x1fed70(0x294)](
            ((_0x2ff2e7[_0x1fed70(0x28a)][_0x1fed70(0x304)] -
              _0x505c97['length']) *
              0x3) /
              0x4,
          );
        mpx_res_dream(_0x2ff2e7);
      });
    }
  });
}
function contrastImage(_0x28f1cc, _0x1966ab) {
  var _0x421620 = _0x403d68,
    _0x685eb4 = _0x28f1cc[_0x421620(0x204)];
  _0x1966ab = _0x1966ab / 0x64 + 0x1;
  var _0x1a28a6 = 0x80 * (0x1 - _0x1966ab);
  for (
    var _0x598536 = 0x0;
    _0x598536 < _0x685eb4[_0x421620(0x304)];
    _0x598536 += 0x4
  ) {
    (_0x685eb4[_0x598536] = _0x685eb4[_0x598536] * _0x1966ab + _0x1a28a6),
      (_0x685eb4[_0x598536 + 0x1] =
        _0x685eb4[_0x598536 + 0x1] * _0x1966ab + _0x1a28a6),
      (_0x685eb4[_0x598536 + 0x2] =
        _0x685eb4[_0x598536 + 0x2] * _0x1966ab + _0x1a28a6);
  }
  return _0x28f1cc;
}
var wsite = document[_0x403d68(0x2dd)](_0x403d68(0x1bc));
for (var i = 0x0; i < wsite[_0x403d68(0x304)]; i++) {
  wsite[i][_0x403d68(0x2e2)](
    evtclk,
    function () {
      var _0x11e561 = _0x403d68;
      if (
        document[_0x11e561(0x279)]('.plot-container') &&
        !wolfram_rst &&
        !document['querySelector']('.cropper-container')
      )
        return alert(_0x11e561(0x2d8)), ![];
      if (this['id'] == _0x11e561(0x245) && wolfram_rst != '')
        return wolfram_call(wolfram_rst), !![];
      (this['id'] == _0x11e561(0x29c) || this['id'] == _0x11e561(0x1c7)) &&
        (popup_window = window[_0x11e561(0x264)]());
      if (this['id'] == _0x11e561(0x29c) && mathpapa_rst != '')
        return mathpapa_call(mathpapa_rst), !![];
      if (this['id'] == 'google' && google_rst != '')
        return google_call(google_rst), !![];
      this[_0x11e561(0x32e)][_0x11e561(0x26e)]('trans_checked');
      if (!document[_0x11e561(0x279)]('.cropper-container'))
        html2canvas(document[_0x11e561(0x279)]('#ui_wrap'), {
          scale: 0x1,
          useCORS: !![],
        })[_0x11e561(0x28c)]((_0x23e7a9) => {
          var _0x2a04ab = _0x11e561,
            _0x247ce8 = new Object(),
            _0x5c5f40 = new Image();
          (_0x5c5f40[_0x2a04ab(0x28a)] = _0x23e7a9[_0x2a04ab(0x30f)](
            _0x2a04ab(0x1f6),
          )),
            (_0x5c5f40['id'] = _0x2a04ab(0x26b)),
            (_0x247ce8[_0x2a04ab(0x28a)] = _0x5c5f40['src']);
          var _0x394b40 = 'data:image/jpeg;base64,',
            _0x4de48f = Math['round'](
              ((_0x5c5f40[_0x2a04ab(0x28a)]['length'] - _0x394b40['length']) *
                0x3) /
                0x4,
            );
          mpx_res(_0x247ce8);
        });
      else {
        var _0x432f9b = new Object(),
          _0x759a36 = new Image();
        (_0x759a36['id'] = _0x11e561(0x26b)),
          (_0x759a36['src'] = getBase64Image(
            cropper['getCroppedCanvas']({ fillColor: _0x11e561(0x2ad) }),
          )),
          (_0x432f9b[_0x11e561(0x28a)] = _0x759a36[_0x11e561(0x28a)]);
        var _0x11c95a = _0x11e561(0x1f2),
          _0x4a5350 = Math[_0x11e561(0x294)](
            ((_0x759a36[_0x11e561(0x28a)][_0x11e561(0x304)] -
              _0x11c95a[_0x11e561(0x304)]) *
              0x3) /
              0x4,
          );
        mpx_res(_0x432f9b);
      }
    },
    ![],
  );
}
function app_reset() {
  var _0x168195 = _0x403d68;
  (document[_0x168195(0x2bd)](_0x168195(0x335))[_0x168195(0x20b)] = ''),
    document[_0x168195(0x2bd)](_0x168195(0x335))[_0x168195(0x1ff)](
      _0x168195(0x1e6),
      '',
    ),
    (document[_0x168195(0x279)](_0x168195(0x253))[_0x168195(0x20b)] =
      _0x168195(0x1b0)),
    clear(),
    (document['getElementById'](_0x168195(0x2a3))[_0x168195(0x20b)] = '');
  var _0xc127e4 = new Image();
  (_0xc127e4['id'] = _0x168195(0x26b)),
    document[_0x168195(0x2bd)](_0x168195(0x2a3))[_0x168195(0x27e)](_0xc127e4),
    (document[_0x168195(0x2bd)](_0x168195(0x316))['style'][_0x168195(0x240)] =
      'none'),
    (document[_0x168195(0x2bd)](_0x168195(0x316))[_0x168195(0x20b)] = ''),
    (document[_0x168195(0x279)](_0x168195(0x2d5))[_0x168195(0x2ae)][
      _0x168195(0x1dc)
    ] = 0x2),
    document[_0x168195(0x2bd)]('eq_box')['setAttribute'](
      _0x168195(0x2f6),
      _0x168195(0x2de),
    ),
    (document['getElementById'](_0x168195(0x218))[_0x168195(0x26c)] = ''),
    cropper && cropper[_0x168195(0x1e4)](),
    (eq_arr = []),
    (wolfram_rst = ''),
    (mathpapa_rst = ''),
    handwriting_pen(),
    document[_0x168195(0x279)](_0x168195(0x253))[_0x168195(0x32e)]['remove'](
      'ans_show',
    ),
    document['querySelector'](_0x168195(0x253))[_0x168195(0x32e)][
      _0x168195(0x26e)
    ](_0x168195(0x23c)),
    (parent[_0x168195(0x2f4)]['drawingcheck'] = ![]),
    (minX = Infinity),
    (minY = Infinity),
    (maxX = -Infinity),
    (maxY = -Infinity);
}
function temp_reset() {
  var _0x30983e = _0x403d68;
  window[_0x30983e(0x2fb)][_0x30983e(0x1ea)]();
}
document[_0x403d68(0x2bd)](_0x403d68(0x249))['addEventListener'](
  _0x403d68(0x1fd),
  function () {
    var _0x24b55f = _0x403d68;
    if (this['files'] && this[_0x24b55f(0x212)][0x0]) {
      var _0xa19e0b = new FileReader();
      _0xa19e0b[_0x24b55f(0x2e2)](_0x24b55f(0x2cf), function (_0x45a631) {
        var _0x241fbb = _0x24b55f,
          _0x3b116f = document[_0x241fbb(0x2bd)](_0x241fbb(0x26b));
        (_0x3b116f[_0x241fbb(0x28a)] =
          _0x45a631[_0x241fbb(0x2e1)][_0x241fbb(0x354)]),
          (cropper = new Cropper(_0x3b116f, { viewMode: 0x0 }));
      }),
        _0xa19e0b[_0x24b55f(0x315)](this[_0x24b55f(0x212)][0x0]);
    }
  },
  ![],
);
function getBase64Image(_0x38f79a) {
  var _0x4719d7 = _0x403d68,
    _0x1d6b9c = document['createElement'](_0x4719d7(0x1d9)),
    _0x50588f = 0x190,
    _0x3867df = 0x190,
    _0x41986f = _0x38f79a[_0x4719d7(0x1fe)],
    _0x139a02 = _0x38f79a[_0x4719d7(0x2cb)];
  _0x41986f > _0x139a02
    ? _0x41986f > _0x50588f &&
      ((_0x139a02 *= _0x50588f / _0x41986f), (_0x41986f = _0x50588f))
    : _0x139a02 > _0x3867df &&
      ((_0x41986f *= _0x3867df / _0x139a02), (_0x139a02 = _0x3867df));
  _0x41986f < 0x190
    ? ((_0x1d6b9c[_0x4719d7(0x1fe)] = 0x190),
      (_0x1d6b9c[_0x4719d7(0x2cb)] = _0x139a02 * (0x190 / _0x41986f)))
    : ((_0x1d6b9c[_0x4719d7(0x1fe)] = _0x41986f),
      (_0x1d6b9c[_0x4719d7(0x2cb)] = _0x139a02));
  var _0x3d0ca8 = _0x1d6b9c[_0x4719d7(0x221)]('2d');
  return (
    _0x3d0ca8[_0x4719d7(0x29a)](_0x38f79a, 0x0, 0x0, _0x41986f, _0x139a02),
    (dataURL = _0x1d6b9c[_0x4719d7(0x30f)](_0x4719d7(0x1f6)))
  );
}
function dataURItoBlob(_0x16a24c, _0x1d81d3) {
  var _0x2e0ac6 = _0x403d68,
    _0x554c7a;
  if (_0x16a24c[_0x2e0ac6(0x1f0)](',')[0x0][_0x2e0ac6(0x21e)]('base64') >= 0x0)
    _0x554c7a = atob(_0x16a24c[_0x2e0ac6(0x1f0)](',')[0x1]);
  else _0x554c7a = unescape(_0x16a24c[_0x2e0ac6(0x1f0)](',')[0x1]);
  var _0x4ceb69 = _0x16a24c[_0x2e0ac6(0x1f0)](',')[0x0]
      ['split'](':')[0x1]
      [_0x2e0ac6(0x1f0)](';')[0x0],
    _0x4f5745 = new Uint8Array(_0x554c7a['length']);
  for (
    var _0x50d1b7 = 0x0;
    _0x50d1b7 < _0x554c7a[_0x2e0ac6(0x304)];
    _0x50d1b7++
  ) {
    _0x4f5745[_0x50d1b7] = _0x554c7a[_0x2e0ac6(0x346)](_0x50d1b7);
  }
  return new Blob([_0x4f5745], { type: _0x4ceb69 });
}
function textRecognize() {
  var _0x3ee2c9 = _0x403d68,
    _0x4736eb = 'ko';
  document['querySelector'](_0x3ee2c9(0x33f)) && (_0x4736eb = 'en');
  var _0x4a45b1 = JSON[_0x3ee2c9(0x210)]({
      options: _0x3ee2c9(0x1a5),
      requests: [
        {
          writing_guide: {
            writing_area_width:
              document[_0x3ee2c9(0x2bd)](_0x3ee2c9(0x1bb))[_0x3ee2c9(0x1fe)] ||
              this[_0x3ee2c9(0x1fe)] ||
              undefined,
            writing_area_height:
              document[_0x3ee2c9(0x2bd)](_0x3ee2c9(0x1bb))[_0x3ee2c9(0x2cb)] ||
              this[_0x3ee2c9(0x1fe)] ||
              undefined,
          },
          ink: traces,
          language: _0x4736eb || 'ko',
        },
      ],
    }),
    _0x42468c = new XMLHttpRequest();
  _0x42468c['addEventListener'](_0x3ee2c9(0x228), function () {
    var _0x309d4c = _0x3ee2c9;
    if (this[_0x309d4c(0x29b)] === 0x4 && this[_0x309d4c(0x22b)] === 0xc8) {
      var _0x359c22 = JSON[_0x309d4c(0x21f)](this[_0x309d4c(0x1b3)]),
        _0x12ab78 = _0x359c22[0x1][0x0][0x1];
      clear(), (traces = []);
      var _0x51a92d = document[_0x309d4c(0x1b1)](_0x12ab78[0x0]),
        _0x8655f6 = document[_0x309d4c(0x22f)](_0x309d4c(0x1de));
      _0x8655f6[_0x309d4c(0x27e)](_0x51a92d);
      var _0x485d53 = document[_0x309d4c(0x279)](_0x309d4c(0x200));
      (_0x485d53['innerHTML'] = ''),
        _0x485d53[_0x309d4c(0x27e)](_0x8655f6),
        (document['getElementById']('tab_hand_block')['style'][
          _0x309d4c(0x1dc)
        ] = 0x1),
        (document[_0x309d4c(0x2bd)](_0x309d4c(0x25d))[_0x309d4c(0x2ae)][
          _0x309d4c(0x1dc)
        ] = 0x2),
        document[_0x309d4c(0x2bd)](_0x309d4c(0x32b))[_0x309d4c(0x32e)][
          'remove'
        ](_0x309d4c(0x2c0)),
        document[_0x309d4c(0x2bd)](_0x309d4c(0x2f2))[_0x309d4c(0x32e)][
          'remove'
        ](_0x309d4c(0x2c0)),
        document['getElementById'](_0x309d4c(0x341))[_0x309d4c(0x32e)]['add'](
          _0x309d4c(0x2c0),
        );
      var _0x389f6a = document[_0x309d4c(0x2bd)](_0x309d4c(0x1e9));
      _0x389f6a[_0x309d4c(0x20b)] = '';
      for (
        var _0x32edfd = 0x0;
        _0x32edfd < _0x12ab78[_0x309d4c(0x304)];
        _0x32edfd++
      ) {
        var _0x4c3c95 = document['createElement'](_0x309d4c(0x1de));
        (_0x4c3c95[_0x309d4c(0x1ca)] = _0x309d4c(0x248)),
          (_0x4c3c95['textContent'] = _0x12ab78[_0x32edfd]),
          _0x389f6a[_0x309d4c(0x27e)](_0x4c3c95);
      }
      _0x8655f6[_0x309d4c(0x2e2)](
        evtclk,
        function (_0x21119d) {
          var _0x55991d = _0x309d4c;
          _0x21119d[_0x55991d(0x1c5)](),
            document['getElementById'](_0x55991d(0x1e9))[_0x55991d(0x32e)][
              _0x55991d(0x2b1)
            ](_0x55991d(0x1e5));
        },
        ![],
      );
      var _0x16d102 = document['querySelectorAll'](_0x309d4c(0x242));
      for (var _0x32edfd = 0x0; _0x32edfd < _0x16d102['length']; _0x32edfd++) {
        _0x16d102[_0x32edfd][_0x309d4c(0x2e2)](
          evtclk,
          function () {
            var _0x2ad70f = _0x309d4c;
            (_0x8655f6[_0x2ad70f(0x2a4)] = this[_0x2ad70f(0x2a4)]),
              document[_0x2ad70f(0x2bd)]('myPopup')[_0x2ad70f(0x32e)]['remove'](
                _0x2ad70f(0x1e5),
              );
          },
          ![],
        );
      }
    }
  }),
    _0x42468c[_0x3ee2c9(0x264)](_0x3ee2c9(0x222), _0x3ee2c9(0x1d5)),
    _0x42468c[_0x3ee2c9(0x286)](_0x3ee2c9(0x2ed), _0x3ee2c9(0x250)),
    _0x42468c['send'](_0x4a45b1);
}
function mpx_res(_0x46d491) {
  return new Promise(function (_0x45ae8d, _0x32880c) {
    var _0xd4683c = _0x4f8a;
    try {
      document[_0xd4683c(0x2bd)](_0xd4683c(0x25d))['classList']['add'](
        _0xd4683c(0x1ee),
      ),
        document[_0xd4683c(0x2bd)](_0xd4683c(0x229))['classList'][
          _0xd4683c(0x26e)
        ](_0xd4683c(0x1ee));
      var _0x55fc27 = new FormData();
      _0x55fc27[_0xd4683c(0x2da)](
        _0xd4683c(0x2a9),
        dataURItoBlob(_0x46d491[_0xd4683c(0x28a)], _0xd4683c(0x1b9)),
      );
      var _0x39874e = new XMLHttpRequest();
      _0x39874e[_0xd4683c(0x264)]('POST', eqn_ocr_url, !![]),
        _0x39874e[_0xd4683c(0x286)](_0xd4683c(0x27b), ocr_header_key),
        _0x39874e[_0xd4683c(0x353)](_0x55fc27),
        (_0x39874e[_0xd4683c(0x319)] = function () {
          var _0x18ccc1 = _0xd4683c;
          if (
            _0x39874e[_0x18ccc1(0x29b)] == 0x4 &&
            _0x39874e['status'] == 0xc8
          ) {
            var _0x2073e7 = JSON[_0x18ccc1(0x21f)](_0x39874e['responseText']);
            if (_0x2073e7[_0x18ccc1(0x297)])
              return (
                alert(_0x18ccc1(0x1ab) + _0x2073e7['error']),
                loader_hide(),
                (btn_gp = ![]),
                _0x32880c(![]),
                ![]
              );
            command_gen(_0x2073e7),
              eqn_render(_0x2073e7['etoos_latex'][0x0]),
              document['getElementById'](_0x18ccc1(0x25d))[_0x18ccc1(0x32e)][
                _0x18ccc1(0x349)
              ]('eqn_tranfer'),
              document['getElementById'](_0x18ccc1(0x229))[_0x18ccc1(0x32e)][
                'remove'
              ](_0x18ccc1(0x1ee)),
              (wolfram_rst = _0x2073e7[_0x18ccc1(0x245)]),
              (mathpapa_rst = _0x2073e7[_0x18ccc1(0x263)]),
              (google_rst = _0x2073e7[_0x18ccc1(0x245)]),
              (candidate = _0x2073e7[_0x18ccc1(0x22a)]),
              (candidate_temp = JSON[_0x18ccc1(0x21f)](
                JSON['stringify'](candidate),
              )),
              (document[_0x18ccc1(0x2bd)](_0x18ccc1(0x229))['style']['zIndex'] =
                0x1),
              (document['getElementById'](_0x18ccc1(0x25d))[_0x18ccc1(0x2ae)][
                _0x18ccc1(0x1dc)
              ] = 0x2),
              (parent[_0x18ccc1(0x2f4)]['drawingcheck'] = ![]),
              _0x45ae8d(!![]);
            if (
              document[_0x18ccc1(0x2bd)](_0x18ccc1(0x245))[_0x18ccc1(0x32e)][
                'contains'
              ](_0x18ccc1(0x2a0))
            )
              console[_0x18ccc1(0x34b)](wolfram_rst), wolfram_call(wolfram_rst);
            else {
              if (
                document[_0x18ccc1(0x2bd)](_0x18ccc1(0x29c))[_0x18ccc1(0x32e)][
                  _0x18ccc1(0x2af)
                ]('trans_checked')
              )
                console[_0x18ccc1(0x34b)](mathpapa_rst),
                  mathpapa_call(mathpapa_rst);
              else {
                if (
                  document[_0x18ccc1(0x2bd)](_0x18ccc1(0x1c7))['classList'][
                    _0x18ccc1(0x2af)
                  ](_0x18ccc1(0x2a0))
                )
                  console[_0x18ccc1(0x34b)](google_rst),
                    google_call(google_rst);
                else {
                }
              }
            }
            itex_wr_ready = ![];
          } else itex_wr_ready = ![];
        });
    } catch (_0x343d35) {
      console[_0xd4683c(0x34b)]('mpx_res\x20error:\x20', _0x343d35),
        (itex_wr_ready = ![]);
    }
  });
}
function mpx_res_dream(_0x1aa4d6) {
  return new Promise(function (_0x31abb6, _0x31c486) {
    var _0x5b6aa2 = _0x4f8a;
    try {
      document[_0x5b6aa2(0x2bd)]('eqn_wrap')[_0x5b6aa2(0x32e)][
        _0x5b6aa2(0x26e)
      ](_0x5b6aa2(0x1ee)),
        document[_0x5b6aa2(0x2bd)]('tab_hand_block')['classList'][
          _0x5b6aa2(0x26e)
        ](_0x5b6aa2(0x1ee)),
        console[_0x5b6aa2(0x34b)](_0x1aa4d6[_0x5b6aa2(0x28a)]);
      var _0x4a7d9c = new FormData();
      _0x4a7d9c['append'](
        'upload',
        dataURItoBlob(_0x1aa4d6['src'], _0x5b6aa2(0x1b9)),
      );
      var _0x5da741 = new XMLHttpRequest();
      _0x5da741[_0x5b6aa2(0x264)](
        _0x5b6aa2(0x222),
        window[_0x5b6aa2(0x301)][_0x5b6aa2(0x1a7)] + _0x5b6aa2(0x24e),
        !![],
      ),
        _0x5da741[_0x5b6aa2(0x353)](_0x4a7d9c),
        (_0x5da741[_0x5b6aa2(0x319)] = function () {
          var _0x379997 = _0x5b6aa2;
          if (
            _0x5da741[_0x379997(0x29b)] == 0x4 &&
            _0x5da741[_0x379997(0x22b)] == 0xc8
          ) {
            var _0x20d7a4 = JSON[_0x379997(0x21f)](_0x5da741[_0x379997(0x1b3)]);
            console['log'](_0x20d7a4);
            if (_0x20d7a4[_0x379997(0x297)])
              return (
                alert(_0x379997(0x1ab) + _0x20d7a4[_0x379997(0x297)]),
                loader_hide(),
                (btn_gp = ![]),
                _0x31c486(![]),
                ![]
              );
            command_gen(_0x20d7a4[0x0]),
              eqn_render(_0x20d7a4[0x0]['latexs'][0x0]),
              document[_0x379997(0x2bd)](_0x379997(0x25d))[_0x379997(0x32e)][
                _0x379997(0x349)
              ](_0x379997(0x1ee)),
              document['getElementById'](_0x379997(0x229))[_0x379997(0x32e)][
                _0x379997(0x349)
              ]('eqn_tranfer'),
              (wolfram_rst = _0x20d7a4[0x0][_0x379997(0x245)]),
              (mathpapa_rst = _0x20d7a4[0x0][_0x379997(0x263)]),
              (google_rst = _0x20d7a4[0x0][_0x379997(0x245)]),
              (candidate = _0x20d7a4[0x0][_0x379997(0x22a)]),
              (candidate_temp = JSON[_0x379997(0x21f)](
                JSON[_0x379997(0x210)](candidate),
              )),
              (document[_0x379997(0x2bd)](_0x379997(0x229))[_0x379997(0x2ae)][
                _0x379997(0x1dc)
              ] = 0x1),
              (document['getElementById'](_0x379997(0x25d))[_0x379997(0x2ae)][
                _0x379997(0x1dc)
              ] = 0x2),
              (parent['iTeXEQ']['drawingcheck'] = ![]),
              _0x31abb6(!![]);
            if (
              document[_0x379997(0x2bd)](_0x379997(0x245))[_0x379997(0x32e)][
                'contains'
              ](_0x379997(0x2a0))
            )
              console[_0x379997(0x34b)](wolfram_rst), wolfram_call(wolfram_rst);
            else {
              if (
                document[_0x379997(0x2bd)](_0x379997(0x29c))[_0x379997(0x32e)][
                  _0x379997(0x2af)
                ](_0x379997(0x2a0))
              )
                console[_0x379997(0x34b)](mathpapa_rst),
                  mathpapa_call(mathpapa_rst);
              else
                document[_0x379997(0x2bd)](_0x379997(0x1c7))[_0x379997(0x32e)][
                  _0x379997(0x2af)
                ](_0x379997(0x2a0)) &&
                  (console['log'](google_rst), google_call(google_rst));
            }
            itex_wr_ready = ![];
          } else itex_wr_ready = ![];
        });
    } catch (_0x2d4b34) {
      console[_0x5b6aa2(0x34b)](_0x5b6aa2(0x355), _0x2d4b34),
        (itex_wr_ready = ![]);
    }
  });
}
function background_evt(_0x44c7e3) {
  var _0x4d3027 = _0x403d68;
  _0x44c7e3[_0x4d3027(0x1c5)](),
    document['getElementById']('myPopup')[_0x4d3027(0x32e)][_0x4d3027(0x349)](
      _0x4d3027(0x1e5),
    ),
    document[_0x4d3027(0x279)]('#mjx-editing-area\x20.sel_elem') &&
      document[_0x4d3027(0x279)](_0x4d3027(0x1b2))[_0x4d3027(0x32e)][
        _0x4d3027(0x349)
      ]('sel_elem'),
    (document[_0x4d3027(0x2bd)](_0x4d3027(0x229))['style'][_0x4d3027(0x1dc)] =
      0x2),
    (document[_0x4d3027(0x2bd)](_0x4d3027(0x25d))[_0x4d3027(0x2ae)][
      _0x4d3027(0x1dc)
    ] = 0x1);
}
function command_gen(_0x68beb4) {
  var _0x531da0 = _0x403d68;
  for (
    var _0xde34c6 = 0x0;
    _0xde34c6 < _0x68beb4[_0x531da0(0x22a)][0x0]['length'];
    _0xde34c6++
  ) {
    var _0x362dd4 = _0x68beb4[_0x531da0(0x22a)][0x0][_0xde34c6];
    for (
      var _0x4db433 = 0x0;
      _0x4db433 < _0x362dd4[_0x531da0(0x304)];
      _0x4db433++
    ) {
      var _0x1f0938 = _0x362dd4[_0x4db433];
      (_0x1f0938 = _0x1f0938[_0x531da0(0x2d7)](/\\textrm/g, _0x531da0(0x24a))),
        (_0x1f0938 = _0x1f0938[_0x531da0(0x2d7)](/\/\//g, '⫽')),
        (_0x1f0938 = _0x1f0938['replace'](/\\mathrm\{⫽\}/g, '⫽')),
        (_0x1f0938 = _0x1f0938[_0x531da0(0x2d7)](/\\sim/g, '〜')),
        (_0x1f0938 = _0x1f0938[_0x531da0(0x2d7)](/\\mathrm\{∽\}/g, '∼')),
        (_0x1f0938 = _0x1f0938['replace'](/\\bigcirc/g, '○')),
        (_0x1f0938 = _0x1f0938[_0x531da0(0x2d7)](/\\vert/g, '|')),
        (_0x1f0938 = _0x1f0938[_0x531da0(0x2d7)](
          /\\begin\{cases\}/g,
          '{\x5cleft\x5c{\x5cbegin{array}{l}',
        )),
        (_0x1f0938 = _0x1f0938[_0x531da0(0x2d7)](
          /\\end{cases}/g,
          _0x531da0(0x293),
        )),
        (_0x362dd4[_0x4db433] = _0x1f0938);
    }
  }
  var _0x5f17ea = _0x68beb4[_0x531da0(0x2b2)][0x0];
  (_0x5f17ea = _0x5f17ea[_0x531da0(0x2d7)](/\\textrm/g, _0x531da0(0x24a))),
    (_0x5f17ea = _0x5f17ea[_0x531da0(0x2d7)](/\/\//g, '⫽')),
    (_0x5f17ea = _0x5f17ea[_0x531da0(0x2d7)](/\\mathrm\{⫽\}/g, '⫽')),
    (_0x5f17ea = _0x5f17ea[_0x531da0(0x2d7)](/\\sim/g, '〜')),
    (_0x5f17ea = _0x5f17ea[_0x531da0(0x2d7)](/\\mathrm\{∽\}/g, '∼')),
    (_0x5f17ea = _0x5f17ea[_0x531da0(0x2d7)](/\\bigcirc/g, '○')),
    (_0x5f17ea = _0x5f17ea[_0x531da0(0x2d7)](/\\vert/g, '|')),
    (_0x5f17ea = _0x5f17ea[_0x531da0(0x2d7)](
      /\\begin\{cases\}/g,
      _0x531da0(0x2b8),
    )),
    (_0x5f17ea = _0x5f17ea[_0x531da0(0x2d7)](
      /\\end{cases}/g,
      '\x5cend{array}\x5cright.}',
    )),
    (_0x68beb4[_0x531da0(0x2b2)][0x0] = _0x5f17ea);
}
function eqn_render(_0x5ace12) {
  var _0x2d57f1 = _0x403d68;
  (_0x5ace12 = _0x5ace12[_0x2d57f1(0x2d7)](
    /(\\sqrt\s)\[(\s.*?\s)\]/g,
    '$1@@$2##',
  )),
    (_0x5ace12 = _0x5ace12[_0x2d57f1(0x2d7)](/\\sim/g, '〜'));
  var _0x244fac = [],
    _0x3f8c04 = _0x5ace12[_0x2d57f1(0x1f0)]('\x20'),
    _0x1eea76 = [
      _0x2d57f1(0x232),
      _0x2d57f1(0x2e3),
      _0x2d57f1(0x262),
      _0x2d57f1(0x34d),
      _0x2d57f1(0x309),
      _0x2d57f1(0x30d),
      '^\x5c\x5cOmega$',
      '^\x5c\x5cvarepsilon$',
      _0x2d57f1(0x322),
      _0x2d57f1(0x321),
      '^\x5c\x5cnotin$',
      '^\x5c\x5csubset$',
      _0x2d57f1(0x211),
      _0x2d57f1(0x266),
      _0x2d57f1(0x308),
      _0x2d57f1(0x1a8),
      _0x2d57f1(0x265),
      '^\x5c]$',
      _0x2d57f1(0x296),
      _0x2d57f1(0x1dd),
      _0x2d57f1(0x338),
      _0x2d57f1(0x20a),
      _0x2d57f1(0x1b5),
      _0x2d57f1(0x1df),
      _0x2d57f1(0x1d0),
      _0x2d57f1(0x2bc),
      _0x2d57f1(0x323),
      _0x2d57f1(0x274),
      '^\x5c\x5cgeq$',
      '^\x5c\x5cleq$',
      '^\x5c\x5cequiv$',
      _0x2d57f1(0x2a1),
      _0x2d57f1(0x278),
      _0x2d57f1(0x2b9),
      _0x2d57f1(0x280),
      _0x2d57f1(0x1a6),
      _0x2d57f1(0x1c0),
      _0x2d57f1(0x2e0),
      _0x2d57f1(0x24d),
      _0x2d57f1(0x34e),
      _0x2d57f1(0x1b4),
      _0x2d57f1(0x2db),
      _0x2d57f1(0x1ef),
      '^\x5c\x5cphi$',
      '^\x5c\x5crho$',
      _0x2d57f1(0x244),
      _0x2d57f1(0x329),
      '^\x5c\x5cwedge$',
      _0x2d57f1(0x2a6),
      _0x2d57f1(0x314),
      _0x2d57f1(0x1cf),
      '^\x5c\x5csim$',
      '^\x5c\x5cforall$',
      _0x2d57f1(0x21d),
      '^\x5c\x5cmu$',
      _0x2d57f1(0x25b),
      _0x2d57f1(0x2c1),
      _0x2d57f1(0x27d),
      '^\x5c\x5cneq$',
      _0x2d57f1(0x1f3),
      _0x2d57f1(0x34c),
      '^\x5c\x5cotimes$',
      _0x2d57f1(0x1d4),
      _0x2d57f1(0x203),
      _0x2d57f1(0x1b7),
      _0x2d57f1(0x2bf),
      _0x2d57f1(0x251),
      _0x2d57f1(0x2e9),
      _0x2d57f1(0x30b),
      _0x2d57f1(0x33e),
      _0x2d57f1(0x2cc),
      _0x2d57f1(0x24c),
      _0x2d57f1(0x254),
      '^\x5c\x5ccot$',
      _0x2d57f1(0x328),
      _0x2d57f1(0x1f7),
      _0x2d57f1(0x237),
      _0x2d57f1(0x214),
      _0x2d57f1(0x2a7),
      _0x2d57f1(0x1c9),
      _0x2d57f1(0x2f8),
      _0x2d57f1(0x247),
      _0x2d57f1(0x2f7),
      _0x2d57f1(0x256),
      _0x2d57f1(0x310),
      _0x2d57f1(0x340),
      _0x2d57f1(0x344),
      _0x2d57f1(0x2ff),
    ];
  for (
    var _0x4d4fa1 = 0x0;
    _0x4d4fa1 < _0x3f8c04[_0x2d57f1(0x304)];
    _0x4d4fa1++
  ) {
    var _0x404b5b = !![];
    for (var _0x134fe5 = 0x0; _0x134fe5 < _0x1eea76['length']; _0x134fe5++) {
      var _0xb09a97 = new RegExp(_0x1eea76[_0x134fe5]);
      _0xb09a97[_0x2d57f1(0x255)](_0x3f8c04[_0x4d4fa1]) &&
        (_0x244fac[_0x2d57f1(0x350)](
          _0x2d57f1(0x28f) + _0x4d4fa1 + '}{' + _0x3f8c04[_0x4d4fa1] + '}}',
        ),
        (_0x404b5b = ![]));
    }
    _0x404b5b === !![] && _0x244fac['push'](_0x3f8c04[_0x4d4fa1]);
  }
  var _0x541d05 = _0x244fac[_0x2d57f1(0x307)]('\x20');
  (_0x541d05 = _0x541d05[_0x2d57f1(0x2d7)](/^/, _0x2d57f1(0x311))),
    (_0x541d05 = _0x541d05['replace'](/(\\lim\}\})/, _0x2d57f1(0x1a1))),
    (_0x541d05 = _0x541d05[_0x2d57f1(0x2d7)](/(\\sum\}\})/, _0x2d57f1(0x1a1))),
    (_0x541d05 = _0x541d05[_0x2d57f1(0x2d7)](/@@/g, '[')),
    (_0x541d05 = _0x541d05[_0x2d57f1(0x2d7)](/##/g, ']'));
  var _0x564e5e = MathJax[_0x2d57f1(0x300)](_0x541d05);
  if (!_0x564e5e['querySelector'](_0x2d57f1(0x1f5))) {
    var _0x48aaf5 = document[_0x2d57f1(0x279)](_0x2d57f1(0x200));
    _0x48aaf5[_0x2d57f1(0x1ff)](_0x2d57f1(0x1e6), _0x2d57f1(0x311) + _0x5ace12),
      (_0x48aaf5[_0x2d57f1(0x20b)] = ''),
      _0x48aaf5[_0x2d57f1(0x27e)](_0x564e5e),
      parent['iTeXEQ']['symbol_change'](_0x48aaf5),
      (rst_latex = _0x5ace12);
  } else
    return (
      (candidate = JSON['parse'](JSON[_0x2d57f1(0x210)](candidate_temp))), ![]
    );
  var _0x1442e6 = parseFloat(
      parent[_0x2d57f1(0x2f4)][_0x2d57f1(0x33c)][_0x2d57f1(0x2d7)](/px/, ''),
    ),
    _0x3bd9d0 =
      parseFloat(
        _0x48aaf5[_0x2d57f1(0x279)](_0x2d57f1(0x348))
          [_0x2d57f1(0x220)]('width')
          [_0x2d57f1(0x2d7)](/ex/, ''),
      ) *
      (_0x1442e6 * 0.8),
    _0x57b8a7 =
      parseFloat(
        _0x48aaf5[_0x2d57f1(0x279)](_0x2d57f1(0x348))
          [_0x2d57f1(0x220)](_0x2d57f1(0x2cb))
          [_0x2d57f1(0x2d7)](/ex/, ''),
      ) *
      (_0x1442e6 * 0.8);
  _0x48aaf5['querySelector'](_0x2d57f1(0x348))['setAttribute'](
    'width',
    _0x3bd9d0 + 'px',
  ),
    _0x48aaf5['querySelector'](_0x2d57f1(0x348))[_0x2d57f1(0x1ff)](
      _0x2d57f1(0x2cb),
      _0x57b8a7 + 'px',
    );
  var _0xe4f99c = _0x48aaf5[_0x2d57f1(0x2dd)](_0x2d57f1(0x1c1));
  for (var _0x4d4fa1 = 0x0; _0x4d4fa1 < _0xe4f99c['length']; _0x4d4fa1++) {
    var _0x3f98a5 = create_selbox(_0xe4f99c[_0x4d4fa1]);
    _0xe4f99c[_0x4d4fa1][_0x2d57f1(0x283)](
      _0x3f98a5,
      _0xe4f99c[_0x4d4fa1][_0x2d57f1(0x2e7)],
    ),
      _0x3f98a5[_0x2d57f1(0x2e2)](
        evtclk,
        function (_0x4b19c1) {
          var _0x1aaf25 = _0x2d57f1;
          _0x4b19c1[_0x1aaf25(0x1c5)](), eqn_element_evt(this, !![]);
        },
        ![],
      ),
      _0xe4f99c[_0x4d4fa1][_0x2d57f1(0x2e2)](
        evtclk,
        function (_0x2e3d1a) {
          var _0xe9edcb = _0x2d57f1;
          _0x2e3d1a[_0xe9edcb(0x1c5)](), eqn_element_evt(this, ![]);
        },
        ![],
      );
  }
  document['querySelector'](_0x2d57f1(0x200))[_0x2d57f1(0x2e2)](
    evtclk,
    function (_0x2bb49f) {
      var _0x482905 = _0x2d57f1;
      _0x2bb49f[_0x482905(0x1c5)](),
        document[_0x482905(0x2bd)](_0x482905(0x1e9))[_0x482905(0x32e)][
          _0x482905(0x349)
        ](_0x482905(0x1e5)),
        document[_0x482905(0x279)](_0x482905(0x1b2)) &&
          document[_0x482905(0x279)](_0x482905(0x1b2))['classList'][
            _0x482905(0x349)
          ](_0x482905(0x25a)),
        (document[_0x482905(0x2bd)]('tab_hand_block')[_0x482905(0x2ae)][
          _0x482905(0x1dc)
        ] = 0x2),
        (document[_0x482905(0x2bd)](_0x482905(0x25d))[_0x482905(0x2ae)][
          _0x482905(0x1dc)
        ] = 0x1);
    },
    ![],
  ),
    document[_0x2d57f1(0x279)](_0x2d57f1(0x30e))[_0x2d57f1(0x2e2)](
      evtclk,
      function (_0x3ace85) {
        _0x3ace85['stopPropagation']();
      },
      ![],
    ),
    clear(),
    document[_0x2d57f1(0x279)]('#tab_img_block')[_0x2d57f1(0x32e)][
      _0x2d57f1(0x2af)
    ](_0x2d57f1(0x268)) &&
      (document[_0x2d57f1(0x279)](_0x2d57f1(0x1d2))[_0x2d57f1(0x32e)][
        _0x2d57f1(0x349)
      ]('screen_block'),
      document[_0x2d57f1(0x279)](_0x2d57f1(0x1d2))[_0x2d57f1(0x32e)][
        _0x2d57f1(0x26e)
      ](_0x2d57f1(0x1a4))),
    cropper && cropper['destroy']();
}
function eqn_element_evt(_0x401872, _0x535d8b) {
  var _0x1d0a74 = _0x403d68;
  candidate_temp = JSON[_0x1d0a74(0x21f)](JSON[_0x1d0a74(0x210)](candidate));
  document['querySelector'](_0x1d0a74(0x1b2)) &&
    document[_0x1d0a74(0x279)]('#mjx-editing-area\x20.sel_elem')[
      _0x1d0a74(0x32e)
    ][_0x1d0a74(0x349)](_0x1d0a74(0x25a));
  var _0x52ac6b;
  _0x535d8b
    ? ((_0x52ac6b = parseInt(
        _0x401872[_0x1d0a74(0x258)]
          [_0x1d0a74(0x2b3)]('', _0x1d0a74(0x337))
          [_0x1d0a74(0x1f0)]('\x20')[0x1]
          ['split']('_')[0x1],
      )),
      _0x401872[_0x1d0a74(0x258)][_0x1d0a74(0x32e)][_0x1d0a74(0x26e)](
        _0x1d0a74(0x25a),
      ))
    : ((_0x52ac6b = parseInt(
        _0x401872[_0x1d0a74(0x2b3)]('', _0x1d0a74(0x337))
          [_0x1d0a74(0x1f0)]('\x20')[0x1]
          ['split']('_')[0x1],
      )),
      _0x401872[_0x1d0a74(0x32e)]['add']('sel_elem'));
  var _0xe6d2b2 = document[_0x1d0a74(0x2bd)]('myPopup');
  (_0xe6d2b2[_0x1d0a74(0x20b)] = ''),
    _0xe6d2b2['classList'][_0x1d0a74(0x2af)](_0x1d0a74(0x1e5)) &&
      _0xe6d2b2['classList'][_0x1d0a74(0x349)]('tipshow'),
    setTimeout(function () {
      var _0x3206e8 = _0x1d0a74;
      _0xe6d2b2[_0x3206e8(0x32e)]['add'](_0x3206e8(0x1e5));
      var _0x26723b = candidate[0x0][_0x52ac6b];
      for (
        var _0x352a68 = 0x0;
        _0x352a68 < _0x26723b[_0x3206e8(0x304)];
        _0x352a68++
      ) {
        try {
          _0xe6d2b2['appendChild'](
            MathJax[_0x3206e8(0x300)](_0x26723b[_0x352a68]),
          ),
            parent[_0x3206e8(0x2f4)]['symbol_change'](_0xe6d2b2),
            _0xe6d2b2[_0x3206e8(0x2dd)](_0x3206e8(0x22e))[_0x352a68][
              _0x3206e8(0x279)
            ](_0x3206e8(0x1f5)) &&
              (_0xe6d2b2[_0x3206e8(0x2dd)](_0x3206e8(0x22e))[_0x352a68][
                _0x3206e8(0x2ae)
              ]['display'] = _0x3206e8(0x339));
        } catch (_0x3de9dd) {
          _0xe6d2b2[_0x3206e8(0x27e)](
            document[_0x3206e8(0x1b1)](_0x3206e8(0x297)),
          );
        }
      }
      var _0x28cadb = document[_0x3206e8(0x2dd)](_0x3206e8(0x23a));
      for (
        var _0x352a68 = 0x0;
        _0x352a68 < _0x28cadb[_0x3206e8(0x304)];
        _0x352a68++
      ) {
        _0x28cadb[_0x352a68]['setAttribute'](
          _0x3206e8(0x240),
          _0x3206e8(0x1e7),
        ),
          _0x28cadb[_0x352a68][_0x3206e8(0x1ff)](
            _0x3206e8(0x202),
            _0x52ac6b + ';' + _0x352a68,
          ),
          _0x28cadb[_0x352a68]['addEventListener'](
            evtclk,
            function () {
              var _0x3388de = _0x3206e8,
                _0x228c2c = this['getAttribute']('data-num')['split'](';'),
                _0x8437f6 = rst_latex[_0x3388de(0x1f0)]('\x20');
              (_0x8437f6[parseInt(_0x228c2c[0x0])] =
                candidate[0x0][parseInt(_0x228c2c[0x0])][_0x228c2c[0x1]]),
                (rst_latex = _0x8437f6[_0x3388de(0x307)]('\x20')),
                console[_0x3388de(0x34b)](rst_latex),
                eqn_render(_0x8437f6[_0x3388de(0x307)]('\x20')),
                document[_0x3388de(0x2bd)](_0x3388de(0x1e9))[_0x3388de(0x32e)][
                  'remove'
                ](_0x3388de(0x1e5));
            },
            ![],
          );
      }
      var _0x523c9a = document[_0x3206e8(0x22f)](_0x3206e8(0x1de));
      _0x523c9a[_0x3206e8(0x32e)][_0x3206e8(0x26e)](_0x3206e8(0x284));
      var _0x1c623c = document[_0x3206e8(0x1b1)]('x²');
      _0x523c9a['appendChild'](_0x1c623c),
        _0xe6d2b2[_0x3206e8(0x27e)](_0x523c9a),
        _0x523c9a[_0x3206e8(0x2e2)](
          evtclk,
          function () {
            var _0x371dbc = _0x3206e8,
              _0x56e08f = rst_latex[_0x371dbc(0x1f0)]('\x20');
            if (
              _0x56e08f[parseInt(_0x52ac6b) - 0x2] &&
              _0x56e08f[parseInt(_0x52ac6b) - 0x2] === '^'
            )
              return (
                document['getElementById']('myPopup')[_0x371dbc(0x32e)][
                  _0x371dbc(0x349)
                ](_0x371dbc(0x1e5)),
                ![]
              );
            if (
              _0x56e08f[parseInt(_0x52ac6b) - 0x2] &&
              _0x56e08f[parseInt(_0x52ac6b) - 0x2] === '_'
            )
              return (
                (_0x56e08f[parseInt(_0x52ac6b) - 0x2] = '^'),
                eqn_render(_0x56e08f[_0x371dbc(0x307)]('\x20')),
                document[_0x371dbc(0x2bd)](_0x371dbc(0x1e9))[_0x371dbc(0x32e)][
                  _0x371dbc(0x349)
                ](_0x371dbc(0x1e5)),
                ![]
              );
            (_0x56e08f[parseInt(_0x52ac6b)] =
              _0x371dbc(0x271) + _0x56e08f[parseInt(_0x52ac6b)] + '\x20}'),
              candidate[0x0][_0x371dbc(0x2d6)](
                parseInt(_0x52ac6b),
                0x0,
                ['^'],
                ['{'],
              ),
              candidate[0x0][_0x371dbc(0x2d6)](parseInt(_0x52ac6b) + 0x3, 0x0, [
                '}',
              ]),
              eqn_render(_0x56e08f[_0x371dbc(0x307)]('\x20')),
              document[_0x371dbc(0x2bd)](_0x371dbc(0x1e9))[_0x371dbc(0x32e)][
                _0x371dbc(0x349)
              ](_0x371dbc(0x1e5));
          },
          ![],
        );
      var _0x35bdd7 = document[_0x3206e8(0x22f)](_0x3206e8(0x1de));
      _0x35bdd7[_0x3206e8(0x32e)][_0x3206e8(0x26e)]('itex_subscript');
      var _0xf997ac = document[_0x3206e8(0x1b1)]('x₂');
      _0x35bdd7[_0x3206e8(0x27e)](_0xf997ac),
        _0xe6d2b2[_0x3206e8(0x27e)](_0x35bdd7),
        _0x35bdd7[_0x3206e8(0x2e2)](
          evtclk,
          function () {
            var _0x3a94c0 = _0x3206e8,
              _0x1c8251 = rst_latex[_0x3a94c0(0x1f0)]('\x20');
            if (
              _0x1c8251[parseInt(_0x52ac6b) - 0x2] &&
              _0x1c8251[parseInt(_0x52ac6b) - 0x2] === '_'
            )
              return (
                document[_0x3a94c0(0x2bd)](_0x3a94c0(0x1e9))[_0x3a94c0(0x32e)][
                  _0x3a94c0(0x349)
                ]('tipshow'),
                ![]
              );
            if (
              _0x1c8251[parseInt(_0x52ac6b) - 0x2] &&
              _0x1c8251[parseInt(_0x52ac6b) - 0x2] === '^'
            )
              return (
                (_0x1c8251[parseInt(_0x52ac6b) - 0x2] = '_'),
                eqn_render(_0x1c8251[_0x3a94c0(0x307)]('\x20')),
                document[_0x3a94c0(0x2bd)](_0x3a94c0(0x1e9))[_0x3a94c0(0x32e)][
                  'remove'
                ]('tipshow'),
                ![]
              );
            (_0x1c8251[parseInt(_0x52ac6b)] =
              _0x3a94c0(0x22d) + _0x1c8251[parseInt(_0x52ac6b)] + '\x20}'),
              candidate[0x0]['splice'](parseInt(_0x52ac6b), 0x0, ['_'], ['{']),
              candidate[0x0]['splice'](parseInt(_0x52ac6b) + 0x3, 0x0, ['}']),
              eqn_render(_0x1c8251[_0x3a94c0(0x307)]('\x20')),
              document[_0x3a94c0(0x2bd)](_0x3a94c0(0x1e9))[_0x3a94c0(0x32e)][
                _0x3a94c0(0x349)
              ]('tipshow');
          },
          ![],
        );
      var _0x4b5f7b = document[_0x3206e8(0x22f)]('span');
      _0x4b5f7b[_0x3206e8(0x32e)][_0x3206e8(0x26e)](_0x3206e8(0x31f));
      var _0x3ffbbc = document[_0x3206e8(0x1b1)]('x2');
      _0x4b5f7b[_0x3206e8(0x27e)](_0x3ffbbc),
        _0xe6d2b2[_0x3206e8(0x27e)](_0x4b5f7b),
        _0x4b5f7b[_0x3206e8(0x2e2)](
          evtclk,
          function () {
            var _0x3a3930 = _0x3206e8,
              _0x3f1589 = rst_latex['split']('\x20');
            if (
              !_0x3f1589[parseInt(_0x52ac6b) - 0x2] ||
              (_0x3f1589[parseInt(_0x52ac6b) - 0x2] &&
                _0x3f1589[parseInt(_0x52ac6b) - 0x2] != '_' &&
                _0x3f1589[parseInt(_0x52ac6b) - 0x2] != '^')
            )
              return (
                document[_0x3a3930(0x2bd)]('myPopup')['classList']['remove'](
                  _0x3a3930(0x1e5),
                ),
                ![]
              );
            if (
              _0x3f1589[parseInt(_0x52ac6b) - 0x2] &&
              (_0x3f1589[parseInt(_0x52ac6b) - 0x2] === '^' ||
                _0x3f1589[parseInt(_0x52ac6b) - 0x2] === '_')
            )
              return (
                _0x3f1589[_0x3a3930(0x2d6)](parseInt(_0x52ac6b) + 0x1, 0x1),
                _0x3f1589['splice'](parseInt(_0x52ac6b) - 0x2, 0x2),
                candidate[0x0][_0x3a3930(0x2d6)](
                  parseInt(_0x52ac6b) + 0x1,
                  0x1,
                ),
                candidate[0x0][_0x3a3930(0x2d6)](
                  parseInt(_0x52ac6b) - 0x2,
                  0x2,
                ),
                eqn_render(_0x3f1589[_0x3a3930(0x307)]('\x20')),
                document[_0x3a3930(0x2bd)](_0x3a3930(0x1e9))['classList'][
                  _0x3a3930(0x349)
                ](_0x3a3930(0x1e5)),
                ![]
              );
            _0x3f1589[parseInt(_0x52ac6b)] =
              _0x3a3930(0x2f3) + _0x3f1589[parseInt(_0x52ac6b)];
            var _0x535294 = _0x3f1589[_0x3a3930(0x307)]('\x20');
            (_0x535294 = _0x535294[_0x3a3930(0x2d7)](
              /\^\s\{\snormal([^\s]+)\s\}/,
              '$1',
            )),
              (_0x535294 = _0x535294[_0x3a3930(0x2d7)](
                /_\s\{\snormal([^\s]+)\s\}/,
                '$1',
              )),
              (_0x535294 = _0x535294[_0x3a3930(0x2d7)](/normal/, '')),
              eqn_render(_0x535294),
              document['getElementById'](_0x3a3930(0x1e9))['classList'][
                _0x3a3930(0x349)
              ](_0x3a3930(0x1e5));
          },
          ![],
        );
    }, 0x64);
}
function create_selbox(_0x2225e6) {
  var _0x11f41a = _0x403d68,
    _0x367a5d = _0x2225e6[_0x11f41a(0x33d)](),
    _0x257764 = document[_0x11f41a(0x1a2)](_0x11f41a(0x236), _0x11f41a(0x26d));
  return (
    _0x367a5d[_0x11f41a(0x2cb)] < 0x258
      ? (_0x257764[_0x11f41a(0x1ff)](
          'y',
          _0x367a5d['y'] - (0x258 - _0x367a5d[_0x11f41a(0x2cb)]) / 0x2,
        ),
        _0x367a5d[_0x11f41a(0x1fe)] < 0xc8
          ? (_0x257764[_0x11f41a(0x1ff)](
              'x',
              _0x367a5d['x'] - (0xc8 - _0x367a5d[_0x11f41a(0x1fe)]) / 0x2,
            ),
            _0x257764[_0x11f41a(0x1ff)](_0x11f41a(0x1fe), 0xc8))
          : (_0x257764[_0x11f41a(0x1ff)]('x', _0x367a5d['x']),
            _0x257764[_0x11f41a(0x1ff)](
              _0x11f41a(0x1fe),
              _0x367a5d[_0x11f41a(0x1fe)],
            )),
        _0x257764['setAttribute'](_0x11f41a(0x2cb), 0x258),
        _0x257764[_0x11f41a(0x1ff)](
          _0x11f41a(0x2ae),
          'fill-opacity:0;stroke-opacity:0;',
        ))
      : (_0x257764[_0x11f41a(0x1ff)]('y', _0x367a5d['y']),
        _0x367a5d[_0x11f41a(0x1fe)] < 0xc8
          ? (_0x257764[_0x11f41a(0x1ff)](
              'x',
              _0x367a5d['x'] - (0xc8 - _0x367a5d[_0x11f41a(0x1fe)]) / 0x2,
            ),
            _0x257764[_0x11f41a(0x1ff)]('width', 0xc8))
          : (_0x257764['setAttribute']('x', _0x367a5d['x']),
            _0x257764[_0x11f41a(0x1ff)](_0x11f41a(0x1fe), _0x367a5d['width'])),
        _0x257764['setAttribute'](
          _0x11f41a(0x2cb),
          _0x367a5d[_0x11f41a(0x2cb)],
        ),
        _0x257764[_0x11f41a(0x1ff)](_0x11f41a(0x2ae), _0x11f41a(0x313))),
    _0x257764[_0x11f41a(0x32e)][_0x11f41a(0x26e)](_0x11f41a(0x1fa)),
    _0x257764
  );
}
var mj2img = function (_0xebe369, _0x4240da) {
  var _0x557509 = _0x403d68,
    _0x209d13 = { svg: '', img: '' },
    _0x56b8eb = _0xebe369[_0x557509(0x279)](_0x557509(0x326)),
    _0x103692 = _0x56b8eb[_0x557509(0x2ae)]['verticalAlign'],
    _0x3d0087 = _0x56b8eb['getAttributeNS']('', 'width')[_0x557509(0x2d7)](
      'ex',
      '',
    ),
    _0x8b64e9 = _0x56b8eb[_0x557509(0x2b3)]('', _0x557509(0x2cb))[
      _0x557509(0x2d7)
    ]('ex', '');
  _0x56b8eb[_0x557509(0x1ff)](_0x557509(0x302), _0x557509(0x236));
  var _0x2f47d6 = new XMLSerializer()[_0x557509(0x241)](_0x56b8eb),
    _0x334c75 = self[_0x557509(0x209)] || self[_0x557509(0x206)] || self,
    _0x3d60f6 = new Image(),
    _0x594061 = new Blob([_0x2f47d6], { type: 'image/svg+xml' }),
    _0x3e811b = _0x334c75[_0x557509(0x2cd)](_0x594061);
  (_0x3d60f6[_0x557509(0x2a5)] = function () {
    _0x4240da(_0x3d60f6, _0x103692, _0x3d0087, _0x8b64e9, _0x56b8eb);
  }),
    (_0x3d60f6[_0x557509(0x28a)] = _0x3e811b);
};
function mathcale(_0x5d3423, _0x167c28) {
  var _0x136b37 = _0x403d68;
  (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\\left\s*\(/g, '(')),
    (_0x167c28 = _0x167c28['replace'](/\\right\s*\)/g, ')')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /\\begin\{array\}\s*\{\s*.\s*\}\s*\{/g,
      '',
    )),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\}\s*\\end\{array\}/g, '')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\}\s*\\\\\s*\{/g, '')),
    (_0x167c28 = latex_parse(_0x167c28));
  var _0x440279 = _0x167c28[_0x136b37(0x33b)](
      /\\sum\s*_\s*\{.*?\}\s*\^\s*\{\s*\d+\s*\}\s*[\{|\(]/i,
    ),
    _0x25b7eb = _0x167c28[_0x136b37(0x33b)](
      /\\sum\s*_\s*\{.*?\}\s*\^\s*\{\s*\d+\s*\}\s*\\left/i,
    );
  !_0x440279 &&
    !_0x25b7eb &&
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /(\\sum\s*_\s*\{.*?\}\s*\^\s*\{\s*\d+\s*\})\s*([^\+\-]+)/gi,
      _0x136b37(0x2df),
    ));
  var _0x440279 = _0x167c28[_0x136b37(0x33b)](/\\lim\s*_\s*\{.*?\}\s*[\{|\(]/i),
    _0x25b7eb = _0x167c28[_0x136b37(0x33b)](/\\lim\s*_\s*\{.*?\}\s*\\left/i);
  !_0x440279 &&
    !_0x25b7eb &&
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /(\\lim\s*_\{.*?\})\s*([^\+\-]+)/gi,
      _0x136b37(0x2df),
    ));
  (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/d\s+([a-z])/g, 'd$1')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /(\\int\s*_\s*\{.*?\}\s*\^\s*\{.*?\})\s*(.+?)(d[a-z])/gi,
      _0x136b37(0x234),
    )),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/(\\int)\s+_/g, _0x136b37(0x20d))),
    (_0x167c28 = _0x167c28['replace'](/\\int(\s*[^_\s])/g, 'igre\x20$1')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /(igre)\s*(.+?)\s*(d[a-z])/gi,
      '$1($2)$3',
    )),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /(\d)\s([a-zA-Z])/gi,
      _0x136b37(0x32c),
    )),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /(\d[a-zA-Z]+)\s([a-zA-Z]+)/gi,
      _0x136b37(0x32c),
    )),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /(\d[a-zA-Z]+)\s([a-zA-Z]+)/gi,
      _0x136b37(0x32c),
    )),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\s+_/g, '_')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\s+\^/g, '^')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\\times/g, '*')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\\div/g, '/')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /sqrt\s*(\d+)/g,
      _0x136b37(0x24f),
    )),
    (_0x167c28 = _0x167c28['replace'](/sqrt\s*([a-zA-Z])/g, _0x136b37(0x24f))),
    (_0x167c28 = _0x167c28['replace'](/\)\s*\(/g, _0x136b37(0x2d3))),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\\limits/g, '')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\s+/g, '\x20')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\s+\{/g, '{')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\}\s+/g, '}')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\\mathrm/g, '')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\\rm/g, '')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\\%/g, _0x136b37(0x22c))),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/C\s*m/gi, 'cm')),
    (_0x167c28 = _0x167c28['replace'](/k\s*m/gi, 'km')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /\{\s*m\s*\}\s*\{\s*m\s*\}/g,
      _0x136b37(0x30a),
    )),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/(\d)m\s+l/g, _0x136b37(0x1c2))),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/(\d)m\s*\/\s*5/g, '$1m/s')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/(\d)km\s*\/\s*n/g, '$1km/h')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\s*\+\s*/g, _0x136b37(0x243))),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\s*\-\s*/g, _0x136b37(0x2c5)));
  while (_0x167c28[_0x136b37(0x33b)](/\d\s*x\s*\d/)) {
    _0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /(\d)\s*x\s*(\d)/g,
      _0x136b37(0x342),
    );
  }
  (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/^\s*y\s*\=/, '')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/^\s*f\s*\(\s*x\s*\)\s*\=/, '')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](
      /([^a-zA-Z][a-zA-Z])\s*\\/g,
      _0x136b37(0x1d1),
    )),
    (_0x167c28 = _0x167c28['replace'](/(^[a-zA-Z])\s*\\/g, _0x136b37(0x1d1))),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/\*\s*([\)\}])/g, '$1')),
    (_0x167c28 = _0x167c28[_0x136b37(0x2d7)](/([\(\{])\s*\*/g, '$1'));
  var _0x355757 = [_0x136b37(0x277)];
  for (
    var _0xd20c6b = 0x0;
    _0xd20c6b < _0x355757[_0x136b37(0x304)];
    _0xd20c6b++
  ) {
    var _0xfd8679 = new RegExp(_0x355757[_0xd20c6b]);
    if (_0x167c28[_0x136b37(0x33b)](_0xfd8679))
      return alert(_0x136b37(0x31c)), loader_hide(), ![];
  }
  try {
    var _0x258dcf = nerdamer['convertFromLaTeX'](_0x167c28)[_0x136b37(0x2e4)]();
  } catch (_0xebab6e) {
    return (
      console[_0x136b37(0x34b)](_0xebab6e),
      alert(_0x136b37(0x31c)),
      loader_hide(),
      ![]
    );
  }
  console[_0x136b37(0x34b)](_0x258dcf);
  var _0x10e2a8;
  try {
    if (_0x258dcf[_0x136b37(0x33b)](/int/) || _0x258dcf['match'](/igre/)) {
      var _0x4c27da = _0x258dcf[_0x136b37(0x33b)](
        /int\s*_\((.*?)\)\s*\^\((.*?)\)(.*?)d([a-z])/,
      );
      if (_0x4c27da) {
        _0x258dcf = _0x258dcf[_0x136b37(0x2d7)](
          /int\s*_\(.*?\)\s*\^\(.*?\).*?d[a-z]/,
          'intinsert',
        );
        var _0x2f9686 = nerdamer(
          _0x136b37(0x25c) +
            _0x4c27da[0x3] +
            ',' +
            _0x4c27da[0x1] +
            ',' +
            _0x4c27da[0x2] +
            ',' +
            _0x4c27da[0x4] +
            ')',
        )[_0x136b37(0x2e4)]();
        (_0x258dcf = _0x258dcf[_0x136b37(0x2d7)](
          /intinsert/,
          '(' + _0x2f9686 + ')',
        )),
          (_0x258dcf = _0x258dcf[_0x136b37(0x2d7)](
            /\)\s*\(/g,
            _0x136b37(0x2d3),
          ));
      } else {
        var _0x4c27da = _0x258dcf['match'](/igre\s*(.*?)d([a-z])/);
        _0x258dcf = _0x258dcf[_0x136b37(0x2d7)](
          /igre\s*.*?d[a-z]/,
          _0x136b37(0x246),
        );
        var _0x2f9686 = nerdamer(
          _0x136b37(0x235) + _0x4c27da[0x1] + ',' + _0x4c27da[0x2] + ')',
        )[_0x136b37(0x2e4)]();
        (_0x258dcf = _0x258dcf[_0x136b37(0x2d7)](
          /intinsert/,
          '(' + _0x2f9686 + ')',
        )),
          (_0x258dcf = _0x258dcf[_0x136b37(0x2d7)](
            /\)\s*\(/g,
            _0x136b37(0x2d3),
          ));
      }
    }
    if (_0x10e2a8 == 'diff') {
      var _0x73e881,
        _0x12a9a = nerdamer(_0x258dcf)[_0x136b37(0x281)]();
      if (_0x12a9a[_0x136b37(0x304)] > 0x1) {
        for (
          var _0xd20c6b = 0x0;
          _0xd20c6b < _0x12a9a[_0x136b37(0x304)];
          _0xd20c6b++
        ) {
          _0x12a9a[_0xd20c6b]['toString']() == 'x' && (_0x73e881 = 'x');
        }
        !_0x73e881 &&
          (_0x73e881 = nerdamer(_0x258dcf)
            [_0x136b37(0x281)]()[0x0]
            [_0x136b37(0x2e4)]());
      } else
        _0x73e881 = nerdamer(_0x258dcf)
          [_0x136b37(0x281)]()[0x0]
          [_0x136b37(0x2e4)]();
      console[_0x136b37(0x34b)]('미분합니다'),
        (_0x258dcf = nerdamer[_0x136b37(0x1ac)](_0x258dcf, _0x73e881)[
          _0x136b37(0x2e4)
        ]());
    }
    if (_0x10e2a8 == _0x136b37(0x333)) {
      var _0x73e881,
        _0x12a9a = nerdamer(_0x258dcf)[_0x136b37(0x281)]();
      if (_0x12a9a[_0x136b37(0x304)] > 0x1) {
        for (var _0xd20c6b = 0x0; _0xd20c6b < _0x12a9a['length']; _0xd20c6b++) {
          _0x12a9a[_0xd20c6b][_0x136b37(0x2e4)]() == 'x' && (_0x73e881 = 'x');
        }
        !_0x73e881 &&
          (_0x73e881 = nerdamer(_0x258dcf)
            [_0x136b37(0x281)]()[0x0]
            [_0x136b37(0x2e4)]());
      } else
        _0x73e881 = nerdamer(_0x258dcf)[_0x136b37(0x281)]()[0x0]['toString']();
      console[_0x136b37(0x34b)]('인수분해합니다.'),
        (_0x258dcf = Algebrite['factor'](_0x258dcf, _0x73e881)['toString']());
    }
    _0x258dcf['match'](/^\(\d+\)$/) &&
      ((_0x258dcf = Algebrite[_0x136b37(0x333)](_0x258dcf)[_0x136b37(0x2e4)]()),
      (_0x10e2a8 = _0x136b37(0x333)));
  } catch (_0x235378) {
    return (
      console['log'](_0x235378),
      alert(
        '수식인식에\x20오류가\x20있습니다.\x20수식을\x20다시\x20입력해\x20주십시오.',
      ),
      loader_hide(),
      ![]
    );
  }
  (_0x258dcf = _0x258dcf[_0x136b37(0x2d7)](/\)([a-zA-Z])/g, _0x136b37(0x2ac))),
    (_0x258dcf = _0x258dcf[_0x136b37(0x2d7)](
      /([a-zA-Z0-9])(\(log)/g,
      _0x136b37(0x342),
    )),
    (document[_0x136b37(0x2bd)](_0x136b37(0x218))[_0x136b37(0x26c)] =
      _0x258dcf),
    document[_0x136b37(0x2bd)](_0x136b37(0x218))['setAttribute'](
      _0x136b37(0x2f6),
      _0x136b37(0x30c),
    ),
    console[_0x136b37(0x34b)](_0x258dcf);
  if (_0x258dcf['match'](/\=/) && btn_gp != !![]) {
    console['log'](_0x136b37(0x2b6));
    var _0x73e881 = nerdamer(_0x258dcf)
      [_0x136b37(0x281)]()[0x0]
      [_0x136b37(0x2e4)]();
    try {
      var _0xad3399 = Algebrite['roots'](_0x258dcf)[_0x136b37(0x2e4)]();
      if (_0xad3399[_0x136b37(0x304)] > 0x64) {
        if (confirm(_0x136b37(0x2ea)) == !![]) {
          (btn_gp = !![]),
            (_0x258dcf = _0x258dcf[_0x136b37(0x2d7)](/\=\s*0/, ''));
          if (_0x258dcf['match'](/\=/)) {
            var _0x5f393b = _0x258dcf[_0x136b37(0x1f0)]('=');
            _0x258dcf = _0x5f393b[0x0] + '-' + _0x5f393b[0x1];
          }
          var _0xa4869b = expression_result(_0x258dcf, _0x10e2a8);
        } else {
          _0xad3399 = _0xad3399[_0x136b37(0x2d7)](/\[|\]/g, '');
          var _0x129528 = _0xad3399[_0x136b37(0x1f0)](','),
            _0xa4869b = '';
          for (
            var _0xd20c6b = 0x0;
            _0xd20c6b < _0x129528[_0x136b37(0x304)];
            _0xd20c6b++
          ) {
            _0xa4869b +=
              expression_result(_0x129528[_0xd20c6b], _0x136b37(0x325)) + ',~';
          }
          (_0xa4869b = _0x73e881 + '=' + _0xa4869b['replace'](/,$/, '')),
            (_0xa4869b = _0xa4869b[_0x136b37(0x2d7)](/,\~$/, ''));
        }
      } else {
        _0xad3399 = _0xad3399[_0x136b37(0x2d7)](/\[|\]/g, '');
        var _0x129528 = _0xad3399['split'](','),
          _0xa4869b = '';
        for (
          var _0xd20c6b = 0x0;
          _0xd20c6b < _0x129528['length'];
          _0xd20c6b++
        ) {
          _0xa4869b +=
            expression_result(_0x129528[_0xd20c6b], _0x136b37(0x325)) + ',~';
        }
        (_0xa4869b = _0x73e881 + '=' + _0xa4869b[_0x136b37(0x2d7)](/,$/, '')),
          (_0xa4869b = _0xa4869b[_0x136b37(0x2d7)](/,\~$/, ''));
      }
    } catch (_0x473c2d) {
      alert(_0x136b37(0x347)),
        (btn_gp = !![]),
        (_0x258dcf = _0x258dcf[_0x136b37(0x2d7)](/\=\s*0/, ''));
      if (_0x258dcf[_0x136b37(0x33b)](/\=/)) {
        var _0x5f393b = _0x258dcf['split']('=');
        _0x258dcf = _0x5f393b[0x0] + '-' + _0x5f393b[0x1];
      }
      var _0xa4869b = expression_result(_0x258dcf, _0x10e2a8);
    }
  } else {
    _0x258dcf = _0x258dcf[_0x136b37(0x2d7)](/\=\s*0/, '');
    if (_0x258dcf['match'](/\=/)) {
      var _0x5f393b = _0x258dcf[_0x136b37(0x1f0)]('=');
      _0x258dcf = _0x5f393b[0x0] + '-' + _0x5f393b[0x1];
    }
    var _0xa4869b = expression_result(_0x258dcf, _0x10e2a8);
  }
  console[_0x136b37(0x34b)](_0xa4869b);
  if (!_0xa4869b)
    return (
      alert(_0x136b37(0x21a)),
      document[_0x136b37(0x2bd)]('eq_box')[_0x136b37(0x1ff)](
        _0x136b37(0x2f6),
        'start',
      ),
      (btn_gp = ![]),
      loader_hide(),
      ![]
    );
  if (
    document[_0x136b37(0x2bd)](_0x136b37(0x316))[_0x136b37(0x2ae)][
      _0x136b37(0x240)
    ] == _0x136b37(0x27f) &&
    _0xa4869b[_0x136b37(0x33b)](/^x\=[\d\.\-\+]+$/)
  ) {
    (wolfram_rst = ''), (mathpapa_rst = '');
    var _0x422ba9 = _0xa4869b['match'](/x\=([\d\.\-\+]+)/);
    document[_0x136b37(0x2bd)]('eq_box')[_0x136b37(0x1ff)](
      _0x136b37(0x2f6),
      _0x136b37(0x2de),
    );
    if (eq_arr['length'] == 0x1) {
      eq_arr[0x0] = eq_arr[0x0]['replace'](/\=\s*0/, '');
      if (eq_arr[0x0][_0x136b37(0x33b)](/\=/)) {
        var _0x5f393b = eq_arr[0x0][_0x136b37(0x1f0)]('=');
        eq_arr[0x0] = _0x5f393b[0x0] + '-' + _0x5f393b[0x1];
      }
      var _0x3a2010 = math[_0x136b37(0x2be)](eq_arr[0x0]),
        _0x1c7f63 = [],
        _0x28fd63 = [];
      console['log'](math['evaluate'](_0x422ba9[0x1])),
        eq_arr['push'](
          _0x136b37(0x1a0) +
            math['evaluate'](_0x422ba9[0x1]) +
            ';' +
            _0x3a2010[_0x136b37(0x23e)]({ x: _0x422ba9[0x1] }),
        );
    } else {
      var _0x15ec8a = _0x136b37(0x1a0) + math[_0x136b37(0x23e)](_0x422ba9[0x1]);
      for (
        var _0xd20c6b = 0x0;
        _0xd20c6b < eq_arr[_0x136b37(0x304)];
        _0xd20c6b++
      ) {
        var _0x3a2010 = math[_0x136b37(0x2be)](eq_arr[_0xd20c6b]);
        _0x15ec8a += ';' + _0x3a2010['evaluate']({ x: _0x422ba9[0x1] });
      }
      eq_arr[_0x136b37(0x350)](_0x15ec8a);
    }
    return draw(), loader_hide(), (btn_gp = ![]), !![];
  }
  (_0xa4869b = _0xa4869b[_0x136b37(0x2d7)](
    /\\log\s*_\s*\{\s*e\s*\}/g,
    _0x136b37(0x2ba),
  )),
    (_0xa4869b = _0xa4869b['replace'](/\\lim/g, _0x136b37(0x239))),
    (_0xa4869b = _0xa4869b[_0x136b37(0x2d7)](/\\sum/g, _0x136b37(0x34f))),
    (_0xa4869b = _0xa4869b['replace'](/^/, _0x136b37(0x311))),
    (document[_0x136b37(0x279)](_0x136b37(0x253))[_0x136b37(0x20b)] =
      _0x136b37(0x1b0));
  var _0x5e5136 = MathJax['getMetricsFor'](
    document[_0x136b37(0x279)](_0x136b37(0x253)),
  );
  (_0x5e5136[_0x136b37(0x240)] = ![]),
    document[_0x136b37(0x279)](_0x136b37(0x253))[_0x136b37(0x27e)](
      MathJax[_0x136b37(0x300)](_0xa4869b, _0x5e5136),
    ),
    btn_gp == !![] &&
      (document[_0x136b37(0x2bd)](_0x136b37(0x316))[_0x136b37(0x2ae)][
        _0x136b37(0x240)
      ] == _0x136b37(0x339) &&
        (document['getElementById']('plot')[_0x136b37(0x2ae)][
          _0x136b37(0x240)
        ] = _0x136b37(0x27f)),
      eq_arr[_0x136b37(0x350)](_0x258dcf),
      draw()),
    loader_hide(),
    (btn_gp = ![]);
}
function expression_result(_0x24827b, _0x4cc15d) {
  var _0x4b4ef0 = _0x403d68;
  try {
    if (math['evaluate'](_0x24827b)[_0x4b4ef0(0x282)]) {
      console[_0x4b4ef0(0x34b)]('단위연산입니다.'),
        (_0x24827b = math[_0x4b4ef0(0x23e)](_0x24827b)[_0x4b4ef0(0x2e4)]()),
        (_0x24827b = _0x24827b[_0x4b4ef0(0x33b)](/(^[\d|\.]+)\s*(.*$)/));
      var _0x238dd8 = _0x24827b[0x2];
      _0x24827b = _0x24827b[0x1];
    }
  } catch (_0x541140) {
    console['log'](_0x541140), console['log'](_0x4b4ef0(0x2d2));
  }
  var _0x31943d = ![];
  try {
    var _0x470fbd = math['parse'](_0x24827b);
    (_0x470fbd = _0x470fbd['transform'](
      function (_0x4ea920, _0x4520c3, _0x84a79d) {
        var _0x38bed7 = _0x4b4ef0;
        if (_0x4ea920['fn'] && _0x4ea920['fn'][_0x38bed7(0x1bd)] == 'log')
          return (
            !math['simplify'](_0x4ea920)['value'] &&
              (_0x4ea920['fn'][_0x38bed7(0x1bd)] = 'leg'),
            math['simplify'](_0x4ea920)
          );
        return _0x4ea920;
      },
    )),
      (_0x24827b = _0x470fbd['toString']());
    if (_0x4cc15d == _0x4b4ef0(0x333)) var _0xd56d09 = _0x24827b;
    else {
      obj_data = Algebrite['simplify'](_0x24827b);
      var _0xd56d09 = obj_data[_0x4b4ef0(0x2e4)]();
    }
    _0xd56d09[_0x4b4ef0(0x33b)](/\.\.\./) &&
      ((_0xd56d09 = _0xd56d09['replace'](/\.\.\./g, '')),
      !_0xd56d09[_0x4b4ef0(0x33b)](/a-zA-Z/) && (_0x31943d = !![]));
    _0xd56d09 = _0xd56d09[_0x4b4ef0(0x2d7)](/leg/g, _0x4b4ef0(0x34b));
    var _0x4d82e0 = math['parse'](_0xd56d09);
    return (
      (_0x4d82e0 = _0x4d82e0['transform'](
        function (_0x4403aa, _0x4787ef, _0x54cda0) {
          var _0x3c3405 = _0x4b4ef0;
          return (
            _0x4403aa['fn'] == _0x3c3405(0x208) &&
              _0x4403aa[_0x3c3405(0x345)][0x1]
                [_0x3c3405(0x2e4)]()
                ['match'](/\(1\s*\/\s*2\)/) &&
              (_0x4403aa = new math[_0x3c3405(0x21f)](
                _0x3c3405(0x2eb) +
                  _0x4403aa[_0x3c3405(0x345)][0x0][_0x3c3405(0x2e4)]() +
                  ')',
              )),
            _0x4403aa
          );
        },
      )),
      _0x4cc15d != _0x4b4ef0(0x325) &&
        (document[_0x4b4ef0(0x2bd)](_0x4b4ef0(0x218))['value'] =
          _0x4d82e0[_0x4b4ef0(0x2e4)]()),
      (latex = _0x4d82e0[_0x4b4ef0(0x28d)]({
        parenthesis: _0x4b4ef0(0x1d7),
        implicit: _0x4b4ef0(0x207),
      })),
      (latex = latex[_0x4b4ef0(0x2d7)](/\\cdot(10\^)/, _0x4b4ef0(0x257))),
      _0x31943d == !![] && (latex = _0x4b4ef0(0x2ef) + latex),
      _0x238dd8 &&
        (_0x238dd8 == 'l'
          ? (latex += _0x238dd8)
          : (latex += _0x4b4ef0(0x2bb) + _0x238dd8 + '}')),
      latex
    );
  } catch (_0x484ed6) {
    return console[_0x4b4ef0(0x34b)](_0x484ed6), ![];
  }
}
var plotdata,
  plotlayout,
  eq_arr = [];
function draw() {
  var _0x261451 = _0x403d68;
  try {
    var _0x5c40fd = math_compile(),
      _0x3f8438 =
        document[_0x261451(0x2bd)](_0x261451(0x351))[_0x261451(0x230)]()[
          _0x261451(0x2cb)
        ] -
        window[_0x261451(0x21c)] * 0.05;
    const _0x12796e = {
      x: _0x5c40fd[0x0],
      y: _0x5c40fd[0x1],
      type: _0x261451(0x238),
    };
    (plotlayout = {
      margin: { l: 0x14, r: 0x14, t: 0x14, b: 0x32 },
      height: _0x3f8438,
      xaxis: { autotick: !![], scaleanchor: 'y' },
      yaxis: { autotick: !![] },
      dragmode: _0x261451(0x1f1),
      hovermode: _0x261451(0x298),
    }),
      (plotdata = [_0x12796e]),
      Plotly[_0x261451(0x233)](_0x261451(0x316), plotdata, plotlayout, {
        scrollZoom: !![],
      }),
      document['getElementById'](_0x261451(0x316))['on'](
        _0x261451(0x2c9),
        math_relayout,
        ![],
      ),
      document[_0x261451(0x2bd)]('wpen')[_0x261451(0x32e)][_0x261451(0x349)](
        _0x261451(0x2c0),
      ),
      document[_0x261451(0x2bd)]('eraser')[_0x261451(0x32e)]['remove'](
        _0x261451(0x2c0),
      ),
      (document[_0x261451(0x279)](_0x261451(0x2d5))[_0x261451(0x2ae)][
        _0x261451(0x1dc)
      ] = 0x2),
      math_relayout();
  } catch (_0x1d1570) {
    return (
      eq_arr[_0x261451(0x317)](),
      console[_0x261451(0x297)](_0x1d1570),
      alert(_0x261451(0x1d3)),
      loader_hide(),
      ![]
    );
  }
}
function math_relayout() {
  var _0x185f74 = _0x403d68,
    _0x328f88 = document[_0x185f74(0x291)](_0x185f74(0x1ad))[0x0][
      'getBoundingClientRect'
    ]()[_0x185f74(0x1fe)];
  plotlayout[_0x185f74(0x1fe)] = _0x328f88;
  var _0x5dcfd3, _0x1a8ccc, _0x191dc2, _0x25c1b7;
  Math[_0x185f74(0x1f4)](
    Math['abs'](plotlayout[_0x185f74(0x1cd)][_0x185f74(0x1a9)][0x0]),
  ) >
  Math['ceil'](
    Math[_0x185f74(0x225)](plotlayout['yaxis'][_0x185f74(0x1a9)][0x1]),
  )
    ? ((_0x191dc2 = -Math[_0x185f74(0x1f4)](
        Math[_0x185f74(0x225)](
          plotlayout[_0x185f74(0x1cd)][_0x185f74(0x1a9)][0x0],
        ),
      )),
      (_0x25c1b7 = Math[_0x185f74(0x1f4)](
        Math[_0x185f74(0x225)](plotlayout[_0x185f74(0x1cd)]['range'][0x0]),
      )))
    : ((_0x191dc2 = -Math['ceil'](
        Math[_0x185f74(0x225)](plotlayout['yaxis'][_0x185f74(0x1a9)][0x1]),
      )),
      (_0x25c1b7 = Math[_0x185f74(0x1f4)](
        Math[_0x185f74(0x225)](
          plotlayout[_0x185f74(0x1cd)][_0x185f74(0x1a9)][0x1],
        ),
      )));
  (_0x5dcfd3 = Math[_0x185f74(0x216)](
    plotlayout[_0x185f74(0x327)][_0x185f74(0x1a9)][0x0],
  )),
    (_0x1a8ccc = Math[_0x185f74(0x1f4)](
      plotlayout[_0x185f74(0x327)][_0x185f74(0x1a9)][0x1],
    ));
  var _0x5c79c0 = math_compile(_0x5dcfd3, _0x1a8ccc, _0x191dc2, _0x25c1b7);
  for (
    var _0x170adc = 0x1;
    _0x170adc < _0x5c79c0[_0x185f74(0x304)];
    _0x170adc++
  ) {
    if (
      Array['isArray'](_0x5c79c0[_0x170adc]) == ![] &&
      _0x5c79c0[_0x170adc][_0x185f74(0x33b)](/point/)
    ) {
      var _0x3e2615 =
          eq_arr[eq_arr[_0x185f74(0x304)] - 0x1][_0x185f74(0x1f0)](/;/),
        _0x3289cf = [],
        _0x3757b4 = [];
      for (
        var _0x19f94d = 0x2;
        _0x19f94d < _0x3e2615[_0x185f74(0x304)];
        _0x19f94d++
      ) {
        _0x3289cf[_0x185f74(0x350)](_0x3e2615[0x1]),
          _0x3757b4[_0x185f74(0x350)](_0x3e2615[_0x19f94d]);
      }
      var _0x2da776;
      if (_0x3757b4['length'] > 0x1) _0x2da776 = _0x185f74(0x1aa);
      else {
        if (_0x3e2615[0x2][_0x185f74(0x33b)](/i/)) _0x2da776 = _0x185f74(0x2dc);
        else {
          var _0x35bfe2 = _0x3e2615[0x2];
          _0x2da776 = Math[_0x185f74(0x294)](_0x35bfe2 * 0x186a0) / 0x186a0;
        }
      }
      var _0x28571f = {
        x: _0x3289cf,
        y: _0x3757b4,
        name: '(' + _0x3e2615[0x1] + ',' + _0x2da776 + ')',
        type: _0x185f74(0x238),
        mode: _0x185f74(0x23d),
        marker: { size: 0x10, color: _0x185f74(0x1e2) },
      };
      (plotdata[_0x170adc - 0x1] = _0x28571f), eq_arr[_0x185f74(0x317)]();
    } else {
      var _0x28571f = {
        x: _0x5c79c0[0x0],
        y: _0x5c79c0[_0x170adc],
        name: eq_arr[_0x170adc - 0x1],
        type: _0x185f74(0x238),
      };
      plotdata[_0x170adc - 0x1] = _0x28571f;
    }
  }
  Plotly[_0x185f74(0x25f)]('plot'),
    document[_0x185f74(0x2bd)](_0x185f74(0x218))[_0x185f74(0x1ff)](
      _0x185f74(0x2f6),
      _0x185f74(0x2de),
    );
}
function math_compile(_0x234720, _0xc4f902, _0x428595, _0x2874f8) {
  var _0x557f90 = _0x403d68;
  !_0x234720 &&
    ((_0x234720 = -0xa),
    (_0xc4f902 = 0xa),
    (_0x428595 = -0xa),
    (_0x2874f8 = 0xa));
  var _0x1ccdb7 = Math[_0x557f90(0x225)](_0xc4f902 - _0x234720) / 0x1388;
  console[_0x557f90(0x34b)](_0x1ccdb7);
  var _0x2b0aef = math[_0x557f90(0x1a9)](_0x234720, _0xc4f902, _0x1ccdb7)[
      _0x557f90(0x2ca)
    ](),
    _0x425914 = [_0x2b0aef];
  for (var _0x433387 = 0x0; _0x433387 < eq_arr['length']; _0x433387++) {
    if (eq_arr[_0x433387][_0x557f90(0x33b)](/point/))
      _0x425914[_0x557f90(0x350)]('point');
    else {
      var _0x1c94aa = eq_arr[_0x433387];
      _0x1c94aa = _0x1c94aa['replace'](/\=\s*0/, '');
      if (_0x1c94aa['match'](/\=/)) {
        var _0x3408af = _0x1c94aa[_0x557f90(0x1f0)]('=');
        _0x1c94aa = _0x3408af[0x0] + '-' + _0x3408af[0x1];
      }
      var _0x4b4425 = math[_0x557f90(0x2be)](_0x1c94aa),
        _0x5dc00b = _0x2b0aef[_0x557f90(0x2f0)](function (_0x5e00bc) {
          var _0xc44dc9 = _0x557f90,
            _0x4c2ff9 = _0x4b4425[_0xc44dc9(0x23e)]({ x: _0x5e00bc });
          if (_0x4c2ff9 > _0x428595 && _0x4c2ff9 < _0x2874f8) return _0x4c2ff9;
        });
      _0x425914[_0x557f90(0x350)](_0x5dc00b);
    }
  }
  return _0x425914;
}
function clear() {
  var _0x20f4da = _0x403d68;
  sketch_pad[_0x20f4da(0x276)]();
}
function _0x3ee9() {
  var _0x287a90 = [
    'touchstart',
    'yaxis',
    'bind',
    '^\x5c\x5cprime$',
    '^\x5c\x5cgamma$',
    '$1*\x5c',
    '#tab_img_block',
    '그래프\x20처리에\x20문제가\x20있네요.\x20웹\x20검색을\x20해보세요.',
    '^\x5c\x5cln$',
    'https://www.google.com/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8',
    'call',
    'keep',
    'futurenurikice20211212',
    'canvas',
    'tab_img_block',
    'touchmove',
    'zIndex',
    '^\x5c\x5cinfty$',
    'span',
    '^\x5c\x5cdelta$',
    'offsetX',
    'left',
    '#C54C82',
    'eqn_reflash',
    'destroy',
    'tipshow',
    'data-latex',
    'false',
    'window',
    'myPopup',
    'reload',
    'mouseup',
    '.cropper-container',
    'href',
    'eqn_tranfer',
    '^\x5c\x5cpm$',
    'split',
    'pan',
    'data:image/jpeg;base64,',
    '^\x5c\x5cleqq$',
    'ceil',
    'mjx-assistive-mml\x20merror',
    'image/jpeg',
    '^\x5c\x5cvarnothing$',
    '246456NsBIAc',
    'bottom',
    'select_box',
    '942QUczxW',
    'getImageData',
    'change',
    'width',
    'setAttribute',
    '#mjx-editing-area',
    'eq_config_hidden',
    'data-num',
    '^\x5c\x5cint$',
    'data',
    'pageY',
    'webkitURL',
    'hide',
    'pow',
    'URL',
    '^\x5c\x5csigma$',
    'innerHTML',
    'touches',
    '$1_',
    '110vQkJjX',
    '.ko_input_mode',
    'stringify',
    '^\x5c\x5ctriangle$',
    'files',
    'rtemp',
    '^\x5c\x5clim$',
    'loader_hidden',
    'floor',
    'removeChild',
    'eq_box',
    '#ui_wrap',
    '적절한\x20답을\x20찾지\x20못했습니다.\x20웹\x20검색을\x20해보세요.',
    '.*?',
    'innerHeight',
    '^\x5c\x5ctheta$',
    'indexOf',
    'parse',
    'getAttribute',
    'getContext',
    'POST',
    'innerWidth',
    '2486025ESygEi',
    'abs',
    'log\x20($1,\x2010)',
    'type',
    'readystatechange',
    'tab_hand_block',
    'candidates',
    'status',
    '/100',
    '_\x20{\x20',
    'mjx-container',
    'createElement',
    'getBoundingClientRect',
    'lbs',
    '^[a-zA-Z0-9]+$',
    'newPlot',
    '$1($2)$3',
    'integrate(',
    'http://www.w3.org/2000/svg',
    '^\x5c\x5cnot\x5c\x5csupset$',
    'scatter',
    '\x5clim\x5climits\x20',
    '#myPopup\x20mjx-container',
    '\x5cs*lbs',
    'ans_hidden',
    'markers',
    'evaluate',
    'content\x20null',
    'display',
    'serializeToString',
    '.txtelem',
    '\x20+\x20',
    '^\x5c\x5cvarphi$',
    'wolfram',
    'intinsert',
    '^\x5c\x5cleftarrow$',
    'txtelem',
    'img_file_up',
    '\x5cmathrm',
    '2GfmaWa',
    '^\x5c\x5csec$',
    '^\x5c\x5clangle$',
    '/qnapi_dream/fulltext_draw',
    'sqrt($1)',
    'application/json',
    '^\x5c.$',
    'layerY',
    '.answerbox',
    '^\x5c\x5ccsc$',
    'exec',
    '^\x5c\x5cLeftrightarrow$',
    '\x5ctimes$1',
    'parentNode',
    'originalEvent',
    'sel_elem',
    '^\x5c\x5comega$',
    'defint(',
    'eqn_wrap',
    'protocol',
    'redraw',
    'top',
    '\x5c\x5csqrt\x5cs*\x5c[.*?\x5c]\x5cs*(lbs',
    '^\x5c\x5cvert$',
    'latex_styled',
    'open',
    '^\x5c\x5c{$',
    '^\x5c\x5cDelta$',
    '{$1tempup$2}',
    'screen_block',
    '{\x20\x5clog\x20{\x20$1,\x20{\x20e\x20}\x20}\x20}',
    'https://www.mathpapa.com/algebra-calculator.html?q=',
    'img',
    'value',
    'rect',
    'add',
    'ko_input_mode',
    'mousemove',
    '^\x20{\x20',
    'editormode',
    'right',
    '^\x5c\x5ccdots$',
    '\x5cleft\x5c{',
    'clear',
    '\x5c\x5cpm',
    '^\x5c\x5cni$',
    'querySelector',
    '\x20$1\x20',
    'app_key',
    'weight',
    '^\x5c\x5cldots$',
    'appendChild',
    'block',
    '^\x5c\x5ccap$',
    'variables',
    'units',
    'insertBefore',
    'itex_supscript',
    'slice',
    'setRequestHeader',
    'eqn_input_mode',
    '\x5cright\x5c}',
    '#mjx-editing-area\x20svg',
    'src',
    'Tooltip',
    'then',
    'toTex',
    '(lbs',
    '{\x5cclass{texevt\x20tex_',
    'catch',
    'getElementsByTagName',
    '\x5c\x5cln\x5cs*',
    '\x5cend{array}\x5cright.}',
    'round',
    'drawingcheck',
    '^\x5c[$',
    'error',
    'closest',
    '{tempfc$1}check',
    'drawImage',
    'readyState',
    'mathpapa',
    '#itex_frame_area',
    '.site_iframe',
    'iframe_ocr_box',
    'trans_checked',
    '^\x5c\x5cin$',
    'layerX',
    'img_box',
    'textContent',
    'onload',
    '^\x5c\x5codot$',
    '^\x5c\x5cmathrm\x5c{.\x5c}$',
    'en_input_mode',
    'upload',
    'ltemp',
    '.btn-close',
    ')*$1',
    '#fff',
    'style',
    'contains',
    '8262XHjdft',
    'toggle',
    'latexs',
    'getAttributeNS',
    'touchend',
    '{$1}^',
    '방정식\x20처리\x20시작',
    '\x5c\x5cfrac\x5cs*lbs',
    '{\x5cleft\x5c{\x5cbegin{array}{l}',
    '^\x5c\x5ccup$',
    '\x5cln\x20',
    '\x5cmathrm{',
    '^\x5c\x5ctau$',
    'getElementById',
    'compile',
    '^\x5c\x5cangle$',
    'sel_tool',
    '^/$',
    '\x5cln\x20{$1}',
    '2510vFRgCZ',
    'max',
    '\x20-\x20',
    'symbol_change',
    'https://dev2.itexsolution.co.kr:5001/router_api',
    'button',
    'plotly_relayout',
    'toArray',
    'height',
    '^\x5c\x5ctan$',
    'createObjectURL',
    'mjx-assistive-mml',
    'load',
    '\x5cclass{itexblank}{@}\x5ccssId{itexcursorbox}{}',
    'color',
    '단위연산이\x20아닙니다.',
    ')*(',
    '$1\x20{\x20$2\x20}',
    '.screen_block',
    'splice',
    'replace',
    '변환할\x20수식이\x20없습니다.\x0a크롭\x20메뉴을\x20이용하여\x20선택해\x20주십시오.',
    'http',
    'append',
    '^\x5c\x5ctherefore$',
    'undefined',
    'querySelectorAll',
    'start',
    '$1($2)',
    '^\x5c\x5cpi$',
    'target',
    'addEventListener',
    '^[\x5c+\x5c-\x5c=\x5c!<>\x5c(\x5c)〜,]$',
    'toString',
    '808070QOmJAd',
    'iframe',
    'firstChild',
    '\x20}\x20}\x20}',
    '^\x5c\x5cpsi$',
    '해가\x20너무\x20지저분하군요.\x20그래프로\x20확인하는게\x20어떨까요?',
    'sqrt(',
    'mode',
    'content-type',
    'putImageData',
    '\x5csimeq',
    'map',
    '}*$1',
    'wpen',
    'normal',
    'iTeXEQ',
    'eq_config_show',
    'data-state',
    '^\x5c\x5cleftrightarrow$',
    '^\x5c\x5crightarrow$',
    'clearRect',
    'document',
    'location',
    'itex_classchange2',
    'wf_hidden',
    'removeAttribute',
    '^\x5c\x5cbot$',
    'tex2svg',
    'parent',
    'xmlns',
    'ans_show',
    'length',
    'itex_frame_area',
    '#ffffff',
    'join',
    '^\x5c\x5coplus$',
    '^\x5c\x5clambda$',
    '{mm}',
    '^\x5c\x5csin$',
    'ready',
    '^\x5c\x5calpha$',
    '#myPopup',
    'toDataURL',
    '^\x5c\x5csum$',
    '\x5cdisplaystyle\x20',
    '148976hBcKpy',
    'fill-opacity:0;stroke-opacity:0;',
    '^\x5c\x5cprod$',
    'readAsDataURL',
    'plot',
    'pop',
    '124YqxsSJ',
    'onreadystatechange',
    'eqn_close',
    'getTime',
    '수식을\x20인식했습니다만\x20연산\x20처리에\x20문제가\x20있네요.\x20웹\x20검색을\x20해보시겠어요?',
    'offsetY',
    'itex_se2iframe',
    'itex_normal',
    'orientationchange',
    '^\x5c\x5cgeqq$',
    '^\x5c\x5ctimes$',
    '^\x5c\x5ccdot$',
    '\x5clog\x20_\x20{\x2010\x20}',
    'sol_eq',
    'svg',
    'xaxis',
    '^\x5c\x5c%$',
    '^\x5c\x5cdiv$',
    'min',
    'eraser',
    '$1$2',
    '\x5cs*lbs(\x5cd+)',
    'classList',
    'https://www.google.com/search?q=',
    'rbs',
    '#sketchpad',
    '$1itexuper',
    'factor',
    'preventDefault',
    'mjx-editing-area',
    'offset',
    'class',
    '^\x5c\x5cbecause$',
    'none',
    '.itexmath_check',
    'match',
    'mathSize',
    'getBBox',
    '^\x5c\x5ccos$',
    '.en_input_mode',
    '^\x5c\x5cbigstar$',
    'eqn_edit',
    '$1*$2',
    'http://dev2.itexsolution.co.kr:5000/router_api',
    '^○$',
    'args',
    'charCodeAt',
    '계산이\x20쉽지\x20않군요.\x20그래프로\x20확인해\x20볼게요.',
    'mjx-container>svg',
    'remove',
    '\x5cleg\x20$1\x20\x5clcg\x20',
    'log',
    '^\x5c\x5cvee$',
    '^\x5c\x5cexists$',
    '^\x5c\x5crangle$',
    '\x5csum\x5climits\x20',
    'push',
    'ui_wrap',
    'html2canvas\x20오류:\x20',
    'send',
    'result',
    'mpx_res\x20error:\x20',
    'point;',
    '$1\x5climits',
    'createElementNS',
    'wf_show',
    'screen_none',
    'enable_pre_space',
    '^\x5c\x5cpropto$',
    'dream_server_url',
    '^\x5c\x5c}$',
    'range',
    'multiple',
    'error:',
    'diff',
    'body',
    '\x5c\x5clog\x5cs*_(\x5cs*',
    '{\x20\x5clog\x20{\x20$2,\x20$1\x20}}',
    '<span\x20class=\x22null_box\x22></span>',
    'createTextNode',
    '#mjx-editing-area\x20.sel_elem',
    'responseText',
    '^\x5c\x5ccirc$',
    '^\x5c\x5cbeta$',
    '#000000',
    '^\x5c\x5cnot\x5c\x5csubset$',
    'click',
    'jpeg',
    'https://www.wolframalpha.com/input/?i=',
    'sketchpad',
    '.wsite',
    'name',
    '\x20smb}',
    'draw',
    '^\x5c\x5csquare$',
    'svg\x20.texevt',
    '$1ml',
    '1248373YWAnrX',
    '.*?rbs',
    'stopPropagation',
    'element',
    'google',
    '.loader_wrap',
    '^\x5c\x5clog$',
    'className',
    '.wf_show',
  ];
  _0x3ee9 = function () {
    return _0x287a90;
  };
  return _0x3ee9();
}
function eqn_edit() {
  var _0x177cd0 = _0x403d68;
  (document[_0x177cd0(0x2bd)](_0x177cd0(0x229))[_0x177cd0(0x2ae)]['zIndex'] =
    0x1),
    (document[_0x177cd0(0x2bd)](_0x177cd0(0x25d))[_0x177cd0(0x2ae)][
      _0x177cd0(0x1dc)
    ] = 0x2);
}
function __handwriting_pen() {
  var _0xbc3618 = _0x403d68;
  cropper && cropper[_0xbc3618(0x1e4)](),
    document[_0xbc3618(0x2bd)](_0xbc3618(0x316))[_0xbc3618(0x2ae)]['display'] ==
    _0xbc3618(0x27f)
      ? document[_0xbc3618(0x2bd)](_0xbc3618(0x2f2))[_0xbc3618(0x32e)][
          _0xbc3618(0x2af)
        ](_0xbc3618(0x2c0))
        ? ((document[_0xbc3618(0x279)](_0xbc3618(0x2d5))[_0xbc3618(0x2ae)][
            _0xbc3618(0x1dc)
          ] = 0x2),
          document[_0xbc3618(0x2bd)](_0xbc3618(0x2f2))[_0xbc3618(0x32e)][
            _0xbc3618(0x349)
          ](_0xbc3618(0x2c0)),
          document[_0xbc3618(0x2bd)](_0xbc3618(0x341))['classList'][
            _0xbc3618(0x349)
          ](_0xbc3618(0x2c0)),
          sketch_pad['clear']())
        : ((document[_0xbc3618(0x279)](_0xbc3618(0x2d5))[_0xbc3618(0x2ae)][
            'zIndex'
          ] = 0x4),
          document[_0xbc3618(0x2bd)](_0xbc3618(0x32b))[_0xbc3618(0x32e)][
            _0xbc3618(0x349)
          ](_0xbc3618(0x2c0)),
          document[_0xbc3618(0x2bd)](_0xbc3618(0x341))['classList'][
            _0xbc3618(0x349)
          ](_0xbc3618(0x2c0)),
          document[_0xbc3618(0x2bd)](_0xbc3618(0x2f2))[_0xbc3618(0x32e)][
            _0xbc3618(0x26e)
          ]('sel_tool'),
          (sketch_pad[_0xbc3618(0x27c)] = 0x2),
          (sketch_pad['color'] = _0xbc3618(0x1b6)),
          (sketch_pad[_0xbc3618(0x2ec)] = _0xbc3618(0x1bf)))
      : (document[_0xbc3618(0x2bd)](_0xbc3618(0x32b))[_0xbc3618(0x32e)][
          _0xbc3618(0x349)
        ](_0xbc3618(0x2c0)),
        document[_0xbc3618(0x2bd)](_0xbc3618(0x341))[_0xbc3618(0x32e)][
          _0xbc3618(0x349)
        ](_0xbc3618(0x2c0)),
        document[_0xbc3618(0x2bd)]('wpen')[_0xbc3618(0x32e)]['add'](
          _0xbc3618(0x2c0),
        ),
        (sketch_pad[_0xbc3618(0x27c)] = 0x2),
        (sketch_pad['color'] = _0xbc3618(0x1b6)),
        (sketch_pad[_0xbc3618(0x2ec)] = _0xbc3618(0x1bf))),
    (document[_0xbc3618(0x2bd)]('tab_hand_block')['style']['zIndex'] = 0x2),
    (document[_0xbc3618(0x2bd)](_0xbc3618(0x25d))[_0xbc3618(0x2ae)][
      _0xbc3618(0x1dc)
    ] = 0x1),
    document[_0xbc3618(0x2bd)](_0xbc3618(0x1e9))[_0xbc3618(0x32e)][
      _0xbc3618(0x349)
    ](_0xbc3618(0x1e5)),
    document[_0xbc3618(0x279)](_0xbc3618(0x1b2)) &&
      document[_0xbc3618(0x279)](_0xbc3618(0x1b2))[_0xbc3618(0x32e)]['remove'](
        _0xbc3618(0x25a),
      );
}
function handwriting_pen() {
  var _0x18a55c = _0x403d68;
  cropper && cropper[_0x18a55c(0x1e4)](),
    (sketch_pad['weight'] = 0x2),
    (sketch_pad[_0x18a55c(0x2d1)] = _0x18a55c(0x1b6)),
    (sketch_pad[_0x18a55c(0x2ec)] = 'draw'),
    (document['getElementById'](_0x18a55c(0x229))[_0x18a55c(0x2ae)][
      _0x18a55c(0x1dc)
    ] = 0x2),
    (document['getElementById'](_0x18a55c(0x25d))['style'][_0x18a55c(0x1dc)] =
      0x1),
    document[_0x18a55c(0x2bd)](_0x18a55c(0x1e9))['classList'][_0x18a55c(0x349)](
      _0x18a55c(0x1e5),
    ),
    document[_0x18a55c(0x279)](_0x18a55c(0x1b2)) &&
      document[_0x18a55c(0x279)](_0x18a55c(0x1b2))[_0x18a55c(0x32e)][
        _0x18a55c(0x349)
      ](_0x18a55c(0x25a));
}
function eraser_evt() {
  var _0x12b675 = _0x403d68;
  cropper && cropper['destroy'](),
    (sketch_pad[_0x12b675(0x27c)] = 0xa),
    document['getElementById'](_0x12b675(0x316))[_0x12b675(0x2ae)][
      _0x12b675(0x240)
    ] == 'block'
      ? (sketch_pad[_0x12b675(0x2ec)] = 'erase')
      : ((sketch_pad[_0x12b675(0x2d1)] = _0x12b675(0x306)),
        (sketch_pad['mode'] = 'draw')),
    (document[_0x12b675(0x2bd)](_0x12b675(0x229))[_0x12b675(0x2ae)][
      _0x12b675(0x1dc)
    ] = 0x2),
    (document[_0x12b675(0x2bd)](_0x12b675(0x25d))['style'][_0x12b675(0x1dc)] =
      0x1),
    document[_0x12b675(0x2bd)](_0x12b675(0x1e9))[_0x12b675(0x32e)][
      _0x12b675(0x349)
    ](_0x12b675(0x1e5)),
    document[_0x12b675(0x279)](_0x12b675(0x1b2)) &&
      document[_0x12b675(0x279)](_0x12b675(0x1b2))['classList'][
        _0x12b675(0x349)
      ](_0x12b675(0x25a));
}
var lastTouchEnd = 0x0,
  all_btn = document['querySelectorAll'](_0x403d68(0x2c8));
for (var i = 0x0; i < all_btn['length']; i++) {
  all_btn[i]['addEventListener'](
    _0x403d68(0x2b4),
    function (_0xc266e) {
      var _0x35ee16 = _0x403d68,
        _0x26c348 = new Date()[_0x35ee16(0x31b)]();
      _0x26c348 - lastTouchEnd <= 0x12c && _0xc266e[_0x35ee16(0x334)](),
        (lastTouchEnd = _0x26c348);
    },
    ![],
  );
}
function latex_parse(_0x5024ca) {
  var _0x5024ca = latex_parse_upper(_0x5024ca),
    _0x5024ca = latex_parse_frac(_0x5024ca),
    _0x5024ca = latex_parse_log_under(_0x5024ca),
    _0x5024ca = latex_parse_root(_0x5024ca);
  return _0x5024ca;
}
function latex_parse_upper(_0x5d1661) {
  var _0x5a3afb = _0x403d68;
  (_0x5d1661 = _0x5d1661[_0x5a3afb(0x2d7)](
    /(\\int\s*_.*?)\^/g,
    _0x5a3afb(0x332),
  )),
    (_0x5d1661 = _0x5d1661[_0x5a3afb(0x2d7)](
      /(\\sum\s*_.*?)\^/g,
      _0x5a3afb(0x332),
    )),
    (_0x5d1661 = _0x5d1661['replace'](
      /([a-zA-Z0-9\.]+)\s*\^/g,
      _0x5a3afb(0x2b5),
    )),
    (_0x5d1661 = _0x5d1661[_0x5a3afb(0x2d7)](/\\left\s*\\\{/g, 'ltemp')),
    (_0x5d1661 = _0x5d1661[_0x5a3afb(0x2d7)](/\\right\s*\\\}/g, 'rtemp'));
  var _0x3bf52d = 0x0;
  while (_0x5d1661[_0x5a3afb(0x33b)](/\{[^\{\}]*?\}/)) {
    (_0x5d1661 = _0x5d1661[_0x5a3afb(0x2d7)](
      /\{([^\{\}]*?)\}/,
      _0x5a3afb(0x231) + _0x3bf52d + _0x5a3afb(0x27a) + 'rbs' + _0x3bf52d,
    )),
      _0x3bf52d++;
  }
  while (_0x5d1661['match'](/rbs\d+\s*\^\s*lbs\d+/)) {
    var _0x4ad535 = _0x5d1661['match'](/rbs(\d+)\s*\^\s*lbs(\d+)/),
      _0x583c45 = new RegExp(
        '(lbs' +
          _0x4ad535[0x1] +
          _0x5a3afb(0x1c4) +
          _0x4ad535[0x1] +
          '\x5cs*)\x5c^(\x5cs*' +
          _0x5a3afb(0x231) +
          _0x4ad535[0x2] +
          '.*?rbs' +
          _0x4ad535[0x2] +
          ')',
      );
    _0x5d1661 = _0x5d1661[_0x5a3afb(0x2d7)](_0x583c45, _0x5a3afb(0x267));
  }
  return (
    (_0x5d1661 = _0x5d1661['replace'](/ltemp/g, _0x5a3afb(0x275))),
    (_0x5d1661 = _0x5d1661['replace'](/rtemp/g, _0x5a3afb(0x288))),
    (_0x5d1661 = _0x5d1661['replace'](/rbs\d+/g, '}')),
    (_0x5d1661 = _0x5d1661['replace'](/lbs\d+/g, '{')),
    (_0x5d1661 = _0x5d1661['replace'](/tempup/g, '^')),
    (_0x5d1661 = _0x5d1661[_0x5a3afb(0x2d7)](/itexuper/g, '^')),
    _0x5d1661
  );
}
function latex_parse_frac(_0x430be6) {
  var _0x28df2a = _0x403d68;
  (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](/\\left\s*\\\{/g, _0x28df2a(0x2aa))),
    (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](
      /\\right\s*\\\}/g,
      _0x28df2a(0x213),
    ));
  var _0x14424d = 0x0;
  while (_0x430be6[_0x28df2a(0x33b)](/\{[^\{\}]*?\}/)) {
    (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](
      /\{([^\{\}]*?)\}/,
      _0x28df2a(0x231) +
        _0x14424d +
        '\x20$1\x20' +
        _0x28df2a(0x330) +
        _0x14424d,
    )),
      _0x14424d++;
  }
  while (_0x430be6[_0x28df2a(0x33b)](/\\frac\s*lbs\d+/)) {
    var _0x1290b3 = _0x430be6[_0x28df2a(0x33b)](/\\frac\s*lbs(\d+)/),
      _0x2c00d5 = new RegExp(
        _0x28df2a(0x2b7) +
          _0x1290b3[0x1] +
          _0x28df2a(0x21b) +
          _0x28df2a(0x330) +
          _0x1290b3[0x1] +
          _0x28df2a(0x32d),
      ),
      _0x56cea9 = _0x430be6[_0x28df2a(0x33b)](_0x2c00d5),
      _0x4f2744 = new RegExp(
        '\x5c\x5cfrac(\x5cs*lbs' +
          _0x1290b3[0x1] +
          _0x28df2a(0x1c4) +
          _0x1290b3[0x1] +
          _0x28df2a(0x23b) +
          _0x56cea9[0x1] +
          _0x28df2a(0x1c4) +
          _0x56cea9[0x1] +
          ')',
      );
    (_0x430be6 = _0x430be6['replace'](_0x4f2744, _0x28df2a(0x299))),
      (_0x430be6 = _0x430be6['replace'](
        /\}check\s*([a-zA-Z])/g,
        _0x28df2a(0x2f1),
      )),
      (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](/\}check\s*([\{\(])/g, '}*$1')),
      (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](
        /\}check\s*(\\sin)/g,
        _0x28df2a(0x2f1),
      )),
      (_0x430be6 = _0x430be6['replace'](
        /\}check\s*(\\cos)/g,
        _0x28df2a(0x2f1),
      )),
      (_0x430be6 = _0x430be6['replace'](/\}check\s*(\\tan)/g, '}*$1')),
      (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](
        /\}check\s*(\\sec)/g,
        _0x28df2a(0x2f1),
      )),
      (_0x430be6 = _0x430be6['replace'](
        /\}check\s*(\\csc)/g,
        _0x28df2a(0x2f1),
      )),
      (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](
        /\}check\s*(\\cot)/g,
        _0x28df2a(0x2f1),
      )),
      (_0x430be6 = _0x430be6['replace'](
        /\}check\s*(\\log)/g,
        _0x28df2a(0x2f1),
      )),
      (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](
        /\}check\s*(\\ln)/g,
        _0x28df2a(0x2f1),
      )),
      (_0x430be6 = _0x430be6['replace'](/\}check/g, '}'));
  }
  return (
    (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](/ltemp/g, _0x28df2a(0x275))),
    (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](/rtemp/g, _0x28df2a(0x288))),
    (_0x430be6 = _0x430be6['replace'](/rbs\d+/g, '}')),
    (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](/lbs\d+/g, '{')),
    (_0x430be6 = _0x430be6[_0x28df2a(0x2d7)](/tempfc/g, '\x5cfrac')),
    _0x430be6
  );
}
function latex_parse_log_under(_0x21705e) {
  var _0x17ca1b = _0x403d68;
  (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](
    /\\ln\s*([a-zA-Z0-9\.]+)/g,
    _0x17ca1b(0x2c2),
  )),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/\\log\s*_/g, 'goltemp')),
    (_0x21705e = _0x21705e['replace'](/\\log/g, _0x17ca1b(0x324))),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/goltemp/g, '\x5clog\x20_')),
    (_0x21705e = _0x21705e['replace'](/\\left\s*\\\{/g, _0x17ca1b(0x2aa))),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](
      /\\right\s*\\\}/g,
      _0x17ca1b(0x213),
    )),
    (_0x21705e = _0x21705e['replace'](/\(/g, '{smb\x20')),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/\)/g, _0x17ca1b(0x1be)));
  var _0x148367 = 0x0;
  while (_0x21705e[_0x17ca1b(0x33b)](/\{[^\{\}]*?\}/)) {
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](
      /\{([^\{\}]*?)\}/,
      _0x17ca1b(0x231) +
        _0x148367 +
        _0x17ca1b(0x27a) +
        _0x17ca1b(0x330) +
        _0x148367,
    )),
      _0x148367++;
  }
  while (_0x21705e['match'](/\\log\s*_\s*lbs\d+/)) {
    var _0x555ebb = _0x21705e['match'](/\\log\s*_\s*lbs(\d+)/),
      _0x4cb401 = new RegExp(
        _0x17ca1b(0x1ae) +
          'lbs' +
          _0x555ebb[0x1] +
          _0x17ca1b(0x1c4) +
          _0x555ebb[0x1] +
          ')',
      );
    _0x21705e = _0x21705e[_0x17ca1b(0x2d7)](_0x4cb401, _0x17ca1b(0x34a));
  }
  (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/ltemp/g, _0x17ca1b(0x275))),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/rtemp/g, _0x17ca1b(0x288))),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/rbs\d+/g, '}')),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/lbs\d+/g, '{')),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](
      /(\\lcg\s*)([a-zA-Z0-9\.]+)/g,
      _0x17ca1b(0x2d4),
    )),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/\\left\s*\\\{/g, 'ltemp')),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](
      /\\right\s*\\\}/g,
      _0x17ca1b(0x213),
    ));
  var _0x148367 = 0x0;
  while (_0x21705e[_0x17ca1b(0x33b)](/\{[^\{\}]*?\}/)) {
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](
      /\{([^\{\}]*?)\}/,
      'lbs' + _0x148367 + '\x20$1\x20' + _0x17ca1b(0x330) + _0x148367,
    )),
      _0x148367++;
  }
  while (_0x21705e[_0x17ca1b(0x33b)](/\\lcg\s*lbs\d+/)) {
    var _0x555ebb = _0x21705e[_0x17ca1b(0x33b)](/\\lcg\s*lbs(\d+)/),
      _0x4cb401 = new RegExp(
        '\x5c\x5cleg(.*?)\x5c\x5clcg\x5cs*' +
          _0x17ca1b(0x28e) +
          _0x555ebb[0x1] +
          _0x17ca1b(0x1c4) +
          _0x555ebb[0x1] +
          ')',
      );
    _0x21705e = _0x21705e['replace'](_0x4cb401, _0x17ca1b(0x1af));
  }
  while (_0x21705e[_0x17ca1b(0x33b)](/\\ln\s*lbs\d+/)) {
    var _0x555ebb = _0x21705e['match'](/\\ln\s*lbs(\d+)/),
      _0x4cb401 = new RegExp(
        _0x17ca1b(0x292) +
          _0x17ca1b(0x28e) +
          _0x555ebb[0x1] +
          _0x17ca1b(0x1c4) +
          _0x555ebb[0x1] +
          ')',
      );
    _0x21705e = _0x21705e[_0x17ca1b(0x2d7)](_0x4cb401, _0x17ca1b(0x269));
  }
  return (
    (_0x21705e = _0x21705e['replace'](/ltemp/g, _0x17ca1b(0x275))),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/rtemp/g, '\x5cright\x5c}')),
    (_0x21705e = _0x21705e['replace'](/rbs\d+/g, '}')),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/lbs\d+/g, '{')),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/\{\s*smb/g, '(')),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/smb\s*\}/g, ')')),
    (_0x21705e = _0x21705e[_0x17ca1b(0x2d7)](/\s+/g, '\x20')),
    _0x21705e
  );
}
function latex_parse_root(_0x588308) {
  var _0x10ecba = _0x403d68;
  (_0x588308 = _0x588308['replace'](/\\left\s*\\\{/g, _0x10ecba(0x2aa))),
    (_0x588308 = _0x588308['replace'](/\\right\s*\\\}/g, _0x10ecba(0x213)));
  var _0x367764 = 0x0;
  while (_0x588308[_0x10ecba(0x33b)](/\{[^\{\}]*?\}/)) {
    (_0x588308 = _0x588308[_0x10ecba(0x2d7)](
      /\{([^\{\}]*?)\}/,
      _0x10ecba(0x231) + _0x367764 + _0x10ecba(0x27a) + 'rbs' + _0x367764,
    )),
      _0x367764++;
  }
  while (_0x588308[_0x10ecba(0x33b)](/\\sqrt\s*\[.*?\]\s*lbs\d+/)) {
    var _0x2f5f17 = _0x588308['match'](/\\sqrt\s*\[(.*?)\]\s*lbs(\d+)/),
      _0x27294f = new RegExp(
        _0x10ecba(0x261) +
          _0x2f5f17[0x2] +
          _0x10ecba(0x21b) +
          'rbs' +
          _0x2f5f17[0x2] +
          ')',
      );
    _0x588308 = _0x588308[_0x10ecba(0x2d7)](
      _0x27294f,
      '{$1\x20^{\x20\x5cfrac\x20{\x201\x20}\x20{\x20' +
        _0x2f5f17[0x1] +
        _0x10ecba(0x2e8),
    );
  }
  return (
    (_0x588308 = _0x588308[_0x10ecba(0x2d7)](/ltemp/g, _0x10ecba(0x275))),
    (_0x588308 = _0x588308['replace'](/rtemp/g, '\x5cright\x5c}')),
    (_0x588308 = _0x588308[_0x10ecba(0x2d7)](/rbs\d+/g, '}')),
    (_0x588308 = _0x588308[_0x10ecba(0x2d7)](/lbs\d+/g, '{')),
    (_0x588308 = _0x588308[_0x10ecba(0x2d7)](/tempfc/g, '\x5cfrac')),
    (_0x588308 = _0x588308[_0x10ecba(0x2d7)](/\s+/g, '\x20')),
    _0x588308
  );
}
function calc_parse_log(_0x3962d0) {
  var _0x8aec47 = _0x403d68,
    _0x8b9ca3 = 0x0;
  while (_0x3962d0[_0x8aec47(0x33b)](/\([^\(\)]*?\)/)) {
    (_0x3962d0 = _0x3962d0[_0x8aec47(0x2d7)](
      /\(([^\(\)]*?)\)/,
      _0x8aec47(0x231) +
        _0x8b9ca3 +
        _0x8aec47(0x27a) +
        _0x8aec47(0x330) +
        _0x8b9ca3,
    )),
      _0x8b9ca3++;
  }
  while (_0x3962d0[_0x8aec47(0x33b)](/log\s*lbs\d+/)) {
    var _0x19712d = _0x3962d0[_0x8aec47(0x33b)](/log\s*lbs(\d+)/),
      _0x251848 = new RegExp(
        'log\x5cs*' +
          _0x8aec47(0x28e) +
          _0x19712d[0x1] +
          _0x8aec47(0x1c4) +
          _0x19712d[0x1] +
          ')',
      );
    _0x3962d0 = _0x3962d0[_0x8aec47(0x2d7)](_0x251848, _0x8aec47(0x226));
  }
  return (
    (_0x3962d0 = _0x3962d0['replace'](/rbs\d+/g, ')')),
    (_0x3962d0 = _0x3962d0[_0x8aec47(0x2d7)](/lbs\d+/g, '(')),
    (_0x3962d0 = _0x3962d0[_0x8aec47(0x2d7)](/\s*\(\s*/g, '(')),
    (_0x3962d0 = _0x3962d0[_0x8aec47(0x2d7)](/\s*\)\s*/g, ')')),
    console['log'](_0x3962d0),
    _0x3962d0
  );
}
document[_0x403d68(0x279)](_0x403d68(0x253))['addEventListener'](
  'click',
  function (_0x415aed) {
    var _0x164c7c = _0x403d68;
    if (document[_0x164c7c(0x279)](_0x164c7c(0x1cb)))
      return (
        document[_0x164c7c(0x279)](_0x164c7c(0x29e))[_0x164c7c(0x32e)][
          'remove'
        ](_0x164c7c(0x1a3)),
        document[_0x164c7c(0x279)]('.site_iframe')[_0x164c7c(0x32e)][
          _0x164c7c(0x26e)
        ](_0x164c7c(0x2fd)),
        !![]
      );
    this['classList'][_0x164c7c(0x2af)]('ans_show')
      ? (this['classList'][_0x164c7c(0x349)]('ans_show'),
        this[_0x164c7c(0x32e)]['add']('ans_hidden'))
      : (this[_0x164c7c(0x32e)][_0x164c7c(0x349)](_0x164c7c(0x23c)),
        this['classList'][_0x164c7c(0x26e)](_0x164c7c(0x303)));
  },
  ![],
),
  window['addEventListener'](
    _0x403d68(0x320),
    function () {
      var _0x1247ac = _0x403d68;
      location[_0x1247ac(0x1ea)]();
    },
    ![],
  );
function wolfram_call(_0x1d42aa) {
  var _0x2f9c51 = _0x403d68,
    _0x2d0564 = _0x2f9c51(0x1ba) + encodeURIComponent(_0x1d42aa);
  (document[_0x2f9c51(0x279)](_0x2f9c51(0x29e))[_0x2f9c51(0x28a)] = _0x2d0564),
    document[_0x2f9c51(0x2bd)]('wolfram')['classList'][_0x2f9c51(0x349)](
      _0x2f9c51(0x2a0),
    ),
    loader_showing(),
    setTimeout(function () {
      var _0x1ad6d7 = _0x2f9c51;
      document[_0x1ad6d7(0x279)](_0x1ad6d7(0x29e))['classList']['add'](
        _0x1ad6d7(0x1a3),
      ),
        document[_0x1ad6d7(0x279)](_0x1ad6d7(0x29e))['classList']['remove'](
          _0x1ad6d7(0x2fd),
        ),
        loader_hide();
    }, 0xbb8);
}
function mathpapa_call(_0x206fdf) {
  var _0x303f29 = _0x403d68,
    _0x5e15dc = _0x303f29(0x26a) + encodeURIComponent(_0x206fdf);
  (popup_window[_0x303f29(0x2fb)]['href'] = _0x5e15dc),
    document[_0x303f29(0x2bd)]('mathpapa')[_0x303f29(0x32e)][_0x303f29(0x349)](
      'trans_checked',
    ),
    loader_showing(),
    setTimeout(function () {
      loader_hide();
    }, 0xbb8);
}
function google_call(_0x4b99ef) {
  var _0x39b4ef = _0x403d68,
    _0xdd5512 = _0x39b4ef(0x32f) + encodeURIComponent(_0x4b99ef);
  console['log'](_0xdd5512),
    (popup_window[_0x39b4ef(0x2fb)][_0x39b4ef(0x1ed)] = _0xdd5512),
    document[_0x39b4ef(0x2bd)](_0x39b4ef(0x1c7))[_0x39b4ef(0x32e)][
      _0x39b4ef(0x349)
    ](_0x39b4ef(0x2a0)),
    loader_showing(),
    setTimeout(function () {
      loader_hide();
    }, 0xbb8);
}
function loader_hide() {
  var _0x5ac9cc = _0x403d68;
  document[_0x5ac9cc(0x279)](_0x5ac9cc(0x1c8))[_0x5ac9cc(0x32e)][
    _0x5ac9cc(0x26e)
  ](_0x5ac9cc(0x215)),
    document[_0x5ac9cc(0x279)]('.loader_wrap')[_0x5ac9cc(0x32e)][
      _0x5ac9cc(0x349)
    ]('loader_show');
}
function eqn_createImg() {
  return new Promise(function (_0x533a39, _0x4cb2a1) {
    var _0xfe0fbd = _0x4f8a,
      _0x1676eb = parent['iTeXEQ'][_0xfe0fbd(0x31e)][_0xfe0fbd(0x2fa)];
    itex_wr_ready == ![]
      ? (itex_wr_ready = !![])
      : (console[_0xfe0fbd(0x34b)](_0xfe0fbd(0x27f)), _0x4cb2a1(![]));
    document['querySelector'](_0xfe0fbd(0x2ce)) &&
      document[_0xfe0fbd(0x279)](_0xfe0fbd(0x2ce))['parentNode']['removeChild'](
        document['querySelector'](_0xfe0fbd(0x2ce)),
      );
    var _0x389717 = _0x1676eb[_0xfe0fbd(0x279)](_0xfe0fbd(0x33a)),
      _0x5eed5a,
      _0x220eb7,
      _0xc0b8b4,
      _0x1e1532;
    if (document[_0xfe0fbd(0x279)](_0xfe0fbd(0x289))) {
      var _0x340e1 = document[_0xfe0fbd(0x279)](_0xfe0fbd(0x289))[
        'getBoundingClientRect'
      ]();
      _0x340e1[_0xfe0fbd(0x1fe)] > 0x1 && _0x340e1[_0xfe0fbd(0x2cb)] > 0x1
        ? ((_0x5eed5a = 0x0), (_0x220eb7 = 0x0))
        : ((_0x5eed5a = minX - 0x14), (_0x220eb7 = minY - 0x14)),
        maxX > _0x340e1[_0xfe0fbd(0x273)]
          ? (_0xc0b8b4 = maxX + 0x14)
          : (_0xc0b8b4 = _0x340e1[_0xfe0fbd(0x273)] + 0x14),
        maxY > _0x340e1[_0xfe0fbd(0x1f9)]
          ? (_0x1e1532 = maxY + 0x14)
          : (_0x1e1532 = _0x340e1[_0xfe0fbd(0x1f9)] + 0x14),
        _0x5eed5a < 0x0 && (_0x5eed5a = 0x0),
        _0x220eb7 < 0x0 && (_0x220eb7 = 0x0),
        _0xc0b8b4 >
          document['querySelector'](_0xfe0fbd(0x219))[_0xfe0fbd(0x230)]()[
            _0xfe0fbd(0x273)
          ] &&
          (_0xc0b8b4 = document['querySelector'](_0xfe0fbd(0x219))[
            _0xfe0fbd(0x230)
          ]()[_0xfe0fbd(0x273)]),
        _0x1e1532 >
          document[_0xfe0fbd(0x279)](_0xfe0fbd(0x219))[
            'getBoundingClientRect'
          ]()[_0xfe0fbd(0x1f9)] &&
          (_0x1e1532 = document[_0xfe0fbd(0x279)](_0xfe0fbd(0x219))[
            _0xfe0fbd(0x230)
          ]()[_0xfe0fbd(0x1f9)]);
    } else
      (_0x5eed5a = minX - 0x14),
        (_0x220eb7 = minY - 0x14),
        (_0xc0b8b4 = maxX + 0x14),
        (_0x1e1532 = maxY + 0x14);
    html2canvas(document[_0xfe0fbd(0x279)](_0xfe0fbd(0x219)), {
      x: _0x5eed5a,
      y: _0x220eb7,
      width: _0xc0b8b4 - _0x5eed5a,
      height: _0x1e1532 - _0x220eb7,
      scale: 0.7,
    })
      [_0xfe0fbd(0x28c)]((_0x12e32c) => {
        var _0x1ab2d1 = _0xfe0fbd;
        const _0x3fca96 = _0x12e32c[_0x1ab2d1(0x30f)](_0x1ab2d1(0x1f6)),
          _0x517c84 = document[_0x1ab2d1(0x22f)](_0x1ab2d1(0x26b));
        (_0x517c84[_0x1ab2d1(0x28a)] = _0x3fca96),
          _0x389717[_0x1ab2d1(0x258)]['replaceChild'](_0x517c84, _0x389717),
          (itex_wr_ready = ![]),
          app_reset(),
          _0x533a39(!![]);
      })
      [_0xfe0fbd(0x290)]((_0x361037) => {
        var _0x34603b = _0xfe0fbd;
        console[_0x34603b(0x297)](_0x34603b(0x352), _0x361037), _0x4cb2a1(![]);
      });
  });
}
