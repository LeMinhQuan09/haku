/*!
 * MotionPathHelper 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2024, GreenSock. All rights reserved.
 * *** DO NOT DEPLOY THIS FILE ***
 * This is a trial version that only works locally and on domains like codepen.io and codesandbox.io.
 * Loading it on an unauthorized domain violates the license and will cause a redirect.
 * Get the unrestricted file by joining Club GSAP at https://gsap.com/pricing
 * @author: Jack Doyle, jack@greensock.com
 */

let t,
  e = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
  s = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
  i = Math.PI / 180,
  n = Math.sin,
  o = Math.cos,
  r = Math.abs,
  a = Math.sqrt,
  h = (t) => Math.round(1e5 * t) / 1e5 || 0,
  l = (t, e) => (
    (e.totalLength = t.totalLength),
    t.samples
      ? ((e.samples = t.samples.slice(0)),
        (e.lookup = t.lookup.slice(0)),
        (e.minLength = t.minLength),
        (e.resolution = t.resolution))
      : t.totalPoints && (e.totalPoints = t.totalPoints),
    e
  );
function c(t) {
  let e = [],
    s = 0;
  for (; s < t.length; s++) e[s] = l(t[s], t[s].slice(0));
  return l(t, e);
}
function d(t, e, s, i, n, o, r) {
  let a,
    h,
    l,
    c,
    d,
    g = t.length;
  for (; --g > -1; )
    for (a = t[g], h = a.length, l = 0; l < h; l += 2)
      (c = a[l]),
        (d = a[l + 1]),
        (a[l] = c * e + d * i + o),
        (a[l + 1] = c * s + d * n + r);
  return (t._dirty = 1), t;
}
function g(t, e, s, h, l, c, d, g, p) {
  if (t === g && e === p) return;
  (s = r(s)), (h = r(h));
  let u = (l % 360) * i,
    _ = o(u),
    f = n(u),
    m = Math.PI,
    b = 2 * m,
    v = (t - g) / 2,
    y = (e - p) / 2,
    A = _ * v + f * y,
    w = -f * v + _ * y,
    P = A * A,
    x = w * w,
    C = P / (s * s) + x / (h * h);
  C > 1 && ((s = a(C) * s), (h = a(C) * h));
  let S = s * s,
    E = h * h,
    k = (S * E - S * x - E * P) / (S * x + E * P);
  k < 0 && (k = 0);
  let M = (c === d ? -1 : 1) * a(k),
    D = M * ((s * w) / h),
    T = M * ((-h * A) / s),
    H = (t + g) / 2 + (_ * D - f * T),
    N = (e + p) / 2 + (f * D + _ * T),
    R = (A - D) / s,
    L = (w - T) / h,
    X = (-A - D) / s,
    O = (-w - T) / h,
    I = R * R + L * L,
    q = (L < 0 ? -1 : 1) * Math.acos(R / a(I)),
    Y =
      (R * O - L * X < 0 ? -1 : 1) *
      Math.acos((R * X + L * O) / a(I * (X * X + O * O)));
  isNaN(Y) && (Y = m),
    !d && Y > 0 ? (Y -= b) : d && Y < 0 && (Y += b),
    (q %= b),
    (Y %= b);
  let V,
    j = Math.ceil(r(Y) / (b / 4)),
    z = [],
    G = Y / j,
    W = ((4 / 3) * n(G / 2)) / (1 + o(G / 2)),
    B = _ * s,
    F = f * s,
    U = f * -h,
    Z = _ * h;
  for (V = 0; V < j; V++)
    (A = o((l = q + V * G))),
      (w = n(l)),
      (R = o((l += G))),
      (L = n(l)),
      z.push(A - W * w, w + W * A, R + W * L, L - W * R, R, L);
  for (V = 0; V < z.length; V += 2)
    (A = z[V]),
      (w = z[V + 1]),
      (z[V] = A * B + w * U + H),
      (z[V + 1] = A * F + w * Z + N);
  return (z[V - 2] = g), (z[V - 1] = p), z;
}
function p(t) {
  let i,
    n,
    o,
    a,
    h,
    l,
    c,
    d,
    p,
    u,
    _,
    f,
    m,
    b,
    v,
    y =
      (t + '')
        .replace(s, (t) => {
          let e = +t;
          return e < 1e-4 && e > -1e-4 ? 0 : e;
        })
        .match(e) || [],
    A = [],
    w = 0,
    P = 0,
    x = y.length,
    C = 0,
    S = 'ERROR: malformed path: ' + t,
    E = function (t, e, s, i) {
      (u = (s - t) / 3),
        (_ = (i - e) / 3),
        c.push(t + u, e + _, s - u, i - _, s, i);
    };
  if (!t || !isNaN(y[0]) || isNaN(y[1])) return console.log(S), A;
  for (i = 0; i < x; i++)
    if (
      ((m = h),
      isNaN(y[i]) ? ((h = y[i].toUpperCase()), (l = h !== y[i])) : i--,
      (o = +y[i + 1]),
      (a = +y[i + 2]),
      l && ((o += w), (a += P)),
      i || ((d = o), (p = a)),
      'M' === h)
    )
      c && (c.length < 8 ? (A.length -= 1) : (C += c.length)),
        (w = d = o),
        (P = p = a),
        (c = [o, a]),
        A.push(c),
        (i += 2),
        (h = 'L');
    else if ('C' === h)
      c || (c = [0, 0]),
        l || (w = P = 0),
        c.push(
          o,
          a,
          w + 1 * y[i + 3],
          P + 1 * y[i + 4],
          (w += 1 * y[i + 5]),
          (P += 1 * y[i + 6])
        ),
        (i += 6);
    else if ('S' === h)
      (u = w),
        (_ = P),
        ('C' !== m && 'S' !== m) ||
          ((u += w - c[c.length - 4]), (_ += P - c[c.length - 3])),
        l || (w = P = 0),
        c.push(u, _, o, a, (w += 1 * y[i + 3]), (P += 1 * y[i + 4])),
        (i += 4);
    else if ('Q' === h)
      (u = w + (2 / 3) * (o - w)),
        (_ = P + (2 / 3) * (a - P)),
        l || (w = P = 0),
        (w += 1 * y[i + 3]),
        (P += 1 * y[i + 4]),
        c.push(u, _, w + (2 / 3) * (o - w), P + (2 / 3) * (a - P), w, P),
        (i += 4);
    else if ('T' === h)
      (u = w - c[c.length - 4]),
        (_ = P - c[c.length - 3]),
        c.push(
          w + u,
          P + _,
          o + (2 / 3) * (w + 1.5 * u - o),
          a + (2 / 3) * (P + 1.5 * _ - a),
          (w = o),
          (P = a)
        ),
        (i += 2);
    else if ('H' === h) E(w, P, (w = o), P), (i += 1);
    else if ('V' === h) E(w, P, w, (P = o + (l ? P - w : 0))), (i += 1);
    else if ('L' === h || 'Z' === h)
      'Z' === h && ((o = d), (a = p), (c.closed = !0)),
        ('L' === h || r(w - o) > 0.5 || r(P - a) > 0.5) &&
          (E(w, P, o, a), 'L' === h && (i += 2)),
        (w = o),
        (P = a);
    else if ('A' === h) {
      if (
        ((b = y[i + 4]),
        (v = y[i + 5]),
        (u = y[i + 6]),
        (_ = y[i + 7]),
        (n = 7),
        b.length > 1 &&
          (b.length < 3
            ? ((_ = u), (u = v), n--)
            : ((_ = v), (u = b.substr(2)), (n -= 2)),
          (v = b.charAt(1)),
          (b = b.charAt(0))),
        (f = g(
          w,
          P,
          +y[i + 1],
          +y[i + 2],
          +y[i + 3],
          +b,
          +v,
          (l ? w : 0) + 1 * u,
          (l ? P : 0) + 1 * _
        )),
        (i += n),
        f)
      )
        for (n = 0; n < f.length; n++) c.push(f[n]);
      (w = c[c.length - 2]), (P = c[c.length - 1]);
    } else console.log(S);
  return (
    (i = c.length),
    i < 6
      ? (A.pop(), (i = 0))
      : c[0] === c[i - 2] && c[1] === c[i - 1] && (c.closed = !0),
    (A.totalPoints = C + i),
    A
  );
}
function u(t, e, s, i, n, o, a, h, l, c, d) {
  let g,
    p = (t + s) / 2,
    _ = (e + i) / 2,
    f = (s + n) / 2,
    m = (i + o) / 2,
    b = (n + a) / 2,
    v = (o + h) / 2,
    y = (p + f) / 2,
    A = (_ + m) / 2,
    w = (f + b) / 2,
    P = (m + v) / 2,
    x = (y + w) / 2,
    C = (A + P) / 2,
    S = a - t,
    E = h - e,
    k = r((s - a) * E - (i - h) * S),
    M = r((n - a) * E - (o - h) * S);
  return (
    c || ((c = [t, e, a, h]), (d = 2)),
    c.splice(d || c.length - 2, 0, x, C),
    (k + M) * (k + M) > l * (S * S + E * E) &&
      ((g = c.length),
      u(t, e, p, _, y, A, x, C, l, c, d),
      u(x, C, w, P, b, v, a, h, l, c, d + 2 + (c.length - g))),
    c
  );
}
function _(t, e) {
  r(t[0] - t[2]) < 1e-4 && r(t[1] - t[3]) < 1e-4 && (t = t.slice(2));
  let s,
    i,
    n,
    o,
    l,
    c,
    d,
    g,
    p,
    u,
    _,
    f,
    m,
    b,
    v,
    y = t.length - 2,
    A = +t[0],
    w = +t[1],
    P = +t[2],
    x = +t[3],
    C = [A, w, A, w],
    S = P - A,
    E = x - w,
    k = Math.abs(t[y] - A) < 0.001 && Math.abs(t[y + 1] - w) < 0.001;
  for (
    k &&
      (t.push(P, x),
      (P = A),
      (x = w),
      (A = t[y - 2]),
      (w = t[y - 1]),
      t.unshift(A, w),
      (y += 4)),
      e = e || 0 === e ? +e : 1,
      n = 2;
    n < y;
    n += 2
  )
    (s = A),
      (i = w),
      (A = P),
      (w = x),
      (P = +t[n + 2]),
      (x = +t[n + 3]),
      (A === P && w === x) ||
        ((o = S),
        (l = E),
        (S = P - A),
        (E = x - w),
        (c = a(o * o + l * l)),
        (d = a(S * S + E * E)),
        (g = a((S / d + o / c) ** 2 + (E / d + l / c) ** 2)),
        (p = ((c + d) * e * 0.25) / g),
        (u = A - (A - s) * (c ? p / c : 0)),
        (_ = A + (P - A) * (d ? p / d : 0)),
        (f = A - (u + (((_ - u) * ((3 * c) / (c + d) + 0.5)) / 4 || 0))),
        (m = w - (w - i) * (c ? p / c : 0)),
        (b = w + (x - w) * (d ? p / d : 0)),
        (v = w - (m + (((b - m) * ((3 * c) / (c + d) + 0.5)) / 4 || 0))),
        (A === s && w === i) ||
          C.push(h(u + f), h(m + v), h(A), h(w), h(_ + f), h(b + v)));
  return (
    A !== P || w !== x || C.length < 4
      ? C.push(h(P), h(x), h(P), h(x))
      : (C.length -= 2),
    2 === C.length
      ? C.push(A, w, A, w, A, w)
      : k && (C.splice(0, 6), (C.length = C.length - 6)),
    C
  );
}
function f(t, e, s, i, n, o) {
  let r,
    a = n - s,
    h = o - i;
  return (
    (a || h) &&
      ((r = ((t - s) * a + (e - i) * h) / (a * a + h * h)),
      r > 1 ? ((s = n), (i = o)) : r > 0 && ((s += a * r), (i += h * r))),
    (t - s) ** 2 + (e - i) ** 2
  );
}
function m(t, e) {
  let s,
    i,
    n,
    o,
    r,
    a,
    h,
    l = parseFloat(t[0]),
    c = parseFloat(t[1]),
    d = [l, c],
    g = t.length - 2;
  for (e = (e || 1) ** 2, s = 2; s < g; s += 2)
    (i = parseFloat(t[s])),
      (n = parseFloat(t[s + 1])),
      (o = l - i),
      (r = c - n),
      o * o + r * r > e && (d.push(i, n), (l = i), (c = n));
  return (
    d.push(parseFloat(t[g]), parseFloat(t[g + 1])),
    (h = d.length - 2),
    (a = [d[0], d[1]]),
    (function t(e, s, i, n, o) {
      let r,
        a,
        h,
        l = n,
        c = e[s],
        d = e[s + 1],
        g = e[i],
        p = e[i + 1];
      for (a = s + 2; a < i; a += 2)
        (h = f(e[a], e[a + 1], c, d, g, p)), h > l && ((r = a), (l = h));
      l > n &&
        (r - s > 2 && t(e, s, r, n, o),
        o.push(e[r], e[r + 1]),
        i - r > 2 && t(e, r, i, n, o));
    })(d, 0, h, e, a),
    a.push(d[h], d[h + 1]),
    a
  );
}
function b(e, s, i, n, o, r, a, h, l, c, d, g, p, u) {
  let _,
    f,
    m,
    v,
    y,
    A,
    w = (o - n) / r,
    P = 0,
    x = n;
  for (t = 1e8; x <= o; )
    (A = 1 - x),
      (_ =
        A * A * A * a + 3 * A * A * x * l + 3 * A * x * x * d + x * x * x * p),
      (f =
        A * A * A * h + 3 * A * A * x * c + 3 * A * x * x * g + x * x * x * u),
      (v = _ - s),
      (y = f - i),
      (m = v * v + y * y),
      m < t && ((t = m), (P = x)),
      (x += w);
  return e > 1
    ? b(
        e - 1,
        s,
        i,
        Math.max(P - w, 0),
        Math.min(P + w, 1),
        r,
        a,
        h,
        l,
        c,
        d,
        g,
        p,
        u
      )
    : P;
}
let v,
  y,
  A,
  w,
  P,
  x,
  C,
  S,
  E,
  k = 'transform',
  M = k + 'Origin',
  D = (t) => {
    let e = t.ownerDocument || t;
    !(k in t.style) &&
      'msTransform' in t.style &&
      ((k = 'msTransform'), (M = k + 'Origin'));
    for (; e.parentNode && (e = e.parentNode); );
    if (((y = window), (C = new I()), e)) {
      (v = e),
        (A = e.documentElement),
        (w = e.body),
        (S = v.createElementNS('http://www.w3.org/2000/svg', 'g')),
        (S.style.transform = 'none');
      let t = e.createElement('div'),
        s = e.createElement('div'),
        i = e && (e.body || e.firstElementChild);
      i &&
        i.appendChild &&
        (i.appendChild(t),
        t.appendChild(s),
        t.setAttribute(
          'style',
          'position:static;transform:translate3d(0,0,1px)'
        ),
        (E = s.offsetParent !== t),
        i.removeChild(t));
    }
    return e;
  },
  T = [],
  H = [],
  N = (t) =>
    t.ownerSVGElement || ('svg' === (t.tagName + '').toLowerCase() ? t : null),
  R = (t) =>
    'fixed' === y.getComputedStyle(t).position ||
    ((t = t.parentNode) && 1 === t.nodeType ? R(t) : void 0),
  L = (t, e) => {
    if (t.parentNode && (v || D(t))) {
      let s = N(t),
        i = s
          ? s.getAttribute('xmlns') || 'http://www.w3.org/2000/svg'
          : 'http://www.w3.org/1999/xhtml',
        n = s ? (e ? 'rect' : 'g') : 'div',
        o = 2 !== e ? 0 : 100,
        r = 3 === e ? 100 : 0,
        a =
          'position:absolute;display:block;pointer-events:none;margin:0;padding:0;',
        h = v.createElementNS
          ? v.createElementNS(i.replace(/^https/, 'http'), n)
          : v.createElement(n);
      return (
        e &&
          (s
            ? (x || (x = L(t)),
              h.setAttribute('width', 0.01),
              h.setAttribute('height', 0.01),
              h.setAttribute('transform', 'translate(' + o + ',' + r + ')'),
              x.appendChild(h))
            : (P || ((P = L(t)), (P.style.cssText = a)),
              (h.style.cssText =
                a +
                'width:0.1px;height:0.1px;top:' +
                r +
                'px;left:' +
                o +
                'px'),
              P.appendChild(h))),
        h
      );
    }
    throw 'Need document and parent.';
  },
  X = (t, e) => {
    let s,
      i,
      n,
      o,
      r,
      a,
      h = N(t),
      l = t === h,
      c = h ? T : H,
      d = t.parentNode;
    if (t === y) return t;
    if ((c.length || c.push(L(t, 1), L(t, 2), L(t, 3)), (s = h ? x : P), h))
      l
        ? ((n = ((t) => {
            let e,
              s = t.getCTM();
            return (
              s ||
                ((e = t.style[k]),
                (t.style[k] = 'none'),
                t.appendChild(S),
                (s = S.getCTM()),
                t.removeChild(S),
                e
                  ? (t.style[k] = e)
                  : t.style.removeProperty(
                      k.replace(/([A-Z])/g, '-$1').toLowerCase()
                    )),
              s || C.clone()
            );
          })(t)),
          (o = -n.e / n.a),
          (r = -n.f / n.d),
          (i = C))
        : t.getBBox
        ? ((n = t.getBBox()),
          (i = t.transform ? t.transform.baseVal : {}),
          (i = i.numberOfItems
            ? i.numberOfItems > 1
              ? ((t) => {
                  let e = new I(),
                    s = 0;
                  for (; s < t.numberOfItems; s++)
                    e.multiply(t.getItem(s).matrix);
                  return e;
                })(i)
              : i.getItem(0).matrix
            : C),
          (o = i.a * n.x + i.c * n.y),
          (r = i.b * n.x + i.d * n.y))
        : ((i = new I()), (o = r = 0)),
        e && 'g' === t.tagName.toLowerCase() && (o = r = 0),
        (l ? h : d).appendChild(s),
        s.setAttribute(
          'transform',
          'matrix(' +
            i.a +
            ',' +
            i.b +
            ',' +
            i.c +
            ',' +
            i.d +
            ',' +
            (i.e + o) +
            ',' +
            (i.f + r) +
            ')'
        );
    else {
      if (((o = r = 0), E))
        for (
          i = t.offsetParent, n = t;
          n && (n = n.parentNode) && n !== i && n.parentNode;

        )
          (y.getComputedStyle(n)[k] + '').length > 4 &&
            ((o = n.offsetLeft), (r = n.offsetTop), (n = 0));
      if (
        ((a = y.getComputedStyle(t)),
        'absolute' !== a.position && 'fixed' !== a.position)
      )
        for (i = t.offsetParent; d && d !== i; )
          (o += d.scrollLeft || 0), (r += d.scrollTop || 0), (d = d.parentNode);
      (n = s.style),
        (n.top = t.offsetTop - r + 'px'),
        (n.left = t.offsetLeft - o + 'px'),
        (n[k] = a[k]),
        (n[M] = a[M]),
        (n.position = 'fixed' === a.position ? 'fixed' : 'absolute'),
        t.parentNode.appendChild(s);
    }
    return s;
  },
  O = (t, e, s, i, n, o, r) => (
    (t.a = e), (t.b = s), (t.c = i), (t.d = n), (t.e = o), (t.f = r), t
  );
class I {
  constructor(t = 1, e = 0, s = 0, i = 1, n = 0, o = 0) {
    O(this, t, e, s, i, n, o);
  }
  inverse() {
    let { a: t, b: e, c: s, d: i, e: n, f: o } = this,
      r = t * i - e * s || 1e-10;
    return O(
      this,
      i / r,
      -e / r,
      -s / r,
      t / r,
      (s * o - i * n) / r,
      -(t * o - e * n) / r
    );
  }
  multiply(t) {
    let { a: e, b: s, c: i, d: n, e: o, f: r } = this,
      a = t.a,
      h = t.c,
      l = t.b,
      c = t.d,
      d = t.e,
      g = t.f;
    return O(
      this,
      a * e + l * i,
      a * s + l * n,
      h * e + c * i,
      h * s + c * n,
      o + d * e + g * i,
      r + d * s + g * n
    );
  }
  clone() {
    return new I(this.a, this.b, this.c, this.d, this.e, this.f);
  }
  equals(t) {
    let { a: e, b: s, c: i, d: n, e: o, f: r } = this;
    return (
      e === t.a && s === t.b && i === t.c && n === t.d && o === t.e && r === t.f
    );
  }
  apply(t, e = {}) {
    let { x: s, y: i } = t,
      { a: n, b: o, c: r, d: a, e: h, f: l } = this;
    return (e.x = s * n + i * r + h || 0), (e.y = s * o + i * a + l || 0), e;
  }
}
function q(t, e, s, i) {
  if (!t || !t.parentNode || (v || D(t)).documentElement === t) return new I();
  let n = ((t) => {
      let e, s;
      for (; t && t !== w; )
        (s = t._gsap),
          s && s.uncache && s.get(t, 'x'),
          s &&
            !s.scaleX &&
            !s.scaleY &&
            s.renderTransform &&
            ((s.scaleX = s.scaleY = 1e-4),
            s.renderTransform(1, s),
            e ? e.push(s) : (e = [s])),
          (t = t.parentNode);
      return e;
    })(t),
    o = N(t) ? T : H,
    r = X(t, s),
    a = o[0].getBoundingClientRect(),
    h = o[1].getBoundingClientRect(),
    l = o[2].getBoundingClientRect(),
    c = r.parentNode,
    d = !i && R(t),
    g = new I(
      (h.left - a.left) / 100,
      (h.top - a.top) / 100,
      (l.left - a.left) / 100,
      (l.top - a.top) / 100,
      a.left +
        (d
          ? 0
          : y.pageXOffset || v.scrollLeft || A.scrollLeft || w.scrollLeft || 0),
      a.top +
        (d
          ? 0
          : y.pageYOffset || v.scrollTop || A.scrollTop || w.scrollTop || 0)
    );
  if ((c.removeChild(r), n))
    for (a = n.length; a--; )
      (h = n[a]), (h.scaleX = h.scaleY = 0), h.renderTransform(1, h);
  return e ? g.inverse() : g;
}
let Y,
  V,
  j,
  z,
  G,
  W,
  B,
  F,
  U,
  Z,
  $,
  K,
  Q,
  J,
  tt,
  et = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
  st = Math.PI / 180,
  it = Date.now || (() => new Date().getTime()),
  nt = 0,
  ot = 0,
  rt = () => !1,
  at = {},
  ht = [],
  lt = {},
  ct = [],
  dt = [],
  gt = (t) => {
    t.preventDefault &&
      (t.preventDefault(), t.preventManipulation && t.preventManipulation());
  },
  pt = (t) =>
    Y.createElementNS
      ? Y.createElementNS('http://www.w3.org/1999/xhtml', t)
      : Y.createElement(t),
  ut = (t, e, s) => {
    let i,
      n = Y.createElementNS('http://www.w3.org/2000/svg', t),
      o = /([a-z])([A-Z])/g;
    for (i in (((s = s || {}).class = s.class || 'path-editor'), s))
      void 0 !== n.style[i]
        ? (n.style[i] = s[i])
        : n.setAttributeNS(null, i.replace(o, '$1-$2').toLowerCase(), s[i]);
    return e.appendChild(n), n;
  },
  _t = { matrix: new I() },
  ft = (t) => ((t.transform && t.transform.baseVal.consolidate()) || _t).matrix,
  mt = (t) => ~~(1e3 * t + (t < 0 ? -0.5 : 0.5)) / 1e3,
  bt = function (t) {
    if (!t.target._gsSelection && !ot && it() - nt > 100) {
      let t = dt.length;
      for (; --t > -1; ) dt[t].deselect();
      dt.length = 0;
    }
  },
  vt = 0,
  yt = (t, e, s, i) => {
    if (t.addEventListener) {
      let n = Q[e];
      (i = i || { passive: !1 }),
        t.addEventListener(n || e, s, i),
        n &&
          e !== n &&
          'pointer' !== n.substr(0, 7) &&
          t.addEventListener(e, s, i);
    } else t.attachEvent && t.attachEvent('on' + e, s);
  },
  At = (t, e, s) => {
    if (t.removeEventListener) {
      let i = Q[e];
      t.removeEventListener(i || e, s),
        i &&
          e !== i &&
          'pointer' !== i.substr(0, 7) &&
          t.removeEventListener(e, s);
    } else t.detachEvent && t.detachEvent('on' + e, s);
  },
  wt = (t) => {
    (vt = t.touches && _dragCount < t.touches.length),
      At(t.target, 'touchend', wt);
  },
  Pt = (t) => {
    (vt = t.touches && _dragCount < t.touches.length),
      yt(t.target, 'touchend', wt);
  },
  xt = (t, e) => (s) => t.call(e, s),
  Ct = (t, e, s) => {
    let i = e.vars[t];
    return i && i.call(e.vars.callbackScope || e, s || e), e;
  },
  St = () => {
    (J.style.display = 'block'), J.select(), (J.style.display = 'none');
  },
  Et = (t) => {
    (Y = document),
      (j = window),
      (z = Y.body),
      (G =
        G ||
        t ||
        j.gsap ||
        console.warn('Please gsap.registerPlugin(PathEditor)')),
      (W = (G && G.core.context) || function () {}),
      (K = pt('div')),
      (J = pt('textarea')),
      (J.style.display = 'none'),
      z && z.appendChild(J),
      (Q = (function (t) {
        let e = t.split(','),
          s = (
            void 0 !== K.onpointerdown
              ? 'pointerdown,pointermove,pointerup,pointercancel'
              : void 0 !== K.onmspointerdown
              ? 'MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel'
              : t
          ).split(','),
          i = {},
          n = 4;
        for (; --n > -1; ) (i[e[n]] = s[n]), (i[s[n]] = e[n]);
        return i;
      })('touchstart,touchmove,touchend,touchcancel')),
      (SVGElement.prototype.getTransformToElement =
        SVGElement.prototype.getTransformToElement ||
        function (t) {
          return t.getScreenCTM().inverse().multiply(this.getScreenCTM());
        }),
      Y.addEventListener(
        'keydown',
        function (t) {
          let e,
            s,
            i,
            n,
            o = t.keyCode || t.which,
            r = t.key || o;
          if ('Shift' === r || 16 === o) U = !0;
          else if ('Control' === r || 17 === o) B = !0;
          else if ('Meta' === r || 91 === o) Z = !0;
          else if ('Alt' === r || 18 === o)
            for (F = !0, e = dt.length; --e > -1; ) dt[e]._onPressAlt();
          else if (('z' === r || 90 === o) && (B || Z) && ht.length > 1) {
            if ((ht.shift(), (s = ht[0]), s)) {
              for (
                n = s.path,
                  n.path.setAttribute('d', s.d),
                  n.path.setAttribute('transform', s.transform),
                  n.init(),
                  i = n._anchors,
                  e = 0;
                e < i.length;
                e++
              )
                -1 !== s.selectedIndexes.indexOf(i[e].i) &&
                  n._selectedAnchors.push(i[e]);
              n._updateAnchors(),
                n.update(),
                n.vars.onUndo && n.vars.onUndo.call(n);
            }
          } else if (
            'Delete' === r ||
            'Backspace' === r ||
            8 === o ||
            46 === o ||
            63272 === o ||
            ('d' === o && (B || Z))
          )
            for (e = dt.length; --e > -1; ) dt[e]._deleteSelectedAnchors();
          else if (('a' === r || 65 === o) && (Z || B))
            for (e = dt.length; --e > -1; ) dt[e].select(!0);
        },
        !0
      ),
      Y.addEventListener(
        'keyup',
        function (t) {
          let e = t.key || t.keyCode || t.which;
          if ('Shift' === e || 16 === e) U = !1;
          else if ('Control' === e || 17 === e) B = !1;
          else if ('Meta' === e || 91 === e) Z = !1;
          else if ('Alt' === e || 18 === e) {
            F = !1;
            let t = dt.length;
            for (; --t > -1; ) dt[t]._onReleaseAlt();
          }
        },
        !0
      ),
      (V = !!j.PointerEvent),
      yt(Y, 'mouseup', bt),
      yt(Y, 'touchend', bt),
      yt(Y, 'touchcancel', rt),
      yt(j, 'touchmove', rt),
      z && z.addEventListener('touchstart', rt),
      (tt = 1);
  },
  kt = function (t) {
    let e,
      s,
      i = this,
      n = q(i.target.parentNode, !0);
    (this._matrix = this.target.transform.baseVal.getItem(0).matrix),
      (this._ctm = n),
      Q[t.type]
        ? ((e =
            -1 !== t.type.indexOf('touch') ? t.currentTarget || t.target : Y),
          yt(e, 'touchend', i._onRelease),
          yt(e, 'touchmove', i._onMove),
          yt(e, 'touchcancel', i._onRelease),
          yt(Y, 'touchstart', Pt),
          yt(j, 'touchforcechange', gt))
        : ((e = null), yt(Y, 'mousemove', i._onMove)),
      V || yt(Y, 'mouseup', i._onRelease),
      gt(t),
      St(),
      t.changedTouches
        ? ((t = i.touch = t.changedTouches[0]), (i.touchID = t.identifier))
        : t.pointerId
        ? (i.touchID = t.pointerId)
        : (i.touch = i.touchID = null),
      (i._startPointerY = i.pointerY = t.pageY),
      (i._startPointerX = i.pointerX = t.pageX),
      (i._startElementX = i._matrix.e),
      (i._startElementY = i._matrix.f),
      1 === this._ctm.a &&
      0 === this._ctm.b &&
      0 === this._ctm.c &&
      1 === this._ctm.d
        ? (this._ctm = null)
        : ((s =
            i._startPointerX * this._ctm.a +
            i._startPointerY * this._ctm.c +
            this._ctm.e),
          (i._startPointerY =
            i._startPointerX * this._ctm.b +
            i._startPointerY * this._ctm.d +
            this._ctm.f),
          (i._startPointerX = s)),
      (i.isPressed = ot = !0),
      (i.touchEventTarget = e),
      i.vars.onPress &&
        i.vars.onPress.call(i.vars.callbackScope || i, i.pointerEvent);
  },
  Mt = function (t) {
    let e,
      s,
      i = this,
      n = t;
    if (i._enabled && !vt && i.isPressed && t) {
      if (((i.pointerEvent = t), (e = t.changedTouches), e)) {
        if ((t = e[0]) !== i.touch && t.identifier !== i.touchID) {
          for (s = e.length; --s > -1 && (t = e[s]).identifier !== i.touchID; );
          if (s < 0) return;
        }
      } else if (t.pointerId && i.touchID && t.pointerId !== i.touchID) return;
      gt(n),
        i.setPointerPosition(t.pageX, t.pageY),
        i.vars.onDrag &&
          i.vars.onDrag.call(i.vars.callbackScope || i, i.pointerEvent);
    }
  },
  Dt = function (t, e) {
    let s = this;
    if (
      !s._enabled ||
      !s.isPressed ||
      (t &&
        null != s.touchID &&
        !e &&
        ((t.pointerId && t.pointerId !== s.touchID) ||
          (t.changedTouches &&
            !((t, e) => {
              let s = t.length;
              for (; --s > -1; ) if (t[s].identifier === e) return !0;
              return !1;
            })(t.changedTouches, s.touchID))))
    )
      return;
    (nt = it()), (s.isPressed = ot = !1);
    let i,
      n,
      o = t,
      r = s.isDragging,
      a = s.touchEventTarget;
    if (
      (a
        ? (At(a, 'touchend', s._onRelease),
          At(a, 'touchmove', s._onMove),
          At(a, 'touchcancel', s._onRelease),
          At(Y, 'touchstart', Pt))
        : At(Y, 'mousemove', s._onMove),
      V ||
        (At(Y, 'mouseup', s._onRelease),
        t && t.target && At(t.target, 'mouseup', s._onRelease)),
      r
        ? (s.isDragging = !1)
        : s.vars.onClick && s.vars.onClick.call(s.vars.callbackScope || s, o),
      t)
    ) {
      if (
        ((i = t.changedTouches),
        i && (t = i[0]) !== s.touch && t.identifier !== s.touchID)
      ) {
        for (n = i.length; --n > -1 && (t = i[n]).identifier !== s.touchID; );
        if (n < 0) return;
      }
      (s.pointerEvent = o), (s.pointerX = t.pageX), (s.pointerY = t.pageY);
    }
    return (
      o && !r && s.vars.onDragRelease
        ? s.vars.onDragRelease.call(s, s.pointerEvent)
        : (o && gt(o),
          s.vars.onRelease &&
            s.vars.onRelease.call(s.vars.callbackScope || s, s.pointerEvent)),
      r &&
        s.vars.onDragEnd &&
        s.vars.onDragEnd.call(s.vars.callbackScope || s, s.pointerEvent),
      !0
    );
  },
  Tt = (t, e, s, i) => {
    let n,
      o = t[e],
      r = o.length - (o.closed ? 6 : 0),
      a = [];
    for (n = 0; n < r; n += 6) a.push(new Rt(s, t, e, n, i));
    return o.closed && (a[0].isClosedStart = !0), a;
  },
  Ht = (t, e, s) => {
    let i = t[s] - t[e],
      n = t[s + 1] - t[e + 1];
    return Math.sqrt(i * i + n * n);
  };
class Nt {
  constructor(t, e) {
    (this.target = 'string' == typeof t ? Y.querySelectorAll(t)[0] : t),
      (this.vars = e || {}),
      (this._onPress = xt(kt, this)),
      (this._onMove = xt(Mt, this)),
      (this._onRelease = xt(Dt, this)),
      this.target.setAttribute(
        'transform',
        (this.target.getAttribute('transform') || '') + ' translate(0,0)'
      ),
      (this._matrix = ft(this.target)),
      (this.x = this._matrix.e),
      (this.y = this._matrix.f),
      (this.snap = e.snap),
      isNaN(e.maxX) && isNaN(e.minX)
        ? (this._bounds = 0)
        : ((this._bounds = 1), (this.maxX = +e.maxX), (this.minX = +e.minX)),
      this.enabled(!0);
  }
  setPointerPosition(t, e) {
    let s, i, n, o, r;
    (this.pointerX = t),
      (this.pointerY = e),
      this._ctm &&
        ((r = t * this._ctm.a + e * this._ctm.c + this._ctm.e),
        (e = t * this._ctm.b + e * this._ctm.d + this._ctm.f),
        (t = r)),
      (i = e - this._startPointerY),
      (s = t - this._startPointerX),
      i < 1 && i > -1 && (i = 0),
      s < 1 && s > -1 && (s = 0),
      (n = ((1e3 * (this._startElementX + s)) | 0) / 1e3),
      (o = ((1e3 * (this._startElementY + i)) | 0) / 1e3),
      this.snap &&
        !U &&
        ((lt.x = n),
        (lt.y = o),
        this.snap.call(this, lt),
        (n = lt.x),
        (o = lt.y)),
      (this.x === n && this.y === o) ||
        ((this._matrix.f = this.y = o),
        (this._matrix.e = this.x = n),
        !this.isDragging &&
          this.isPressed &&
          ((this.isDragging = !0), Ct('onDragStart', this, this.pointerEvent)));
  }
  enabled(t) {
    if (!arguments.length) return this._enabled;
    let e;
    return (
      (this._enabled = t),
      t
        ? (V || yt(this.target, 'mousedown', this._onPress),
          yt(this.target, 'touchstart', this._onPress),
          yt(this.target, 'click', this._onClick, !0))
        : ((e = this.isDragging),
          At(this.target, 'mousedown', this._onPress),
          At(this.target, 'touchstart', this._onPress),
          At(j, 'touchforcechange', gt),
          At(this.target, 'click', this._onClick),
          this.touchEventTarget &&
            (At(this.touchEventTarget, 'touchcancel', this._onRelease),
            At(this.touchEventTarget, 'touchend', this._onRelease),
            At(this.touchEventTarget, 'touchmove', this._onMove)),
          At(Y, 'mouseup', this._onRelease),
          At(Y, 'mousemove', this._onMove),
          (this.isDragging = this.isPressed = !1),
          e && Ct('onDragEnd', this, this.pointerEvent)),
      this
    );
  }
  endDrag(t) {
    this._onRelease(t);
  }
}
class Rt {
  constructor(t, e, s, i, n) {
    (this.editor = t),
      (this.element = ut('path', t._selection, {
        fill: '#4e7fff',
        stroke: '#4e7fff',
        strokeWidth: 2,
        vectorEffect: 'non-scaling-stroke',
      })),
      this.update(e, s, i),
      (this.element._gsSelection = !0),
      (this.vars = n || {}),
      (this._draggable = new Nt(this.element, {
        callbackScope: this,
        onDrag: this.onDrag,
        snap: this.vars.snap,
        onPress: this.onPress,
        onRelease: this.onRelease,
        onClick: this.onClick,
        onDragEnd: this.onDragEnd,
      }));
  }
  onPress() {
    Ct('onPress', this);
  }
  onClick() {
    Ct('onClick', this);
  }
  onDrag() {
    let t = this.segment;
    this.vars.onDrag.call(
      this.vars.callbackScope || this,
      this,
      this._draggable.x - t[this.i],
      this._draggable.y - t[this.i + 1]
    );
  }
  onDragEnd() {
    Ct('onDragEnd', this);
  }
  onRelease() {
    Ct('onRelease', this);
  }
  update(t, e, s) {
    t && (this.rawPath = t),
      arguments.length <= 1
        ? ((e = this.j), (s = this.i))
        : ((this.j = e), (this.i = s));
    let i = this.smooth,
      n = this.rawPath[e],
      o = 0 === s && n.closed ? n.length - 4 : s - 2;
    (this.segment = n),
      (this.smooth =
        s > 0 &&
        s < n.length - 2 &&
        Math.abs(
          Math.atan2(n[s + 1] - n[o + 1], n[s] - n[o]) -
            Math.atan2(n[s + 3] - n[s + 1], n[s + 2] - n[s])
        ) < 0.09
          ? 2
          : 0),
      this.smooth !== i &&
        this.element.setAttribute(
          'd',
          this.smooth ? this.editor._circleHandle : this.editor._squareHandle
        ),
      this.element.setAttribute(
        'transform',
        'translate(' + n[s] + ',' + n[s + 1] + ')'
      );
  }
}
class Lt {
  constructor(t, e) {
    (e = e || {}),
      tt || Et(),
      (this.vars = e),
      (this.path = 'string' == typeof t ? Y.querySelectorAll(t)[0] : t),
      (this._g = ut('g', this.path.ownerSVGElement, {
        class: 'path-editor-g path-editor',
      })),
      (this._selectionHittest = ut('path', this._g, {
        stroke: 'transparent',
        strokeWidth: 16,
        fill: 'none',
        vectorEffect: 'non-scaling-stroke',
      })),
      (this._selection =
        e._selection ||
        ut('g', this._g, { class: 'path-editor-selection path-editor' })),
      (this._selectionPath = ut('path', this._selection, {
        stroke: '#4e7fff',
        strokeWidth: 2,
        fill: 'none',
        vectorEffect: 'non-scaling-stroke',
      })),
      (this._selectedAnchors = []),
      (this._line1 = ut('polyline', this._selection, {
        stroke: '#4e7fff',
        strokeWidth: 2,
        vectorEffect: 'non-scaling-stroke',
      })),
      (this._line2 = ut('polyline', this._selection, {
        stroke: '#4e7fff',
        strokeWidth: 2,
        vectorEffect: 'non-scaling-stroke',
      })),
      (this._line1.style.pointerEvents =
        this._line2.style.pointerEvents =
        this._selectionPath.style.pointerEvents =
          'none'),
      (this._enabled = !0);
    let s = this.path.parentNode.getScreenCTM().inverse(),
      i = ((s.a + s.d) / 2) * (e.handleSize || 5);
    (this._squareHandle = ((t) =>
      ['M-' + (t = mt(t)), -t, t, -t, t, t, -t, t + 'z'].join(','))(i)),
      (this._circleHandle = ((t) => {
        let e = mt(0.552284749831 * t);
        return (
          'M' +
          (t = mt(t)) +
          ',0C' +
          [
            t,
            e,
            e,
            t,
            0,
            t,
            -e,
            t,
            -t,
            e,
            -t,
            0,
            -t,
            -e,
            -e,
            -t,
            0,
            -t,
            e,
            -t,
            t,
            -e,
            t,
            0,
          ].join(',') +
          'z'
        );
      })(1.15 * i)),
      (this._handle1 = ut('path', this._selection, {
        d: this._squareHandle,
        fill: '#4e7fff',
        stroke: 'transparent',
        strokeWidth: 6,
      })),
      (this._handle2 = ut('path', this._selection, {
        d: this._squareHandle,
        fill: '#4e7fff',
        stroke: 'transparent',
        strokeWidth: 6,
      })),
      (this._handle1._draggable = new Nt(this._handle1, {
        onDrag: this._onDragHandle1,
        callbackScope: this,
        onPress: this._onPressHandle1,
        onRelease: this._onReleaseHandle,
        onClick: this._onClickHandle1,
        snap: e.handleSnap,
      })),
      (this._handle2._draggable = new Nt(this._handle2, {
        onDrag: this._onDragHandle2,
        callbackScope: this,
        onPress: this._onPressHandle2,
        onRelease: this._onReleaseHandle,
        onClick: this._onClickHandle2,
        snap: e.handleSnap,
      })),
      (this._handle1.style.visibility = this._handle2.style.visibility =
        'hidden');
    let n = [
        this._handle1,
        this._handle2,
        this._line1,
        this._line2,
        this._selection,
        this._selectionPath,
        this._selectionHittest,
      ],
      o = n.length;
    for (; --o > -1; ) n[o]._gsSelection = !0;
    !1 !== e.draggable &&
      (this._draggable = new Nt(this._selectionHittest, {
        callbackScope: this,
        onPress: this.select,
        onRelease: this._onRelease,
        onDrag: this._onDragPath,
        onDragEnd: this._saveState,
        maxX: this.vars.maxX,
        minX: this.vars.minX,
      })),
      this.init(),
      (this._selection.style.visibility =
        !1 === e.selected ? 'hidden' : 'visible'),
      !1 !== e.selected && ((this.path._gsSelection = !0), dt.push(this)),
      this._saveState(),
      V ||
        (yt(
          this._selectionHittest,
          'mousedown',
          xt(this._onClickSelectionPath, this)
        ),
        yt(this._selectionHittest, 'mouseup', xt(this._onRelease, this))),
      yt(
        this._selectionHittest,
        'touchstart',
        xt(this._onClickSelectionPath, this)
      ),
      yt(this._selectionHittest, 'touchend', xt(this._onRelease, this)),
      W(this);
  }
  _onRelease(t) {
    let e = this._editingAnchor;
    e && ((at.x = e.segment[e.i]), (at.y = e.segment[e.i + 1])),
      At(j, 'touchforcechange', gt),
      Ct('onRelease', this, t);
  }
  init() {
    let t,
      e,
      s = this.path.getAttribute('d'),
      i = p(s),
      n = this.path.getAttribute('transform') || 'translate(0,0)',
      o =
        !this._rawPath ||
        i.totalPoints !== this._rawPath.totalPoints ||
        i.length !== this._rawPath.length,
      r = {
        callbackScope: this,
        snap: this.vars.anchorSnap,
        onDrag: this._onDragAnchor,
        onPress: this._onPressAnchor,
        onRelease: this._onRelease,
        onClick: this._onClickAnchor,
        onDragEnd: this._onDragEndAnchor,
        maxX: this.vars.maxX,
        minX: this.vars.minX,
      };
    if (o && this._anchors && this._anchors.length) {
      for (e = 0; e < this._anchors.length; e++)
        this._anchors[e].element.parentNode.removeChild(
          this._anchors[e].element
        ),
          this._anchors[e]._draggable.enabled(!1);
      this._selectedAnchors.length = 0;
    }
    if (((this._rawPath = i), o)) {
      if (((this._anchors = Tt(i, 0, this, r)), (t = i.length), t > 1))
        for (e = 1; e < t; e++)
          this._anchors = this._anchors.concat(Tt(i, e, this, r));
    } else
      for (e = this._anchors.length; --e > -1; ) this._anchors[e].update(i);
    return (
      this._selection.appendChild(this._handle1),
      this._selection.appendChild(this._handle2),
      this._selectionPath.setAttribute('d', s),
      this._selectionHittest.setAttribute('d', s),
      this._g.setAttribute(
        'transform',
        ((t) => {
          let e = ft(t),
            s = t.ownerSVGElement;
          for (; (t = t.parentNode) && t.ownerSVGElement === s; )
            e.multiply(ft(t));
          return (
            'matrix(' +
            e.a +
            ',' +
            e.b +
            ',' +
            e.c +
            ',' +
            e.d +
            ',' +
            e.e +
            ',' +
            e.f +
            ')'
          );
        })(this.path.parentNode) || 'translate(0,0)'
      ),
      this._selection.setAttribute('transform', n),
      this._selectionHittest.setAttribute('transform', n),
      this._updateAnchors(),
      this
    );
  }
  _saveState() {
    ((t) => {
      let e,
        s = [],
        i = t._selectedAnchors;
      for (e = 0; e < i.length; e++) s[e] = i[e].i;
      ht.unshift({
        path: t,
        d: t.path.getAttribute('d'),
        transform: t.path.getAttribute('transform') || '',
        selectedIndexes: s,
      }),
        ht.length > 30 && (ht.length = 30);
    })(this);
  }
  _onClickSelectionPath(e) {
    if ('hidden' === this._selection.style.visibility) this.select();
    else if (F || (e && e.altKey)) {
      let s,
        i,
        n,
        o,
        r,
        a,
        l = {
          callbackScope: this,
          snap: this.vars.anchorSnap,
          onDrag: this._onDragAnchor,
          onPress: this._onPressAnchor,
          onRelease: this._onRelease,
          onClick: this._onClickAnchor,
          onDragEnd: this._onDragEndAnchor,
          maxX: this.vars.maxX,
          minX: this.vars.minX,
        },
        c = this._selection.getScreenCTM().inverse();
      for (
        this._draggable && this._draggable._onRelease(e),
          c &&
            ((o = e.clientX * c.a + e.clientY * c.c + c.e),
            (r = e.clientX * c.b + e.clientY * c.d + c.f)),
          a = (function (e, s, i, n) {
            let o,
              r,
              a,
              h,
              l = { j: 0, i: 0, t: 0 },
              c = 1e8;
            for (r = 0; r < e.length; r++)
              for (h = e[r], o = 0; o < h.length; o += 6)
                (a = b(
                  1,
                  s,
                  i,
                  0,
                  1,
                  n || 20,
                  h[o],
                  h[o + 1],
                  h[o + 2],
                  h[o + 3],
                  h[o + 4],
                  h[o + 5],
                  h[o + 6],
                  h[o + 7]
                )),
                  c > t && ((c = t), (l.j = r), (l.i = o), (l.t = a));
            return l;
          })(this._rawPath, o, r),
          (function (t, e, s) {
            if (s <= 0 || s >= 1) return 0;
            let i = t[e],
              n = t[e + 1],
              o = t[e + 2],
              r = t[e + 3],
              a = t[e + 4],
              l = t[e + 5],
              c = i + (o - i) * s,
              d = o + (a - o) * s,
              g = n + (r - n) * s,
              p = r + (l - r) * s,
              u = c + (d - c) * s,
              _ = g + (p - g) * s,
              f = a + (t[e + 6] - a) * s,
              m = l + (t[e + 7] - l) * s;
            (d += (f - d) * s),
              (p += (m - p) * s),
              t.splice(
                e + 2,
                4,
                h(c),
                h(g),
                h(u),
                h(_),
                h(u + (d - u) * s),
                h(_ + (p - _) * s),
                h(d),
                h(p),
                h(f),
                h(m)
              ),
              t.samples &&
                t.samples.splice(
                  ((e / 6) * t.resolution) | 0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                );
          })(this._rawPath[a.j], a.i, a.t),
          s = a.i + 6,
          i = 0;
        i < this._anchors.length;
        i++
      )
        this._anchors[i].i >= s && (this._anchors[i].i += 6);
      (n = new Rt(this, this._rawPath, a.j, s, l)),
        this._selection.appendChild(this._handle1),
        this._selection.appendChild(this._handle2),
        n._draggable._onPress(e),
        ($ = n),
        this._anchors.push(n),
        (this._selectedAnchors.length = 0),
        this._selectedAnchors.push(n),
        this._updateAnchors(),
        this.update(),
        this._saveState();
    }
    St(), yt(j, 'touchforcechange', gt), Ct('onPress', this);
  }
  _onClickHandle1() {
    let t = this._editingAnchor,
      e = t.i,
      s = t.segment,
      i = t.isClosedStart ? s.length - 4 : e - 2;
    F &&
      Math.abs(s[e] - s[i]) < 5 &&
      Math.abs(s[e + 1] - s[i + 1]) < 5 &&
      this._onClickAnchor(t);
  }
  _onClickHandle2() {
    let t = this._editingAnchor,
      e = t.i,
      s = t.segment;
    F &&
      Math.abs(s[e] - s[e + 2]) < 5 &&
      Math.abs(s[e + 1] - s[e + 3]) < 5 &&
      this._onClickAnchor(t);
  }
  _onDragEndAnchor(t) {
    ($ = null), this._saveState();
  }
  isSelected() {
    return (
      this._selectedAnchors.length > 0 ||
      'visible' === this._selection.style.visibility
    );
  }
  select(t) {
    if (
      ((this._selection.style.visibility = 'visible'),
      (this._editingAnchor = null),
      (this.path._gsSelection = !0),
      !0 === t)
    ) {
      let t = this._anchors.length;
      for (; --t > -1; ) this._selectedAnchors[t] = this._anchors[t];
    }
    return (
      -1 === dt.indexOf(this) && dt.push(this), this._updateAnchors(), this
    );
  }
  deselect() {
    return (
      (this._selection.style.visibility = 'hidden'),
      (this._selectedAnchors.length = 0),
      (this._editingAnchor = null),
      (this.path._gsSelection = !1),
      dt.splice(dt.indexOf(this), 1),
      this._updateAnchors(),
      this
    );
  }
  _onDragPath(t) {
    let e =
      this._selectionHittest.getAttribute('transform') || 'translate(0,0)';
    this._selection.setAttribute('transform', e),
      this.path.setAttribute('transform', e);
  }
  _onPressAnchor(t) {
    -1 === this._selectedAnchors.indexOf(t)
      ? (U || (this._selectedAnchors.length = 0), this._selectedAnchors.push(t))
      : U &&
        (this._selectedAnchors.splice(this._selectedAnchors.indexOf(t), 1),
        t._draggable.endDrag()),
      (at.x = t.segment[t.i]),
      (at.y = t.segment[t.i + 1]),
      this._updateAnchors(),
      Ct('onPress', this);
  }
  _deleteSelectedAnchors() {
    let t,
      e,
      s,
      i = this._selectedAnchors,
      n = i.length;
    for (; --n > -1; )
      for (
        t = i[n],
          t.element.parentNode.removeChild(t.element),
          t._draggable.enabled(!1),
          e = t.i,
          e
            ? e < t.segment.length - 2
              ? t.segment.splice(e - 2, 6)
              : t.segment.splice(e - 4, 6)
            : t.segment.splice(e, 6),
          i.splice(n, 1),
          this._anchors.splice(this._anchors.indexOf(t), 1),
          s = 0;
        s < this._anchors.length;
        s++
      )
        this._anchors[s].i >= e && (this._anchors[s].i -= 6);
    this._updateAnchors(),
      this.update(),
      this._saveState(),
      this.vars.onDeleteAnchor &&
        this.vars.onDeleteAnchor.call(this.vars.callbackScope || this);
  }
  _onClickAnchor(t) {
    let e,
      s,
      i,
      n,
      o,
      r,
      a = t.i,
      h = t.segment,
      l = t.isClosedStart ? h.length - 4 : a - 2,
      c = !a || a >= h.length - 2;
    F && $ !== t && this._editingAnchor
      ? ((t.smooth = !t.smooth),
        c && !t.isClosedStart && (t.smooth = !1),
        t.element.setAttribute(
          'd',
          t.smooth ? this._circleHandle : this._squareHandle
        ),
        !t.smooth || (c && !t.isClosedStart)
          ? t.smooth ||
            (c && !t.isClosedStart) ||
            ((a || t.isClosedStart) && ((h[l] = h[a]), (h[l + 1] = h[a + 1])),
            a < h.length - 2 && ((h[a + 2] = h[a]), (h[a + 3] = h[a + 1])),
            this._updateAnchors(),
            this.update(),
            this._saveState())
          : ((e = Math.atan2(h[a + 1] - h[l + 1], h[a] - h[l])),
            (s = Math.atan2(h[a + 3] - h[a + 1], h[a + 2] - h[a])),
            (e = (e + s) / 2),
            (i = Ht(h, l, a)),
            (n = Ht(h, a, a + 2)),
            i < 0.2 &&
              ((i = Ht(h, a, l - 4) / 4),
              (e = s || Math.atan2(h[a + 7] - h[l - 3], h[a + 6] - h[l - 4]))),
            n < 0.2 &&
              ((n = Ht(h, a, a + 6) / 4),
              (s = e || Math.atan2(h[a + 7] - h[l - 3], h[a + 6] - h[l - 4]))),
            (o = Math.sin(e)),
            (r = Math.cos(e)),
            Math.abs(s - e) < Math.PI / 2 && ((o = -o), (r = -r)),
            (h[l] = ((1e3 * (h[a] + r * i)) | 0) / 1e3),
            (h[l + 1] = ((1e3 * (h[a + 1] + o * i)) | 0) / 1e3),
            (h[a + 2] = ((1e3 * (h[a] - r * n)) | 0) / 1e3),
            (h[a + 3] = ((1e3 * (h[a + 1] - o * n)) | 0) / 1e3),
            this._updateAnchors(),
            this.update(),
            this._saveState()))
      : U ||
        ((this._selectedAnchors.length = 0), this._selectedAnchors.push(t)),
      ($ = null),
      this._updateAnchors();
  }
  _updateAnchors() {
    let t,
      e,
      s,
      i = 1 === this._selectedAnchors.length ? this._selectedAnchors[0] : null,
      n = i ? i.segment : null;
    for (this._editingAnchor = i, t = 0; t < this._anchors.length; t++)
      this._anchors[t].element.style.fill =
        -1 !== this._selectedAnchors.indexOf(this._anchors[t])
          ? '#4e7fff'
          : 'white';
    i &&
      (this._handle1.setAttribute(
        'd',
        i.smooth ? this._circleHandle : this._squareHandle
      ),
      this._handle2.setAttribute(
        'd',
        i.smooth ? this._circleHandle : this._squareHandle
      )),
      (t = i ? i.i : 0),
      i && (t || i.isClosedStart)
        ? ((e = i.isClosedStart ? n[n.length - 4] : n[t - 2]),
          (s = i.isClosedStart ? n[n.length - 3] : n[t - 1]),
          (this._handle1.style.visibility = this._line1.style.visibility =
            F || e !== n[t] || s !== n[t + 1] ? 'visible' : 'hidden'),
          this._handle1.setAttribute(
            'transform',
            'translate(' + e + ',' + s + ')'
          ),
          this._line1.setAttribute(
            'points',
            e + ',' + s + ',' + n[t] + ',' + n[t + 1]
          ))
        : (this._handle1.style.visibility = this._line1.style.visibility =
            'hidden'),
      i && t < n.length - 2
        ? ((e = n[t + 2]),
          (s = n[t + 3]),
          (this._handle2.style.visibility = this._line2.style.visibility =
            F || e !== n[t] || s !== n[t + 1] ? 'visible' : 'hidden'),
          this._handle2.setAttribute(
            'transform',
            'translate(' + e + ',' + s + ')'
          ),
          this._line2.setAttribute(
            'points',
            n[t] + ',' + n[t + 1] + ',' + e + ',' + s
          ))
        : (this._handle2.style.visibility = this._line2.style.visibility =
            'hidden');
  }
  _onPressAlt() {
    let t = this._editingAnchor;
    t &&
      ((t.i || t.isClosedStart) &&
        (this._handle1.style.visibility = this._line1.style.visibility =
          'visible'),
      t.i < t.segment.length - 2 &&
        (this._handle2.style.visibility = this._line2.style.visibility =
          'visible'));
  }
  _onReleaseAlt() {
    let t,
      e,
      s,
      i = this._editingAnchor;
    i &&
      ((t = i.segment),
      (e = i.i),
      (s = i.isClosedStart ? t.length - 4 : e - 2),
      t[e] === t[s] &&
        t[e + 1] === t[s + 1] &&
        (this._handle1.style.visibility = this._line1.style.visibility =
          'hidden'),
      t[e] === t[e + 2] &&
        t[e + 1] === t[e + 3] &&
        (this._handle2.style.visibility = this._line2.style.visibility =
          'hidden'));
  }
  _onPressHandle1() {
    this._editingAnchor.smooth &&
      (this._oppositeHandleLength = Ht(
        this._editingAnchor.segment,
        this._editingAnchor.i,
        this._editingAnchor.i + 2
      )),
      Ct('onPress', this);
  }
  _onPressHandle2() {
    this._editingAnchor.smooth &&
      (this._oppositeHandleLength = Ht(
        this._editingAnchor.segment,
        this._editingAnchor.isClosedStart
          ? this._editingAnchor.segment.length - 4
          : this._editingAnchor.i - 2,
        this._editingAnchor.i
      )),
      Ct('onPress', this);
  }
  _onReleaseHandle(t) {
    this._onRelease(t), this._saveState();
  }
  _onDragHandle1() {
    let t,
      e = this._editingAnchor,
      s = e.segment,
      i = e.i,
      n = e.isClosedStart ? s.length - 4 : i - 2,
      o = this._handle1._draggable.x,
      r = this._handle1._draggable.y;
    (s[n] = o = ((1e3 * o) | 0) / 1e3),
      (s[n + 1] = r = ((1e3 * r) | 0) / 1e3),
      e.smooth &&
        (F
          ? ((e.smooth = !1),
            e.element.setAttribute('d', this._squareHandle),
            this._handle1.setAttribute('d', this._squareHandle),
            this._handle2.setAttribute('d', this._squareHandle))
          : ((t = Math.atan2(s[i + 1] - r, s[i] - o)),
            (o = this._oppositeHandleLength * Math.cos(t)),
            (r = this._oppositeHandleLength * Math.sin(t)),
            (s[i + 2] = ((1e3 * (s[i] + o)) | 0) / 1e3),
            (s[i + 3] = ((1e3 * (s[i + 1] + r)) | 0) / 1e3))),
      this.update();
  }
  _onDragHandle2() {
    let t,
      e = this._editingAnchor,
      s = e.segment,
      i = e.i,
      n = e.isClosedStart ? s.length - 4 : i - 2,
      o = this._handle2._draggable.x,
      r = this._handle2._draggable.y;
    (s[i + 2] = o = ((1e3 * o) | 0) / 1e3),
      (s[i + 3] = r = ((1e3 * r) | 0) / 1e3),
      e.smooth &&
        (F
          ? ((e.smooth = !1),
            e.element.setAttribute('d', this._squareHandle),
            this._handle1.setAttribute('d', this._squareHandle),
            this._handle2.setAttribute('d', this._squareHandle))
          : ((t = Math.atan2(s[i + 1] - r, s[i] - o)),
            (o = this._oppositeHandleLength * Math.cos(t)),
            (r = this._oppositeHandleLength * Math.sin(t)),
            (s[n] = ((1e3 * (s[i] + o)) | 0) / 1e3),
            (s[n + 1] = ((1e3 * (s[i + 1] + r)) | 0) / 1e3))),
      this.update();
  }
  _onDragAnchor(t, e, s) {
    let i,
      n,
      o,
      r,
      a,
      h = this._selectedAnchors,
      l = h.length,
      c = 1e3;
    for (n = 0; n < l; n++)
      (r = h[n]),
        (i = r.i),
        (o = r.segment),
        i
          ? ((o[i - 2] = (((o[i - 2] + e) * c) | 0) / c),
            (o[i - 1] = (((o[i - 1] + s) * c) | 0) / c))
          : r.isClosedStart &&
            ((a = o.length - 2),
            (o[a] = mt(o[a] + e)),
            (o[a + 1] = mt(o[a + 1] + s)),
            (o[a - 2] = mt(o[a - 2] + e)),
            (o[a - 1] = mt(o[a - 1] + s))),
        (o[i] = (((o[i] + e) * c) | 0) / c),
        (o[i + 1] = (((o[i + 1] + s) * c) | 0) / c),
        i < o.length - 2 &&
          ((o[i + 2] = (((o[i + 2] + e) * c) | 0) / c),
          (o[i + 3] = (((o[i + 3] + s) * c) | 0) / c)),
        r !== t &&
          r.element.setAttribute(
            'transform',
            'translate(' + o[i] + ',' + o[i + 1] + ')'
          );
    this.update();
  }
  enabled(t) {
    if (!arguments.length) return this._enabled;
    let e = this._anchors.length;
    for (; --e > -1; ) this._anchors[e]._draggable.enabled(t);
    return (
      (this._enabled = t),
      this._handle1._draggable.enabled(t),
      this._handle2._draggable.enabled(t),
      this._draggable && this._draggable.enabled(t),
      t
        ? this._selection.parentNode ||
          (this.path.ownerSVGElement.appendChild(this._selectionHittest),
          this.path.ownerSVGElement.appendChild(this._selection),
          this.init(),
          this._saveState())
        : (this.deselect(),
          this._selectionHittest.parentNode &&
            this._selectionHittest.parentNode.removeChild(
              this._selectionHittest
            ),
          this._selection.parentNode &&
            this._selection.parentNode.removeChild(this._selection)),
      this._updateAnchors(),
      this.update()
    );
  }
  update(t) {
    let e,
      s,
      i,
      n,
      o,
      r = '',
      a = this._editingAnchor;
    if (
      (t && this.init(),
      a &&
        ((e = a.i),
        (s = a.segment),
        (e || a.isClosedStart) &&
          ((o = a.isClosedStart ? s.length - 4 : e - 2),
          (i = s[o]),
          (n = s[o + 1]),
          this._handle1.setAttribute(
            'transform',
            'translate(' + i + ',' + n + ')'
          ),
          this._line1.setAttribute(
            'points',
            i + ',' + n + ',' + s[e] + ',' + s[e + 1]
          )),
        e < s.length - 2 &&
          ((i = s[e + 2]),
          (n = s[e + 3]),
          this._handle2.setAttribute(
            'transform',
            'translate(' + i + ',' + n + ')'
          ),
          this._line2.setAttribute(
            'points',
            s[e] + ',' + s[e + 1] + ',' + i + ',' + n
          ))),
      t)
    )
      r = this.path.getAttribute('d');
    else {
      for (e = 0; e < this._rawPath.length; e++)
        (s = this._rawPath[e]),
          s.length > 7 &&
            (r += 'M' + s[0] + ',' + s[1] + 'C' + s.slice(2).join(','));
      this.path.setAttribute('d', r),
        this._selectionPath.setAttribute('d', r),
        this._selectionHittest.setAttribute('d', r);
    }
    return this.vars.onUpdate && this._enabled && Ct('onUpdate', this, r), this;
  }
  getRawPath(t, e, s) {
    if (t) {
      let t = ft(this.path);
      return d(c(this._rawPath), 1, 0, 0, 1, t.e + (e || 0), t.f + (s || 0));
    }
    return this._rawPath;
  }
  getString(t, e, s) {
    if (t) {
      let t = ft(this.path);
      return (function (t) {
        'number' == typeof t[0] && (t = [t]);
        let e,
          s,
          i,
          n,
          o = '',
          r = t.length;
        for (s = 0; s < r; s++) {
          for (
            n = t[s],
              o += 'M' + h(n[0]) + ',' + h(n[1]) + ' C',
              e = n.length,
              i = 2;
            i < e;
            i++
          )
            o +=
              h(n[i++]) +
              ',' +
              h(n[i++]) +
              ' ' +
              h(n[i++]) +
              ',' +
              h(n[i++]) +
              ' ' +
              h(n[i++]) +
              ',' +
              h(n[i]) +
              ' ';
          n.closed && (o += 'z');
        }
        return o;
      })(d(c(this._rawPath), 1, 0, 0, 1, t.e + (e || 0), t.f + (s || 0)));
    }
    return this.path.getAttribute('d');
  }
  getNormalizedSVG(t, e, s, i) {
    let n,
      o,
      r,
      a,
      h,
      l,
      c = this._rawPath[0],
      d = -1 * c[0],
      g = 0 === e ? 0 : -(e || c[1]),
      p = c.length,
      _ = 1 / (c[p - 2] + d),
      f = -t || c[p - 1] + g;
    for (
      ct.length = 0, f = f ? 1 / f : -_, _ *= 1e3, f *= 1e3, o = 0;
      o < p;
      o += 2
    )
      (ct[o] = (((c[o] + d) * _) | 0) / 1e3),
        (ct[o + 1] = (((c[o + 1] + g) * f) | 0) / 1e3);
    if (i) {
      for (n = [], p = ct.length, o = 2; o < p; o += 6)
        (r = ct[o - 2]),
          (a = ct[o - 1]),
          (h = ct[o + 4]),
          (l = ct[o + 5]),
          n.push(r, a, h, l),
          u(
            r,
            a,
            ct[o],
            ct[o + 1],
            ct[o + 2],
            ct[o + 3],
            h,
            l,
            0.001,
            n,
            n.length - 2
          );
      for (r = n[0], p = n.length, o = 2; o < p; o += 2) {
        if (((h = n[o]), h < r || h > 1 || h < 0)) {
          i();
          break;
        }
        r = h;
      }
    }
    return s &&
      8 === p &&
      0 === ct[0] &&
      0 === ct[1] &&
      1 === ct[p - 2] &&
      1 === ct[p - 1]
      ? ct.slice(2, 6).join(',')
      : ((ct[2] = 'C' + ct[2]), 'M' + ct.join(','));
  }
  kill() {
    this.enabled(!1),
      this._g.parentNode && this._g.parentNode.removeChild(this._g);
  }
  revert() {
    this.kill();
  }
}
(Lt.simplifyPoints = m),
  (Lt.pointsToSegment = _),
  (Lt.simplifySVG = (t, e) => {
    let s, i, n, o, r, a, h, l, c, d, g, f;
    if (
      ((d = (e = e || {}).tolerance || 1),
      (c = e.precision || 1 / d),
      (f = (void 0 === e.cornerThreshold ? 18 : +e.cornerThreshold) * st),
      'string' != typeof t && ((s = t), (t = s.getAttribute('d'))),
      ('#' !== t.charAt(0) && '.' !== t.charAt(0)) ||
        ((s = Y.querySelector(t)), s && (t = s.getAttribute('d'))),
      (i = !1 !== e.curved || /[achqstvz]/gi.test(t) ? p(t)[0] : t.match(et)),
      !1 !== e.curved)
    ) {
      for (l = i, i = [], g = l.length, n = 2; n < g; n += 6)
        (o = +l[n - 2]),
          (a = +l[n - 1]),
          (r = +l[n + 4]),
          (h = +l[n + 5]),
          i.push(mt(o), mt(a), mt(r), mt(h)),
          u(
            o,
            a,
            +l[n],
            +l[n + 1],
            +l[n + 2],
            +l[n + 3],
            r,
            h,
            1 / (2e5 * c),
            i,
            i.length - 2
          );
      (i = _(m(i, d), e.curviness)), (i[2] = 'C' + i[2]);
    } else i = m(i, d);
    return (t = 'M' + i.join(',')), s && s.setAttribute('d', t), t;
  }),
  (Lt.create = (t, e) => new Lt(t, e)),
  (Lt.editingAxis = at),
  (Lt.getSnapFunction = (t) => {
    let e = t.radius || 2,
      s = 1e20,
      i = t.x || 0 === t.x ? t.x : t.width ? 0 : -s,
      n = t.y || 0 === t.y ? t.y : t.height ? 0 : -s,
      o = i + (t.width || s * s),
      r = n + (t.height || s * s),
      a = !1 !== t.containX,
      h = !1 !== t.containY,
      l = t.axis,
      c = t.gridSize;
    return (
      (e *= e),
      (t) => {
        let s,
          d,
          g,
          p,
          u = t.x,
          _ = t.y;
        (a && u < i) || (g = u - i) * g < e
          ? (u = i)
          : ((a && u > o) || (g = o - u) * g < e) && (u = o),
          (h && _ < n) || (p = _ - n) * p < e
            ? (_ = n)
            : ((h && _ > r) || (p = r - _) * p < e) && (_ = r),
          l &&
            ((g = u - l.x),
            (p = _ - l.y),
            g * g < e && (u = l.x),
            p * p < e && (_ = l.y)),
          c &&
            ((s = i + Math.round((u - i) / c) * c),
            (g = s - u),
            (d = n + Math.round((_ - n) / c) * c),
            (p = d - _),
            g * g + p * p < e && ((u = s), (_ = d))),
          (t.x = u),
          (t.y = _);
      }
    );
  }),
  (Lt.version = '3.12.5'),
  (Lt.register = Et);
let Xt,
  Ot,
  It,
  qt,
  Yt,
  Vt,
  jt,
  zt,
  Gt,
  Wt,
  $t = /(^[#\.][a-z]|[a-y][a-z])/i,
  Kt = (t) => 'string' == typeof t,
  Qt = (t, e) => {
    let s = It.createElementNS
      ? It.createElementNS(
          (e || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'),
          t
        )
      : It.createElement(t);
    return s.style ? s : It.createElement(t);
  },
  Jt = (t, e, s) =>
    Kt(t) && $t.test(t)
      ? It.querySelector(t)
      : Array.isArray(t)
      ? zt(
          jt(
            [{ x: Xt.getProperty(e, 'x'), y: Xt.getProperty(e, 'y') }, ...t],
            s
          )
        )
      : Kt(t) || (t && 'path' === (t.tagName + '').toLowerCase())
      ? t
      : 0,
  te = { matrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 } },
  ee = (t, e) => {
    let s = 'Please gsap.registerPlugin(MotionPathPlugin)';
    (Ot = window),
      (Xt = Xt || t || Ot.gsap || console.warn(s)),
      Xt && Lt.register(Xt),
      (It = document),
      (Yt = It.body),
      (qt = It.documentElement),
      Xt &&
        ((Vt = Xt.plugins.motionPath),
        (se.PathEditor = Lt),
        (Gt = Xt.core.context || function () {})),
      Vt
        ? ((Wt = Qt('textarea')),
          (Wt.style.display = 'none'),
          Yt.appendChild(Wt),
          (jt = Vt.arrayToRawPath),
          (zt = Vt.rawPathToString))
        : !0 === e && console.warn(s);
  };
class se {
  constructor(t, e = {}) {
    Vt || ee(e.gsap, 1);
    let s,
      i,
      n,
      o,
      r,
      a,
      h,
      l,
      c,
      d,
      g,
      p,
      u,
      _,
      f = Qt('div'),
      m = this,
      b = { x: 0, y: 0 };
    t instanceof Xt.core.Tween
      ? ((l = t), (s = l.targets()[0]))
      : ((s = Xt.utils.toArray(t)[0]),
        (l = ((t) => {
          let e = Xt.getTweensOf(t),
            s = 0;
          for (; s < e.length; s++) {
            if (e[s].vars.motionPath) return e[s];
            e[s].timeline && e.push(...e[s].timeline.getChildren());
          }
        })(s))),
      (i = Jt(e.path, s, e)),
      (this.offset = b),
      (a = ((t) => {
        let e = t.getBoundingClientRect(),
          s =
            qt.clientTop -
            (Ot.pageYOffset || qt.scrollTop || Yt.scrollTop || 0),
          i =
            qt.clientLeft -
            (Ot.pageXOffset || qt.scrollLeft || Yt.scrollLeft || 0);
        return {
          left: e.left + i,
          top: e.top + s,
          right: e.right + i,
          bottom: e.bottom + s,
        };
      })(s)),
      (o = parseFloat(Xt.getProperty(s, 'x', 'px'))),
      (r = parseFloat(Xt.getProperty(s, 'y', 'px'))),
      (n = s.getCTM && 'svg' !== s.tagName.toLowerCase()),
      l &&
        !i &&
        (i = Jt(
          l.vars.motionPath.path || l.vars.motionPath,
          s,
          l.vars.motionPath
        )),
      f.setAttribute('class', 'copy-motion-path'),
      (f.style.cssText =
        'border-radius:8px; background-color:rgba(85, 85, 85, 0.7); color:#fff; cursor:pointer; padding:6px 12px; font-family:Signika Negative, Arial, sans-serif; position:fixed; left:50%; transform:translate(-50%, 0); font-size:19px; bottom:10px'),
      (f.innerText = 'COPY MOTION PATH'),
      (f._gsHelper = m),
      (Xt.utils.toArray(e.container)[0] || Yt).appendChild(f),
      ((t, e, s) => {
        t.addEventListener('click', (i) => {
          if (i.target._gsHelper) {
            let n = e(i.target);
            if (((Wt.value = n), n && Wt.select)) {
              console.log(n), (Wt.style.display = 'block'), Wt.select();
              try {
                It.execCommand('copy'), Wt.blur(), s && s(t);
              } catch (t) {
                console.warn(
                  "Copy didn't work; this browser doesn't permit that."
                );
              }
              Wt.style.display = 'none';
            }
          }
        });
      })(
        f,
        () => m.getString(),
        () =>
          Xt.fromTo(
            f,
            { backgroundColor: 'white' },
            { duration: 0.5, backgroundColor: 'rgba(85, 85, 85, 0.6)' }
          )
      ),
      (h = i && i.ownerSVGElement),
      h
        ? (e.pathColor && Xt.set(i, { stroke: e.pathColor }),
          e.pathWidth && Xt.set(i, { strokeWidth: e.pathWidth }),
          e.pathOpacity && Xt.set(i, { opacity: e.pathOpacity }))
        : ((c =
            (n &&
              s.ownerSVGElement &&
              s.ownerSVGElement.getAttribute('xmlns')) ||
            'http://www.w3.org/2000/svg'),
          n
            ? ((h = s.ownerSVGElement),
              (d = s.getBBox()),
              (g = ((t) => (t.transform.baseVal.consolidate() || te).matrix)(
                s
              )),
              (o = g.e),
              (r = g.f),
              (b.x = d.x),
              (b.y = d.y))
            : ((h = Qt('svg', c)),
              (_ = !0),
              Yt.appendChild(h),
              h.setAttribute('viewBox', '0 0 100 100'),
              h.setAttribute('class', 'motion-path-helper'),
              (h.style.cssText =
                'overflow:visible; background-color: transparent; position:absolute; z-index:5000; width:100px; height:100px; top:' +
                (a.top - r) +
                'px; left:' +
                (a.left - o) +
                'px;')),
          (d =
            Kt(i) && !$t.test(i)
              ? i
              : ((t, e) => {
                  let s,
                    i = [0, 31, 8, 58, 24, 75, 40, 90, 69, 100, 100, 100];
                  for (s = 0; s < i.length; s += 2)
                    (i[s] += t), (i[s + 1] += e);
                  return 'M' + t + ',' + e + 'C' + i.join(',');
                })(o, r)),
          (i = Qt('path', c)),
          i.setAttribute('d', d),
          i.setAttribute('vector-effect', 'non-scaling-stroke'),
          (i.style.cssText =
            'fill:transparent; stroke-width:' +
            (e.pathWidth || 3) +
            '; stroke:' +
            (e.pathColor || '#555') +
            '; opacity:' +
            (e.pathOpacity || 0.6)),
          h.appendChild(i)),
      (b.x || b.y) && Xt.set(i, { x: b.x, y: b.y }),
      'selected' in e || (e.selected = !0),
      'anchorSnap' in e ||
        (e.anchorSnap = (t) => {
          t.x * t.x + t.y * t.y < 16 && (t.x = t.y = 0);
        }),
      (u = l && l.parent && 'nested' === l.parent.data ? l.parent.parent : l),
      (e.onPress = () => {
        u.pause(0);
      }),
      (p = () => {
        l.invalidate(), u.restart();
      }),
      (e.onRelease = e.onDeleteAnchor = p),
      (this.editor = Lt.create(i, e)),
      e.center &&
        Xt.set(s, { transformOrigin: '50% 50%', xPercent: -50, yPercent: -50 }),
      l
        ? (l.vars.motionPath.path
            ? (l.vars.motionPath.path = i)
            : (l.vars.motionPath = { path: i }),
          u.parent !== Xt.globalTimeline &&
            Xt.globalTimeline.add(
              u,
              ((t) => {
                let e = t.totalTime();
                for (; t; )
                  (e = t.startTime() + e / (t.timeScale() || 1)),
                    (t = t.parent);
                return e;
              })(u) - u.delay()
            ),
          u.repeat(-1).repeatDelay(1))
        : (l = u =
            Xt.to(s, {
              motionPath: {
                path: i,
                start: e.start || 0,
                end: 'end' in e ? e.end : 1,
                autoRotate: 'autoRotate' in e && e.autoRotate,
                align: i,
                alignOrigin: e.alignOrigin,
              },
              duration: e.duration || 5,
              ease: e.ease || 'power1.inOut',
              repeat: -1,
              repeatDelay: 1,
              paused: !e.path,
            })),
      (this.animation = l),
      Gt(this),
      (this.kill = this.revert =
        () => {
          this.editor.kill(),
            f.parentNode && f.parentNode.removeChild(f),
            _ && h.parentNode && h.parentNode.removeChild(h),
            u && u.revert();
        });
  }
  getString() {
    return this.editor.getString(!0, -this.offset.x, -this.offset.y);
  }
}
(se.register = ee),
  (se.create = (t, e) => new se(t, e)),
  (se.editPath = (t, e) => Lt.create(t, e)),
  (se.version = '3.12.5');
export default se;
export { se as MotionPathHelper };
