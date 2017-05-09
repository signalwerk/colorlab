// for more details see
// http://www.ece.rochester.edu/~gsharma/ciede2000/
// http://www.ece.rochester.edu/~gsharma/ciede2000/ciede2000noteCRNA.pdf
// http://www.ece.rochester.edu/~gsharma/ciede2000/dataNprograms/deltaE2000.m
// http://en.wikipedia.org/wiki/Color_difference

import { toDegrees, toRad } from './helper';


const CIEDE2000 = (LabInput1, LabInput2) => {
  // console.log(LabInput1);
  // console.log(LabInput2);

  // Input Lab pairs
  const Lab1 = {
    L: LabInput1.L,
    a: LabInput1.a,
    b: LabInput1.b,
    C: LabInput1.chroma, // chroma = Step (2)
    a1: null, // a' = Step (5)
    C1: null, // C' = Step (6)
    h1: null, // h' = Step (7)
  };
  const Lab2 = {
    L: LabInput2.L,
    a: LabInput2.a,
    b: LabInput2.b,
    C: LabInput2.chroma, // chroma = Step (2)
    a1: null, // a' = Step (5)
    C1: null, // C' = Step (6)
    h1: null, // h' = Step (7)
  };

  // weighting factors
  let k_L = 1;
  let k_C = 1;
  let k_H = 1;

  // ------------------------------------
  // Step 1.
  // Calculate Chroma (C), h1


  // average of the two chromas
  // Step (3)
  const cromaAverage = (Lab1.C + Lab2.C) / 2;

  // G = Step (4)
  const G = 0.5 * (1 - Math.sqrt(Math.pow(cromaAverage, 7) / (Math.pow(cromaAverage, 7) + Math.pow(25, 7))));

  // a' = Step (5)
  Lab1.a1 = (1 + G) * Lab1.a;
  Lab2.a1 = (1 + G) * Lab2.a;

  // C' = Step (6)
  Lab1.C1 = Math.sqrt(Math.pow(Lab1.a1, 2) + Math.pow(Lab1.b, 2));
  Lab2.C1 = Math.sqrt(Math.pow(Lab2.a1, 2) + Math.pow(Lab2.b, 2));

  // h' = Step (7)
  const h1Helper = (a1, b) => {
    if (a1 === 0 && b === 0) {
      return 0;
    }
    if (b >= 0) {
      return toDegrees(Math.atan2(b, a1));
    } else {
      return toDegrees(Math.atan2(b, a1)) + 360;
    }
  }
  Lab1.h1 = h1Helper(Lab1.a1, Lab1.b);
  Lab2.h1 = h1Helper(Lab2.a1, Lab2.b);

  // ------------------------------------
  // Step 2.
  // Now calculate the signed differences in
  // lightness, chroma, and hue

  // get the delta h and delta H
  var deltah;
  if ((Lab1.C1 * Lab2.C1) === 0) {
    deltah = 0;
  } else {
    if (Math.abs(Lab2.h1 - Lab1.h1) <= 180) {
      deltah = Lab2.h1 - Lab1.h1;
    } else {
      if (Lab2.h1 - Lab1.h1 > 180) {
        deltah = Lab2.h1 - Lab1.h1 - 360;
      } else {
        deltah = Lab2.h1 - Lab1.h1 + 360;
      }
    }
  }
  var deltaH = 2 * Math.sqrt(Lab1.C1 * Lab2.C1) * Math.sin(toRad(deltah / 2));

  // console.log('deltah: ', deltah);
  // console.log('deltaH: ', deltaH);

  // the delta for lightness
  const deltaL = Lab1.L - Lab2.L;
  // console.log('deltaL', deltaL);

  // the delta for chroma
  const deltaC = Lab2.C1 - Lab1.C1;
  // console.log('deltaC', deltaC);


  // Calculate CIEDE2000 Color-Difference

  var L_ave = (Lab1.L + Lab2.L) / 2;
  var C_1ave = (Lab1.C1 + Lab2.C1) / 2;

  // console.log('L_ave', L_ave);
  // console.log('C_1ave', C_1ave);

  var hDiff;
  if ((Lab1.C1 * Lab2.C1) === 0) {
    hDiff = Lab1.h1 + Lab2.h1;
  } else {
    if (Math.abs(Lab2.h1 - Lab1.h1) > 180) {
      if ((Lab2.h1 + Lab1.h1) < 360) {
        hDiff = Lab1.h1 + Lab2.h1 + 360;
      } else {
        hDiff = Lab1.h1 + Lab2.h1 - 360;
      }
    } else {
      hDiff = Lab1.h1 + Lab2.h1;
    }
    hDiff = hDiff / 2;
  }

  // console.log('hDiff', hDiff);


  var L_aveMinus50pow2 = Math.pow((L_ave - 50), 2);
  // console.log('L_aveMinus50pow2', L_aveMinus50pow2);


  var SL = 1 + ((0.015 * L_aveMinus50pow2) / Math.sqrt(20 + L_aveMinus50pow2));
  // console.log('SL', SL);

  var SC = 1 + 0.045 * C_1ave;
  // console.log('SC', SC);


  var T = 1 - 0.17 * Math.cos(toRad(hDiff - 30)) + 0.24 * Math.cos(toRad(2 * hDiff)) + 0.32 * Math.cos(toRad(3 * hDiff + 6)) - 0.20 * Math.cos(toRad(4 * hDiff - 63));

  // console.log('T', T);

  var SH = 1 + 0.015 * C_1ave * T;
  // console.log('SH', SH);

  var dTheta = 30 * Math.exp(-1 * Math.pow((hDiff - 275) / 25, 2));
  // console.log('dTheta', dTheta);

  var RC = 2 * Math.sqrt(Math.pow(C_1ave, 7) / (Math.pow(C_1ave, 7) + Math.pow(25, 7)));
  // console.log('RC', RC);

  var RT = 0 - Math.sin(toRad(2 * dTheta)) * RC;
  // console.log('RT', RT);



  var dkL = deltaL / (k_L * SL);
  var dkC = deltaC / (k_C * SC);
  var dkH = deltaH / (k_H * SH);

  // console.log('dkL', dkL);
  // console.log('dkC', dkC);
  // console.log('dkH', dkH);

  var CIEDE2000 = Math.sqrt(Math.pow(dkL, 2) + Math.pow(dkC, 2) + Math.pow(dkH, 2) + RT * dkC * dkH);

  // console.log('CIEDE2000', CIEDE2000);

  return CIEDE2000;

}


export default CIEDE2000;
