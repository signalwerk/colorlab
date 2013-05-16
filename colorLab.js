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

            console.log( this.L(), this.a(), this.b() );
            console.log( newPoint.CIELAB.L(), newPoint.CIELAB.a(), newPoint.CIELAB.b() );

            // code here
            // weighting factors
            var KL = 1;
            var KC = 1;
            var KH = 1;

            // the two colorLab Values
            var L1 = this.L();
            var a1 = this.a();
            var b1 = this.b();

            var L2 = newPoint.CIELAB.L();
            var a2 = newPoint.CIELAB.a();
            var b2 = newPoint.CIELAB.b();

            // Step 1: calculate C
            var C1 = Math.sqrt(a1 * a1 + b1 * b1);
            var C2 = Math.sqrt(a2 * a2 + b2 * b2);

            // Step 2: calculate aNew, CNew, hNew
            var Cdurchschnitt = (C1 + C2) / 2;
            var G = 0.5 * (1 - Math.sqrt(Math.pow(Cdurchschnitt, 7) / (Math.pow(Cdurchschnitt, 7) + Math.pow(25, 7))));

            var L1new = L1;
            var a1new = (1 + G) * a1;
            var b1new = b1;

            var L2new = L2;
            var a2new = (1 + G) * a2;
            var b2new = b2;

            var C1new = Math.sqrt(Math.pow(a1new, 2) + Math.pow(b1new, 2));
            var C2new = Math.sqrt(Math.pow(a2new, 2) + Math.pow(b2new, 2));




            console.log("C1:" + " " + C1);
            console.log("C2:" + " " + C2);
            console.log("Cdurchschnitt:" + " " + Cdurchschnitt);
            console.log("G:" + " " + G);
            console.log("L1new:" + " " + L1new);
            console.log("a1new:" + " " + a1new);
            console.log("b1new:" + " " + b1new);
            console.log("L2new:" + " " + L2new);
            console.log("a2new:" + " " + a2new);
            console.log("b2new:" + " " + b2new);
            console.log("C1new:" + " " + C1new);
            console.log("C2new:" + " " + C2new);


            return 222;
        },




        // plot the Lab-Values
        toString: function() {
            return 'L: ' + this.CIELAB.L() + ', a: ' + this.CIELAB.a() + ', b: ' + this.CIELAB.b();
        },

        // shorthand for toString
        print: function() {
            return this.CIELAB.toString();
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




