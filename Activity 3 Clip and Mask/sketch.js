let img;

// Preload function to load the image before the program starts
function preload() {
  img = loadImage("bugs.jpg"); // Loads the image file "bugs.jpg" into the variable img
}

function setup() {
  createCanvas(700, 700); // Creates a canvas of size 700x700 pixels
  background(0, 255, 0); // Sets the background color to green

  img.resize(200, 200); // Resizes the image to 200x200 pixels

  // Creates a graphics buffer for drawing a triangle and clipping the image
  let cnv7 = createGraphics(200, 200);
  cnv7.triangle(50, 50, 100, 200, 200, 0); // Draws a triangle
  cnv7.canvas.getContext("2d").clip(); // Clips the drawing area to the triangle shape
  cnv7.image(img, 0, 0); // Draws the resized image within the clipped area
  image(cnv7, 350, 225); // Draws the graphics buffer onto the main canvas at position (350, 225)

  img.resize(300, 300); // Resizes the image to 300x300 pixels

  // Create another graphics buffer for masking the image with an ellipse
  let cnv5 = createGraphics(200, 200);
  cnv5.ellipse(100, 100, 100, 100); // Draws an ellipse in the buffer
  img.mask(cnv5); // Applies the ellipse mask to the image
  image(img, 300, 25); // Draws the masked image onto the main canvas at position (300, 25)
}
