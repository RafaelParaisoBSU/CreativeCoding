var img, x, y;

// Preload function to load the image before the program starts
function preload() {
  img = loadImage("wheeze.png"); // Load the image file "wheeze.png" into the variable img
}

function setup() {
  createCanvas(741, 741); // Create a canvas of size 741x741 pixels
  background(0); // Set the background color to black
  noStroke(); // Disable drawing the outline of shapes
}

function draw() {
  background(0); // Clear the canvas by setting the background color to black for each frame

  x = mouseX; // Set x to the current horizontal mouse position
  y = mouseY; // Set y to the current vertical mouse position

  image(img, 0, 0); // Draw the loaded image at the top-left corner of the canvas (0, 0)

  var c = get(x, y); // Get the color of the pixel at the mouse (x, y) position from the canvas

  fill(c); // Set the fill color to the color retrieved from the pixel at the mouse position

  stroke(255); // Set the stroke color to white
  rect(x, y, 100, 100); // Draw a rectangle at the mouse position with a width and height of 100 pixels
}
