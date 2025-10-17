// js/models/cloud/path.js

import * as C from "./const.js";

// This function updates the cloud's position and handles the new despawn/respawn logic.
export function moveCloud(state) {
  // 1. Update the x position by the cloud's unique speed.
  state.x += state.speed;

  const screenWidth = window.innerWidth;
  const boxHeight = window.innerHeight * C.SPAWN_HEIGHT_PERCENT;
  const despawnBoundary = screenWidth * 2; // A point far off-screen

  // --- 2. Despawn and Respawn Logic ---

  // Check if the cloud is moving right and has gone far past the right edge.
  if (state.speed > 0 && state.x > despawnBoundary) {
    console.log(`Cloud ${state.id} despawned on right, respawning on left.`);
    // Reset its position to far off the LEFT side.
    state.x = -despawnBoundary;
    // Give it a new random Y position for variety.
    state.y = Math.random() * boxHeight;
  }

  // Check if the cloud is moving left and has gone far past the left edge.
  if (state.speed < 0 && state.x < -despawnBoundary) {
    console.log(`Cloud ${state.id} despawned on left, respawning on right.`);
    // Reset its position to far off the RIGHT side.
    state.x = despawnBoundary;
    // Give it a new random Y position.
    state.y = Math.random() * boxHeight;
  }
}
