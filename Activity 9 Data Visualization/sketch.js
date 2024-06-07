let table;
let genreColors = []; // Array to store colors for each genre

function preload() {
  // Loads the CSV file
  table = loadTable('test.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 600);
  background(0);
  textAlign(CENTER, CENTER);
  textSize(15);

  // Main header
  addHeader("Webtoon Genres That I've Read in May");

  // Generates colors for each genre
  generateGenreColors(table.getColumnCount());

  visualizeData();
}

function addHeader(headerText) {
  fill(255); // Sets the color of the text to black
  text(headerText, width / 2, 40); // Displays the header at the top center
}

function generateGenreColors(numGenres) {
  for (let i = 0; i < numGenres; i++) {
    genreColors.push(color(random(255))); // Generates random monochrome colors
  }
}

function visualizeData() {
  let numRows = table.getRowCount();
  let numCols = table.getColumnCount();
  let barWidth = width / (numCols * (numRows + 0.55) + numCols); // Calculates the bar width

  for (let c = 0; c < numCols; c++) {
    let xOffset = (c + 1) * barWidth * (numRows + 1);
    // Draw column header
    let header = table.columns[c];
    fill(255);
    text(header, xOffset + (numRows * barWidth) / 2, 80); // Positions the header above bars

    for (let r = 0; r < numRows; r++) {
      let value = table.getNum(r, c); // Get a number from each cell
      let barHeight = map(value, 0, 15, 0, height - 120); // Maps each value to a bar height
      let genreColor = genreColors[c]; // Get the color for this genre
      fill(genreColor);
      rect(xOffset + r * barWidth, height - barHeight - 20,barWidth, barHeight);
      
      // Draws the value outside the bar
      fill(255); 
      text(value, xOffset + r * barWidth + barWidth / 2, height - barHeight - 30); // Positions text outside the bar
    }
  }
}
