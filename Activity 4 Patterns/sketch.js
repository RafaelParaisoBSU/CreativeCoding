let rez = 0.1; // Perlin noise resolution
let t = 0; // Time variable for Perlin noise
let space = 20; // Spacing between shapes int he grid
let baseSize = 15; // Base size for each shape

function setup() {
  createCanvas(600, 600); // Creates a 600x600 pixel canvas
  noLoop(); // Runs the draw function only once
}

function draw() {
  background(0); // Sets the background color to black
  for (let i = 0; i <= width; i += space) { // Loop over canvas width with increments of 'space'
    for (let j = 0; j <= height; j += space) { // Loop over canvas height with increments of 'space'
      let n = noise(i * rez, j * rez, t); // Calculates Perlin noise value at position (i, j) and time t
      fill(n * 10, n * 255, n * 10, 255); // Sets fill color based on noise value
      noStroke(); // Removes stroke from shapes
      let sizeVariation = random(-5, 5); // Adds random variation to the shapes size
      let size = baseSize + sizeVariation; // Calculate the final size with variation
      let drawSize = min(size, space); // Ensures the shape doesn't overflow the spacing
      ellipse(i, j, drawSize, drawSize); // Draws a circle at position (i, j) with the calculated size
    }
    t += 0.5; // Increments time slightly to change the noise pattern
  }
}
