// js/models/cloud-png/ai.js

import * as C from "./const.js";

export function initializeProperties(cloudState) {
  const screenWidth = window.innerWidth;
  const boxHeight = window.innerHeight * C.SPAWN_HEIGHT_PERCENT;

  let speed = C.MIN_SPEED + Math.random() * (C.MAX_SPEED - C.MIN_SPEED);
  if (Math.random() > 0.5) speed = -speed;
  cloudState.speed = speed;

  if (cloudState.speed > 0) cloudState.x = -400;
  else cloudState.x = screenWidth + 400;

  cloudState.y = Math.random() * boxHeight;

  // --- THIS IS THE FIX for Size Scaling ---
  // The final scale is now the random scale multiplied by your global constant.
  const randomScale = C.MIN_SCALE + Math.random() * (C.MAX_SCALE - C.MIN_SCALE);
  cloudState.scale = randomScale * C.BASE_SIZE_MULTIPLIER;
  // --- END OF FIX ---

  cloudState.opacity = 0.5 + cloudState.scale * 0.5;

  const randomIndex = Math.floor(Math.random() * C.CLOUD_IMAGE_URLS.length);
  cloudState.imageUrl = C.CLOUD_IMAGE_URLS[randomIndex];
}
