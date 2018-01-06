import { Stage, Text, Shape, Rectangle, Bitmap, Ticker, Sound } from "createjs-module";
import { Button, Label } from "../common";
import { WIDTH, HEIGHT, FONT_FAMILY, SCENES, FULL_WIDTH, FULL_HEIGHT } from "../../constants";
import {assetManager} from '../../asset_store';
import { LabelButton } from "../common/label_button";
import game from '../../main'
import { Util } from "../../utils";

export class MenuScene extends Stage {
  constructor(args) {
    super(args);
    this.Main();
  }

  Main() {
    this.bgMusic = Sound.play("start_screen",Sound.INTERRUPT_NONE,1,0,1000);

    this.colors = ["yellow","red","pink","blue","orange","green"]

    this.stage.scaleX = 1;
    this.stage.scaleY = 1;

    // background
    let background = new Bitmap(assetManager.getResult("menu_background"))
    background.scaleX = 0.8;
    background.scaleY = 0.8;
    background.alpha = 0.8;
    background.setBounds(0,0,FULL_WIDTH, FULL_HEIGHT)


    // title
    this.gameTitle = new Label("Tarot Tanks", 50, FONT_FAMILY, this.colors[0], WIDTH/2 , HEIGHT / 5 ,true);
    this.gameTitle.regX = 275;
    this.gameTitle.regY = 30;

    // buttons
    let startButton = new LabelButton("Start",30, FONT_FAMILY, "yellow", WIDTH / 2 , HEIGHT / 2, true);
    startButton.regX = 75;
    startButton.regY = 18;
    startButton.setBounds(WIDTH / 2, HEIGHT / 2, startButton.regX * 2, startButton.regY * 2)

    let instructionsButton = new LabelButton("Instructions",30, FONT_FAMILY, "yellow", WIDTH / 2, HEIGHT / 1.6, true);
    instructionsButton.regX = 180;
    instructionsButton.regY = 18;
    instructionsButton.setBounds(WIDTH / 2, HEIGHT / 2, instructionsButton.regX * 2, instructionsButton.regY * 2)

    let soundButton = new LabelButton("Sound ON",30, FONT_FAMILY, "yellow", WIDTH / 2, HEIGHT / 1.3, true);
    soundButton.regX = 120;
    soundButton.regY = 30;
    soundButton.setBounds(WIDTH / 2, HEIGHT / 2, soundButton.regX * 2, soundButton.regY * 2)

    


    startButton.on("click",e=>{
      this.bgMusic.stop();
      game.setScene(SCENES.PLAY);
      // TODO implement sound
    })

     
    instructionsButton.on("click",e=>{
      game.setScene(SCENES.INSTRUCTIONS);
    })

   
    soundButton.on("click",e=>{
      soundButton.text = soundButton.text == "Sound ON" ? "Sound OFF" : "Sound ON";
      Sound.setMute(!Sound.muted)
    })
    
    // this.stage.addChild(startButton);
    this.addChild(background);
    this.addChild(this.gameTitle);
    this.addChild(startButton);
    this.addChild(instructionsButton);
    this.addChild(soundButton);


   
  }

  Update(tick) {
    this.stage.scaleX = 1;
    this.stage.scaleY = 1;

    Util.doAtInterval(this.randomizeTitleColor,tick, 500)
    


    this.stage.update();
  }

  randomizeTitleColor(){
    this.gameTitle.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
