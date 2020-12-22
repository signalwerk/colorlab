[![Travis build status](http://img.shields.io/travis/signalwerk/colorlab.svg?style=flat)](https://travis-ci.org/signalwerk/colorlab)

# colorlab · 🎨🧑‍🔬

colorLab is a JavaScript library to calculate the difference between two colors in [DeltaE (CIEDE2000)](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000).

<!-- It also contains functions to do basic calculations (for example: RGB+RGB) for DeviceColors like CMYK or RGB. -->

## Installation

```sh
npm install colorlab
```

### DeltaE 2000 of two CIELAB colors

```js
import colorlab from colorlab;

let color1 = new colorlab.CIELAB(50.0000, 2.6772, -79.7751);
let color2 = new colorlab.CIELAB(50.0000, 0.0000, -82.7485);

// CIEDE2000 tells you the DeltaE, or perceptible color
// difference, between CIELAB color1 and CIELAB color2

color1.CIEDE2000(color2); // → 2.0425
// or
colorlab.CIEDE2000(color1, color2); // → 2.0425

```

## Contribut

### npm Scripts

- `npm test` - Lint the library and tests, then run the unit tests
- `npm run lint` - Lint the source and unit tests
- `npm run watch` - Continuously run the unit tests as you make changes to the source
  and test files themselves
- `npm run test-browser` - Build the library for use with the browser spec runner.
  Changes to the source will cause the runner to automatically refresh.
- `npm run build` - Lint then build the library
- `npm run coverage` - Generate a coverage report

### Browser Tests

The browser spec runner can be opened in a browser to run your tests. For it to work, you must first run `npm run test-browser`. This will set up a watch task that will automatically refresh the tests when your scripts, or the tests, change. The spec runner file is located at `test/runner.html`: open it in your browser to run tests.

### License & Authors

[MIT][license] · Started by [signalwerk](https://github.com/signalwerk) supported by [several contributors](https://github.com/signalwerk/colorlab/graphs/contributors)

## Links

### Similar libraries

- [chromatist](https://github.com/jrus/chromatist)
- [CSS Color Module Level 4](https://drafts.csswg.org/css-color/)
- [Color-diff](https://github.com/markusn/color-diff)
- [ColorMine](https://github.com/THEjoezack/ColorMine)
- [Contrast Calculator](http://leserlich.info/werkzeuge/kontrastrechner/index.php)
- [colorjs](https://colorjs.io/api/)

### Others

- [Easing Gradients](https://larsenwork.com/easing-gradients/) & [PostCSS plugin](https://github.com/larsenwork/postcss-easing-gradients)
- [CSS Color Module Level 4](https://drafts.csswg.org/css-color/)
- [generator-babel-boilerplate](https://github.com/babel/generator-babel-boilerplate)
- [Color-Visualisation in 3D Space](https://github.com/meodai/color-names/blob/master/README.md)
- [imatest – Algorithms and reference formulas](https://www.imatest.com/docs/colorcheck_ref/)


<!-- [![Test Coverage](https://codeclimate.com/github/signalwerk/colorlab/badges/coverage.svg)](https://codeclimate.com/github/signalwerk/colorlab) -->
<!-- [![Code Climate](https://codeclimate.com/github/signalwerk/colorlab/badges/gpa.svg)](https://codeclimate.com/github/signalwerk/colorlab) -->

### Colors for the Web

- [[css-color] Separation / DeviceN color support](https://github.com/w3c/csswg-drafts/issues/2023#issuecomment-610663255)
- [PANTONE libraries](https://www.efi.com/en-gb/marketing/fiery-servers-and-software/downloads/pantone-library/)
