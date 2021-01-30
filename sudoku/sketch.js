// Project Title


let cellSideLength;
let ROWS = 9;
let COLS = 9;
let grid = createGrid(ROWS,COLS);
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
    textAlign(CENTER);
  }

  selectedGrid = [0,0]

}

function draw() {
  background('green');
  drawGrid();
  displayNumber();
  checkVerRepeat()
}

function checkVerRepeat(){
  keyEntered = key;
  let y = selectedGrid[1]
  rowNumbers = new Set(grid[y])

  if (rowNumbers.has(keyEntered.toString())){
    foundRepeat = true
  }
  else{
    foundRepeat = false;
  }
}

// for somereason 0 is printable instead of 9. cancelled out the function for now
function keyTyped(){
  if (ischosen){

    let y = selectedGrid[1]
    rowNumbers = new Set(grid[y])

    if (rowNumbers.has(keyEntered.toString())){ // if the number already exist in such row
      foundRepeat = true  // trigger repeat
     }
     else{
        foundRepeat = false;
      }

//    if (key in numberSet){
    grid[selectedGrid[1]][selectedGrid[0]] = key 
//    }
    keyEntered = key;



  }
}

function displayNumber(){
  for (let y=0;y<ROWS;y++){
    for (let x=0;x<COLS;x++){
      fill("black")
      textSize(cellSideLength*.9)
      text(grid[y][x],x*cellSideLength + cellSideLength*.2,y*cellSideLength +cellSideLength*.05,(x+1)*cellSideLength,(y+1)*cellSideLength)
    }
  }
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

function mouseClicked(){

  let x = Math.floor(mouseX/cellSideLength)
  let y = Math.floor(mouseY/cellSideLength)
  
  selectedGrid[0] = x;
  selectedGrid[1] = y;

  if (x === lastgrid[0] && y === lastgrid[1]){
    selectedGrid[2] = 0;
    ischosen = !ischosen
  }
  else{
    ischosen = true
  }

  lastgrid[0] = x
  lastgrid[1] = y
}


