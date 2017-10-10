import { Stage, Sound, Text, Ticker, Bitmap } from "createjs-module";

import { SCENES, WIDTH, HEIGHT, FULL_HEIGHT,FULL_WIDTH } from "./constants";

import { Keyboard } from "./modules/input";
import { PlayScene } from "./modules/scene";
import { Button } from "./modules/common/button";

import assetManager from "./asset_store";

class Game {
  Play() {
    console.log("Started New Game ");

    this.canvas = document.getElementById("canvas");
    this.stage = new Stage(this.canvas);
    this.input = new Keyboard();
    this.input.listenTo(window);
    assetManager.on("complete", e => {
      console.info("ASSET LOADING FINISHED");
      this.Init();
    });
  }

  Init() {
    this.stage.enableMouseOver(20);
    Ticker.framerate = 30;
    Ticker.timingMode = Ticker.RAF;
    Ticker.on("tick", this.Update);
    window.game = this;
    this.Main();
  }

  Update() {
    this.scene.Update();
  }

  Main() {
    this.scene = new PlayScene();
    this.stage.setBounds(0, 0, FULL_WIDTH, FULL_HEIGHT);
    // this.scene.regX = WIDTH / 2;
    // this.scene.regY = HEIGHT / 2;
    // this.scene.x = WIDTH/2;
    // this.scene.y = HEIGHT/2;
    // this.scene.rotation = 180;
    this.stage.addChild(this.scene);
  }
}

export default new Game();
