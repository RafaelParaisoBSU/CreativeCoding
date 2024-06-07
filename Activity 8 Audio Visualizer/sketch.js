let song;
let fft;
let bgColor;
let rotationAngles = [];
let circleColors = [];
let pulseSpeed = 0.05; // Adjust the pulse speed

function preload() {
  // Load a sound file
  song = loadSound('XI-Freedom.mp3');
}

function setup() {
  createCanvas(1000, 800);
  angleMode(DEGREES);
  noFill();
  
  // Create an FFT object
  fft = new p5.FFT();
  
  // Start playing the song
  song.loop();

  bgColor = color(0);

  // Initialize rotation angles for each circle
  let numCircles = 5; // Update the number of circles
  for (let i = 0; i < numCircles; i++) {
    rotationAngles.push(0);
  }

  // Color palette for the circles
  circleColors = [
    color(250,235,44), 
    color(245,39,137), 
    color(233,0,255), 
    color(22,133,248), 
    color(61,20,76) 
  ];
}

function draw() {
  // Create a fading background effect
  background(bgColor);
  bgColor.setAlpha(30);  // Transparency for the fading effect
  
  // Analyze the frequency spectrum
  let spectrum = fft.analyze();
  
  // Translate the origin point to the center of the canvas
  translate(width / 2, height / 2);
  
  // Define the number of circles and the spacing between them
  let numCircles = 5; // Update the number of circles
  let spacing = 40;

  // Draw multiple rotating circles with specific colors
  for (let j = 0; j < numCircles; j++) {
    let radiusOffset = j * spacing;

    // Apply rotation
    let rotationDirection = (j % 2 === 0) ? 1 : -1;
    rotationAngles[j] += rotationDirection * 0.7; // Adjust the speed as needed
    push();
    rotate(rotationAngles[j]);
    
    beginShape();
    for (let i = 0; i < spectrum.length; i++) {
      let angle = map(i, 0, spectrum.length, 0, 360);
      let radius = map(spectrum[i], 0, 255, 100 + radiusOffset, 300 + radiusOffset);

      // Adjust the radius based on a sine function to create a pulsing effect
      let pulseAmount = sin(frameCount * pulseSpeed + j * 50) * 20; // Adjust the pulse intensity
      radius += pulseAmount;
      
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      
      // Use the specific color for the current circle
      let col = lerpColor(circleColors[j], color(255), spectrum[i] / 255);
      stroke(col);
      strokeWeight(map(spectrum[i], 0, 255, 1, 4));
      
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}
