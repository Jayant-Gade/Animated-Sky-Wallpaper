// js/models/NEW_MODEL_NAME/const.js

// --- Sprite Sheet Library ---
// TODO: Add all the different sprite sheet URLs your model will use.
export const SPRITE_SHEETS = {
  default: "js/models/enemy/sprite.png", // Change 'enemy' if needed
  special: "js/models/enemy/special_attack.png", // Example of a second sheet
};

// --- Gameplay Constants ---
// TODO: Set the desired on-screen size.
export const DISPLAY_WIDTH = 100; // How wide the model should appear on screen
export const DISPLAY_HEIGHT = 100; // How tall the model should appear on screen

// --- AI Constants ---
// TODO: Configure the AI's behavior.
export const AI_DECISION_INTERVAL = 4000; // AI makes a new decision every 4 seconds
export const MAX_SEQUENTIAL_WALKS = 3; // Max times the model can walk in a row
