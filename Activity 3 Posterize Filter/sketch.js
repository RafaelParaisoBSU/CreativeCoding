var img;

// Preload function to load the image before the program starts
function preload() {
  img = loadImage("pepeclown.jpg"); // Load the image file "pepeclown.jpg" into the variable img
}

function setup() {
  createCanvas(400, 400); // Create a canvas of size 400x400 pixels
  background(0); // Set the background color to black
}

function draw() {
  background(0); // Clear the canvas by setting the background color to black for each frame
  image(img, 0, 0); // Draw the loaded image at the top-left corner of the canvas (0, 0)

  // Map the mouseX position (horizontal mouse position) to a range between 2 and 20
  var v = map(mouseX, 0, width, 2, 20);

  // Apply a posterize filter to the image, with the number of color levels based on the mouseX position
  filter(POSTERIZE, v);
}
