##colorLab
colorLab is a Javascript Lib to calculate DeltaE (CIEDE2000) values between two colors. It also contains functions to do basic calculations (for example: RGB+RGB) for DeviceColors like CMYK or RGB. 


###Build
There is no build step involved. 
To generate the Doc just install [Docco](http://jashkenas.github.io/docco/) with `sudo npm install -g docco` and fire `docco colorLab.js`


###Install
1. bower install --save signalwerk/colorLab
2. include colorLab.js in your template


###DeltaE of two colors
```javascript
var color1 = new colorLab('CIELAB', [red, green, blue])
var color2 = new colorLab('CIELAB', [red, green, blue])
color1.CIEDE2000(color2); // this tells you the DeltaE, or perceptible color difference, between color1 and color2
```

###Authors
---
See `AUTHORS.txt`.


###Liks
* Similar Lib: [chromatist](https://github.com/jrus/chromatist)
