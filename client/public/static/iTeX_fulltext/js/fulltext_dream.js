/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable no-redeclare */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-constant-condition */
/* eslint-disable no-func-assign */
/* eslint-disable no-undef */
var _0x32809c = _0x52a6;
(function (_0x36641f, _0x52b020) {
  var _0x4e01ac = _0x52a6,
    _0x5a37eb = _0x36641f();
  while ([]) {
    try {
      var _0x4bea19 =
        (parseInt(_0x4e01ac(0x180)) / 0x1) *
          (parseInt(_0x4e01ac(0x1ff)) / 0x2) +
        parseInt(_0x4e01ac(0xf9)) / 0x3 +
        (-parseInt(_0x4e01ac(0x161)) / 0x4) *
          (-parseInt(_0x4e01ac(0x1ce)) / 0x5) +
        (parseInt(_0x4e01ac(0x152)) / 0x6) *
          (-parseInt(_0x4e01ac(0x1d8)) / 0x7) +
        -parseInt(_0x4e01ac(0xe6)) / 0x8 +
        (-parseInt(_0x4e01ac(0x104)) / 0x9) *
          (parseInt(_0x4e01ac(0x1bd)) / 0xa) +
        (parseInt(_0x4e01ac(0x1c0)) / 0xb) * (parseInt(_0x4e01ac(0xf5)) / 0xc);
      if (_0x4bea19 === _0x52b020) break;
      else _0x5a37eb['push'](_0x5a37eb['shift']());
    } catch (_0x4a16ec) {
      _0x5a37eb['push'](_0x5a37eb['shift']());
    }
  }
})(_0x6f8d, 0x63684);
var cropper, cropImageOrigin_w, cropImageOrigin_h;
window[_0x32809c(0x16d)](
  _0x32809c(0x137),
  function () {
    var _0x278e93 = _0x32809c,
      _0x5a6ba4 = document[_0x278e93(0xee)](_0x278e93(0x114));
    for (thum of _0x5a6ba4) {
      thum[_0x278e93(0x16d)](_0x278e93(0x146), function () {
        var _0x272dca = _0x278e93;
        document[_0x272dca(0x111)]('.img-thumbnail-sel') &&
          document[_0x272dca(0x111)](_0x272dca(0x1c2))[_0x272dca(0x188)][
            'remove'
          ](_0x272dca(0x136)),
          this['classList']['add'](_0x272dca(0x136));
      });
    }
    var _0x20a54d =
      tinymce['activeEditor']?.[_0x278e93(0x198)] ||
      tinymce[_0x278e93(0x1ae)]?.[_0x278e93(0x216)];
    _0x20a54d?.['document']?.[_0x278e93(0x1a7)]?.[_0x278e93(0x176)](
      _0x278e93(0x1a0),
      'true',
    ),
      tinymce[_0x278e93(0x1c8)](_0x278e93(0x18e))[_0x278e93(0x216)][
        _0x278e93(0x16d)
      ](
        _0x278e93(0x1c5),
        function (_0x2f83b8) {
          var _0xf67f60 = _0x278e93;
          if (
            _0x2f83b8[_0xf67f60(0x218)] == 0x27 ||
            _0x2f83b8[_0xf67f60(0x218)] == 0x22
          ) {
            var _0x72f323 = iTeXEQ[_0xf67f60(0x16b)]['getSelection']();
            if (_0x72f323['getRangeAt'] || _0x72f323[_0xf67f60(0xf8)]) {
              var _0x27431f = _0x72f323['focusNode'],
                _0x3c24a2 = _0x72f323[_0xf67f60(0x1bf)],
                _0x1e1762;
              _0x27431f['textContent']
                ['charAt'](_0x3c24a2 - 0x1)
                [_0xf67f60(0x1e3)](/^\s*$/) || _0x3c24a2 == 0x0
                ? (_0x2f83b8[_0xf67f60(0x218)] == 0x27
                    ? (_0x1e1762 = document['createTextNode']('‘'))
                    : (_0x1e1762 = document[_0xf67f60(0xfc)]('“')),
                  _0x72f323[_0xf67f60(0x219)](0x0)[_0xf67f60(0x133)](_0x1e1762))
                : (_0x2f83b8[_0xf67f60(0x218)] == 0x27
                    ? (_0x1e1762 = document[_0xf67f60(0xfc)]('’'))
                    : (_0x1e1762 = document[_0xf67f60(0xfc)]('”')),
                  _0x72f323[_0xf67f60(0x219)](0x0)['insertNode'](_0x1e1762)),
                tinymce['activeEditor'][_0xf67f60(0x21f)][_0xf67f60(0x1c7)](
                  _0x1e1762,
                  0x1,
                ),
                tinymce[_0xf67f60(0x1ae)][_0xf67f60(0xfe)](),
                _0x2f83b8['preventDefault']();
            }
          }
        },
        ![],
      );
  },
  ![],
),
  document[_0x32809c(0x111)](_0x32809c(0x210))?.[_0x32809c(0x16d)](
    _0x32809c(0x146),
    itex_total_count,
    ![],
  ),
  document['querySelector'](_0x32809c(0x1d7))[_0x32809c(0x16d)](
    _0x32809c(0x113),
    function (_0x53a322) {
      var _0x188cc0 = _0x32809c;
      if (_0x53a322['keyCode'] == 0xd) {
        var _0x5eb9fa = parseInt(
            document[_0x188cc0(0x111)](_0x188cc0(0x1d7))[_0x188cc0(0x12a)],
          ),
          _0x3d38f8 = parseInt(
            document[_0x188cc0(0x111)](_0x188cc0(0x165))['textContent'][
              'match'
            ](/\d+/)[0x0],
          );
        const _0x398e41 = document[_0x188cc0(0x111)](_0x188cc0(0xef));
        if (_0x5eb9fa < 0x1 || _0x5eb9fa > _0x3d38f8 || !_0x5eb9fa)
          return alert(_0x188cc0(0x1b8)), ![];
        cropper[_0x188cc0(0xf6)](),
          (document[_0x188cc0(0xe0)](_0x188cc0(0x1cd))[_0x188cc0(0x18b)][
            'display'
          ] = _0x188cc0(0x19e)),
          (document['querySelector'](_0x188cc0(0x14f))[_0x188cc0(0x18b)][
            'display'
          ] = _0x188cc0(0x155));
        var _0x1a11ac = document[_0x188cc0(0x111)](_0x188cc0(0xef))[
          _0x188cc0(0x1f9)
        ](_0x188cc0(0x1d5));
        renderPage(_0x5eb9fa);
      }
    },
    ![],
  ),
  (window[_0x32809c(0x211)] = function (_0x4afa71) {
    return ![];
  });
function itex_total_count() {
  var _0x268e58 = _0x32809c,
    _0x1ba320 = new bootstrap[_0x268e58(0xe7)](
      document[_0x268e58(0xe0)]('itex_total_modal'),
    );
  _0x1ba320[_0x268e58(0x15c)]();
}
function itex_fulltext_out() {
  var _0x361d84 = _0x32809c,
    _0x4c1428 = new bootstrap[_0x361d84(0xe7)](
      document[_0x361d84(0xe0)](_0x361d84(0x11b)),
    );
  _0x4c1428[_0x361d84(0x15c)](),
    document[_0x361d84(0x111)](_0x361d84(0x21d))[_0x361d84(0x16d)](
      _0x361d84(0x146),
      function () {
        var _0x4b5627 = _0x361d84;
        location[_0x4b5627(0x186)] = _0x4b5627(0x13d);
      },
      ![],
    );
}
function itex_crop_clear() {
  var _0x52b428 = _0x32809c;
  cropper &&
    (cropper[_0x52b428(0x148)](),
    (document[_0x52b428(0x111)](_0x52b428(0x14f))[_0x52b428(0x18b)]['display'] =
      _0x52b428(0x155)));
}
function itex_page_clear() {
  var _0x39a437 = _0x32809c;
  cropper && cropper[_0x39a437(0xf6)]();
  document['getElementById'](_0x39a437(0x1de))[_0x39a437(0x12a)] = '';
  var _0x30ccc0 = document[_0x39a437(0xe0)](_0x39a437(0x1e5))[_0x39a437(0x1cf)];
  _0x30ccc0['innerHTML'] = '';
  var _0xddcb38 = document[_0x39a437(0x1f4)](_0x39a437(0x184));
  (_0xddcb38['id'] = 'itex_main_img'),
    _0x30ccc0[_0x39a437(0x1ed)](_0xddcb38),
    document['querySelector'](_0x39a437(0x13c))[_0x39a437(0x188)]['remove'](
      _0x39a437(0x12c),
    ),
    (document[_0x39a437(0x111)]('.qnai_trans_form')[_0x39a437(0x18b)][
      _0x39a437(0x1f3)
    ] = _0x39a437(0x155)),
    document[_0x39a437(0x111)](_0x39a437(0x124))[_0x39a437(0x188)][
      _0x39a437(0xfd)
    ]('itex_area_hidden');
  var _0x639895 = document[_0x39a437(0x111)]('.itex_hml_convert_view'),
    _0x25cd2a = _0x639895[_0x39a437(0x126)](!![]);
  _0x639895[_0x39a437(0x1cf)][_0x39a437(0x147)](_0x25cd2a, _0x639895),
    document['querySelector']('.pdf_page_show')[_0x39a437(0x188)]['add'](
      _0x39a437(0x138),
    ),
    document[_0x39a437(0x111)]('.img-thumbnail-sel') &&
      document[_0x39a437(0x111)]('.img-thumbnail-sel')[_0x39a437(0x188)][
        _0x39a437(0xfd)
      ](_0x39a437(0x136)),
    document[_0x39a437(0x111)](_0x39a437(0xef)) &&
      (document['querySelector'](_0x39a437(0xef))[_0x39a437(0x1bc)](
        _0x39a437(0x1d5),
      ),
      document[_0x39a437(0x111)]('.list_picked')[_0x39a437(0x1bc)](
        _0x39a437(0xec),
      )),
    setTimeout(() => {
      updateButtonStates(![], ![], ![], ![], ![]);
    }, 0x32);
}
function dataURItoBlob(_0x5ef4c8, _0x34200e) {
  var _0x33398c = _0x32809c,
    _0x3545a6;
  if (_0x5ef4c8[_0x33398c(0x127)](',')[0x0][_0x33398c(0x217)]('base64') >= 0x0)
    _0x3545a6 = atob(_0x5ef4c8[_0x33398c(0x127)](',')[0x1]);
  else _0x3545a6 = unescape(_0x5ef4c8['split'](',')[0x1]);
  var _0x336062 = _0x5ef4c8[_0x33398c(0x127)](',')[0x0]
      ['split'](':')[0x1]
      [_0x33398c(0x127)](';')[0x0],
    _0x25ed06 = new Uint8Array(_0x3545a6[_0x33398c(0x1e8)]);
  for (
    var _0x5c27ad = 0x0;
    _0x5c27ad < _0x3545a6[_0x33398c(0x1e8)];
    _0x5c27ad++
  ) {
    _0x25ed06[_0x5c27ad] = _0x3545a6['charCodeAt'](_0x5c27ad);
  }
  return new Blob([_0x25ed06], { type: _0x336062 });
}
document[_0x32809c(0x111)](_0x32809c(0x1fe))[_0x32809c(0x16d)](
  _0x32809c(0x146),
  function () {
    window_exchange(0x1);
  },
  ![],
);
function window_exchange(_0x5baad4) {
  var _0x4f8af3 = _0x32809c;
  const _0x4fd2fa = document[_0x4f8af3(0x111)](_0x4f8af3(0x21b)),
    _0x5a1dbb = document[_0x4f8af3(0x111)](_0x4f8af3(0x1ca));
  _0x5baad4 == 0x0
    ? ((_0x4fd2fa[_0x4f8af3(0x18b)][_0x4f8af3(0x11a)] = 0x2),
      (_0x5a1dbb[_0x4f8af3(0x18b)]['zIndex'] = 0x1))
    : ((_0x4fd2fa[_0x4f8af3(0x18b)][_0x4f8af3(0x11a)] = 0x1),
      (_0x5a1dbb[_0x4f8af3(0x18b)][_0x4f8af3(0x11a)] = 0x2));
}
function select_process2(_0x5bd351) {
  var _0x19ba50 = _0x32809c,
    _0x48e9f6 = _0x5bd351[_0x19ba50(0xee)](_0x19ba50(0x10b));
  for (var _0x46e3a7 of _0x48e9f6) {
    _0x46e3a7['outerHTML'] = _0x46e3a7[_0x19ba50(0x130)][_0x19ba50(0xfb)](
      /\s/g,
      '',
    );
  }
}
function select_process(_0x263b3f) {
  var _0x4d1d63 = _0x32809c,
    _0x42a9c8 = _0x263b3f[_0x4d1d63(0xee)](_0x4d1d63(0x10b));
  for (var _0x31b9f4 of _0x42a9c8) {
    _0x31b9f4[_0x4d1d63(0x1cf)][_0x4d1d63(0x1f6)] = _0x4d1d63(0x173);
  }
  var _0x508072 = _0x263b3f[_0x4d1d63(0x111)]('.level4_tmp');
  while (_0x508072) {
    if (
      _0x508072['nextElementSibling'] &&
      _0x508072['nextElementSibling']['classList'][_0x4d1d63(0x1ac)](
        'level4_tmp',
      )
    ) {
      var _0x2bcaa5 = 0x0,
        _0x32ed99 = _0x508072[_0x4d1d63(0x1e2)][_0x4d1d63(0xe1)];
      while (_0x32ed99[_0x4d1d63(0x1e8)] > 0x0) {
        _0x508072[_0x4d1d63(0x1ed)](_0x32ed99[0x0]), _0x2bcaa5++;
      }
      _0x508072['nextElementSibling'][_0x4d1d63(0x1cf)][_0x4d1d63(0x1a4)](
        _0x508072[_0x4d1d63(0x1e2)],
      ),
        _0x508072['classList'][_0x4d1d63(0x145)](_0x4d1d63(0x1e6)),
        _0x508072[_0x4d1d63(0x188)][_0x4d1d63(0xfd)]('level4_tmp');
    } else
      _0x508072[_0x4d1d63(0x188)][_0x4d1d63(0x145)](_0x4d1d63(0x1e6)),
        _0x508072[_0x4d1d63(0x188)][_0x4d1d63(0xfd)]('level4_tmp'),
        (_0x508072 = _0x263b3f['querySelector'](_0x4d1d63(0x1a2)));
  }
  var _0x2d38e6 = _0x263b3f[_0x4d1d63(0xee)](_0x4d1d63(0x1a2));
  while (_0x2d38e6[_0x4d1d63(0x1e8)] > 0x0) {
    (_0x2d38e6[0x0][_0x4d1d63(0x1f6)] = _0x4d1d63(0x1e6)),
      (_0x2d38e6 = _0x263b3f['querySelectorAll'](_0x4d1d63(0x1a2)));
  }
  var _0x559372 = _0x263b3f[_0x4d1d63(0xee)]('.level4');
  for (_0x508072 of _0x559372) {
    var _0x10ce7b = _0x508072[_0x4d1d63(0xee)](_0x4d1d63(0x10b));
    for (var _0xdad809 of _0x10ce7b) {
      var _0x55ff12 = document[_0x4d1d63(0x1f4)](_0x4d1d63(0x1ad));
      (_0x55ff12['className'] = _0x4d1d63(0x132)),
        _0xdad809[_0x4d1d63(0x1cf)][_0x4d1d63(0x1be)](_0x55ff12, _0xdad809),
        _0x55ff12[_0x4d1d63(0x1ed)](_0xdad809);
      var _0x2e735b = _0x55ff12[_0x4d1d63(0x16a)];
      while (_0x2e735b) {
        if (
          _0x2e735b[_0x4d1d63(0x20f)] == 0x1 &&
          _0x2e735b[_0x4d1d63(0x188)]['contains']('circ_num')
        )
          break;
        _0x55ff12[_0x4d1d63(0x1ed)](_0x2e735b),
          (_0x2e735b = _0x55ff12[_0x4d1d63(0x16a)]);
      }
    }
  }
  var _0x3c92e9 = _0x263b3f[_0x4d1d63(0xee)](_0x4d1d63(0x10b));
  for (var _0x51bb5a of _0x3c92e9) {
    (_0x51bb5a[_0x4d1d63(0x1f6)] = _0x4d1d63(0x129)),
      _0x51bb5a[_0x4d1d63(0x1cf)][_0x4d1d63(0x1be)](
        document[_0x4d1d63(0xfc)]('\x20'),
        _0x51bb5a[_0x4d1d63(0x16a)],
      );
  }
  var _0x2e236e = _0x263b3f[_0x4d1d63(0xee)](_0x4d1d63(0x120));
  for (var _0x31b9f4 of _0x2e236e) {
    var _0x3bceb2 = document[_0x4d1d63(0x1f4)]('br');
    _0x31b9f4[_0x4d1d63(0x1cf)][_0x4d1d63(0x1cf)][_0x4d1d63(0x1be)](
      _0x3bceb2,
      _0x31b9f4[_0x4d1d63(0x1cf)]['nextSibling'],
    ),
      _0x31b9f4[_0x4d1d63(0x1cf)]['removeChild'](_0x31b9f4);
  }
}
function contrastImage(_0x5656d6, _0x1661c8) {
  var _0x4a8ae8 = _0x32809c,
    _0x201da6 = _0x5656d6[_0x4a8ae8(0x183)];
  _0x1661c8 = _0x1661c8 / 0x64 + 0x1;
  var _0x2f69aa = 0x80 * (0x1 - _0x1661c8);
  for (
    var _0x5df667 = 0x0;
    _0x5df667 < _0x201da6[_0x4a8ae8(0x1e8)];
    _0x5df667 += 0x4
  ) {
    (_0x201da6[_0x5df667] = _0x201da6[_0x5df667] * _0x1661c8 + _0x2f69aa),
      (_0x201da6[_0x5df667 + 0x1] =
        _0x201da6[_0x5df667 + 0x1] * _0x1661c8 + _0x2f69aa),
      (_0x201da6[_0x5df667 + 0x2] =
        _0x201da6[_0x5df667 + 0x2] * _0x1661c8 + _0x2f69aa);
  }
  return _0x5656d6;
}
var pdfInfo = [];
function itex_img_upload(_0x43358d, _0x154bb6) {
  return new Promise((_0x64ff28, _0x3bd0d9) => {
    var _0x597bc7 = _0x52a6;
    document['querySelector']('.itex-drag-area')[_0x597bc7(0x188)][
      _0x597bc7(0xfd)
    ](_0x597bc7(0xf0));
    if (_0x43358d && _0x43358d[0x0]) {
      if (_0x43358d[0x0][_0x597bc7(0x1fa)]['match'](/\.hwp$/i)) {
        alert(_0x597bc7(0x192)), _0x3bd0d9(_0x597bc7(0x1b9));
        return;
      }
      if (_0x43358d[0x0][_0x597bc7(0x1fa)][_0x597bc7(0x1e3)](/\.hml$|\.HML/)) {
        (document[_0x597bc7(0xe0)](_0x597bc7(0x1cd))[_0x597bc7(0x18b)][
          _0x597bc7(0x1f3)
        ] = _0x597bc7(0x19e)),
          hml_upload(_0x43358d[0x0]);
        return;
      }
      var _0x12fea1 = [
        _0x597bc7(0x20e),
        'image/jpg',
        'image/png',
        'application/pdf',
        _0x597bc7(0x1a5),
      ];
      if (!_0x12fea1[_0x597bc7(0x123)](_0x43358d[0x0][_0x597bc7(0x213)]))
        return alert(_0x597bc7(0x160)), _0x3bd0d9('error'), ![];
      var _0x514e42 = new FileReader();
      _0x514e42['readAsDataURL'](_0x43358d[0x0]),
        _0x514e42['addEventListener']('load', function (_0x323ce1) {
          var _0x2d74d7 = _0x597bc7;
          cropper && cropper[_0x2d74d7(0xf6)]();
          var _0x52859c = _0x323ce1['target'][_0x2d74d7(0x149)];
          if (
            _0x52859c[_0x2d74d7(0x1e3)](/data:application\/pdf/i) ||
            _0x52859c['match'](/data:application\/haansoftpdf/i)
          ) {
            (document[_0x2d74d7(0xe0)](_0x2d74d7(0x1cd))[_0x2d74d7(0x18b)][
              _0x2d74d7(0x1f3)
            ] = 'block'),
              (pdfjsLib[_0x2d74d7(0x11d)][_0x2d74d7(0x202)] =
                '/static/OCR/PDF/pdf.worker.js');
            var _0x9915a1 = _0x52859c['replace'](/^.*?;base64,/, '');
            pdfDoc = null;
            const _0x34a0c9 = pdfjsLib[_0x2d74d7(0x18a)]({
              data: atob(_0x9915a1),
              cMapUrl: _0x2d74d7(0x189),
              cMapPacked: !![],
              fontExtraProperties: !![],
            });
            _0x34a0c9[_0x2d74d7(0x1b2)][_0x2d74d7(0x196)](
              function (_0xaa39a) {
                var _0x4e0ee7 = _0x2d74d7;
                (pdfInfo[_0x154bb6] = _0xaa39a),
                  document['querySelector'](_0x4e0ee7(0x1f5))[_0x4e0ee7(0x188)][
                    _0x4e0ee7(0xfd)
                  ](_0x4e0ee7(0x138)),
                  (document['querySelector'](_0x4e0ee7(0x1d7))[
                    _0x4e0ee7(0x130)
                  ] = '1'),
                  (document['querySelector'](_0x4e0ee7(0x165))['textContent'] =
                    '/' + pdfInfo[_0x154bb6][_0x4e0ee7(0x109)]),
                  (pageNumber = 0x1),
                  (document[_0x4e0ee7(0x111)](_0x4e0ee7(0x1d7))[
                    _0x4e0ee7(0x12a)
                  ] = pageNumber),
                  renderPage(pageNumber, _0x154bb6),
                  updateButtonStates(!![], !![], !![], ![], !![]),
                  _0x64ff28(!![]);
              },
              function (_0x10f387) {
                var _0x2d9027 = _0x2d74d7;
                console[_0x2d9027(0x1b9)](_0x10f387),
                  (document[_0x2d9027(0xe0)]('modal_block')[_0x2d9027(0x18b)][
                    _0x2d9027(0x1f3)
                  ] = _0x2d9027(0x155)),
                  document[_0x2d9027(0x111)](_0x2d9027(0x13c))[
                    _0x2d9027(0x188)
                  ][_0x2d9027(0x145)](_0x2d9027(0x12c)),
                  _0x3bd0d9(_0x2d9027(0x1b9));
              },
            );
          } else {
            document['querySelector']('.itex_ocrimg_area')[_0x2d74d7(0x18b)][
              _0x2d74d7(0x103)
            ] = _0x2d74d7(0x107);
            var _0x35ea96 = document[_0x2d74d7(0xe0)]('itex_main_img'),
              _0x5d2466 = parseInt(
                document['querySelector'](_0x2d74d7(0x13b))[_0x2d74d7(0xf2)]()[
                  _0x2d74d7(0x156)
                ],
              );
            (document[_0x2d74d7(0x111)]('.itex_ocrimg_area')[_0x2d74d7(0x18b)][
              'maxHeight'
            ] = _0x5d2466 - 0x5 + 'px'),
              (_0x35ea96[_0x2d74d7(0x108)] = _0x52859c);
            const _0x52156b = document['querySelector'](_0x2d74d7(0x124))[
              _0x2d74d7(0xf2)
            ]()[_0x2d74d7(0x156)];
            document['querySelector']('.pdf_page_show')[_0x2d74d7(0x188)][
              'add'
            ](_0x2d74d7(0x138)),
              (cropper = new Cropper(_0x35ea96, {
                ready() {
                  var _0x66defb = _0x2d74d7;
                  (document[_0x66defb(0x111)](_0x66defb(0xff))['style'][
                    _0x66defb(0x103)
                  ] = _0x66defb(0x1b5)),
                    (cropImageOrigin_w = _0x35ea96[_0x66defb(0x1d2)]),
                    (cropImageOrigin_h =
                      _0x35ea96[_0x66defb(0x142)] > _0x52156b
                        ? _0x52156b
                        : _0x35ea96[_0x66defb(0x142)]);
                  const _0x122898 =
                    document['querySelector']('.cropper-canvas');
                  _0x122898 &&
                    ((_0x122898['style'][_0x66defb(0x174)] = _0x52156b + 'px'),
                    (_0x122898[_0x66defb(0x18b)][_0x66defb(0x17d)] =
                      _0x66defb(0x107)));
                },
                viewMode: 0x0,
                modal: !![],
                guides: ![],
                autoCrop: ![],
                responsive: !![],
                crop(_0x5a704f) {
                  var _0x28bba0 = _0x2d74d7,
                    _0x2d6b91 = document['querySelector'](_0x28bba0(0x14f));
                  if (document[_0x28bba0(0x111)]('.cropper-modal')) {
                    _0x2d6b91[_0x28bba0(0x18b)][_0x28bba0(0x1f3)] =
                      _0x28bba0(0x14a);
                    var _0x1127b8 = document['querySelector'](_0x28bba0(0x153))[
                        _0x28bba0(0xf2)
                      ](),
                      _0x52a55b = _0x1127b8['y'] - 0x23;
                    _0x52a55b < 0xa && (_0x52a55b = 0xa),
                      (_0x2d6b91[_0x28bba0(0x18b)]['top'] =
                        _0x52a55b + window['pageYOffset'] + 'px'),
                      (_0x2d6b91[_0x28bba0(0x18b)]['left'] =
                        _0x1127b8['x'] +
                        window[_0x28bba0(0x1bb)] +
                        0x14 +
                        'px');
                  }
                },
              })),
              (document['getElementById'](_0x2d74d7(0x1cd))['style'][
                _0x2d74d7(0x1f3)
              ] = 'none'),
              document['querySelector'](_0x2d74d7(0x13c))['classList'][
                _0x2d74d7(0x145)
              ](_0x2d74d7(0x12c)),
              updateButtonStates(!![], !![], !![], ![], ![]),
              _0x64ff28(!![]);
          }
        });
    }
  });
}
function _0x52a6(_0x41532a, _0x3b2e10) {
  var _0x6f8ddf = _0x6f8d();
  return (
    (_0x52a6 = function (_0x52a67f, _0x3bab9e) {
      _0x52a67f = _0x52a67f - 0xdd;
      var _0x1fb41a = _0x6f8ddf[_0x52a67f];
      return _0x1fb41a;
    }),
    _0x52a6(_0x41532a, _0x3b2e10)
  );
}
function itex_multi_hml_upload(_0x3a4074) {
  return new Promise((_0x353111, _0x2d2287) => {
    var _0x32db16 = _0x52a6;
    document[_0x32db16(0x111)](_0x32db16(0x13c))[_0x32db16(0x188)][
      _0x32db16(0xfd)
    ](_0x32db16(0xf0));
    if (_0x3a4074 && _0x3a4074[0x0]) {
      if (_0x3a4074[0x0][_0x32db16(0x1fa)]['match'](/\.hwp$/i)) {
        alert(_0x32db16(0x192)), _0x2d2287(_0x32db16(0x1b9));
        return;
      }
      if (_0x3a4074[0x0][_0x32db16(0x1fa)][_0x32db16(0x1e3)](/\.hml$|\.HML/)) {
        (document[_0x32db16(0xe0)]('modal_block')[_0x32db16(0x18b)]['display'] =
          _0x32db16(0x19e)),
          hml_upload_frame(_0x3a4074[0x0]);
        return;
      } else alert(_0x32db16(0x10f));
    }
  });
}
var ercheck = ![];
function image_eraser() {
  var _0x54eb35 = _0x32809c;
  if (ercheck == ![]) ercheck = !![];
  else {
    cropper[_0x54eb35(0x171)]();
    var _0x55a3c3 = document['querySelector'](_0x54eb35(0x1b3)),
      _0x8fbdc7 = document[_0x54eb35(0x111)](_0x54eb35(0x162)),
      _0x550802 = document[_0x54eb35(0xe0)](_0x54eb35(0x1e5));
    (_0x55a3c3[_0x54eb35(0x108)] = _0x8fbdc7[_0x54eb35(0x151)]()),
      (_0x550802[_0x54eb35(0x108)] = _0x8fbdc7[_0x54eb35(0x151)]()),
      (document['querySelector'](_0x54eb35(0x1d1))[_0x54eb35(0x108)] =
        _0x8fbdc7[_0x54eb35(0x151)]()),
      _0x8fbdc7['parentNode']['removeChild'](_0x8fbdc7),
      _0x55a3c3[_0x54eb35(0x18b)]['removeProperty']('display'),
      document['querySelector'](_0x54eb35(0x1c3))[_0x54eb35(0x18b)][
        _0x54eb35(0xe3)
      ]('display'),
      (ercheck = ![]);
    return;
  }
  var _0x5edeef = document[_0x54eb35(0x111)](
      '.itex_ocrimg_area\x20.cropper-canvas\x20img',
    ),
    _0x5baee5 = document['createElement'](_0x54eb35(0xfa)),
    _0x324200 = _0x5baee5[_0x54eb35(0x10a)]('2d'),
    _0x25eca1 = new Image();
  (_0x25eca1[_0x54eb35(0x108)] = _0x5edeef['src']),
    (_0x25eca1['onload'] = function () {
      var _0x33ecfa = _0x54eb35,
        _0x243b98 = _0x5edeef[_0x33ecfa(0xf2)](),
        _0x4a1e7e = _0x243b98[_0x33ecfa(0x1b0)],
        _0x31951d = _0x243b98[_0x33ecfa(0x156)];
      (_0x5baee5['width'] = _0x4a1e7e),
        (_0x5baee5[_0x33ecfa(0x156)] = _0x31951d),
        _0x324200[_0x33ecfa(0xf4)](_0x25eca1, 0x0, 0x0, _0x4a1e7e, _0x31951d),
        _0x5edeef['parentNode'][_0x33ecfa(0x1ed)](_0x5baee5),
        cropper['disable'](),
        (document['querySelector'](_0x33ecfa(0x1c3))['style'][
          _0x33ecfa(0x1f3)
        ] = _0x33ecfa(0x155)),
        (_0x5edeef[_0x33ecfa(0x18b)][_0x33ecfa(0x1f3)] = 'none');
    }),
    _0x5baee5[_0x54eb35(0x16d)](_0x54eb35(0x19d), function (_0x20c4ff) {
      var _0x5be883 = _0x54eb35;
      (isPress = !![]),
        (old = {
          x: _0x20c4ff[_0x5be883(0x181)],
          y: _0x20c4ff[_0x5be883(0x11f)],
        });
    }),
    _0x5baee5['addEventListener'](_0x54eb35(0x13a), function (_0x44aeaa) {
      var _0x52cca7 = _0x54eb35,
        _0x365f6d = this[_0x52cca7(0x10a)]('2d');
      if (isPress) {
        var _0x48506d = _0x44aeaa['offsetX'],
          _0x479643 = _0x44aeaa[_0x52cca7(0x11f)];
        (_0x365f6d[_0x52cca7(0x1dc)] = _0x52cca7(0x179)),
          _0x365f6d[_0x52cca7(0x185)](),
          _0x365f6d[_0x52cca7(0x201)](
            _0x48506d,
            _0x479643,
            0xa,
            0x0,
            0x2 * Math['PI'],
          ),
          _0x365f6d[_0x52cca7(0x1fb)](),
          (_0x365f6d[_0x52cca7(0x1ba)] = 0x14),
          _0x365f6d[_0x52cca7(0x185)](),
          _0x365f6d[_0x52cca7(0x14b)](old['x'], old['y']),
          _0x365f6d[_0x52cca7(0x15b)](_0x48506d, _0x479643),
          _0x365f6d[_0x52cca7(0x193)](),
          (old = { x: _0x48506d, y: _0x479643 });
      }
    }),
    _0x5baee5[_0x54eb35(0x16d)](_0x54eb35(0x1f7), function (_0x99e02f) {
      isPress = ![];
    });
}
var isPress = ![],
  old = null;
function onPrevPage(_0x1769a3) {
  var _0x119882 = _0x32809c,
    _0x3f6e1a = parseInt(
      document[_0x119882(0x111)](_0x119882(0x1d7))[_0x119882(0x12a)],
      0xa,
    );
  if (_0x3f6e1a <= 0x1)
    return updateButtonStates(!![], !![], !![], ![], !![]), ![];
  else
    _0x3f6e1a == 0x2
      ? (_0x3f6e1a--, updateButtonStates(!![], !![], !![], ![], !![]))
      : (_0x3f6e1a--, updateButtonStates(!![], !![], !![], !![], !![]));
  cropper['destroy'](),
    (document[_0x119882(0xe0)](_0x119882(0x1cd))[_0x119882(0x18b)][
      _0x119882(0x1f3)
    ] = _0x119882(0x19e)),
    (document[_0x119882(0x111)](_0x119882(0x14f))[_0x119882(0x18b)][
      _0x119882(0x1f3)
    ] = _0x119882(0x155));
  var _0x5217ea = document[_0x119882(0x111)]('.list_picked')[_0x119882(0x1f9)](
    _0x119882(0x1d5),
  );
  renderPage(_0x3f6e1a, _0x1769a3),
    (document[_0x119882(0x111)](_0x119882(0x1d7))[_0x119882(0x12a)] =
      _0x3f6e1a);
}
function onNextPage(_0x40a922) {
  var _0x2e195d = _0x32809c,
    _0x383cce = document[_0x2e195d(0x111)](_0x2e195d(0x1d7))[_0x2e195d(0x12a)];
  if (_0x383cce >= pdfInfo[_0x40a922][_0x2e195d(0x109)]) return ![];
  else
    _0x383cce == pdfInfo[_0x40a922][_0x2e195d(0x109)] - 0x1
      ? (_0x383cce++, updateButtonStates(!![], !![], !![], !![], ![]))
      : (_0x383cce++, updateButtonStates(!![], !![], !![], !![], !![]));
  cropper[_0x2e195d(0xf6)](),
    (document[_0x2e195d(0xe0)](_0x2e195d(0x1cd))[_0x2e195d(0x18b)][
      _0x2e195d(0x1f3)
    ] = _0x2e195d(0x19e)),
    (document[_0x2e195d(0x111)](_0x2e195d(0x14f))['style'][_0x2e195d(0x1f3)] =
      _0x2e195d(0x155));
  var _0x1775af = document[_0x2e195d(0x111)]('.list_picked')[_0x2e195d(0x1f9)](
    _0x2e195d(0x1d5),
  );
  renderPage(_0x383cce, _0x40a922),
    (document[_0x2e195d(0x111)](_0x2e195d(0x1d7))[_0x2e195d(0x12a)] =
      _0x383cce);
}
function resizeImage(_0xaf95a1, _0x12096b) {
  var _0x46973a = _0x32809c,
    _0x2f6ceb = new Image();
  (_0x2f6ceb['src'] = _0xaf95a1),
    (_0x2f6ceb[_0x46973a(0x12b)] = 'anonymous'),
    (_0x2f6ceb[_0x46973a(0x17a)] = function () {
      var _0xd509be = _0x46973a;
      if (this[_0xd509be(0x1b0)] > 0x640)
        var _0x10fb80 = 0x640 / this[_0xd509be(0x1b0)];
      else var _0x10fb80 = 0x1;
      var _0x173084 = document['createElement'](_0xd509be(0xfa)),
        _0x3741df = _0x173084[_0xd509be(0x10a)]('2d');
      (_0x173084[_0xd509be(0x1b0)] = this[_0xd509be(0x1b0)] * _0x10fb80),
        (_0x173084[_0xd509be(0x156)] = this['height'] * _0x10fb80),
        (_0x3741df[_0xd509be(0x206)] = 'rgb(255,\x20255,\x20255)'),
        _0x3741df['drawImage'](
          _0x2f6ceb,
          0x0,
          0x0,
          _0x173084['width'],
          _0x173084[_0xd509be(0x156)],
        );
      var _0x6569f1 = _0x173084[_0xd509be(0x151)]('image/png');
      _0x12096b(_0x6569f1);
    });
}
function renderPage(_0x5d4282, _0x5b6d20) {
  var _0x59e9b6 = _0x32809c;
  pdfInfo[_0x5b6d20][_0x59e9b6(0x117)](_0x5d4282)[_0x59e9b6(0x196)](
    function (_0x38bccc) {
      var _0xba4f72 = _0x59e9b6;
      document[_0xba4f72(0x111)](_0xba4f72(0xff))[_0xba4f72(0x18b)][
        _0xba4f72(0x103)
      ] = 'hidden';
      var _0x4bb435 = _0x38bccc['getViewport']({ scale: 0x1 });
      if (_0x4bb435[_0xba4f72(0x1b0)] > 0x7d0) var _0x13a805 = 0x1;
      else var _0x13a805 = 0x9b0 / _0x4bb435[_0xba4f72(0x1b0)];
      document[_0xba4f72(0xe0)](_0xba4f72(0x1e5))[_0xba4f72(0x18b)][
        _0xba4f72(0x103)
      ] = 'hidden';
      var _0x27c852 = document[_0xba4f72(0x1f4)]('canvas');
      (_0x27c852['width'] = Math[_0xba4f72(0x18c)](
        _0x4bb435[_0xba4f72(0x1b0)] * _0x13a805,
      )),
        (_0x27c852[_0xba4f72(0x156)] = Math[_0xba4f72(0x18c)](
          _0x4bb435[_0xba4f72(0x156)] * _0x13a805,
        ));
      const _0x249504 = _0x27c852[_0xba4f72(0x10a)]('2d');
      _0x249504['save'](),
        (_0x249504[_0xba4f72(0x206)] = _0xba4f72(0x105)),
        _0x249504[_0xba4f72(0x17f)](
          0x0,
          0x0,
          _0x27c852[_0xba4f72(0x1b0)],
          _0x27c852[_0xba4f72(0x156)],
        ),
        _0x249504[_0xba4f72(0x121)]();
      var _0x317fa8 = {
          canvasContext: _0x249504,
          transform: [_0x13a805, 0x0, 0x0, _0x13a805, 0x0, 0x0],
          viewport: _0x4bb435,
        },
        _0x25e4b9 = _0x38bccc[_0xba4f72(0x17b)](_0x317fa8);
      _0x25e4b9[_0xba4f72(0x1b2)]['then'](function () {
        var _0x285930 = _0xba4f72,
          _0x4fc8f7 = document['getElementById']('itex_main_img'),
          _0x2009d0 = parseInt(
            document[_0x285930(0x111)]('.trans_area')[
              'getBoundingClientRect'
            ]()['height'],
          );
        (document['querySelector'](_0x285930(0xff))[_0x285930(0x18b)][
          _0x285930(0x174)
        ] = _0x2009d0 - 0x5 + 'px'),
          (_0x4fc8f7['src'] = _0x27c852[_0x285930(0x151)](_0x285930(0x20e))),
          (cropper = new Cropper(_0x4fc8f7, {
            ready() {
              var _0x72ed0b = _0x285930;
              console[_0x72ed0b(0x1d4)](_0x72ed0b(0x112)),
                (document[_0x72ed0b(0x111)](_0x72ed0b(0xff))[_0x72ed0b(0x18b)][
                  _0x72ed0b(0x103)
                ] = _0x72ed0b(0x1b5)),
                (document['getElementById'](_0x72ed0b(0x1e5))[_0x72ed0b(0x18b)][
                  _0x72ed0b(0x103)
                ] = _0x72ed0b(0x1b5)),
                (document[_0x72ed0b(0xe0)](_0x72ed0b(0x1cd))[_0x72ed0b(0x18b)][
                  _0x72ed0b(0x1f3)
                ] = _0x72ed0b(0x155)),
                document[_0x72ed0b(0x111)]('.itex-drag-area')['classList'][
                  _0x72ed0b(0x145)
                ](_0x72ed0b(0x12c)),
                (cropImageOrigin_w = _0x4fc8f7['naturalWidth']),
                (cropImageOrigin_h = _0x4fc8f7[_0x72ed0b(0x142)]);
            },
            viewMode: 0x0,
            modal: !![],
            guides: ![],
            autoCrop: ![],
            crop(_0x1027c0) {
              var _0x53bb6f = _0x285930,
                _0x157e68 = document['querySelector']('.qnai_trans_form');
              if (document[_0x53bb6f(0x111)](_0x53bb6f(0x143))) {
                _0x157e68[_0x53bb6f(0x18b)][_0x53bb6f(0x1f3)] = 'inline-block';
                var _0x10afe5 = document[_0x53bb6f(0x111)](_0x53bb6f(0x153))[
                    _0x53bb6f(0xf2)
                  ](),
                  _0x228a5e = _0x10afe5['y'] - 0x23;
                _0x228a5e < 0xa && (_0x228a5e = 0xa),
                  (_0x157e68[_0x53bb6f(0x18b)][_0x53bb6f(0x1cc)] =
                    _0x228a5e + window[_0x53bb6f(0x191)] + 'px'),
                  (_0x157e68['style']['left'] =
                    _0x10afe5['x'] + window[_0x53bb6f(0x1bb)] + 0x14 + 'px');
              }
            },
          }));
      });
    },
  );
}
document[_0x32809c(0x111)](_0x32809c(0x124))[_0x32809c(0x16d)](
  _0x32809c(0x1a6),
  (_0x17a35c) => {
    var _0x2920b2 = _0x32809c;
    _0x17a35c['preventDefault'](),
      document[_0x2920b2(0x111)]('.itex-drag-area')[_0x2920b2(0x188)]['add'](
        'active',
      );
  },
),
  document['querySelector'](_0x32809c(0x124))[_0x32809c(0x16d)](
    _0x32809c(0x1dd),
    () => {
      var _0x3d6ae1 = _0x32809c;
      document[_0x3d6ae1(0x111)](_0x3d6ae1(0x13c))[_0x3d6ae1(0x188)][
        _0x3d6ae1(0xfd)
      ](_0x3d6ae1(0xf0));
    },
  ),
  document[_0x32809c(0x111)]('.origin_img_area')[_0x32809c(0x16d)](
    _0x32809c(0x20b),
    (_0x12242d) => {
      var _0x30d184 = _0x32809c;
      _0x12242d[_0x30d184(0x208)](),
        itex_page_clear(),
        itex_img_upload(_0x12242d[_0x30d184(0xe8)]['files']);
    },
  );
var tooltipTriggerList = [][_0x32809c(0x122)][_0x32809c(0x11c)](
    document['querySelectorAll']('[data-bs-toggle=\x22tooltip\x22]'),
  ),
  tooltipList = tooltipTriggerList[_0x32809c(0x17e)](function (_0x4a719f) {
    var _0x197608 = _0x32809c;
    return new bootstrap[_0x197608(0x1a1)](_0x4a719f);
  });
function url_parse(_0x3ac9c1) {
  var _0x4c1f9f = _0x32809c;
  (_0x3ac9c1 = _0x3ac9c1['replace'](/^.+\//, '')),
    (_0x3ac9c1 = _0x3ac9c1[_0x4c1f9f(0xfb)](/\.pdf/i, '')),
    (document[_0x4c1f9f(0x111)](_0x4c1f9f(0xef))[_0x4c1f9f(0x130)] = _0x3ac9c1);
  var _0x1597b5,
    _0x3d1501,
    _0x49b2c3,
    _0x115be5,
    _0x51fea1,
    _0x54689a,
    _0x23484b,
    _0x16f8ee,
    _0x52bf1d = _0x3ac9c1[_0x4c1f9f(0x1e3)](/\[\s*\d+.+?\]/);
  if (_0x52bf1d) {
    _0x1597b5 = _0x52bf1d[0x0][_0x4c1f9f(0x1e3)](/\d+/)[0x0];
    var _0x3e9a0d = document[_0x4c1f9f(0xee)](_0x4c1f9f(0x214));
    for (var _0x1b2ea8 of _0x3e9a0d) {
      if (_0x1b2ea8['value'] == _0x1597b5) {
        _0x1b2ea8[_0x4c1f9f(0x200)] = !![];
        break;
      }
    }
  }
  var _0x52bf1d = _0x3ac9c1[_0x4c1f9f(0x1e3)](/\]\s*.+학교\s/);
  if (_0x52bf1d) {
    (_0x49b2c3 = _0x52bf1d[0x0]['match'](/\]\s*(.+?학교)\s/)[0x1]),
      (document[_0x4c1f9f(0x111)]('.itex_jb_school')['value'] = _0x49b2c3);
    if (_0x49b2c3[_0x4c1f9f(0x1e3)](/초등학교/)) _0x115be5 = 0x1;
    else
      _0x49b2c3[_0x4c1f9f(0x1e3)](/중학교/)
        ? (_0x115be5 = 0x2)
        : (_0x115be5 = 0x3);
    var _0x3e9a0d = document['querySelectorAll'](_0x4c1f9f(0xf7));
    for (var _0x1b2ea8 of _0x3e9a0d) {
      if (_0x1b2ea8[_0x4c1f9f(0x12a)] == _0x115be5) {
        _0x1b2ea8[_0x4c1f9f(0x200)] = !![];
        break;
      }
    }
  }
  var _0x52bf1d = _0x3ac9c1[_0x4c1f9f(0x1e3)](/\d\-\d/);
  if (_0x52bf1d) {
    _0x51fea1 = _0x52bf1d[0x0][_0x4c1f9f(0x127)]('-')[0x0];
    var _0x3e9a0d = document['querySelectorAll']('.itex_jb_grade\x20option');
    for (var _0x1b2ea8 of _0x3e9a0d) {
      if (_0x1b2ea8['value'] == _0x51fea1) {
        _0x1b2ea8[_0x4c1f9f(0x200)] = !![];
        break;
      }
    }
    _0x54689a = _0x52bf1d[0x0][_0x4c1f9f(0x127)]('-')[0x1];
    var _0x3e9a0d = document[_0x4c1f9f(0xee)](_0x4c1f9f(0x194));
    for (var _0x1b2ea8 of _0x3e9a0d) {
      if (_0x1b2ea8['value'] == _0x54689a) {
        _0x1b2ea8[_0x4c1f9f(0x200)] = !![];
        break;
      }
    }
  }
  var _0x52bf1d = _0x3ac9c1['match'](/중간/);
  if (_0x52bf1d) {
    var _0x3e9a0d = document[_0x4c1f9f(0xee)]('.itex_jb_source\x20option');
    for (var _0x1b2ea8 of _0x3e9a0d) {
      if (_0x1b2ea8[_0x4c1f9f(0x12a)] == 0x1) {
        _0x1b2ea8[_0x4c1f9f(0x200)] = !![];
        break;
      }
    }
  }
  var _0x52bf1d = _0x3ac9c1['match'](/기말/);
  if (_0x52bf1d) {
    var _0x3e9a0d = document[_0x4c1f9f(0xee)](_0x4c1f9f(0x1e0));
    for (var _0x1b2ea8 of _0x3e9a0d) {
      if (_0x1b2ea8[_0x4c1f9f(0x12a)] == 0x2) {
        _0x1b2ea8['selected'] = !![];
        break;
      }
    }
  }
  var _0x52bf1d = _0x3ac9c1[_0x4c1f9f(0x1e3)](/\((.+?)\)/);
  _0x52bf1d &&
    ((_0x3d1501 = _0x52bf1d[0x1]),
    document['querySelector'](_0x4c1f9f(0xef))['setAttribute'](
      _0x4c1f9f(0xec),
      _0x3d1501,
    ));
  var _0x52bf1d = _0x3ac9c1[_0x4c1f9f(0x1e3)](/국어|사회|수학|과학|역사|영어/);
  if (_0x52bf1d) {
    var _0x3e9a0d = document['querySelectorAll'](_0x4c1f9f(0xdd));
    for (var _0x1b2ea8 of _0x3e9a0d) {
      if (_0x1b2ea8[_0x4c1f9f(0x12a)] == _0x52bf1d[0x0]) {
        _0x1b2ea8[_0x4c1f9f(0x200)] = !![];
        break;
      }
    }
    var _0x18bdf6 =
      tinymce['activeEditor'][_0x4c1f9f(0x198)][_0x4c1f9f(0x168)] ||
      tinymce[_0x4c1f9f(0x1ae)]['contentDocument'][_0x4c1f9f(0x168)];
    _0x52bf1d[0x0] == '영어'
      ? _0x18bdf6[_0x4c1f9f(0x1a7)][_0x4c1f9f(0x188)][_0x4c1f9f(0x145)](
          'itex_doc_eng',
        )
      : _0x18bdf6[_0x4c1f9f(0x1a7)][_0x4c1f9f(0x188)][_0x4c1f9f(0xfd)](
          'itex_doc_eng',
        );
  }
}
function content_grp_sel() {
  var _0x326be6 = _0x32809c,
    _0x5493aa = document[_0x326be6(0xee)]('.itex_content_grp');
  for (var _0x92a1d5 of _0x5493aa) {
    _0x92a1d5[_0x326be6(0x188)][_0x326be6(0xfd)]('itex_grp_hidden');
  }
  var _0x5493aa = document['querySelectorAll'](_0x326be6(0x205));
  for (var _0x92a1d5 of _0x5493aa) {
    _0x92a1d5[_0x326be6(0x188)][_0x326be6(0x145)](_0x326be6(0x128));
  }
}
function itex_box_clear() {
  var _0x3b4de8 = _0x32809c;
  (document[_0x3b4de8(0x111)](_0x3b4de8(0x209))[_0x3b4de8(0x12a)] = null),
    (document[_0x3b4de8(0x111)](_0x3b4de8(0x172))[_0x3b4de8(0x12a)] = 0x0),
    (document['querySelector'](_0x3b4de8(0x1af))[_0x3b4de8(0x12a)] = null),
    (document[_0x3b4de8(0xee)](_0x3b4de8(0x15d))[0x0]['selected'] = !![]),
    (document[_0x3b4de8(0xee)](_0x3b4de8(0x1f8))[0x0][_0x3b4de8(0x200)] = !![]),
    (document[_0x3b4de8(0xee)](_0x3b4de8(0x1e4))[0x0][_0x3b4de8(0x200)] = !![]),
    (codeNum_state = '');
}
$(function () {
  var _0x521978 = _0x32809c;
  $(_0x521978(0x178))['draggable']({ handle: _0x521978(0x1aa) });
});
function DB_search() {
  return new Promise(function (_0xde4ed3, _0x437b60) {
    var _0x3bee9a = _0x52a6;
    if (
      document[_0x3bee9a(0x111)]('.itex_hml_subject')['options'][
        document[_0x3bee9a(0x111)](_0x3bee9a(0xdf))[_0x3bee9a(0x203)]
      ][_0x3bee9a(0x12a)] == '0'
    ) {
      alert('과목은\x20반드시\x20선택해야\x20합니다.');
      return;
    }
    var _0x169c5a = new Object();
    _0x169c5a = {
      subject: document[_0x3bee9a(0x111)](_0x3bee9a(0xdf))['options'][
        document[_0x3bee9a(0x111)](_0x3bee9a(0xdf))['selectedIndex']
      ][_0x3bee9a(0x12a)],
      year: document['querySelector']('.itex_hml_year')[_0x3bee9a(0xe2)][
        document[_0x3bee9a(0x111)](_0x3bee9a(0xe5))[_0x3bee9a(0x203)]
      ]['value'],
      grade:
        document[_0x3bee9a(0x111)]('.itex_hml_grade')[_0x3bee9a(0xe2)][
          document[_0x3bee9a(0x111)](_0x3bee9a(0xf3))[_0x3bee9a(0x203)]
        ]['value'],
      season:
        document[_0x3bee9a(0x111)]('.itex_hml_season')[_0x3bee9a(0xe2)][
          document[_0x3bee9a(0x111)](_0x3bee9a(0x166))[_0x3bee9a(0x203)]
        ][_0x3bee9a(0x12a)],
      source: document['querySelector'](_0x3bee9a(0x1c6))['options'][
        document[_0x3bee9a(0x111)](_0x3bee9a(0x1c6))['selectedIndex']
      ]['value'],
      examCustom: document[_0x3bee9a(0x111)]('.itex_hml_examCustom')[
        _0x3bee9a(0xe2)
      ][document['querySelector']('.itex_hml_examCustom')[_0x3bee9a(0x203)]][
        _0x3bee9a(0x12a)
      ],
    };
    var _0x3c5a2d = new XMLHttpRequest();
    _0x3c5a2d[_0x3bee9a(0x150)](_0x3bee9a(0x1a9), _0x3bee9a(0x1d0), !![]),
      _0x3c5a2d[_0x3bee9a(0x175)](_0x3bee9a(0x1ec), _0x3bee9a(0x12f)),
      _0x3c5a2d['send'](JSON['stringify'](_0x169c5a)),
      (_0x3c5a2d['onreadystatechange'] = function () {
        var _0x18e463 = _0x3bee9a;
        if (
          _0x3c5a2d['readyState'] == 0x4 &&
          _0x3c5a2d[_0x18e463(0x1ea)] == 0xc8
        ) {
          if (_0x3c5a2d['responseText'] == 'no') {
            (document['querySelector'](_0x18e463(0x204))[_0x18e463(0x1ab)] =
              ''),
              alert(_0x18e463(0x1d6));
            return;
          }
          var _0x2dd54c = JSON[_0x18e463(0xf1)](_0x3c5a2d[_0x18e463(0x220)]);
          (document[_0x18e463(0x111)](_0x18e463(0x204))[_0x18e463(0x1ab)] = ''),
            (document[_0x18e463(0x111)]('.hml_list_select')[_0x18e463(0x18b)][
              _0x18e463(0x1b7)
            ] = _0x18e463(0x13e));
          for (var _0x331916 of _0x2dd54c) {
            var _0x5e830f = document['createElement']('option');
            (_0x5e830f[_0x18e463(0x12a)] = _0x331916['seq']),
              (_0x5e830f[_0x18e463(0x130)] =
                _0x331916[_0x18e463(0x1e7)] +
                _0x18e463(0xe9) +
                _0x331916[_0x18e463(0x19c)]),
              _0x5e830f[_0x18e463(0x16d)](
                _0x18e463(0x14e),
                DB_exam_select,
                ![],
              ),
              document[_0x18e463(0x111)](_0x18e463(0x204))[_0x18e463(0x1ed)](
                _0x5e830f,
              );
          }
        }
      });
  });
}
function DB_exam_select(_0x26f303) {
  var _0x5f4381 = _0x32809c;
  (iTeXDBWobj = []),
    (document['getElementById']('modal_block')[_0x5f4381(0x18b)][
      _0x5f4381(0x1f3)
    ] = _0x5f4381(0x19e));
  var _0x505957 = document[_0x5f4381(0x111)](_0x5f4381(0x204))[_0x5f4381(0xe2)][
    document[_0x5f4381(0x111)]('.hml_list_select')[_0x5f4381(0x203)]
  ]['value'];
  cw_first_code = _0x505957;
  document[_0x5f4381(0x111)](_0x5f4381(0x158))[_0x5f4381(0x182)] &&
    (_0x505957 = _0x505957 + 'x');
  var _0x1904e2 = new XMLHttpRequest();
  _0x1904e2['open'](_0x5f4381(0x1a9), _0x5f4381(0x1b6) + _0x505957, !![]),
    _0x1904e2[_0x5f4381(0x175)](_0x5f4381(0x1ec), 'application/json'),
    _0x1904e2[_0x5f4381(0x167)](),
    (_0x1904e2[_0x5f4381(0x144)] = function () {
      var _0x1a08bb = _0x5f4381;
      if (
        _0x1904e2[_0x1a08bb(0x1f2)] == 0x4 &&
        _0x1904e2[_0x1a08bb(0x1ea)] == 0xc8
      ) {
        itex_page_clear();
        var _0x36826d = JSON[_0x1a08bb(0xf1)](_0x1904e2[_0x1a08bb(0x220)]);
        _0x36826d[_0x1a08bb(0x1df)] == 0x0
          ? ((itex_presentData = _0x36826d[_0x1a08bb(0x183)]),
            cw_pdf_load(cw_first_code))
          : hml_docu_parsing(
              JSON[_0x1a08bb(0xf1)](_0x36826d[_0x1a08bb(0x183)]),
            );
      }
    });
}
function doc_ocr_converter(_0x31033b) {
  var _0x33a117 = _0x32809c;
  let _0x788989 = new Date();
  document[_0x33a117(0xe0)](_0x33a117(0x1cd))['style'][_0x33a117(0x1f3)] =
    _0x33a117(0x19e);
  if (!document[_0x33a117(0x111)](_0x33a117(0x11e))) {
    var _0x1e06b1 =
        document['getElementById']('upload_file')[_0x33a117(0x16e)][0x0],
      _0x5bf54a = new FormData();
    _0x5bf54a[_0x33a117(0x1e9)](_0x33a117(0x134), _0x1e06b1);
  } else {
    var _0x4111cb = cropper['getCroppedCanvas']({ fillColor: '#fff' }),
      _0x3507ff = _0x4111cb['toDataURL'](_0x33a117(0x20e)),
      _0x5bf54a = new FormData();
    _0x5bf54a[_0x33a117(0x1e9)](
      _0x33a117(0x134),
      dataURItoBlob(_0x3507ff, _0x33a117(0x101)),
    );
    var _0x362bf3 = _0x33a117(0x10e);
    _0x5bf54a[_0x33a117(0x1e9)](_0x33a117(0xe2), _0x33a117(0x1fd));
    var _0x19c99d = new Date()['getFullYear']()[_0x33a117(0x164)](),
      _0x15d8fd = new Date()[_0x33a117(0x177)]() + 0x1;
    _0x15d8fd < 0xa && (_0x15d8fd = '0' + _0x15d8fd);
    var _0x2683ef = new Date()[_0x33a117(0x1ef)]();
    _0x2683ef < 0xa && (_0x2683ef = '0' + _0x2683ef[_0x33a117(0x164)]());
    _0x5bf54a['append'](
      _0x33a117(0x15f),
      _0x362bf3 + '/' + _0x19c99d + '/' + _0x15d8fd + '/' + _0x2683ef,
    );
    var _0x55dd2b = ![];
    document['querySelector'](_0x33a117(0x154))?.[_0x33a117(0x182)] &&
      (_0x55dd2b = !![]);
    var _0x20da50 = document[_0x33a117(0x111)]('.img-thumbnail-sel');
    if (
      _0x20da50 &&
      _0x20da50[_0x33a117(0x188)][_0x33a117(0x1ac)](_0x33a117(0x21e))
    ) {
      if (pdf_state == !![] && _0x55dd2b == ![]) {
        var _0x3dea9d = cropper[_0x33a117(0x141)]();
        _0x5bf54a[_0x33a117(0x1e9)](_0x33a117(0x18f), [
          _0x3dea9d['x'] / cropImageOrigin_w,
          _0x3dea9d['y'] / cropImageOrigin_h,
          (_0x3dea9d['x'] + _0x3dea9d[_0x33a117(0x1b0)]) / cropImageOrigin_w,
          (_0x3dea9d['y'] + _0x3dea9d[_0x33a117(0x156)]) / cropImageOrigin_h,
        ]);
        var _0x5c9808 = _0x20da50[_0x33a117(0x108)][_0x33a117(0xfb)](
          /\.png/i,
          _0x33a117(0x21c),
        );
        _0x5bf54a['append'](_0x33a117(0x125), _0x5c9808),
          _0x5bf54a[_0x33a117(0x1e9)](
            _0x33a117(0x16c),
            document['querySelector'](_0x33a117(0x1d7))[_0x33a117(0x12a)],
          );
      }
    } else {
      if (
        document['querySelector'](_0x33a117(0xef))[_0x33a117(0x1f9)]('data-url')
      ) {
        var _0x5c9808 = document[_0x33a117(0x111)](_0x33a117(0xef))[
          _0x33a117(0x1f9)
        ](_0x33a117(0x1d5));
        if (pdf_state == !![] && _0x55dd2b == ![]) {
          var _0x3dea9d = cropper[_0x33a117(0x141)]();
          _0x5bf54a[_0x33a117(0x1e9)](_0x33a117(0x18f), [
            _0x3dea9d['x'] / cropImageOrigin_w,
            _0x3dea9d['y'] / cropImageOrigin_h,
            (_0x3dea9d['x'] + _0x3dea9d[_0x33a117(0x1b0)]) / cropImageOrigin_w,
            (_0x3dea9d['y'] + _0x3dea9d[_0x33a117(0x156)]) / cropImageOrigin_h,
          ]),
            _0x5bf54a['append'](_0x33a117(0x125), _0x5c9808),
            _0x5bf54a['append'](
              _0x33a117(0x16c),
              document['querySelector'](_0x33a117(0x1d7))['value'],
            );
        }
      }
    }
  }
  _0x5bf54a[_0x33a117(0x1e9)](_0x33a117(0x139), _0x31033b),
    _0x5bf54a[_0x33a117(0x1e9)]('mid', _0x33a117(0x20c));
  var _0x2b1165 = new XMLHttpRequest();
  _0x2b1165[_0x33a117(0x150)](
    _0x33a117(0x1a9),
    dream_server_url + _0x33a117(0x1b1),
    !![],
  ),
    _0x2b1165[_0x33a117(0x167)](_0x5bf54a),
    (_0x2b1165['onreadystatechange'] = function () {
      var _0x4fa38e = _0x33a117;
      if (
        _0x2b1165[_0x4fa38e(0x1f2)] == 0x4 &&
        _0x2b1165[_0x4fa38e(0x1ea)] == 0xc8
      )
        try {
          if (_0x2b1165[_0x4fa38e(0x220)] == '') {
            var _0x75531 = new bootstrap['Modal'](
              document[_0x4fa38e(0xe0)]('alertModal'),
            );
            return (
              (document['querySelector'](_0x4fa38e(0x159))[_0x4fa38e(0x130)] =
                _0x4fa38e(0x163)),
              (document[_0x4fa38e(0xe0)]('modal_block')[_0x4fa38e(0x18b)][
                'display'
              ] = _0x4fa38e(0x155)),
              _0x75531[_0x4fa38e(0x15c)](),
              window_exchange(0x0),
              ![]
            );
          }
          try {
            _0x2b1165[_0x4fa38e(0x220)] = _0x2b1165['responseText']['replace'](
              //g,
              '',
            );
            var _0x8253be = JSON[_0x4fa38e(0xf1)](_0x2b1165[_0x4fa38e(0x220)]);
          } catch (_0x400ff9) {
            var _0x75531 = new bootstrap[_0x4fa38e(0xe7)](
              document['getElementById'](_0x4fa38e(0x19a)),
            );
            return (
              (document[_0x4fa38e(0x111)](_0x4fa38e(0x159))[_0x4fa38e(0x130)] =
                '문항을\x20인식하지\x20못했습니다.\x20인식영역을\x20조정한\x20후\x20다시\x20시도해\x20주십시오.'),
              (document['getElementById'](_0x4fa38e(0x1cd))[_0x4fa38e(0x18b)][
                'display'
              ] = _0x4fa38e(0x155)),
              _0x75531[_0x4fa38e(0x15c)](),
              window_exchange(0x0),
              ![]
            );
          }
          if (
            _0x8253be[_0x4fa38e(0x149)][0x0][_0x4fa38e(0x19b)] ==
            _0x4fa38e(0x1b9)
          ) {
            var _0x75531 = new bootstrap[_0x4fa38e(0xe7)](
              document[_0x4fa38e(0xe0)](_0x4fa38e(0x19a)),
            );
            return (
              (document[_0x4fa38e(0x111)](_0x4fa38e(0x159))[_0x4fa38e(0x130)] =
                _0x4fa38e(0x163)),
              (document[_0x4fa38e(0xe0)](_0x4fa38e(0x1cd))[_0x4fa38e(0x18b)][
                'display'
              ] = _0x4fa38e(0x155)),
              _0x75531[_0x4fa38e(0x15c)](),
              window_exchange(0x0),
              ![]
            );
          }
          const _0x1f6e67 =
            tinymce[_0x4fa38e(0x1c8)]('tinyeditor')['contentWindow'][
              'document'
            ] ||
            tinymce['get'](_0x4fa38e(0x18e))[_0x4fa38e(0x216)][
              _0x4fa38e(0x168)
            ];
          var _0x12e667 = document[_0x4fa38e(0x111)](_0x4fa38e(0x124));
          if (
            _0x8253be[_0x4fa38e(0x149)][0x0][_0x4fa38e(0x19b)] ==
            _0x4fa38e(0x212)
          )
            return (
              alert(
                _0x4fa38e(0x119) +
                  _0x8253be[_0x4fa38e(0x149)][0x0][_0x4fa38e(0x187)] +
                  _0x4fa38e(0x170),
              ),
              (document['getElementById']('modal_block')[_0x4fa38e(0x18b)][
                _0x4fa38e(0x1f3)
              ] = _0x4fa38e(0x155)),
              window_exchange(0x0),
              ![]
            );
          else {
            var _0xf519ea =
              parseInt(
                document[_0x4fa38e(0x111)]('.itex_obj_count')['textContent'],
              ) + parseInt(_0x8253be[_0x4fa38e(0x149)][0x0][_0x4fa38e(0x187)]);
            document[_0x4fa38e(0x111)](_0x4fa38e(0x19f))[_0x4fa38e(0x130)] =
              _0xf519ea;
          }
          var _0x5bab27 = document[_0x4fa38e(0x1cb)](),
            _0x32ee76 = document[_0x4fa38e(0x1f4)](_0x4fa38e(0x1ad));
          (_0x32ee76['className'] = _0x4fa38e(0x197)),
            _0x32ee76[_0x4fa38e(0x110)](
              _0x4fa38e(0xe4),
              _0x8253be[_0x4fa38e(0x149)][0x0][_0x4fa38e(0x19b)],
            ),
            _0x5bab27[_0x4fa38e(0x1ed)](_0x32ee76);
          var _0x103f67 = document[_0x4fa38e(0x13f)](_0x4fa38e(0x106));
          _0x103f67[_0x4fa38e(0x1fc)](_0x4fa38e(0x207), !![], !![]),
            (_0x103f67[_0x4fa38e(0x1ee)] = 0xd),
            _0x1f6e67[_0x4fa38e(0xe0)](_0x4fa38e(0xde))[_0x4fa38e(0xed)](
              _0x103f67,
            );
          var _0x2e8500 = _0x1f6e67[_0x4fa38e(0x1f4)](_0x4fa38e(0x1c4));
          _0x2e8500['className'] = _0x4fa38e(0x12e);
          var _0x19c67f;
          _0x19c67f = iTeXEQ[_0x4fa38e(0x16b)][_0x4fa38e(0x135)]();
          !_0x19c67f['getRangeAt'] || !_0x19c67f[_0x4fa38e(0xf8)]
            ? iTeXEQ['itex_se2iframe']
                [_0x4fa38e(0x111)](_0x4fa38e(0x1e1))
                [_0x4fa38e(0x1ed)](_0x2e8500)
            : _0x19c67f[_0x4fa38e(0x219)](0x0)[_0x4fa38e(0x133)](_0x2e8500);
          tinymce['activeEditor'][_0x4fa38e(0x21f)][_0x4fa38e(0x1c7)](
            _0x2e8500,
            0x0,
          ),
            tinymce[_0x4fa38e(0x1ae)][_0x4fa38e(0xfe)]();
          var _0x494dd3 = _0x5bab27[_0x4fa38e(0xee)]('p');
          for (para of _0x494dd3) {
            para[_0x4fa38e(0xe1)][_0x4fa38e(0x1e8)] == 0x0 &&
              para['parentNode'][_0x4fa38e(0x1a4)](para);
          }
          _0x5bab27[_0x4fa38e(0x111)]('.circ_num') &&
            select_process2(_0x5bab27);
          var _0x6f6ffb = _0x8253be[_0x4fa38e(0x149)][0x0][_0x4fa38e(0x116)],
            _0x5926d5 = _0x8253be[_0x4fa38e(0x149)][0x0][_0x4fa38e(0x1a8)],
            _0x42de3a = _0x5bab27[_0x4fa38e(0xee)](
              '.itexmark\x20table[data-state=\x27floating\x27]',
            );
          for (
            var _0x30c54d = 0x0;
            _0x30c54d < _0x42de3a[_0x4fa38e(0x1e8)];
            _0x30c54d++
          ) {
            var _0x1b2def =
              _0x42de3a[_0x30c54d]['getAttribute']('data-position')[
                _0x4fa38e(0x127)
              ]('\x20');
            parseInt((_0x1b2def[0x0] / _0x5926d5) * 0x64) > 0x32
              ? (_0x42de3a[_0x30c54d][_0x4fa38e(0x18b)]['float'] = 'right')
              : (_0x42de3a[_0x30c54d][_0x4fa38e(0x18b)][_0x4fa38e(0x1eb)] =
                  'left');
          }
          var _0x42de3a = _0x5bab27[_0x4fa38e(0xee)](
            '.itexmark\x20table[data-state=\x27normal\x27]',
          );
          for (
            var _0x30c54d = 0x0;
            _0x30c54d < _0x42de3a[_0x4fa38e(0x1e8)];
            _0x30c54d++
          ) {
            var _0x1b2def = _0x42de3a[_0x30c54d][_0x4fa38e(0x1f9)](
              _0x4fa38e(0x15e),
            )[_0x4fa38e(0x127)]('\x20');
            _0x42de3a[_0x30c54d][_0x4fa38e(0x18b)][_0x4fa38e(0x148)] =
              _0x4fa38e(0x221);
            var _0x12dd4b = parseInt((_0x1b2def[0x0] / _0x5926d5) * 0x64) + '%';
          }
          var _0x5c0023 = _0x5bab27['querySelectorAll']('td');
          for (var _0x1132e6 of _0x5c0023) {
            if (_0x1132e6[_0x4fa38e(0xe1)][_0x4fa38e(0x1e8)] == 0x0) {
              var _0x155a98 = document[_0x4fa38e(0xfc)]('\x20');
              _0x1132e6[_0x4fa38e(0x1ed)](_0x155a98);
            }
          }
          var _0x258c37 = _0x5bab27[_0x4fa38e(0xee)](_0x4fa38e(0x100));
          for (
            var _0x30c54d = 0x0;
            _0x30c54d < _0x258c37[_0x4fa38e(0x1e8)];
            _0x30c54d++
          ) {
            _0x258c37[_0x30c54d][_0x4fa38e(0x18b)][_0x4fa38e(0x1eb)] = 'left';
          }
          var _0x258c37 = _0x5bab27[_0x4fa38e(0xee)](_0x4fa38e(0x14d));
          for (
            var _0x30c54d = 0x0;
            _0x30c54d < _0x258c37[_0x4fa38e(0x1e8)];
            _0x30c54d++
          ) {
            _0x258c37[_0x30c54d]['style'][_0x4fa38e(0x1eb)] = 'right';
          }
          var _0x258c37 = _0x5bab27['querySelectorAll'](_0x4fa38e(0x1db));
          for (
            var _0x30c54d = 0x0;
            _0x30c54d < _0x258c37['length'];
            _0x30c54d++
          ) {
            var _0x1b2def = _0x258c37[_0x30c54d][_0x4fa38e(0x1f9)](
                _0x4fa38e(0x15e),
              )['split']('\x20'),
              _0x12dd4b = parseInt((_0x1b2def[0x0] / _0x5926d5) * 0x64) + '%';
          }
          var _0x401808 = _0x5bab27[_0x4fa38e(0xee)]('.cls_ebox');
          for (
            var _0x30c54d = 0x0;
            _0x30c54d < _0x401808[_0x4fa38e(0x1e8)];
            _0x30c54d++
          ) {
            (_0x401808[_0x30c54d][_0x4fa38e(0x18b)]['border'] =
              _0x4fa38e(0xeb)),
              (_0x401808[_0x30c54d][_0x4fa38e(0x18b)]['padding'] =
                _0x4fa38e(0x169));
          }
          var _0x5acd1e = _0x1f6e67[_0x4fa38e(0xee)]('p');
          for (var _0x530289 of _0x5acd1e) {
            _0x530289[_0x4fa38e(0x1ab)][_0x4fa38e(0x1e3)](/^\s*$/) &&
              (console['log'](_0x4fa38e(0x1d3)),
              _0x530289['appendChild'](document[_0x4fa38e(0x1f4)]('br')));
          }
          var _0x390f92 = _0x5bab27[_0x4fa38e(0xee)](_0x4fa38e(0x1f0));
          for (var _0x90146e of _0x390f92) {
            var _0x463710 = _0x90146e[_0x4fa38e(0x1f9)](_0x4fa38e(0x17c));
            (_0x463710 = _0x463710[_0x4fa38e(0xfb)](
              /([^\/],)/g,
              _0x4fa38e(0x1d9),
            )),
              _0x90146e[_0x4fa38e(0x176)](_0x4fa38e(0x17c), _0x463710),
              (_0x463710 = _0x463710['replace'](/^\s*\\displaystyle\s*/, '')),
              (_0x463710 = _0x463710[_0x4fa38e(0xfb)](
                /(.+)/,
                _0x4fa38e(0x115),
              )),
              (_0x463710 = iTeXEQ['itex_classchange2'](_0x463710)),
              (_0x90146e['textContent'] = _0x463710);
          }
          var _0x217153 = _0x5bab27[_0x4fa38e(0xee)](_0x4fa38e(0x184)),
            _0x2bb001 = [];
          for (
            var _0x30c54d = 0x0;
            _0x30c54d < _0x217153[_0x4fa38e(0x1e8)];
            _0x30c54d++
          ) {
            !_0x217153[_0x30c54d]['src'][_0x4fa38e(0x1e3)](/base64,/) &&
              _0x2bb001[_0x4fa38e(0x18d)](_0x217153[_0x30c54d]);
          }
          MathJax[_0x4fa38e(0xea)]([_0x5bab27])['then'](function () {
            var _0x22f1ca = _0x4fa38e,
              _0x1298a5 = _0x5bab27['querySelectorAll'](_0x22f1ca(0x1f0));
            for (var _0x5420dd of _0x1298a5) {
              if (_0x5420dd[_0x22f1ca(0x111)](_0x22f1ca(0x1b4))) {
                var _0x30e6c8 = iTeXEQ[_0x22f1ca(0x1c1)](
                    _0x5420dd[_0x22f1ca(0x111)](_0x22f1ca(0x1b4)),
                    '',
                  ),
                  _0x1a5a66 = /\\class\{.*?\}\{\}/g,
                  _0x475517 = /\\cssId\{.*?\}\{\}/g;
                (_0x30e6c8 = _0x30e6c8[_0x22f1ca(0xfb)](_0x1a5a66, '')),
                  (_0x30e6c8 = _0x30e6c8[_0x22f1ca(0xfb)](_0x475517, '')),
                  (_0x30e6c8 = _0x30e6c8['replace'](/˙/g, '')),
                  _0x5420dd['setAttribute'](_0x22f1ca(0x17c), _0x30e6c8);
              }
            }
            var _0x1aeb10 = _0x1f6e67[_0x22f1ca(0x111)]('.itexpos');
            tinymce[_0x22f1ca(0x1c8)](_0x22f1ca(0x18e))[_0x22f1ca(0x10c)](
              'mceBeginUndoLevel',
            );
            while (
              _0x5bab27['querySelector'](_0x22f1ca(0x12d))[_0x22f1ca(0xe1)][
                'length'
              ] > 0x0
            ) {
              var _0x38c66e = _0x5bab27['querySelector'](_0x22f1ca(0x12d)),
                _0x3afdcf = _0x38c66e['childNodes'][0x0],
                _0x12d210 =
                  _0x3afdcf['outerHTML'] || _0x3afdcf[_0x22f1ca(0x130)];
              tinymce[_0x22f1ca(0x1c8)](_0x22f1ca(0x18e))[_0x22f1ca(0x190)](
                _0x12d210,
              ),
                _0x38c66e[_0x22f1ca(0x1a4)](_0x3afdcf);
            }
            tinymce[_0x22f1ca(0x1c8)](_0x22f1ca(0x18e))[_0x22f1ca(0x10c)](
              _0x22f1ca(0x118),
            ),
              _0x1aeb10[_0x22f1ca(0x1cf)]?.[_0x22f1ca(0x1a4)](_0x1aeb10),
              iTeXEQ[_0x22f1ca(0x102)](),
              (document['getElementById'](_0x22f1ca(0x1cd))[_0x22f1ca(0x18b)][
                _0x22f1ca(0x1f3)
              ] = _0x22f1ca(0x155));
            let _0x364411 = new Date();
          });
        } catch (_0x45430d) {
          console[_0x4fa38e(0x1d4)](_0x45430d),
            (document[_0x4fa38e(0xe0)](_0x4fa38e(0x1cd))[_0x4fa38e(0x18b)][
              _0x4fa38e(0x1f3)
            ] = _0x4fa38e(0x155));
        }
    });
}
function _0x6f8d() {
  var _0x186b06 = [
    'call',
    'GlobalWorkerOptions',
    '.cropper-container',
    'offsetY',
    '.line_break',
    'restore',
    'slice',
    'includes',
    '.origin_img_area',
    'pdf_url',
    'cloneNode',
    'split',
    'itex_grp_hidden',
    'sel_num_po',
    'value',
    'crossOrigin',
    'itex_drag_hidden',
    '.itexmark',
    'itexpos',
    'application/json',
    'textContent',
    'mid',
    'sel_list',
    'insertNode',
    'images',
    'getSelection',
    'img-thumbnail-sel',
    'load',
    'pdf_page_hidden',
    'check',
    'mousemove',
    '.trans_area',
    '.itex-drag-area',
    '/front/mypage',
    '14px',
    'createEvent',
    'empty',
    'getData',
    'naturalHeight',
    '.cropper-modal',
    'onreadystatechange',
    'add',
    'click',
    'replaceChild',
    'clear',
    'result',
    'inline-block',
    'moveTo',
    'fulltext_eqn',
    '.itexmark\x20img[data-state=\x27right_floating\x27]',
    'dblclick',
    '.qnai_trans_form',
    'open',
    'toDataURL',
    '45246oPMbun',
    '.cropper-crop-box',
    '.ocr_select_check',
    'none',
    'height',
    'data-mathinfo',
    '.temp_exam_reload',
    '#alertModal\x20.modal-body',
    '2px;',
    'lineTo',
    'show',
    '.itex_custom\x20option',
    'data-position',
    'imginfo',
    '지원하지\x20않는\x20파일\x20포맷입니다.',
    '2202844EAAoUY',
    '.itex_ocrimg_area\x20.cropper-canvas\x20canvas',
    '문항을\x20인식하지\x20못했습니다.\x20인식영역을\x20조정한\x20후\x20다시\x20시도해\x20주십시오.',
    'toString',
    '.pdf_page_s',
    '.itex_hml_season',
    'send',
    'document',
    '15px',
    'nextSibling',
    'itex_se2iframe',
    'page',
    'addEventListener',
    'files',
    'itexmath_check',
    '개로\x20너무\x20많습니다.\x20한번에\x20최대\x20550개까지만\x20가능합니다.',
    'enable',
    '.itex_smcnt',
    'level4_tmp',
    'maxHeight',
    'setRequestHeader',
    'setAttribute',
    'getMonth',
    '.modal-dialog',
    'destination-out',
    'onload',
    'render',
    'data-latex',
    'overflow',
    'map',
    'fillRect',
    '78201kaKjjk',
    'offsetX',
    'checked',
    'data',
    'img',
    'beginPath',
    'href',
    'object',
    'classList',
    '/static/OCR/PDF/cmaps/',
    'getDocument',
    'style',
    'floor',
    'push',
    'tinyeditor',
    'bbox',
    'insertContent',
    'pageYOffset',
    'hml포맷으로\x20변경\x20후\x20다시\x20시도하세요.(워드를\x20열어서\x20다른\x20이름으로\x20저장:HWPML선택)',
    'stroke',
    '.itex_jb_season\x20option',
    'touchstart',
    'then',
    'itexmark',
    'contentWindow',
    'etoos_latex',
    'alertModal',
    'content',
    'title',
    'mousedown',
    'block',
    '.itex_obj_count',
    'spellcheck',
    'Tooltip',
    '.level4_tmp',
    '#fff',
    'removeChild',
    'application/haansoftpdf',
    'dragover',
    'body',
    'origin_width',
    'POST',
    '.modal-header',
    'innerHTML',
    'contains',
    'div',
    'activeEditor',
    '.itex_excnt',
    'width',
    '/qnapi_dream/fulltext',
    'promise',
    '.itex_ocrimg_area\x20.cropper-canvas\x20img',
    'mjx-container>svg',
    'visible',
    '/qnapi_dream/exam_code_list/',
    'fontSize',
    '페이지\x20범위를\x20초과하였습니다.',
    'error',
    'lineWidth',
    'pageXOffset',
    'removeAttribute',
    '10DelAgN',
    'insertBefore',
    'focusOffset',
    '473YFSXvp',
    'mjx_latex_info',
    '.img-thumbnail-sel',
    '.itex_ocrimg_area\x20.cropper-drag-box',
    'span',
    'keypress',
    '.itex_hml_source',
    'setCursorLocation',
    'get',
    '수식이\x20위치할\x20곳을\x20먼저\x20선택하십시오.',
    '.tiny_wrap',
    'createDocumentFragment',
    'top',
    'modal_block',
    '5IRACeE',
    'parentNode',
    '/qnapi_dream/DBsearch',
    '.itex_ocrimg_area\x20.cropper-view-box\x20img',
    'naturalWidth',
    'br!',
    'log',
    'data-url',
    '데이터가\x20없습니다.',
    '.pdf_page_a',
    '329iJsQpB',
    '$1\x5c,',
    'limit_cnt',
    '.itexmark\x20img[data-state=\x27normal\x27]',
    'globalCompositeOperation',
    'dragleave',
    'upload_file',
    'state',
    '.itex_jb_source\x20option',
    '#tinymce',
    'nextElementSibling',
    'match',
    '.itex_difficult\x20option',
    'itex_main_img',
    'level4',
    'seq',
    'length',
    'append',
    'status',
    'float',
    'Content-type',
    'appendChild',
    'keyCode',
    'getDate',
    '.itexmath',
    'border',
    'readyState',
    'display',
    'createElement',
    '.pdf_page_show',
    'className',
    'mouseup',
    '.itex_sel\x20option',
    'getAttribute',
    'name',
    'fill',
    'initEvent',
    'math',
    '.itex_edit_mv',
    '14LCggqG',
    'selected',
    'arc',
    'workerSrc',
    'selectedIndex',
    '.hml_list_select',
    '.itex_exam_grp',
    'fillStyle',
    'keydown',
    'preventDefault',
    '.itex_exnum',
    'getImageData',
    'drop',
    'itex',
    '.itex_limit_count',
    'image/jpeg',
    'nodeType',
    '.itex_total_count',
    'onbeforeunload',
    'over',
    'type',
    '.itex_jb_year\x20option',
    'putImageData',
    'contentDocument',
    'indexOf',
    'charCode',
    'getRangeAt',
    'getCroppedCanvas',
    '.itex_viewer_area',
    '.pdf',
    '.itex_pageout',
    'img-pdf',
    'selection',
    'responseText',
    'both',
    '.itex_jb_subject\x20option',
    'tinymce',
    '.itex_hml_subject',
    'getElementById',
    'childNodes',
    'options',
    'removeProperty',
    'afterbegin',
    '.itex_hml_year',
    '5918664yZlTIr',
    'Modal',
    'dataTransfer',
    '\x20:\x20',
    'typesetPromise',
    '1px\x20solid\x20black',
    'data-local',
    'dispatchEvent',
    'querySelectorAll',
    '.list_picked',
    'active',
    'parse',
    'getBoundingClientRect',
    '.itex_hml_grade',
    'drawImage',
    '41832uKcTaW',
    'destroy',
    '.itex_jb_emh\x20option',
    'rangeCount',
    '1726419yrMajL',
    'canvas',
    'replace',
    'createTextNode',
    'remove',
    'focus',
    '.itex_ocrimg_area',
    '.itexmark\x20img[data-state=\x27left_floating\x27]',
    'jpeg',
    'recoverynew',
    'visibility',
    '2898513XKzWpt',
    'rgb(255,\x20255,\x20255)',
    'Events',
    'hidden',
    'src',
    'numPages',
    'getContext',
    '.circ_num',
    'execCommand',
    '1px\x20solid\x20red;',
    'ETC',
    '다문항\x20hml파일만\x20가능합니다.',
    'insertAdjacentHTML',
    'querySelector',
    'complete',
    'keyup',
    '.img-thumbnail',
    '\x5c(\x5cdisplaystyle\x20$1\x20\x5c)',
    'origin_height',
    'getPage',
    'mceEndUndoLevel',
    '변환할\x20개체수가\x20',
    'zIndex',
    'itex_pageout_modal',
  ];
  _0x6f8d = function () {
    return _0x186b06;
  };
  return _0x6f8d();
}
function direct_eqn() {
  var _0x58f66b = _0x32809c;
  if (document[_0x58f66b(0x111)](_0x58f66b(0x11e))) {
    var _0x572e1f = iTeXEQ['itex_se2iframe'][_0x58f66b(0x135)]();
    if (!_0x572e1f[_0x58f66b(0x219)] || !_0x572e1f[_0x58f66b(0xf8)])
      return alert(_0x58f66b(0x1c9)), ![];
    var _0xb3a81b = new Object(),
      _0x3166ee = cropper[_0x58f66b(0x21a)]({ fillColor: _0x58f66b(0x1a3) }),
      _0x337beb = document['createElement'](_0x58f66b(0xfa)),
      _0x4d6d15 = _0x337beb[_0x58f66b(0x10a)]('2d');
    (_0x337beb[_0x58f66b(0x1b0)] = _0x3166ee['width']),
      (_0x337beb['height'] = _0x3166ee[_0x58f66b(0x156)]),
      _0x4d6d15['drawImage'](
        _0x3166ee,
        0x0,
        0x0,
        _0x4d6d15[_0x58f66b(0xfa)][_0x58f66b(0x1b0)],
        _0x4d6d15[_0x58f66b(0xfa)][_0x58f66b(0x156)],
      );
    var _0x237703 = _0x4d6d15[_0x58f66b(0x20a)](
      0x0,
      0x0,
      _0x4d6d15['canvas'][_0x58f66b(0x1b0)],
      _0x4d6d15[_0x58f66b(0xfa)][_0x58f66b(0x156)],
    );
    _0x4d6d15[_0x58f66b(0x215)](_0x237703, 0x0, 0x0);
    var _0x3166ee = _0x337beb[_0x58f66b(0x151)](_0x58f66b(0x20e)),
      _0x4ca457 = new FormData();
    _0x4ca457[_0x58f66b(0x1e9)](
      _0x58f66b(0x134),
      dataURItoBlob(_0x3166ee, 'jpeg'),
    ),
      _0x4ca457['append']('check', _0x58f66b(0x14c)),
      _0x4ca457[_0x58f66b(0x1e9)](_0x58f66b(0x131), 'temp'),
      _0x4ca457[_0x58f66b(0x1e9)](_0x58f66b(0xe2), _0x58f66b(0x1fd));
    var _0xd99c36 = new XMLHttpRequest();
    _0xd99c36[_0x58f66b(0x150)]('POST', _0x58f66b(0x1b1), !![]),
      _0xd99c36[_0x58f66b(0x167)](_0x4ca457),
      (_0xd99c36['onreadystatechange'] = function () {
        var _0x712a97 = _0x58f66b;
        if (
          _0xd99c36[_0x712a97(0x1f2)] == 0x4 &&
          _0xd99c36[_0x712a97(0x1ea)] == 0xc8
        ) {
          var _0x5b77da = JSON[_0x712a97(0xf1)](_0xd99c36[_0x712a97(0x220)]),
            _0x29498c = iTeXEQ[_0x712a97(0x16b)][_0x712a97(0x168)][
              'createElement'
            ](_0x712a97(0x1c4));
          (_0x29498c[_0x712a97(0x1f6)] = _0x712a97(0x16f)),
            (_0x29498c[_0x712a97(0x18b)][_0x712a97(0x1b0)] = _0x712a97(0x15a)),
            (_0x29498c[_0x712a97(0x18b)][_0x712a97(0x1f1)] = _0x712a97(0x10d)),
            _0x29498c[_0x712a97(0x176)](_0x712a97(0x157), _0x712a97(0x140)),
            _0x572e1f[_0x712a97(0x219)](0x0)[_0x712a97(0x133)](_0x29498c);
          evtclk != _0x712a97(0x195)
            ? _0x29498c[_0x712a97(0x16d)](_0x712a97(0x14e), eqn_click, ![])
            : _0x29498c[_0x712a97(0x16d)](evtclk, eqn_click, ![]);
          insertEqn(_0x5b77da[_0x712a97(0x199)][0x0]);
          var _0x25f04a =
            parseInt(
              document['querySelector'](_0x712a97(0x19f))[_0x712a97(0x130)],
            ) + 0x1;
          (document['querySelector'](_0x712a97(0x19f))[_0x712a97(0x130)] =
            _0x25f04a),
            (document['querySelector']('.itex_use_count')['textContent'] =
              _0x25f04a),
            (document[_0x712a97(0x111)](_0x712a97(0x20d))[_0x712a97(0x130)] =
              _0x5b77da[_0x712a97(0x1da)]),
            (document[_0x712a97(0xe0)](_0x712a97(0x1cd))[_0x712a97(0x18b)][
              _0x712a97(0x1f3)
            ] = _0x712a97(0x155)),
            window_exchange(0x1);
        }
      });
  } else alert('인식할\x20영역을\x20선택하십시오.');
}
