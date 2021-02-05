// Project Title



let grid = [[4,1,0,0,6,0,0,7,8],
  [7,0,3,5,0,1,4,2,0],
  [0,0,8,4,7,3,0,6,0],
  [0,5,0,0,9,4,8,3,0],
  [3,9,0,0,1,0,7,0,0],
  [2,8,4,3,0,0,0,0,0],
  [6,0,0,0,0,0,0,8,0],
  [0,0,1,9,4,0,0,0,0],
  [0,4,9,0,2,8,0,0,0]];

let defaultGrid = [[4,1,0,0,6,0,0,7,8],
  [7,0,3,5,0,1,4,2,0],
  [0,0,8,4,7,3,0,6,0],
  [0,5,0,0,9,4,8,3,0],
  [3,9,0,0,1,0,7,0,0],
  [2,8,4,3,0,0,0,0,0],
  [6,0,0,0,0,0,0,8,0],
  [0,0,1,9,4,0,0,0,0],
  [0,4,9,0,2,8,0,0,0]];

let answerGrid = [[4, 1, "5", "2", 6, "9", "3", 7, 8],
  [7, "6", 3, 5, "8", 1, 4, 2, "9"],
  ["9", "2", 8, 4, 7, 3, "5", 6, "1"],
  ["1", 5, "7", "6", 9, 4, 8, 3, "2"],
  [3, 9, "6", "8", 1, "2", 7, "4", "5"],
  [2, 8, 4, 3, "5", "7", "1", "9", "6"],
  [6, "7", "2", "1", "3", "5", "9", 8, "4"],
  ["8", "3", 1, 9, 4, "6", "2", "5", "7"],
  ["5", 4, 9, "7", 2, 8, "6", "1", "3"]];

let canvasSide, cellSideLength;

let keyEntered, selectedNumber;
let ischosen = false;
let selectedGrid = [0,0];
let lastgrid = [-1,-1];

let foundRepeat;
let startCheck = false;
let verRepeat = false;
let horRepeat = false;
let sqrRepeat = false;

let finish = false;

function setup() {

  // makes the grid the biggest square of the screen
  if (windowWidth > windowHeight){
    createCanvas(windowHeight, windowHeight);
    cellSideLength = windowHeight/9;
    canvasSide = windowHeight;
  }
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
    cellSideLength = windowWidth/9;
    canvasSide = windowWidth;
  }

  // makes the text appear in the center
  textAlign(CENTER);

}

function draw() {

  // draw grid, show number within the array, and check if the game
  // game is completed
  drawGrid();
  displayNumber();
  checkFinish();
}

function checkFinish(){

  // check if the the grid value is equal to the answer
  finish = true;
  for (let y=0;y<9;y++){
    for (let x=0; x<9; x++){

      if (grid[y][x] != answerGrid[y][x]){
        finish = false;
      }
    }
  }

  // shows end game screen
  if (finish === true){
    fill("#fbe6ff");
    rect(0,0,width,height);
    fill('#47d1d1');
    text("GG", width/2, height/2);
  }
}

function drawGrid(){

  for (let y=0;y<9;y++){
    
    // draw horizontal split line
    if (y%3 === 0 && y !== 0){
      strokeWeight(10);
      line(0,y*cellSideLength,canvasSide,y*cellSideLength);
    }
    for (let x=0;x<9;x++){

      // draw base grid
      fill("white");
      strokeWeight(1);
      square(x*cellSideLength,y*cellSideLength,cellSideLength);

      // use a and b to make code more readable
      let a = selectedGrid[0];
      let b = selectedGrid[1];

      // darken the selected grid
      if (ischosen){
        fill("grey");
        strokeWeight(0);
        square(a*cellSideLength,b*cellSideLength,cellSideLength);
      }

      // darken the grid with same number to help user solve the puzzle
      if (grid[y][x] != 0 && grid[y][x] == selectedNumber){
        fill("brown");
        square(x*cellSideLength,y*cellSideLength,cellSideLength);
      }
      
      // highlight the grid when select a number that violates the sudoku rule
      if (foundRepeat){
        fill("red");
        strokeWeight(0);
        square(a*cellSideLength,b*cellSideLength,cellSideLength);
      }
      
      // draw verical split line
      if (x%3 === 0 && x!==0){
        strokeWeight(10);
        line(x*cellSideLength,0, x*cellSideLength, canvasSide);
      }
    }
  }
}

function displayNumber(){
  

  for (let y=0;y<9;y++){
    for (let x=0;x<9;x++){

      // puts numbers in grid onto the screen, 0 excluded
      if (grid[y][x] !== 0){
        fill("black");
        textSize(cellSideLength*0.9);
        text(grid[y][x],x*cellSideLength+cellSideLength/2,y*cellSideLength + cellSideLength*7/8);
      }
    }
  }
}

function mouseClicked(){

  // locate the grid that is clicked
  let x = Math.floor(mouseX/cellSideLength);
  let y = Math.floor(mouseY/cellSideLength);
  
  // set grid location  and value as global value for repeat detection 
  // and draw grid
  selectedGrid[0] = x;
  selectedGrid[1] = y;

  selectedNumber = grid[y][x];

  // choose/ unchoose/ choose new grid
  if (x === lastgrid[0] && y === lastgrid[1]){
    ischosen = !ischosen;
  }
  else{
    ischosen = true;
    foundRepeat = false;
  }

  lastgrid[0] = x;
  lastgrid[1] = y;

  // control when to check for repeat
  if (ischosen === true){
    startCheck = true;
  }
  else {
    startCheck = false;
  }

  checkRepeat();
}

function checkRepeat(){

  // check for repeat when a grid is chosen or when a value is altered
  if (startCheck){
 
    checkHorRepeat();
    checkVerRepeat();
    checkSquareRepeat();
    
    // if the number repeats in any of the test above, tell draw to
    // highlight the grid
    if (verRepeat || horRepeat || sqrRepeat){
      foundRepeat = true;
    }
    else{
      foundRepeat = false;
    }
    startCheck = false;
  }
}

function checkHorRepeat(){

  // check if the number in selected grid repeats in the same row
  let y = selectedGrid[1];
  horRepeat = false;
  for(let x=0;x<9;x++){
    if (grid[y][x] != 0 && (selectedGrid[0] != x) && grid[y][x] == (selectedNumber)){
      horRepeat = true;
    }
  }
}

function checkVerRepeat(){

  // check if the number in selected grid repeats in the same colomn
  let x = selectedGrid[0];
  verRepeat = false;
  for(let y=0;y<9;y++){
    if (grid[y][x] != 0 && (selectedGrid[1] != y) && grid[y][x] == (selectedNumber)){
      verRepeat = true;
    }
  }
}

function checkSquareRepeat(){

  // determine regional square the selected grid is in
  let x = Math.floor(selectedGrid[0]/ 3);
  let y = Math.floor(selectedGrid[1]/ 3);

  // check if the number repeats in the same 3x3 square
  sqrRepeat = false;
  for (let i=0;i<3;i++){
    for (let j=0;j<3;j++){
      if (grid[3*y+i][3*x+j] != 0 && (selectedGrid[0] != 3*x+j || selectedGrid[1] != 3*y+i) && grid[3*y+i][3*x+j] == (selectedNumber)){
        sqrRepeat = true;
      }
    }
  }
}

function keyTyped(){


  for (let i=1; i<10;i++){
    keyEntered = key;
    // runs only when a number between 1-9 is typed
    if (key == i){


      // check for repeat when a key between 1-9 is typed and a grid
      // is selected
      if (ischosen){
        if (defaultGrid[selectedGrid[1]][selectedGrid[0]] === 0 ){
          grid[selectedGrid[1]][selectedGrid[0]] = keyEntered;
          selectedNumber = keyEntered;
          startCheck = true;
          checkRepeat();
        }
      }
    }
    // if the key pressed is space, it clears the value in the grid
  }


  if (keyEntered === " " && defaultGrid[selectedGrid[1]][selectedGrid[0]] === 0){
    grid[selectedGrid[1]][selectedGrid[0]] = keyEntered;
  }  

}