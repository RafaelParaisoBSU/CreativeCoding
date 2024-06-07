let particles = [];
let num = 1000;
let noiseScale = 0.01 / 2;
let lineColor;
let fontFamilies = []; // Add your desired font families here
let currentFontIndex = 0;
let currentFont;

function preload() {
  // Load your font files here
  fontFamilies = ['ShadowsIntoLight.ttf', 'BlackOpsOne-Regular.ttf','Comfortaa-Light.ttf']; // Add the path to your font files
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  particles = Array.from({ length: num }, () => createVector(random(width), random(height)));
  lineColor = color(255);
  stroke(255);
  clear();
  textAlign(CENTER, CENTER);
  textSize(70);
  currentFont = loadFont(fontFamilies[currentFontIndex]);
}

function draw() {
  background(0, 10);
  stroke(lineColor);
  particles.forEach(p => {
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
    let a = TWO_PI * n;
    p.add(cos(a), sin(a));
    if (!onScreen(p)) {
      p.set(random(width), random(height));
    }
    point(p.x, p.y);
  });

  // Draw the text with thinner outline
  let offsetX = [-2, 0, 2]; // Adjust these values for thinner or thicker outline
  let offsetY = [-2, 0, 2];
  let outlineColor = color(50); // Adjust outline color if needed
  for (let i = 0; i < offsetX.length; i++) {
    for (let j = 0; j < offsetY.length; j++) {
      if (i != 1 || j != 1) { // Skip the center text (original)
        fill(outlineColor);
        textFont(currentFont);
        text("Welcome to Bath Spa University", width / 2 + offsetX[i], height / 2 + offsetY[j]);
      }
    }
  }

  // Draw the center text
  fill(255);
  textFont(currentFont);
  text("Welcome to Bath Spa University", width / 2, height / 2);
}

function mousePressed() {
  lineColor = color(random(255), random(255), random(255));
}

function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function mouseClicked() {
  // Change font family on click
  currentFontIndex = (currentFontIndex + 1) % fontFamilies.length;
  currentFont = loadFont(fontFamilies[currentFontIndex]);
}