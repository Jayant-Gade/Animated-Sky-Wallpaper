// js/models/player/ai.js

import { state } from "./state.js";
import * as C from "./const.js";
import { idle, sleep, walkLeft, walkRight } from "./animations.js";
import { getPositionOnPath } from "./path.js";

// This function makes a random decision based on weighted chances.
function decideNextAction() {
  console.log("AI is making a decision...");

  // Rule 1: The Semaphore. If the cat has walked too many times in one direction, force it to be idle.
  if (state.sequentialWalks >= C.MAX_SEQUENTIAL_WALKS) {
    console.log("Walk limit reached. Forcing idle state.");
    idle();
    return; // Stop further decisions
  }
  // Rule 2: Weighted Random Choice
  const randomNumber = Math.random() * 100; // A number between 0 and 100

  if (randomNumber < C.LEFT_CHANCE) {
    // 10% chance to walk left
    console.log("Decision: Walk Left");
    walkLeft();
  } else if (randomNumber < C.RIGHT_CHANCE + C.LEFT_CHANCE) {
    // 10% chance to walk right (10% + 10%)
    console.log("Decision: Walk Right");
    walkRight();
  } else if (randomNumber < 0) {
    ///WIll never trigger todo list
    // 30% chance to sleep
    sleep();
  } else {
    // 80% chance to be idle
    console.log("Decision: Idle");
    idle();
  }
}

// This is the main function to start the AI's decision-making loop.
export function startAI() {
  console.log(
    `Starting cat AI. Decisions will be made every ${
      C.AI_DECISION_INTERVAL / 1000
    } seconds.`
  );
  // Set the first decision to happen after a short delay
  setTimeout(decideNextAction, 1000);
  // Then, continue making decisions at the specified interval
  setInterval(decideNextAction, C.AI_DECISION_INTERVAL);
}
