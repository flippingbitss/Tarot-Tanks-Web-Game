import {Bitmap} from 'createjs-module'

export class Button extends Bitmap {
  /**
     * Creates an instance of Button.
     *
     * @param {any} image
     * @param {number} x
     * @param {number} y
     * @param {boolean} isCentered
     */
  constructor(image,x,y, isCentered) {
    super(image);

    if (isCentered) {
      this.regX = this.getBounds().width * 0.5;
      this.regY = this.getBounds().height * 0.5;
    }

    this.x = x;
    this.y = y;

    // event listeners
    this.on("mouseover", this._mouseOver);
    this.on("mouseout", this._mouseOut);
  }

  _mouseOver(event) {
    this.alpha = 0.7; // change opacity to 70%
  }

  _mouseOut(event) {
    this.alpha = 1.0; // change the opacity to 100%
  }
}
