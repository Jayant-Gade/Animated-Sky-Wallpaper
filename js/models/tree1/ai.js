// js/models/tree1/ai.js

import { idle, slowWind, fastWind } from "./animations.js";
import * as C from "./const.js";
function decideNextAction() {
  const randomNumber = Math.random() * 100;

  // TODO: Adjust these probabilities as desired.
  if (randomNumber < C.IDLE_CHANCE) {
    idle();
  } else if (randomNumber < C.SLOW_WIND_CHANCE + C.IDLE_CHANCE) {
    slowWind();
  } else {
    fastWind();
  }
}

export function startAI(decisionInterval) {
  // Initial decision
  setTimeout(decideNextAction, 1000);
  // Subsequent decisions
  setInterval(decideNextAction, decisionInterval);
}
