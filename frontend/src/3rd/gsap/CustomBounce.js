/*!
 * CustomBounce 3.12.5
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
  i = (i) => {
    (e = o()),
      (n = e && e.parseEase('_CE')),
      n
        ? ((t = 1),
          (e.parseEase('bounce').config = (e) =>
            'object' == typeof e
              ? f('', e)
              : f('bounce(' + e + ')', { strength: +e })))
        : i &&
          console.warn('Please gsap.registerPlugin(CustomEase, CustomBounce)');
  },
  s = (e) => {
    let t,
      n = e.length,
      o = 1 / e[n - 2];
    for (t = 2; t < n; t += 2) e[t] = ~~(e[t] * o * 1e3) / 1e3;
    e[n - 2] = 1;
  },
  r = function () {
    return String.fromCharCode.apply(null, arguments);
  },
  f = (e, o) => {
    if ((t || i(1), (o = o || {}))) {
      let t,
        i,
        r,
        a,
        u,
        d,
        c,
        f = 0.999,
        l = Math.min(f, o.strength || 0.7),
        g = l,
        p = (o.squash || 0) / 100,
        w = p,
        h = 1 / 0.03,
        m = 0.2,
        y = 1,
        C = 0.1,
        v = [0, 0, 0.07, 0, 0.1, 1, 0.1, 1],
        E = [0, 0, 0, 0, 0.1, 0, 0.1, 0];
      for (
        u = 0;
        u < 200 &&
        ((m *= g * ((g + 1) / 2)),
        (y *= l * l),
        (d = C + m),
        (r = C + 0.49 * m),
        (a = 1 - y),
        (t = C + y / h),
        (i = r + 0.8 * (r - t)),
        p &&
          ((C += p),
          (t += p),
          (r += p),
          (i += p),
          (d += p),
          (c = p / w),
          E.push(
            C - p,
            0,
            C - p,
            c,
            C - p / 2,
            c,
            C,
            c,
            C,
            0,
            C,
            0,
            C,
            -0.6 * c,
            C + (d - C) / 6,
            0,
            d,
            0
          ),
          v.push(C - p, 1, C, 1, C, 1),
          (p *= l * l)),
        v.push(C, 1, t, a, r, a, i, a, d, 1, d, 1),
        (l *= 0.95),
        (h = y / (d - i)),
        (C = d),
        !(a > f));
        u++
      );
      if (o.endAtStart && 'false' !== o.endAtStart) {
        if (((r = -0.1), v.unshift(r, 1, r, 1, -0.07, 0), w))
          for (
            p = 2.5 * w,
              r -= p,
              v.unshift(r, 1, r, 1, r, 1),
              E.splice(0, 6),
              E.unshift(
                r,
                0,
                r,
                0,
                r,
                1,
                r + p / 2,
                1,
                r + p,
                1,
                r + p,
                0,
                r + p,
                0,
                r + p,
                -0.6,
                r + p + 0.033,
                0
              ),
              u = 0;
            u < E.length;
            u += 2
          )
            E[u] -= r;
        for (u = 0; u < v.length; u += 2)
          (v[u] -= r), (v[u + 1] = 1 - v[u + 1]);
      }
      return (
        p &&
          (s(E),
          (E[2] = 'C' + E[2]),
          n(o.squashID || e + '-squash', 'M' + E.join(','))),
        s(v),
        (v[2] = 'C' + v[2]),
        n(e, 'M' + v.join(','))
      );
    }
  };
class l {
  constructor(e, t) {
    this.ease = f(e, t);
  }
  static create(e, t) {
    return f(e, t);
  }
  static register(t) {
    (e = t), i();
  }
}
o() && e.registerPlugin(l), (l.version = '3.12.5');
export default l;
export { l as CustomBounce };
