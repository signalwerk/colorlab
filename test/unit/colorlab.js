import colorlab from '../../src/colorlab';

describe('colorlab', () => {
  describe('Check Variables', () => {
    expect(colorlab.VERSION).to.equal('0.2.0');
    expect(colorlab.kK).to.be.closeTo(903.296296296, 0.00001);
    expect(colorlab.kE).to.be.closeTo(0.00885645167, 0.00001);
  });
  // describe('Greet function', () => {
  //   beforeEach(() => {
  //     spy(colorlab, 'greet');
  //     colorlab.greet();
  //   });
  //
  //   it('should have been run once', () => {
  //     expect(colorlab.greet).to.have.been.calledOnce;
  //   });
  //
  //   it('should have always returned hello', () => {
  //     expect(colorlab.greet).to.have.always.returned('hello');
  //   });
  // });
});
