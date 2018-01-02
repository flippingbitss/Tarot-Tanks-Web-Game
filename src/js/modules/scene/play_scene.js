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
import assetManager from "../../asset_store";
import config from "../../config";
import game from "../../main";

export class PlayScene extends Stage {
  constructor(level) {
    console.log("creating play scene", level);
    super();

    this.level = config.levels[level];

    this.tarotConfig = { ...config.tarotsConfig.default };
    this.currentTarotCard = null;
    this.tileMap = new TileMap(this, this.level);

    this.players = [];
    this.enemies = [];

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

    this.tarotCardLabel = new Label("The Magician", 30, FONT_FAMILY, "red", 1080, 30);
    this.centerMark = new Shape();

    // this.HUD.addChild(bar);
    // this.addChild(this.HUD);
    // this.addChild(this.centerMark);
    this.addChild(this.currentTarotCard);
  }

  Update(e) {
    // for (let i = 0; i < this.ground.numChildren; i++) {
    //   let element = this.ground.getChildAt(i);
    //   element.visible = this.inViewport(element.x, element.y);
    // }

    //  Util.doAtInterval(this.switchCard, Math.random() * 10 + 5);

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

    // win lose triggers
    if (!this.players.length) this.transitionTo(SCENES.END);
    if (!this.enemies.length) this.transitionTo(SCENES.WON);

    this.stage.scaleX = this.camera.ZOOM;
    this.stage.scaleY = this.camera.ZOOM;

    // this.stage.x = -this.camera.x;
    // this.stage.y = -this.camera.y;

    this.stage.update();
  }

  transitionTo(scene) {
    this.bgMusic.stop();
    game.setScene(scene);
  }

  addTanks() {
    const { enemyConfig, playerConfig } = this.level;
    const { player1: p1, player2: p2 } = playerConfig;

    this.p1Health = new ProgressBar("P1", 1, 100, 30, false);
    this.p2Health = new ProgressBar("P2", 1, 950, 30, false);

    this.players.push(
      new Player(p1, playerConfig, this, 0, this.p1Health),
      new Player(p2, playerConfig, this, 1, this.p2Health)
    );

    this.enemies = enemyConfig.enemies.map(e => new Enemy(enemyConfig, e, this));
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

  addGround() {
    this.ground = new Container();
    this.addChild(this.ground);
    for (let i = 0; i < this.tileMap.rows; i++) {
      for (let j = 0; j < this.tileMap.cols; j++) {
        let tileType = this.tileMap.getTileType(i, j);
        console.log(tileType);
        if (tileType == -1) continue;
        let tile = new Sprite(this.tileMap.tileSet);
        tile.gotoAndStop(tileType);
        tile.x = j * TILE_SIZE;
        tile.y = i * TILE_SIZE;
        this.ground.addChild(tile);
      }
    }
    this.ground.cache(0, 0, FULL_WIDTH, FULL_HEIGHT);
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

  drawTarotCard() {
    let allCards = config.tarotsConfig.cards;

    let fitnessSum = allCards.reduce((a, b) => a + b.pickupScore, 0);

    let randomWeight = Math.random() * fitnessSum;
    let cumulative = 0;

    // roulette wheel selection for handling the probability distribution
    let resultCard = allCards[0];
    for (let card of allCards) {
      cumulative += card.pickupScore;
      if (cumulative >= randomWeight) {
        resultCard = card;
        break;
      }
    }

    return resultCard;
  }

  switchCard() {
    let card = this.drawTarotCard();

    while (card != this.currentTarotCard) {
      card = this.drawTarotCard();
    }

    this.applyCard(card);

    this.tarotCardLabel.text = card.name;
  }

  applyCard(card) {
    let newConfig = { ...config.tarotsConfig.default, ...card.trait };
  }
}
