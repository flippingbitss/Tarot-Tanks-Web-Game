import { Stage, Text, Bitmap, Shape } from "createjs-module";
import { Button, Label } from "../common";
import { WIDTH, HEIGHT, FONT_FAMILY, SCENES, FULL_WIDTH, FULL_HEIGHT } from "../../constants";
import {assetManager} from '../../asset_store';
import { LabelButton } from "../common/label_button";
import game from '../../main'
import { Util } from "../../utils";

export class InstructionsScene extends Stage {
  constructor(args) {
    super(args);
    this.Main();
  }

  Main() {

	this.colors = ["yellow","red","pink","blue","orange","green"]

	// background
	
    let background = new Bitmap(assetManager.getResult("menu_background"))
    background.scaleX = 0.8;
    background.scaleY = 0.8;
    background.alpha = 0.8;
	background.setBounds(0,0,FULL_WIDTH, FULL_HEIGHT)
	
    let tint = new Shape()
    tint.graphics.beginFill("#00000033").drawRect(0,0,FULL_WIDTH,FULL_HEIGHT).endFill()

    let tint2 = new Shape()
    tint.graphics.beginFill("#00000088").drawRect(150,220,1000,220).endFill()


    this.controls1 = new Label("Player 1 -  Move: WASD,       Fire: SHIFT", 25, FONT_FAMILY, "blue", WIDTH/2, HEIGHT / 7 ,true);
    this.controls2 = new Label("Player 2 -  Move: ARROW KEYS, Fire: SPACE", 25, FONT_FAMILY, "blue", WIDTH/2, HEIGHT / 5.5 ,true);
    this.objective = new Label("Objective: Destroy the enemy tanks", 25, FONT_FAMILY, "yellow", WIDTH/2, HEIGHT / 4 ,true);

	  this.cards1 = new Label("The Devil    - Enemies repair themselves", 20, FONT_FAMILY, "#ff6e43", WIDTH/7, HEIGHT / 2.5 -50 ,false);
    this.cards2 = new Label("The Chariot  - Faster bullets", 20, FONT_FAMILY, "#ff6e43", WIDTH/7, HEIGHT / 2.5 ,false);
    this.cards3 = new Label("The Sun      - Revive dead enemies", 20, FONT_FAMILY, "#ff6e43", WIDTH/7, HEIGHT / 2.5 + 50,false);
   	this.cards4 = new Label("The Magician - Increase powerup spawn frequency", 20, FONT_FAMILY, "#ff6e43", WIDTH/7, HEIGHT/ 2.5 + 100 ,false);
	
	// this.tarotLabel1 = new Label("Tarot cards listed above provide differences in playstyle.", 20, FONT_FAMILY, "orange", 50, HEIGHT / 2 + 100 ,false);
	// this.tarotLabel2 = new Label("Memorize these names and effects. ", 20, FONT_FAMILY, "orange",300, HEIGHT / 2 + 150 ,false);
	

    this.mainMenuButton = new LabelButton("Main Menu",30, FONT_FAMILY, "yellow", WIDTH / 2, HEIGHT - 100, true); 


    this.mainMenuButton.on("click",e=>{
       game.setScene(SCENES.START);
      // TODO implement sound
    })
	
	this.allLabels = [this.controls1,
		this.controls2,
		this.objective,
		this.cards1,
		this.cards2,
		this.cards3,
		this.cards4,]
		// this.tarotLabel1,
		// this.tarotLabel2]
    this.addChild(background);
    this.addChild(tint);
    this.addChild(tint2);
    this.addChild(...this.allLabels);
	
    this.addChild(this.mainMenuButton);

  }

  Update(tick) {
    this.stage.scaleX = 1;
	this.stage.scaleY = 1;

	Util.doAtInterval(this.randomizeButtonColor, tick ,500)

    this.stage.update();
  }

  randomizeButtonColor(){
    this.mainMenuButton.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
