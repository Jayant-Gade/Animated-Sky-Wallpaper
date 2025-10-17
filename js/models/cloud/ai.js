// js/models/cloud/ai.js

import * as C from "./const.js";

// This function gives the cloud its unique, random properties upon creation.
export function initializeProperties(state) {
  const screenWidth = window.innerWidth;
  const boxHeight = window.innerHeight * C.SPAWN_HEIGHT_PERCENT;

  // --- 1. Set Random Speed and Direction ---
  // First, get a random speed from the defined range.
  let speed = C.MIN_SPEED + Math.random() * (C.MAX_SPEED - C.MIN_SPEED);

  // Then, use a 50/50 chance to decide if the speed should be negative (move left).
  if (Math.random() > 0.5) {
    speed = -speed;
  }
  state.speed = speed;

  // --- 2. Set Initial Position ---
  // Spawn the cloud just off-screen so it drifts into view naturally.
  if (state.speed > 0) {
    // If moving right, start on the left.
    state.x = -400; // Start 400px off the left edge
  } else {
    // If moving left, start on the right.
    state.x = screenWidth + 400; // Start 400px off the right edge
  }
  state.y = Math.random() * boxHeight;

  // --- 3. Set Random Appearance ---
  state.scale = C.MIN_SCALE + Math.random() * (C.MAX_SCALE - C.MIN_SCALE);
  state.opacity = state.scale * 0.8;
}
