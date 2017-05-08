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
	            return '0.2.0';
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
	      return Math.sqrt(Math.pow(this.a, 2) + Math.pow(this.b, 2));
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
	  // console.log(LabInput1);
	  // console.log(LabInput2);
	
	  // Input Lab pairs
	  var Lab1 = {
	    L: LabInput1.L,
	    a: LabInput1.a,
	    b: LabInput1.b,
	    C: LabInput1.chroma };
	  var Lab2 = {
	    L: LabInput2.L,
	    a: LabInput2.a,
	    b: LabInput2.b,
	    C: LabInput2.chroma };
	
	  // weighting factors
	  var k_L = 1;
	  var k_C = 1;
	  var k_H = 1;
	
	  var C_avr = (Lab1.C + Lab2.C) / 2; // average of the two C
	
	  // get G for the colors
	  var G = 0.5 * (1 - Math.sqrt(Math.pow(C_avr, 7) / (Math.pow(C_avr, 7) + Math.pow(25, 7))));
	  // console.log('G', G);
	
	  // add for both colors the a'
	  Lab1.a_1 = (1 + G) * Lab1.a;
	  Lab2.a_1 = (1 + G) * Lab2.a;
	  // console.log('Lab1.a_1', Lab1.a_1);
	  // console.log('Lab2.a_1', Lab2.a_1);
	
	  // add for both colors the C'
	  Lab1.C_1 = Math.sqrt(Math.pow(Lab1.a_1, 2) + Math.pow(Lab1.b, 2));
	  Lab2.C_1 = Math.sqrt(Math.pow(Lab2.a_1, 2) + Math.pow(Lab2.b, 2));
	  // console.log('Lab1.C_1', Lab1.C_1);
	  // console.log('Lab2.C_1', Lab2.C_1);
	
	  // add h' for both colors
	  if (Lab1.a_1 === 0 && Lab1.b === 0) {
	    Lab1.h = 0;
	  } else {
	    if (Lab1.b >= 0) {
	      Lab1.h = (0, _helper.toDegrees)(Math.atan2(Lab1.b, Lab1.a_1));
	    } else {
	      Lab1.h = (0, _helper.toDegrees)(Math.atan2(Lab1.b, Lab1.a_1)) + 360;
	    }
	  }
	
	  if (Lab2.a_1 === 0 && Lab2.b === 0) {
	    Lab2.h = 0;
	  } else {
	    if (Lab2.b >= 0) {
	      Lab2.h = (0, _helper.toDegrees)(Math.atan2(Lab2.b, Lab2.a_1));
	    } else {
	      Lab2.h = (0, _helper.toDegrees)(Math.atan2(Lab2.b, Lab2.a_1)) + 360;
	    }
	  }
	
	  // console.log('Lab1.h', Lab1.h);
	  // console.log('Lab2.h', Lab2.h);
	
	
	  // Now calculate the signed differences in lightness, chroma, and hue
	
	  // get the delta h and delta H
	  var deltah;
	  if (Lab1.C_1 * Lab2.C_1 === 0) {
	    deltah = 0;
	  } else {
	    if (Math.abs(Lab2.h - Lab1.h) <= 180) {
	      deltah = Lab2.h - Lab1.h;
	    } else {
	      if (Lab2.h - Lab1.h > 180) {
	        deltah = Lab2.h - Lab1.h - 360;
	      } else {
	        deltah = Lab2.h - Lab1.h + 360;
	      }
	    }
	  }
	  var deltaH = 2 * Math.sqrt(Lab1.C_1 * Lab2.C_1) * Math.sin((0, _helper.toRad)(deltah / 2));
	
	  // console.log('deltah: ', deltah);
	  // console.log('deltaH: ', deltaH);
	
	  // the delta for lightness
	  var deltaL = Lab1.L - Lab2.L;
	  // console.log('deltaL', deltaL);
	
	
	  // the delta for chroma
	  var deltaC = Lab2.C_1 - Lab1.C_1;
	  // console.log('deltaC', deltaC);
	
	
	  // Calculate CIEDE2000 Color-Difference
	
	  var L_ave = (Lab1.L + Lab2.L) / 2;
	  var C_1ave = (Lab1.C_1 + Lab2.C_1) / 2;
	
	  // console.log('L_ave', L_ave);
	  // console.log('C_1ave', C_1ave);
	
	  var hDiff;
	  if (Lab1.C_1 * Lab2.C_1 === 0) {
	    hDiff = Lab1.h + Lab2.h;
	  } else {
	    if (Math.abs(Lab2.h - Lab1.h) > 180) {
	      if (Lab2.h + Lab1.h < 360) {
	        hDiff = Lab1.h + Lab2.h + 360;
	      } else {
	        hDiff = Lab1.h + Lab2.h - 360;
	      }
	    } else {
	      hDiff = Lab1.h + Lab2.h;
	    }
	    hDiff = hDiff / 2;
	  }
	
	  // console.log('hDiff', hDiff);
	
	
	  var L_aveMinus50pow2 = Math.pow(L_ave - 50, 2);
	  // console.log('L_aveMinus50pow2', L_aveMinus50pow2);
	
	
	  var SL = 1 + 0.015 * L_aveMinus50pow2 / Math.sqrt(20 + L_aveMinus50pow2);
	  // console.log('SL', SL);
	
	  var SC = 1 + 0.045 * C_1ave;
	  // console.log('SC', SC);
	
	
	  var T = 1 - 0.17 * Math.cos((0, _helper.toRad)(hDiff - 30)) + 0.24 * Math.cos((0, _helper.toRad)(2 * hDiff)) + 0.32 * Math.cos((0, _helper.toRad)(3 * hDiff + 6)) - 0.20 * Math.cos((0, _helper.toRad)(4 * hDiff - 63));
	
	  // console.log('T', T);
	
	  var SH = 1 + 0.015 * C_1ave * T;
	  // console.log('SH', SH);
	
	  var dTheta = 30 * Math.exp(-1 * Math.pow((hDiff - 275) / 25, 2));
	  // console.log('dTheta', dTheta);
	
	  var RC = 2 * Math.sqrt(Math.pow(C_1ave, 7) / (Math.pow(C_1ave, 7) + Math.pow(25, 7)));
	  // console.log('RC', RC);
	
	  var RT = 0 - Math.sin((0, _helper.toRad)(2 * dTheta)) * RC;
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
	}; // for more details see
	// http://www.ece.rochester.edu/~gsharma/ciede2000/
	// http://www.ece.rochester.edu/~gsharma/ciede2000/ciede2000noteCRNA.pdf
	// http://www.ece.rochester.edu/~gsharma/ciede2000/dataNprograms/deltaE2000.m
	// http://en.wikipedia.org/wiki/Color_difference
	
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=colorlab.js.map