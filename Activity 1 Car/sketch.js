function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0,165,255);
  
  // Line Stroke color and weight
  stroke(0)
  strokeWeight(1)
  
  // Road
  fill(150, 150, 150); //Road Color
  rect (0 ,272, 400); // Road Area
  
  // Car
  fill(255,0,0) // Car Color
  rect(75, 200, 250, 35); // Main Body
  rect(45, 150, 30, 50); // Car Spoiler
  triangle (75, 150, 75, 200, 125, 200); //Car Spoiler
  triangle (130, 200, 225, 145, 225, 200); // Driver's Area
  triangle (325, 200, 380, 225, 325, 225); // Front Bumpers
  triangle (50, 235, 75, 235, 75, 215); // Rear Bumpers
  triangle (275, 200, 275, 180, 300, 200); // Driver's Front
  
  fill (65, 0 ,0);
  rect(75, 217.5, 250, 17.5); // Secondary Car Color
  
  // Wheels
  fill (100, 100, 100); // Outer Wheels
  ellipse (100, 245, 55, 55);
  ellipse (315, 245, 55, 55);
  
  fill (0); // Inner Wheels
  ellipse (100, 245, 30, 30); 
  ellipse (315, 245, 30, 30);
  
  fill(225, 265, 110); // Innermost Wheels
  ellipse (100, 245, 20, 20);
  ellipse (315, 245, 20, 20);
  
  // Road Markers
  rect (10, 315, 100, 25);
  rect (310, 315, 100, 25);
  rect (160 , 315, 100, 25);
  
  // Driver
  fill (139, 0, 0);
  ellipse (240, 185, 30, 30);
  
  
  // Driver's Goggles
  fill(0, 100, 225)
  ellipse (250, 185, 15, 15);

}