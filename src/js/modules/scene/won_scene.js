import { Stage, Text, Bitmap } from "createjs-module";
import { Button, Label } from "../common";
import { WIDTH, HEIGHT, FONT_FAMILY, SCENES, FULL_WIDTH, FULL_HEIGHT } from "../../constants";
import {assetManager} from '../../asset_store';
import { LabelButton } from "../common/label_button";
import game from '../../main'

export class WonScene extends Stage {
  constructor(args) {
    super(args);
    this.Main();
  }

  Main() {
    this.colors = ["yellow","red","pink","blue","orange","green"]


    // background
    let background = new Bitmap(assetManager.getResult("won_background"))
    background.scaleX = 0.8;
    background.scaleY = 0.8;
    background.alpha = 0.8;
    background.setBounds(0,0,FULL_WIDTH, FULL_HEIGHT)



    this.messageLabel = new Label("You WON !", 50, FONT_FAMILY, "yellow", WIDTH/2, HEIGHT / 5 ,true);
    
    let mainMenuButton = new LabelButton("Main Menu",30, FONT_FAMILY, "yellow", WIDTH / 2, HEIGHT / 2, true); 


    mainMenuButton.on("click",e=>{
       game.setScene(SCENES.START);
      // TODO implement sound
    })
    
    this.addChild(background);
    this.addChild(this.messageLabel);
    this.addChild(mainMenuButton);

  }

  Update() {
    this.stage.scaleX = 1;
    this.stage.scaleY = 1;
    this.stage.update();
  }

  randomizeTitleColor(){
    this.messageLabel.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
