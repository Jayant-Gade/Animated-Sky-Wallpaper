// js/models/cloud/render.js

import { state } from "./state.js";
import * as C from "./const.js";

function ensureElementExists(state) {
  if (state.element) return;
  const container = document.getElementById("cloud-container");
  if (!container) return;

  const svgWrapper = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgWrapper.id = state.id;
  svgWrapper.style.position = "absolute";
  svgWrapper.style.overflow = "visible";

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  svgWrapper.appendChild(path);
  container.appendChild(svgWrapper);
  state.element = svgWrapper;
}

export function render(state) {
  ensureElementExists(state);
  if (!state.element) return;

  // Position the SVG wrapper
  state.element.style.left = `${state.x}px`;
  state.element.style.top = `${state.y}px`;

  // --- THIS IS THE FIX ---
  // Use the shape data from the state to give the SVG size and a coordinate system.
  if (state.shape) {
    // Set the physical size of the SVG element on the page
    state.element.setAttribute("width", state.shape.width * state.scale);
    state.element.setAttribute("height", state.shape.height * state.scale);
    // Set the internal coordinate system so the path is visible
    state.element.setAttribute("viewBox", state.shape.viewBox);
  }
  // --- END OF FIX ---

  // Get the <path> element and apply the shape and color
  const pathElement = state.element.firstChild;
  if (pathElement && state.shape) {
    pathElement.setAttribute("d", state.shape.pathData);
    pathElement.setAttribute("fill", C.CLOUD_COLOR);
    pathElement.setAttribute("fill-opacity", state.opacity);
  }
}
