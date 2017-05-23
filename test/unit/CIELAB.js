import Cielab from '../../src/CIELAB';
import Lab2RGB from './LABRGB_testdata';

describe('CIELAB', () => {
  describe('Test constructor normal', () => {
    const color = new Cielab(2, 4, 6);
    expect(color.L).to.equal(2);
    expect(color.a).to.equal(4);
    expect(color.b).to.equal(6);
  });

  describe('Test constructor out of min bounds', () => {
    const color = new Cielab(-200, -200, -200);
    expect(color.L).to.equal(0);
    expect(color.a).to.equal(-128);
    expect(color.b).to.equal(-128);
  });

  describe('Test constructor out of max bounds', () => {
    const color = new Cielab(200, 200, 200);
    expect(color.L).to.equal(100);
    expect(color.a).to.equal(128);
    expect(color.b).to.equal(128);
  });

  describe('Test chroma', () => {
    const color = new Cielab(2, 4, 6);
    expect(color.chroma).to.closeTo(7.21110255092797, 0.00001);
  });

  describe('Delta E of two CIELAB colors', () => {
    const test = {
      L1: 50.0000,
      a1: 2.6772,
      b1: -79.7751,
      L2: 50.0000,
      a2: 0.0000,
      b2: -82.7485,
      dE: 2.0425,
    };
    const color = new Cielab(test.L1, test.a1, test.b1);
    const color1 = new Cielab(test.L2, test.a2, test.b2);
    expect(color.CIEDE2000(color1)).to.closeTo(test.dE, 0.0001);
  });

  describe('Convert LAB to sRGB', () => {
    const currentTests = Lab2RGB.CIED65.sRGB.tests;

    currentTests.forEach((currentTest) => {
      const color = new Cielab(currentTest.L, currentTest.a, currentTest.b);
      const finalRGB = color.toSRGB();

      expect(finalRGB.R).to.closeTo(currentTest.R, 0.5);
      expect(finalRGB.G).to.closeTo(currentTest.G, 0.5);
      expect(finalRGB.B).to.closeTo(currentTest.B, 0.5);
    });
  });
});
