(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["colorlab"] = factory();
	else
		root["colorlab"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _CIELAB = __webpack_require__(1);
	
	var _CIELAB2 = _interopRequireDefault(_CIELAB);
	
	var _CIEDE = __webpack_require__(2);
	
	var _CIEDE2 = _interopRequireDefault(_CIEDE);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Colorlab = function () {
	  function Colorlab() {
	    _classCallCheck(this, Colorlab);
	  }
	
	  _createClass(Colorlab, null, [{
	    key: 'VERSION',
	
	
	    // constatnats
	    // Current version of the library.
	    get: function get() {
	      return '0.2.3';
	    }
	  }, {
	    key: 'kK',
	    get: function get() {
	      return 24389.0 / 27.0; // 903.296296296
	    }
	  }, {
	    key: 'kE',
	    get: function get() {
	      return 216.0 / 24389.0; // 0.00885645167
	    }
	
	    // constructor() {
	    //
	    // }
	
	  }]);
	
	  return Colorlab;
	}();
	
	Colorlab.CIELAB = _CIELAB2.default;
	Colorlab.CIEDE2000 = _CIEDE2.default;
	
	exports.default = Colorlab;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _CIEDE2 = __webpack_require__(2);
	
	var _CIEDE3 = _interopRequireDefault(_CIEDE2);
	
	var _helper = __webpack_require__(3);
	
	var _CIEXYZ = __webpack_require__(4);
	
	var _CIEXYZ2 = _interopRequireDefault(_CIEXYZ);
	
	var _illuminant = __webpack_require__(5);
	
	var _gamma = __webpack_require__(6);
	
	var _RGB = __webpack_require__(7);
	
	var _RGB2 = _interopRequireDefault(_RGB);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// D65
	var XYZ2RGBMtx = {
	
	  CIED65: {
	    AdobeRGB: { name: 'Adobe RGB (1998)', m1: 2.04148, m2: -0.969258, m3: 0.0134455, m4: -0.564977, m5: 1.87599, m6: -0.118373, m7: -0.344713, m8: 0.0415557, m9: 1.01527, gamma: 2.2, gammastyle: 'nonlinear' }, // precise gamma: 563/256 (2.19921875)
	    AppleRGB: { name: 'Apple RGB', m1: 2.95176, m2: -1.0851, m3: 0.0854804, m4: -1.28951, m5: 1.99084, m6: -0.269456, m7: -0.47388, m8: 0.0372023, m9: 1.09113, gamma: 1.8 },
	    ECIRGB: { name: 'ECI RGB', m1: 1.78276, m2: -0.959362, m3: 0.0859318, m4: -0.496985, m5: 1.9478, m6: -0.174467, m7: -0.26901, m8: -0.0275807, m9: 1.32283, gamma: 1.8 },
	    sRGB: { name: 'sRGB', m1: 3.24071, m2: -0.969258, m3: 0.0556352, m4: -1.53726, m5: 1.87599, m6: -0.203996, m7: -0.498571, m8: 0.0415557, m9: 1.05707, gamma: 2.4, gammastyle: 'sRGB' }
	  }
	};
	
	var CIELAB = function () {
	  function CIELAB(L, a, b) {
	    _classCallCheck(this, CIELAB);
	
	    this.L = L;
	    this.a = a;
	    this.b = b;
	  }
	
	  _createClass(CIELAB, [{
	    key: 'toString',
	    value: function toString() {
	      return 'L: ' + this.L + ', a: ' + this.a + ', b: ' + this.b;
	    }
	  }, {
	    key: 'CIEDE2000',
	    value: function CIEDE2000(color2) {
	      return (0, _CIEDE3.default)(this, color2);
	    }
	  }, {
	    key: 'interpolate',
	    value: function interpolate(color2, factor) {
	      var newCol = new CIELAB();
	      newCol.L = this.L * factor + color2.L * (1 - factor);
	      newCol.a = this.a * factor + color2.a * (1 - factor);
	      newCol.b = this.b * factor + color2.b * (1 - factor);
	      return newCol;
	    }
	
	    // Convert Lab to XYZ
	
	  }, {
	    key: 'toCIExyz',
	    value: function toCIExyz(RefWhite) {
	      var fHelper = function fHelper(t, m) {
	        var p = Math.pow(t, 3);
	
	        if (p > 216.0 / 24389.0) {
	          // 216.0 / 24389.0 = 0.00885645167
	          return p * m;
	        }
	        return (t - 16.0 / 116.0) / 7.787 * m;
	      };
	
	      var fy = (this.L + 16.0) / 116.0;
	      var fx = this.a / 500.0 + fy;
	      var fz = fy - this.b / 200.0;
	
	      var xyz = {};
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
	
	  }, {
	    key: 'toSRGB',
	    value: function toSRGB() {
	      var xyz = this.toCIExyz(_illuminant.D65);
	      var linearRGB = (0, _CIEXYZ2.default)(xyz, XYZ2RGBMtx.CIED65.sRGB);
	
	      var rgbOut = new _RGB2.default();
	      rgbOut.R = (0, _gamma.sRrbGammaCompensate)(linearRGB.R) * 255;
	      rgbOut.G = (0, _gamma.sRrbGammaCompensate)(linearRGB.G) * 255;
	      rgbOut.B = (0, _gamma.sRrbGammaCompensate)(linearRGB.B) * 255;
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
	
	  }, {
	    key: 'L',
	    set: function set(L) {
	      this.privateL = (0, _helper.clamp)(L, 0, 100);
	    },
	    get: function get() {
	      return this.privateL;
	    }
	  }, {
	    key: 'a',
	    set: function set(a) {
	      this.privateA = (0, _helper.clamp)(a, -128, 128);
	    },
	    get: function get() {
	      return this.privateA;
	    }
	  }, {
	    key: 'b',
	    set: function set(b) {
	      this.privateB = (0, _helper.clamp)(b, -128, 128);
	    },
	    get: function get() {
	      return this.privateB;
	    }
	  }, {
	    key: 'chroma',
	    get: function get() {
	      return (0, _helper.chroma)(this.a, this.b);
	    }
	  }]);
	
	  return CIELAB;
	}();
	
	exports.default = CIELAB;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _helper = __webpack_require__(3);
	
	var CIEDE2000 = function CIEDE2000(LabInput1, LabInput2) {
	  // Input Lab pairs
	  var Lab1 = {
	    L: LabInput1.L,
	    a: LabInput1.a,
	    b: LabInput1.b,
	    C: null, // chroma = Step (2)
	    a1: null, // a' = Step (5)
	    C1: null, // C' = Step (6)
	    h1: null };
	  var Lab2 = {
	    L: LabInput2.L,
	    a: LabInput2.a,
	    b: LabInput2.b,
	    C: null, // chroma = Step (2)
	    a1: null, // a' = Step (5)
	    C1: null, // C' = Step (6)
	    h1: null };
	
	  // weighting factors
	  var kL = 1;
	  var kC = 1;
	  var kH = 1;
	
	  // ------------------------------------
	  // Part 1.
	  // Calculate Chroma (C), h1
	
	  // calculate chroma for each color
	  // Step (2)
	  Lab1.C = (0, _helper.chroma)(LabInput1.a, LabInput1.b);
	  Lab2.C = (0, _helper.chroma)(LabInput2.a, LabInput2.b);
	
	  // average of the two chromas
	  // Step (3)
	  var cromaAverage = (Lab1.C + Lab2.C) / 2;
	
	  // G = Step (4)
	  var G = 0.5 * (1 - Math.sqrt(Math.pow(cromaAverage, 7) / (Math.pow(cromaAverage, 7) + Math.pow(25, 7))));
	
	  // a' = Step (5)
	  Lab1.a1 = (1 + G) * Lab1.a;
	  Lab2.a1 = (1 + G) * Lab2.a;
	
	  // C' = Step (6)
	  Lab1.C1 = Math.sqrt(Math.pow(Lab1.a1, 2) + Math.pow(Lab1.b, 2));
	  Lab2.C1 = Math.sqrt(Math.pow(Lab2.a1, 2) + Math.pow(Lab2.b, 2));
	
	  // h' = Step (7)
	  var h1Helper = function h1Helper(a1, b) {
	    if (a1 === 0 && b === 0) {
	      return 0;
	    }
	    if (b >= 0) {
	      return (0, _helper.toDegrees)(Math.atan2(b, a1));
	    }
	    return (0, _helper.toDegrees)(Math.atan2(b, a1)) + 360;
	  };
	  Lab1.h1 = h1Helper(Lab1.a1, Lab1.b);
	  Lab2.h1 = h1Helper(Lab2.a1, Lab2.b);
	
	  // ------------------------------------
	  // Part 2.
	  // Now calculate the signed differences in
	  // lightness, chroma, and hue
	
	  // ΔL' = Step (8)
	  // the delta for lightness
	  var ΔL1 = Lab1.L - Lab2.L;
	
	  // ΔC' = Step (9)
	  // the delta for chroma
	  var ΔC1 = Lab2.C1 - Lab1.C1;
	
	  // Δh' = Step (10)
	  var Δh1 = function () {
	    if (Lab1.C1 * Lab2.C1 === 0) {
	      return 0;
	    }
	    if (Math.abs(Lab2.h1 - Lab1.h1) <= 180) {
	      return Lab2.h1 - Lab1.h1;
	    }
	    if (Lab2.h1 - Lab1.h1 > 180) {
	      return Lab2.h1 - Lab1.h1 - 360;
	    }
	    return Lab2.h1 - Lab1.h1 + 360;
	  }();
	
	  // ΔH' = Step (11)
	  var ΔH1 = 2 * Math.sqrt(Lab1.C1 * Lab2.C1) * Math.sin((0, _helper.toRad)(Δh1 / 2));
	
	  // ------------------------------------
	  // Part 3.
	  // Calculate CIEDE2000 Color-Difference
	
	  // L' = Step (12)
	  var L1 = (Lab1.L + Lab2.L) / 2;
	  // C' = Step (13)
	  var C1 = (Lab1.C1 + Lab2.C1) / 2;
	  // h' = Step (14)
	  var hDiff = function () {
	    if (Lab1.C1 * Lab2.C1 === 0) {
	      return Lab1.h1 + Lab2.h1;
	    }
	
	    if (Math.abs(Lab2.h1 - Lab1.h1) > 180) {
	      if (Lab2.h1 + Lab1.h1 < 360) {
	        return (Lab1.h1 + Lab2.h1 + 360) / 2;
	      }
	      return (Lab1.h1 + Lab2.h1 - 360) / 2;
	    }
	    return (Lab1.h1 + Lab2.h1) / 2;
	  }();
	
	  var L1Minus50pow2 = Math.pow(L1 - 50, 2);
	
	  var SL = 1 + 0.015 * L1Minus50pow2 / Math.sqrt(20 + L1Minus50pow2);
	
	  var SC = 1 + 0.045 * C1;
	
	  var T = 1;
	  T -= 0.17 * Math.cos((0, _helper.toRad)(hDiff - 30));
	  T += 0.24 * Math.cos((0, _helper.toRad)(2 * hDiff));
	  T += 0.32 * Math.cos((0, _helper.toRad)(3 * hDiff + 6));
	  T -= 0.20 * Math.cos((0, _helper.toRad)(4 * hDiff - 63));
	
	  var SH = 1 + 0.015 * C1 * T;
	
	  var dTheta = 30 * Math.exp(-1 * Math.pow((hDiff - 275) / 25, 2));
	
	  var RC = 2 * Math.sqrt(Math.pow(C1, 7) / (Math.pow(C1, 7) + Math.pow(25, 7)));
	
	  var RT = 0 - Math.sin((0, _helper.toRad)(2 * dTheta)) * RC;
	
	  var dkL = ΔL1 / (kL * SL);
	  var dkC = ΔC1 / (kC * SC);
	  var dkH = ΔH1 / (kH * SH);
	
	  var finalCIEDE2000 = Math.sqrt(Math.pow(dkL, 2) + Math.pow(dkC, 2) + Math.pow(dkH, 2) + RT * dkC * dkH);
	
	  return finalCIEDE2000;
	}; // for more details see
	// http://www.ece.rochester.edu/~gsharma/ciede2000/
	// http://www.ece.rochester.edu/~gsharma/ciede2000/ciede2000noteCRNA.pdf
	// http://www.ece.rochester.edu/~gsharma/ciede2000/dataNprograms/deltaE2000.m
	// http://en.wikipedia.org/wiki/Color_difference
	
	// if you are not used to the new ECMAScript 7 pow notation:
	// 8 ** 7 === Math.pow(8, 7)
	
	exports.default = CIEDE2000;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var toDegrees = exports.toDegrees = function toDegrees(angle) {
	  return angle * (180 / Math.PI);
	};
	
	// Converts numeric degrees to radians
	var toRad = exports.toRad = function toRad(num) {
	  return num * Math.PI / 180;
	};
	
	// get chroma from (L)ab
	var chroma = exports.chroma = function chroma(a, b) {
	  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	};
	
	//  ECMAScript 2017
	// Math.clamp(x, lower, upper)
	var clamp = exports.clamp = function clamp(number, min, max) {
	  return Math.max(min, Math.min(number, max));
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	
	var xyzRGB = function xyzRGB(inXyz, RefMtx) {
	  var xyz = {
	    x: inXyz.x / 100.0,
	    y: inXyz.y / 100.0,
	    z: inXyz.z / 100.0
	  };
	
	  var RGB = {};
	  RGB.R = xyz.x * RefMtx.m1 + xyz.y * RefMtx.m4 + xyz.z * RefMtx.m7;
	  RGB.G = xyz.x * RefMtx.m2 + xyz.y * RefMtx.m5 + xyz.z * RefMtx.m8;
	  RGB.B = xyz.x * RefMtx.m3 + xyz.y * RefMtx.m6 + xyz.z * RefMtx.m9;
	
	  return RGB;
	};
	
	exports.default = xyzRGB;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// https://en.wikipedia.org/wiki/Illuminant_D65
	// https://en.wikipedia.org/wiki/Standard_illuminant
	// CIE Standard Illuminant D65
	
	var D65 = exports.D65 = {
	  X: 95.047,
	  Y: 100.00,
	  Z: 108.883
	};
	
	// https://ch.mathworks.com/help/images/ref/whitepoint.html
	var D50 = exports.D50 = {
	  X: 96.42,
	  Y: 100.00,
	  Z: 82.51
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var sRrbGammaCompensate = exports.sRrbGammaCompensate = function sRrbGammaCompensate(linearValue) {
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
	  return 1.055 * Math.pow(linearValue, 1.0 / 2.4) - 0.055;
	};
	
	var gammaCompensate = exports.gammaCompensate = function gammaCompensate(linearValue, gamma) {
	  return Math.pow(linearValue, 1 / gamma);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // https://www.w3.org/Graphics/Color/srgb
	
	
	var _helper = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RGB = function () {
	  function RGB(R, G, B) {
	    _classCallCheck(this, RGB);
	
	    this.R = R;
	    this.G = G;
	    this.B = B;
	  }
	
	  _createClass(RGB, [{
	    key: 'toString',
	    value: function toString() {
	      return 'R: ' + this.R + ', G: ' + this.G + ', B: ' + this.B;
	    }
	  }, {
	    key: 'toHexString',
	    value: function toHexString() {
	      return '#' + ('0' + parseInt(this.R, 10).toString(16)).slice(-2) + ('0' + parseInt(this.G, 10).toString(16)).slice(-2) + ('0' + parseInt(this.B, 10).toString(16)).slice(-2);
	    }
	  }, {
	    key: 'R',
	    set: function set(R) {
	      this.privateR = (0, _helper.clamp)(R, 0, 255);
	    },
	    get: function get() {
	      return this.privateR;
	    }
	  }, {
	    key: 'G',
	    set: function set(G) {
	      this.privateG = (0, _helper.clamp)(G, 0, 255);
	    },
	    get: function get() {
	      return this.privateG;
	    }
	  }, {
	    key: 'B',
	    set: function set(B) {
	      this.privateB = (0, _helper.clamp)(B, 0, 255);
	    },
	    get: function get() {
	      return this.privateB;
	    }
	  }]);
	
	  return RGB;
	}();
	
	exports.default = RGB;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=colorlab.js.map