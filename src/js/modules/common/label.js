import { Text } from "createjs-module";

export class Label extends Text {
  /**
     * Creates an instance of Label.
     * @param {string} labelstring
     * @param {Number} fontSize
     * @param {string} fontFamily
     * @param {string} colour
     * @param {number} x
     * @param {number} y
     * @param {boolean} isCentered
    */
  constructor(labelstring, fontSize, fontFamily, colour, x, y, isCentered) {
    super(labelstring, `${fontSize}px "${fontFamily}"`, colour);

    if (isCentered) {
      this.regX = this.getMeasuredWidth() * 0.5;
      this.regY = this.getMeasuredHeight() * 0.5;
    }

    this.x = x;
    this.y = y;
  }
}
