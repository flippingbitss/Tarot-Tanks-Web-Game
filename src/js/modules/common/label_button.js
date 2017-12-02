import { Text, Shape } from "createjs-module";

export class LabelButton extends Text {
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

    let hitArea = new Shape();

    hitArea.graphics
      .beginFill("white")
      .drawRect(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight()).endFill();

    this.hitArea = hitArea;
    this.on("mouseover", () => {
      this.alpha = 0.8;
    });
    this.on("mouseout", () => {
      this.alpha = 1;
    });
  }
}
