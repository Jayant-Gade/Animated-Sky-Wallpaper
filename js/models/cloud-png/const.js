// js/models/cloud-png/const.js

// --- Cloud Image Library ---
// This is the array of all 20 of your cloud PNGs.
export const CLOUD_IMAGE_URLS = [
  "js/models/cloud-png/png/cloud1.png",
  "js/models/cloud-png/png/cloud2.png",
  // ... and so on for all 20 images
];

// --- Gameplay Constants ---
// This is the constant that controls the total count of clouds to generate.
export const NUM_CLOUDS = 5;
// --- NEW: Size Scaling ---
// This is a global multiplier for all clouds.
// 1.0 = normal size, 0.5 = half size, 2.0 = double size.
export const BASE_SIZE_MULTIPLIER = 5.0;

// --- NEW: Anti-Aliasing ---
// Set to true to enable a lightweight CSS trick that smooths scaled images.
// This forces the browser to use GPU rendering for the clouds, which often
// results in better anti-aliasing. It's a very cheap effect.
export const ANTI_ALIAS_HACK = false;
export const MIN_SCALE = 0.3;
export const MAX_SCALE = 1.0;
export const MIN_SPEED = 0.02;
export const MAX_SPEED = 0.1;
export const SPAWN_HEIGHT_PERCENT = 0.1;

export const UPDATE_INTERVAL = 32;
