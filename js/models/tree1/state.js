// js/models/tree1/state.js

export const state = {
  element: null,
  x: 500,
  y: 500,

  // Animation State
  currentAnimationName: "idle",
  currentFrameIndex: 0,
  lastFrameTime: 0,
  scaleRatio: 1,
  activeSpriteSheetURL: null, // Though we only use one, the render module expects this

  // Tint State
  activeFilter: null,
};
