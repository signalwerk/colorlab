import Cielab from '../../src/CIELAB';
import CIEDE2000 from '../../src/CIEDE2000';
import ciede2000testdata from './CIEDE2000_testdata';

describe('CIEDE2000', () => {
  describe('Delta E of two CIELAB colors', () => {
    expect(
      CIEDE2000(
        new Cielab(50, 2.6772, -79.7751),
        new Cielab(50, 0, -82.7485),
      ),
    ).to.closeTo(2.0425, 0.0001);
  });

  describe('Delta E of two CIELAB colors with 0', () => {
    expect(
      CIEDE2000(
        new Cielab(0, 0, 0),
        new Cielab(0, 0, 0),
      ),
    ).to.equal(0);
  });

  describe('Delta E check with testdata', () => {
    ciede2000testdata.forEach((dataset) => {
      expect(
        CIEDE2000(
          new Cielab(dataset.colorA.L, dataset.colorA.a, dataset.colorA.b),
          new Cielab(dataset.colorB.L, dataset.colorB.a, dataset.colorB.b),
        ),
      ).to.closeTo(dataset.DE2000, 0.0001);
    });
  });
});
