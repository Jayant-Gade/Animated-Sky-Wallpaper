// js/models/player/render.js

import { state } from "./state.js";
import * as C from "./const.js";
import { getCurrentAnimationData, getCurrentFrame } from "./animations.js";

// This function checks if the sprite sheet needs to be changed and updates it.

function updateSpriteSheet() {
  const animData = getCurrentAnimationData();

  // If the required PNG is different from the one currently displayed...
  if (state.activeSpriteSheetURL !== animData.spriteSheetURL) {
    console.log(`Swapping sprite sheet to: ${animData.spriteSheetURL}`);

    // 1. Update the background image
    state.element.style.backgroundImage = `url(${animData.spriteSheetURL})`;
    state.activeSpriteSheetURL = animData.spriteSheetURL;

    // 2. Recalculate the scale ratio and background size for the NEW sheet
    state.scaleRatio = C.DISPLAY_WIDTH / animData.frameWidth;
    const totalSheetWidth = animData.frameWidth * animData.framesPerRow;
    const totalSheetHeight = animData.frameHeight * animData.numRows;
    const scaledBgWidth = totalSheetWidth * state.scaleRatio;
    const scaledBgHeight = totalSheetHeight * state.scaleRatio;
    state.element.style.backgroundSize = `${scaledBgWidth}px ${scaledBgHeight}px`;
  }
}
// This function applies the model's state to the DOM element.
// The main render function
export function render() {
  if (!state.element) return;

  // 1. Check for and handle sprite sheet swaps
  updateSpriteSheet();

  // 2. Update Position
  const renderX = state.x - C.DISPLAY_WIDTH / 2;
  const renderY = state.y - C.DISPLAY_HEIGHT / 2;
  state.element.style.left = `${renderX}px`;
  state.element.style.top = `${renderY}px`;

  // 3. Update Animation Frame
  const animData = getCurrentAnimationData();
  const frameNumber = getCurrentFrame();
  const row = Math.floor(frameNumber / animData.framesPerRow);
  const col = frameNumber % animData.framesPerRow;
  const xOffset = -(col * animData.frameWidth);
  const yOffset = -(row * animData.frameHeight);
  const scaledXPosition = xOffset * state.scaleRatio;
  const scaledYPosition = yOffset * state.scaleRatio;
  state.element.style.backgroundPosition = `${scaledXPosition}px ${scaledYPosition}px`;

  // 4. Update Direction (Flipping)
  if (state.direction === "left") {
    state.element.style.transform = "scaleX(-1)";
  } else {
    state.element.style.transform = "scaleX(1)";
  }
}
