import {
  updateinterval,
  centerDot,
  centerX,
  centerY,
  daylightEnd,
  daylightStart,
  sunglow,
  sunSize,
  screenheight,
} from "./config.js";
import { opacity, setOpacity } from "./variables.js";
var startX = 100;
var startY = 100;
var animationcomplete = false;
var current = { x: startX, y: startY };
var finalX;
var finalY;
//var customHours = 18; // 2 PM
var radius;
if (window.innerWidth / 2 < window.innerHeight) {
  radius = window.innerWidth * 0.5;
} else {
  radius = window.innerHeight * 0.9;
}
let now = new Date();
const daysky = document.getElementById("day-background");

export function updateSunPosition() {
  //var customHours = 12; // 2 PM
  //const customMinutes = 30; // 30 minutes

  now = new Date();

  //console.log(Date())
  //const hours = customHours + customMinutes / 60;

  // console.log(Date())
  const hours =
    now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

  // Define sunrise/sunset time

  // Normalize current hour to 0-12 range
  let daylightHours = hours - daylightStart;
  //daylightHours = Math.max(0, Math.min(12, daylightHours));
  //daylightHours = customHours;
  //daylightHours = hours - daylightStart;

  // Map 0–12 to -90° to +90°
  const angleDeg = (daylightHours / (daylightEnd - daylightStart)) * 180 - 180;
  const angleRad = angleDeg * (Math.PI / 180);

  // Orbit radius (distance from centerDot to sun center)

  // Get center position of the center-dot element

  // Calculate sun's position along the circular orbit
  const sunX = centerX + radius * Math.cos(angleRad);
  const sunY = centerY + radius * Math.sin(angleRad);

  // Size of the sun image (assumed square)
  //if (animationcomplete) {
  // Position the sun so its center aligns to the calculated position
  sun.style.left = `${sunX - sunSize / 2}px`;
  sun.style.top = `${sunY - sunSize / 2}px`;
  sunglow.style.left = `${sunX - sunSize / 2 - 100}px`;
  sunglow.style.top = `${sunY - sunSize / 2 - 100}px`;
  // Optional: Hide sun at night
  if (angleRad < -3.3 || angleRad > 0.15) {
    sun.style.opacity = 0;
  } else {
    sun.style.opacity = 1;
  }
  /*customHours = customHours + 0.1;
if (customHours > 24) {
    customHours = 0;
}*/
  /*} else {
    finalX = `${sunX - sunSize / 2}px`;
    console.log(finalX);
    finalY = window.innerHeight; // `${sunY - sunSize / 2}px`;
}*/
}

const moon = document.getElementById("moon");
const moonSize = 60;
const moonlightStart = 5.5; // 6 AM
const moonlightEnd = 19; // 6 PM
const moonglow = document.getElementById("moon-glow");
export function updateMoonPosition() {
  var customHours = 0; // 2 PM
  const customMinutes = 30; // 30 minutes

  now = new Date();

  //console.log(Date())
  //const hours = ((customHours + 12) % 24) + customMinutes / 60;

  // console.log(Date());
  const hours =
    ((now.getHours() + 12) % 24) +
    now.getMinutes() / 60 +
    now.getSeconds() / 3600;

  // Define moonrise/moonset time

  // Normalize current hour to 0-12 range
  let moonlightHours = hours - moonlightStart;
  //moonlightHours = Math.max(0, Math.min(12, moonlightHours));
  //moonlightHours = (customHours + 12) % 24;
  //moonlightHours = hours - moonlightStart;

  // Map 0–12 to -90° to +90°
  const angleDeg =
    (moonlightHours / (moonlightEnd - moonlightStart)) * 180 - 180;
  const angleRad = angleDeg * (Math.PI / 180);
  //console.log(customHours);

  // Orbit radius (distance from centerDot to moon center)

  // Get center position of the center-dot element

  // Calculate moon's position along the circular orbit
  const moonX = centerX + radius * Math.cos(angleRad);
  const moonY = centerY + radius * Math.sin(angleRad);
  // console.log(moonY, "y moon");
  // Size of the moon image (assumed square)
  //opacity = Math.min(screenheight, moonY * 1.5 - screenheight) / screenheight;
  setOpacity(Math.min(screenheight, moonY * 1.5 - screenheight) / screenheight);
  daysky.style.opacity = opacity;
  console.log(opacity);

  // Position the moon so its center aligns to the calculated position
  moon.style.left = `${moonX - moonSize / 2}px`;
  moon.style.top = `${moonY - moonSize / 2}px`;
  moonglow.style.left = `${moonX - moonSize / 2 - 100}px`;
  moonglow.style.top = `${moonY - moonSize / 2 - 100}px`;
  // Optional: Hide moon at night
  if (angleRad < -3.3 || angleRad > 0.15) {
    moon.style.opacity = 0;
  } else {
    moon.style.opacity = 1;
  }
  /* customHours = customHours + 0.1;
if (customHours > 24) {
    customHours = 0;
}*/
  /*} else {
    finalX = `${sunX - sunSize / 2}px`;
    console.log(finalX);
    finalY = window.innerHeight; // `${sunY - sunSize / 2}px`;
}*/
}
