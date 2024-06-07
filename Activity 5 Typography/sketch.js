var font;

function preload() {
  font = loadFont("Aller_Bd.ttf"); // Load the font file "Aller_Bd.ttf"
}

var points;

function setup() {
  createCanvas(2000, 400); // Creates a canvas of size 2000x400 pixels
  background(0); // Sets the background color to black
  fill(255, 100, 170); // Sets the fill color to a pinkish hue
  noStroke(); // Disable the outline of shapes

  // Converts the text 'Bath Spa University' into points
  points = font.textToPoints('Bath Spa University', 200, 200, 100, {
    sampleFactor: 0.3
  });

  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    
    // Adds some noise to the positions to create a dynamic effect
    var xOffset = random(-5, 5);
    var yOffset = random(-5, 5);
    
    // Varies the ellipse size more significantly
    var ellipseWidth = random(5, 20);
    var ellipseHeight = random(5, 20);
    
    // Varies the color slightly based on position
    var r = 255;
    var g = 100 + p.y / 2;
    var b = 170 - p.x / 10;
    fill(r, g, b, 200); // Semi-transparent fill color
    
    // Draws the ellipse with added offsets and varied sizes
    ellipse(p.x + xOffset, p.y + yOffset, ellipseWidth, ellipseHeight);
  }
}
