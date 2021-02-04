// Bubble OOP Demo

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  window.setInterval(spawnBubble,500); // runs the function- spawn bubble every half a second (500)
}

function draw() {
  background(220);
  
  for (let i=theBubbles.length-1; i>=0; i--){
    if (theBubbles[i].isPopped){
      theBubbles.splice(i,1);
    }
    else{
      theBubbles[i].move();
      theBubbles[i].display();
    }

  }
}

function spawnBubble() {
  let someBubble = new Bubble();
  theBubbles.push(someBubble);
}

class Bubble {
  constructor() {
    this.x = random(width);
    this.y = height + 100;
    this.dx = 0;
    this.dy = -3;
    this.radius = random(20,40);
    this.theta = 0;
    this.isAlive = true;
    this.whenIDied = 0;
    this.waitTime = 1000;
    this.isPopped = false;
  }

  move(){

    // stop when at the top
    if (this.y - this.radius >= 2){
      // basic movement
      this.x += this.dx;
      this.y += this.dy;

      // randomly move left/right
      this.dx = map(noise(this.theta),0,1,-5,5); // map() take number between 0 and 1, turn them into 5 or -5)
      this.theta += 0.02;
    }
    // when it his the top
    else if (this.isAlive){
      this.isAlive = false;                 
      this.whenIDied = millis();
    }
    else{
      if (millis() > this.whenIDied + this.waitTime){
        this.isPopped = true;
      }
    }
  }

  display() {
    if (!this.isPopped){
      noStroke();
      fill(random(255),random(255),random(255),random(255));
      circle(this.x,this.y,this.radius*2);
    } 
  }
}