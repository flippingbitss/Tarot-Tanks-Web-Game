import { Bitmap, Ticker, Tween, Event, Sprite } from "createjs-module";
import { DIR, KEYS, HEIGHT, WIDTH, FULL_HEIGHT, FULL_WIDTH, TILE_SIZE } from "../../constants";
import { Vector2 } from "../../utils";
import { Bullet } from "../player/bullet";
import assetManager from "../../asset_store";
import game from "../../main";

export class Enemy extends Bitmap {
  constructor(x, y, speed = 5, scene) {
    super(assetManager.getResult("enemy"));

    let { width, height } = this.getBounds();
    this.setBounds(x, y, TILE_SIZE, TILE_SIZE);

    this.scaleX = 120 / width;
    this.scaleY = 120 / height;

    this.regX = width * 0.5;
    this.regY = height * 0.5;

    this._position = new Vector2(x, y);
    this.pos = this._position;

    this.forward = Vector2.Down;
    this.speed = 5;

    this.movement = [false, false, false, false];
    this.rotation = this.forward.angle(Vector2.Down);
    this.bullets = [];
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


  Main() {
    console.log("TESTING MAIN ");
    let interval = setInterval(this.Shoot, 2000)
    this.setupWaypoints();
    this.waypoints.forEach(([x, y]) => {
      let tile = new Sprite(this.scene.tileMap.tileSet);
      tile.gotoAndStop(1);
      tile.x = x * TILE_SIZE;
      tile.y = y * TILE_SIZE;

      console.log();
      this.scene.addChild(tile);
    });

  }


  Update() {
    this.Move();
    for (let bullet of this.bullets) {
      bullet.Update();
    }
    this.stage.update();
  }




  Move() {
    let { col: currentX, row: currentY } = this.scene.tileMap.getTileCoordAdjusted(
      this.x - TILE_SIZE / 2,
      this.y - TILE_SIZE / 2
    );

    let [targetX, targetY] = this.waypoints[this.currentWaypoint];

    let dir = new Vector2(currentX, currentY);

    if (targetX != currentX) {
      dir.x = targetX;
    } else if (targetY != currentY) {
      dir.y = targetY;
    }

    this.forward = dir.subtract(new Vector2(currentX, currentY)).normalized;
    this.rotation = 360 - this.forward.atan2(Vector2.Down) * 180 / Math.PI;

    if (this.forward.magnitude == 0 || (currentX == targetX && currentY == targetY)) {
      this.currentWaypoint = (this.currentWaypoint + 1) % this.waypoints.length;
      let [x, y] = this.waypoints[this.currentWaypoint];
      dir = new Vector2(x, y).subtract(new Vector2(currentX, currentY)).normalized;
    }

    let pos = this.pos.add(this.forward.scale(this.speed));

    let { width, height } = this.getBounds();
    pos.x = Math.max(width / 2, Math.min(pos.x, FULL_WIDTH - width / 2));
    pos.y = Math.max(height / 2, Math.min(pos.y, FULL_HEIGHT - height / 2));

    if (!this.isColliding(pos)) this.pos = pos;
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
      map.isSolidTileAtXY(left, top) ||
      map.isSolidTileAtXY(right, top) ||
      map.isSolidTileAtXY(right, bottom) ||
      map.isSolidTileAtXY(left, bottom);

    if (isColliding) console.log("colliding");

    return isColliding;
  }

  setupWaypoints() {
    this.currentWaypoint = 0;
    this.waypoints = [[3, 4], [6, 4], [6, 7], [3, 7]];
  }

  /**
   * 
   * @param {Bitmap} obj 
   * @memberof Enemy
   */
  isObjectInRange(obj) {
    let objPos = new Vector2(obj.x, obj.y);
    let myPos = this.pos;
    if (objPos.subtract(myPos).magnitude < 200) {
      this.Shoot();
    }
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

  
}

// Tween.get(this)
//   .to({ x: newX, y: newY }, 100)
//   .addEventListener("change", e => {})
//   .call(() => {
//     this.x = newX;
//     this.y = newY;
//   });
