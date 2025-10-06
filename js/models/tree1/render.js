// js/models/tree1/render.js

import { state } from "./state.js";
import * as C from "./const.js";
import { getCurrentFrame, getCurrentAnimationData } from "./animations.js";

function updateSpriteSheet() {
  const animData = getCurrentAnimationData();
  if (state.activeSpriteSheetURL !== animData.spriteSheetURL) {
    state.element.style.backgroundImage = `url(${animData.spriteSheetURL})`;
    state.activeSpriteSheetURL = animData.spriteSheetURL;
    state.scaleRatio = C.DISPLAY_WIDTH / animData.frameWidth;
    const scaledBgWidth =
      animData.frameWidth * animData.framesPerRow * state.scaleRatio;
    const scaledBgHeight =
      animData.frameHeight * animData.numRows * state.scaleRatio;
    state.element.style.backgroundSize = `${scaledBgWidth}px ${scaledBgHeight}px`;
  }
}
//
export function render() {
  if (!state.element) return;

  updateSpriteSheet();

  // This tree's position is fixed, so we just use state.x and state.y
  state.element.style.left = `${state.x}px`;
  state.element.style.top = `${state.y}px`;

  const animData = getCurrentAnimationData();
  const frameNumber = getCurrentFrame();
  const col = frameNumber % animData.framesPerRow;
  const xOffset = -(col * animData.frameWidth);
  const yOffset = 0; // Only one row
  const scaledXPosition = xOffset * state.scaleRatio;
  const scaledYPosition = yOffset * state.scaleRatio;
  state.element.style.backgroundPosition = `${scaledXPosition}px ${scaledYPosition}px`;

  // Apply the tint filter from the state
  state.element.style.filter = state.activeFilter;
}
