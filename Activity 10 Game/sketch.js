let r = 30;
let points = 0;
let userTimer = 5; // Timer for the user's time limit
let visualCircleTimer = 3; // Timer for the timer-circle
let ballImg; // Variable to store the image
let restartButton; // Variable to store the restart button
let gameOver = false; // Variable to track if the user failed
let gameStarted = false; // Variable to track if the game has started
let myFont; // Variable to store the font
let visualTimerRadius; // Radius of the visual timer circle
let maxVisualTimerRadius = 100; // Maximum radius of the visual timer circle
let timerSpeedIncrease = 0.5; // Increases rate for timer speed adjustment
let difficultyIncreased = false; // Flag to indicate if difficulty has been increased
let difficultyPopupTimer = 60; // Timer for displaying the difficulty increased popup
let difficultyPopupText = ""; // Text for the difficulty increased popup
let adjustTimerSpeed = false; // Flag to indicate whether we need to adjust timer speed
let gameAudio; // Variable to hold the games audio
let trail = []; // Array to hold the cursors trail points
let maxTrailLength = 20; // Maximum number of trail points
let trailFadeSpeed = 10; // Speed at which the trail fades
let hitSound; // Variable to hold hit-sound

function preload() {
  ballImg = loadImage("circle.png"); // Loads the image
  bgImg = loadImage("bg.jpg"); // Loads Bg image
  myFont = loadFont("Aller_Rg.ttf"); // Loads the font
  gameAudio = loadSound("XI-Blue-Zenith.mp3"); // Loads the game audio
  hitSound = loadSound("normal-hitnormal.wav"); // Loads the hit-sounds
}

function setup() {
  createCanvas(1000, 700);
  ball = createVector(random(r, width - r), random(r, height - r)); //Creates the Circle
  frameRate(100);

  // Creates and hides the restart button
  restartButton = createButton("Restart"); // Restart button Text
  restartButton.position(width / 2 - 50, height / 2 + 40); // Restart button position, width, and height
  restartButton.mousePressed(restartGame); // Restarts the game when pressed
  restartButton.hide(); // Hides the restart button when the game starts

  textFont(myFont); // Sets the font
}

function draw() {
  noCursor(); // Disables cursor ingame
  imageMode(CORNER); // Sets the image to start at the corner
  image(bgImg, 0, 0, width, height); // Sets the background image
  fill(0, 0, 0, 150); // Adds a black overlay to allow for better viewing
  rect(0, 0, width, height); // Black overlay
  fill(255);
  textSize(20); // Sets text size
  text(points, 20, 30); // Points counter text

  if (!gameOver && gameStarted) {
    player = createVector(mouseX, mouseY); // Gets the current mouse position

    // Update the visual circle timer
    visualCircleTimer -= 1 / 60;
    if (visualCircleTimer <= 0) {
      // If timer reaches 0, resets the ball position
      resetBall();
    }

    // Draw the visual timer for the circle
    visualTimerRadius = map(visualCircleTimer, 0, 3, 0, maxVisualTimerRadius);
    if (visualTimerRadius > 0) {
      fill(255, 135, 198, 100); // Transparent red
      ellipse(ball.x, ball.y, visualTimerRadius * 2, visualTimerRadius * 2);
    }

    // Draw the image at the ball position
    imageMode(CENTER); // Set the image mode to center
    image(ballImg, ball.x, ball.y, r * 2, r * 2);

    // Updates the user's timer
    userTimer -= 1 / 60;
    if (userTimer <= 0) {
      gameOver = true;
      userTimer = 0;
      noLoop();
      showGameOverScreen();
    }

    let len = map(userTimer, 0, 5, 0, 200); // Calculates the length of the rectangle that represents the user's timer
    rect(15, 50, 20, len);

    // Update difficulty popup timer
    if (difficultyPopupTimer > 0) {
      difficultyPopupTimer--;
    }

    // Display difficulty increased popup
    if (difficultyPopupTimer > 0 && difficultyIncreased) {
      fill(255);
      textSize(30);
      textAlign(CENTER);
      text(difficultyPopupText, width / 2, height / 2);
    }

    // Update and draw the cursor trail
    updateTrail();
    drawTrail();
  } else {
    showTitleScreen(); // Display the title screen
  }
}

function mousePressed() {
  if (!gameOver && !gameStarted) {
    gameStarted = true; // Set gameStarted to true when the game starts
    startAudio(); // Start the audio when the game starts
  }
  if (!gameOver && gameStarted) {
    let d = dist(mouseX, mouseY, ball.x, ball.y);
    if (d < r) {
      resetBall();
      points++;
      userTimer = 5; // Reset user's timer

      // Play the hit-sound when the circle is clicked
      hitSound.play();

      // Check if we need to adjust timer speed
      if (points % 25 === 0) {
        adjustTimerSpeed = true; // Set flag to true
      }
    }
  }
}

function showTitleScreen() {
  image(bgImg, 0, 0, width, height); // Draw the background image

  // Logo Design
  fill(255, 135, 198);
  ellipse(500, 275, 500, 500);
  noFill();
  stroke(255);
  strokeWeight(10);
  ellipse(500, 275, 500, 500);
  strokeWeight(0);
  textAlign(CENTER);
  textSize(150);
  fill(255);
  text("osu!", width / 2, height / 2 - 50);
  fill(255);
  textSize(50);
  text("Click the circles!", width / 2, height / 2 + 30);
  fill(255);
  textSize(25);
  text("Click anywhere to start!", width / 2, height / 2 + 250);
}

function showGameOverScreen() {
  imageMode(CORNER); // Set image mode to corner for background image
  image(bgImg, 0, 0, width, height); // Draw the background image
  fill(0, 0, 0, 150); // Add a semi-transparent black overlay
  rect(0, 0, width, height); // Draw the overlay
  fill(255); // Set fill color to white
  textAlign(CENTER); // Center-align text
  textSize(50); // Set text size for "GAME OVER"
  text("GAME OVER", width / 2, height / 2); // Display "GAME OVER" text

  // Display the score
  textSize(30); // Set text size for the score
  text("Score: " + points, width / 2, height / 2 + 60); // Display the score below "GAME OVER"

  // Centered and larger restart button
  restartButton.position(width / 2 - 100, height / 2 + 100); // Adjust position
  restartButton.size(200, 60); // Adjust size
  restartButton.show(); // Show the restart button

  // Stop the game audio when game over
  gameAudio.stop();
}

function restartGame() {
  gameOver = false;
  gameStarted = false; // Reset gameStarted to false when restarting
  points = 0;
  userTimer = 5; // Reset user's timer
  visualCircleTimer = 3; // Reset visual circle timer
  adjustTimerSpeed = false; // Reset flag
  difficultyIncreased = false; // Reset flag
  difficultyPopupTimer = 0; // Reset difficulty popup timer
  difficultyPopupText = ""; // Reset difficulty popup text
  r = 30;
  ball = createVector(random(r, width - r), random(r, height - r));
  restartButton.hide(); // Hide the restart button
  loop(); // Restart the draw loop
}

function resetBall() {
  ball = createVector(random(r, width - r), random(r, height - r));
  visualCircleTimer = 3; // Reset visual circle timer
  if (adjustTimerSpeed) {
    visualCircleTimer -= timerSpeedIncrease; // Increase the timer speed
    adjustTimerSpeed = false; // Reset flag
    difficultyIncreased = true; // Set flag for difficulty increased
    difficultyPopupTimer = 60; // Set difficulty popup timer
    difficultyPopupText = "Difficulty Increased!"; // Set difficulty popup text
  }
}

function startAudio() {
  gameAudio.loop(); // Start the game audio
}

// Trail functions
function updateTrail() {
  trail.push(createVector(mouseX, mouseY));
  if (trail.length > maxTrailLength) {
    trail.shift();
  }
}

function drawTrail() {
  for (let i = 0; i < trail.length; i++) {
    // Map the alpha value based on the index to create a fading effect
    let alpha = map(i, 0, trail.length, 0, 255);

    // Draw the outer circle
    fill(255, 135, 198, 255); // Set the fill color for the outer circle with fading alpha
    ellipse(trail[i].x, trail[i].y, r, r); // Draw the outer circle with radius 'r'

    // Draw the inner circle
    fill(255, 230, 180, alpha); // Set the fill color for the inner circle with fading alpha
    stroke(255, 255, 255); // Set the stroke color for the inner circle
    strokeWeight(1); // Set the stroke weight for the circles to make the borders thin
    ellipse(trail[i].x, trail[i].y, r / 2, r / 2); // Draw the inner circle with half the radius of the outer circle
  }
}
