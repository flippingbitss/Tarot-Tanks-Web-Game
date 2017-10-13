import { Stage, Text } from "createjs-module";
import { Button, Label } from "../common";
import { WIDTH, HEIGHT, FONT_FAMILY } from "../../constants";
import assetManager from '../../asset_store';

export class MenuScene extends Stage {
  constructor(args) {
    super(args);
    this.Main();
  }

  Main() {
    let gameTitle = new Label("Tarot Tanks", 50, FONT_FAMILY, "lightgray", WIDTH/2, HEIGHT / 5 ,true);
    let startButton = new Button(assetManager.getResult("startButton"),WIDTH / 2, HEIGHT / 2, true);

    // this.stage.addChild(startButton);
    this.addChild(gameTitle);
    this.addChild(startButton);
  }

  Update() {
    this.stage.update();
  }
}
