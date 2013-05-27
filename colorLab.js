//     colorLab.js 0.0.1

//     (c) 2013 Stefan Huber, Signalwerk GmbH
//     colorLab may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://colorlabjs.org
//     
//     

// Design-Patterns inspired by
// http://www.nixtu.info/2011/05/using-jsshaper-to-provide-operator.html
// https://github.com/tcorral/Design-Patterns-in-Javascript/blob/master/Chaining/Chainable.js



// colorLab Class
// ---------------
// At the moment there ist just support for CIELAB 
// Initialize the Class with 
// 
//
//     new colorLab('CIELAB', [2, 4, 6]);
// or 
// 
//     new colorLab('CIELAB');
//     



var colorLab = (function(space, values){

    // Initial Setup
    // -------------

    // Save a reference to the global object 
    var root = this;


    // Current version of the library.
    this.VERSION = '0.0.1';

    this._currentSpace = "none";
    this._CIELAB = {};

    this.helper = {};

    this.helper.math = {

        toDegrees: function(angle) {
          return angle * (180 / Math.PI);
        },

        // Converts numeric degrees to radians 
        toRad: function(num) {
            return num * Math.PI / 180;
        }
    };

    // ### to work in the CIELAB colorspace
    // use it with `colorLab.CIELAB`
    this.CIELAB = {
        init: function(L, a, b) {
            root._CIELAB = {L:0,a:0,b:0};
            this.L(L);
            this.a(a);
            this.b(b);
        },

        L: function(L) {
            if (L === undefined) {
                return root._CIELAB.L;
            } else {
                root._CIELAB.L = L;
            }
        },
        a: function(a) {
            if (a === undefined) {
                return root._CIELAB.a;
            } else {
                root._CIELAB.a = a;
            }
        },
        b: function(b) {
            if (b === undefined) {
                return root._CIELAB.b;
            } else {
                root._CIELAB.b = b;
            }
        },

        // add value to pint like `add({x:1,y:2})`
        add: function(other) {
            return this._fnTemplate(other, function(a, b) {return a + b;});
        },
        sub: function(other) {
            return this._fnTemplate(other, function(a, b) {return a - b;});
        },
        mul: function(other) {
            return this._fnTemplate(other, function(a, b) {return a * b;});
        },
        div: function(other) {
            return this._fnTemplate(other, function(a, b) {return a / b;});
        },
        floor: function() {
            return this._fnTemplate(null, function(a) {return Math.floor(a);});
        },
        round: function() {
            return this._fnTemplate(null, function(a) {return Math.round(a);});
        },

        // #### general function template
        // this is the general template to run the generalized functions
        _fnTemplate: function(other, op) {

            // run function without an additional numeric imput like `add(2)`
            if (typeof(other) === 'number') {
                this.L( op(this.L(), other) );
                this.a( op(this.a(), other) );
                this.b( op(this.b(), other) );
                return this;
            }

            // run function without an additional imput like `round()`
            if (other === null) {
                this.L( op(this.L()) );
                this.a( op(this.a()) );
                this.b( op(this.b()) );
                return this;
            }

            // run function without an additional imput of type colorLab or objects `add({L:2,a:3,b:2})`

            if (other.CIELAB === undefined) {
                this.L( op(this.L(), other.L) );
            } else {
                this.L( op(this.L(), other.CIELAB.L()) );
            }

            if (other.CIELAB === undefined) {
                this.a( op(this.a(), other.a) );
            } else {
                this.a( op(this.a(), other.CIELAB.a()) );
            }

            if (other.CIELAB === undefined) {
                this.b( op(this.b(), other.b) );
            } else {
                this.b( op(this.b(), other.CIELAB.b()) );
            }

            return this;
        },

        // find deltaE of two colorLab Variables
        CIEDE2000: function(newPoint) {

            // for more details see 
            // http://www.ece.rochester.edu/~gsharma/ciede2000/
            // http://www.ece.rochester.edu/~gsharma/ciede2000/ciede2000noteCRNA.pdf
            // http://www.ece.rochester.edu/~gsharma/ciede2000/dataNprograms/deltaE2000.m
            // http://en.wikipedia.org/wiki/Color_difference

            // console.log( this.L(), this.a(), this.b() );
            // console.log( newPoint.CIELAB.L(), newPoint.CIELAB.a(), newPoint.CIELAB.b() );

            // weighting factors
            var k_L = 1;
            var k_C = 1;
            var k_H = 1;

            // Input Lab pairs
            var Lab1 = {
                L: this.L(),
                a: this.a(),
                b: this.b()
            };
            var Lab2 = {
                L: newPoint.CIELAB.L(),
                a: newPoint.CIELAB.a(),
                b: newPoint.CIELAB.b()
            };

            // we calculate a C* to compensate later the for chroma
            Lab1.C = Math.sqrt(Math.pow(Lab1.a, 2) + Math.pow(Lab1.b, 2));
            Lab2.C = Math.sqrt(Math.pow(Lab2.a, 2) + Math.pow(Lab2.b, 2));

            var C_avr = (Lab1.C + Lab2.C) / 2; // average of the two C


            // console.log(Lab1);
            // console.log(Lab2);

            // get G for the colors
            var G = 0.5 * (1 - Math.sqrt(Math.pow(C_avr, 7) / (Math.pow(C_avr, 7) + Math.pow(25, 7))));
            // console.log("G", G);

            // add for both colors the a'
            Lab1.a_1 = (1 + G) * Lab1.a;
            Lab2.a_1 = (1 + G) * Lab2.a;

            // console.log("Lab1.a_1", Lab1.a_1);
            // console.log("Lab2.a_1", Lab2.a_1);

            // add for both colors the C'
            Lab1.C_1 = Math.sqrt(Math.pow(Lab1.a_1, 2) + Math.pow(Lab1.b, 2));
            Lab2.C_1 = Math.sqrt(Math.pow(Lab2.a_1, 2) + Math.pow(Lab2.b, 2));

            // console.log("Lab1.C_1", Lab1.C_1);
            // console.log("Lab2.C_1", Lab2.C_1);


            // add h' for both colors
            if (Lab1.a_1 === 0 && Lab1.b === 0) {
                Lab1.h = 0;
            } else {
                if (Lab1.b >= 0) {
                    Lab1.h = root.helper.math.toDegrees(Math.atan2(Lab1.b, Lab1.a_1));
                } else {
                    Lab1.h = root.helper.math.toDegrees(Math.atan2(Lab1.b, Lab1.a_1)) + 360;
                }
            }

            if (Lab2.a_1 === 0 && Lab2.b === 0) {
                Lab2.h = 0;
            } else {
                if (Lab2.b >= 0) {
                    Lab2.h = root.helper.math.toDegrees(Math.atan2(Lab2.b, Lab2.a_1));
                } else {
                    Lab2.h = root.helper.math.toDegrees(Math.atan2(Lab2.b, Lab2.a_1)) + 360;
                }
            }

            // console.log("Lab1.h",Lab1.h);
            // console.log("Lab2.h",Lab2.h);



            // Now calculate the signed differences in lightness, chroma, and hue

            // get the delta h and delta H
            var deltah;
            if ( ( Lab1.C_1 * Lab2.C_1 ) === 0 ) {
               deltah = 0;
            } else {
               if ( Math.abs( Lab2.h - Lab1.h ) <= 180 ) {
                  deltah = Lab2.h - Lab1.h;
               } else {
                  if ( Lab2.h - Lab1.h > 180 ) {
                    deltah = Lab2.h - Lab1.h - 360;
                  } else {
                    deltah = Lab2.h - Lab1.h + 360;
                  }
               }
            }
            var deltaH = 2 * Math.sqrt( Lab1.C_1 * Lab2.C_1 ) * Math.sin( root.helper.math.toRad( deltah / 2 ) );

            // console.log("deltah: ", deltah);
            // console.log("deltaH: ", deltaH);

            // the delta for lightness
            var deltaL = Lab1.L - Lab2.L;
            // console.log("deltaL", deltaL);


            // the delta for chroma
            var deltaC = Lab2.C_1 - Lab1.C_1;
            // console.log("deltaC", deltaC);


            // Calculate CIEDE2000 Color-Difference 

            var L_ave = (Lab1.L + Lab2.L) / 2;
            var C_1ave = (Lab1.C_1 + Lab2.C_1) / 2;

            // console.log("L_ave", L_ave);
            // console.log("C_1ave", C_1ave);

            var hDiff;
            if ( ( Lab1.C_1 * Lab2.C_1 ) === 0 ) {
               hDiff = Lab1.h + Lab2.h;
            } else {
               if ( Math.abs( Lab2.h - Lab1.h ) >  180 ) {
                  if ( ( Lab2.h  + Lab1.h ) <  360 ) {
                    hDiff = Lab1.h + Lab2.h + 360;
                  } else {
                    hDiff = Lab1.h + Lab2.h - 360;
                  }
               } else {
                  hDiff = Lab1.h + Lab2.h ;
               }
               hDiff = hDiff / 2;
            }

            // console.log("hDiff", hDiff);


            var L_aveMinus50pow2 = Math.pow((L_ave - 50), 2);
            // console.log("L_aveMinus50pow2", L_aveMinus50pow2);


            var SL = 1 + ((0.015 * L_aveMinus50pow2) / Math.sqrt(20 + L_aveMinus50pow2));
            // console.log("SL", SL);

            var SC = 1 + 0.045 * C_1ave;
            // console.log("SC", SC);


            var T = 1 - 0.17 * Math.cos( root.helper.math.toRad( hDiff - 30 ) ) + 0.24 * Math.cos( root.helper.math.toRad( 2 * hDiff ) ) + 0.32 * Math.cos( root.helper.math.toRad( 3 * hDiff + 6 ) ) - 0.20 * Math.cos( root.helper.math.toRad( 4 * hDiff - 63 ) );

            // console.log("T", T);

            var SH = 1 + 0.015 * C_1ave * T;
            // console.log("SH", SH);

            var dTheta = 30 * Math.exp(-1 * Math.pow((hDiff - 275 ) / 25, 2));
            // console.log("dTheta", dTheta);

            var RC = 2 * Math.sqrt(Math.pow(C_1ave, 7) / (Math.pow(C_1ave, 7) + Math.pow(25, 7)));
            // console.log("RC", RC);

            var RT = 0 - Math.sin(root.helper.math.toRad( 2 * dTheta)) * RC;
            // console.log("RT", RT);



            var dkL = deltaL / (k_L * SL);
            var dkC = deltaC / (k_C * SC);
            var dkH = deltaH / (k_H * SH);

            // console.log("dkL", dkL);
            // console.log("dkC", dkC);
            // console.log("dkH", dkH);

            var CIEDE2000 = Math.sqrt(Math.pow(dkL, 2) + Math.pow(dkC, 2) + Math.pow(dkH, 2) + RT * dkC * dkH );

            // console.log("CIEDE2000", CIEDE2000);

            return CIEDE2000;

        },




        // plot the Lab-Values
        toString: function() {
            return 'L: ' + this.L() + ', a: ' + this.a() + ', b: ' + this.b();
        },

        // shorthand for toString
        print: function() {
            return this.toString();
        }
    };



    if (space !== undefined) {

        switch (space)
        {
        case 'CIELAB':
            this._currentSpace = space;

            if (values === undefined) {
                this.CIELAB.init(0,0,0);
            } else {
                this.CIELAB.init(values[0], values[1], values[2]);
            }
            break;
        default:
            throw {
                type:       "implementation",
                message:     "at the moment you can just use CIELAB-Colorspce."
            };
        }
    }



});




