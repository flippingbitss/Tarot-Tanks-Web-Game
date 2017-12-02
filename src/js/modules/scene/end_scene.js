import { Stage, Text, Shape, Rectangle } from "createjs-module";
import { Button, Label } from "../common";
import { WIDTH, HEIGHT, FONT_FAMILY, SCENES } from "../../constants";
import assetManager from '../../asset_store';
import { LabelButton } from "../common/label_button";
import game from '../../main'

export class EndScene extends Stage {
  constructor(args) {
    super(args);
    this.Main();
  }

  Main() {
    let gameTitle = new Label("Game Over !", 50, FONT_FAMILY, "gray", WIDTH/2, HEIGHT / 5 ,true);
    
    let mainMenuButton = new LabelButton("Main Menu",30, FONT_FAMILY, "lightgray", WIDTH / 2, HEIGHT / 2, true); 


    mainMenuButton.on("click",e=>{
       game.setScene(SCENES.START);
      // TODO implement sound
    })
    
    // this.stage.addChild(startButton);
    this.addChild(gameTitle);
    this.addChild(mainMenuButton);

  }

  Update() {
    this.stage.scaleX = 1;
    this.stage.scaleY = 1;
    this.stage.update();
  }
}
