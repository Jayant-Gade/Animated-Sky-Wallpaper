// js/models/cloud-png/path.js

import * as C from "./const.js";

// THIS IS THE FIX: This function now correctly ACCEPTS a 'cloudState' parameter.
export function moveCloud(cloudState) {
  cloudState.x += cloudState.speed;

  const screenWidth = window.innerWidth;
  const boxHeight = window.innerHeight * C.SPAWN_HEIGHT_PERCENT;
  const despawnBoundary = screenWidth * 1.5 + 400;
  const respawnBoundary = -400;

  if (cloudState.speed > 0 && cloudState.x > despawnBoundary) {
    cloudState.x = respawnBoundary;
    cloudState.y = Math.random() * boxHeight;
  }

  if (cloudState.speed < 0 && cloudState.x < respawnBoundary) {
    cloudState.x = despawnBoundary;
    cloudState.y = Math.random() * boxHeight;
  }
}
