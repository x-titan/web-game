const { Vector2 } = require("./vector.js")

//#region Types
/** @typedef {number} n */
//#endregion

class Sprite2D {

  //#region Private
  /** @type {Vector2} */ #pos
  /** @type {Vector2} */ #move
  //#endregion

  constructor() { this.#pos = new Vector2(); this.#move = new Vector2() }

  //#region Update position
  updateX() { this.#pos.x += this.#move.x }
  updateY() { this.#pos.y += this.#move.y }
  //#endregion

  //#region Get position
  get getPos() { return this.#pos.copy() }
  get getX() { return this.#pos.x }
  get getY() { return this.#pos.y }
  get getTo() { return this.#move.copy() }
  //#endregion

  //#region Set position
  /**
   * @param {n} x
   * @param {n} y
   */
  setPos(x, y) { this.#pos.x = x; this.#pos.y = y }
  /** @param {n} x */
  setPosX(x) { this.#pos.x = (x || 0) }
  /** @param {n} y */
  setPosY(y) { this.#pos.y = (y || 0) }
  /**
   * @param {n} x
   * @param {n} y
   */
  setMove(x, y) { this.#move.set(x, y) }
  /** @param {n} x */
  setMoveX(x) { this.#move.x = x }
  /** @param {n} y */
  setMoveY(y) { this.#move.y = y }
  //#endregion

  //#region Clear move position
  clear() { this.#move.x = this.#move.y = 0 }
  //#endregion

}


module.exports = { Sprite2D }