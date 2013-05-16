// unit-tests

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




