// js/models/NEW_MODEL_NAME/path.js

import { state } from "./state.js";
import { getCurrentAnimationData } from "./animations.js";

// TODO: Define the movement path for this model.
function getPathDefinition() {
  return {
    startX: window.innerWidth * 0.1,
    endX: window.innerWidth * 0.9,
    y: window.innerHeight * 0.3,
  };
}

function getPositionOnPath(t) {
  const path = getPathDefinition();
  const x = path.startX + (path.endX - path.startX) * t;
  const y = path.y;
  return { x, y };
}

export function moveOnPath() {
  const oldX = state.x;
  const speed = getCurrentAnimationData().movementSpeed;
  let directionMultiplier = 0;

  if (state.walkDirection === "left") {
    directionMultiplier = -1;
  } else if (state.walkDirection === "right") {
    directionMultiplier = 1;
  }

  if (directionMultiplier === 0) return;

  state.pathProgress += speed * directionMultiplier;

  if (state.pathProgress > 1) state.pathProgress = 1;
  if (state.pathProgress < 0) state.pathProgress = 0;

  const newPosition = getPositionOnPath(state.pathProgress);

  if (newPosition.x < oldX) state.direction = "left";
  else if (newPosition.x > oldX) state.direction = "right";

  state.x = newPosition.x;
  state.y = newPosition.y;
}

export { getPositionOnPath };
