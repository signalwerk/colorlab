
export const sRrbGammaCompensate = (linearValue) => {
  // sRGB Gamma corrections
  // sRGB-Standard = Gamma 2.4 (average ~2.2)
  // Gamma correction is linear for <= 0.0031308
  // Gamma correction is nonlinear for > 0.0031308

  if (linearValue < 0) {
    return 0;
  }
  if (linearValue <= 0.0031308) {
    return 12.92 * linearValue;
  }
  return (1.055 * (linearValue ** (1.0 / 2.4))) - 0.055;
};


export const gammaCompensate = (linearValue, gamma) => linearValue ** (1 / gamma);
