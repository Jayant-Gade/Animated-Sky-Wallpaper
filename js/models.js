// js/models.js

// The import path now points to the player's new main script file.
import { playerModel } from "./models/player/script.js";
import { tree1Model } from "./models/tree1/script.js";
//import { createCloudModel } from "./models/cloud/script.js";
//import * as CloudConst from "./models/cloud/const.js"; // Import constants
// If you create an enemy, its structure would be identical:
import { cloudPngModel } from "./models/cloud-png/script.js"; // <-- IMPORT THE NEW MODEL
import * as CloudPngConst from "./models/cloud-png/const.js"; // <-- IMPORT ITS CONSTANTS

// import { enemyModel } from './models/enemy/script.js';
const allModels = [
  playerModel,
  tree1Model,
  cloudPngModel,
  // enemyModel
];

/* disabled
// Create the clouds and add them to the list
for (let i = 0; i < CloudConst.NUM_CLOUDS; i++) {
  allModels.push(createCloudModel(`cloud-${i}`));
}*/

export function initializeModels() {
  console.log("Central manager: Initializing all models...");
  allModels.forEach((model) => model.init());
}

function animateModels(currentTime) {
  allModels.forEach((model) => {
    if (model.update) {
      model.update(currentTime);
    }
  });
  requestAnimationFrame(animateModels);
}

export function startModelAnimations() {
  console.log("Central manager: Starting all animation loops...");
  requestAnimationFrame(animateModels);
}
