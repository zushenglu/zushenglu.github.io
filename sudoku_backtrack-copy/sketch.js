// Project Title



let grid1 = [[4,1,0,0,6,0,0,7,8],
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

let gridToFill = false;
let end;

function setup() {

  // makes the grid1 the biggest square of the screen
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

  // draw grid1, show number within the array, and check if the game
  // game is completed
  drawGrid();
  displayNumber();
  checkFinish();
}



function checkFinish(){

  // check if the the grid1 value is equal to the answer
  finish = true;
  for (let y=0;y<9;y++){
    for (let x=0; x<9; x++){

      if (grid1[y][x] != answerGrid[y][x]){
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

      // draw base grid1
      fill("white");
      strokeWeight(1);
      square(x*cellSideLength,y*cellSideLength,cellSideLength);
 
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

      // puts numbers in grid1 onto the screen, 0 excluded
      if (grid1[y][x] !== 0){
        fill("black");
        textSize(cellSideLength*0.9);
        text(grid1[y][x],x*cellSideLength+cellSideLength/2,y*cellSideLength + cellSideLength*7/8);
      }
    }
  }
}

function startMachine(){
  end = false
  backtrack(0,0,grid1);
}

function backtrack(row,colume,map){
    
  // if number here, skip
  if (0 != map[row][colume]){
      
      // if at the right bot corner, return map
      if (colume == map.length - 1 && row == map.length -1){
         end = true
         return grid_9x9
      }
      // if at the end of row, go to next row
      else if (colume == map.length -1){
          colume = 0
          backtrack(row + 1, 0,map)
      }
      // if not at the end of row, go to next colume
      else{
          backtrack(row,colume+1,map)
      }
    }
  // if this place is zero, input a number
  else if (map[row][colume] == 0){
      
//       this place inserts the number
      for (let num = 1; num < 10; num ++){
          
          if (end == true){
              return grid_9x9
          }
          else{
        
              map[row][colume] = num
              console.log(map)
              // if no repeat: go to next map
              if (findRepeat(num,map,row,colume) == false){
                  
                  // if not at last map of row, go to next
                  if (colume < map[row].length-1){
                      backtrack(row,colume+1,map)
                  }
                  
                  // if at right bot corner, return map
                  else if (colume == map[row].length-1){
                      if (row == map.length-1){
                          end = true
                          return map
                      }
                  
                  // if at last map of row, go to next row
                      backtrack(row+1,0,map)
                    }
                      
              // testing code to fix the problem
              if (!end){
                  map[row][colume] = 0
              }
            }
          }
        }
      }
}

function findRepeat(num,map,row,colume){
  for (let colindex = 0; colindex<9;colindex++){
    if (colindex != colume){
        if (num == map[row][colindex]){
            map[row][colume] = 0
            return true
        }
    }
  }
  for (let rowindex=0; rowindex < 9; rowindex++){
    if  (rowindex != row){
        if (num == map[rowindex][colume]){
            map[row][colume] = 0
            return true
        }
    }
  }  

  x = Math.floor(colume/3)
  y = Math.floor(row/3)

  for (let rowindex=0;rowindex<9;rowindex++){
    for (let colindex=0;colindex<9;colindex++){
        if (colindex + 3*x != colume && rowindex + 3*y != row){
            if (map[rowindex + 3*y][colindex  + 3*x] == num){
                map[row][colume] = 0
                return true
            }
        }
    }
  }
}

function keyTyped(){

  // if s is pressed, trigger the thing
  if (key === "s"){
    startMachine();
  }
}