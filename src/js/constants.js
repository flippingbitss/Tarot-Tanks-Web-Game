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
  { id: "brickWall", src: "/assets/images/brick_wall.jpg" },
  { id: "tileSet", src: "/assets/images/sample_tiles.png" },
  { id: "map_spritesheet", src: "/assets/images/map_spritesheet.png" },
  { id: "bullet", src: "/assets/images/bullet.png" },
  { id: "enemy", src: "/assets/images/enemyred.png" }
];

export const SPRITES_SPEC = {
  images: ["assets/images/sprite_sheet.png"],

  frames: {
    width: 120,
    height: 120,
    count: 20,
    regX: 32,
    regY: 64,
    spacing: 0,
    margin: 0
  },
  animations: {
    bullet: { frames: [0] }
  }
};

export const SCENES = Object.freeze({
  START: Symbol('start'),
  PLAY: Symbol('play'),
  END: Symbol('end')
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


export const TAGS = Object.freeze({
  ENEMY: Symbol('enemy'),
  PLAYER: Symbol('player')
})

export const FONT_FAMILY = "Press Start 2P";
