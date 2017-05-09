import Cielab from '../../src/CIELAB';
import CIEDE2000 from '../../src/CIEDE2000';
import { ciede2000testdata } from './CIEDE2000_testdata';

describe('CIEDE2000', () => {
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
    const color1 = new Cielab(test.L1, test.a1, test.b1);
    const color2 = new Cielab(test.L2, test.a2, test.b2);
    expect(CIEDE2000(color1, color2)).to.closeTo(test.dE, 0.0001);
  });

  describe('Delta E of two CIELAB colors with 0', () => {
    const color1 = new Cielab(0, 0, 0);
    const color2 = new Cielab(0, 0, 0);
    expect(CIEDE2000(color1, color2)).to.equal(0);
  });

  describe('Delta E check with testdata', () => {
    ciede2000testdata.forEach((dataset) => {
      const colorA = new Cielab(dataset.colorA.L, dataset.colorA.a, dataset.colorA.b);
      const colorB = new Cielab(dataset.colorB.L, dataset.colorB.a, dataset.colorB.b);
      expect(CIEDE2000(colorA, colorB)).to.closeTo(dataset.DE2000, 0.0001);
    });
  });
});
