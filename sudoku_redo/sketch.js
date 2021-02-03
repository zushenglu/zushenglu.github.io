// Project Title

let cellSideLength;
let ROWS = 9;
let COLS = 9;
let grid = [[4,1,0,0,6,0,0,7,8],
[7,0,3,5,0,1,4,2,0],
[0,0,8,4,7,3,0,6,0],
[0,5,0,0,9,4,8,3,0],
[3,9,0,0,1,0,7,0,0],
[2,8,4,3,0,0,0,0,0],
[6,0,0,0,0,0,0,8,0],
[0,0,1,9,4,0,0,0,0],
[0,4,9,0,2,8,0,0,0]];

//createGrid(ROWS,COLS);
let canvasSide;
let selectedGrid;
let lastgrid = [-1,-1];
let ischosen = false;
let inputNumber;
let numberSet = [1,2,3,4,5,6,7,8,9]
let isKeyInsert = false;
let keyEntered;
let rowNumbers;
let testSet = new Set([1,2,3,4,5])
let foundRepeat;
let colNumbers;
let verRepeat = false;
let horRepeat = false;
let squareNumber;
let sqrRepeat = false;
let startCheck = false;;
let selectedNumber;

function setup() {
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
  selectedGrid = [0,0]
    textAlign(CENTER);
//  rectMode(CENTER)
}

function draw() {
  background('green');
  drawGrid();
  displayNumber();

}

function createGrid(ROWS,COLS){
  empty = []
  for (let y=0;y<ROWS;y++){
    empty.push([])
    for (let x=0;x<COLS;x++){
      empty[y].push()
    }
  }
  return empty
}

function drawGrid(){

  for (let y=0;y<ROWS;y++){
    if (y%3 === 0 && y != 0){
      strokeWeight(10);
      line(0,y*cellSideLength,canvasSide,y*cellSideLength);
    }
    for (let x=0;x<COLS;x++){
      let a = selectedGrid[0];
      let b = selectedGrid[1];
      if (ischosen){
        fill("grey")     
        strokeWeight(0)
        square(a*cellSideLength,b*cellSideLength,cellSideLength)
      }
      
      if (foundRepeat){
        fill("red")
        strokeWeight(0)
        square(a*cellSideLength,b*cellSideLength,cellSideLength)
      }

      fill("white")
      strokeWeight(1)
      square(x*cellSideLength,y*cellSideLength,cellSideLength)
      if (x%3 === 0 && x!=0){
        strokeWeight(10);
        line(x*cellSideLength,0, x*cellSideLength, canvasSide);
      }
    }
  }
}

function displayNumber(){
  for (let y=0;y<ROWS;y++){
    for (let x=0;x<COLS;x++){
      if (grid[y][x] !== 0){
      fill("black")
      textSize(cellSideLength*.9)
      text(grid[y][x],x*cellSideLength+cellSideLength/2,y*cellSideLength + cellSideLength*7/8)
     }
   }
  }
}

function keyTyped(){

  startCheck = false;
  keyEntered = key;
  if (ischosen){
    grid[selectedGrid[1]][selectedGrid[0]] = keyEntered
    console.log(grid[selectedGrid[1]][selectedGrid[0]])
    selectedNumber = keyEntered
    startCheck = true;
    checkRepeat();
  }
}

function mouseClicked(){

  let x = Math.floor(mouseX/cellSideLength)
  let y = Math.floor(mouseY/cellSideLength)
  
  selectedGrid[0] = x;
  selectedGrid[1] = y;
  selectedNumber = grid[y][x]
  if (x === lastgrid[0] && y === lastgrid[1]){
    ischosen = !ischosen
  }
  else{
    ischosen = true
    foundRepeat = false;
  }

  if (ischosen === true){
    startCheck = true
  }
  else {
    startCheck = false;
  }

  lastgrid[0] = x
  lastgrid[1] = y

  checkRepeat()
}

function checkHorRepeat(){
  let y = selectedGrid[1]
  horRepeat = false
  for(let x=0;x<9;x++){
    if (grid[y][x] != 0 && (selectedGrid[0] != x) && grid[y][x] == (selectedNumber)){
      horRepeat = true
    }
  }
}

function checkVerRepeat(){
  let x = selectedGrid[0]
  verRepeat = false
  for(let y=0;y<9;y++){
    if (grid[y][x] != 0 && (selectedGrid[1] != y) && grid[y][x] == (selectedNumber)){
      verRepeat = true
    }
  }
}

function checkSquareRepeat(){
  let x = Math.floor(selectedGrid[0]/ 3)
  let y = Math.floor(selectedGrid[1]/ 3)

  sqrRepeat = false;
  for (let i=0;i<3;i++){
    for (let j=0;j<3;j++){
      if (grid[3*y+i][3*x+j] != 0 && (selectedGrid[0] != 3*x+j || selectedGrid[1] != 3*y+i) && grid[3*y+i][3*x+j] == (selectedNumber)){
        sqrRepeat = true
      }
    }
  }
}

function checkRepeat(){
  if (startCheck){
 
    checkHorRepeat()
    checkVerRepeat()
    checkSquareRepeat()
    
    if (verRepeat || horRepeat || sqrRepeat){
      console.log({verRepeat, horRepeat, sqrRepeat})
      foundRepeat = true
    }
    else{
      foundRepeat = false;
    }
    startCheck = false;
  }
}