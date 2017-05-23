import colorlab from '../../src/colorlab';

describe('colorlab', () => {
  describe('Check Variables', () => {
    expect(colorlab.VERSION).to.equal('0.2.3');
    expect(colorlab.kK).to.be.closeTo(903.296296296, 0.00001);
    expect(colorlab.kE).to.be.closeTo(0.00885645167, 0.00001);
  });
});
