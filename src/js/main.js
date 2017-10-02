import { Stage, LoadQueue, Sound, Text, Ticker } from "createjs-module";
import { SCENES, MANIFEST, WIDTH, HEIGHT } from "./constants";

import backButton from "../assets/images/backButton.png";
import {MenuScene} from './modules/scene/menu_scene'

export const StartGame = () => {
  console.log("Started New Game ");
  window.addEventListener("load", e => {
    let game = new Game();
  });
};

class Game {
  constructor(args) {
    this.canvas = document.getElementById("canvas");
    this.stage = new Stage(this.canvas);
    this.assetManager = new LoadQueue();
    this.Init();
  }

  Init() {
    this.Start();
  }

  Start() {
    this.stage.enableMouseOver(20);
    Ticker.framerate = 60;
    Ticker.on("tick", this.Update);
    this.Main();
  }

  Update() {
    this.stage.update();
  }

  Main() {
    let scene = new MenuScene();
    

    this.stage.addChild(scene);
  }
}
