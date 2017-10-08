import { Container, Text, Bitmap, Shape, Stage, Sprite } from "createjs-module";
import { Button } from "../common/button";
import { WIDTH, HEIGHT, FULL_HEIGHT, FULL_WIDTH } from "../../constants";
import { Player } from "../player/player";
import { Wall } from "../objects/wall";
import TileMap from "../map/tile_map";
import Camera from "../map/camera";
import assetManager from "../../asset_store";

export class PlayScene extends Stage {
  constructor(args) {
    super(args);
    this.walls = [];
    this.Main();
  }

  Main() {
    this.tileMap = new TileMap();

    window.camera = this.camera = new Camera(this.tileMap, WIDTH, HEIGHT);
    console.log(this.camera);
    // let ground = new Shape();
    // ground.graphics.beginFill("lightgreen").drawRect(0, 0, WIDTH, HEIGHT);
    // ground.x = 0;
    // ground.y = 0;

    for (let i = 0; i < this.tileMap.rows; i++) {
      for (let j = 0; j < this.tileMap.cols; j++) {
        let tileType = this.tileMap.getTile(i,j);
        let tile = new Sprite(this.tileMap.tileSet);
        tile.gotoAndStop(tileType)
        tile.x = j * this.tileMap.tileSize;
        tile.y = i * this.tileMap.tileSize;

        // let text = new Text(`${tileType}`, "20px Arial", "#ff7700");
        // text.x = j * this.tileMap.tileSize;
        // text.y = i * this.tileMap.tileSize;

        // let border = new Shape();
        // border.graphics.beginStroke("red").drawRect(text.x,text.y,this.tileMap.tileSize,this.tileMap.tileSize)
        
        this.stage.addChild(tile)
        // this.stage.addChild(text)
        // this.stage.addChild(border)
        // tile.cache(tile.x,tile.y, 120,120)
      }
    }

    let wall1 = new Wall(assetManager.getResult("brickWall"), this.tileMap.tileSize * 8, this.tileMap.tileSize * 4, false);
    let wall2 = new Wall(assetManager.getResult("brickWall"), this.tileMap.tileSize * 4, this.tileMap.tileSize * 2, false);
    this.walls.push(wall1, wall2);

    this.player = new Player(900, HEIGHT / 2);
    this.stage.snapToPixel = true;
    // this.addChild(ground);
    this.addChild(...this.walls);
    this.addChild(this.player);
  }

  Update() {
    // let map = this.tileMap;
    // let startCol = Math.floor(this.camera.x / map.tileSize);
    // let endCol = startCol + this.camera.width / map.tileSize;

    // let startRow = Math.floor(this.camera.y / map.tileSize);
    // let endRow = startRow + this.camera.height / map.tileSize;

    // let offsetX = -this.camera.x + startCol * map.tileSize;
    // let offsetY = -this.camera.y + startRow * map.tileSize;
    // console.log(this.camera.x, this.camera.y);
    // this.camera.move(1,0)

    this.player.Update();

    // console.log(
    //   this.player.pos.x,
    //   this.player.pos.y,
    //   this.camera.x,
    //   this.camera.y,
    //   this.stage.x,
    //   this.stage.y
    // );

    this.camera.moveTo(this.player.pos.x - WIDTH / 2, this.player.pos.y - HEIGHT / 2);

    this.stage.x = -this.camera.x;
    this.stage.y = -this.camera.y;

    this.stage.update();
  }
}
