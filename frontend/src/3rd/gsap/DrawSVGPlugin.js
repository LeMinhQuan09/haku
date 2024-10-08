/*!
 * DrawSVGPlugin 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2024, GreenSock. All rights reserved.
 * *** DO NOT DEPLOY THIS FILE ***
 * This is a trial version that only works locally and on domains like codepen.io and codesandbox.io.
 * Loading it on an unauthorized domain violates the license and will cause a redirect.
 * Get the unrestricted file by joining Club GSAP at https://gsap.com/pricing
 * @author: Jack Doyle, jack@greensock.com
 */

let e,
  t,
  n,
  i,
  r,
  s,
  o,
  a,
  l = () => 'undefined' != typeof window,
  d = () => e || (l() && (e = window.gsap) && e.registerPlugin && e),
  h = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
  f = {
    rect: ['width', 'height'],
    circle: ['r', 'r'],
    ellipse: ['rx', 'ry'],
    line: ['x2', 'y2'],
  },
  g = (e) => Math.round(1e4 * e) / 1e4,
  c = (e) => parseFloat(e) || 0,
  u = (e, t) => {
    let n = c(e);
    return ~e.indexOf('%') ? (n / 100) * t : n;
  },
  p = (e, t) => c(e.getAttribute(t)),
  w = Math.sqrt,
  y = (e, t, n, i, r, s) =>
    w(((c(n) - c(e)) * r) ** 2 + ((c(i) - c(t)) * s) ** 2),
  _ = (e) => console.warn(e),
  x = (e) => 'non-scaling-stroke' === e.getAttribute('vector-effect'),
  b = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}:?\d*$/,
  S = (e) => {
    if (!(e = t(e)[0])) return 0;
    let n,
      i,
      r,
      o,
      a,
      l,
      d,
      c = e.tagName.toLowerCase(),
      u = e.style,
      m = 1,
      k = 1;
    x(e) &&
      ((k = e.getScreenCTM()),
      (m = w(k.a * k.a + k.b * k.b)),
      (k = w(k.d * k.d + k.c * k.c)));
    try {
      i = e.getBBox();
    } catch (e) {
      _(
        "Some browsers won't measure invisible elements (like display:none or masks inside defs)."
      );
    }
    let {
      x: v,
      y: b,
      width: P,
      height: S,
    } = i || { x: 0, y: 0, width: 0, height: 0 };
    if (
      ((i && (P || S)) ||
        !f[c] ||
        ((P = p(e, f[c][0])),
        (S = p(e, f[c][1])),
        'rect' !== c && 'line' !== c && ((P *= 2), (S *= 2)),
        'line' === c &&
          ((v = p(e, 'x1')),
          (b = p(e, 'y1')),
          (P = Math.abs(P - v)),
          (S = Math.abs(S - b)))),
      'path' === c)
    )
      (o = u.strokeDasharray),
        (u.strokeDasharray = 'none'),
        (n = e.getTotalLength() || 0),
        g(m) !== g(k) &&
          !s &&
          (s = 1) &&
          _(
            "Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."
          ),
        (n *= (m + k) / 2),
        (u.strokeDasharray = o);
    else if ('rect' === c) n = 2 * P * m + 2 * S * k;
    else if ('line' === c) n = y(v, b, v + P, b + S, m, k);
    else if ('polyline' === c || 'polygon' === c)
      for (
        r = e.getAttribute('points').match(h) || [],
          'polygon' === c && r.push(r[0], r[1]),
          n = 0,
          a = 2;
        a < r.length;
        a += 2
      )
        n += y(r[a - 2], r[a - 1], r[a], r[a + 1], m, k) || 0;
    else
      ('circle' !== c && 'ellipse' !== c) ||
        ((l = (P / 2) * m),
        (d = (S / 2) * k),
        (n = Math.PI * (3 * (l + d) - w((3 * l + d) * (l + 3 * d)))));
    return n || 0;
  },
  T = (e, i) => {
    if (!(e = t(e)[0])) return [0, 0];
    i || (i = S(e) + 1);
    let r = n.getComputedStyle(e),
      s = r.strokeDasharray || '',
      o = c(r.strokeDashoffset),
      a = s.indexOf(',');
    return (
      a < 0 && (a = s.indexOf(' ')),
      (s = a < 0 ? i : c(s.substr(0, a))),
      s > i && (s = i),
      [-o || 0, s - o || 0]
    );
  },
  D = () => {
    l() &&
      ((n = window),
      (r = e = d()),
      (t = e.utils.toArray),
      (o = e.core.getStyleSaver),
      (a = e.core.reverting || function () {}),
      (i = -1 !== ((n.navigator || {}).userAgent || '').indexOf('Edge')));
  };
const O = {
  version: '3.12.5',
  name: 'drawSVG',
  register(t) {
    (e = t), D();
  },
  init(e, t, s, a, l) {
    if (!e.getBBox) return !1;
    r || D();
    let d,
      h,
      f,
      p = S(e);
    return (
      (this.styles =
        o && o(e, 'strokeDashoffset,strokeDasharray,strokeMiterlimit')),
      (this.tween = s),
      (this._style = e.style),
      (this._target = e),
      t + '' == 'true'
        ? (t = '0 100%')
        : t
        ? -1 === (t + '').indexOf(' ') && (t = '0 ' + t)
        : (t = '0 0'),
      (d = T(e, p)),
      (h = ((e, t, n) => {
        let i,
          r,
          s = e.indexOf(' ');
        return (
          s < 0
            ? ((i = void 0 !== n ? n + '' : e), (r = e))
            : ((i = e.substr(0, s)), (r = e.substr(s + 1))),
          (i = u(i, t)),
          (r = u(r, t)),
          i > r ? [r, i] : [i, r]
        );
      })(t, p, d[0])),
      (this._length = g(p)),
      (this._dash = g(d[1] - d[0])),
      (this._offset = g(-d[0])),
      (this._dashPT = this.add(
        this,
        '_dash',
        this._dash,
        g(h[1] - h[0]),
        0,
        0,
        0,
        0,
        0,
        1
      )),
      (this._offsetPT = this.add(
        this,
        '_offset',
        this._offset,
        g(-h[0]),
        0,
        0,
        0,
        0,
        0,
        1
      )),
      i &&
        ((f = n.getComputedStyle(e)),
        f.strokeLinecap !== f.strokeLinejoin &&
          ((h = c(f.strokeMiterlimit)),
          this.add(e.style, 'strokeMiterlimit', h, h + 0.01))),
      (this._live = x(e) || ~(t + '').indexOf('live')),
      (this._nowrap = ~(t + '').indexOf('nowrap')),
      this._props.push('drawSVG')
    );
  },
  render(e, t) {
    if (t.tween._time || !a()) {
      let n,
        i,
        r,
        s,
        o = t._pt,
        a = t._style;
      if (o) {
        for (
          t._live &&
          ((n = S(t._target)),
          n !== t._length &&
            ((i = n / t._length),
            (t._length = n),
            t._offsetPT && ((t._offsetPT.s *= i), (t._offsetPT.c *= i)),
            t._dashPT
              ? ((t._dashPT.s *= i), (t._dashPT.c *= i))
              : (t._dash *= i)));
          o;

        )
          o.r(e, o.d), (o = o._next);
        (r = t._dash || (e && 1 !== e ? 1e-4 : 0)),
          (n = t._length - r + 0.1),
          (s = t._offset),
          r &&
            s &&
            r + Math.abs(s % t._length) > t._length - 0.2 &&
            (s += s < 0 ? 0.1 : -0.1) &&
            (n += 0.1),
          (a.strokeDashoffset = r ? s : s + 0.001),
          (a.strokeDasharray =
            n < 0.2
              ? 'none'
              : r
              ? r + 'px,' + (t._nowrap ? 999999 : n) + 'px'
              : '0px, 999999px');
      }
    } else t.styles.revert();
  },
  getLength: S,
  getPosition: T,
};
d() && e.registerPlugin(O);
export default O;
export { O as DrawSVGPlugin };
