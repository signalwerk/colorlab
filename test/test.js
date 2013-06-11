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
module( "spectrum (nm) to LAB" );


test( "set lab according to nm-spectrum", function() {

    // the reference-Data is calculated with a x-rite i1 pro photospectrometer
    // and the according software
    var spectralTestData = {

        one: {
            spectrum : [
                 {nm: 380, value: 0.674885},
                 {nm: 390, value: 0.726196},
                 {nm: 400, value: 0.763722},
                 {nm: 410, value: 0.789506},
                 {nm: 420, value: 0.805537},
                 {nm: 430, value: 0.819173},
                 {nm: 440, value: 0.828788},
                 {nm: 450, value: 0.83628},
                 {nm: 460, value: 0.846448},
                 {nm: 470, value: 0.852662},
                 {nm: 480, value: 0.856404},
                 {nm: 490, value: 0.86145},
                 {nm: 500, value: 0.865696},
                 {nm: 510, value: 0.867724},
                 {nm: 520, value: 0.871921},
                 {nm: 530, value: 0.875368},
                 {nm: 540, value: 0.878054},
                 {nm: 550, value: 0.881389},
                 {nm: 560, value: 0.880432},
                 {nm: 570, value: 0.884206},
                 {nm: 580, value: 0.882807},
                 {nm: 590, value: 0.882543},
                 {nm: 600, value: 0.885087},
                 {nm: 610, value: 0.88628},
                 {nm: 620, value: 0.885939},
                 {nm: 630, value: 0.88625},
                 {nm: 640, value: 0.886912},
                 {nm: 650, value: 0.881938},
                 {nm: 660, value: 0.883668},
                 {nm: 670, value: 0.890834},
                 {nm: 680, value: 0.892425},
                 {nm: 690, value: 0.890839},
                 {nm: 700, value: 0.894183},
                 {nm: 710, value: 0.896583},
                 {nm: 720, value: 0.896578},
                 {nm: 730, value: 0.898296}
            ],
            Lab :  {L: 95.1, a: -0.3, b: 2.8 }
        },
        two: {
            spectrum : [
                 {nm: 380, value: 0.0924462},
                 {nm: 390, value: 0.0940832},
                 {nm: 400, value: 0.0942267},
                 {nm: 410, value: 0.0941882},
                 {nm: 420, value: 0.0939718},
                 {nm: 430, value: 0.0930549},
                 {nm: 440, value: 0.0914344},
                 {nm: 450, value: 0.0902866},
                 {nm: 460, value: 0.0876634},
                 {nm: 470, value: 0.0840203},
                 {nm: 480, value: 0.0786973},
                 {nm: 490, value: 0.0718362},
                 {nm: 500, value: 0.0641432},
                 {nm: 510, value: 0.0560224},
                 {nm: 520, value: 0.0483718},
                 {nm: 530, value: 0.0418735},
                 {nm: 540, value: 0.0373635},
                 {nm: 550, value: 0.0347571},
                 {nm: 560, value: 0.0328061},
                 {nm: 570, value: 0.0318001},
                 {nm: 580, value: 0.0313526},
                 {nm: 590, value: 0.0311194},
                 {nm: 600, value: 0.0307722},
                 {nm: 610, value: 0.030805},
                 {nm: 620, value: 0.0311203},
                 {nm: 630, value: 0.031948},
                 {nm: 640, value: 0.0330095},
                 {nm: 650, value: 0.0346472},
                 {nm: 660, value: 0.0369458},
                 {nm: 670, value: 0.0391475},
                 {nm: 680, value: 0.043339},
                 {nm: 690, value: 0.0486126},
                 {nm: 700, value: 0.0536472},
                 {nm: 710, value: 0.0580585},
                 {nm: 720, value: 0.0610549},
                 {nm: 730, value: 0.0631799}
            ],
            Lab :  {L: 23.3, a: 1.9, b: -20.3 }
        },
        three: {
            spectrum : [
                 {nm: 380, value: 0.042879},
                 {nm: 390, value: 0.0585837},
                 {nm: 400, value: 0.0862697},
                 {nm: 410, value: 0.1229},
                 {nm: 420, value: 0.149924},
                 {nm: 430, value: 0.170061},
                 {nm: 440, value: 0.190323},
                 {nm: 450, value: 0.197942},
                 {nm: 460, value: 0.187809},
                 {nm: 470, value: 0.169112},
                 {nm: 480, value: 0.148425},
                 {nm: 490, value: 0.129048},
                 {nm: 500, value: 0.111181},
                 {nm: 510, value: 0.0926122},
                 {nm: 520, value: 0.0752751},
                 {nm: 530, value: 0.0629062},
                 {nm: 540, value: 0.0547817},
                 {nm: 550, value: 0.0463365},
                 {nm: 560, value: 0.0378415},
                 {nm: 570, value: 0.0330268},
                 {nm: 580, value: 0.0342695},
                 {nm: 590, value: 0.045159},
                 {nm: 600, value: 0.0595014},
                 {nm: 610, value: 0.0666808},
                 {nm: 620, value: 0.0691445},
                 {nm: 630, value: 0.0700992},
                 {nm: 640, value: 0.0717238},
                 {nm: 650, value: 0.0771675},
                 {nm: 660, value: 0.0857641},
                 {nm: 670, value: 0.0908835},
                 {nm: 680, value: 0.0893411},
                 {nm: 690, value: 0.0840304},
                 {nm: 700, value: 0.0765717},
                 {nm: 710, value: 0.0712801},
                 {nm: 720, value: 0.0754317},
                 {nm: 730, value: 0.093611}
            ],
            Lab :  {L: 29.7, a: 11.7, b: -32.1 }
        }
    };


    // test with all data-sets
    var a = new colorLab('CIELAB');

    a.CIELAB.spectrum(spectralTestData.one.spectrum);

    ok( toBeCloseTo(a.CIELAB.L(), spectralTestData.one.Lab.L, 1) );
    ok( toBeCloseTo(a.CIELAB.a(), spectralTestData.one.Lab.a, 1) );
    ok( toBeCloseTo(a.CIELAB.b(), spectralTestData.one.Lab.b, 1) );

    a.CIELAB.spectrum(spectralTestData.two.spectrum);

    ok( toBeCloseTo(a.CIELAB.L(), spectralTestData.two.Lab.L, 1) );
    ok( toBeCloseTo(a.CIELAB.a(), spectralTestData.two.Lab.a, 1) );
    ok( toBeCloseTo(a.CIELAB.b(), spectralTestData.two.Lab.b, 1) );

    a.CIELAB.spectrum(spectralTestData.three.spectrum);

    ok( toBeCloseTo(a.CIELAB.L(), spectralTestData.three.Lab.L, 1) );
    ok( toBeCloseTo(a.CIELAB.a(), spectralTestData.three.Lab.a, 1) );
    ok( toBeCloseTo(a.CIELAB.b(), spectralTestData.three.Lab.b, 1) );


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
