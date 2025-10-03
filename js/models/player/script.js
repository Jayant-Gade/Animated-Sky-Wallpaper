// js/models/player/script.js

import { state } from "./state.js";
import * as C from "./const.js";
import { render } from "./render.js";
import { updateAnimationFrame, idle } from "./animations.js";
// Import BOTH pathing functions now
import { moveOnPath, getPositionOnPath } from "./path.js";
import { startAI } from "./ai.js";
export const playerModel = {
  init: function () {
    state.element = document.getElementById("player-model");
    if (state.element) {
      console.log("Player module initialized.");

      // Set the element's display size. The background image and size
      // will now be handled by the render function.
      state.element.style.width = `${C.DISPLAY_WIDTH}px`;
      state.element.style.height = `${C.DISPLAY_HEIGHT}px`;

      state.lastFrameTime = performance.now();
      idle(); // Start idle

      const startPosition = getPositionOnPath(state.pathProgress);
      state.x = startPosition.x;
      state.y = startPosition.y;
      render(); // Initial render

      startAI();
    } else {
      console.error("Player model element not found!");
    }
  },

  update: function (currentTime) {
    if (!state.element) return;

    // --- Logic Phase ---
    updateAnimationFrame(currentTime);
    moveOnPath();

    // --- Render Phase ---
    render();
  },
};
