import is from "../utils/types.js"

//#region Types
/** @typedef {{ init: (scene: Scene) => void }} sceneConfig */
//#endregion

export default class Scene {

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
    if (!(canvas instanceof HTMLCanvasElement)) throw new TypeError("Bad canvas")
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
    this.clear()
    this.#ctx.font = "32px"
    this.#ctx.fillText("Tick: " + (delta * 1000), 0, 0)
  }
  clear() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
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