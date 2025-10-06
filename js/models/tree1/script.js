// js/models/tree/script.js

import { state } from "./state.js";
import * as C from "./const.js";
import { render } from "./render.js";
import { updateAnimationFrame, idle, updateTint } from "./animations.js";
// We no longer need to import anything from path.js for the tree
import { startAI } from "./ai.js";
import { updateinterval } from "../../config.js";

import { opacity } from "../../variables.js";

export const tree1Model = {
  init: function () {
    state.element = document.getElementById("tree1-model");

    if (state.element) {
      console.log("Tree model module initialized.");

      state.element.style.width = `${C.DISPLAY_WIDTH}px`;
      state.element.style.height = `${C.DISPLAY_HEIGHT}px`;

      state.lastFrameTime = performance.now();
      idle();

      // --- THIS IS THE FIX ---
      // We calculate the position HERE, inside init(), when we know
      // window.innerWidth and window.innerHeight are correct.
      const startX = window.innerWidth * C.BASE_X_PERCENT;
      const startY = window.innerHeight * C.BASE_Y_PERCENT;

      // Immediately update the state with the correct coordinates.
      state.x = startX;
      state.y = startY;
      // --- END OF FIX ---

      // Perform the initial render to place the tree correctly.
      render();

      startAI(C.AI_DECISION_INTERVAL);

      setInterval(() => {
        updateTint(opacity);
      }, updateinterval);
    } else {
      console.error("Tree model element not found!");
    }
  },

  update: function (currentTime) {
    if (!state.element) return;
    updateAnimationFrame(currentTime);
    render();
  },
};
