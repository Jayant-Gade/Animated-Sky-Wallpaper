// js/models/NEW_MODEL_NAME/render.js

import { state } from "./state.js";
import * as C from "./const.js";
import { getCurrentFrame, getCurrentAnimationData } from "./animations.js";

// This function checks if the sprite sheet needs to be changed and updates it.
function updateSpriteSheet() {
  const animData = getCurrentAnimationData();

  if (state.activeSpriteSheetURL !== animData.spriteSheetURL) {
    state.element.style.backgroundImage = `url(${animData.spriteSheetURL})`;
    state.activeSpriteSheetURL = animData.spriteSheetURL;

    state.scaleRatio = C.DISPLAY_WIDTH / animData.frameWidth;
    const totalSheetWidth = animData.frameWidth * animData.framesPerRow;
    const totalSheetHeight = animData.frameHeight * animData.numRows;
    const scaledBgWidth = totalSheetWidth * state.scaleRatio;
    const scaledBgHeight = totalSheetHeight * state.scaleRatio;
    state.element.style.backgroundSize = `${scaledBgWidth}px ${scaledBgHeight}px`;
  }
}

export function render() {
  if (!state.element) return;

  updateSpriteSheet();

  const renderX = state.x - C.DISPLAY_WIDTH / 2;
  const renderY = state.y - C.DISPLAY_HEIGHT / 2;
  state.element.style.left = `${renderX}px`;
  state.element.style.top = `${renderY}px`;

  const animData = getCurrentAnimationData();
  const frameNumber = getCurrentFrame();
  const row = Math.floor(frameNumber / animData.framesPerRow);
  const col = frameNumber % animData.framesPerRow;
  const xOffset = -(col * animData.frameWidth);
  const yOffset = -(row * animData.frameHeight);
  const scaledXPosition = xOffset * state.scaleRatio;
  const scaledYPosition = yOffset * state.scaleRatio;
  state.element.style.backgroundPosition = `${scaledXPosition}px ${scaledYPosition}px`;

  if (state.direction === "left") {
    state.element.style.transform = "scaleX(-1)";
  } else {
    state.element.style.transform = "scaleX(1)";
  }
}
