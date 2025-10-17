// js/models/cloud/script.js

import { state as baseState } from "./state.js";
import * as C from "./const.js";
import { render } from "./render.js";
import { moveCloud } from "./path.js";
import { initializeProperties } from "./ai.js";

// Helper function to get a random number within a [min, max] range array.
function randomInRange(range) {
  return range[0] + Math.random() * (range[1] - range[0]);
}

/**
 * NEW procedural generation engine.
 * This function starts with a base ellipse and "cuts" into it to create a cloud shape.
 * @returns {object} An object containing the pathData, width, height, and viewBox.
 */
function generateCloudShape() {
  // 1. Define the base ellipse
  const width = randomInRange(C.ELLIPSE_WIDTH_RANGE);
  const height = randomInRange(C.ELLIPSE_HEIGHT_RANGE);
  const rx = width / 2;
  const ry = height / 2;
  const centerX = rx;
  const centerY = ry;

  let path = "";
  const numPoints = 30; // The resolution of the curve

  // Helper to get a point on the base ellipse at a given angle
  const getEllipsePoint = (angle) => {
    return {
      x: centerX + rx * Math.cos(angle),
      y: centerY + ry * Math.sin(angle),
    };
  };

  // 2. Build the path by walking around the ellipse
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * (2 * Math.PI); // Angle in radians
    let point = getEllipsePoint(angle);

    // --- 3. Apply the Cuts ---
    // Check if the current point is on the top or bottom and apply the cuts
    if (angle > Math.PI && angle < 2 * Math.PI) {
      // Top half
      const progress = (angle - Math.PI) / Math.PI;
      const cutIndex = Math.floor(progress * C.TOP_CUT_DEPTH_RANGE.length);
      const cutDepth = randomInRange(C.TOP_CUT_DEPTH_RANGE[cutIndex]);
      // Modify the y-coordinate to create the cut
      point.y += cutDepth * Math.sin(angle - Math.PI);
    } else if (angle > 0 && angle < Math.PI) {
      // Bottom half
      const progress = angle / Math.PI;
      const cutIndex = Math.floor(progress * C.BOTTOM_CUT_DEPTH_RANGE.length);
      const cutDepth = randomInRange(C.BOTTOM_CUT_DEPTH_RANGE[cutIndex]);
      // Modify the y-coordinate to create the cut
      point.y += cutDepth * Math.sin(angle);
    }

    // Add the point to the path string
    if (i === 0) {
      path += `M ${point.x} ${point.y}`;
    } else {
      // Use smooth curve commands (S) for a more organic look
      const prevAngle = ((i - 1) / numPoints) * (2 * Math.PI);
      const prevPoint = getEllipsePoint(prevAngle);
      const controlX = (prevPoint.x + point.x) / 2;
      const controlY = (prevPoint.y + point.y) / 2;
      path += ` S ${controlX},${controlY} ${point.x},${point.y}`;
    }
  }

  path += " Z"; // Close the shape

  return {
    pathData: path,
    width: width,
    height: height,
    // The viewBox is simpler now, just the bounding box of the ellipse
    viewBox: `0 0 ${width} ${height + 20}`, // A little extra space at the bottom
  };
}

// --- (The Factory Function and the rest of the file are unchanged) ---
export function createCloudModel(id) {
  const state = { ...baseState, id: id };
  return {
    state: state,
    init: function () {
      this.state.shape = generateCloudShape();
      initializeProperties(this.state);
      render(this.state);
    },
    update: function () {
      moveCloud(this.state);
      render(this.state);
    },
  };
}
