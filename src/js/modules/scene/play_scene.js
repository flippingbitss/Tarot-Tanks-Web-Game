import { Container, Text, Bitmap, Shape } from "createjs-module";
import { Button } from "../common/button";
import { WIDTH, HEIGHT } from "../../constants";
import { Player } from "../player/player";
import { Wall } from "../objects/wall";
import assetManager from "../../asset_store";

export class PlayScene extends Container {
  constructor(args) {
    super(args);
    this.Main();
  }

  Main() {
    let ground = new Shape();
    ground.graphics.beginFill("lightgreen").drawRect(0, 0, WIDTH, HEIGHT);
    // ground.x = 0;
    // ground.y = 0;

    let wall = new Wall(assetManager.getResult("brickWall"),500,400,true);


    this.player = new Player(WIDTH / 2, HEIGHT / 2);
    this.addChild(ground);
    this.addChild(wall);
    this.addChild(this.player);
  }

  Update() {
    this.player.Update();
  }
}
