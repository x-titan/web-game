import is from "../utils/types.js"

export class Vector2 {
  constructor(x = 0, y = 0) { this.x = parseInt(x); this.y = parseInt(y) }
  set(x = 0, y = 0) { this.x = x || 0; this.y = y || 0 }
  setX(x = 0) { this.x = x || 0 }
  setY(y = 0) { this.y = y || 0 }
  add(x = 0, y = 0) { this.x += x || 0; this.y += y || 0 }
  addX(x = 0) { this.x += x || 0 }
  addY(y = 0) { this.y += y || 0 }
  push(vec) {
    if (!(vec instanceof Vector2))
      throw new TypeError("Error, it is expected that the arguments will be vector")
    this.x += parseInt(vec.x); this.y += parseInt(vec.y)
  }
  scale(x = 1, y = 1) { this.x *= x; this.y *= y }
  copy() { return new Vector2(parseInt(this.x), parseInt(this.y)) }
  clear() { this.x = this.y = 0 }
  static to_vec3(vec) { return new Vector3(vec.x, vec.y, is.num(vec.z) ? vec.z : 0) }
}

export class Vector3 {
  constructor(x = 0, y = 0, z = 0) { this.x = parseInt(x); this.y = parseInt(y); this.z = parseInt(z) }
  set(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.y = z }
  setX(x = 0) { this.x = x || 0 }
  setY(y = 0) { this.y = y || 0 }
  setZ(z = 0) { this.z = z || 0 }
  add(x = 0, y = 0, z = 0) { this.x += x || 0; this.y += y || 0; this.z += z || 0 }
  addX(x = 0) { this.x += x || 0 }
  addY(y = 0) { this.y += y || 0 }
  addZ(z = 0) { this.z += z || 0 }
  push(vec) {
    if (!(vec instanceof Vector3))
      throw new TypeError("Error, it is expected that the arguments will be vector")
    this.x += parseInt(vec.x); this.y += parseInt(vec.y); this.z += parseInt(vec.z)
  }
  scale(x = 1, y = 1, z = 1) { this.x *= parseInt(x); this.y *= parseInt(y); this.z *= parseInt(z) }
  copy() { return new Vector3(parseInt(this.x), parseInt(this.y), parseInt(this.z)) }
  clear() { this.x = this.y = this.z = 0 }
  /** @param {Vector2 | Vector3} vec */
  static to_vec2(vec) { return new Vector2(vec.x, vec.y) }
}

export function v2(x = 0, y = 0) { return new Vector2(x, y) }
export function v3(x = 0, y = 0, z = 0) { return new Vector3(x, y, z) }