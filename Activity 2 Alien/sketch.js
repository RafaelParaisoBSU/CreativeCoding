function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  translate(width / 2 - 2, 0);
  beginShape();
  
  //Body
  push();
  fill(87, 44, 18);
  stroke(46, 21, 5);
  strokeWeight(5);
  rect(-130, 200, 300);
  pop();
  
  //Ears
  fill(0, 255, 0);
  stroke(7, 74, 16);
  strokeWeight(5);
  triangle(150, 50, 10, 100, 150, 20);
  triangle(-150, 50, -10, 100, -150, 20);
  
  //Head
  fill(0, 255, 0);
  stroke(7, 74, 16);
  strokeWeight(5);
  ellipse(10, 125, 200);
  
  //Eyes
  fill(0, 0, 0);
  stroke(255, 255, 255);
  strokeWeight(3);
  circle(50, 100, 20);
  circle(-25, 100, 20);
  
  //Eyebrows
  fill(7, 74, 16);
  noStroke(); 
  rect(35, 85, 40, 8); 
  rect(-50, 85, 40, 8); 
  
 //Nose
  fill(255, 150, 0);
  stroke(7, 74, 16);
  ellipse(14, 130, 30, 40); 

  //Mouth
  noFill();
  stroke(0, 0, 0);
  strokeWeight(4);
  beginShape();
  curve(-30, 160, 10, 180, 50, 160);
  endShape();
  
  // Mouth - Bezier Curve
  noFill();
  stroke(0, 0, 0);
  strokeWeight(3);
  bezierVertex(-35, 165, 10, 180, 50, 160);
  
  //Clothes
  fill(255,255,175);
  stroke(0,0,0);
  triangle(-120,400,175,400,172,200);

}