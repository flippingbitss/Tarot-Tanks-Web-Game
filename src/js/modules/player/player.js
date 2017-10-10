import { Bitmap, Ticker, Tween, Event } from "createjs-module";
import { Keyboard } from "../input";
import { DIR, KEYS, HEIGHT, WIDTH, FULL_HEIGHT, FULL_WIDTH } from "../../constants";
import { Vector2 } from "../../utils";
import { Bullet } from "./bullet";
import assetManager from "../../asset_store";
import game from "../../main";

export class Player extends Bitmap {
  constructor(x, y, speed = 5, scene) {
    super(assetManager.getResult("player"));
    this.regX = this.getBounds().width * 0.5;
    this.regY = this.getBounds().height * 0.5;

    this._position = new Vector2(x, y);
    this.pos = this._position;

    this.forward = Vector2.Down;
    this.speed = 5;

    this.movement = [false, false, false, false];
    this.rotation = this.forward.angle(Vector2.Down);
    this.bullets = [];
    window.vec = Vector2;

    this.scene = scene;
    this.Main();
  }

  get pos() {
    return this._position;
  }

  set pos(newPos) {
    this.x = newPos.x;
    this.y = newPos.y;
    this._position = newPos;
  }

  Update() {
    let [up, right, down, left] = this.movement;
    if (!this.movement.every(e => !e)) {
      let pos = this.pos.add(this.forward.scale(this.speed));

      pos.x = Math.max(
        this.getBounds().width / 2,
        Math.min(pos.x, FULL_WIDTH - this.getBounds().width / 2)
      );
      pos.y = Math.max(
        this.getBounds().height / 2,
        Math.min(pos.y, FULL_HEIGHT - this.getBounds().height / 2)
      );

      if (!this.isColliding(pos)) 
          this.pos = pos;
    }

    for (let bullet of this.bullets) {
      bullet.Update();
    }

    this.stage.update();
  }

  isColliding(pos) {
    const { x, y } = pos;

    let map = this.scene.tileMap;
    let skinWidth = 20;
    let myWidth = this.getBounds().width - skinWidth;
    let myHeight = this.getBounds().height - skinWidth;

    let left = x - myWidth / 2;
    let right = x + myWidth / 2;
    let top = y - myHeight / 2;
    let bottom = y + myHeight / 2;

    let isColliding = 
     (
      map.isSolidTileAtXY(left, top) ||
      map.isSolidTileAtXY(right, top) ||
      map.isSolidTileAtXY(right, bottom) ||
      map.isSolidTileAtXY(left, bottom)
    );


    if(isColliding)
      console.log('colliding');

    return isColliding;
  }

  isOverlapping(pos) {
    for (let wall of game.scene.walls) {
      let wallWidth = wall.getBounds().width;
      let wallHeight = wall.getBounds().height;

      if (
        ((pos.x + myWidth / 2 >= wall.x && pos.x + myWidth / 2 <= wall.x + wallWidth) ||
          (pos.x - myWidth / 2 >= wall.x && pos.x - myWidth / 2 <= wall.x + wallWidth)) &&
        ((pos.y + myHeight / 2 >= wall.y && pos.y + myHeight / 2 <= wall.y + wallHeight) ||
          (pos.y - myHeight / 2 >= wall.y && pos.y - myHeight / 2 <= wall.y + wallHeight))
      ) {
        return true;
      }
    }
    return false;
  }

  isKeyDown() {
    return !this.movement.every(e => !e);
  }

  Move(e, dir, forward) {
    if (e.type == "keydown") {
      this.movement[dir] = true;
      this.forward = forward;
    } else {
      this.movement[dir] = false;
    }

    this.rotation = 360 - this.forward.atan2(Vector2.Down) * 180 / Math.PI;
  }

  Shoot() {
    let bullet = new Bullet(
      assetManager.getResult("bullet"),
      this.x,
      this.y,
      true,
      this.forward,
      this.bullets.length
    );

    this.stage.addChild(bullet);
    bullet.onDestroyed(this.RemoveBullets);
    this.bullets.push(bullet);
  }

  RemoveBullets(e, bullet) {
    this.bullets = this.bullets.filter(b => b.isAlive);
    this.stage.removeChild(bullet);
  }

  Main() {
    // console.log("main of player ", this.scene);


    game.input.addMapping(37, e => this.Move(e, DIR.LEFT, Vector2.Left), false);
    game.input.addMapping(38, e => this.Move(e, DIR.UP, Vector2.Down), false);
    game.input.addMapping(39, e => this.Move(e, DIR.RIGHT, Vector2.Right), false);
    game.input.addMapping(40, e => this.Move(e, DIR.DOWN, Vector2.Up), false);
    game.input.addMapping(32, this.Shoot, true);
  }
}

// Tween.get(this)
//   .to({ x: newX, y: newY }, 100)
//   .addEventListener("change", e => {})
//   .call(() => {
//     this.x = newX;
//     this.y = newY;
//   });
