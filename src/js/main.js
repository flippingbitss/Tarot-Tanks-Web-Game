import { Stage, Sound, Text, Ticker, Bitmap } from "createjs-module";

import { SCENES, WIDTH, HEIGHT } from "./constants";

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
    Ticker.framerate = 60;
    Ticker.timingMode = Ticker.RAF;
    Ticker.on("tick", this.Update);
    this.Main();
  }

  Update() {
    this.scene.Update();
    this.stage.update();
  }

  Main() {
    this.scene = new PlayScene();
    // this.scene.regX = WIDTH / 2;
    // this.scene.regY = HEIGHT / 2;
    // this.scene.x = WIDTH/2;
    // this.scene.y = HEIGHT/2;
    // this.scene.rotation = 180;
    this.stage.addChild(this.scene);
  }
}

export default new Game();
