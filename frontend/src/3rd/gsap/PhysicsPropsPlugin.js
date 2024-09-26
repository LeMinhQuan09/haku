/*!
 * PhysicsPropsPlugin 3.12.5
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
  s,
  i,
  o,
  n = () =>
    e ||
    ('undefined' != typeof window &&
      (e = window.gsap) &&
      e.registerPlugin &&
      e),
  r = (e) => Math.round(1e4 * e) / 1e4,
  a = function () {
    return String.fromCharCode.apply(null, arguments);
  },
  l = a(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
  c = a(103, 115, 97, 112, 46, 99, 111, 109),
  p = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}:?\d*$/,
  d = (r) => {
    (e = r || n()),
      t ||
        ((s = e.utils.getUnit),
        (i = e.core.getStyleSaver),
        (o = e.core.reverting || function () {}),
        (t = 1));
  };
class f {
  constructor(e, t, i, o, n, r) {
    let a = e._gsap,
      l = a.get(e, t);
    (this.p = t),
      (this.set = a.set(e, t)),
      (this.s = this.val = parseFloat(l)),
      (this.u = s(l) || 0),
      (this.vel = i || 0),
      (this.v = this.vel / r),
      o || 0 === o
        ? ((this.acc = o), (this.a = this.acc / (r * r)))
        : (this.acc = this.a = 0),
      (this.fr = 1 - (n || 0));
  }
}
const h = {
  version: '3.12.5',
  name: 'physicsProps',
  register: d,
  init(e, s, o) {
    t || d();
    let n,
      r = this;
    for (n in ((r.styles = i && i(e)),
    (r.target = e),
    (r.tween = o),
    (r.step = 0),
    (r.sps = 30),
    (r.vProps = []),
    s)) {
      let { velocity: t, acceleration: o, friction: a } = s[n];
      (t || o) &&
        (r.vProps.push(new f(e, n, t, o, a, r.sps)),
        r._props.push(n),
        i && r.styles.save(n),
        a && (r.hasFr = 1));
    }
  },
  render(e, t) {
    let s,
      i,
      n,
      a,
      l,
      { vProps: c, tween: p, target: d, step: f, hasFr: h, sps: u } = t,
      g = c.length,
      v = p._from ? p._dur - p._time : p._time;
    if (p._time || !o())
      if (h) {
        if (((v *= u), (i = (0 | v) - f), i < 0)) {
          for (; g--; ) (s = c[g]), (s.v = s.vel / u), (s.val = s.s);
          (g = c.length), (t.step = f = 0), (i = 0 | v);
        }
        for (n = v % 1; g--; ) {
          for (s = c[g], a = i; a--; )
            (s.v += s.a), (s.v *= s.fr), (s.val += s.v);
          s.set(d, s.p, r(s.val + s.v * n * s.fr) + s.u);
        }
        t.step += i;
      } else
        for (l = v * v * 0.5; g--; )
          (s = c[g]), s.set(d, s.p, r(s.s + s.vel * v + s.acc * l) + s.u);
    else t.styles.revert();
  },
  kill(e) {
    let t = this.vProps,
      s = t.length;
    for (; s--; ) t[s].p === e && t.splice(s, 1);
  },
};
n() && e.registerPlugin(h);
export default h;
export { h as PhysicsPropsPlugin };
