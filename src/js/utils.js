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
   * @returns {Vector2}
   * @memberof Vector2
   */
  divide(vec) {
    return new Vector2(this.x / vec.x, this.y / vec.y);
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
    return this.divide(this.magnitude);
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
