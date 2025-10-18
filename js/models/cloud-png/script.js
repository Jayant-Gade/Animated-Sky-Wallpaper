// js/models/cloud-png/script.js

import { createCloudState } from "./state.js";
import * as C from "./const.js";
import { render } from "./render.js";
import { moveCloud } from "./path.js";
import { initializeProperties } from "./ai.js";
import { updateinterval } from "../../config.js";

const cloudPool = [];

export const cloudPngModel = {
  // NEW: Add a property to track the last update time.
  lastUpdateTime: 0,

  init: function () {
    console.log("Cloud PNG Model Initialized. Spawner is scheduled.");
    // Initialize the last update time.
    this.lastUpdateTime = performance.now();
    setTimeout(() => {
      for (let i = 0; i < C.NUM_CLOUDS; i++) {
        const newCloudState = createCloudState(`cloud-png-${i}`);
        initializeProperties(newCloudState);
        cloudPool.push(newCloudState);
      }
    }, updateinterval);
  },

  // The update function now accepts the 'currentTime' from the main animation loop.
  update: function (currentTime) {
    if (cloudPool.length === 0) return;

    // --- THIS IS THE THROTTLING LOGIC ---
    // 1. Check if enough time has passed since the last update.
    if (currentTime - this.lastUpdateTime < C.UPDATE_INTERVAL) {
      return; // If not, skip the rest of this function. Do nothing.
    }
    // --- END OF THROTTLING LOGIC ---

    // 2. If enough time HAS passed, then update all the clouds.
    for (const cloudState of cloudPool) {
      moveCloud(cloudState);
      render(cloudState);
    }

    // 3. VERY IMPORTANT: Update the 'lastUpdateTime' to the current time for the next check.
    this.lastUpdateTime = currentTime;
  },
};
