import {
  starCount,
  starsContainer,
  updateinterval,
  centerDot,
  centerX,
  centerY,
  screenheight,
} from "./config.js";
import { opacity } from "./variables.js";

export function updateStars() {
  console.log(starsContainer.children.length);
  if (opacity == 1) {
    // Remove stars
    document.querySelectorAll(".star").forEach((star) => star.remove());
  } else if (starsContainer.children.length < 2) {
    // Generate stars again
    for (let i = 0; i < starCount; i++) {
      console.log("Startrrrr");
      const star = document.createElement("div");
      star.classList.add("star");

      const tailLength = (Math.random() * (7.5 - 5.0) + 5.0).toFixed(2) + "em";
      const topOffset = (Math.random() * 100).toFixed(2) + "vh";
      const duration = (Math.random() * (12 - 6) + 6).toFixed(2) + "s";
      const delay = (Math.random() * 10).toFixed(2) + "s";
      const width = `calc(${tailLength} / 6)`;

      star.style.top = topOffset;
      star.style.setProperty("--star-tail-length", tailLength);
      star.style.setProperty("--star-tail-height", "2px");
      star.style.setProperty("--star-width", width);
      star.style.setProperty("--fall-duration", duration);
      star.style.setProperty("--fall-delay", delay);
      star.style.animation = `fall ${duration} ${delay} linear infinite, tail-fade ${duration} ${delay} ease-out infinite`;

      starsContainer.appendChild(star);
    }
  }
}
//setInterval(updateStars, 600000);
setInterval(updateStars, updateinterval * 10);
