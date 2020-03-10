var guy = [];
var speed = 1;
var score = 0;
var count = 25;
var timer = 3;
var bg;
var screen = 0;

function preload(){
  for(var i = 0; i < count; i++)
  {
    guy[i] = new Walker("roach.png", random(1280), random(480), random([-2,-1,1,2]), 1);
  }
  bg = loadImage("floor.jpg");
}
function setup() {
  createCanvas(1280,480);
  textSize(32);
  imageMode(CENTER);
}



function mouseClicked(){
  // to transition from start screen to play screen
  if (screen == 0)
  {
    screen = 1;
  }

  // if click on Walker
  for (var i = 0; i < count; i++)
  {
    guy[i].kill(mouseX, mouseY);
  }
}

function startScreen(){
  background(100);
  fill(255)
  textAlign(CENTER);
  text('GET READY TO SQUISH BUGS', width / 2, height / 2)
  text('click to start', width / 2, height / 2 + 40);
}

function playScreen(){
  push();
  imageMode(CORNER);
  background(bg);
  pop();

  for(var i = 0; i < count; i++)
  {
    guy[i].draw();
  }
  text("Score: " + score, 70, 30);
  text("Time Left: " + timer, 1180, 30);
  if (timer == 0)
  {
    textSize(50);
    text("GAME OVER", width/2, height/2);
    text("You scored: " + score, width/2, height/2 + 40)
    text("Refresh to play again.", width/2, height/2 + 80);
    undraw();
  }
  if ((frameCount % 60 == 0) && (timer > 0)){
    timer--;
  }
}

function draw(){
  if (screen == 0)
  {
    startScreen();
  }
  else if (screen == 1)
  {
    playScreen();
  }
}


function Walker(imageName, x, y, moving, alive){
  this.spriteSheet = loadImage(imageName);
  this.frame = 0;
  this.x = x;
  this.y = y;
  this.moving = moving;
  this.facing = moving; 
  this.alive = alive;
  // adding moving parameter, and changing this.moving/this.facing from 0 to moving makes sprites auto-move


  this.kill = function(x,y){
    if(this.x-30<x && x < this.x+30 && this.y-30<y && y<this.y+30){
      this.moving = 0;  
      if (this.alive == 1)
        speed = speed + .3;
        score = score + 1;
        this.alive = 0;
    }
  }


  this.draw = function(){
    push();
    translate(this.x,this.y);
    if (this.facing == 2)
    {
      scale(1.0, -1.0);
    }
    if (this.facing == -1)
    {
      rotate(-PI/2);
    }
    if (this.facing == 1)
    {
      rotate(PI/2);   
    }
  
    if (this.moving == 0) {
      image(this.spriteSheet, 0,0,80,80,240,0,80,80);
    }
    else {
      if (this.frame == 0){
        image(this.spriteSheet, 0,0, 80,80, 80,0,80,80);
      }
      if (this.frame == 1){
        image(this.spriteSheet, 0,0, 80,80, 0,0,80,80);
      }
      if (this.frame == 2){
        image(this.spriteSheet, 0,0, 80,80, 160,0,80,80);
      }
    
      // slows down to every 5 frames
      if(frameCount % 5 == 0){
        this.frame = (this.frame+1)%3; // keeps the loop of 0-1
        if (this.moving == -1 || this.moving == 1){
          this.x = this.x+speed*(this.moving*6); // moving the guy, it's in the loop to prevent "sliding"
        }
        if (this.moving == -2 || this.moving == 2){
          this.y = this.y+speed*(this.moving*3);
        }
        


        if(this.x < 30){
          this.moving = 1;
          this.facing = 1;
        }
        if(this.x > width-30){
          this.moving = -1;
          this.facing = -1;
        }
        if(this.y < 30){
          this.moving = 2;
          this.facing = 2;
        }
        if (this.y > height-30){
          this.moving = -2;
          this.facing = -2;
        }
      }
    }
    pop();
  }
}