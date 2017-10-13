import { Bitmap, Ticker, Tween, Event } from "createjs-module";
import { Keyboard } from "../input";
import { DIR, KEYS, HEIGHT, WIDTH, FULL_HEIGHT, FULL_WIDTH } from "../../constants";
import { Vector2, Util } from "../../utils";
import { GameObject, Bullet } from ".";
import assetManager from "../../asset_store";
import game from "../../main";

export class Player extends GameObject {
  constructor(x, y, speed = 5, scene) {
    super(assetManager.getResult("player"), x, y, speed, scene);

    this.movement = [false, false, false, false];
    this.bullets = [];

    this.Main();
  }
  
  Update(e) {
    if (this.isKeyDown()) {
      let { width, height } = this.getBounds();
      let pos = this.pos.add(this.forward.scale(this.speed));

      pos.x = Util.clamp(pos.x, width / 2, FULL_WIDTH - width / 2);
      pos.y = Util.clamp(pos.y, height / 2, FULL_HEIGHT - height / 2);

      if (!this.isColliding(pos)) this.pos = pos;
    }

    this._UpdateBullets();
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
    bullet.onDestroyed(this._RemoveBullets);
    this.bullets.push(bullet);
  }

  _RemoveBullets(e, bullet) {
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

  _UpdateBullets() {
    for (let bullet of this.bullets) {
      bullet.Update();
    }
  }
}
