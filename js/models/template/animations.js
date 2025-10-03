// js/models/NEW_MODEL_NAME/animations.js

import { state } from "./state.js";
import { SPRITE_SHEETS } from "./const.js";

// TODO: Define all animations for this model. Each animation is a complete package of data.
const animationData = {
  idle: {
    // Animation Properties
    frames: [0, 1],
    speed: 400,
    loop: true,
    movementSpeed: 0.0, // This model doesn't move when idle
    // Sprite Sheet Properties for this animation
    spriteSheetURL: SPRITE_SHEETS.default,
    frameWidth: 128,
    frameHeight: 128,
    framesPerRow: 4,
    numRows: 2,
  },
  walk: {
    // Animation Properties
    frames: [2, 3, 4, 5],
    speed: 200,
    loop: true,
    movementSpeed: 0.002, // This model moves when walking
    // Sprite Sheet Properties for this animation
    spriteSheetURL: SPRITE_SHEETS.default,
    frameWidth: 128,
    frameHeight: 128,
    framesPerRow: 4,
    numRows: 2,
  },
  attack: {
    // Animation Properties
    frames: [0, 1, 2],
    speed: 150,
    loop: false, // This animation plays once
    movementSpeed: 0.0,
    // Sprite Sheet Properties for this animation (using a DIFFERENT PNG)
    spriteSheetURL: SPRITE_SHEETS.special,
    frameWidth: 256, // This sprite sheet might have different dimensions
    frameHeight: 256,
    framesPerRow: 3,
    numRows: 1,
  },
};

// --- Helper function to get the full data package for the current animation. ---
export function getCurrentAnimationData() {
  return animationData[state.currentAnimationName];
}

// --- Trigger Functions ---
// TODO: Add more functions for other states.
export function walkLeft() {
  if (state.currentAnimationName !== "walk") {
    state.currentAnimationName = "walk";
    state.currentFrameIndex = 0;
  }
  state.walkDirection = "left";
  state.sequentialWalks++;
}

export function walkRight() {
  if (state.currentAnimationName !== "walk") {
    state.currentAnimationName = "walk";
    state.currentFrameIndex = 0;
  }
  state.walkDirection = "right";
  state.sequentialWalks++;
}

export function idle() {
  if (state.currentAnimationName !== "idle") {
    state.currentAnimationName = "idle";
    state.currentFrameIndex = 0;
  }
  state.walkDirection = "none";
  state.sequentialWalks = 0;
}

// --- Boilerplate Logic (usually no changes needed below) ---
export function updateAnimationFrame(currentTime) {
  const animData = getCurrentAnimationData();
  if (currentTime - state.lastFrameTime > animData.speed) {
    let nextFrame = state.currentFrameIndex + 1;
    // If the animation shouldn't loop and has reached the end, stay on the last frame
    if (!animData.loop && nextFrame >= animData.frames.length) {
      state.currentFrameIndex = animData.frames.length - 1;
    } else {
      state.currentFrameIndex = nextFrame % animData.frames.length;
    }
    state.lastFrameTime = currentTime;
  }
}

export function getCurrentFrame() {
  const animData = getCurrentAnimationData();
  return animData.frames[state.currentFrameIndex];
}
