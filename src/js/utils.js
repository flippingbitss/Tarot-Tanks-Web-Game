import { setTimeout } from "timers";

/**
 * @export
 * @author Manpreet Singh Matharu
 * @description A small utils Vector2d class written in ES6
 * @class Vector2
 */
export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * @readonly
   * @static
   * @memberof Vector2
   */
  static get Up() {
    return new Vector2(0, 1);
  }
  static get Down() {
    return new Vector2(0, -1);
  }
  static get Left() {
    return new Vector2(-1, 0);
  }
  static get Right() {
    return new Vector2(1, 0);
  }

  static get Zero() {
    return new Vector2(0, 0);
  }

  static get One() {
    return new Vector2(1, 1);
  }

  /**
   * @static
   * @param {Vector2} v1
   * @param {Vector2} v2
   * @returns {Number} distance
   * @memberof Vector2
   */
  static dist(v1, v2) {
    return v1.subtract(v2).magnitude;
  }

  /**
   * @param {Vector2} vec
   * @returns {Vector2}
   * @memberof Vector2
   */
  add(vec) {
    return new Vector2(this.x + vec.x, this.y + vec.y);
  }

  /**
   * @param {Vector2} vec
   * @returns {Vector2}
   * @memberof Vector2
   */
  subtract(vec) {
    return new Vector2(this.x - vec.x, this.y - vec.y);
  }

  /**
   * @param {Number} number
   * @returns {Vector2}
   * @memberof Vector2
   */
  scale(number) {
    return new Vector2(this.x * number, this.y * number);
  }

  /**
   * @param {Vector2} vec
   * @returns {boolean}
   * @memberof Vector2
   */
  equals(vec) {
    return this.x == vec.x && this.y == vec.y;
  }

  /**
   * @param {Vector2} vec
   * @returns {Number}
   * @memberof Vector2
   */
  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  /**
   * @returns {Vector2}
   * @memberof Vector2
   */
  clone() {
    return new Vector2(this.x, this.y);
  }

  floor() {
    return new Vector2(Math.floor(this.x), Math.floor(this.y));
  }

  round() {
    return new Vector2(Math.round(this.x), Math.round(this.y));
  }

  /**
   * @readonly
   * @memberof Vector2
   */
  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * @readonly
   * @memberof Vector2
   */
  get normalized() {
    let mag = this.magnitude;
    if (mag != 0) return this.scale(1 / mag);
    return Vector2.Zero;
  }

  /**
   * @readonly
   * @memberof Vector2
   */
  get negative() {
    return new Vector2(-this.x, -this.y);
  }

  /**
   * @param {Vector2} vec
   * @returns {Number}
   * @memberof Vector2
   */
  atan2(vec) {
    let dot = this.x * vec.x + this.y * vec.y;
    let det = this.x * vec.y - this.y * vec.x;

    return Math.atan2(det, dot);
  }

  /**
   * @param {Vector2} vec
   * @returns {Number}
   * @memberof Vector2
   */
  angle(vec) {
    return Math.acos(this.dot(vec) / (this.magnitude * vec.magnitude));
  }
}

/**
 * @export
 * @author Manpreet Singh Matharu
 * @description some utility functions
 * @class Util
 */
export class Util {
  /**
   * @param {Number} value
   * @param {Number} min
   * @param {Number} max
   * @returns {Number}
   * @memberof Util
   */
  static clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  /**
   * @param {Number} value
   * @param {Number} start
   * @param {Number} end
   * @param {Number} resultStart
   * @param {Number} resultEnd
   * @param {Boolean} clampBounds=false
   * @returns {Number}
   * @memberof Util
   */
  static map(value, start, end, resultStart, resultEnd, clampBounds = false) {
    if (clampBounds) value = this.clamp(value, start, end);
    return (value - start) / (end - start) * (resultEnd - resultStart) + resultStart;
  }

  static doAtInterval(callback, tick, rate, ...args) {
    this.time = this.time || tick.time;

    let newTime = tick.time;

    if (newTime - this.time > rate) {
      callback(...args);
      this.time = newTime;
    }
  }

  static wait(milliseconds) {
    return new Promise((res, rej) => setTimeout(res, milliseconds));
  }
}
