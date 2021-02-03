// ball

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  // checking every elements in the array
  // two iteration for different purposes
  for (let i=0;i<ballArray.length;i++){

    // collesion check
    for (let j=0; j < ballArray.length; j++){
      if (i !== j){
        // dont check self for collision
        ballArray[i].checkIfcolliding(ballArray[j]);
      }
    }
    ballArray[i].display();
    ballArray[i].move();
  }
}

function mousePressed(){
  // create the ball using class and pushit into the array
  let ball = new Ball(mouseX,mouseY,random(10,40));
  ballArray.push(ball);
}

class Ball{
  constructor(x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.someColor = color(random(0,255),random(0,255),random(0,255),random(0,255));
    
  }

  display(){
    fill(this.someColor);
    noStroke();
    ellipse(this.x,this.y,this.radius*2,this.radius*2);
  }

  move(){
    this.x += this.dx;
    this.y += this.dy;

    // bounce on the ball
    
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.dx *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.dy *= -1;
    }
  }

  checkIfcolliding(anotherBall){
    let sumOfRadi = this.radius + anotherBall.radius;
    let distanceBetweenCenter = dist(this.x,this.y,anotherBall.x,anotherBall.y);
    if (sumOfRadi > distanceBetweenCenter){

      console.log(anotherBall.dx,anotherBall.dy);
      // bouce off:
      let tempDx = this.dx;
      let tempDy = this.dy;
      this.dx = anotherBall.dx;
      this.dy = anotherBall.dy;
      anotherBall.dx = tempDx;
      anotherBall.dy = tempDy;
    }

  }
}
