/*!
 * CustomEase 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

let e = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
  t = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
  n = Math.PI / 180,
  s = Math.sin,
  i = Math.cos,
  o = Math.abs,
  a = Math.sqrt,
  r = (e) => Math.round(1e5 * e) / 1e5 || 0;
function l(e, t, r, l, h, c, g, u, f) {
  if (e === u && t === f) return;
  (r = o(r)), (l = o(l));
  let d = (h % 360) * n,
    p = i(d),
    x = s(d),
    y = Math.PI,
    w = 2 * y,
    m = (e - u) / 2,
    M = (t - f) / 2,
    C = p * m + x * M,
    E = -x * m + p * M,
    b = C * C,
    v = E * E,
    S = b / (r * r) + v / (l * l);
  S > 1 && ((r = a(S) * r), (l = a(S) * l));
  let N = r * r,
    L = l * l,
    P = (N * L - N * v - L * b) / (N * v + L * b);
  P < 0 && (P = 0);
  let A = (c === g ? -1 : 1) * a(P),
    O = A * ((r * E) / l),
    D = A * ((-l * C) / r),
    V = (e + u) / 2 + (p * O - x * D),
    T = (t + f) / 2 + (x * O + p * D),
    _ = (C - O) / r,
    j = (E - D) / l,
    q = (-C - O) / r,
    G = (-E - D) / l,
    I = _ * _ + j * j,
    R = (j < 0 ? -1 : 1) * Math.acos(_ / a(I)),
    W =
      (_ * G - j * q < 0 ? -1 : 1) *
      Math.acos((_ * q + j * G) / a(I * (q * q + G * G)));
  isNaN(W) && (W = y),
    !g && W > 0 ? (W -= w) : g && W < 0 && (W += w),
    (R %= w),
    (W %= w);
  let z,
    H = Math.ceil(o(W) / (w / 4)),
    Q = [],
    Z = W / H,
    U = ((4 / 3) * s(Z / 2)) / (1 + i(Z / 2)),
    Y = p * r,
    $ = x * r,
    k = x * -l,
    B = p * l;
  for (z = 0; z < H; z++)
    (C = i((h = R + z * Z))),
      (E = s(h)),
      (_ = i((h += Z))),
      (j = s(h)),
      Q.push(C - U * E, E + U * C, _ + U * j, j - U * _, _, j);
  for (z = 0; z < Q.length; z += 2)
    (C = Q[z]),
      (E = Q[z + 1]),
      (Q[z] = C * Y + E * k + V),
      (Q[z + 1] = C * $ + E * B + T);
  return (Q[z - 2] = u), (Q[z - 1] = f), Q;
}
let h,
  c,
  g = () =>
    h ||
    ('undefined' != typeof window &&
      (h = window.gsap) &&
      h.registerPlugin &&
      h),
  u = () => {
    (h = g()),
      h
        ? (h.registerEase('_CE', E.create), (c = 1))
        : console.warn('Please gsap.registerPlugin(CustomEase)');
  },
  f = (e) => ~~(1e3 * e + (e < 0 ? -0.5 : 0.5)) / 1e3,
  m = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi,
  M = /[cLlsSaAhHvVtTqQ]/g,
  C = function (e, t, n, s, i, o, a, r, l, h, c) {
    let g,
      u = (e + n) / 2,
      f = (t + s) / 2,
      d = (n + i) / 2,
      p = (s + o) / 2,
      x = (i + a) / 2,
      y = (o + r) / 2,
      w = (u + d) / 2,
      m = (f + p) / 2,
      M = (d + x) / 2,
      E = (p + y) / 2,
      b = (w + M) / 2,
      v = (m + E) / 2,
      S = a - e,
      N = r - t,
      L = Math.abs((n - a) * N - (s - r) * S),
      P = Math.abs((i - a) * N - (o - r) * S);
    return (
      h ||
        ((h = [
          { x: e, y: t },
          { x: a, y: r },
        ]),
        (c = 1)),
      h.splice(c || h.length - 1, 0, { x: b, y: v }),
      (L + P) * (L + P) > l * (S * S + N * N) &&
        ((g = h.length),
        C(e, t, u, f, w, m, b, v, l, h, c),
        C(b, v, M, E, x, y, a, r, l, h, c + 1 + (h.length - g))),
      h
    );
  };
class E {
  constructor(e, t, n) {
    c || u(), (this.id = e), this.setData(t, n);
  }
  setData(n, s) {
    s = s || {};
    let i,
      a,
      r,
      c,
      g,
      u,
      f,
      d,
      p,
      x = (n = n || '0,0,1,1').match(m),
      y = 1,
      w = [],
      E = [],
      b = s.precision || 1,
      v = b <= 1;
    if (
      ((this.data = n),
      (M.test(n) || (~n.indexOf('M') && n.indexOf('C') < 0)) &&
        (x = (function (n) {
          let s,
            i,
            a,
            r,
            h,
            c,
            g,
            u,
            f,
            d,
            p,
            x,
            y,
            w,
            m,
            M =
              (n + '')
                .replace(t, (e) => {
                  let t = +e;
                  return t < 1e-4 && t > -1e-4 ? 0 : t;
                })
                .match(e) || [],
            C = [],
            E = 0,
            b = 0,
            v = M.length,
            S = 0,
            N = 'ERROR: malformed path: ' + n,
            L = function (e, t, n, s) {
              (d = (n - e) / 3),
                (p = (s - t) / 3),
                g.push(e + d, t + p, n - d, s - p, n, s);
            };
          if (!n || !isNaN(M[0]) || isNaN(M[1])) return console.log(N), C;
          for (s = 0; s < v; s++)
            if (
              ((y = h),
              isNaN(M[s]) ? ((h = M[s].toUpperCase()), (c = h !== M[s])) : s--,
              (a = +M[s + 1]),
              (r = +M[s + 2]),
              c && ((a += E), (r += b)),
              s || ((u = a), (f = r)),
              'M' === h)
            )
              g && (g.length < 8 ? (C.length -= 1) : (S += g.length)),
                (E = u = a),
                (b = f = r),
                (g = [a, r]),
                C.push(g),
                (s += 2),
                (h = 'L');
            else if ('C' === h)
              g || (g = [0, 0]),
                c || (E = b = 0),
                g.push(
                  a,
                  r,
                  E + 1 * M[s + 3],
                  b + 1 * M[s + 4],
                  (E += 1 * M[s + 5]),
                  (b += 1 * M[s + 6])
                ),
                (s += 6);
            else if ('S' === h)
              (d = E),
                (p = b),
                ('C' !== y && 'S' !== y) ||
                  ((d += E - g[g.length - 4]), (p += b - g[g.length - 3])),
                c || (E = b = 0),
                g.push(d, p, a, r, (E += 1 * M[s + 3]), (b += 1 * M[s + 4])),
                (s += 4);
            else if ('Q' === h)
              (d = E + (2 / 3) * (a - E)),
                (p = b + (2 / 3) * (r - b)),
                c || (E = b = 0),
                (E += 1 * M[s + 3]),
                (b += 1 * M[s + 4]),
                g.push(
                  d,
                  p,
                  E + (2 / 3) * (a - E),
                  b + (2 / 3) * (r - b),
                  E,
                  b
                ),
                (s += 4);
            else if ('T' === h)
              (d = E - g[g.length - 4]),
                (p = b - g[g.length - 3]),
                g.push(
                  E + d,
                  b + p,
                  a + (2 / 3) * (E + 1.5 * d - a),
                  r + (2 / 3) * (b + 1.5 * p - r),
                  (E = a),
                  (b = r)
                ),
                (s += 2);
            else if ('H' === h) L(E, b, (E = a), b), (s += 1);
            else if ('V' === h) L(E, b, E, (b = a + (c ? b - E : 0))), (s += 1);
            else if ('L' === h || 'Z' === h)
              'Z' === h && ((a = u), (r = f), (g.closed = !0)),
                ('L' === h || o(E - a) > 0.5 || o(b - r) > 0.5) &&
                  (L(E, b, a, r), 'L' === h && (s += 2)),
                (E = a),
                (b = r);
            else if ('A' === h) {
              if (
                ((w = M[s + 4]),
                (m = M[s + 5]),
                (d = M[s + 6]),
                (p = M[s + 7]),
                (i = 7),
                w.length > 1 &&
                  (w.length < 3
                    ? ((p = d), (d = m), i--)
                    : ((p = m), (d = w.substr(2)), (i -= 2)),
                  (m = w.charAt(1)),
                  (w = w.charAt(0))),
                (x = l(
                  E,
                  b,
                  +M[s + 1],
                  +M[s + 2],
                  +M[s + 3],
                  +w,
                  +m,
                  (c ? E : 0) + 1 * d,
                  (c ? b : 0) + 1 * p
                )),
                (s += i),
                x)
              )
                for (i = 0; i < x.length; i++) g.push(x[i]);
              (E = g[g.length - 2]), (b = g[g.length - 1]);
            } else console.log(N);
          return (
            (s = g.length),
            s < 6
              ? (C.pop(), (s = 0))
              : g[0] === g[s - 2] && g[1] === g[s - 1] && (g.closed = !0),
            (C.totalPoints = S + s),
            C
          );
        })(n)[0]),
      (i = x.length),
      4 === i)
    )
      x.unshift(0, 0), x.push(1, 1), (i = 8);
    else if ((i - 2) % 6) throw 'Invalid CustomEase';
    for (
      (0 == +x[0] && 1 == +x[i - 2]) ||
        ((e, t, n) => {
          n || 0 === n || (n = Math.max(+e[e.length - 1], +e[1]));
          let s,
            i = -1 * +e[0],
            o = -n,
            a = e.length,
            r = 1 / (+e[a - 2] + i),
            l =
              -t ||
              (Math.abs(+e[a - 1] - +e[1]) < 0.01 * (+e[a - 2] - +e[0])
                ? ((e) => {
                    let t,
                      n = e.length,
                      s = 1e20;
                    for (t = 1; t < n; t += 6) +e[t] < s && (s = +e[t]);
                    return s;
                  })(e) + o
                : +e[a - 1] + o);
          for (l = l ? 1 / l : -r, s = 0; s < a; s += 2)
            (e[s] = (+e[s] + i) * r), (e[s + 1] = (+e[s + 1] + o) * l);
        })(x, s.height, s.originY),
        this.segment = x,
        c = 2;
      c < i;
      c += 6
    )
      (a = { x: +x[c - 2], y: +x[c - 1] }),
        (r = { x: +x[c + 4], y: +x[c + 5] }),
        w.push(a, r),
        C(
          a.x,
          a.y,
          +x[c],
          +x[c + 1],
          +x[c + 2],
          +x[c + 3],
          r.x,
          r.y,
          1 / (2e5 * b),
          w,
          w.length - 1
        );
    for (i = w.length, c = 0; c < i; c++)
      (f = w[c]),
        (d = w[c - 1] || f),
        (f.x > d.x || (d.y !== f.y && d.x === f.x) || f === d) && f.x <= 1
          ? ((d.cx = f.x - d.x),
            (d.cy = f.y - d.y),
            (d.n = f),
            (d.nx = f.x),
            v &&
              c > 1 &&
              Math.abs(d.cy / d.cx - w[c - 2].cy / w[c - 2].cx) > 2 &&
              (v = 0),
            d.cx < y &&
              (d.cx
                ? (y = d.cx)
                : ((d.cx = 0.001),
                  c === i - 1 &&
                    ((d.x -= 0.001), (y = Math.min(y, 0.001)), (v = 0)))))
          : (w.splice(c--, 1), i--);
    if (((i = (1 / y + 1) | 0), (g = 1 / i), (u = 0), (f = w[0]), v)) {
      for (c = 0; c < i; c++)
        (p = c * g),
          f.nx < p && (f = w[++u]),
          (a = f.y + ((p - f.x) / f.cx) * f.cy),
          (E[c] = { x: p, cx: g, y: a, cy: 0, nx: 9 }),
          c && (E[c - 1].cy = a - E[c - 1].y);
      E[i - 1].cy = w[w.length - 1].y - a;
    } else {
      for (c = 0; c < i; c++) f.nx < c * g && (f = w[++u]), (E[c] = f);
      u < w.length - 1 && (E[c - 1] = w[w.length - 2]);
    }
    return (
      (this.ease = (e) => {
        let t = E[(e * i) | 0] || E[i - 1];
        return t.nx < e && (t = t.n), t.y + ((e - t.x) / t.cx) * t.cy;
      }),
      (this.ease.custom = this),
      this.id && h && h.registerEase(this.id, this.ease),
      this
    );
  }
  getSVGData(e) {
    return E.getSVGData(this, e);
  }
  static create(e, t, n) {
    return new E(e, t, n).ease;
  }
  static register(e) {
    (h = e), u();
  }
  static get(e) {
    return h.parseEase(e);
  }
  static getSVGData(e, t) {
    let n,
      s,
      i,
      o,
      a,
      l,
      c,
      g,
      u,
      d,
      p = (t = t || {}).width || 100,
      x = t.height || 100,
      y = t.x || 0,
      w = (t.y || 0) + x,
      m = h.utils.toArray(t.path)[0];
    if (
      (t.invert && ((x = -x), (w = 0)),
      'string' == typeof e && (e = h.parseEase(e)),
      e.custom && (e = e.custom),
      e instanceof E)
    )
      n = (function (e) {
        'number' == typeof e[0] && (e = [e]);
        let t,
          n,
          s,
          i,
          o = '',
          a = e.length;
        for (n = 0; n < a; n++) {
          for (
            i = e[n],
              o += 'M' + r(i[0]) + ',' + r(i[1]) + ' C',
              t = i.length,
              s = 2;
            s < t;
            s++
          )
            o +=
              r(i[s++]) +
              ',' +
              r(i[s++]) +
              ' ' +
              r(i[s++]) +
              ',' +
              r(i[s++]) +
              ' ' +
              r(i[s++]) +
              ',' +
              r(i[s]) +
              ' ';
          i.closed && (o += 'z');
        }
        return o;
      })(
        (function (e, t, n, s, i, o, a) {
          let r,
            l,
            h,
            c,
            g,
            u = e.length;
          for (; --u > -1; )
            for (r = e[u], l = r.length, h = 0; h < l; h += 2)
              (c = r[h]),
                (g = r[h + 1]),
                (r[h] = c * t + g * s + o),
                (r[h + 1] = c * n + g * i + a);
          return (e._dirty = 1), e;
        })([e.segment], p, 0, 0, -x, y, w)
      );
    else {
      for (
        n = [y, w],
          c = Math.max(5, 200 * (t.precision || 1)),
          o = 1 / c,
          c += 2,
          g = 5 / c,
          u = f(y + o * p),
          d = f(w + e(o) * -x),
          s = (d - w) / (u - y),
          i = 2;
        i < c;
        i++
      )
        (a = f(y + i * o * p)),
          (l = f(w + e(i * o) * -x)),
          (Math.abs((l - d) / (a - u) - s) > g || i === c - 1) &&
            (n.push(u, d), (s = (l - d) / (a - u))),
          (u = a),
          (d = l);
      n = 'M' + n.join(',');
    }
    return m && m.setAttribute('d', n), n;
  }
}
g() && h.registerPlugin(E), (E.version = '3.12.5');
export default E;
export { E as CustomEase };
