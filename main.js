let colorLab = colorlab.default;

let color1 = new colorLab.CIELAB(50.0000, 2.6772, -79.7751);
let color2 = new colorLab.CIELAB(50.0000, 0.0000, -82.7485);

console.log('ColorLab Version ' + colorLab.VERSION)
console.log('Color1: ' + color1)
console.log('Color2: ' + color2)
console.log('DeltaE2000: ' + color1.CIEDE2000(color2))
console.log('DeltaE2000: ' + colorLab.CIEDE2000(color1, color2))
