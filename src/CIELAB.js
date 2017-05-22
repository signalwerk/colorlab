import CIEDE2000 from './CIEDE2000'
import { chroma } from './helper';

class CIELAB {

  constructor(L, a, b) {
    this.L = L;
    this.a = a;
    this.b = b;
  }

  toString() {
    return `L: ${this.L}, a: ${this.a}, b: ${this.b}`;
  }

  get chroma() {
    return chroma(this.a, this.b);
  }

  CIEDE2000(color2) {
    return CIEDE2000(this, color2);
  }

  set L(L) {
    this._L = clamp(L, 0, 100);
  }

  get L() {
    return this._L;
  }

  set a(a) {
    this._a = clamp(a, -128, 128);
  }
  get a() {
    return this._a;
  }

  set b(b) {
    this._b = clamp(b, -128, 128);
  }
  get b() {
    return this._b;
  }
}

export default CIELAB;
