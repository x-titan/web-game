import is from "../utils/types.js"
import Scene from "./scene.js"

const isScene = Scene.isScene

//#region Types
/** @typedef {{ init: (scene: Scene) => void }} sceneConfig */
//#endregion

export default class Engine {
  /** @type {Scene} */ #scene
  #inited = false
  constructor() { }
  /**
   * @param {Object} config
   * @param {(engine: Engine) => void} config.init
   * @param {Scene} config.scene
   * @param {sceneConfig} config.sceneConfig
   */
  init(config) {
    if (this.#inited || is.empty(config)) return false
    if (isScene(config.scene)) this.LoadScene(config.scene)
    if (!is.empty(config.sceneConfig)) this.initScene(config.sceneConfig)
    if (!is.empty(config.init)) config.init(this)
    return this.#inited = true
  }
  LoadScene(scene) { if (isScene(scene)) this.#scene = scene }
  /** @param {sceneConfig} config */
  initScene(config) {
    if (isScene(this.#scene))
      return this.#scene.init(config)
    return false
  }
  tick(delta) { this.#scene.tick(delta) }
}