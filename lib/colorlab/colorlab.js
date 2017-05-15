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
	            return '0.2.2';
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	    key: 'chroma',
	    get: function get() {
	      return (0, _helper.chroma)(this.a, this.b);
	    }
	  }, {
	    key: 'L',
	    set: function set(L) {
	      this._L = Math.min(100, Math.max(-100, L));
	    },
	    get: function get() {
	      return this._L;
	    }
	  }, {
	    key: 'a',
	    set: function set(a) {
	      this._a = Math.min(128, Math.max(-128, a));
	    },
	    get: function get() {
	      return this._a;
	    }
	  }, {
	    key: 'b',
	    set: function set(b) {
	      this._b = Math.min(128, Math.max(-128, b));
	    },
	    get: function get() {
	      return this._b;
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
	
	  var T = 1 - 0.17 * Math.cos((0, _helper.toRad)(hDiff - 30)) + 0.24 * Math.cos((0, _helper.toRad)(2 * hDiff)) + 0.32 * Math.cos((0, _helper.toRad)(3 * hDiff + 6)) - 0.20 * Math.cos((0, _helper.toRad)(4 * hDiff - 63));
	
	  var SH = 1 + 0.015 * C1 * T;
	
	  var dTheta = 30 * Math.exp(-1 * Math.pow((hDiff - 275) / 25, 2));
	
	  var RC = 2 * Math.sqrt(Math.pow(C1, 7) / (Math.pow(C1, 7) + Math.pow(25, 7)));
	
	  var RT = 0 - Math.sin((0, _helper.toRad)(2 * dTheta)) * RC;
	
	  var dkL = ΔL1 / (kL * SL);
	  var dkC = ΔC1 / (kC * SC);
	  var dkH = ΔH1 / (kH * SH);
	
	  var CIEDE2000 = Math.sqrt(Math.pow(dkL, 2) + Math.pow(dkC, 2) + Math.pow(dkH, 2) + RT * dkC * dkH);
	
	  return CIEDE2000;
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
	
	// Convert from 0-1 to 0-255
	var to8bit = exports.to8bit = function to8bit(num) {
	  return root.helper.math.range8bit(num * 255);
	};
	
	// Convert from 0-1 to 0-255
	var range8bit = exports.range8bit = function range8bit(num) {
	  return Math.round(Math.min(255, Math.max(0, num)));
	};
	
	// get chroma from (L)ab
	var chroma = exports.chroma = function chroma(a, b) {
	  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=colorlab.js.map