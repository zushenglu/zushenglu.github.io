// object oriented project

let walkers = [];
let collours = ["red","yellow","orange","grey","purple"];

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0);
}

function draw() {
  for (let i = 0; i <walkers.length;i++){
    walkers[i].display();
    walkers[i].move();
  }
}

function mousePressed(){
  let someWaker = new walker(mouseX,mouseY, random(collours));
  walkers.push(someWaker);
}

class walker{ // everything in a class is a function
  constructor(x,y,theColor){
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 5;
  }

  display(){
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 10, 10);
  }

  move(){

    let choice = random(100);
    if (choice < 25){
      this.x += this.speed;
    }
    else if (choice < 50){
      this.x -= this.speed;
    }
    else if (choice <75){
      this.y += this.speed;
    }
    else{
      this.y -= this.speed;
    }
  }
}