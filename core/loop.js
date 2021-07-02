const { tools } = require('nonametitan_toolkit'),
  { is } = tools

//#region Types
/** @typedef {number} n */
/** @typedef {(timestep: n) => void} _fn */
/**
 * @typedef {{
 * start: boolean,
 * maxOffsetInterval: n,
 * }} _p
 */
//#endregion

let k = requestAnimationFrame

class Loop {

  //#region Private
  /** @type {n} */ #z
  /** @type {_fn} */ #x
  //#endregion

  /**
   * @param {_fn} fn
   * @param {_} p
   */
  constructor(fn, opt) {
    if (!is.func(fn)) throw new TypeError("Bad argument")
    let d = 0, b = 0, m = 40, p = opt
    this.#x = (T = 0) => { this.#z = k(this.#x); if (d = T - b < m) fn(d); b = T }
    if (is.obj(p)) {
      if (is.num(p.maxOffsetInterval)) m = p.maxOffsetInterval
      if (p.start) this.play()
    }
  }

  //#region Public Method[s]
  play() { this.#z = k(this.#x) }
  pause() { cancelAnimationFrame(this.#z) }
  //#endregion

}

class LoopMachine extends Loop {
  /**
   * @param {{ render: _fn, draw: _fn }} fn
   * @param { _p } opt
   */
  constructor(fn, opt) {
    let r = fn.render, d = fn.draw
    if (!is.func(r) || !is.func(d)) throw new TypeError("Bad render functions")
    super((T) => { r(T / 1000); d(1000 / T) }, opt)
  }
}

module.exports = { Loop, LoopMachine }