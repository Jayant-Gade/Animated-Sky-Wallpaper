// js/models/NEW_MODEL_NAME/state.js

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
  activeSpriteSheetURL: null, // Tracks the currently displayed PNG

  // Path State
  pathProgress: 0,

  // AI State
  walkDirection: "none",
  sequentialWalks: 0,
};
