import CIELAB from './CIELAB';
import CIEDE2000 from './CIEDE2000'

class Colorlab {

  // constatnats
  // Current version of the library.
  static get VERSION(){
      return '0.2.2';
  }
  static get kK(){
      return 24389.0 / 27.0; // 903.296296296
  }
  static get kE(){
      return 216.0 / 24389.0; // 0.00885645167
  }

  // constructor() {
  //
  // }
}

Colorlab.CIELAB = CIELAB;
Colorlab.CIEDE2000 = CIEDE2000;

export default Colorlab;
