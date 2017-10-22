import { Shape, Stage } from "createjs-module";
import { Label } from ".";
import { FONT_FAMILY } from "../../constants";
export class ProgressBar extends Stage {
  constructor(label, progressRatio = 1, x, y, isCentered) {
    super();

    // if (isCentered) {
    //   let { width, height } = this.getBounds();
    //   this.regX = width * 0.5;
    //   this.regY = height * 0.5;
    // }
    this.x = x;
    this.y = y;

    this.progress = progressRatio;
    this.label = new Label(label, 30, FONT_FAMILY, "darkgrey", x, y, true);

    this.labelW = 270;
    this.labelH = 36;

    this.label.setBounds(x - this.labelW, y - this.labelH, this.labelW, this.labelH);

    console.log(this.x, this.y);
    console.log(this.labelW, this.labelH);

    this.barWidth = 300;
    this.barHeight = 80;
    this.bar = new Shape();

    this.Main();
  }

  Main() {
    this.addChild(this.label);
    this.addChild(this.bar);
  }

  Update() {
    this.bar.graphics.clear();

    this.bar.graphics
      .beginFill("lightblue")
      .drawRect(
        this.x + this.labelW - 50,
        this.y - this.labelH,
        this.progress * this.barWidth,
        this.barHeight
      )
      .endFill();

    this.bar.graphics
      .setStrokeStyle(2)
      .beginStroke("darkgrey")
      .drawRect(this.x + this.labelW - 50, this.y - this.labelH, this.barWidth, this.barHeight)
      .endStroke();

    this.stage.update();
  }
}
