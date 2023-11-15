const sharedStyles = `
  :host {
  --bg-color: rgba(255,255,255, 1);
  --text-color: rgba(0,121,181, 1);
  --text-soft-color: rgba(0,141,210, 1);
  --text-strong-color: rgba(0,90,136, 1);
  --subtle-color: rgba(246,250,254, 1);
  --border-color: rgba(175,210,248, 1);
  --shadow-color: rgba(143,196,248, 1);
  --input-color: rgba(255,255,255, 1);
  --outline-color: rgba(249,177,161, 1);
  --mark-color: rgba(196,77,0, 0.08);
  --special-color: rgba(196,77,0, 1);
  --special-bg-color: rgba(231,92,0, 1);
  --special-text-color: rgba(255,255,255, 1);
  --special-shadow-color: rgba(125,83,74, 1);
  --special-mark-color: rgba(255,255,255, 0.08);
  --light-color: rgba(255,240,238, 1);
  --dark-color: rgba(96,62,55, 1);
  --text-color-rgb: 0,121,181;
  --bg-color-rgb: 255,255,255;
  --subtle-color-rgb: 246,250,254;
  --special-color-rgb: 196,77,0;
  --special-text-color-rgb: 255,255,255;
  --special-bg-color-rgb: 231,92,0;
  --shadow-color-rgb: 143,196,248;
  --special-shadow-color-rgb: 125,83,74;
  --outline-color-rgb: 249,177,161;
  --dark-color-rgb: 96,62,55;
  --light-color-rgb: 255,240,238;
  font-family: monospace;
}

@media (prefers-color-scheme: dark) {
  :host {
    --bg-color: rgba(32,32,32, 1);
    --text-color: rgba(45,146,211, 1);
    --text-soft-color: rgba(39,128,185, 1);
    --text-strong-color: rgba(98,181,248, 1);
    --subtle-color: rgba(31,37,43, 1);
    --border-color: rgba(44,67,88, 1);
    --shadow-color: rgba(0,0,0, 1);
    --input-color: rgba(28,28,28, 1);
    --outline-color: rgba(235,130,100, 1);
    --mark-color: rgba(227,101,48, 0.08);
    --special-color: rgba(227,101,48, 1);
    --special-bg-color: rgba(163,70,32, 1);
    --special-text-color: rgba(231,221,219, 1);
    --special-shadow-color: rgba(43,26,22, 1);
    --special-mark-color: rgba(231,221,219, 0.08);
    --light-color: rgba(250,200,191, 1);
    --dark-color: rgba(72,46,40, 1);
    --text-color-rgb: 45,146,211;
    --bg-color-rgb: 32,32,32;
    --subtle-color-rgb: 31,37,43;
    --special-color-rgb: 227,101,48;
    --special-text-color-rgb: 231,221,219;
    --special-bg-color-rgb: 163,70,32;
    --shadow-color-rgb: 0,0,0;
    --special-shadow-color-rgb: 43,26,22;
    --outline-color-rgb: 235,130,100;
    --dark-color-rgb: 72,46,40;
    --light-color-rgb: 250,200,191;
    font-family: monospace;
  }
}

@media (prefers-color-scheme: light) and (prefers-contrast: more) {
  :host {
    --bg-color: rgba(255,255,255, 1);
    --text-color: rgba(0,90,136, 1);
    --text-soft-color: rgba(0,90,136, 1);
    --text-strong-color: rgba(0,90,136, 1);
    --subtle-color: rgba(246,250,254, 1);
    --border-color: rgba(98,142,184, 1);
    --shadow-color: rgba(111,161,207, 1);
    --input-color: rgba(255,255,255, 1);
    --outline-color: rgba(247,152,129, 1);
    --mark-color: rgba(148,56,0, 0.16);
    --special-color: rgba(148,56,0, 1);
    --special-bg-color: rgba(180,70,0, 1);
    --special-text-color: rgba(255,255,255, 1);
    --special-shadow-color: rgba(54,33,29, 1);
    --special-mark-color: rgba(255,255,255, 0.16);
    --light-color: rgba(255,240,238, 1);
    --dark-color: rgba(96,62,55, 1);
    --text-color-rgb: 0,90,136;
    --bg-color-rgb: 255,255,255;
    --subtle-color-rgb: 246,250,254;
    --special-color-rgb: 148,56,0;
    --special-text-color-rgb: 255,255,255;
    --special-bg-color-rgb: 180,70,0;
    --shadow-color-rgb: 111,161,207;
    --special-shadow-color-rgb: 54,33,29;
    --outline-color-rgb: 247,152,129;
    --dark-color-rgb: 96,62,55;
    --light-color-rgb: 255,240,238;
    font-family: monospace;
  }
}

@media (prefers-color-scheme: dark) and (prefers-contrast: more) {
  :host {
    --bg-color: rgba(32,32,32, 1);
    --text-color: rgba(98,181,248, 1);
    --text-soft-color: rgba(98,181,248, 1);
    --text-strong-color: rgba(98,181,248, 1);
    --subtle-color: rgba(31,37,43, 1);
    --border-color: rgba(87,127,164, 1);
    --shadow-color: rgba(0,0,0, 1);
    --input-color: rgba(28,28,28, 1);
    --outline-color: rgba(234,125,92, 1);
    --mark-color: rgba(247,149,124, 0.16);
    --special-color: rgba(247,149,124, 1);
    --special-bg-color: rgba(133,56,24, 1);
    --special-text-color: rgba(243,238,238, 1);
    --special-shadow-color: rgba(0,0,0, 1);
    --special-mark-color: rgba(243,238,238, 0.16);
    --light-color: rgba(252,221,216, 1);
    --dark-color: rgba(72,46,40, 1);
    --text-color-rgb: 98,181,248;
    --bg-color-rgb: 32,32,32;
    --subtle-color-rgb: 31,37,43;
    --special-color-rgb: 247,149,124;
    --special-text-color-rgb: 243,238,238;
    --special-bg-color-rgb: 133,56,24;
    --shadow-color-rgb: 0,0,0;
    --special-shadow-color-rgb: 0,0,0;
    --outline-color-rgb: 234,125,92;
    --dark-color-rgb: 72,46,40;
    --light-color-rgb: 252,221,216;
    font-family: monospace;
  }
}
`;

export default sharedStyles;