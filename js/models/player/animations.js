// js/models/player/animations.js

import { SPRITE_SHEETS } from "./const.js";
import { state } from "./state.js";

const animationData = {
  idle: {
    frames: [4],
    speed: 500,
    loop: true,
    // Properties for the 'walk' sprite sheet
    spriteSheetURL: SPRITE_SHEETS.walk,
    frameWidth: 965.66,
    frameHeight: 906,
    framesPerRow: 3,
    numRows: 2,
  },
  walk: {
    frames: [0, 1, 2, 3, 4, 5],
    speed: 150,
    loop: true,
    // Properties for the 'walk' sprite sheet
    spriteSheetURL: SPRITE_SHEETS.walk,
    frameWidth: 965.66,
    frameHeight: 906,
    framesPerRow: 3,
    numRows: 2,
  },
  sleep: {
    // TODO: Update these values for your actual sleep sprite.
    frames: [0, 1, 2, 3], // Assuming the sleep sprite has 4 frames
    speed: 400,
    loop: true,
    // NEW: Properties for the 'sleep' sprite sheet
    spriteSheetURL: SPRITE_SHEETS.sleep,
    frameWidth: 200, // Example width
    frameHeight: 200, // Example height
    framesPerRow: 4, // Example layout
    numRows: 1, // Example layout
  },
};
export function getCurrentAnimationData() {
  return animationData[state.currentAnimationName];
}
export function updateAnimationFrame(currentTime) {
  const currentAnimation = animationData[state.currentAnimationName];
  if (currentTime - state.lastFrameTime > currentAnimation.speed) {
    state.currentFrameIndex =
      (state.currentFrameIndex + 1) % currentAnimation.frames.length;
    state.lastFrameTime = currentTime;
  }
}

// --- NEW/Updated Trigger Functions ---

export function walkLeft() {
  if (state.currentAnimationName !== "walk") {
    state.currentAnimationName = "walk";
    state.currentFrameIndex = 0;
  }
  state.walkDirection = "left";
  state.sequentialWalks++; // Increment the semaphore
}

export function walkRight() {
  if (state.currentAnimationName !== "walk") {
    state.currentAnimationName = "walk";
    state.currentFrameIndex = 0;
  }
  state.walkDirection = "right";
  state.sequentialWalks++; // Increment the semaphore
}

export function idle() {
  if (state.currentAnimationName !== "idle") {
    state.currentAnimationName = "idle";
    state.currentFrameIndex = 0;
  }
  state.walkDirection = "none";
  state.sequentialWalks = 0; // Reset the semaphore
}
export function sleep() {
  if (state.currentAnimationName !== "sleep") {
    state.currentAnimationName = "sleep";
    state.currentFrameIndex = 0;
  }
  state.walkDirection = "none"; // Can't walk while sleeping
  state.sequentialWalks = 0;
}

export function getCurrentFrame() {
  const currentAnimation = animationData[state.currentAnimationName];
  return currentAnimation.frames[state.currentFrameIndex];
}
