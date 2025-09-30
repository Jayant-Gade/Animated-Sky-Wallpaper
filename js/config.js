export const starsContainer = document.querySelector(".stars");
export const starCount = 1;
export const updateinterval = 1000; ///minute(for star and planet) (*10 for shooting star)

export const centerDot = document.getElementById("center-dot");
export const centerX = centerDot.offsetLeft + centerDot.offsetWidth / 2;
export const centerY = centerDot.offsetTop + centerDot.offsetHeight / 2;

export const daylightStart = 6; // 6 AM
export const daylightEnd = 19; // 6 PM
export const sun = document.getElementById("sun");
export const sunglow = document.getElementById("sun-glow");
export const sunSize = 60;
export const screenheight = window.innerHeight;
