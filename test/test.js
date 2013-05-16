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
};



module( "init Tests" );

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

module( "set Tests" );

test( "without values", function() {
    var a = new colorLab('CIELAB');
    a.CIELAB.L(2);
    a.CIELAB.a(4);
    a.CIELAB.b(6);

    equal(a.CIELAB.L(), 2);
    equal(a.CIELAB.a(), 4);
    equal(a.CIELAB.b(), 6);

});


module( "multiply" );

test( "two points", function() {

	var a = new colorLab('CIELAB', [2, 20, 200]);
	var b = new colorLab('CIELAB', [2, 3, 4]);

	a.CIELAB.mul(b);

    equal(a.CIELAB.L(), 4);
    equal(a.CIELAB.a(), 60);
    equal(a.CIELAB.b(), 800);
});

test( "point with value", function() {

	var a = new colorLab('CIELAB', [2, 6, 8]);
	a.CIELAB.mul(2);


    equal(a.CIELAB.L(), 4);
    equal(a.CIELAB.a(), 12);
    equal(a.CIELAB.b(), 16);
});

test( "point with object of values", function() {

	var a = new colorLab('CIELAB', [2, 20, 200]);
	a.CIELAB.mul({L:2,a:3,b:4});

    equal(a.CIELAB.L(), 4);
    equal(a.CIELAB.a(), 60);
    equal(a.CIELAB.b(), 800);
});



module( "Delta E" );


test( "Delta E of two CIELAB colors", function() {

    var a = new colorLab('CIELAB', [50.0000, 2.6772, -79.7751]);
    var b = new colorLab('CIELAB', [50.0000, 0.0000, -82.7485]);

    var dE = a.CIELAB.CIEDE2000(b);



    ok(toBeCloseTo(dE, 2.0425, 4), "The Delat E is not close enough. Exected: " +  2.0425 + ", Result: " + dE);
    equal(a.CIELAB.CIEDE2000(b), b.CIELAB.CIEDE2000(a), "The order of the colors shouldnt matter to get Delta E");

});

test( "Delta E check with testdata", function() {
    // Source of testdata
    // http://www.ece.rochester.edu/~gsharma/ciede2000/

    for (var i =0; i < ciede2000testdata.length; i++ ) {
        var a = new colorLab('CIELAB', [ciede2000testdata[i].L1, ciede2000testdata[i].a1, ciede2000testdata[i].b1]);
        var b = new colorLab('CIELAB', [ciede2000testdata[i].L2, ciede2000testdata[i].a2, ciede2000testdata[i].b2]);
        var dE = a.CIELAB.CIEDE2000(b);
        // equal(dE, ciede2000testdata[i].dE);
        ok(toBeCloseTo(dE, ciede2000testdata[i].dE, 4), "The Delat E is not close enough. Exected: " +  ciede2000testdata[i].dE + ", Result: " + dE);

    }

});
