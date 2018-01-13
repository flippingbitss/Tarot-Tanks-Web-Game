import { Bitmap, Ticker, Tween, Event, Sprite, Shape, Container } from "createjs-module";
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
import PriorityQueue from "js-priority-queue";

export class Enemy extends GameObject {
  constructor(enemyTraits, enemyData, scene) {
    const [x, y] = enemyData.pos;
    super(
      enemyTraits.sprite,
      x * TILE_SIZE + TILE_SIZE / 2,
      y * TILE_SIZE + TILE_SIZE / 2,
      enemyTraits.speed,
      enemyTraits.health,
      scene
    );

    this.tag = TAGS.ENEMY;
    this.traits = enemyTraits;

    let { width, height } = this.getBounds();
    this.setBounds(x, y, TILE_SIZE, TILE_SIZE);
    this.scaleX = 120 / width;
    this.scaleY = 120 / height;

    this.movement = [false, false, false, false];
    this.waypoints = enemyData.waypoints.map(w => new Vector2(w[0], w[1])) || [];

    this.pathToTarget = [];
    this.pathToWaypoint = [];
    this.isPatrolling = true;
    this.bullets = [];

    this.pathMarker = new Container();
    
    this.Main();
  }

  Main() {
    this.currentWaypoint = 0;
    this.currentPoint = 0;
    this.currentPatrolPoint = 0;
    this.scene.stage.addChild(this.pathMarker);
  }

  Update(tick) {
    this.stop();
    let closestPlayer = this.getClosestInRange(this.scene.players, this.traits.followRange + 1000);
    if (closestPlayer) {
      this.doAtInterval(this.shoot, tick, 800);

      let { x, y } = closestPlayer.pos;
      let { row, col } = this.scene.tileMap.getTileCoordRound(x - TILE_SIZE / 2, y - TILE_SIZE / 2);

      Util.doAtInterval(this.updatePath, tick, 1000, closestPlayer);

      if (this.pathToTarget.length > 0) {
        this.followPath();
      } else {
        this.patrol();
      }
    } else {
      this.patrol();
    }

   
    // let all = this.scene.players.concat(this.scene.enemies)

    // for(let tank of all){
    //   if(tank != this){
    //     if(!tank.isCollidingWith(this)){
    //       console.log(false);
    //     }
    //     else
    //       console.log(true);
    //   }
    // }
    // console.log("-----");
 
    this.Move(tick);

    for (let bullet of this.bullets) {
      bullet.Update();
    }
    this.stage.update();
  }

  isKeyDown() {
    return !this.movement.every(e => !e);
  }

  shoot() {
    let bullet = new Bullet(this.x, this.y, 30, this.scene, this.forward, TAGS.ENEMY);

    bullet.onCollision(this.onBulletCollision);
    bullet.onCollisionDestructible(this.OnBulletCollisionDestructible);
    bullet.onDestroyed(this.onBulletDestroy);
    this.bullets.push(bullet);
    this.stage.addChild(bullet);
  }

  onDestroy(callback) {
    this.on("enemyDead", callback, null, true, this); // forward callback to other listeners
  }

  onBulletCollision(e, data) {
    let { bullet, hitObj: { value: obj } } = data;
    if (obj && obj.tag == TAGS.PLAYER) {
      obj.takeDamage();
    }
  }

  onBulletDestroy(e, bullet) {
    // update list of bullets to keep only active bullets
    this.bullets = this.bullets.filter(b => b.isAlive || b.forward.magnitude == 0);
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

  /**
   * @param {Vector2} pos
   * @memberof Enemy
   */
  moveTo(pos) {
    let [targetX, targetY] = [pos.x, pos.y];

    let currentTile = this._getCurrentTile();
    let dir = currentTile.clone();

    //    const tolerance = 0.05;

    if (targetX != currentTile.x) {
      dir.x = targetX;
    } else if (targetY != currentTile.y) {
      dir.y = targetY;
    }

    this.forward = dir.subtract(currentTile).normalized;
  }

  followPath() {
    let currentPos = this._getCurrentTile();
    let targetPos = this.pathToTarget[this.currentPoint];
  // console.log(targetPos.x,targetPos.y);
    this.moveTo(targetPos);

    if (this.forward.magnitude == 0 || (currentPos.x == targetPos.x && currentPos.y == targetPos.y)) {
      this.currentPoint = (this.currentPoint + 1) % this.pathToTarget.length;
    }
  }

  patrol() {
    let currentPos = this._getCurrentTile();

    let targetPos = this.waypoints[this.currentWaypoint];

    this.moveTo(targetPos);

    if (
      this.forward.magnitude == 0 ||
      (currentPos.x == targetPos.x && currentPos.y == targetPos.y)
    ) {
      this.currentWaypoint = (this.currentWaypoint + 1) % this.waypoints.length;
    }
  }

  updatePath(player) {
    let path = this.findPathToPos(player);
    path.pop();
    this.pathToTarget = path.map(p => {
      let tile = this.scene.tileMap.getTileFromIndex(p);
      return new Vector2(tile.col, tile.row);
    });

    this.pathMarker.removeAllChildren();
    this.pathToTarget.map(e => {
      let tile = new Shape();
      tile.graphics
        .beginFill("blue")
        .drawRect(e[0] * TILE_SIZE + TILE_SIZE / 2 - 20, e[1] * TILE_SIZE + TILE_SIZE / 2 - 20, 20, 20)
        .endStroke();
      this.pathMarker.addChild(tile);
    });

    this.currentPoint = 0;
    // console.table(this.pathToTarget)
  }

  takeDamage() {
    this.health = Math.max(0, --this.health);
    this.updateSkin();
    if (this.health <= 0) {
      this.dispatchEvent("enemyDead");
    }
  }

  repair() {
    this.health = Math.min(this.traits.health, ++this.health);
    this.updateSkin();
  }

  updateSkin() {
    const startHealth = this.traits.health;
    if (this.health <= startHealth * 1 / 3) {
      this.gotoAndPlay("enemyRed");
    } else if (this.health > startHealth * 1 / 3 && this.health <= startHealth * 2 / 3) {
      this.gotoAndPlay("enemyYellow");
    } else if (this.health > startHealth * 2 / 3) {
      this.gotoAndPlay("enemyGreen");
    }
  }

  // A* Pathfinding
  findPathToPos(position) {
    let map = this.scene.tileMap;

    let frontier = new PriorityQueue({ comparator: (a, b) => a.cost - b.cost });

    let cameFrom = Array(this.scene.tileMap.grid.length);
    let costSoFar = Array(this.scene.tileMap.grid.length);
    
    let start = this._getCurrentTile().floor();
    let startIndex = map.getIndex(start.y, start.x);

    let target = map.getTileCoordRaw(position.x, position.y);
    let targetIndex = map.getIndex(Math.floor(target.row), Math.floor(target.col));

    frontier.queue({ index: startIndex, location: start });
    cameFrom[startIndex] = null;
    costSoFar[startIndex] = 0;

    while (frontier.length > 0) {
      let { index: currentIndex, location: current } = frontier.dequeue();

      if (currentIndex == targetIndex) {
        return this.reconstructPath(cameFrom, startIndex, targetIndex);
      }

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let r = current.y + j;
          let c = current.x + i;
          let nextIndex = map.getIndex(r, c);

          if (nextIndex >= 0 && nextIndex < map.grid.length) {
            if ((r != current.y || c != current.x) && !(r != current.y && c != current.x)) {
              if (map.grid[nextIndex] != map.transformation["."] && map.grid[nextIndex] != map.transformation["d"]) continue;

              let newCost =
                costSoFar[currentIndex] + this.manhattanDistance(current.x, current.y, c, r);

              if (!costSoFar[nextIndex] || newCost < costSoFar[nextIndex]) {
                costSoFar[nextIndex] = newCost;
                let finalCost = newCost + this.manhattanDistance(c, r, target.col, target.row);
                frontier.queue({ index: nextIndex, location: { x: c, y: r }, cost: finalCost });
                cameFrom[nextIndex] = currentIndex;
              }
            }
          }
        }
      }
    }
  }

  // create path generator
  reconstructPath(cameFrom, start, goal) {
    let current = goal;
    let path = [];
    while (current != start) {
      path.push(current);
      current = cameFrom[current];
    }

    return path.reverse();
  }

  manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  // // lazy circular path iterator - thanks es6 generators
  // *cirucularWalkPath(path) {
  //   while (true) yield* this.walkPath(path);
  // }

  // // lazy circular path iterator - thanks es6 generators
  // *walkPath(path) {
  //   let currentLoc = this._getCurrentTile().floor();
  //   let i = 0;

  //   let currentPoint = path[i];
  //   if (currentLoc.equals(currentPoint)) {
  //     i++;
  //     yield path[i];
  //   }

  //   yield currentPoint;
  // }
}
