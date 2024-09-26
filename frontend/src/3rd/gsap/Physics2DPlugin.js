/*!
 * Physics2DPlugin 3.12.5
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
  i,
  s,
  n,
  o = Math.PI / 180,
  a = () =>
    e ||
    ('undefined' != typeof window &&
      (e = window.gsap) &&
      e.registerPlugin &&
      e),
  r = (e) => Math.round(1e4 * e) / 1e4,
  l = function () {
    return String.fromCharCode.apply(null, arguments);
  },
  d = (o) => {
    (e = o || a()),
      t ||
        ((i = e.utils.getUnit),
        (s = e.core.getStyleSaver),
        (n = e.core.reverting || function () {}),
        (t = 1));
  };
class v {
  constructor(e, t, s, n, o) {
    let a = e._gsap,
      r = a.get(e, t);
    (this.p = t),
      (this.set = a.set(e, t)),
      (this.s = this.val = parseFloat(r)),
      (this.u = i(r) || 0),
      (this.vel = s || 0),
      (this.v = this.vel / o),
      n || 0 === n
        ? ((this.acc = n), (this.a = this.acc / (o * o)))
        : (this.acc = this.a = 0);
  }
}
const g = {
  version: '3.12.5',
  name: 'physics2D',
  register: d,
  init(e, i, n) {
    t || d();
    let a = +i.angle || 0,
      r = +i.velocity || 0,
      l = +i.acceleration || 0,
      c = i.xProp || 'x',
      p = i.yProp || 'y',
      h =
        i.accelerationAngle || 0 === i.accelerationAngle
          ? +i.accelerationAngle
          : a;
    (this.styles =
      s &&
      s(e, i.xProp && 'x' !== i.xProp ? i.xProp + ',' + i.yProp : 'transform')),
      (this.target = e),
      (this.tween = n),
      (this.step = 0),
      (this.sps = 30),
      i.gravity && ((l = +i.gravity), (h = 90)),
      (a *= o),
      (h *= o),
      (this.fr = 1 - (+i.friction || 0)),
      this._props.push(c, p),
      (this.xp = new v(e, c, Math.cos(a) * r, Math.cos(h) * l, this.sps)),
      (this.yp = new v(e, p, Math.sin(a) * r, Math.sin(h) * l, this.sps)),
      (this.skipX = this.skipY = 0);
  },
  render(e, t) {
    let i,
      s,
      o,
      a,
      l,
      c,
      {
        xp: p,
        yp: h,
        tween: d,
        target: v,
        step: g,
        sps: f,
        fr: u,
        skipX: w,
        skipY: y,
      } = t,
      m = d._from ? d._dur - d._time : d._time;
    if (d._time || !n()) {
      if (1 === u)
        (o = m * m * 0.5),
          (i = p.s + p.vel * m + p.acc * o),
          (s = h.s + h.vel * m + h.acc * o);
      else {
        for (
          m *= f,
            a = c = (0 | m) - g,
            c < 0 &&
              ((p.v = p.vel / f),
              (h.v = h.vel / f),
              (p.val = p.s),
              (h.val = h.s),
              (t.step = 0),
              (a = c = 0 | m)),
            l = (m % 1) * u;
          c--;

        )
          (p.v += p.a),
            (h.v += h.a),
            (p.v *= u),
            (h.v *= u),
            (p.val += p.v),
            (h.val += h.v);
        (i = p.val + p.v * l), (s = h.val + h.v * l), (t.step += a);
      }
      w || p.set(v, p.p, r(i) + p.u), y || h.set(v, h.p, r(s) + h.u);
    } else t.styles.revert();
  },
  kill(e) {
    this.xp.p === e && (this.skipX = 1), this.yp.p === e && (this.skipY = 1);
  },
};
a() && e.registerPlugin(g);
export default g;
export { g as Physics2DPlugin };
