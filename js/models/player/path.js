// js/models/player/path.js

import { state } from "./state.js";
import * as C from "./const.js";

// ... getPathDefinition function
const LAND_BASE_WIDTH_PERCENT = 0.3;
const LAND_TOP_WIDTH_PERCENT = 0.1;
const LAND_HEIGHT_PERCENT = 0.2;
function getPathDefinition() {
  // --- 1. Get Base Measurements ---
  // Get the current width and height of the browser window.
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // --- 2. Calculate Land Dimensions in Pixels ---
  // Calculate the raw pixel dimensions of the land based on the percentage constants.
  // These determine how much space the land occupies relative to the screen.
  const landBaseWidth = viewportWidth * LAND_BASE_WIDTH_PERCENT;
  const landTopWidth = viewportWidth * LAND_TOP_WIDTH_PERCENT;
  const landHeight = viewportHeight * LAND_HEIGHT_PERCENT;

  // Set the "ground level" to be the very bottom of the screen (e.g., 1080px).
  const baseLevel = viewportHeight;

  // --- 3. Convert Dimensions to On-Screen Coordinates ---
  // The screen's coordinate system starts at (0,0) in the top-left corner.
  // We calculate the positions of key points for our land shape.
  const landTipX = viewportWidth - landBaseWidth; // The x-position for the "tip" of the land curve.
  const landLeftX = viewportWidth - landTopWidth; // The x-position for the top-left of the land.
  const landTopY = baseLevel - landHeight; // The y-position for the top edge of the land.
  const landBottomY = baseLevel; // The y-position for the bottom edge (the ground).

  // --- 4. Define the Cubic Bezier Curve Points ---
  // A cubic Bezier curve requires four points to define its shape:
  // p0: The starting point of the curve.
  // p1: The first control point (it "pulls" the curve from the start).
  // p2: The second control point (it "pulls" the curve towards the end).
  // p3: The ending point of the curve.

  // P0: The Start Point. This is the top-left corner of the landmass.
  const p0 = { x: landLeftX + 130, y: landTopY };

  // P1: The First Control Point. It's halfway between the top-left and the tip,
  // but at the same height as the top. This creates an initial flat section.
  const p1 = { x: (landLeftX + landTipX) / 2, y: landTopY };

  // P2: The Second Control Point. It's at the x-position of the tip, and halfway
  // down the height of the land. This pulls the curve downwards steeply.
  const p2 = { x: landTipX, y: (landTopY + landBottomY) / 2 };

  // P3: The End Point. This is where the curve touches the "ground" at the bottom
  // of the screen, slightly to the left of the main land tip.
  const p3 = { x: landTipX - 100, y: landBottomY };

  // --- 5. Return the Blueprint ---
  // Return an object containing all four points. This object is the "blueprint"
  // that other functions will use to either draw the land or calculate a position on it.
  return { p0, p1, p2, p3 };
}

// NEW FUNCTION: This is a "pure" calculator. It takes a progress value (t) and returns the {x, y} coordinates.
function getPositionOnPath(t) {
  const { p0, p1, p2, p3 } = getPathDefinition();

  const t_inv = 1 - t;
  const t_inv_sq = t_inv * t_inv;
  const t_sq = t * t;

  const x =
    t_inv_sq * t_inv * p0.x +
    3 * t_inv_sq * t * p1.x +
    3 * t_inv * t_sq * p2.x +
    t_sq * t * p3.x;
  const y =
    t_inv_sq * t_inv * p0.y +
    3 * t_inv_sq * t * p1.y +
    3 * t_inv * t_sq * p2.y +
    t_sq * t * p3.y +
    35;

  return { x, y };
}

// UPDATED FUNCTION: This now uses the calculator function.
export function moveOnPath() {
  const oldX = state.x;
  let speed = 0;

  if (state.walkDirection === "left") {
    speed = C.WALK_SPEED;
  } else if (state.walkDirection === "right") {
    speed = -C.WALK_SPEED;
  } else {
    return; // Not moving
  }

  state.pathProgress += speed;
  //Limiters
  if (state.pathProgress > C.PATH_UPPER_LIMIT)
    state.pathProgress = C.PATH_UPPER_LIMIT;
  if (state.pathProgress < C.PATH_LOWER_LIMIT)
    state.pathProgress = C.PATH_LOWER_LIMIT;

  // Get the new position from our calculator
  const newPosition = getPositionOnPath(state.pathProgress);

  // Update direction for rendering
  if (newPosition.x < oldX) state.direction = "left";
  else if (newPosition.x > oldX) state.direction = "right";

  // Update the central state
  state.x = newPosition.x;
  state.y = newPosition.y;
}

// We need to make the new function available to other files.
export { getPositionOnPath };
