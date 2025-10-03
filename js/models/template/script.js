// js/models/NEW_MODEL_NAME/script.js

import { state } from "./state.js";
import * as C from "./const.js";
import { render } from "./render.js";
import { updateAnimationFrame, idle } from "./animations.js";
import { moveOnPath, getPositionOnPath } from "./path.js";
import { startAI } from "./ai.js";

// TODO: Change 'enemyModel' to a unique name for this model.
export const enemyModel = {
  init: function () {
    // TODO: This ID must match the ID of the model's div in index.html
    state.element = document.getElementById("enemy-model");

    if (state.element) {
      console.log("Enemy model module initialized."); // TODO: Change log message

      state.element.style.width = `${C.DISPLAY_WIDTH}px`;
      state.element.style.height = `${C.DISPLAY_HEIGHT}px`;

      state.lastFrameTime = performance.now();
      idle();

      const startPosition = getPositionOnPath(state.pathProgress);
      state.x = startPosition.x;
      state.y = startPosition.y;
      render();

      startAI();
    } else {
      console.error("Enemy model element not found!"); // TODO: Change error message
    }
  },

  update: function (currentTime) {
    if (!state.element) return;
    updateAnimationFrame(currentTime);
    moveOnPath();
    render();
  },
};
