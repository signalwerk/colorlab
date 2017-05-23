import CIEDE2000 from './CIEDE2000';
import { clamp, chroma } from './helper';
import xyzRGB from './CIEXYZ';
import { D65 } from './illuminant';
import { sRrbGammaCompensate } from './gamma';
import RGB from './RGB';


// D65
const XYZ2RGBMtx = {

  CIED65: {
    AdobeRGB: { name: 'Adobe RGB (1998)', m1: 2.04148, m2: -0.969258, m3: 0.0134455, m4: -0.564977, m5: 1.87599, m6: -0.118373, m7: -0.344713, m8: 0.0415557, m9: 1.01527, gamma: 2.2, gammastyle: 'nonlinear' }, // precise gamma: 563/256 (2.19921875)
    AppleRGB: { name: 'Apple RGB', m1: 2.95176, m2: -1.0851, m3: 0.0854804, m4: -1.28951, m5: 1.99084, m6: -0.269456, m7: -0.47388, m8: 0.0372023, m9: 1.09113, gamma: 1.8 },
    ECIRGB: { name: 'ECI RGB', m1: 1.78276, m2: -0.959362, m3: 0.0859318, m4: -0.496985, m5: 1.9478, m6: -0.174467, m7: -0.26901, m8: -0.0275807, m9: 1.32283, gamma: 1.8 },
    sRGB: { name: 'sRGB', m1: 3.24071, m2: -0.969258, m3: 0.0556352, m4: -1.53726, m5: 1.87599, m6: -0.203996, m7: -0.498571, m8: 0.0415557, m9: 1.05707, gamma: 2.4, gammastyle: 'sRGB' },
  },
};


class CIELAB {

  constructor(L, a, b) {
    this.L = L;
    this.a = a;
    this.b = b;
  }

  toString() {
    return `L: ${this.L}, a: ${this.a}, b: ${this.b}`;
  }

  set L(L) {
    this.privateL = clamp(L, 0, 100);
  }

  get L() {
    return this.privateL;
  }

  set a(a) {
    this.privateA = clamp(a, -128, 128);
  }
  get a() {
    return this.privateA;
  }

  set b(b) {
    this.privateB = clamp(b, -128, 128);
  }
  get b() {
    return this.privateB;
  }

  get chroma() {
    return chroma(this.a, this.b);
  }

  CIEDE2000(color2) {
    return CIEDE2000(this, color2);
  }

  interpolate(color2, factor) {
    const newCol = new CIELAB();
    newCol.L = (this.L * factor) + (color2.L * (1 - factor));
    newCol.a = (this.a * factor) + (color2.a * (1 - factor));
    newCol.b = (this.b * factor) + (color2.b * (1 - factor));
    return newCol;
  }

  // Convert Lab to XYZ
  toCIExyz(RefWhite) {
    const fHelper = (t, m) => {
      const p = t ** 3;

      if (p > (216.0 / 24389.0)) {  // 216.0 / 24389.0 = 0.00885645167
        return p * m;
      }
      return ((t - (16.0 / 116.0)) / 7.787) * m;
    };

    const fy = (this.L + 16.0) / 116.0;
    const fx = (this.a / 500.0) + fy;
    const fz = fy - (this.b / 200.0);

    const xyz = {};
    xyz.x = fHelper(fx, RefWhite.X);
    xyz.y = fHelper(fy, RefWhite.Y);
    xyz.z = fHelper(fz, RefWhite.Z);
    return xyz;
  }

  // 1. Convert Lab to (D50-adapted) XYZ
  // 2. Convert from a D50 whitepoint (used by Lab) to the D65 whitepoint used in sRGB, with the Bradford transform
  // 3. Convert from (D65-adapted) CIE XYZ to linear sRGB
  // 4. Convert from linear-light sRGB to sRGB (do gamma encoding)
  // source: https://drafts.csswg.org/css-color/
  toSRGB() {
    const xyz = this.toCIExyz(D65);
    const linearRGB = xyzRGB(xyz, XYZ2RGBMtx.CIED65.sRGB);

    const rgbOut = new RGB();
    rgbOut.R = sRrbGammaCompensate(linearRGB.R) * 255;
    rgbOut.G = sRrbGammaCompensate(linearRGB.G) * 255;
    rgbOut.B = sRrbGammaCompensate(linearRGB.B) * 255;
    return rgbOut;
  }


  // toRGB(RefWhite, RefMtx) {
  //   const xyz = this.toCIExyz(RefWhite);
  //   const linearRGB = xyzRGB(xyz, RefMtx);
  //
  //   const rgbOut = new RGB();
  //   rgbOut.R = gammaCompensate(linearRGB.R, RefMtx.gamma) * 255;
  //   rgbOut.G = gammaCompensate(linearRGB.G, RefMtx.gamma) * 255;
  //   rgbOut.B = gammaCompensate(linearRGB.B, RefMtx.gamma) * 255;
  // };
}

export default CIELAB;
