// js/models/tree1/const.js

// --- Source Sprite Configuration ---
export const SPRITE_SHEET_URL = "js/models/tree1/sprite.png";
export const FRAME_WIDTH = 128; // 512px width / 4 frames
export const FRAME_HEIGHT = 128; // The height of the single row
export const FRAMES_PER_ROW = 4;
export const NUM_ROWS = 1;

// --- Gameplay Constants ---
// TODO: Adjust the on-screen size of this tree.
export const DISPLAY_WIDTH = 128;
export const DISPLAY_HEIGHT = 128;

// --- Location Constants ---
// TODO: Set the base location of this tree as a percentage of the screen.
// (0,0) is the top-left, (1,1) is the bottom-right.
export const BASE_X_PERCENT = 0.92; // 80% from the left edge
export const BASE_Y_PERCENT = 0.75; // 65% from the top edge

// --- AI Constants ---
export const AI_DECISION_INTERVAL = 5000; // AI makes a new decision every 7 seconds
export const IDLE_CHANCE = 60;
export const SLOW_WIND_CHANCE = 30;
export const FAST_WIND_CHANCE = 10; //NO USE
