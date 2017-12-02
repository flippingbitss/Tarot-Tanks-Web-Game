import { Bitmap, Ticker, Tween, Event, Sprite, Shape } from "createjs-module";
import {
  DIR,
  KEYS,
  HEIGHT,
  WIDTH,
  FULL_HEIGHT,
  FULL_WIDTH,
  TILE_SIZE,
  TAGS
} from "../../constants";
import { Vector2, Util } from "../../utils";
import { GameObject, Bullet } from ".";

export class Enemy extends GameObject {
  constructor(animName, x, y, speed, scene, waypoints) {
    super(animName, x * TILE_SIZE + TILE_SIZE/2, y * TILE_SIZE + TILE_SIZE / 2, speed, scene);

    let { width, height } = this.getBounds();
    this.setBounds(x, y, TILE_SIZE, TILE_SIZE);

    this.scaleX = 120 / width;
    this.scaleY = 120 / height;

    this.movement = [false, false, false, false];
    this.tag = TAGS.ENEMY;
    this.bullets = [];

    this.playerMark = new Shape();
    this.enemyMark = new Shape();

    this.waypoints = waypoints || [];

    this.Main();
  }

  Main() {
    this.currentWaypoint = 0;
    // this.interval = setInterval(this.shoot, 2000);

    // this.waypoints.forEach(([x, y]) => {
    //   let tile = new Sprite(this.scene.tileMap.tileSet);
    //   tile.gotoAndStop(1);
    //   tile.x = x * TILE_SIZE;
    //   tile.y = y * TILE_SIZE;

    //   this.scene.addChild(tile);
    // });

    this.playerMark.graphics.beginStroke("blue").drawRect(this.x, this.y, TILE_SIZE, TILE_SIZE);
    this.scene.addChild(this.playerMark, this.enemyMark);
  }

  Update(tick) {
    this.stop();
    let closestPlayer = this.getClosestInRange(this.scene.players, 300);
    if (closestPlayer) {
      // this._continueShoot();
      this.doAtInterval(this.shoot, tick, 1000);

      let { x, y } = closestPlayer.pos;
      let { row, col } = this.scene.tileMap.getTileCoordRound(x - TILE_SIZE / 2, y - TILE_SIZE / 2);

      this.playerMark.graphics.clear();
      this.playerMark.graphics
        .beginStroke("blue")
        .drawRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);

      this.followTarget(new Vector2(col, row));
    } else {
      // clearInterval(this.interval);

      let { row, col } = this.scene.tileMap.getTileCoordRound(
        this.pos.x - TILE_SIZE / 2,
        this.pos.y - TILE_SIZE / 2
      );
      // this.scene.tileMap.updateTile(row,col,this.tileType)

      this.enemyMark.graphics.clear();
      this.enemyMark.graphics
        .beginStroke("red")
        .drawRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);

      this.patrol();
    }
    this.Move();

    for (let bullet of this.bullets) {
      bullet.Update();
    }
    this.stage.update();
  }
  /**
   * @param {Vector2} pos
   * @memberof Enemy
   */
  followTarget(pos) {
    let [targetX, targetY] = [pos.x, pos.y];

    let currentTile = this._getCurrentTile();

    let dir = currentTile.clone();

    if (targetX != currentTile.x) {
      dir.x = targetX;
    } else if (targetY != currentTile.y) {
      dir.y = targetY;
    }

    this.forward = dir.subtract(currentTile).normalized;
  }

  isKeyDown() {
    return !this.movement.every(e => !e);
  }

  shoot() {
    let bullet = new Bullet(
      "bullet",
      this.x,
      this.y, 20,
      this.scene,
      this.forward,
      TAGS.ENEMY
    );

    
    bullet.onCollision(this.onBulletCollision);
    bullet.onDestroyed(this.onBulletDestroy);
    this.bullets.push(bullet);
    this.stage.addChild(bullet);
  }

  onDestroy(callback) {
    this.on("enemyDead", callback, null, true, this); // forward callback to other listeners
  }

  onBulletCollision(e, data) {
    let { bullet, hitObj: { value: obj } } = data;

    console.log("hitobj", obj);
    if (obj && obj.tag == TAGS.PLAYER) {
      obj.takeDamage();
    }
  }

  onBulletDestroy(e, bullet) {
    // if (bullet.owner != TAGS.ENEMY) {
    //   const isAtMyPosition = this.scene.tileMap.isPointInTile(
    //     bullet.pos.x,
    //     bullet.pos.y,
    //     this.scene.tileMap.getTileCoordRaw(this.pos.x, this.pos.y)
    //   );

    //   if (isAtMyPosition) this.takeDamage();
    // }

    // update list of bullets to keep only active bullets    
    this.bullets = this.bullets.filter(b => b.isAlive);
    this.stage.removeChild(bullet);

  }

  getClosestInRange(objects, range) {
    let inRange = objects.filter(o => this.isObjectInRange(o, range));

    if (inRange.length > 0) {
      let min = null;
      let closest = null;
      for (let obj of inRange) {
        let dist = Vector2.dist(this.pos, obj.pos);
        if (!min || dist < min) {
          min = dist;
          closest = obj;
        }
      }
      return closest;
    }
    return null;
  }

  patrol() {
    let currentPos = this._getCurrentTile();

    let [targetX, targetY] = this.waypoints[this.currentWaypoint];
    this.followTarget(new Vector2(targetX, targetY));

    if (this.forward.magnitude == 0 || (currentPos.x == targetX && currentPos.y == targetY)) {
      this.currentWaypoint = (this.currentWaypoint + 1) % this.waypoints.length;
    }
  }

  takeDamage() {
    this.health = Math.max(0, --this.health);
    if (this.health <= 0) {
      this.dispatchEvent("enemyDead");
    }
  }
}
