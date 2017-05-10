# colorlab
colorLab is a Javascript Lib to calculate DeltaE (CIEDE2000) values between two colors.

<!-- It also contains functions to do basic calculations (for example: RGB+RGB) for DeviceColors like CMYK or RGB. -->

## installation
```
npm install colorlab
```

### DeltaE 2000 of two CIELAB colors
```javascript
import colorlab from colorlab;

let color1 = new colorlab.CIELAB(50.0000, 2.6772, -79.7751);
let color2 = new colorlab.CIELAB(50.0000, 0.0000, -82.7485);

// CIEDE2000 tells you the DeltaE, or perceptible color
// difference, between CIELAB color1 and CIELAB color2

color1.CIEDE2000(color2); // => 2.0425
// or
colorlab.CIEDE2000(color1, color2); // => 2.0425

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

### Authors
---
See `AUTHORS.txt`.

## Liks
### Similar Libs
* [chromatist](https://github.com/jrus/chromatist)
* [CSS Color Module Level 4](https://drafts.csswg.org/css-color/)
* [Color-diff](https://github.com/markusn/color-diff)
* [ColorMine](https://github.com/THEjoezack/ColorMine)
### Others
* [CSS Color Module Level 4](https://drafts.csswg.org/css-color/)
* [generator-babel-boilerplate](https://github.com/babel/generator-babel-boilerplate)

[![Travis build status](http://img.shields.io/travis/signalwerk/colorlab.svg?style=flat)](https://travis-ci.org/signalwerk/colorlab)
[![Code Climate](https://codeclimate.com/github/signalwerk/colorlab/badges/gpa.svg)](https://codeclimate.com/github/signalwerk/colorlab)
[![Test Coverage](https://codeclimate.com/github/signalwerk/colorlab/badges/coverage.svg)](https://codeclimate.com/github/signalwerk/colorlab)
[![Dependency Status](https://david-dm.org/signalwerk/colorlab.svg)](https://david-dm.org/signalwerk/colorlab)
[![devDependency Status](https://david-dm.org/signalwerk/colorlab/dev-status.svg)](https://david-dm.org/signalwerk/colorlab#info=devDependencies)
