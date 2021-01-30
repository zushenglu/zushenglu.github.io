// Project Title


let cellSideLength;
let ROWS = 9;
let COLS = 9;
let grid = createGrid(ROWS,COLS);
let canvasSide;

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

}

function draw() {
  background(220);
  drawGrid()
}

function createGrid(ROWS,COLS){
  empty = []
  for (let y=0;y<ROWS;y++){
    empty.push([])
    for (let x=0;x<COLS;x++){
      empty[y].push(0)
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
      if (x%3 === 0 && x!=0){
        strokeWeight(10);
        line(x*cellSideLength,0, x*cellSideLength, canvasSide);
      }
      if (grid[y][x] === 0){
        strokeWeight(1)
        fill("white")
      }
      if(grid[y][x] === 1){
        strokeWeight(1)
        fill("grey")
      }
      square(x*cellSideLength,y*cellSideLength,cellSideLength)
    }
  }

}

function mouseClicked(){
  let x = Math.floor(mouseX/cellSideLength)
  let y = Math.floor(mouseY/cellSideLength)

  if (grid[y][x] === 0){
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 1)
    grid[y][x] = 0;
}
