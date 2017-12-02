export const WIDTH = 1260;
export const HEIGHT = 720;

export const FULL_WIDTH = WIDTH * 2;
export const FULL_HEIGHT = HEIGHT * 2;

export const TILE_SIZE = 120;

export const MANIFEST = [
  { id: "player", src: "/assets/images/player_tank.png" },
  { id: "tile_set", src: "/assets/images/sprite_sheet.png" },
  { id: "menu_background", src: "/assets/images/menu_background.jpg" },
  { id: "map_spritesheet", src: "/assets/images/map_spritesheet.png" },
  { id: "enemy", src: "/assets/images/enemyred.png" }
];

export const SPRITES_SPEC = {
  images: ["/assets/images/sprite_sheet.png"],

  frames: [
    // player green
    [640, 0, 120, 120],
    [760, 0, 120, 120],
    [640, 120, 120, 120],
    [760, 120, 120, 120],
    [640, 240, 120, 120],
    [760, 240, 120, 120],

    // player yellow
    [400, 240, 120, 120],
    [520, 240, 120, 120],
    [400, 360, 120, 120],
    [520, 360, 120, 120],
    [400, 480, 120, 120],
    [520, 480, 120, 120],

    // player red
    [0, 240, 120, 120],
    [120, 240, 120, 120],
    [0, 360, 120, 120],
    [120, 360, 120, 120],
    [0, 480, 120, 120],
    [120, 480, 120, 120],

    // enemy red
    [280, 240, 120, 120],
    [280, 360, 120, 120],
    [280, 480, 120, 120],

    // bullet
    [0, 0, 40, 120]
  ],

  animations: {
    playerGreen: { frames: [0, 1, 2, 3, 4, 5], speed: 0.02 },
    playerYellow: { frames: [6, 7, 8, 9, 10, 11], speed: 0.02 },
    playerRed: { frames: [12, 13, 14, 15, 16, 17], speed: 0.02 },
    enemyRed: { frames: [18, 19, 20], speed: 0.02 },
    bullet: [21]
  }

  // {
  //   width: 120,
  //   height: 120,
  //   count: 20,
  //   regX: 0,
  //   regY: 0,
  //   spacing: 0,
  //   margin: 0
  // },
  // animations: {
  // }
};

export const SCENES = Object.freeze({
  START: Symbol("start"),
  PLAY: Symbol("play"),
  END: Symbol("end")
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
  ENEMY: Symbol("enemy"),
  PLAYER: Symbol("player")
});

export const FONT_FAMILY = "Press Start 2P";
