var img, x, y;

// Preload function to load the image before the program starts
function preload() {
  img = loadImage("setup.jpg"); // Load the image file "setup.jpg" into the variable img
}

function setup() {
  createCanvas(400, 400); // Create a canvas of size 400x400 pixels
  background(0); // Set the background color to black
  noStroke(); // Disable drawing the outline of shapes
}

function draw() {
  x = random(width); // Generate a random x-coordinate within the canvas width
  y = random(height); // Generate a random y-coordinate within the canvas height
  var c = img.get(x, y); // Get the color of the pixel at the random (x, y) position from the image
  fill(c[0], c[1], c[2], 150); // Set the fill color with the pixel's RGB values and an alpha value of 150 for transparency
  ellipse(x, y, 35, 35); // Draw an ellipse at the random (x, y) position with a width and height of 35 pixels
}
