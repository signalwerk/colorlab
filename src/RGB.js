// https://www.w3.org/Graphics/Color/srgb
import { clamp } from './helper';


class RGB {

  constructor(R, G, B) {
    this.R = R;
    this.G = G;
    this.B = B;
  }

  toString() {
    return `R: ${this.R}, G: ${this.G}, B: ${this.B}`;
  }

  toHexString() {
    return `#${
    (`0${parseInt(this.R, 10).toString(16)}`).slice(-2)
    }${(`0${parseInt(this.G, 10).toString(16)}`).slice(-2)
    }${(`0${parseInt(this.B, 10).toString(16)}`).slice(-2)}`;
  }

  set R(R) {
    this.privateR = clamp(R, 0, 255);
  }
  get R() {
    return this.privateR;
  }

  set G(G) {
    this.privateG = clamp(G, 0, 255);
  }
  get G() {
    return this.privateG;
  }

  set B(B) {
    this.privateB = clamp(B, 0, 255);
  }
  get B() {
    return this.privateB;
  }
}

export default RGB;
