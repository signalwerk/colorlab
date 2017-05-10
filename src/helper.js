export const toDegrees = (angle) => {
  return angle * (180 / Math.PI);
}

// Converts numeric degrees to radians
export const toRad = (num) => {
  return num * Math.PI / 180;
}

// Convert from 0-1 to 0-255
export const to8bit = (num) => {
  return root.helper.math.range8bit(num * 255);
}

// Convert from 0-1 to 0-255
export const range8bit = (num) => {
  return Math.round(Math.min(255, Math.max(0, num)));
}

// get chroma from (L)ab
export const chroma = (a, b) => {
  return Math.sqrt(a ** 2 + b ** 2);
}
