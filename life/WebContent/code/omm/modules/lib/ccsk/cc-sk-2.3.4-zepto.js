function hex2b64(a) {
    var b, c, d = "";
    for (b = 0; b + 3 <= a.length; b += 3)
        c = parseInt(a.substring(b, b + 3), 16), d += b64map.charAt(c >> 6) + b64map.charAt(63 & c);
    if (b + 1 == a.length ? (c = parseInt(a.substring(b, b + 1), 16), d += b64map.charAt(c << 2)) : b + 2 == a.length && (c = parseInt(a.substring(b, b + 2), 16), d += b64map.charAt(c >> 2) + b64map.charAt((3 & c) << 4)), b64pad)
        for (; (3 & d.length) > 0; )
            d += b64pad;
    return d
}
function b64tohex(a) {
    var b, c, d, e = "", f = 0;
    for (b = 0; b < a.length && a.charAt(b) != b64pad; ++b)
        d = b64map.indexOf(a.charAt(b)), 0 > d || (0 == f ? (e += int2char(d >> 2), c = 3 & d, f = 1) : 1 == f ? (e += int2char(c << 2 | d >> 4), c = 15 & d, f = 2) : 2 == f ? (e += int2char(c), e += int2char(d >> 2), c = 3 & d, f = 3) : (e += int2char(c << 2 | d >> 4), e += int2char(15 & d), f = 0));
    return 1 == f && (e += int2char(c << 2)), e
}
function b64toBA(a) {
    var b, c = b64tohex(a), d = new Array;
    for (b = 0; 2 * b < c.length; ++b)
        d[b] = parseInt(c.substring(2 * b, 2 * b + 2), 16);
    return d
}
function BigInteger(a, b, c) {
    null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
}
function nbi() {
    return new BigInteger(null)
}
function am1(a, b, c, d, e, f) {
    for (; --f >= 0; ) {
        var g = b * this[a++] + c[d] + e;
        e = Math.floor(g / 67108864), c[d++] = 67108863 & g
    }
    return e
}
function am2(a, b, c, d, e, f) {
    for (var g = 32767 & b, h = b >> 15; --f >= 0; ) {
        var i = 32767 & this[a], j = this[a++] >> 15, k = h * i + j * g;
        i = g * i + ((32767 & k) << 15) + c[d] + (1073741823 & e), e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30), c[d++] = 1073741823 & i
    }
    return e
}
function am3(a, b, c, d, e, f) {
    for (var g = 16383 & b, h = b >> 14; --f >= 0; ) {
        var i = 16383 & this[a], j = this[a++] >> 14, k = h * i + j * g;
        i = g * i + ((16383 & k) << 14) + c[d] + e, e = (i >> 28) + (k >> 14) + h * j, c[d++] = 268435455 & i
    }
    return e
}
function int2char(a) {
    return BI_RM.charAt(a)
}
function intAt(a, b) {
    var c = BI_RC[a.charCodeAt(b)];
    return null == c ? -1 : c
}
function bnpCopyTo(a) {
    for (var b = this.t - 1; b >= 0; --b)
        a[b] = this[b];
    a.t = this.t, a.s = this.s
}
function bnpFromInt(a) {
    this.t = 1, this.s = 0 > a ? -1 : 0, a > 0 ? this[0] = a : -1 > a ? this[0] = a + DV : this.t = 0
}
function nbv(a) {
    var b = nbi();
    return b.fromInt(a), b
}
function bnpFromString(a, b) {
    var c;
    if (16 == b)
        c = 4;
    else if (8 == b)
        c = 3;
    else if (256 == b)
        c = 8;
    else if (2 == b)
        c = 1;
    else if (32 == b)
        c = 5;
    else {
        if (4 != b)
            return void this.fromRadix(a, b);
        c = 2
    }
    this.t = 0, this.s = 0;
    for (var d = a.length, e = !1, f = 0; --d >= 0; ) {
        var g = 8 == c ? 255 & a[d] : intAt(a, d);
        0 > g ? "-" == a.charAt(d) && (e = !0) : (e = !1, 0 == f ? this[this.t++] = g : f + c > this.DB ? (this[this.t - 1] |= (g & (1 << this.DB - f) - 1) << f, this[this.t++] = g >> this.DB - f) : this[this.t - 1] |= g << f, f += c, f >= this.DB && (f -= this.DB))
    }
    8 == c && 0 != (128 & a[0]) && (this.s = -1, f > 0 && (this[this.t - 1] |= (1 << this.DB - f) - 1 << f)), this.clamp(), e && BigInteger.ZERO.subTo(this, this)
}
function bnpClamp() {
    for (var a = this.s & this.DM; this.t > 0 && this[this.t - 1] == a; )
        --this.t
}
function bnToString(a) {
    if (this.s < 0)
        return "-" + this.negate().toString(a);
    var b;
    if (16 == a)
        b = 4;
    else if (8 == a)
        b = 3;
    else if (2 == a)
        b = 1;
    else if (32 == a)
        b = 5;
    else {
        if (4 != a)
            return this.toRadix(a);
        b = 2
    }
    var c, d = (1 << b) - 1, e = !1, f = "", g = this.t, h = this.DB - g * this.DB % b;
    if (g-- > 0)
        for (h < this.DB && (c = this[g] >> h) > 0 && (e = !0, f = int2char(c)); g >= 0; )
            b > h ? (c = (this[g] & (1 << h) - 1) << b - h, c |= this[--g] >> (h += this.DB - b)) : (c = this[g] >> (h -= b) & d, 0 >= h && (h += this.DB, --g)), c > 0 && (e = !0), e && (f += int2char(c));
    return e ? f : "0"
}
function bnNegate() {
    var a = nbi();
    return BigInteger.ZERO.subTo(this, a), a
}
function bnAbs() {
    return this.s < 0 ? this.negate() : this
}
function bnCompareTo(a) {
    var b = this.s - a.s;
    if (0 != b)
        return b;
    var c = this.t;
    if (b = c - a.t, 0 != b)
        return this.s < 0 ? -b : b;
    for (; --c >= 0; )
        if (0 != (b = this[c] - a[c]))
            return b;
    return 0
}
function nbits(a) {
    var b, c = 1;
    return 0 != (b = a >>> 16) && (a = b, c += 16), 0 != (b = a >> 8) && (a = b, c += 8), 0 != (b = a >> 4) && (a = b, c += 4), 0 != (b = a >> 2) && (a = b, c += 2), 0 != (b = a >> 1) && (a = b, c += 1), c
}
function bnBitLength() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}
function bnpDLShiftTo(a, b) {
    var c;
    for (c = this.t - 1; c >= 0; --c)
        b[c + a] = this[c];
    for (c = a - 1; c >= 0; --c)
        b[c] = 0;
    b.t = this.t + a, b.s = this.s
}
function bnpDRShiftTo(a, b) {
    for (var c = a; c < this.t; ++c)
        b[c - a] = this[c];
    b.t = Math.max(this.t - a, 0), b.s = this.s
}
function bnpLShiftTo(a, b) {
    var c, d = a % this.DB, e = this.DB - d, f = (1 << e) - 1, g = Math.floor(a / this.DB), h = this.s << d & this.DM;
    for (c = this.t - 1; c >= 0; --c)
        b[c + g + 1] = this[c] >> e | h, h = (this[c] & f) << d;
    for (c = g - 1; c >= 0; --c)
        b[c] = 0;
    b[g] = h, b.t = this.t + g + 1, b.s = this.s, b.clamp()
}
function bnpRShiftTo(a, b) {
    b.s = this.s;
    var c = Math.floor(a / this.DB);
    if (c >= this.t)
        return void (b.t = 0);
    var d = a % this.DB, e = this.DB - d, f = (1 << d) - 1;
    b[0] = this[c] >> d;
    for (var g = c + 1; g < this.t; ++g)
        b[g - c - 1] |= (this[g] & f) << e, b[g - c] = this[g] >> d;
    d > 0 && (b[this.t - c - 1] |= (this.s & f) << e), b.t = this.t - c, b.clamp()
}
function bnpSubTo(a, b) {
    for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c; )
        d += this[c] - a[c], b[c++] = d & this.DM, d >>= this.DB;
    if (a.t < this.t) {
        for (d -= a.s; c < this.t; )
            d += this[c], b[c++] = d & this.DM, d >>= this.DB;
        d += this.s
    } else {
        for (d += this.s; c < a.t; )
            d -= a[c], b[c++] = d & this.DM, d >>= this.DB;
        d -= a.s
    }
    b.s = 0 > d ? -1 : 0, -1 > d ? b[c++] = this.DV + d : d > 0 && (b[c++] = d), b.t = c, b.clamp()
}
function bnpMultiplyTo(a, b) {
    var c = this.abs(), d = a.abs(), e = c.t;
    for (b.t = e + d.t; --e >= 0; )
        b[e] = 0;
    for (e = 0; e < d.t; ++e)
        b[e + c.t] = c.am(0, d[e], b, e, 0, c.t);
    b.s = 0, b.clamp(), this.s != a.s && BigInteger.ZERO.subTo(b, b)
}
function bnpSquareTo(a) {
    for (var b = this.abs(), c = a.t = 2 * b.t; --c >= 0; )
        a[c] = 0;
    for (c = 0; c < b.t - 1; ++c) {
        var d = b.am(c, b[c], a, 2 * c, 0, 1);
        (a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV, a[c + b.t + 1] = 1)
    }
    a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1)), a.s = 0, a.clamp()
}
function bnpDivRemTo(a, b, c) {
    var d = a.abs();
    if (!(d.t <= 0)) {
        var e = this.abs();
        if (e.t < d.t)
            return null != b && b.fromInt(0), void (null != c && this.copyTo(c));
        null == c && (c = nbi());
        var f = nbi(), g = this.s, h = a.s, i = this.DB - nbits(d[d.t - 1]);
        i > 0 ? (d.lShiftTo(i, f), e.lShiftTo(i, c)) : (d.copyTo(f), e.copyTo(c));
        var j = f.t, k = f[j - 1];
        if (0 != k) {
            var l = k * (1 << this.F1) + (j > 1 ? f[j - 2] >> this.F2 : 0), m = this.FV / l, n = (1 << this.F1) / l, o = 1 << this.F2, p = c.t, q = p - j, r = null == b ? nbi() : b;
            for (f.dlShiftTo(q, r), c.compareTo(r) >= 0 && (c[c.t++] = 1, c.subTo(r, c)), BigInteger.ONE.dlShiftTo(j, r), r.subTo(f, f); f.t < j; )
                f[f.t++] = 0;
            for (; --q >= 0; ) {
                var s = c[--p] == k ? this.DM : Math.floor(c[p] * m + (c[p - 1] + o) * n);
                if ((c[p] += f.am(0, s, c, q, 0, j)) < s)
                    for (f.dlShiftTo(q, r), c.subTo(r, c); c[p] < --s; )
                        c.subTo(r, c)
            }
            null != b && (c.drShiftTo(j, b), g != h && BigInteger.ZERO.subTo(b, b)), c.t = j, c.clamp(), i > 0 && c.rShiftTo(i, c), 0 > g && BigInteger.ZERO.subTo(c, c)
        }
    }
}
function bnMod(a) {
    var b = nbi();
    return this.abs().divRemTo(a, null, b), this.s < 0 && b.compareTo(BigInteger.ZERO) > 0 && a.subTo(b, b), b
}
function Classic(a) {
    this.m = a
}
function cConvert(a) {
    return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
}
function cRevert(a) {
    return a
}
function cReduce(a) {
    a.divRemTo(this.m, null, a)
}
function cMulTo(a, b, c) {
    a.multiplyTo(b, c), this.reduce(c)
}
function cSqrTo(a, b) {
    a.squareTo(b), this.reduce(b)
}
function bnpInvDigit() {
    if (this.t < 1)
        return 0;
    var a = this[0];
    if (0 == (1 & a))
        return 0;
    var b = 3 & a;
    return b = b * (2 - (15 & a) * b) & 15, b = b * (2 - (255 & a) * b) & 255, b = b * (2 - ((65535 & a) * b & 65535)) & 65535, b = b * (2 - a * b % this.DV) % this.DV, b > 0 ? this.DV - b : -b
}
function Montgomery(a) {
    this.m = a, this.mp = a.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << a.DB - 15) - 1, this.mt2 = 2 * a.t
}
function montConvert(a) {
    var b = nbi();
    return a.abs().dlShiftTo(this.m.t, b), b.divRemTo(this.m, null, b), a.s < 0 && b.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(b, b), b
}
function montRevert(a) {
    var b = nbi();
    return a.copyTo(b), this.reduce(b), b
}
function montReduce(a) {
    for (; a.t <= this.mt2; )
        a[a.t++] = 0;
    for (var b = 0; b < this.m.t; ++b) {
        var c = 32767 & a[b], d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
        for (c = b + this.m.t, a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV; )
            a[c] -= a.DV, a[++c]++
    }
    a.clamp(), a.drShiftTo(this.m.t, a), a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
}
function montSqrTo(a, b) {
    a.squareTo(b), this.reduce(b)
}
function montMulTo(a, b, c) {
    a.multiplyTo(b, c), this.reduce(c)
}
function bnpIsEven() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
}
function bnpExp(a, b) {
    if (a > 4294967295 || 1 > a)
        return BigInteger.ONE;
    var c = nbi(), d = nbi(), e = b.convert(this), f = nbits(a) - 1;
    for (e.copyTo(c); --f >= 0; )
        if (b.sqrTo(c, d), (a & 1 << f) > 0)
            b.mulTo(d, e, c);
        else {
            var g = c;
            c = d, d = g
        }
    return b.revert(c)
}
function bnModPowInt(a, b) {
    var c;
    return c = 256 > a || b.isEven() ? new Classic(b) : new Montgomery(b), this.exp(a, c)
}
function bnClone() {
    var a = nbi();
    return this.copyTo(a), a
}
function bnIntValue() {
    if (this.s < 0) {
        if (1 == this.t)
            return this[0] - this.DV;
        if (0 == this.t)
            return -1
    } else {
        if (1 == this.t)
            return this[0];
        if (0 == this.t)
            return 0
    }
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
}
function bnByteValue() {
    return 0 == this.t ? this.s : this[0] << 24 >> 24
}
function bnShortValue() {
    return 0 == this.t ? this.s : this[0] << 16 >> 16
}
function bnpChunkSize(a) {
    return Math.floor(Math.LN2 * this.DB / Math.log(a))
}
function bnSigNum() {
    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
}
function bnpToRadix(a) {
    if (null == a && (a = 10), 0 == this.signum() || 2 > a || a > 36)
        return "0";
    var b = this.chunkSize(a), c = Math.pow(a, b), d = nbv(c), e = nbi(), f = nbi(), g = "";
    for (this.divRemTo(d, e, f); e.signum() > 0; )
        g = (c + f.intValue()).toString(a).substr(1) + g, e.divRemTo(d, e, f);
    return f.intValue().toString(a) + g
}
function bnpFromRadix(a, b) {
    this.fromInt(0), null == b && (b = 10);
    for (var c = this.chunkSize(b), d = Math.pow(b, c), e = !1, f = 0, g = 0, h = 0; h < a.length; ++h) {
        var i = intAt(a, h);
        0 > i ? "-" == a.charAt(h) && 0 == this.signum() && (e = !0) : (g = b * g + i, ++f >= c && (this.dMultiply(d), this.dAddOffset(g, 0), f = 0, g = 0))
    }
    f > 0 && (this.dMultiply(Math.pow(b, f)), this.dAddOffset(g, 0)), e && BigInteger.ZERO.subTo(this, this)
}
function bnpFromNumber(a, b, c) {
    if ("number" == typeof b)
        if (2 > a)
            this.fromInt(1);
        else
            for (this.fromNumber(a, c), this.testBit(a - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b); )
                this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
    else {
        var d = new Array, e = 7 & a;
        d.length = (a >> 3) + 1, b.nextBytes(d), e > 0 ? d[0] &= (1 << e) - 1 : d[0] = 0, this.fromString(d, 256)
    }
}
function bnToByteArray() {
    var a = this.t, b = new Array;
    b[0] = this.s;
    var c, d = this.DB - a * this.DB % 8, e = 0;
    if (a-- > 0)
        for (d < this.DB && (c = this[a] >> d) != (this.s & this.DM) >> d && (b[e++] = c | this.s << this.DB - d); a >= 0; )
            8 > d ? (c = (this[a] & (1 << d) - 1) << 8 - d, c |= this[--a] >> (d += this.DB - 8)) : (c = this[a] >> (d -= 8) & 255, 0 >= d && (d += this.DB, --a)), 0 != (128 & c) && (c |= -256), 0 == e && (128 & this.s) != (128 & c) && ++e, (e > 0 || c != this.s) && (b[e++] = c);
    return b
}
function bnEquals(a) {
    return 0 == this.compareTo(a)
}
function bnMin(a) {
    return this.compareTo(a) < 0 ? this : a
}
function bnMax(a) {
    return this.compareTo(a) > 0 ? this : a
}
function bnpBitwiseTo(a, b, c) {
    var d, e, f = Math.min(a.t, this.t);
    for (d = 0; f > d; ++d)
        c[d] = b(this[d], a[d]);
    if (a.t < this.t) {
        for (e = a.s & this.DM, d = f; d < this.t; ++d)
            c[d] = b(this[d], e);
        c.t = this.t
    } else {
        for (e = this.s & this.DM, d = f; d < a.t; ++d)
            c[d] = b(e, a[d]);
        c.t = a.t
    }
    c.s = b(this.s, a.s), c.clamp()
}
function op_and(a, b) {
    return a & b
}
function bnAnd(a) {
    var b = nbi();
    return this.bitwiseTo(a, op_and, b), b
}
function op_or(a, b) {
    return a | b
}
function bnOr(a) {
    var b = nbi();
    return this.bitwiseTo(a, op_or, b), b
}
function op_xor(a, b) {
    return a ^ b
}
function bnXor(a) {
    var b = nbi();
    return this.bitwiseTo(a, op_xor, b), b
}
function op_andnot(a, b) {
    return a & ~b
}
function bnAndNot(a) {
    var b = nbi();
    return this.bitwiseTo(a, op_andnot, b), b
}
function bnNot() {
    for (var a = nbi(), b = 0; b < this.t; ++b)
        a[b] = this.DM & ~this[b];
    return a.t = this.t, a.s = ~this.s, a
}
function bnShiftLeft(a) {
    var b = nbi();
    return 0 > a ? this.rShiftTo(-a, b) : this.lShiftTo(a, b), b
}
function bnShiftRight(a) {
    var b = nbi();
    return 0 > a ? this.lShiftTo(-a, b) : this.rShiftTo(a, b), b
}
function lbit(a) {
    if (0 == a)
        return -1;
    var b = 0;
    return 0 == (65535 & a) && (a >>= 16, b += 16), 0 == (255 & a) && (a >>= 8, b += 8), 0 == (15 & a) && (a >>= 4, b += 4), 0 == (3 & a) && (a >>= 2, b += 2), 0 == (1 & a) && ++b, b
}
function bnGetLowestSetBit() {
    for (var a = 0; a < this.t; ++a)
        if (0 != this[a])
            return a * this.DB + lbit(this[a]);
    return this.s < 0 ? this.t * this.DB : -1
}
function cbit(a) {
    for (var b = 0; 0 != a; )
        a &= a - 1, ++b;
    return b
}
function bnBitCount() {
    for (var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c)
        a += cbit(this[c] ^ b);
    return a
}
function bnTestBit(a) {
    var b = Math.floor(a / this.DB);
    return b >= this.t ? 0 != this.s : 0 != (this[b] & 1 << a % this.DB)
}
function bnpChangeBit(a, b) {
    var c = BigInteger.ONE.shiftLeft(a);
    return this.bitwiseTo(c, b, c), c
}
function bnSetBit(a) {
    return this.changeBit(a, op_or)
}
function bnClearBit(a) {
    return this.changeBit(a, op_andnot)
}
function bnFlipBit(a) {
    return this.changeBit(a, op_xor)
}
function bnpAddTo(a, b) {
    for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c; )
        d += this[c] + a[c], b[c++] = d & this.DM, d >>= this.DB;
    if (a.t < this.t) {
        for (d += a.s; c < this.t; )
            d += this[c], b[c++] = d & this.DM, d >>= this.DB;
        d += this.s
    } else {
        for (d += this.s; c < a.t; )
            d += a[c], b[c++] = d & this.DM, d >>= this.DB;
        d += a.s
    }
    b.s = 0 > d ? -1 : 0, d > 0 ? b[c++] = d : -1 > d && (b[c++] = this.DV + d), b.t = c, b.clamp()
}
function bnAdd(a) {
    var b = nbi();
    return this.addTo(a, b), b
}
function bnSubtract(a) {
    var b = nbi();
    return this.subTo(a, b), b
}
function bnMultiply(a) {
    var b = nbi();
    return this.multiplyTo(a, b), b
}
function bnSquare() {
    var a = nbi();
    return this.squareTo(a), a
}
function bnDivide(a) {
    var b = nbi();
    return this.divRemTo(a, b, null), b
}
function bnRemainder(a) {
    var b = nbi();
    return this.divRemTo(a, null, b), b
}
function bnDivideAndRemainder(a) {
    var b = nbi(), c = nbi();
    return this.divRemTo(a, b, c), new Array(b, c)
}
function bnpDMultiply(a) {
    this[this.t] = this.am(0, a - 1, this, 0, 0, this.t), ++this.t, this.clamp()
}
function bnpDAddOffset(a, b) {
    if (0 != a) {
        for (; this.t <= b; )
            this[this.t++] = 0;
        for (this[b] += a; this[b] >= this.DV; )
            this[b] -= this.DV, ++b >= this.t && (this[this.t++] = 0), ++this[b]
    }
}
function NullExp() {
}
function nNop(a) {
    return a
}
function nMulTo(a, b, c) {
    a.multiplyTo(b, c)
}
function nSqrTo(a, b) {
    a.squareTo(b)
}
function bnPow(a) {
    return this.exp(a, new NullExp)
}
function bnpMultiplyLowerTo(a, b, c) {
    var d = Math.min(this.t + a.t, b);
    for (c.s = 0, c.t = d; d > 0; )
        c[--d] = 0;
    var e;
    for (e = c.t - this.t; e > d; ++d)
        c[d + this.t] = this.am(0, a[d], c, d, 0, this.t);
    for (e = Math.min(a.t, b); e > d; ++d)
        this.am(0, a[d], c, d, 0, b - d);
    c.clamp()
}
function bnpMultiplyUpperTo(a, b, c) {
    --b;
    var d = c.t = this.t + a.t - b;
    for (c.s = 0; --d >= 0; )
        c[d] = 0;
    for (d = Math.max(b - this.t, 0); d < a.t; ++d)
        c[this.t + d - b] = this.am(b - d, a[d], c, 0, 0, this.t + d - b);
    c.clamp(), c.drShiftTo(1, c)
}
function Barrett(a) {
    this.r2 = nbi(), this.q3 = nbi(), BigInteger.ONE.dlShiftTo(2 * a.t, this.r2), this.mu = this.r2.divide(a), this.m = a
}
function barrettConvert(a) {
    if (a.s < 0 || a.t > 2 * this.m.t)
        return a.mod(this.m);
    if (a.compareTo(this.m) < 0)
        return a;
    var b = nbi();
    return a.copyTo(b), this.reduce(b), b
}
function barrettRevert(a) {
    return a
}
function barrettReduce(a) {
    for (a.drShiftTo(this.m.t - 1, this.r2), a.t > this.m.t + 1 && (a.t = this.m.t + 1, a.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); a.compareTo(this.r2) < 0; )
        a.dAddOffset(1, this.m.t + 1);
    for (a.subTo(this.r2, a); a.compareTo(this.m) >= 0; )
        a.subTo(this.m, a)
}
function barrettSqrTo(a, b) {
    a.squareTo(b), this.reduce(b)
}
function barrettMulTo(a, b, c) {
    a.multiplyTo(b, c), this.reduce(c)
}
function bnModPow(a, b) {
    var c, d, e = a.bitLength(), f = nbv(1);
    if (0 >= e)
        return f;
    c = 18 > e ? 1 : 48 > e ? 3 : 144 > e ? 4 : 768 > e ? 5 : 6, d = 8 > e ? new Classic(b) : b.isEven() ? new Barrett(b) : new Montgomery(b);
    var g = new Array, h = 3, i = c - 1, j = (1 << c) - 1;
    if (g[1] = d.convert(this), c > 1) {
        var k = nbi();
        for (d.sqrTo(g[1], k); j >= h; )
            g[h] = nbi(), d.mulTo(k, g[h - 2], g[h]), h += 2
    }
    var l, m, n = a.t - 1, o = !0, p = nbi();
    for (e = nbits(a[n]) - 1; n >= 0; ) {
        for (e >= i ? l = a[n] >> e - i & j : (l = (a[n] & (1 << e + 1) - 1) << i - e, n > 0 && (l |= a[n - 1] >> this.DB + e - i)), h = c; 0 == (1 & l); )
            l >>= 1, --h;
        if ((e -= h) < 0 && (e += this.DB, --n), o)
            g[l].copyTo(f), o = !1;
        else {
            for (; h > 1; )
                d.sqrTo(f, p), d.sqrTo(p, f), h -= 2;
            h > 0 ? d.sqrTo(f, p) : (m = f, f = p, p = m), d.mulTo(p, g[l], f)
        }
        for (; n >= 0 && 0 == (a[n] & 1 << e); )
            d.sqrTo(f, p), m = f, f = p, p = m, --e < 0 && (e = this.DB - 1, --n)
    }
    return d.revert(f)
}
function bnGCD(a) {
    var b = this.s < 0 ? this.negate() : this.clone(), c = a.s < 0 ? a.negate() : a.clone();
    if (b.compareTo(c) < 0) {
        var d = b;
        b = c, c = d
    }
    var e = b.getLowestSetBit(), f = c.getLowestSetBit();
    if (0 > f)
        return b;
    for (f > e && (f = e), f > 0 && (b.rShiftTo(f, b), c.rShiftTo(f, c)); b.signum() > 0; )
        (e = b.getLowestSetBit()) > 0 && b.rShiftTo(e, b), (e = c.getLowestSetBit()) > 0 && c.rShiftTo(e, c), b.compareTo(c) >= 0 ? (b.subTo(c, b), b.rShiftTo(1, b)) : (c.subTo(b, c), c.rShiftTo(1, c));
    return f > 0 && c.lShiftTo(f, c), c
}
function bnpModInt(a) {
    if (0 >= a)
        return 0;
    var b = this.DV % a, c = this.s < 0 ? a - 1 : 0;
    if (this.t > 0)
        if (0 == b)
            c = this[0] % a;
        else
            for (var d = this.t - 1; d >= 0; --d)
                c = (b * c + this[d]) % a;
    return c
}
function bnModInverse(a) {
    var b = a.isEven();
    if (this.isEven() && b || 0 == a.signum())
        return BigInteger.ZERO;
    for (var c = a.clone(), d = this.clone(), e = nbv(1), f = nbv(0), g = nbv(0), h = nbv(1); 0 != c.signum(); ) {
        for (; c.isEven(); )
            c.rShiftTo(1, c), b ? (e.isEven() && f.isEven() || (e.addTo(this, e), f.subTo(a, f)), e.rShiftTo(1, e)) : f.isEven() || f.subTo(a, f), f.rShiftTo(1, f);
        for (; d.isEven(); )
            d.rShiftTo(1, d), b ? (g.isEven() && h.isEven() || (g.addTo(this, g), h.subTo(a, h)), g.rShiftTo(1, g)) : h.isEven() || h.subTo(a, h), h.rShiftTo(1, h);
        c.compareTo(d) >= 0 ? (c.subTo(d, c), b && e.subTo(g, e), f.subTo(h, f)) : (d.subTo(c, d), b && g.subTo(e, g), h.subTo(f, h))
    }
    return 0 != d.compareTo(BigInteger.ONE) ? BigInteger.ZERO : h.compareTo(a) >= 0 ? h.subtract(a) : h.signum() < 0 ? (h.addTo(a, h), h.signum() < 0 ? h.add(a) : h) : h
}
function bnIsProbablePrime(a) {
    var b, c = this.abs();
    if (1 == c.t && c[0] <= lowprimes[lowprimes.length - 1]) {
        for (b = 0; b < lowprimes.length; ++b)
            if (c[0] == lowprimes[b])
                return !0;
        return !1
    }
    if (c.isEven())
        return !1;
    for (b = 1; b < lowprimes.length; ) {
        for (var d = lowprimes[b], e = b + 1; e < lowprimes.length && lplim > d; )
            d *= lowprimes[e++];
        for (d = c.modInt(d); e > b; )
            if (d % lowprimes[b++] == 0)
                return !1
    }
    return c.millerRabin(a)
}
function bnpMillerRabin(a) {
    var b = this.subtract(BigInteger.ONE), c = b.getLowestSetBit();
    if (0 >= c)
        return !1;
    var d = b.shiftRight(c);
    a = a + 1 >> 1, a > lowprimes.length && (a = lowprimes.length);
    for (var e = nbi(), f = 0; a > f; ++f) {
        e.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var g = e.modPow(d, this);
        if (0 != g.compareTo(BigInteger.ONE) && 0 != g.compareTo(b)) {
            for (var h = 1; h++ < c && 0 != g.compareTo(b); )
                if (g = g.modPowInt(2, this), 0 == g.compareTo(BigInteger.ONE))
                    return !1;
            if (0 != g.compareTo(b))
                return !1
        }
    }
    return !0
}
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", b64pad = "=", dbits, canary = 0xdeadbeefcafe, j_lm = 15715070 == (16777215 & canary);
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28), BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP), BigInteger.prototype.F1 = BI_FP - dbits, BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz", BI_RC = new Array, rr, vv;
for (rr = "0".charCodeAt(0), vv = 0; 9 >= vv; ++vv)
    BI_RC[rr++] = vv;
for (rr = "a".charCodeAt(0), vv = 10; 36 > vv; ++vv)
    BI_RC[rr++] = vv;
for (rr = "A".charCodeAt(0), vv = 10; 36 > vv; ++vv)
    BI_RC[rr++] = vv;
Classic.prototype.convert = cConvert, Classic.prototype.revert = cRevert, Classic.prototype.reduce = cReduce, Classic.prototype.mulTo = cMulTo, Classic.prototype.sqrTo = cSqrTo, Montgomery.prototype.convert = montConvert, Montgomery.prototype.revert = montRevert, Montgomery.prototype.reduce = montReduce, Montgomery.prototype.mulTo = montMulTo, Montgomery.prototype.sqrTo = montSqrTo, BigInteger.prototype.copyTo = bnpCopyTo, BigInteger.prototype.fromInt = bnpFromInt, BigInteger.prototype.fromString = bnpFromString, BigInteger.prototype.clamp = bnpClamp, BigInteger.prototype.dlShiftTo = bnpDLShiftTo, BigInteger.prototype.drShiftTo = bnpDRShiftTo, BigInteger.prototype.lShiftTo = bnpLShiftTo, BigInteger.prototype.rShiftTo = bnpRShiftTo, BigInteger.prototype.subTo = bnpSubTo, BigInteger.prototype.multiplyTo = bnpMultiplyTo, BigInteger.prototype.squareTo = bnpSquareTo, BigInteger.prototype.divRemTo = bnpDivRemTo, BigInteger.prototype.invDigit = bnpInvDigit, BigInteger.prototype.isEven = bnpIsEven, BigInteger.prototype.exp = bnpExp, BigInteger.prototype.toString = bnToString, BigInteger.prototype.negate = bnNegate, BigInteger.prototype.abs = bnAbs, BigInteger.prototype.compareTo = bnCompareTo, BigInteger.prototype.bitLength = bnBitLength, BigInteger.prototype.mod = bnMod, BigInteger.prototype.modPowInt = bnModPowInt, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1), NullExp.prototype.convert = nNop, NullExp.prototype.revert = nNop, NullExp.prototype.mulTo = nMulTo, NullExp.prototype.sqrTo = nSqrTo, Barrett.prototype.convert = barrettConvert, Barrett.prototype.revert = barrettRevert, Barrett.prototype.reduce = barrettReduce, Barrett.prototype.mulTo = barrettMulTo, Barrett.prototype.sqrTo = barrettSqrTo;
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
BigInteger.prototype.chunkSize = bnpChunkSize, BigInteger.prototype.toRadix = bnpToRadix, BigInteger.prototype.fromRadix = bnpFromRadix, BigInteger.prototype.fromNumber = bnpFromNumber, BigInteger.prototype.bitwiseTo = bnpBitwiseTo, BigInteger.prototype.changeBit = bnpChangeBit, BigInteger.prototype.addTo = bnpAddTo, BigInteger.prototype.dMultiply = bnpDMultiply, BigInteger.prototype.dAddOffset = bnpDAddOffset, BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo, BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo, BigInteger.prototype.modInt = bnpModInt, BigInteger.prototype.millerRabin = bnpMillerRabin, BigInteger.prototype.clone = bnClone, BigInteger.prototype.intValue = bnIntValue, BigInteger.prototype.byteValue = bnByteValue, BigInteger.prototype.shortValue = bnShortValue, BigInteger.prototype.signum = bnSigNum, BigInteger.prototype.toByteArray = bnToByteArray, BigInteger.prototype.equals = bnEquals, BigInteger.prototype.min = bnMin, BigInteger.prototype.max = bnMax, BigInteger.prototype.and = bnAnd, BigInteger.prototype.or = bnOr, BigInteger.prototype.xor = bnXor, BigInteger.prototype.andNot = bnAndNot, BigInteger.prototype.not = bnNot, BigInteger.prototype.shiftLeft = bnShiftLeft, BigInteger.prototype.shiftRight = bnShiftRight, BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit, BigInteger.prototype.bitCount = bnBitCount, BigInteger.prototype.testBit = bnTestBit, BigInteger.prototype.setBit = bnSetBit, BigInteger.prototype.clearBit = bnClearBit, BigInteger.prototype.flipBit = bnFlipBit, BigInteger.prototype.add = bnAdd, BigInteger.prototype.subtract = bnSubtract, BigInteger.prototype.multiply = bnMultiply, BigInteger.prototype.divide = bnDivide, BigInteger.prototype.remainder = bnRemainder, BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder, BigInteger.prototype.modPow = bnModPow, BigInteger.prototype.modInverse = bnModInverse, BigInteger.prototype.pow = bnPow, BigInteger.prototype.gcd = bnGCD, BigInteger.prototype.isProbablePrime = bnIsProbablePrime, BigInteger.prototype.square = bnSquare;
var _cc_25 = [50, 48, 49, 53, 48, 53, 50, 49, 112, 105, 110, 103, 97, 110, 122, 104, 101, 110, 103, 113, 117, 97, 110, 64, 99, 108, 111, 117, 100, 99, 111, 114, 101, 46, 99, 110], _cc_00 = function() {
    var a = 1, b = 16, c = [214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44, 5, 43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153, 156, 66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172, 98, 228, 179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63, 166, 71, 7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79, 168, 104, 107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86, 157, 53, 30, 36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135, 212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200, 158, 234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97, 21, 161, 224, 174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140, 177, 227, 29, 246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83, 78, 111, 213, 219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109, 108, 91, 81, 141, 27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90, 216, 10, 193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180, 176, 137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9, 197, 110, 198, 132, 24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95, 62, 215, 203, 57, 72], d = [2746333894, 1453994832, 1736282519, 2993693404], e = [462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617, 2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825, 1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337, 4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545, 2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753, 1213159005, 1684763257];
    return {_cc_02: function() {
            var a = new Object;
            return a.mode = "", a.subkey = new Array(32), a
        },_cc_20: function(a) {
            for (var b = new Array(a.length), c = 0; c < a.length; c++)
                b[c] = a.charAt(c).charCodeAt();
            return b
        },_cc_22: function(a, b) {
            return a[b] << 24 & 4278190080 | a[b + 1] << 16 & 16711680 | a[b + 2] << 8 & 65280 | 255 & a[b + 3] & 4294967295
        },_cc_23: function(a) {
            var b = new Array(4);
            return b[0] = a >>> 24 & 255, b[1] = a >>> 16 & 255, b[2] = a >>> 8 & 255, b[3] = 255 & a, b
        },_cc_24: function(a, b, c, d, e) {
            for (var f = 0; e > f; f++)
                c[d + f] = a[b + f]
        },_cc_27: function(a, b) {
            var c = (4294967295 & a) << b;
            return c
        },_cc_17: function(a, b) {
            return this._cc_27(a, b) | a >>> 32 - b
        },_cc_05: function(a) {
            return c[a]
        },_cc_06: function(a) {
            var b = 0, c = 0, d = new Array(4), e = this._cc_23(a);
            return d[0] = this._cc_05(e[0]), d[1] = this._cc_05(e[1]), d[2] = this._cc_05(e[2]), d[3] = this._cc_05(e[3]), b = this._cc_22(d, 0), c = b ^ this._cc_17(b, 2) ^ this._cc_17(b, 10) ^ this._cc_17(b, 18) ^ this._cc_17(b, 24)
        },_cc_11: function(a, b, c, d, e) {
            return a ^ this._cc_06(b ^ c ^ d ^ e)
        },_cc_07: function(a) {
            var b = 0, c = 0, d = new Array(4), e = this._cc_23(a);
            return d[0] = this._cc_05(e[0]), d[1] = this._cc_05(e[1]), d[2] = this._cc_05(e[2]), d[3] = this._cc_05(e[3]), b = this._cc_22(d, 0), c = b ^ this._cc_17(b, 13) ^ this._cc_17(b, 23)
        },_cc_08: function(a, b) {
            var c = new Array(4), f = new Array(4), g = 0;
            for (c[0] = this._cc_22(b, 0), c[1] = this._cc_22(b, 4), c[2] = this._cc_22(b, 8), c[3] = this._cc_22(b, 12), f[0] = c[0] ^ d[0], f[1] = c[1] ^ d[1], f[2] = c[2] ^ d[2], f[3] = c[3] ^ d[3]; 32 > g; g++)
                f[g + 4] = f[g] ^ this._cc_07(f[g + 1] ^ f[g + 2] ^ f[g + 3] ^ e[g]), a[g] = f[g + 4]
        },_cc_04: function(a, b, c, d, e) {
            var f = 0, g = new Array(36);
            for (g[0] = this._cc_22(b, c), g[1] = this._cc_22(b, c + 4), g[2] = this._cc_22(b, c + 8), g[3] = this._cc_22(b, c + 12); 32 > f; )
                g[f + 4] = this._cc_11(g[f], g[f + 1], g[f + 2], g[f + 3], a[f]), f++;
            var h = null;
            h = this._cc_23(g[35]), this._cc_24(h, 0, d, e, 4), h = this._cc_23(g[34]), this._cc_24(h, 0, d, e + 4, 4), h = this._cc_23(g[33]), this._cc_24(h, 0, d, e + 8, 4), h = this._cc_23(g[32]), this._cc_24(h, 0, d, e + 12, 4)
        },_cc_10: function(b, c) {
            b.mode = a, this._cc_08(b.subkey, c)
        },_cc_01: function(b, c) {
            var d;
            for (b.mode = a, this._cc_08(b.subkey, c), d = 0; 16 > d; d++) {
                var e = b.subkey[d];
                b.subkey[d] = b.subkey[31 - d], b.subkey[31 - d] = e
            }
        },_cc_03: function(a, b, c, d, e) {
            for (var f = 0, g = 0; c > 0; )
                this._cc_04(a.subkey, d, f, e, g), f += 16, g += 16, c -= 16;
            return e
        },_cc_09: function(b, c, d, e, f, g) {
            var h, i = new Array(16);
            if (c == a)
                for (var j = 0, k = 0; d > 0; ) {
                    for (h = 0; 16 > h; h++)
                        g[h] = f[h] ^ e[h];
                    this._cc_04(b.subkey, g, k, g, k), this._cc_24(g, 0, e, k, 16), j += 16, k += 16, d -= 16
                }
            else
                for (var j = 0, k = 0; d > 0; ) {
                    for (this._cc_24(f, j, i, 0, 16), this._cc_04(b.subkey, f, j, g, k), h = 0; 16 > h; h++)
                        g[h] = g[h] ^ e[h];
                    this._cc_24(i, 0, e, k, 16), k += 16, j += 16, d -= 16
                }
        },_cc_16: function(a, b, c) {
            for (var d = 0; c > d; d++)
                a.push(c)
        },_cc_15: function(a, c) {
            if (null == a || 0 == a.length || null == c || 0 == c.length)
                return null;
            var d = this._cc_02();
            this._cc_10(d, c);
            for (var e = a.length, f = 0, g = Math.floor(e / b), h = b - e % b, i = (g + 1) * b, j = new Array(i), k = 0; g >= k; k++) {
                var l = new Array(b), m = new Array(b);
                if (f = k * b, g > k)
                    this._cc_24(a, f, m, 0, b);
                else {
                    var n = e - f;
                    this._cc_24(a, f, m, 0, n), this._cc_16(m, n, h)
                }
                this._cc_03(d, 1, b, m, l), this._cc_24(l, 0, j, f, b)
            }
            return j
        },_cc_14: function(a, b) {
            var c = a.length - b;
            if (0 == c)
                return null;
            0 > c && (c = 16);
            var d = new Array(c);
            return this._cc_24(a, 0, d, 0, c), d
        },_cc_13: function(a, c) {
            if (null == a || 0 == a.length || null == c || 0 == c.length)
                return null;
            if (a.length % b != 0)
                return null;
            var d = this._cc_02();
            this._cc_01(d, c);
            for (var e = a.length, f = 0, g = Math.floor(e / b), h = new Array(e), i = 0, j = 0; g > j; j++) {
                var k = new Array(b);
                if (f = j * b, this._cc_24(a, f, k, 0, b), this._cc_03(d, 0, b, k, k), j == g - 1) {
                    var l = k[k.length - 1], m = this._cc_14(k, l);
                    if (null == m) {
                        i = f;
                        break
                    }
                    this._cc_24(m, 0, h, f, m.length), i = f + m.length
                } else
                    this._cc_24(k, 0, h, f, b)
            }
            var n = new Array(i);
            return this._cc_24(h, 0, n, 0, i), n
        }}
};
!function(a) {
	if("function" == typeof define){
		define(function(require, exports, module){
			"function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("zepto") : Zepto)
		});
	}else{
    	"function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : Zepto)
	}
}(function(a) {
    function b() {
        return /iphone/i.test((window.navigator || {}).userAgent) ? 1 : /android/i.test((window.navigator || {}).userAgent) ? 2 : 0
    }
    function c() {
        var a = document.body.scrollWidth, b = document.body.clientHeight;
        return a + "," + b
    }
    function d() {
        var a = document.body.scrollHeight;
        return -1 != navigator.userAgent.indexOf("Chrome") && (a = document.body.scrollHeight), -1 != navigator.userAgent.indexOf("Firefox") && (a = document.documentElement.scrollHeight), a
    }
    function e(a) {
        return a && a.preventDefault ? a.preventDefault() : window.event.returnValue = !1, !1
    }
    function f(a) {
        return window._rAF(a)
    }
    function g() {
        j = !0;
        for (var a = 0; a < i.length; a++)
            f(i[a]);
        i = [], document.removeEventListener("DOMContentLoaded", g)
    }
    var h = {activeImg: 0,showflag: "*",placeholder: "请输入交易密码",def: {widthOne: 592,heightOne: 244,width: 1184,height: 244,areaWidthGap: 34,areaHeightGap: 34},input_style: {width: 200,height: 34,"line-height": 1.42857143,color: "#555"}}, i = [], j = "complete" === document.readyState || "interactive" === document.readyState;
    window._rAF = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
            window.setTimeout(a, 16)
        }
    }(), j || document.addEventListener("DOMContentLoaded", g), a.ccsk_ready = function(a) {
        j ? f(a) : i.push(a)
    };
    var k = null, l = {ff: function(b) {
            var c = a("#" + b), d = c.data("content"), e = c.data("position"), f = !1;
            if (a.isArray(e) || (f = !0), f && (e = e.split(";")), null != e && e.length > 0) {
                e.splice(e.length - 1, 1), e.length > 0 ? f ? c.data("position", e.join(";")) : c.data("position", e) : c.data("position", new Array), d = "";
                for (var g = 0; g < e.length; g++)
                    d += "*";
                c.html(d), c.data("content", d), d && 0 != d.length || (d = ""), c.html(d + "|")
            }
        },fg: function(b, c, d) {
            var e = "#" + d + "_ccskwarp", f = a(e);
            f.removeClass("ng-enter"), f.removeClass("ng-enter-active"), f.addClass("ng-leave"), f.addClass("ng-leave-active"), setTimeout(function() {
                f.hide(), a("#" + b).removeClass("focus"), a("#" + d + "_ccskmask").hide(), a("#" + d + "_ccskmask").css("opacity", 0);
                var c = a("#" + b), e = c.data("content");
                e || (e = ""), 0 == e.length ? (c.addClass("placeholder"), c.html(c.data("placeholder"))) : c.html(e)
            }, 250), k = null
        },fh: function() {
        },crypt: function(a) {
            var b = CryptoJS.enc.Utf8.parse(a);
            b = cipher.GetWords(b.toString());
            var c = cipher.Encrypt(userKey, b);
            return c
        },docrypt: function(b, c, d, e) {
            a("#" + e + "_ccskmask").css("opacity", 1);
            var f = a("#" + c), g = a("#" + b), h = g.data("position");
            if (h) {
                var i = new Array;
                i.push(e), i.push(d.userkey), i.push(d.timestamp), i.push((new Date).getTime().toString()), i.push(a.isArray(h) ? h.join(";") : h);
                for (var j = _cc_00(), k = j._cc_20(i.join("%%")), l = j._cc_15(k, _cc_25), m = 0; m < l.length; m++)
                    l[m] = l[m].toString(16);
                f.val(l.join(","))
            }
        },decrypt: function(a) {
            for (var b = _cc_00(), c = new Array, d = 0; d < a.length; d += 2)
                c.push(parseInt(a.substr(d, 2), 16));
            a = null;
            var e = b._cc_13(c, _cc_25);
            c = null;
            for (var f = "", d = 0; d < e.length; d++)
                f += String.fromCharCode(parseInt(e[d], 10));
            return e = null, f
        },click: function(b, c, d, e, f, g) {
            var h = a("#" + b), i = h.data("position");
            i || (i = new Array), 0 == i.length && h.empty(), a.isArray(i) ? i.push(e + "," + f + "," + g) : (_tpos = new Array, _tpos.push(i), _tpos.push(e + "," + f + "," + g), i = _tpos.join(";")), h.data("position", i), h.removeClass("placeholder");
            var j = h.data("content") || "";
            j += "*", h.data("content", j), h.html(j), h.html(j + "|")
        }};
    a.getCCSKeyPad = function(f, g) {
        var i = {};
        a.extend(i, h);
        var j = (a("body").height(), d()), m = c(), n = document.createElement("div");
        a("#" + g + "_ccskwarp").remove();
        var o = g + "_ccskwarp";
        a("#" + o).remove(), n.setAttribute("id", o), n.setAttribute("class", "ccsk-warp slide-in-up ng-leave ng-leave-active");
        var p = document.createElement("div");
        a(p).append('<div class="loading-spinner"></div>'), p.setAttribute("class", "ccsk-mask");
        var q = g + "_ccskmask";
        a("#" + q).remove(), p.setAttribute("id", q), a(p).bind("touchstart", function() {
            null != k && (l.docrypt(k.input, k.id_prefix, k.setting, k.type), a("body").scrollTop(a("#" + k.input).position().top), l.fg(k.input, k.id_prefix, g))
        }), document.body.appendChild(p);
        return a.get(f, {DeviceType: b(),ScreenSize: m,Type: g}, function(b) {
            var c = b.split("!!"), d = l.decrypt(c[1]).split("!!");
            i.userkey = d[0], i.timestamp = d[1];
            var f = c[0].split("]"), h = f[f.length - 1].split("]"), m = h[0].split("/");
            i.def = {width: m[0],height: m[1],widthOne: m[2],heightOne: m[3],areaWidthGap: m[4],areaHeightGap: m[5]}, n.setAttribute("style", "width: " + document.body.scrollWidth + "px;height: " + i.def.height + "px;bottom:0px;");
            for (var o = 0; o < f.length - 1; o++) {
                var q = new Image, r = g + "_ccskimg_" + o;
                q.setAttribute("id", r), q.setAttribute("alt", "密码键盘");
                var s = f[o].split("[");
                q.src = "data:image/png;base64," + s[0];
                var t = g + "_plugin" + o;
                q.setAttribute("class", "ccsk-img " + g + " ccsk-plugin " + t), q.setAttribute("style", "display: none;"), q.width = i.def.width, q.height = i.def.height, n.appendChild(q);
                var u = 0;
                q.onload = function() {
                    a(".ccsk-input." + g).each(function(b, c) {
                        var d = a(c);
                        d.html(d.data("placeholder")), d.bind("click", function(b) {
                            e(b), window.pluginidx = 0;
                            var f = 0;
                            null != k && (l.fg(k.input, k.id_prefix), f = 250), a(".ccsk-plugin").hide(), a("." + g + "_plugin0").show(), a(p).show(), a(n).show();
                            var h = setTimeout(function() {
                                clearTimeout(h), u = document.documentElement.clientHeight - a(c).offset().top > parseInt(i.def.height) ? 0 : j - a(c).offset().top > parseInt(i.def.height) ? a(c).offset().top - 68 : a(c).offset().top + parseInt(i.def.height), a("body").scrollTop(u), a(n).removeClass("ng-leave"), a(n).removeClass("ng-leave-active"), a(n).addClass("ng-enter"), a(n).addClass("ng-enter-active")
                            }, 50), m = setTimeout(function() {
                                clearTimeout(m), a(c).addClass("focus"), a(c).removeClass("placeholder");
                                var b = a(c).data("content");
                                b && 0 != b.length || (b = ""), a(c).html(b + "|"), k = {input: c.id,id_prefix: d.data("parentId") + "_ccsk",setting: a.extend({}, i),type: g}
                            }, 450)
                        })
                    })
                }, a.each(s[1].split(", "), function(b, c) {
                    var d = document.createElement("div"), f = c.split("/");
                    d.setAttribute("class", "ccsk-area ccsk-plugin " + t + " area_" + b), d.setAttribute("style", "top: " + f[1] + "px;left: " + f[0] + "px;width: " + f[2] + "px;height: " + f[3] + "px;display: none;"), a(d).data("posX", f[0]), a(d).data("posY", f[1]), a(d).data("imgWidth", f[2]), a(d).data("imgHeight", f[3]), a(d).data("widthGap", f[4]), a(d).data("method", f[5]), a(d).bind("touchstart", function() {
                        a(".ccsk-area").removeClass("touch"), a(this).addClass("touch");
                        var b = a("#" + k.input).data("position");
                        return b && (a.isArray(b) || (b = b.split(";")), b.length >= a("#" + k.input).data("length") && "click" == f[5]) ? !1 : ("fb" == f[5] ? (pluginidx = 0, a(".ccsk-plugin").hide(), a("." + g + "_plugin0").show()) : "fc" == f[5] ? (pluginidx = 1, a(".ccsk-plugin").hide(), a("." + g + "_plugin1").show()) : "fa" == f[5] ? (pluginidx = 2, a(".ccsk-plugin").hide(), a("." + g + "_plugin2").show()) : "fe" == f[5] ? (pluginidx = 3, a(".ccsk-plugin").hide(), a("." + g + "_plugin3").show()) : "fg" == f[5] && a("body").scrollTop(a("#" + k.input).offset().top), void (("click" == f[5] || "ff" == f[5] || "fg" == f[5]) && ("fg" == f[5] && l.docrypt(k.input, k.id_prefix, k.setting, g), l[f[5]](k.input, k.id_prefix, g, parseInt(f[0]) + pluginidx * parseInt(k.setting.def.widthOne), f[1], f[4]))))
                    }), a(d).bind("touchend", function() {
                        a(this).removeClass("touch"), a("body").scrollTop(u)
                    }), a(d).bind("touchmove", function(a) {
                        e(a)
                    }), n.appendChild(d)
                }), document.body.appendChild(n)
            }
        }), {init: function(b) {
                if (!b.elementId || b.elementId.length < 1)
                    return !1;
                var c = a("#" + b.elementId);
                c.hide();
                var d = document.createElement("div");
                d.setAttribute("class", "ccsk-input " + g + " placeholder");
                var e = b.elementId + "_ccskinput";
                d.setAttribute("id", e), a(d).html("正在加载..."), a(d).css(b.input_style), a(d).data("length", b.length), a(d).data("placeholder", b.placeholder), a(d).data("parentId", b.elementId), c.after(d);
                var f = document.createElement("input"), h = b.elementId + "_ccsk";
                return f.setAttribute("id", h), f.setAttribute("name", h), f.setAttribute("type", "hidden"), c.after(f), {input: d,getPasswordLength: function() {
                        var b = a(this.input).data("position");
                        return b ? b.length : 0
                    },identical: function(b) {
                        var c = a(b.input).data("position"), d = a(this.input).data("position");
                        if (c && d) {
                            if (c.length != d.length)
                                return !1;
                            for (var e = 0; e < c.length; e++)
                                if (c[e] != d[e])
                                    return !1;
                            return !0
                        }
                        return !1
                    }}
            }}
    }
});
