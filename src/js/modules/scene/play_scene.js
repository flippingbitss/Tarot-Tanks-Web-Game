import { Container, Text, Bitmap, Shape, Stage, Sprite, Sound } from "createjs-module";
import { Util, Vector2 } from "../../utils";

import {
  WIDTH,
  HEIGHT,
  FULL_HEIGHT,
  FULL_WIDTH,
  TILE_SIZE,
  FONT_FAMILY,
  SCENES
} from "../../constants";

import { ProgressBar, Label } from "../common";
import { Player, Enemy } from "../objects";
import { Camera, TileMap } from "../map";
import assetManager, { gameSpritesheet } from "../../asset_store";
import config from "../../config";
import game from "../../main";
import { Powerup } from "../objects/powerup";

export class PlayScene extends Stage {
  constructor(level) {
    super();

    this.level = config.levels[level];

    this.tarotConfig = { ...config.tarotsConfig.default };
    this.tileMap = new TileMap(this, this.level);

    this.players = [];
    this.enemies = [];
    this.powerups = [];

    // this.stage.scaleX = 0.5;
    // this.stage.scaleY = 0.5;
    this.Main();
  }

  Main() {
    this.bgMusic = Sound.play(this.level.soundConfig.bgMusic, Sound.INTERRUPT_NONE, 1, 0, 1000);

    this.camera = new Camera(this.tileMap, WIDTH, HEIGHT);
    this.stage.snapToPixel = true;

    this.addGround();
    this.addTanks();

    this.powerupContainer = new Container();

    this.tarotCardLabel = new Label("", 30, FONT_FAMILY, "red", 1080, 30);
    this.tarotCardSubLabel = new Label("", 24, FONT_FAMILY, "lightgray", 1000, 70);
    this.centerMark = new Shape();

    // this.HUD.addChild(bar);
    // this.addChild(this.HUD);
    // this.addChild(this.centerMark);
    this.addChild(this.tarotCardLabel);
    this.addChild(this.tarotCardSubLabel);
    this.addChild(this.powerupContainer);

    this.startPowerupSpawner();
    this.startTarotCardSpawner();
  }

  Update(e) {
    // for (let i = 0; i < this.ground.numChildren; i++) {
    //   let element = this.ground.getChildAt(i);
    //   element.visible = this.inViewport(element.x, element.y);
    // }
    if (this.tarotConfig.reviveEnemies) Util.doAtInterval(this.reviveEnemy, e, 3000);
    if (this.tarotConfig.enemiesRepair) Util.doAtInterval(this.repairEnemies, e, 2000);

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
    this.p1Health.Update();
    this.p2Health.Update();

    this.stage.scaleX = this.camera.ZOOM;
    this.stage.scaleY = this.camera.ZOOM;

    // this.stage.x = -this.camera.x;
    // this.stage.y = -this.camera.y;

    this.stage.update();

    // win lose triggers
    this.checkWinLoseConditions();
    this.clearUsedPowerups();
  }

  addTanks() {
    const { enemyTraits, playerTraits } = this.level;
    const { player1: p1, player2: p2 } = playerTraits;

    this.p1Health = new ProgressBar("P1", 1, 50, 30, false);
    this.p2Health = new ProgressBar("P2", 1, 950, 30, false);

    this.players = [
      new Player(p1, playerTraits, this.tarotConfig, this, 0, this.p1Health),
      new Player(p2, playerTraits, this.tarotConfig, this, 1, this.p2Health)
    ];

    this.enemies = enemyTraits.enemies.map(e => new Enemy(enemyTraits, e, this));
    // this.HUD = new Container();

    this.addChild(...this.enemies);
    this.addChild(...this.players);
    this.addChild(this.p1Health);
    this.addChild(this.p2Health);

    let handlePlayerDeath = (e, t) => this.handleTankDeath(e, t, this.players);
    let handleEnemyDeath = (e, t) => this.handleTankDeath(e, t, this.enemies);

    for (let p of this.players) {
      p.onDestroy(handlePlayerDeath);
    }

    for (let e of this.enemies) {
      e.onDestroy(handleEnemyDeath);
    }
  }

  revivePlayer() {
    if (this.players.length >= 2 || this.players.length <= 0) return;
    let alivePlayer = this.players[0];
    let player = null;

    const { enemyTraits, playerTraits } = this.level;
    const { player1: p1, player2: p2 } = playerTraits;

    if (alivePlayer.playerNum) {
      player = new Player(p1, playerTraits, this.tarotConfig, this, 0, this.p1Health);
    } else {
      player = new Player(p2, playerTraits, this.tarotConfig, this, 1, this.p2Health);
    }

    let handlePlayerDeath = (e, t) => this.handleTankDeath(e, t, this.players);
    player.onDestroy(handlePlayerDeath);

    this.players.push(player);
    this.addChild(player);
  }

  reviveEnemy() {
    const { enemyTraits } = this.level;

    let deadEnemies = enemyTraits.enemies.filter(e =>
      this.enemies.every(x => x.waypoints != e.waypoints)
    );
    let randIdx = Math.floor(Math.random() * deadEnemies.length);

    let enemy = new Enemy(enemyTraits, deadEnemies[randIdx], this);

    let handleEnemyDeath = (e, t) => this.handleTankDeath(e, t, this.enemies);
    enemy.onDestroy(handleEnemyDeath)
    this.enemies.push(enemy);
    this.addChild(enemy);
  }

  repairEnemies() {
    for (let e of this.enemies) e.repair();
  }

  addGround() {
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
        this.ground.addChild(tile);
      }
    }
    //    this.ground.cache(0, 0, FULL_WIDTH, FULL_HEIGHT);
  }

  handleTankDeath(e, deadTank, tanks) {
    if (tanks.length) {
      tanks.splice(tanks.findIndex(t => t.id == deadTank.id), 1);
      this.removeChild(deadTank);
    }
  }

  inViewport(x, y) {
    const tsize = TILE_SIZE;

    return (
      x + tsize > this.camera.x - tsize &&
      x < this.camera.x + WIDTH + tsize &&
      (y + tsize > this.camera.y - tsize && y < this.camera.y + HEIGHT + tsize)
    );
  }

  rouletteSelect(array) {
    let fitnessSum = array.reduce((a, b) => a + b.fitnessScore, 0);

    let randomWeight = Math.random() * fitnessSum;
    let cumulative = 0;

    // roulette wheel selection for handling the probability distribution
    let result = array[0];
    for (let r of array) {
      cumulative += r.fitnessScore;
      if (cumulative >= randomWeight) {
        result = r;
        break;
      }
    }

    return result;
  }

  startTarotCardSpawner() {
    let timer = () => {
      this.switchCard();
      setTimeout(timer, Math.random() * 10000 + 12000);
    };
    setTimeout(timer, Math.random() * 10000 + 12000);
  }

  switchCard() {
    let card = this.rouletteSelect(config.tarotsConfig.cards);
    this.applyCard(card);

    this.tarotCardLabel.text = card.name;
    this.tarotCardSubLabel.text = card.subtitle;
  }

  applyCard(card) {
    let newConfig = { ...config.tarotsConfig.default, ...card.trait };
    console.log(this.tarotConfig, newConfig);
    this.tarotConfig = newConfig;

    for (let p of this.players) p.tarotConfig = this.tarotConfig;

    setTimeout(this.resetConfig, card.aliveTime * 1000);
  }

  resetConfig() {
    this.tarotConfig = { ...config.tarotsConfig.default };
    for (let p of this.players) p.tarotConfig = this.tarotConfig;
    this.tarotCardLabel.text = "";
    this.tarotCardSubLabel.text = "";
  }

  checkWinLoseConditions() {
    if (!this.players.length) this.transitionTo(SCENES.END);
    if (!this.enemies.length) {
      if (this.level.id < config.levels.length - 1) {
        this.bgMusic.stop();
        game.switchLevel(this.level.id + 1);
      } else {
        this.transitionTo(SCENES.WON);
      }
    }
  }

  transitionTo(scene) {
    this.bgMusic.stop();
    game.setScene(scene);
  }

  removeWallAt(location) {
    if (!location) return;

    const { x, y } = location;
    let mapIndex = y * this.tileMap.cols + x;
    this.tileMap.grid[mapIndex] = this.tileMap.transformation["."];

    let index = (y - 1) * this.tileMap.cols + x;
    let tile = this.ground.getChildAt(index);
    tile.gotoAndStop(this.tileMap.transformation["."]);
  }

  startPowerupSpawner() {
    let timer = () => {
      this.spawnPowerup();
      setTimeout(timer, this.tarotConfig.powerupSpawnRate * 1000);
    };
    setTimeout(timer, this.tarotConfig.powerupSpawnRate * 1000);
  }

  spawnPowerup() {
    if (this.powerups.length >= this.level.maxPowerupCount) return;

    let { x, y } = this.tileMap.getEmptyLocation();
    let powerupConfig = this.rouletteSelect(config.powerupConfig.powerups);

    let powerup = new Powerup(powerupConfig, x, y, this);
    // console.log(powerup.traits.name, powerup.pos.x, powerup.pos.y);
    this.powerups.push(powerup);
    this.powerupContainer.addChild(powerup);

    setTimeout(() => (powerup.isUsed = true), powerupConfig.pickupTime * 1000);
  }

  removePowerup(powerup) {
    if (this.powerups.length) {
      this.powerupContainer.removeChild(powerup);
      this.powerups.splice(this.powerups.indexOf(powerup), 1);
      //  console.log("removing", powerup.traits.name, powerup.pos.x, powerup.pos.y);
    }
  }

  clearUsedPowerups() {
    let usedPowerups = this.powerups.filter(p => p.isUsed);
    for (let p of usedPowerups) {
      this.removePowerup(p);
    }
  }
}
