// js/models/cloud/state.js

export const state = {
  id: null,
  element: null, // This will be the <svg> container for the cloud path

  // Positional & Movement State (from your example code)
  x: 0,
  y: 0,
  speed: 0,

  // Appearance State (from your example code)
  scale: 1,
  opacity: 1,
  svgPathData: "", // The unique, randomly generated SVG path string
};
