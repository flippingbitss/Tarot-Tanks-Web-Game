export default class Camera {
  constructor(map, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;

    this.maxX = map.cols * map.tileSize - width;
    this.maxY = map.rows * map.tileSize - height;

    this.SPEED = 5;

    this.ZOOM = .5;

  }

  move(dirx, diry) {
    let x = this.x + dirx * this.SPEED;
    let y = this.y + diry * this.SPEED;

    this.moveTo(x,y);
  }

  moveTo(x, y) {
    this.x = Math.max(0, Math.min(x, this.width));
    this.y = Math.max(0, Math.min(y, this.height));
  }
}
