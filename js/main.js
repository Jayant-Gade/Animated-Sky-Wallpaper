import { updateMoonPosition, updateSunPosition } from "./celestials.js";
import { updateinterval } from "./config.js";
import { setLand, startLandAnimation } from "./land.js";
import { initializeModels, startModelAnimations } from "./models.js";
import { updateStars } from "./stars.js";

updateSunPosition();
// Initial and repeated update
//updateSunPosition();
setInterval(updateSunPosition, updateinterval); // update every minute
updateMoonPosition();
// Initial and repeated update
//updateSunPosition();
setInterval(updateMoonPosition, updateinterval); // update every minute

updateStars(); //update star after opacity updated

//setInterval(updateStars, 600000);
setInterval(updateStars, updateinterval * 10);
startLandAnimation();
setInterval(setLand, updateinterval); // update every minute

// Set up all 2D models
initializeModels();

// Start the animation loop for all models
startModelAnimations();
