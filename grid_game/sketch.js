// 6x6 sudoku
// row rule: having checking if the input value is apart of the role set
// colume rule: having a set containing all the numbers in that colome
// mini grid rule: having a set containing all the numbers in that grid

let grid = [[0,8,0,0,0,0,2,0,0,],
            [0,0,0,0,8,4,0,9,0,],
            [0,0,6,3,2,0,0,1,0,],
            [0,9,7,0,0,0,0,8,0,],
            [8,0,0,9,0,3,0,0,2,],
            [0,1,0,0,0,0,9,5,0,],
            [0,7,0,0,4,5,8,0,0,],
            [0,3,0,7,1,0,0,0,0,],
            [0,0,8,0,0,0,0,4,0]]; //createBoard();

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayGrid();
}

function createBoard(){
  let structure = [];
  for (let y = 0; y < 10; y++){
    structure.push([]);
    for (let x = 0; x < 10; x++){
      structure[y].push([0]);
    }
  }
  return structure;
}

function displayGrid(){
  for (let y = 0; y < 10; y++){
    for (let x = 0; x < 10; x++){
      rect(x*width/9,y*height/9, width/9, height/9);
    }
  }
}

function rowRule(){

}

function collectRow(){
  let masterRowLists = [];

  for (let y = 0; y<10; y++){
    let rowList = [];
    for (let x = 0; x<10; x++){
      rowList[y].push(grid[y][x]);
    }
  }
}

function mousePressed(){
  console.log(grid);
}