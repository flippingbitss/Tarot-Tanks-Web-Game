import { Bitmap, Ticker, Tween, Event } from "createjs-module";
import { Keyboard } from "../input";
import { DIR, KEYS } from "../../constants";
import { Vector2 } from "../../utils";
import { Bullet } from "./bullet";
import assetManager from "../../asset_store";
import game from "../../main";

export class Player extends Bitmap {
  constructor(x, y, speed = 5) {
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
      this.pos = this.pos.add(this.forward.scale(this.speed));
    }

    this.stage.update();
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

    // this.forward = forward;
    this.rotation = 360 - this.forward.atan2(Vector2.Down) * 180 / Math.PI;
  }

  Shoot() {
    let bullet = new Bullet(
      assetManager.getResult("bullet"),
      this.x,
      this.y,
      true,
      this.forward,
      this.bullets.length - 1
    );

    this.stage.addChild(bullet);
    bullet.onDestroyed(this.RemoveBullets);
    this.bullets.push(bullet);
  }

  RemoveBullets(e, bullet) {
    this.bullets.splice(bullet.index, 1);
    this.stage.removeChild(bullet);
  }

  Main() {
    game.input.addMapping(37, e => this.Move(e, DIR.LEFT, Vector2.Left), false);
    game.input.addMapping(38, e => this.Move(e, DIR.UP, Vector2.Down), false);
    game.input.addMapping(
      39,
      e => this.Move(e, DIR.RIGHT, Vector2.Right),
      false
    );
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
