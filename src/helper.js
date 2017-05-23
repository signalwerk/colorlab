export const toDegrees = angle => angle * (180 / Math.PI);

// Converts numeric degrees to radians
export const toRad = num => (num * Math.PI) / 180;

// get chroma from (L)ab
export const chroma = (a, b) => Math.sqrt((a ** 2) + (b ** 2));

//  ECMAScript 2017
// Math.clamp(x, lower, upper)
export const clamp = (number, min, max) => Math.max(min, Math.min(number, max));
