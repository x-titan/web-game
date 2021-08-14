//#region Types
/** @typedef {"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"} allTypes */
//#endregion

/** Checks the element type */
export default Object.freeze({
  /** @param {allTypes} type */
  type(value, type) { return type === typeof value },
  /** @param {new} object */
  instance(value, object) { return value instanceof object },
  /** @returns {value is (undefined | null)} */
  empty(value) { return value === undefined || value === null },
  /** @returns {value is number} */
  num(value) { return "number" === typeof value || value instanceof Number },
  /** @returns {value is string} */
  str(value) { return "string" === typeof value || value instanceof String },
  /** @returns {value is object} */
  obj(value) { return "object" === typeof value && value instanceof Object },
  /** @returns {value is boolean} */
  bool(value) { return "boolean" === typeof value || value instanceof Boolean },
  /** @returns {value is Function} */
  func(value) { return "function" === typeof value && value instanceof Function },
  /** @returns {value is Array} */
  array(value) { return Array.isArray(value) },
  /** @returns {value is NaN} */
  NaN(value) { return "number" === typeof value && isNaN(value) },
  /** @returns {value is (undefined | null | 0 | NaN)} */
  nonZeroValue(value) { return !(value === undefined || value === null || value === 0 || is.NaN(value)) },
  /** @returns {value is (undefined | null | globalThis)} */
  notClass(value) { return value === undefined || value === null || value === globalThis }
})
