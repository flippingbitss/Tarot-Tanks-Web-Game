import { Sprite, SpriteSheet } from "createjs-module";
import {assetManager} from "../../asset_store";
import { TILE_SIZE } from "../../constants";
import game from "../../main";

export default class TileMap {
  constructor(scene) {
    this.tileSize = TILE_SIZE;
    this.rows = 12;
    this.cols = 21;

    this.scene = scene;
    this.solidTiles = [0.1, 1, 100];

    this.tileSet = new SpriteSheet({
      images: [assetManager.getResult("map_spritesheet")],
      frames: {
        width: this.tileSize,
        height: this.tileSize,
        count: 3,
        regX: 0,
        regY: 0,
        spacing: 1,
        margin: 0
      }
    });

    console.log(this.tileSet.getNumFrames());

    let transform = { 9: -1, 0: 0.1 };
    // prettier-ignore
    this.grid = [
      9, 9, 9, 9,  9, 9, 9, 9,  9, 9, 9, 9,  9, 9, 9, 9,  9, 9, 9, 9,  9, 
      1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1, 1,  1 ,1, 1, 1,  1,      
      1, 0, 0, 0,  2, 2, 2, 2,  0, 0, 0, 0,  0, 2, 2, 2,  2, 0, 0, 0,  1, 
      1, 0, 0, 0,  2, 2, 2, 2,  0, 0, 0, 0,  0, 2, 2, 2,  2, 0, 0, 0,  1, 
      1, 0, 0, 0,  2, 2, 2, 2,  2, 2, 2, 2,  2, 2, 2, 2,  2, 0, 0, 0,  1,
      1, 2, 2, 2,  2, 2, 2, 2,  2, 2, 2, 2,  2, 2, 2, 2,  2, 2, 2, 2,  1,
      1, 2, 2, 2,  2, 2, 2, 2,  0, 0, 0, 0,  0, 2, 2, 2,  2, 2, 2, 2,  1,
      1, 2, 2, 1,  1, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  1, 1, 2, 2,  1,
      1, 2, 2, 1,  1, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  1, 1, 2, 2,  1,
      1, 2, 2, 2,  2, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  2, 2, 2, 2,  1, 
      1, 2, 2, 2,  2, 2, 2, 2,  0, 0, 0, 0,  0, 2, 2, 2,  2, 2, 2, 2,  1, 
      1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1, 1,  1 ,1, 1, 1,  1
    ].map(e=> e in transform ? transform[e] : e);

    // // prettier-ignore

    // this.grid = [
    //     -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1,-1,
    //     2, 2, 2, 2,  2, 2, 2, 2,  2, 4, 4, 4,  2, 2, 2, 2,  2, 2, 2, 2, 2,
    //     2, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 2,
    //     2, 0, 4, 4,  4, 4, 0, 0,  0, 0, 0, 0,  0, 0, 0, 4,  4, 4, 4, 0, 2,
    //     2, 0, 1, 1,  1, 1, 0, 0,  0, 1, 1, 1,  0, 0, 0, 1,  1, 1, 1, 0, 2,
    //     2, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 2,
    //     2, 0, 0, 0,  0, 0, 4, 4,  4, 4, 4, 4,  4, 4, 4, 0,  0, 0, 0, 0, 2,
    //     2, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 2,
    //     2, 0, 0, 0,  0, 0, 0, 2,  2, 1, 1, 1,  2, 2, 0, 0,  0, 0, 0, 0, 2,
    //     2, 0, 0, 0,  0, 0, 0, 2,  1, 1, 1, 1,  1, 2, 0, 0,  0, 0, 0, 0, 2,
    //     2, 0, 0, 0,  0, 0, 0, 1,  1, 1, 1, 1,  1, 1, 0, 0,  0, 0, 0, 0, 2,
    //     2, 2, 2, 2,  2, 2, 2, 2,  2, 2, 2, 2,  2, 2, 2, 2,  2, 2, 2, 2, 2
    // ]
  }

  getTileType(row, col) {
    return this.grid[row * this.cols + col];
  }

  getRow(y) {
    return Math.floor(y / this.tileSize);
  }

  getCol(x) {
    return Math.floor(x / this.tileSize);
  }

  getTileCoord(x, y) {
    return {
      row: this.getRow(y),
      col: this.getCol(x)
    };
  }

  getTileCoordRaw(x, y) {
    return {
      row: y / this.tileSize,
      col: x / this.tileSize
    };
  }

  getTileCoordRound(x, y) {
    return {
      row: Math.round(y / this.tileSize),
      col: Math.round(x / this.tileSize)
    };
  }

  isSameTileCoord(x1, y1, x2, y2) {
    let { row: row1, col: col1 } = this.getTileCoordRound(x1, y1);
    let { row: row2, col: col2 } = this.getTileCoordRound(x2, y2);

    return row1 == row2 && col1 == col2;
  }

  isPointInTile(x, y, tile) {
    let { row, col } = tile;

    let tx = col * TILE_SIZE;
    let ty = row * TILE_SIZE;

    let [left, right, top, bottom] = [
      tx - TILE_SIZE / 2,
      tx + TILE_SIZE / 2,
      ty - TILE_SIZE / 2,
      ty + TILE_SIZE / 2
    ];

    if (x >= left && x <= right && y >= top && y <= bottom) {
      return true;
    }

    return false;
  }

  isSolidTileAtXY(x, y) {
    const col = this.getCol(x);
    const row = this.getRow(y);

    // tiles 2 and 4 are solid -- the rest are walkable , return TRUE if any tile is solid
    let tile = this.getTileType(row, col);
    let isSolid = this.solidTiles.indexOf(tile) >= 0;
    return isSolid;
  }
}
