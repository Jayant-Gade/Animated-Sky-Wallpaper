// js/models/cloud/const.js

// --- Cloud Generation Constants ---
// TODO: Art-direct your clouds here.

// --- 1. Base Ellipse Shape ---
// This is the starting shape before we make any cuts.
export const ELLIPSE_WIDTH_RANGE = [200, 300];
export const ELLIPSE_HEIGHT_RANGE = [40, 150];

// --- 2. Top "Cuts" Configuration ---
// These arrays define the "dents" on the top of the cloud. The length of the
// arrays determines how many cuts there will be.
export const TOP_CUT_DEPTH_RANGE = [
  [5, 20],
  [5, 10],
];

// --- 3. Bottom "Cuts" Configuration ---
// These define the shallower cuts on the bottom of the cloud.
export const BOTTOM_CUT_DEPTH_RANGE = [
  [5, 20],
  [5, 10],
];

// --- Global Cloud Properties (No changes needed here) ---
export const NUM_CLOUDS = 4;
export const CLOUD_COLOR = "#FFFFFF";
export const MIN_SCALE = 0.1;
export const MAX_SCALE = 0.5;
export const MIN_SPEED = 0.01;
export const MAX_SPEED = 0.1;
export const SPAWN_HEIGHT_PERCENT = 0.1;
