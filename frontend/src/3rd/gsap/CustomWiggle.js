/*!
 * CustomWiggle 3.12.5
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
  o = () =>
    e ||
    ('undefined' != typeof window &&
      (e = window.gsap) &&
      e.registerPlugin &&
      e),
  i = {
    easeOut: 'M0,1,C0.7,1,0.6,0,1,0',
    easeInOut: 'M0,0,C0.1,0,0.24,1,0.444,1,0.644,1,0.6,0,1,0',
    anticipate:
      'M0,0,C0,0.222,0.024,0.386,0,0.4,0.18,0.455,0.65,0.646,0.7,0.67,0.9,0.76,1,0.846,1,1',
    uniform: 'M0,0,C0,0.95,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0',
  },
  a = (e) => e,
  s = (a) => {
    if (!t)
      if (((e = o()), (n = e && e.parseEase('_CE')), n)) {
        for (let e in i) i[e] = n('', i[e]);
        (t = 1),
          (f('wiggle').config = (e) =>
            'object' == typeof e
              ? f('', e)
              : f('wiggle(' + e + ')', { wiggles: +e }));
      } else
        a &&
          console.warn('Please gsap.registerPlugin(CustomEase, CustomWiggle)');
  },
  r = (t, o) => (
    'function' != typeof t && (t = e.parseEase(t) || n('', t)),
    t.custom || !o ? t : (e) => 1 - t(e)
  ),
  f = (e, o) => {
    t || s(1);
    let l,
      u,
      g,
      d,
      f,
      p,
      w,
      h,
      m,
      y = 0 | ((o = o || {}).wiggles || 10),
      C = 1 / y,
      E = C / 2,
      M = 'anticipate' === o.type,
      v = i[o.type] || i.easeOut,
      O = a;
    if (
      (M && ((O = v), (v = i.easeOut)),
      o.timingEase && (O = r(o.timingEase)),
      o.amplitudeEase && (v = r(o.amplitudeEase, !0)),
      (p = O(E)),
      (w = M ? -v(E) : v(E)),
      (h = [0, 0, p / 4, 0, p / 2, w, p, w]),
      'random' === o.type)
    ) {
      for (h.length = 4, l = O(C), u = 2 * Math.random() - 1, m = 2; m < y; m++)
        (E = l),
          (w = u),
          (l = O(C * m)),
          (u = 2 * Math.random() - 1),
          (g = Math.atan2(u - h[h.length - 3], l - h[h.length - 4])),
          (d = Math.cos(g) * C),
          (f = Math.sin(g) * C),
          h.push(E - d, w - f, E, w, E + d, w + f);
      h.push(l, 0, 1, 0);
    } else {
      for (m = 1; m < y; m++)
        h.push(O(E + C / 2), w),
          (E += C),
          (w = (w > 0 ? -1 : 1) * v(m * C)),
          (p = O(E)),
          h.push(O(E - C / 2), w, p, w);
      h.push(O(E + C / 4), w, O(E + C / 4), 0, 1, 0);
    }
    for (m = h.length; --m > -1; ) h[m] = ~~(1e3 * h[m]) / 1e3;
    return (h[2] = 'C' + h[2]), n(e, 'M' + h.join(','));
  };
class p {
  constructor(e, t) {
    this.ease = f(e, t);
  }
  static create(e, t) {
    return f(e, t);
  }
  static register(t) {
    (e = t), s();
  }
}
o() && e.registerPlugin(p), (p.version = '3.12.5');
export default p;
export { p as CustomWiggle };
