import CIEDE2000 from './CIEDE2000'
import { chroma } from './helper';

class CIELAB {

  constructor(L, a, b) {
    this.L = L;
    this.a = a;
    this.b = b;
  }

  toString() {
    return 'L: ' + this.L + ', a: ' + this.a + ', b: ' + this.b;
  }

  get chroma() {
    return chroma(this.a, this.b);
  }

  CIEDE2000(color2) {
    return CIEDE2000(this, color2);
  }

  set L(L) {
    this._L = Math.min(100, Math.max(-100, L));
  };

  get L() {
    return this._L;
  };

  set a(a) {
    this._a = Math.min(128, Math.max(-128, a));
  };
  get a() {
    return this._a;
  };

  set b(b) {
    this._b = Math.min(128, Math.max(-128, b));
  };
  get b() {
    return this._b;
  };
}

export default CIELAB;
