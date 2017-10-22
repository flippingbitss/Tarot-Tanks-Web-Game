import { Bitmap, Ticker, Shape } from "createjs-module";
import { Vector2 } from "../../utils";
import { DIR, FULL_WIDTH, FULL_HEIGHT, TAGS } from "../../constants";
import game from "../../main";

export class Bullet extends Shape {
  /**
     * Creates an instance of Button.
     *
     * @param {any} image
     * @param {number} x
     * @param {number} y
     * @param {boolean} isCentered
     */

  constructor(image, x, y, isCentered, dir, owner = TAGS.ENEMY) {
    super();

    this.graphics.beginFill("red").drawCircle(this.x, this.y, 6);

    // if (isCentered) {
    //   let bounds = this.getBounds();
    //   this.regX = bounds.width * 0.5;
    //   this.regY = bounds.height * 0.5;
    // }
    this.owner = owner;
    this._position = new Vector2(x, y);
    this.pos = this._position;
    this.forward = dir;
    this.speed = 10;

    this.hitObj = { value: null };
    this.isAlive = true;
    // Ticker.on("tick", this.Update);
  }

  get pos() {
    return this._position;
  }

  set pos(newPos) {
    this.x = newPos.x;
    this.y = newPos.y;
    this._position = newPos;
  }

  onDestroyed(callback) {
    this.on("destroy", callback, null, true, this);
  }

  onCollision(callback) {
    this.on("collision", callback, null, true, { bullet: this, hitObj: this.hitObj });
  }

  inBounds() {
    return this.x >= 0 && this.x < FULL_WIDTH && this.y >= 0 && this.y < FULL_HEIGHT;
  }

  // grid indexing implementation
  isColliding(pos) {
    const { x, y } = pos;
    let map = game.scene.tileMap;
    let isColliding = map.isSolidTileAtXY(x, y);
    let collidables = null;

    this.hitObj.value = null;
    if (this.owner == TAGS.PLAYER) {
      collidables = game.scene.enemies;
    } else if (this.owner == TAGS.ENEMY) {
      collidables = game.scene.players;
    }

    if (collidables) {
      for (let obj of collidables) {
        let tile = map.getTileCoordRaw(obj.pos.x, obj.pos.y);
        if (map.isPointInTile(this.x, this.y, tile)) {
          isColliding = true;
          this.hitObj.value = obj;
          this.dispatchEvent("collision");
          break;
        }
      }
    }

    return isColliding;
  }

  // Old bounding box implementation
  /*
  isColliding() {
    let walls = game.scene.walls;
    // game.scene.walls;
    // console.log(this.stage.mouseX)
    for (let wall of walls) {
      let localPos = wall.globalToLocal(this.x, this.y);
      // let wallLocal = this.stage.globalToLocal(wall.x,wall.y)
      // console.log(localPos.x,localPos.y, "   ", this.x, this.y)
      // console.log(wallLocal.x, wallLocal.y, "   ", wall.x, wall.y)
      
      let wallWidth = wall.getBounds().width;
      let wallHeight = wall.getBounds().height;
      if (
        this.x >= wall.x &&
        this.x <= wall.x + wallWidth &&
        this.y >= wall.y &&
        this.y <= wall.y + wallHeight
      ) {
        console.log("hit with wall");
        return true;
      }

      // if (wall.hitTest(localPos.x, localPos.y)) {
      //   console.log("hit with wall");
      //   return true;
      // }
    }
    return false;
  }
  */

  Move() {
    let newPos = this.forward.scale(this.speed);
    this.pos = this.pos.add(newPos);
    if (!this.inBounds() || this.isColliding(this.pos)) {
      if (this.isAlive) {
        console.log("kill bullet");
        this.isAlive = false;
        this.dispatchEvent("destroy");
      }
    }
  }

  Update() {
    this.Move();
  }
}
