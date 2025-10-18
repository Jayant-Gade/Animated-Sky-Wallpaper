// js/models/cloud-png/render.js

import * as C from "./const.js"; // Import constants
function ensureElementExists(cloudState) {
  if (cloudState.element) return;
  const container = document.getElementById("cloud-png-container");
  if (!container) return;

  const img = document.createElement("img");
  img.id = cloudState.id;
  img.src = cloudState.imageUrl;
  img.style.position = "absolute";

  // --- THIS IS THE OPTIMIZATION ---
  // We are telling the browser to prepare for changes to these properties.
  // This often moves the element to its own GPU layer, drastically improving performance.
  img.style.willChange = "transform, opacity";
  // --- END OF OPTIMIZATION ---

  container.appendChild(img);
  cloudState.element = img;
}

export function render(cloudState) {
  ensureElementExists(cloudState);
  if (!cloudState.element) return;

  // --- THIS IS THE FIX for Anti-Aliasing ---
  // We construct the transform string first...
  let transformString = `translate(${cloudState.x}px, ${cloudState.y}px) scale(${cloudState.scale})`;

  // ...then, if the hack is enabled in const.js, we add the translateZ(0) part.
  if (C.ANTI_ALIAS_HACK) {
    transformString += " translateZ(0)";
  }
  // --- END OF FIX ---

  // Apply the final transform string and opacity.
  cloudState.element.style.transform = transformString;
  cloudState.element.style.opacity = cloudState.opacity;
}
