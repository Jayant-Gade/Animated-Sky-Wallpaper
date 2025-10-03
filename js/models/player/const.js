// js/models/player/const.js

// --- Source Sprite Configuration ---
//export const SPRITE_SHEET_URL = "js/models/player/sprite.png";
export const SPRITE_SHEETS = {
  walk: "js/models/player/sprite.png",
  sleep: "js/models/player/sleep_sprite.png", // The new PNG for sleeping
};
export const FRAME_WIDTH = 965.66;
export const FRAME_HEIGHT = 906;
export const FRAMES_PER_ROW = 3;
export const NUM_ROWS = 2;
const SCALING = 40;
// --- Gameplay Constants ---
export const DISPLAY_WIDTH = SCALING;
export const DISPLAY_HEIGHT = SCALING;
export const WALK_SPEED = 0.001; // The cat's movement speed along the path
export const PATH_UPPER_LIMIT = 0.31;
export const PATH_LOWER_LIMIT = 0;
// --- NEW AI Constants ---
export const AI_DECISION_INTERVAL = 5000; // AI makes a new decision every 5000ms (5 seconds)
export const MAX_SEQUENTIAL_WALKS = 4; // Max times the cat can walk left/right in a row

//AI chances
export const LEFT_CHANCE = 10;
export const RIGHT_CHANCE = 10;
export const IDLE_CHANCE = 80; //no need
export const SLEEP_CHANCE = 0; //no need NOT IMPLEMENTED
