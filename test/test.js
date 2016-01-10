//console.log ('cxf: ', readCxfFromURL('http://localhost:8000/test/test sh 2.cxf') );










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
module( 'init Tests all' );

test( 'wrong color system', function() {

     throws(
        function() {
         new colorLab('PANT', [1, 2, 3, 4]);
        }
      );
});


// ---------------------------------------------
// ---------------------------------------------
module( 'init Tests LAB' );

test( 'with values', function() {
	var a = new colorLab('CIELAB', [2, 4, 6]);

    equal(a.CIELAB.L(), 2);
    equal(a.CIELAB.a(), 4);
    equal(a.CIELAB.b(), 6);

});

test( 'without values', function() {
	var a = new colorLab('CIELAB');

    equal(a.CIELAB.L(), 0);
    equal(a.CIELAB.a(), 0);
    equal(a.CIELAB.b(), 0);

});


// ---------------------------------------------
// ---------------------------------------------
module( 'init Tests CMYK' );

test( 'with values', function() {
    var a = new colorLab('CMYK', [2.5, 4.5, 6.5, 8.5]);

    equal(a.CMYK.C(), 2.5);
    equal(a.CMYK.M(), 4.5);
    equal(a.CMYK.Y(), 6.5);
    equal(a.CMYK.K(), 8.5);

});

test( 'without values', function() {
    var a = new colorLab('CMYK');

    equal(a.CMYK.C(), 0);
    equal(a.CMYK.M(), 0);
    equal(a.CMYK.Y(), 0);
    equal(a.CMYK.K(), 0);

});


// ---------------------------------------------
// ---------------------------------------------
module( 'set/get Tests CMYK' );

test( 'without values', function() {
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
module( 'set/get Tests LAB' );

test( 'without values', function() {
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
module( 'general calc CMYK' );

test( 'add two points', function() {
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
module( 'general calc LAB' );

test( 'add two points', function() {
    var a = new colorLab('CIELAB', [1, 2, 3]);
    var b = new colorLab('CIELAB', [10, 20, 30]);

    a.CIELAB.add(b);

    equal(a.CIELAB.L(), 11);
    equal(a.CIELAB.a(), 22);
    equal(a.CIELAB.b(), 33);
});


// ---------------------------------------------
// ---------------------------------------------

test( 'sub two points', function() {
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

test( 'div two points', function() {
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

test( 'floor a points', function() {
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


test( 'round a points', function() {
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
module( 'general output CMYK' );
test( 'ouput', function() {
    var a = new colorLab('CMYK', [1.5, 2.5, 3.5, 4.5]);


    equal(a.CMYK.print(), 'C: 1.5, M: 2.5, Y: 3.5, K: 4.5');
    deepEqual(a.CMYK.toArray(), [1.5, 2.5, 3.5, 4.5]);

});


// ---------------------------------------------
// ---------------------------------------------
module( 'general output LAB' );
test( 'ouput', function() {
    var a = new colorLab('CIELAB', [1, 2, 3]);


    equal(a.CIELAB.print(), 'L: 1, a: 2, b: 3');
    deepEqual(a.CIELAB.toArray(), [1, 2, 3]);

});

// ---------------------------------------------
// ---------------------------------------------
module( 'multiply' );

test( 'two points', function() {

	var a = new colorLab('CIELAB', [2, 20, 20]);
	var b = new colorLab('CIELAB', [2, 3, 4]);

	a.CIELAB.mul(b);

    equal(a.CIELAB.L(), 4);
    equal(a.CIELAB.a(), 60);
    equal(a.CIELAB.b(), 80);

    var c = new colorLab('CMYK', [2, 20, 20, 2000]);
    var d = new colorLab('CMYK', [2, 3, 4, 5]);

    c.CMYK.mul(d);

    equal(c.CMYK.C(), 4);
    equal(c.CMYK.M(), 60);
    equal(c.CMYK.Y(), 80);
    equal(c.CMYK.K(), 10000);
});

test( 'point with value', function() {

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

test( 'point with object of values', function() {

	var a = new colorLab('CIELAB', [2, 20, 20]);
	a.CIELAB.mul({L: 2, a: 3, b: 4});

    equal(a.CIELAB.L(), 4);
    equal(a.CIELAB.a(), 60);
    equal(a.CIELAB.b(), 80);

    var c = new colorLab('CMYK', [2, 6, 8, 10]);

    c.CMYK.mul({C: 2, M: 3, Y: 4, K: 5});

    equal(c.CMYK.C(), 4);
    equal(c.CMYK.M(), 18);
    equal(c.CMYK.Y(), 32);
    equal(c.CMYK.K(), 50);
});

// ---------------------------------------------
// ---------------------------------------------
module( 'spectrum (nm) to LAB' );


test( 'set lab according to nm-spectrum', function() {

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


module( 'Delta E' );

// To check Delta E differences
// Source: [Gaurav Sharma](http://www.ece.rochester.edu/~gsharma/ciede2000/)
var ciede2000testdata = [
    {L1: 50.0000, a1: 2.6772, b1: -79.7751, L2: 50.0000, a2: 0.0000, b2: -82.7485, dE: 2.0425},
    {L1: 50.0000, a1: 3.1571, b1: -77.2803, L2: 50.0000, a2: 0.0000, b2: -82.7485, dE: 2.8615},
    {L1: 50.0000, a1: 2.8361, b1: -74.0200, L2: 50.0000, a2: 0.0000, b2: -82.7485, dE: 3.4412},
    {L1: 50.0000, a1: -1.3802, b1: -84.2814, L2: 50.0000, a2: 0.0000, b2: -82.7485, dE: 1.0000},
    {L1: 50.0000, a1: -1.1848, b1: -84.8006, L2: 50.0000, a2: 0.0000, b2: -82.7485, dE: 1.0000},
    {L1: 50.0000, a1: -0.9009, b1: -85.5211, L2: 50.0000, a2: 0.0000, b2: -82.7485, dE: 1.0000},
    {L1: 50.0000, a1: 0.0000, b1: 0.0000, L2: 50.0000, a2: -1.0000, b2: 2.0000, dE: 2.3669},
    {L1: 50.0000, a1: -1.0000, b1: 2.0000, L2: 50.0000, a2: 0.0000, b2: 0.0000, dE: 2.3669},
    {L1: 50.0000, a1: 2.4900, b1: -0.0010, L2: 50.0000, a2: -2.4900, b2: 0.0009, dE: 7.1792},
    {L1: 50.0000, a1: 2.4900, b1: -0.0010, L2: 50.0000, a2: -2.4900, b2: 0.0010, dE: 7.1792},
    {L1: 50.0000, a1: 2.4900, b1: -0.0010, L2: 50.0000, a2: -2.4900, b2: 0.0011, dE: 7.2195},
    {L1: 50.0000, a1: 2.4900, b1: -0.0010, L2: 50.0000, a2: -2.4900, b2: 0.0012, dE: 7.2195},
    {L1: 50.0000, a1: -0.0010, b1: 2.4900, L2: 50.0000, a2: 0.0009, b2: -2.4900, dE: 4.8045},
    {L1: 50.0000, a1: -0.0010, b1: 2.4900, L2: 50.0000, a2: 0.0010, b2: -2.4900, dE: 4.8045},
    {L1: 50.0000, a1: -0.0010, b1: 2.4900, L2: 50.0000, a2: 0.0011, b2: -2.4900, dE: 4.7461},
    {L1: 50.0000, a1: 2.5000, b1: 0.0000, L2: 50.0000, a2: 0.0000, b2: -2.5000, dE: 4.3065},
    {L1: 50.0000, a1: 2.5000, b1: 0.0000, L2: 73.0000, a2: 25.0000, b2: -18.0000, dE: 27.1492},
    {L1: 50.0000, a1: 2.5000, b1: 0.0000, L2: 61.0000, a2: -5.0000, b2: 29.0000, dE: 22.8977},
    {L1: 50.0000, a1: 2.5000, b1: 0.0000, L2: 56.0000, a2: -27.0000, b2: -3.0000, dE: 31.9030},
    {L1: 50.0000, a1: 2.5000, b1: 0.0000, L2: 58.0000, a2: 24.0000, b2: 15.0000, dE: 19.4535},
    {L1: 50.0000, a1: 2.5000, b1: 0.0000, L2: 50.0000, a2: 3.1736, b2: 0.5854, dE: 1.0000},
    {L1: 50.0000, a1: 2.5000, b1: 0.0000, L2: 50.0000, a2: 3.2972, b2: 0.0000, dE: 1.0000},
    {L1: 50.0000, a1: 2.5000, b1: 0.0000, L2: 50.0000, a2: 1.8634, b2: 0.5757, dE: 1.0000},
    {L1: 50.0000, a1: 2.5000, b1: 0.0000, L2: 50.0000, a2: 3.2592, b2: 0.3350, dE: 1.0000},
    {L1: 60.2574, a1: -34.0099, b1: 36.2677, L2: 60.4626, a2: -34.1751, b2: 39.4387, dE: 1.2644},
    {L1: 63.0109, a1: -31.0961, b1: -5.8663, L2: 62.8187, a2: -29.7946, b2: -4.0864, dE: 1.2630},
    {L1: 61.2901, a1: 3.7196, b1: -5.3901, L2: 61.4292, a2: 2.2480, b2: -4.9620, dE: 1.8731},
    {L1: 35.0831, a1: -44.1164, b1: 3.7933, L2: 35.0232, a2: -40.0716, b2: 1.5901, dE: 1.8645},
    {L1: 22.7233, a1: 20.0904, b1: -46.6940, L2: 23.0331, a2: 14.9730, b2: -42.5619, dE: 2.0373},
    {L1: 36.4612, a1: 47.8580, b1: 18.3852, L2: 36.2715, a2: 50.5065, b2: 21.2231, dE: 1.4146},
    {L1: 90.8027, a1: -2.0831, b1: 1.4410, L2: 91.1528, a2: -1.6435, b2: 0.0447, dE: 1.4441},
    {L1: 90.9257, a1: -0.5406, b1: -0.9208, L2: 88.6381, a2: -0.8985, b2: -0.7239, dE: 1.5381},
    {L1: 6.7747, a1: -0.2908, b1: -2.4247, L2: 5.8714, a2: -0.0985, b2: -2.2286, dE: 0.6377},
    {L1: 2.0776, a1: 0.0795, b1: -1.1350, L2: 0.9033, a2: -0.0636, b2: -0.5514, dE: 0.9082}
];



test( 'Delta E of two CIELAB colors with 0', function() {

    var a = new colorLab('CIELAB', [0, 0, 0]);
    var b = new colorLab('CIELAB', [0, 0, 0]);

    var dE = a.CIELAB.CIEDE2000(b);

    ok(toBeCloseTo(dE, 0, 4), 'The Delat E test. Exected: ' +  0 + ', Result: ' + dE);
    equal(a.CIELAB.CIEDE2000(b), b.CIELAB.CIEDE2000(a), 'The order of the colors shouldnt matter to get Delta E');

});


test( 'Delta E of two CIELAB colors', function() {

    var a = new colorLab('CIELAB', [50.0000, 2.6772, -79.7751]);
    var b = new colorLab('CIELAB', [50.0000, 0.0000, -82.7485]);

    var dE = a.CIELAB.CIEDE2000(b);

    ok(toBeCloseTo(dE, 2.0425, 4), 'The Delat E test. Exected: ' +  2.0425 + ', Result: ' + dE);
    equal(a.CIELAB.CIEDE2000(b), b.CIELAB.CIEDE2000(a), 'The order of the colors shouldnt matter to get Delta E');

});

test( 'Delta E check with testdata', function() {


    for (var i =0; i < ciede2000testdata.length; i++ ) {
        var a = new colorLab('CIELAB', [ciede2000testdata[i].L1, ciede2000testdata[i].a1, ciede2000testdata[i].b1]);
        var b = new colorLab('CIELAB', [ciede2000testdata[i].L2, ciede2000testdata[i].a2, ciede2000testdata[i].b2]);
        var dE = a.CIELAB.CIEDE2000(b);

        ok(toBeCloseTo(dE, ciede2000testdata[i].dE, 4), 'The Delat E test. Exected: ' +  ciede2000testdata[i].dE + ', Result: ' + dE);

    }

});




// ---------------------------------------------
// ---------------------------------------------
// module( 'test helper function for XYZ to RGB for sRGB 2° D65' );
// 
// 
// console.log( colorLab.XYZ2RGBMtx.CIED65.sRGB );
// 
// test( 'without values', function() {
//     var a = new colorLab('CIELAB', [0, 0, 0]);
// 
//     var RGB = a.helper.convert.XYZRGB8BIT( {X: 0.1081347, Y: 0.0967537, Z: 0.0619907}, colorLab.XYZ2RGBMtx.CIED65.sRGB);
// 
// 
//     equal(RGB.R, 115);
//     equal(RGB.G, 80);
//     equal(RGB.B, 64);
// 
// });
// 
// 
// test( 'without values', function() {
//     var a = new colorLab('CIELAB', [100, 0, 0]);
// 
//     var RGB = a.helper.convert.XYZRGB8BIT( {X: 0.1081347, Y: 0.0967537, Z: 0.0619907}, colorLab.XYZ2RGBMtx.CIED65.sRGB);
// 
// 
//     equal(RGB.R, 255);
//     equal(RGB.G, 255);
//     equal(RGB.B, 255);
// 
// });
// 







// ---------------------------------------------
// ---------------------------------------------
module( 'LAB to RGB' );



// reference Date generated with Excel-Spreadsheet of Bruce Lindbloom
// http://www.brucelindbloom.com/

var Lab2RGB = {

    CIED65: {
        sRGB: {
            name: 'sRGB',
            tests: [{
                L: 36.657,
                a: 8.250,
                b: 12.270,
                R: 106,
                G: 81,
                B: 67
            }, {
                L: 64.202,
                a: 9.433,
                b: 14.710,
                R: 182,
                G: 149,
                B: 130
            }, {
                L: 50.845,
                a: 1.004,
                b: -19.450,
                R: 103,
                G: 122,
                B: 154
            }, {
                L: 43.637,
                a: -12.265,
                b: 20.263,
                R: 95,
                G: 108,
                B: 69
            }, {
                L: 55.237,
                a: 10.727,
                b: -24.123,
                R: 129,
                G: 128,
                B: 174
            }, {
                L: 72.420,
                a: -22.337,
                b: 3.820,
                R: 133,
                G: 189,
                B: 170
            }, {
                L: 57.421,
                a: 22.476,
                b: 49.944,
                R: 194,
                G: 121,
                B: 48
            }, {
                L: 40.818,
                a: 15.837,
                b: -39.953,
                R: 79,
                G: 91,
                B: 162
            }, {
                L: 46.848,
                a: 35.976,
                b: 9.351,
                R: 170,
                G: 85,
                B: 97
            }, {
                L: 30.276,
                a: 18.962,
                b: -21.537,
                R: 84,
                G: 62,
                B: 105
            }, {
                L: 72.107,
                a: -22.442,
                b: 53.614,
                R: 167,
                G: 186,
                B: 73
            }, {
                L: 69.671,
                a: 8.791,
                b: 59.073,
                R: 213,
                G: 162,
                B: 57
            }, {
                L: 30.394,
                a: 25.037,
                b: -48.957,
                R: 54,
                G: 62,
                B: 149
            }, {
                L: 56.556,
                a: -29.605,
                b: 32.966,
                R: 101,
                G: 148,
                B: 76
            }, {
                L: 36.163,
                a: 43.930,
                b: 18.429,
                R: 152,
                G: 48,
                B: 58
            }, {
                L: 80.527,
                a: -4.273,
                b: 70.711,
                R: 228,
                G: 199,
                B: 55
            }, {
                L: 47.092,
                a: 41.538,
                b: -18.749,
                R: 164,
                G: 83,
                B: 144
            }, {
                L: 52.676,
                a: -13.319,
                b: -22.048,
                R: 63,
                G: 134,
                B: 163
            }, {
                L: 95.095,
                a: -0.589,
                b: 2.575,
                R: 242,
                G: 241,
                B: 236
            }, {
                L: 80.578,
                a: -0.226,
                b: 0.541,
                R: 200,
                G: 200,
                B: 199
            }, {
                L: 65.761,
                a: -0.586,
                b: 0.430,
                R: 159,
                G: 160,
                B: 159
            }, {
                L: 50.884,
                a: 0.149,
                b: 0.710,
                R: 122,
                G: 121,
                B: 120
            }, {
                L: 35.724,
                a: -0.023,
                b: 0.023,
                R: 84,
                G: 84,
                B: 84
            }, {
                L: 22.160,
                a: -0.017,
                b: 0.017,
                R: 53,
                G: 53,
                B: 53
            }]
        },
      
        AdobeRGB: {
            name: 'Adobe RGB (1998)',
            tests: [{
                    L: 37.373,
                    a: 12.422,
                    b: 15.114,
                    R: 106,
                    G: 81,
                    B: 67
                }, {
                    L: 65.831,
                    a: 13.725,
                    b: 17.092,
                    R: 182,
                    G: 149,
                    B: 130
                }, {
                    L: 50.594,
                    a: -1.446,
                    b: -21.421,
                    R: 103,
                    G: 122,
                    B: 154
                }, {
                    L: 43.196,
                    a: -15.766,
                    b: 22.102,
                    R: 95,
                    G: 108,
                    B: 69
                }, {
                    L: 55.744,
                    a: 11.375,
                    b: -25.135,
                    R: 129,
                    G: 128,
                    B: 174
                }, {
                    L: 71.317,
                    a: -31.900,
                    b: 1.695,
                    R: 133,
                    G: 189,
                    B: 170
                }, {
                    L: 60.474,
                    a: 31.026,
                    b: 58.532,
                    R: 194,
                    G: 121,
                    B: 48
                }, {
                    L: 40.464,
                    a: 15.762,
                    b: -42.763,
                    R: 79,
                    G: 91,
                    B: 162
                }, {
                    L: 50.307,
                    a: 44.997,
                    b: 14.474,
                    R: 170,
                    G: 85,
                    B: 97
                }, {
                    L: 30.513,
                    a: 23.168,
                    b: -22.195,
                    R: 84,
                    G: 62,
                    B: 105
                }, {
                    L: 71.920,
                    a: -26.866,
                    b: 58.676,
                    R: 167,
                    G: 186,
                    B: 73
                }, {
                    L: 71.836,
                    a: 14.924,
                    b: 67.357,
                    R: 213,
                    G: 162,
                    B: 57
                }, {
                    L: 29.612,
                    a: 26.891,
                    b: -52.603,
                    R: 54,
                    G: 62,
                    B: 149
                }, {
                    L: 55.439,
                    a: -41.170,
                    b: 34.800,
                    R: 101,
                    G: 148,
                    B: 76
                }, {
                    L: 40.255,
                    a: 53.247,
                    b: 26.071,
                    R: 152,
                    G: 48,
                    B: 58
                }, {
                    L: 81.764,
                    a: -1.061,
                    b: 79.545,
                    R: 228,
                    G: 199,
                    B: 55
                }, {
                    L: 50.344,
                    a: 49.679,
                    b: -15.452,
                    R: 164,
                    G: 83,
                    B: 144
                }, {
                    L: 51.173,
                    a: -24.272,
                    b: -26.026,
                    R: 63,
                    G: 134,
                    B: 163
                }, {
                    L: 95.270,
                    a: -0.482,
                    b: 2.652,
                    R: 242,
                    G: 241,
                    B: 236
                }, {
                    L: 81.043,
                    a: -0.231,
                    b: 0.556,
                    R: 200,
                    G: 200,
                    B: 199
                }, {
                    L: 66.277,
                    a: -0.741,
                    b: 0.404,
                    R: 159,
                    G: 160,
                    B: 159
                }, {
                    L: 51.240,
                    a: 0.300,
                    b: 0.808,
                    R: 122,
                    G: 121,
                    B: 120
                }, {
                    L: 35.381,
                    a: -0.023,
                    b: 0.023,
                    R: 84,
                    G: 84,
                    B: 84
                }, {
                    L: 20.655,
                    a: -0.016,
                    b: 0.016,
                    R: 53,
                    G: 53,
                    B: 53
                }
            ]
        }
    }
};


test( 'sRGB D65', function() {

    for (var i =0; i < Lab2RGB.CIED65.sRGB.tests.length; i++ ) {
        var currentTest = Lab2RGB.CIED65.sRGB.tests[i];

        var Lab = new colorLab('CIELAB', [currentTest.L, currentTest.a, currentTest.b]);
// (0.640, 0.330)
// (0.300, 0.600)
// (0.150, 0.060)

        var RGB = Lab.helper.convert.LABRGB(Lab, {x : 95.047, y : 100.000, z : 108.883}, colorLab.XYZ2RGBMtx.CIED65.sRGB);

        equal(RGB.R, currentTest.R, 'In Test Nr. ' + i + ' (Test R: '+currentTest.R+')');
        equal(RGB.G, currentTest.G, 'In Test Nr. ' + i + ' (Test G: '+currentTest.G+')');
        equal(RGB.B, currentTest.B, 'In Test Nr. ' + i + ' (Test B: '+currentTest.B+')');
    }

});

// 1) I get a White Point for D50 2 degrees using {96.422, 100.0,  82.521} 
// xyY = {0.3456, 0.3585, 100.0}
// 2) I get a White Point for D65 2 degrees using {95.047, 100.0, 108.883} 
// xyY = { 0.3127,  0.329, 100.0 }


test( 'AdobeRGB D65', function() {

    for (var i =0; i < Lab2RGB.CIED65.AdobeRGB.tests.length; i++ ) {
        var currentTest = Lab2RGB.CIED65.AdobeRGB.tests[i];

        var Lab = new colorLab('CIELAB', [currentTest.L, currentTest.a, currentTest.b]);
// (0.640, 0.330)
// (0.210, 0.710)
// (0.150, 0.060)

    

        var RGB = Lab.helper.convert.LABRGB(Lab, {x : 95.047, y : 100.000, z : 108.883}, colorLab.XYZ2RGBMtx.CIED65.AdobeRGB);

        equal(RGB.R, currentTest.R, 'In Test Nr. ' + i + ' (Test R: '+currentTest.R+')');
        equal(RGB.G, currentTest.G, 'In Test Nr. ' + i + ' (Test G: '+currentTest.G+')');
        equal(RGB.B, currentTest.B, 'In Test Nr. ' + i + ' (Test B: '+currentTest.B+')');
    }

});
