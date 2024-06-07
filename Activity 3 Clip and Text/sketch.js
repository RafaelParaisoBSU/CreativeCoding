function setup() {
  createCanvas(700, 700);
  background(0);
  
  let circleDiameter = 500;
  let circleX = width / 2;
  let circleY = height / 2;
  
  // Create graphics for the background and apply clipping
  cnv4 = createGraphics(width, height);
  ctx2 = cnv4.canvas.getContext("2d");
  cnv4.circle(circleX, circleY, circleDiameter / 2);
  ctx2.clip();
  cnv4.fill(255,0,0);
  cnv4.circle(circleX, circleY, circleDiameter / 2);
  image(cnv4, 0, 0);
  
  // Create graphics for the text and apply erase function
  cnv3 = createGraphics(width, height);
  cnv3.fill(255,192,203);  
  cnv3.circle(circleX, circleY, circleDiameter / 2);
  cnv3.erase();
  cnv3.textSize(100);
  cnv3.textAlign(CENTER, CENTER);
  cnv3.text('osu!', circleX, circleY + 20); // text, x, y 
  cnv3.noErase();
  image(cnv3, 0, 0);
}
