import is from "../utils/types.js"

//#region Types
/** @typedef {number} n */
//#endregion

const s_c = (i = 0) => 0.5 * (1.0 - Math.cos(i * Math.PI)), P_YB = 4, P_Y = 1 << P_YB, P_ZB = 8, P_Z = 1 << P_ZB, P_ = 4095, fl = Math.floor, p_oct = 4, p_amp = 0.5;

export default class Noise {

  //#region Private Params
  /**@type {n}*/#m;/**@type {n}*/#a;/**@type {n}*/#c
  /**@type {n}*/#seed;/**@type {n}*/#z;/**@type {n}*/#zz
  //#endregion

  /** @param {n} seed */
  constructor(seed) {
    this.#m = 4294967296
    this.#a = 1664525
    this.#c = 1013904223
    this.#seed = this.#z = this.#zz = (is.empty(seed) ? Math.random() * this.#m : seed) >>> 0
    this.noise = new Float32Array()
  }

  //#region Getter
  get point() { return this.#z = (this.#a * this.#z + this.#c) % this.#m / this.#m }
  get Seed() { return this.#seed }
  //#endregion

  //#region Private Methods
  #point(i) { this.noise[i] = (this.#zz = (this.#a * this.#zz + this.#c) % this.#m) / this.#m }
  //#endregion

  //#region Methods
  simplex2(x, y = 0, z = 0) {
    for (let i = 0; i < P_ + 1; i++) this.#point(i)
    return Noise.#NoiseSimplex2(x, y, z, this.noise)
  }
  //#endregion

  //#region Static Methods
  static #NoiseSimplex2(x, y, z, p) {
    if (x < 0) x = -x; if (y < 0) y = -y; if (z < 0) z = -z; let xi = fl(x), yi = fl(y), zi = fl(z),
      xf = x - xi, yf = y - yi, zf = z - zi, rxf, ryf, n1, n2, n3, r = 0, ampl = 0.5
    for (let o = 0; o < p_oct; o++) {
      let of = xi + (yi << P_YB) + (zi << P_ZB); rxf = s_c(xf); ryf = s_c(yf);
      n1 = p[of & P_]; n1 += rxf * (p[(of + 1) & P_] - n1); n2 = p[(of + P_Y) & P_];
      n2 += rxf * (p[(of + P_Y + 1) & P_] - n2); n1 += ryf * (n2 - n1); of += P_Z;
      n2 = p[of & P_]; n2 += rxf * (p[(of + 1) & P_] - n2); n3 = p[(of + P_Y) & P_]
      n3 += rxf * (p[(of + P_Y + 1) & P_] - n3); n2 += ryf * (n3 - n2); n1 += s_c(zf) * (n2 - n1)
      r += n1 * ampl; ampl *= p_amp; xi <<= 1; xf *= 2; yi <<= 1; yf *= 2; zi <<= 1; zf *= 2;
      if (xf >= 1.0) { xi++; xf-- }; if (yf >= 1.0) { yi++; yf-- }; if (zf >= 1.0) { zi++; zf-- }
    }
    return r
  }
  /**
   * Returns the HSL color model
   * 
   * 0º | 360º >>> Reds
   * 
   * 120º >>> Greens
   * 
   * 240º >>> Blues
   * 
   * @param {n} hue This parameter takes values in (0...359) degrees
   * @param {n} saturate The default saturate is 100 percent
   * @param {n} brightness The default brightness is 50 percent
   */
  static to_hsl(hue, saturate, brightness) {
    let y, z; return `hsl(${is.num(hue) ? hue % 360 : 0},${is.empty(y = saturate) ? 100 : y}%,${is.empty(z = brightness) ? 50 : z}%)`
  }
  /** @param {n} value */
  static black_white(value) { return "hsla(0,0%," + (value * 100) + "%)" }
  //#endregion

}