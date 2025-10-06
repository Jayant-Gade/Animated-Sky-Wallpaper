// js/models.js

// The import path now points to the player's new main script file.
import { playerModel } from "./models/player/script.js";
import { tree1Model } from "./models/tree1/script.js";
// If you create an enemy, its structure would be identical:

// import { enemyModel } from './models/enemy/script.js';

const allModels = [
  playerModel,
  tree1Model,
  // enemyModel
];

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
