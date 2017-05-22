export const toDegrees = (angle) => {
  return angle * (180 / Math.PI);
}

// Converts numeric degrees to radians
export const toRad = (num) => {
  return num * Math.PI / 180;
}

// get chroma from (L)ab
export const chroma = (a, b) => {
  return Math.sqrt(a ** 2 + b ** 2);
}

//  ECMAScript 2017
// Math.clamp(x, lower, upper)
export const clamp = (number, min, max) => {
  return Math.max(min, Math.min(number, max));
}
