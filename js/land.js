import { opacity } from "./variables.js";

// --- Configuration Parameters ---
const LAND_BASE_WIDTH_PERCENT = 0.3;
const LAND_TOP_WIDTH_PERCENT = 0.1;
const LAND_HEIGHT_PERCENT = 0.6;
const LAND_COLOR = "#dfba8aff";
const WAVE_HEIGHT_PERCENT = 0.5;
const WAVE_AMPLITUDE = 5;
const WAVE_FREQUENCY = 0.003;
const WAVE_SPEED = 0.02;
const WATER_COLOR = "rgba(0, 70, 128, 0.8)";

// --- Module Variables ---
let svg, wavePath, landPath, landPathMask;
let viewportWidth = 0;
let time = 0;
//opacity
// This function finds and stores the necessary DOM elements.
function initializeElements() {
  console.log("Attempting to initialize SVG elements...");
  svg = document.getElementById("scene");
  wavePath = document.getElementById("wave");
  landPath = document.getElementById("land");
  landPathMask = document.getElementById("land-mask");

  if (svg && wavePath && landPath) {
    console.log("Successfully found SVG elements.");
    return true;
  }
  console.error("Failed to find one or more SVG elements (scene, wave, land).");
  return false;
}

// Draws the static land mass on the right side
function drawLand() {
  const svgHeight = svg.clientHeight;
  if (svgHeight === 0) {
    console.warn(
      "drawLand called, but svg.clientHeight is 0. Land will not be visible."
    );
    return;
  }

  const landBaseWidth = viewportWidth * LAND_BASE_WIDTH_PERCENT;
  const landTopWidth = viewportWidth * LAND_TOP_WIDTH_PERCENT;
  const landHeight = svgHeight * LAND_HEIGHT_PERCENT;
  const baseLevel = svgHeight;

  const landTipX = viewportWidth - landBaseWidth;
  const landLeftX = viewportWidth - landTopWidth;
  const landTopY = baseLevel - landHeight;
  const landBottomY = baseLevel;
  const landRightX = viewportWidth;

  const cp1x = (landLeftX + landTipX) / 2;
  const cp1y = landTopY;
  const cp2x = landTipX;
  const cp2y = (landTopY + landBottomY) / 2;

  const pathData = `
        M ${landLeftX},${landTopY}
        C ${cp1x},${cp1y}, ${cp2x},${cp2y}, ${landTipX - 100},${landBottomY}
        L ${landRightX},${landBottomY}
        L ${landRightX},${landTopY}
        Z
    `;
  var opacityland = opacity < 0.6 ? 0.6 : opacity;
  landPath.setAttribute("d", pathData);
  landPath.setAttribute("fill", LAND_COLOR);
  landPath.setAttribute("opacity", opacityland);
}

// Draws the static land mass mask on the right side
function drawLandMask() {
  const svgHeight = svg.clientHeight;
  if (svgHeight === 0) {
    console.warn(
      "drawLand called, but svg.clientHeight is 0. Land will not be visible."
    );
    return;
  }

  const landBaseWidth = viewportWidth * LAND_BASE_WIDTH_PERCENT;
  const landTopWidth = viewportWidth * LAND_TOP_WIDTH_PERCENT;
  const landHeight = svgHeight * LAND_HEIGHT_PERCENT;
  const baseLevel = svgHeight;

  const landTipX = viewportWidth - landBaseWidth;
  const landLeftX = viewportWidth - landTopWidth;
  const landTopY = baseLevel - landHeight;
  const landBottomY = baseLevel;
  const landRightX = viewportWidth;

  const cp1x = (landLeftX + landTipX) / 2;
  const cp1y = landTopY;
  const cp2x = landTipX;
  const cp2y = (landTopY + landBottomY) / 2;

  const pathData = `
        M ${landLeftX},${landTopY}
        C ${cp1x},${cp1y}, ${cp2x},${cp2y}, ${landTipX - 100},${landBottomY}
        L ${landRightX},${landBottomY}
        L ${landRightX},${landTopY}
        Z
    `;
  landPathMask.setAttribute("d", pathData);
  landPathMask.setAttribute("fill", "#0c0d13");
}

// Draws and updates the animated wave
function drawWave() {
  const svgHeight = svg.clientHeight;
  if (svgHeight === 0) return; // Don't draw if the container has no height

  const waveHeight = svgHeight * WAVE_HEIGHT_PERCENT;
  const baseLevel = svgHeight;

  let pathData = `M 0,${baseLevel - waveHeight}`;
  for (let x = 0; x <= viewportWidth; x++) {
    const yPoint =
      waveHeight + Math.sin(x * WAVE_FREQUENCY + time) * WAVE_AMPLITUDE;
    pathData += ` L ${x},${baseLevel - yPoint}`;
  }
  pathData += ` L ${viewportWidth},${baseLevel} L 0,${baseLevel} Z`;
  wavePath.setAttribute("d", pathData);
  wavePath.setAttribute("fill", WATER_COLOR);
}

// The main animation loop that gets called on every frame
function animationLoop() {
  time += WAVE_SPEED;
  drawWave();
  requestAnimationFrame(animationLoop);
}

// This function will be called once to set the initial size.
export function setLand() {
  console.log("Setting initial size...");
  viewportWidth = window.innerWidth;
  if (svg) {
    svg.setAttribute("width", viewportWidth);
    drawLand(); // Draw static land based on initial size
    drawLandMask();
  }
}

// This is the core logic that sets up and starts the animation.
function initializeAndRunAnimation() {
  console.log("Window is loaded. Initializing animation.");
  if (initializeElements()) {
    setLand();
    animationLoop();
  }
}

// We export a single function to initialize the entire animation.
export function startLandAnimation() {
  initializeAndRunAnimation();
}
