import { Stage, LoadQueue, Sound, Text, Ticker, Bitmap } from 'createjs-module';
import { SCENES, MANIFEST } from './constants'

import backButton from '../assets/images/backButton.png'

export const StartGame = () => {
    console.log('Started New Game ');
    addEventListener("load", (e) => {
        let game = new Game();
    })
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
        let helloWorld = new Text("Hello world !","30px Arial", "red");
        helloWorld.regX = helloWorld.getBounds().width / 2 
        helloWorld.regY = helloWorld.getBounds().height / 2 
        helloWorld.x = 320;
        helloWorld.y = 240;


        let image = new Bitmap(backButton);
        image.x = 240
        image.y = 300
        this.stage.addChild(helloWorld);
        this.stage.addChild(image);
    }
}

