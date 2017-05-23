// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html

const xyzRGB = (inXyz, RefMtx) => {
  const xyz = {
    x: inXyz.x / 100.0,
    y: inXyz.y / 100.0,
    z: inXyz.z / 100.0,
  };

  const RGB = {};
  RGB.R = (xyz.x * RefMtx.m1) + (xyz.y * RefMtx.m4) + (xyz.z * RefMtx.m7);
  RGB.G = (xyz.x * RefMtx.m2) + (xyz.y * RefMtx.m5) + (xyz.z * RefMtx.m8);
  RGB.B = (xyz.x * RefMtx.m3) + (xyz.y * RefMtx.m6) + (xyz.z * RefMtx.m9);

  return RGB;
};

export default xyzRGB;
