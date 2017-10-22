import { Container, Text, Bitmap, Shape, Stage, Sprite } from "createjs-module";
import { Util, Vector2 } from "../../utils";

import { WIDTH, HEIGHT, FULL_HEIGHT, FULL_WIDTH, TILE_SIZE, FONT_FAMILY } from "../../constants";
import { ProgressBar, Label } from "../common";
import { Player, Enemy } from "../objects";
import TileMap from "../map/tile_map";
import Camera from "../map/camera";
import assetManager from "../../asset_store";

export class PlayScene extends Stage {
  constructor(args) {
    super(args);
    this.walls = [];
    this.tileMap = new TileMap(this);

    this.players = [];
    this.enemies = [];

    // this.stage.scaleX = 0.5;
    // this.stage.scaleY = 0.5;
    this.Main();
  }

  Main() {
    window.camera = this.camera = new Camera(this.tileMap, WIDTH, HEIGHT);
    console.log(this.camera);
    // let ground = new Shape();
    // ground.graphics.beginFill("lightgreen").drawRect(0, 0, WIDTH, HEIGHT);
    // ground.x = 0;
    // ground.y = 0;
    this.ground = new Container();
    this.addChild(this.ground);
    for (let i = 0; i < this.tileMap.rows; i++) {
      for (let j = 0; j < this.tileMap.cols; j++) {
        let tileType = this.tileMap.getTileType(i, j);
        if (tileType == -1) continue;
        let tile = new Sprite(this.tileMap.tileSet);
        tile.gotoAndStop(tileType);
        tile.x = j * TILE_SIZE;
        tile.y = i * TILE_SIZE;

        // let text = new Text(`${j},${i}`, "20px Arial", "#ff7700");
        // text.x = j * TILE_SIZE;
        // text.y = i * TILE_SIZE;

        // let border = new Shape();
        // border.graphics.beginStroke("red").drawRect(text.x, text.y, TILE_SIZE, TILE_SIZE);
        this.ground.addChild(tile);
        // this.stage.addChild(tile);
        // this.ground.addChild(text)
        // this.stage.addChild(border)
        // this.stage.update();
        // tile.cache(tile.x,tile.y, 120,120)
      }
    }

    // this.ground.stage.update();
    this.ground.cache(0, 0, FULL_WIDTH, FULL_HEIGHT);

    const half = TILE_SIZE / 2;
    this.players.push(
      new Player(4 * TILE_SIZE - half, 11 * TILE_SIZE - half, 8, this, 0),
      new Player(18 * TILE_SIZE - half, 11 * TILE_SIZE - half, 8, this, 1)
    );
    // this.player = new Player(6 * TILE_SIZE - half, 8 * TILE_SIZE - half, 5, this);

    this.enemies.push(
      new Enemy(6 * TILE_SIZE + half, 5 * TILE_SIZE + half, 5, this, [[6, 5], [14, 5]])
    );
    this.stage.snapToPixel = true;

    this.centerMark = new Shape();

    // this.HUD = new Container();

    this.p1Health = new ProgressBar("P1 Health", 1, 100, 30, false);
    this.p2Health = new ProgressBar("P2 Health", 1, 950, 30, false);
    this.currentTarotCard = new Label("The Magician", 30, FONT_FAMILY, "red", 1080, 30);

    // this.HUD.addChild(bar);

    this.addChild(...this.enemies);
    this.addChild(...this.players);
    // this.addChild(this.centerMark);
    this.addChild(this.p1Health);
    this.addChild(this.p2Health);
    this.addChild(this.currentTarotCard);
    // this.addChild(this.HUD);

    for (let p of this.players) {
      p.onDestroy(this.handlePlayerDeath);
    }
  }

  handlePlayerDeath(e, player) {
    if (this.players.splice(this.players.findIndex(p => p.id == player.id)));
    this.removeChild(player);
  }

  inViewport(x, y) {
    const tsize = TILE_SIZE;

    // let ceiledX = Math.floor(x + tsize)
    return (
      x + tsize > this.camera.x - tsize &&
      x < this.camera.x + WIDTH + tsize &&
      (y + tsize > this.camera.y - tsize && y < this.camera.y + HEIGHT + tsize)
    );
  }

  Update(e) {
    // for (let i = 0; i < this.ground.numChildren; i++) {
    //   let element = this.ground.getChildAt(i);
    //   element.visible = this.inViewport(element.x, element.y);
    // }

    for (let player of this.players) player.Update(e);
    for (let enemy of this.enemies) enemy.Update(e);

    // let distBtwPlayers = this.players[0].pos.subtract(this.players[1]).magnitude;
    // this.camera.ZOOM = Util.map(distBtwPlayers, WIDTH, FULL_WIDTH - TILE_SIZE * 2, 1, 0.5, true);

    // let centerOfPlayers = this.players.reduce((a, b) => a.pos.add(b.pos),Vector2.Zero).scale(1 / 2);

    // this.centerMark.graphics.clear();
    // this.centerMark.graphics
    //   .beginFill("black")
    //   .drawCircle(centerOfPlayers.x, centerOfPlayers.y, 50);

    // this.camera.moveTo(centerOfPlayers.x - WIDTH / 2, centerOfPlayers.y - HEIGHT / 2);

    // this.camera.moveTo(this.player.pos.x - WIDTH / 2, this.player.pos.y - HEIGHT / 2);

    // this.stage.regX = centerOfPlayers.x;
    // this.stage.regY = centerOfPlayers.y;
    // this.HUD.scaleX = this.camera.ZOOM;
    // this.HUD.scaleY = this.camera.ZOOM;
    // this.HUD.stage.update();

    // this.bar.scaleX = 0.5;
    // this.bar.scaleY = 0.5;

    this.p1Health.progress = (this.players[0] && this.players[0].health || 0) / 10
    this.p2Health.progress = (this.players[1] && this.players[1].health || 0)  / 10;

    this.p1Health.Update();
    this.p2Health.Update();

    this.stage.scaleX = this.camera.ZOOM;
    this.stage.scaleY = this.camera.ZOOM;

    // this.stage.x = -this.camera.x;
    // this.stage.y = -this.camera.y;

    this.stage.update();
  }
}
