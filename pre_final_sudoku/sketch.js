// Project Title

let theGrid = [[4,1,0,0,6,0,0,7,8],
[7,0,3,5,0,1,4,2,0],
[0,0,8,4,7,3,0,6,0],
[0,5,0,0,9,4,8,3,0],
[3,9,0,0,1,0,7,0,0],
[2,8,4,3,0,0,0,0,0],
[6,0,0,0,0,0,0,8,0],
[0,0,1,9,4,0,0,0,0],
[0,4,9,0,2,8,0,0,0]];
let sideLength;

function setup() {
  if (windowWidth > windowHeight){
    createCanvas(windowHeight, windowHeight);
    sideLength = windowHeight/9;
  }
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
    sideLength = windowWidth/9;
  }
}

function draw() {
  background(220);
  drawGrid();
  drawLine();
}

function drawGrid(){
  for (let y = 0; y<9; y++){  
    for (let x = 0; x<9; x++){
      // draw square for each cell
      fill('white');
      square(x*sideLength,y*sideLength,sideLength);
    }
  }
}


function drawLine(){
  for (let y = 0; y<9; y++){
    for (let x = 0; x<9; x++){
      if(x%3 === 0 && x !== 0){
        strokeWeight(20)
        line(x,0,x,sideLength*9)
        strokeWeight(1)
      }
    }
  }
}