import { Bitmap, TickerEvent, Sprite } from "createjs-module";
import { TILE_SIZE, FULL_HEIGHT, FULL_WIDTH } from "../../constants";
import { Vector2, Util } from "../../utils";
import { gameSpritesheet } from "../../asset_store";

export class GameObject extends Sprite {
  constructor(frameOrAnimation, x, y, speed = 5, scene) {
    super(gameSpritesheet, frameOrAnimation);

    this.stop();

    this.regX = this.getBounds().width * 0.5;
    this.regY = this.getBounds().height * 0.5;

    this._position = new Vector2(x, y);
    this.pos = this._position;

    this.forward = Vector2.Down;
    this.rotation = this.forward.angle(Vector2.Down);
    this.speed = speed;

    this.tileType = 100;
    this.health = 10;
    this.scene = scene;
  }

  get pos() {
    return this._position;
  }

  set pos(newPos) {
    this.x = newPos.x;
    this.y = newPos.y;
    this._position = newPos;
  }

  Move(e) {
    this.rotation = 360 - this.forward.atan2(Vector2.Down) * 180 / Math.PI;

    let pos = this.pos.add(this.forward.scale(this.speed));

    let { width, height } = this.getBounds();
    pos.x = Util.clamp(pos.x, width / 2, FULL_WIDTH - width / 2);
    pos.y = Util.clamp(pos.y, height / 2, FULL_HEIGHT - height / 2);

    if (!this.isColliding(pos)) {
      this.pos = pos;
      if (this.paused) this.play();
    }
  }

  /**
   * @param {Vector2} pos
   * @memberof GameObject
   */
  isColliding(pos) {
    const { x, y } = pos;

    let map = this.scene.tileMap;
    let skinWidth = 30;
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
    return isColliding;
  }

  /**
   * @param {GameObject} obj
   * @memberof GameObject
   */
  isObjectInRange(obj, range) {
    let objPos = obj.pos;
    let myPos = this.pos;
    if (Vector2.dist(myPos, objPos) < range) {
      return true;
    }
  }

  /**
   * @param {Function} callback
   * @param {TickerEvent} tick
   * @param {Number} rate
   * @memberof GameObject
   */
  doAtInterval(callback, tick, rate) {
    this.time = this.time || tick.time;

    let newTime = tick.time;
    if (newTime - this.time > rate) {
      callback();
      this.time = newTime;
    }
  }

  /**
   * @returns {Vector2} currentTile on the grid
   * @memberof GameObject
   */
  _getCurrentTile() {
    let { row, col } = this.scene.tileMap.getTileCoordRaw(
      this.x - TILE_SIZE / 2,
      this.y - TILE_SIZE / 2
    );
    return new Vector2(col, row);
  }

  OnBulletCollisionDestructible(e, data) {
    let { bullet, hitWall: { value: location } } = data;
    if (location) {
      this.scene.removeWallAt(location);
    }
  }

  Update() {}
  Main() {}
}
