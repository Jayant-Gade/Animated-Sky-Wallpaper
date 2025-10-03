// js/models/NEW_MODEL_NAME/ai.js

import { state } from "./state.js";
import * as C from "./const.js";
import { idle, walkLeft, walkRight } from "./animations.js"; // You could add 'attack' here too

function decideNextAction() {
  if (state.sequentialWalks >= C.MAX_SEQUENTIAL_WALKS) {
    idle();
    return;
  }
  if (state.pathProgress <= 0) {
    walkRight();
    return;
  }
  if (state.pathProgress >= 1) {
    walkLeft();
    return;
  }

  // TODO: Adjust these probabilities.
  const randomNumber = Math.random() * 100;
  if (randomNumber < 30) {
    walkLeft();
  } else if (randomNumber < 60) {
    walkRight();
  } else {
    idle();
  }
}

export function startAI() {
  setInterval(decideNextAction, C.AI_DECISION_INTERVAL);
}
