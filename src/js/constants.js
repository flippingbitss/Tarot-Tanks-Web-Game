export const WIDTH = 1280;
export const HEIGHT = 720;

export const MANIFEST = [
  { id: "backButton", src: "/assets/images/backButton.png" },
  { id: "nextButton", src: "/assets/images/nextButton.png" },
  { id: "startButton", src: "/assets/images/startButton.png" },
  { id: "player", src: "/assets/images/player_tank.png" },
  { id: "ground", src: "/assets/images/ground2.jpg" },
  { id: "cloud", src: "/assets/images/cloud.png" },
  { id: "brickWall", src: "/assets/images/brick_wall.jpg" },
  { id: "bullet", src: "/assets/images/bullet.png" },
  { id: "ocean", src: "/assets/images/ocean.gif" }
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
})


export const KEYS = Object.freeze({
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
})