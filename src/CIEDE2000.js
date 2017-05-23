// for more details see
// http://www.ece.rochester.edu/~gsharma/ciede2000/
// http://www.ece.rochester.edu/~gsharma/ciede2000/ciede2000noteCRNA.pdf
// http://www.ece.rochester.edu/~gsharma/ciede2000/dataNprograms/deltaE2000.m
// http://en.wikipedia.org/wiki/Color_difference

// if you are not used to the new ECMAScript 7 pow notation:
// 8 ** 7 === Math.pow(8, 7)

import { toDegrees, toRad, chroma } from './helper';


const CIEDE2000 = (LabInput1, LabInput2) => {
  // Input Lab pairs
  const Lab1 = {
    L: LabInput1.L,
    a: LabInput1.a,
    b: LabInput1.b,
    C: null, // chroma = Step (2)
    a1: null, // a' = Step (5)
    C1: null, // C' = Step (6)
    h1: null, // h' = Step (7)
  };
  const Lab2 = {
    L: LabInput2.L,
    a: LabInput2.a,
    b: LabInput2.b,
    C: null, // chroma = Step (2)
    a1: null, // a' = Step (5)
    C1: null, // C' = Step (6)
    h1: null, // h' = Step (7)
  };

  // weighting factors
  const kL = 1;
  const kC = 1;
  const kH = 1;

  // ------------------------------------
  // Part 1.
  // Calculate Chroma (C), h1

  // calculate chroma for each color
  // Step (2)
  Lab1.C = chroma(LabInput1.a, LabInput1.b);
  Lab2.C = chroma(LabInput2.a, LabInput2.b);

  // average of the two chromas
  // Step (3)
  const cromaAverage = (Lab1.C + Lab2.C) / 2;

  // G = Step (4)
  const G = 0.5 * (1 - Math.sqrt(cromaAverage ** 7 / (cromaAverage ** 7 + 25 ** 7)));

  // a' = Step (5)
  Lab1.a1 = (1 + G) * Lab1.a;
  Lab2.a1 = (1 + G) * Lab2.a;

  // C' = Step (6)
  Lab1.C1 = Math.sqrt(Lab1.a1 ** 2 + Lab1.b ** 2);
  Lab2.C1 = Math.sqrt(Lab2.a1 ** 2 + Lab2.b ** 2);

  // h' = Step (7)
  const h1Helper = (a1, b) => {
    if (a1 === 0 && b === 0) {
      return 0;
    }
    if (b >= 0) {
      return toDegrees(Math.atan2(b, a1));
    }
    return toDegrees(Math.atan2(b, a1)) + 360;
  };
  Lab1.h1 = h1Helper(Lab1.a1, Lab1.b);
  Lab2.h1 = h1Helper(Lab2.a1, Lab2.b);

  // ------------------------------------
  // Part 2.
  // Now calculate the signed differences in
  // lightness, chroma, and hue

  // ΔL' = Step (8)
  // the delta for lightness
  const ΔL1 = Lab1.L - Lab2.L;

  // ΔC' = Step (9)
  // the delta for chroma
  const ΔC1 = Lab2.C1 - Lab1.C1;

  // Δh' = Step (10)
  const Δh1 = (() => {
    if ((Lab1.C1 * Lab2.C1) === 0) {
      return 0;
    }
    if (Math.abs(Lab2.h1 - Lab1.h1) <= 180) {
      return Lab2.h1 - Lab1.h1;
    }
    if ((Lab2.h1 - Lab1.h1) > 180) {
      return (Lab2.h1 - Lab1.h1) - 360;
    }
    return (Lab2.h1 - Lab1.h1) + 360;
  })();

  // ΔH' = Step (11)
  const ΔH1 = 2 * Math.sqrt(Lab1.C1 * Lab2.C1) * Math.sin(toRad(Δh1 / 2));

  // ------------------------------------
  // Part 3.
  // Calculate CIEDE2000 Color-Difference

  // L' = Step (12)
  const L1 = (Lab1.L + Lab2.L) / 2;
  // C' = Step (13)
  const C1 = (Lab1.C1 + Lab2.C1) / 2;
  // h' = Step (14)
  const hDiff = (() => {
    if ((Lab1.C1 * Lab2.C1) === 0) {
      return Lab1.h1 + Lab2.h1;
    }

    if (Math.abs(Lab2.h1 - Lab1.h1) > 180) {
      if ((Lab2.h1 + Lab1.h1) < 360) {
        return ((Lab1.h1 + Lab2.h1) + 360) / 2;
      }
      return ((Lab1.h1 + Lab2.h1) - 360) / 2;
    }
    return (Lab1.h1 + Lab2.h1) / 2;
  })();

  const L1Minus50pow2 = ((L1 - 50) ** 2);

  const SL = 1 + ((0.015 * L1Minus50pow2) / Math.sqrt(20 + L1Minus50pow2));

  const SC = 1 + 0.045 * C1;

  const T = 1 - 0.17 * Math.cos(toRad(hDiff - 30)) + 0.24 * Math.cos(toRad(2 * hDiff)) + 0.32 * Math.cos(toRad(3 * hDiff + 6)) - 0.20 * Math.cos(toRad(4 * hDiff - 63));

  const SH = 1 + 0.015 * C1 * T;

  const dTheta = 30 * Math.exp(-1 * (((hDiff - 275) / 25) ** 2));

  const RC = 2 * Math.sqrt(C1 ** 7 / (C1 ** 7 + 25 ** 7));

  const RT = 0 - Math.sin(toRad(2 * dTheta)) * RC;

  const dkL = ΔL1 / (kL * SL);
  const dkC = ΔC1 / (kC * SC);
  const dkH = ΔH1 / (kH * SH);

  const CIEDE2000 = Math.sqrt(dkL ** 2 + dkC ** 2 + dkH ** 2 + RT * dkC * dkH);

  return CIEDE2000;
};


export default CIEDE2000;
