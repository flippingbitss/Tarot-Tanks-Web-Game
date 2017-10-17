import { Bitmap, Ticker, Tween, Event, Sprite, Shape } from "createjs-module";
import { DIR, KEYS, HEIGHT, WIDTH, FULL_HEIGHT, FULL_WIDTH, TILE_SIZE } from "../../constants";
import { Vector2 ,Util} from "../../utils";
import { GameObject, Bullet } from ".";
import assetManager from "../../asset_store";

export class Enemy extends GameObject {
  constructor(x, y, speed, scene) {
    super(assetManager.getResult("enemy"), x, y, speed, scene);

    let { width, height } = this.getBounds();
    this.setBounds(x, y, TILE_SIZE, TILE_SIZE);

    this.scaleX = 120 / width;
    this.scaleY = 120 / height;

    this.movement = [false, false, false, false];

    this.bullets = [];

    this.playerMark = new Shape();
    this.enemyMark = new Shape();

    this.Main();
  }

  Main() {
    console.log("TESTING MAIN ");
    // this.interval = setInterval(this.shoot, 2000);

    this.setupWaypoints();
    this.waypoints.forEach(([x, y]) => {
      let tile = new Sprite(this.scene.tileMap.tileSet);
      tile.gotoAndStop(1);
      tile.x = x * TILE_SIZE;
      tile.y = y * TILE_SIZE;

      this.scene.addChild(tile);
    });

    this.playerMark.graphics.beginStroke("blue").drawRect(this.x, this.y, TILE_SIZE, TILE_SIZE);
    this.scene.addChild(this.playerMark, this.enemyMark);
  }

  Update(tick) {
    if (this.isObjectInRange(this.scene.player, 200)) {
      // this._continueShoot();
      this.doAtInterval(this.shoot, tick, 2000);

      let { x, y } = this.scene.player.pos;
      let { row, col } = this.scene.tileMap.getTileCoordRound(x - TILE_SIZE / 2, y - TILE_SIZE / 2);

      this.playerMark.graphics.clear();
      this.playerMark.graphics
        .beginStroke("blue")
        .drawRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);

      this.followTarget(new Vector2(col, row));
    } else {
      // clearInterval(this.interval);
      this.patrol();
    }
    this.Move();

    for (let bullet of this.bullets) {
      bullet.Update();
    }
    this.stage.update();
  }


  setupWaypoints() {
    this.currentWaypoint = 0;
    this.waypoints = [[6, 5], [15, 5]];
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
      assetManager.getResult("bullet"),
      this.x,
      this.y,
      true,
      this.forward,
      this.bullets.length
    );

    this.stage.addChild(bullet);
    bullet.onDestroyed(this._removeBullets);
    this.bullets.push(bullet);
  }

  _removeBullets(e, bullet) {
    this.bullets = this.bullets.filter(b => b.isAlive);
    this.stage.removeChild(bullet);
  }

  patrol() {
    let currentPos = this._getCurrentTile();

    let [targetX, targetY] = this.waypoints[this.currentWaypoint];
    this.followTarget(new Vector2(targetX, targetY));

    if (this.forward.magnitude == 0 || (currentPos.x == targetX && currentPos.y == targetY)) {
      this.currentWaypoint = (this.currentWaypoint + 1) % this.waypoints.length;
    }
  }

}
