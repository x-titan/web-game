const { tools } = require("nonametitan_toolkit"),
  { is } = tools

//#region Types
/** @typedef {{ init: (scene: Scene) => void }} sceneConfig */
//#endregion

class Scene {

  //#region Private
  /** @type {HTMLCanvasElement} */ #canvas
  /** @type {CanvasRenderingContext2D} */ #ctx
  #inited = false
  //#endregion

  /**
   * @param {Object} config
   * @param {HTMLCanvasElement} config.canvas
   */
  constructor({ canvas }) {
    if (is.empty(canvas)) throw new TypeError("Bad canvas")
    this.#ctx = (this.#canvas = canvas).getContext("2d")
  }

  //#region Methods
  /** @param {sceneConfig} config */
  init(config) {
    if (this.#inited || is.empty(config)) return false
    config.init(this)
    return this.#inited = true
  }
  /** @param {number} delta */
  tick(delta) {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.font = "32px"
    this.#ctx.fillText("Tick: " + (delta * 1000), 0, 0)
  }
  //#endregion

  //#region Static Methods
  static isScene(scene) { return scene instanceof Scene }
  //#endregion

  //#region Getter Context
  get canvas() { return this.#canvas }
  get ctx() { return this.#ctx }
  //#endregion

}

module.exports = Scene