import { Sprite, SpriteSheet } from "createjs-module";
import asset_store from "../../asset_store";
import { TILE_SIZE } from "../../constants";

export default class TileMap {
  constructor() {
    this.tileSize = TILE_SIZE;
    this.rows = 12;
    this.cols = 21;

    this.tileSet = new SpriteSheet({
      images: [asset_store.getResult("tileSet")],
      frames: {
        width: this.tileSize,
        height: this.tileSize,
        count: 5,
        regX: 0,
        regY: 0,
        spacing: 0,
        margin: 0
      }
    });

    console.log(this.tileSet.getNumFrames());
    // prettier-ignore
    // this.grid = [
    //         4, 3, 3, 3,  3, 3, 3, 3,  3, 3, 3, 3,  3, 3, 3, 3,  3, 3, 3, 3, 4,
    //         4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
    //         4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
    //         4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
    //         4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
    //         4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
    //         4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
    //         4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
    //         4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
    //         4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
    //         4, 4, 4, 0,  4, 4, 4, 4,  4, 4, 4, 4,  4, 4, 4, 4,  4, 4, 4, 4, 4,
    //         4, 4, 4, 0,  0, 3, 3, 3,  3, 3, 3, 3,  3, 3, 3, 3,  3, 3, 3, 3, 3
    //     ];

    // prettier-ignore
    this.grid = [
        2, 2, 2, 2,  2, 2, 2, 2,  2, 4, 4, 4,  2, 2, 2, 2,  2, 2, 2, 2, 2,
        2, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 2,
        2, 0, 4, 4,  4, 4, 0, 0,  0, 0, 0, 0,  0, 0, 0, 4,  4, 4, 4, 0, 2,
        2, 0, 1, 1,  1, 1, 0, 0,  0, 1, 1, 1,  0, 0, 0, 1,  1, 1, 1, 0, 2,
        2, 0, 1, 1,  1, 1, 0, 0,  0, 1, 1, 1,  0, 0, 0, 1,  1, 1, 1, 0, 2,
        2, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 2,
        2, 0, 0, 0,  0, 0, 4, 4,  4, 4, 4, 4,  4, 4, 4, 0,  0, 0, 0, 0, 2,
        2, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 2,
        2, 0, 0, 0,  0, 0, 0, 2,  2, 1, 1, 1,  2, 2, 0, 0,  0, 0, 0, 0, 2,
        2, 0, 0, 0,  0, 0, 0, 2,  1, 1, 1, 1,  1, 2, 0, 0,  0, 0, 0, 0, 2,
        2, 0, 0, 0,  0, 0, 0, 1,  1, 1, 1, 1,  1, 1, 0, 0,  0, 0, 0, 0, 2,
        2, 2, 2, 2,  2, 2, 2, 2,  2, 2, 2, 2,  2, 2, 2, 2,  2, 2, 2, 2, 2
    ]
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

  getTileCoordExact(x, y) {
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

  isSolidTileAtXY(x, y) {
    const col = this.getCol(x);
    const row = this.getRow(y);

    // tiles 3 and 5 are solid -- the rest are walkable , return TRUE if any tile is solid
    let tile = this.getTileType(row, col);
    let isSolid = tile === 2 || tile === 4;
    return isSolid;
  }
}
