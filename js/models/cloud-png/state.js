// js/models/cloud-png/state.js

// This function creates a new, default state object for a single cloud.
export function createCloudState(id) {
  return {
    id: id,
    element: null,
    x: 0,
    y: 0,
    speed: 0,
    scale: 1,
    opacity: 1,
    imageUrl: "",
  };
}
