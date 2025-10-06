// js/models/tree1/animations.js

import { state } from "./state.js";
import {
  SPRITE_SHEET_URL,
  FRAME_WIDTH,
  FRAME_HEIGHT,
  FRAMES_PER_ROW,
  NUM_ROWS,
} from "./const.js";

const animationData = {
  idle: {
    frames: [0], // The first frame
    speed: 99999, // A very long time, effectively static
    loop: true,
  },
  slowWind: {
    frames: [0, 1, 2, 3], // A gentle back-and-forth sway
    speed: 500,
    loop: true,
  },
  fastWind: {
    frames: [1, 2, 3, 2, 1, 0], // A more vigorous gust
    speed: 150,
    loop: true,
  },
};

// This function calculates a tint based on an external opacity value.
// We'll use brightness and saturation to create a "night" effect.
export function updateTint(globalOpacity) {
  // Clamp the opacity so brightness doesn't go below a visible level
  const clampedOpacity = Math.max(0.4, globalOpacity);

  // Create a filter string. As opacity drops, brightness and saturation drop.
  const filterString = `brightness(${clampedOpacity}) saturate(${
    clampedOpacity * 100
  }%)`;

  state.activeFilter = filterString;
}

// --- Trigger Functions ---
export function idle() {
  if (state.currentAnimationName !== "idle") {
    state.currentAnimationName = "idle";
    state.currentFrameIndex = 0;
  }
}
export function slowWind() {
  if (state.currentAnimationName !== "slowWind") {
    state.currentAnimationName = "slowWind";
    state.currentFrameIndex = 0;
  }
}
export function fastWind() {
  if (state.currentAnimationName !== "fastWind") {
    state.currentAnimationName = "fastWind";
    state.currentFrameIndex = 0;
  }
}

// --- Boilerplate (no changes needed below, but simplified for one sprite sheet) ---
export function getCurrentAnimationData() {
  // We add the sprite sheet info here since it's always the same for this tree
  return {
    ...animationData[state.currentAnimationName],
    spriteSheetURL: SPRITE_SHEET_URL,
    frameWidth: FRAME_WIDTH,
    frameHeight: FRAME_HEIGHT,
    framesPerRow: FRAMES_PER_ROW,
    numRows: NUM_ROWS,
  };
}
export function updateAnimationFrame(currentTime) {
  const animData = getCurrentAnimationData();
  if (currentTime - state.lastFrameTime > animData.speed) {
    state.currentFrameIndex =
      (state.currentFrameIndex + 1) % animData.frames.length;
    state.lastFrameTime = currentTime;
  }
}
export function getCurrentFrame() {
  const animData = getCurrentAnimationData();
  return animData.frames[state.currentFrameIndex];
}
