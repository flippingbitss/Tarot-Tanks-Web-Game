import { Sprite, SpriteSheet } from "createjs-module";
import asset_store from "../../asset_store";

export default class TileMap {
  constructor() {
    this.tileSize = 120;
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
    this.grid = [
            4, 3, 3, 3,  3, 3, 3, 3,  3, 3, 3, 3,  3, 3, 3, 3,  3, 3, 3, 3, 4,
            4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
            4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
            4, 0, 0, 5,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 5, 0, 4,
            4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
            4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
            4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
            4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
            4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
            4, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 4,
            4, 4, 4, 0,  5, 4, 4, 4,  4, 4, 4, 4,  4, 4, 4, 4,  4, 4, 4, 4, 4,
            4, 4, 4, 0,  0, 3, 3, 3,  3, 3, 3, 3,  3, 3, 3, 3,  3, 3, 3, 3, 3
        ];
  }

  getTile(row, col) {
    return this.grid[row * this.cols + col];
  }
}
