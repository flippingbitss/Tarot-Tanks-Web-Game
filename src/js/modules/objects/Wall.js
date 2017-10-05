import { Bitmap } from "createjs-module";

export class Wall extends Bitmap {
  /**
     * @param {any} image
     * @param {number} x
     * @param {number} y
     * @param {boolean} isCentered
     */
  constructor(image, x, y, isCentered) {
    super(image);

    if (isCentered) {
      let bounds = this.getBounds();
      this.regX = bounds.width * 0.5;
      this.regY = bounds.height * 0.5;
    }

    this.x = x;
    this.y = y;

  }


  


}
