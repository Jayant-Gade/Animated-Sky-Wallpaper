export let opacity = 0;

export function setOpacity(newValue) {
  opacity = newValue;
  console.log(`✅ Opacity updated to ${opacity} inside variable.js`);
}

export var animationcomplete = true;

export function setAnimationComplete() {
  animationcomplete = true;
  console.log(`✅ Initial Animations completed`);
}
///debugging

export var hours = 0;
