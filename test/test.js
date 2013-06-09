// unit-tests

/**
 * >> function from jasmine framework (https://github.com/pivotal/jasmine)
 * Matcher that checks that the expected item is equal to the actual item
 * up to a given level of decimal precision (default 2).
 *
 * @param {Number} expected
 * @param {Number} precision, as number of decimal places
 */
function toBeCloseTo (expected, actual, precision) {
  if (!(precision === 0)) {
    precision = precision || 2;
  }
  return Math.abs(expected - actual) < (Math.pow(10, -precision) / 2);
}


// ---------------------------------------------
// ---------------------------------------------
module( "init Tests all" );

test( "wrong color system", function() {

     throws(
        function() {
         new colorLab('PANT', [1, 2, 3, 4]);
        }
      );
});


// ---------------------------------------------
// ---------------------------------------------
module( "init Tests LAB" );

test( "with values", function() {
	var a = new colorLab('CIELAB', [2, 4, 6]);

    equal(a.CIELAB.L(), 2);
    equal(a.CIELAB.a(), 4);
    equal(a.CIELAB.b(), 6);

});

test( "without values", function() {
	var a = new colorLab('CIELAB');

    equal(a.CIELAB.L(), 0);
    equal(a.CIELAB.a(), 0);
    equal(a.CIELAB.b(), 0);

});


// ---------------------------------------------
// ---------------------------------------------
module( "init Tests CMYK" );

test( "with values", function() {
    var a = new colorLab('CMYK', [2.5, 4.5, 6.5, 8.5]);

    equal(a.CMYK.C(), 2.5);
    equal(a.CMYK.M(), 4.5);
    equal(a.CMYK.Y(), 6.5);
    equal(a.CMYK.K(), 8.5);

});

test( "without values", function() {
    var a = new colorLab('CMYK');

    equal(a.CMYK.C(), 0);
    equal(a.CMYK.M(), 0);
    equal(a.CMYK.Y(), 0);
    equal(a.CMYK.K(), 0);

});


// ---------------------------------------------
// ---------------------------------------------
module( "set/get Tests CMYK" );

test( "without values", function() {
    var a = new colorLab('CMYK');
    a.CMYK.C(2.75);
    a.CMYK.M(4.75);
    a.CMYK.Y(6.75);
    a.CMYK.K(8.75);

    equal(a.CMYK.C(), 2.75);
    equal(a.CMYK.M(), 4.75);
    equal(a.CMYK.Y(), 6.75);
    equal(a.CMYK.K(), 8.75);

});

// ---------------------------------------------
// ---------------------------------------------
module( "set/get Tests LAB" );

test( "without values", function() {
    var a = new colorLab('CIELAB');
    a.CIELAB.L(2);
    a.CIELAB.a(4);
    a.CIELAB.b(6);

    equal(a.CIELAB.L(), 2);
    equal(a.CIELAB.a(), 4);
    equal(a.CIELAB.b(), 6);

});

// ---------------------------------------------
// ---------------------------------------------
module( "general calc CMYK" );

test( "add two points", function() {
    var a = new colorLab('CMYK', [1.25, 2.25, 3.25, 4.25]);
    var b = new colorLab('CMYK', [10.5, 20.5, 30.5, 40.5]);

    a.CMYK.add(b);

    equal(a.CMYK.C(), 11.75);
    equal(a.CMYK.M(), 22.75);
    equal(a.CMYK.Y(), 33.75);
    equal(a.CMYK.K(), 44.75);
});


// ---------------------------------------------
// ---------------------------------------------
module( "general calc LAB" );

test( "add two points", function() {
    var a = new colorLab('CIELAB', [1, 2, 3]);
    var b = new colorLab('CIELAB', [10, 20, 30]);

    a.CIELAB.add(b);

    equal(a.CIELAB.L(), 11);
    equal(a.CIELAB.a(), 22);
    equal(a.CIELAB.b(), 33);
});


// ---------------------------------------------
// ---------------------------------------------

test( "sub two points", function() {
    var a = new colorLab('CIELAB', [10, 20, 30]);
    var b = new colorLab('CIELAB', [1, 2, 3]);

    a.CIELAB.sub(b);

    equal(a.CIELAB.L(), 9);
    equal(a.CIELAB.a(), 18);
    equal(a.CIELAB.b(), 27);

    var c = new colorLab('CMYK', [10, 20, 30, 40]);
    var d = new colorLab('CMYK', [1, 2, 3, 4]);

    c.CMYK.sub(d);

    equal(c.CMYK.C(), 9);
    equal(c.CMYK.M(), 18);
    equal(c.CMYK.Y(), 27);
    equal(c.CMYK.K(), 36);

});

test( "div two points", function() {
    var a = new colorLab('CIELAB', [10, 24, 35]);
    var b = new colorLab('CIELAB', [2, 4, 5]);

    a.CIELAB.div(b);

    equal(a.CIELAB.L(), 5);
    equal(a.CIELAB.a(), 6);
    equal(a.CIELAB.b(), 7);

    var c = new colorLab('CMYK', [10, 24, 35, 48]);
    var d = new colorLab('CMYK', [2, 4, 5, 6]);

    c.CMYK.div(d);

    equal(c.CMYK.C(), 5);
    equal(c.CMYK.M(), 6);
    equal(c.CMYK.Y(), 7);
    equal(c.CMYK.K(), 8);
});

test( "floor a points", function() {
    var a = new colorLab('CIELAB', [0.1, 9.9, 100]);

    a.CIELAB.floor();

    equal(a.CIELAB.L(), 0);
    equal(a.CIELAB.a(), 9);
    equal(a.CIELAB.b(), 100);

    var c = new colorLab('CMYK', [0.1, 9.9, 100, 9.999]);

    c.CMYK.floor();

    equal(c.CMYK.C(), 0);
    equal(c.CMYK.M(), 9);
    equal(c.CMYK.Y(), 100);
    equal(c.CMYK.K(), 9);
});


test( "round a points", function() {
    var a = new colorLab('CIELAB', [0.49, 9.5, 100.51]);

    a.CIELAB.round();

    equal(a.CIELAB.L(), 0);
    equal(a.CIELAB.a(), 10);
    equal(a.CIELAB.b(), 101);

    var c = new colorLab('CMYK', [0.49, 9.5, 100.51, 10.0]);

    c.CMYK.round();

    equal(c.CMYK.C(), 0);
    equal(c.CMYK.M(), 10);
    equal(c.CMYK.Y(), 101);
    equal(c.CMYK.K(), 10);
});



// ---------------------------------------------
// ---------------------------------------------
module( "general output CMYK" );
test( "ouput", function() {
    var a = new colorLab('CMYK', [1.5, 2.5, 3.5, 4.5]);


    equal(a.CMYK.print(), "C: 1.5, M: 2.5, Y: 3.5, K: 4.5");
    deepEqual(a.CMYK.toArray(), [1.5, 2.5, 3.5, 4.5]);

});

// ---------------------------------------------
// ---------------------------------------------
module( "general output LAB" );
test( "ouput", function() {
    var a = new colorLab('CIELAB', [1, 2, 3]);


    equal(a.CIELAB.print(), "L: 1, a: 2, b: 3");
    deepEqual(a.CIELAB.toArray(), [1, 2, 3]);

});

// ---------------------------------------------
// ---------------------------------------------
module( "multiply" );

test( "two points", function() {

	var a = new colorLab('CIELAB', [2, 20, 200]);
	var b = new colorLab('CIELAB', [2, 3, 4]);

	a.CIELAB.mul(b);

    equal(a.CIELAB.L(), 4);
    equal(a.CIELAB.a(), 60);
    equal(a.CIELAB.b(), 800);

    var c = new colorLab('CMYK', [2, 20, 200, 2000]);
    var d = new colorLab('CMYK', [2, 3, 4, 5]);

    c.CMYK.mul(d);

    equal(c.CMYK.C(), 4);
    equal(c.CMYK.M(), 60);
    equal(c.CMYK.Y(), 800);
    equal(c.CMYK.K(), 10000);
});

test( "point with value", function() {

	var a = new colorLab('CIELAB', [2, 6, 8]);
	a.CIELAB.mul(2);


    equal(a.CIELAB.L(), 4);
    equal(a.CIELAB.a(), 12);
    equal(a.CIELAB.b(), 16);

    var c = new colorLab('CMYK', [2, 6, 8, 10]);

    c.CMYK.mul(2);

    equal(c.CMYK.C(), 4);
    equal(c.CMYK.M(), 12);
    equal(c.CMYK.Y(), 16);
    equal(c.CMYK.K(), 20);
});

test( "point with object of values", function() {

	var a = new colorLab('CIELAB', [2, 20, 200]);
	a.CIELAB.mul({L:2,a:3,b:4});

    equal(a.CIELAB.L(), 4);
    equal(a.CIELAB.a(), 60);
    equal(a.CIELAB.b(), 800);

    var c = new colorLab('CMYK', [2, 6, 8, 10]);

    c.CMYK.mul({C:2,M:3,Y:4,K:5});

    equal(c.CMYK.C(), 4);
    equal(c.CMYK.M(), 18);
    equal(c.CMYK.Y(), 32);
    equal(c.CMYK.K(), 50);
});

// ---------------------------------------------
// ---------------------------------------------


module( "Delta E" );


test( "Delta E of two CIELAB colors with 0", function() {

    var a = new colorLab('CIELAB', [0,0,0]);
    var b = new colorLab('CIELAB', [0,0,0]);

    var dE = a.CIELAB.CIEDE2000(b);

    ok(toBeCloseTo(dE, 0, 4), "The Delat E test. Exected: " +  0 + ", Result: " + dE);
    equal(a.CIELAB.CIEDE2000(b), b.CIELAB.CIEDE2000(a), "The order of the colors shouldnt matter to get Delta E");

});


test( "Delta E of two CIELAB colors", function() {

    var a = new colorLab('CIELAB', [50.0000, 2.6772, -79.7751]);
    var b = new colorLab('CIELAB', [50.0000, 0.0000, -82.7485]);

    var dE = a.CIELAB.CIEDE2000(b);

    ok(toBeCloseTo(dE, 2.0425, 4), "The Delat E test. Exected: " +  2.0425 + ", Result: " + dE);
    equal(a.CIELAB.CIEDE2000(b), b.CIELAB.CIEDE2000(a), "The order of the colors shouldnt matter to get Delta E");

});

test( "Delta E check with testdata", function() {
    // Source of testdata
    // http://www.ece.rochester.edu/~gsharma/ciede2000/

    for (var i =0; i < ciede2000testdata.length; i++ ) {
        var a = new colorLab('CIELAB', [ciede2000testdata[i].L1, ciede2000testdata[i].a1, ciede2000testdata[i].b1]);
        var b = new colorLab('CIELAB', [ciede2000testdata[i].L2, ciede2000testdata[i].a2, ciede2000testdata[i].b2]);
        var dE = a.CIELAB.CIEDE2000(b);

        ok(toBeCloseTo(dE, ciede2000testdata[i].dE, 4), "The Delat E test. Exected: " +  ciede2000testdata[i].dE + ", Result: " + dE);

    }

});
