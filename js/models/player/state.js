// js/models/player/state.js

export const state = {
  element: null,
  x: 0,
  y: 0,
  direction: "right",

  // Animation State
  currentAnimationName: "idle",
  currentFrameIndex: 0,
  lastFrameTime: 0,
  scaleRatio: 1,
  activeSpriteSheetURL: null, // NEW: Tracks the currently displayed PNG

  // Path State
  pathProgress: 0.1, // Start the cat in the middle of the path

  // NEW AI State
  walkDirection: "none", // 'left', 'right', or 'none'
  sequentialWalks: 0, // The semaphore counter
};
