// https://www.w3.org/Graphics/Color/srgb
import { clamp } from './helper';




class RGB {

  constructor(R, G, B) {
    this.R = R;
    this.G = G;
    this.B = B;
  }

  toString() {
    return 'R: ' + this.R + ', G: ' + this.G + ', B: ' + this.B;
  };

  toHexString() {
   return "#" +
    ("0" + parseInt(this.R,10).toString(16)).slice(-2) +
    ("0" + parseInt(this.G,10).toString(16)).slice(-2) +
    ("0" + parseInt(this.B,10).toString(16)).slice(-2);
  };

  set R(R) {
    this._R = clamp(R, 0, 255);
  };
  get R() {
    return this._R;
  };

  set G(G) {
    this._G = clamp(G, 0, 255);
  };
  get G() {
    return this._G;
  };

  set B(B) {
    this._B = clamp(B, 0, 255);
  };
  get B() {
    return this._B;
  };
}

export default RGB;
