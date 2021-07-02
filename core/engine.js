const { tools } = require("nonametitan_toolkit"),
  Scene = require("./scene.js")
const { is } = tools

//#region Types
/** @typedef {{ init: (scene: Scene) => void }} sceneConfig */
//#endregion

module.exports = class Engine {
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
    if (Scene.isScene(config.scene)) this.LoadScene(config.scene)
    if (!is.empty(config.sceneConfig)) this.initScene(config.sceneConfig)
    if (!is.empty(config.init)) config.init(this)
    return this.#inited = true
  }
  LoadScene(scene) { if (Scene.isScene(scene)) this.#scene = scene }
  /** @param {sceneConfig} config */
  initScene(config) {
    if (Scene.isScene(this.#scene))
      return this.#scene.init(config)
    return false
  }
  tick(delta) { this.#scene.tick(delta) }
}