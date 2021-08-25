export const GAME_STATUS = {
  SUCCESS: "success",
  FAIL: "fail",
  MAIN: "main",
};

export const GAME_ITEM = {
  COIN: "coin",
  CLOUD: "cloud",
  TILE_LAYER_1: "Tile Layer 1",
  TILE_LAYER_2: "Tile Layer 2",
  TILES: "tiles",
  HERO: "hero",
  ENEMY: "enemy",
};

export const HERO = {
  X: 90,
  Y: 400,
  DEPTH: 5,
  WIDTH: 35,
  HEIGHT: 50,
  OFFSET_X: 45,
  OFFSET_Y: 40,
};

export const ENEMY = {
  DEPTH: 6,
  WIDTH: 40,
  HEIGHT: 75,
  OFFSET_X: 45,
  OFFSET_Y: 40,
};

export const AI = {
  CHASE: "chase",
  CONDITIONAL_CHASE: "conditionalChase",
};

export const GAME_SCENE = {
  COUNT_DOWN_SCENE: "CountDownScene",
};

export const SCORE_LOCATION = {
  X: 340,
  Y: 340,
  DEPTH: 7,
};

export const COUNT_DOWN_LOCATION = {
  X: 160,
  Y: 340,
  DEPTH: 7,
};

export const GAME_FONT_OPTION = {
  SIZE: "35px",
  COLOR: "#FFFFFF",
  FONTFAMILY: "MainFont",
  DEPTH: 0,
};

export const COIN = {
  INDEX: 6,
  NO_CONFIG: -1,
  WIDTH: 32,
  HEIGHT: 31,
  DEPTH: 5,
};

export const CLOUD = {
  DEPTH: 1,
};

export const CAMERA_OPTION = {
  DURATION: 3000,
  ZOOM: 1,
  RED: 50,
  GREEN: 50,
  BLUE: 50,
};

export const TIME = {
  TIME_LIMIT: 90000,
  STAGE_DELAY: 2000,
};

export const SCORE = 10;

export const GAME_PROGRESS = {
  GAME_BEFORE_START: "GAME_BEFORE_START",
  GAME_ALL_PLAYER_READY: "GAME_ALL_PLAYER_READY",
  GAME_START: "GAME_START",
  GAME_RESET: "GAME_RESET",
  GAME_CLEAR: "GAME_CLEAR",
  GAME_OVER: "GAME_OVER",
  GAME_WIN: "GAME_WIN",
  GAME_LOSE: "GAME_LOSE",
};

export const STAGE = {
  STAGE_1: "stage1",
  STAGE_2: "stage2",
  STAGE_3: "stage3",
};
