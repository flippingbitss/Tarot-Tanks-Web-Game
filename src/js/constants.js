export const WIDTH = 1260;
export const HEIGHT = 720;

export const FULL_WIDTH = WIDTH * 2;
export const FULL_HEIGHT = HEIGHT * 2;

export const TILE_SIZE = 120;

export const MANIFEST = [
  { id: "backButton", src: "/assets/images/backButton.png" },
  { id: "nextButton", src: "/assets/images/nextButton.png" },
  { id: "startButton", src: "/assets/images/startButton.png" },
  { id: "player", src: "/assets/images/player_tank.png" },
  { id: "ground", src: "/assets/images/ground2.jpg" },
  { id: "cloud", src: "/assets/images/cloud.png" },
  { id: "brickWall", src: "/assets/images/brick_wall.jpg" },
  { id: "tileSet", src: "/assets/images/sample_tiles.png" },
  { id: "bullet", src: "/assets/images/bullet.png" },
  { id: "enemy", src: "/assets/images/enemyred.png" }
];

export const SCENES = Object.freeze({
  START: 0,
  PLAY: 1,
  END: 2
});

export const DIR = Object.freeze({
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
});

export const KEYS = Object.freeze({
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
});

export const FONT_FAMILY = "Press Start 2P";