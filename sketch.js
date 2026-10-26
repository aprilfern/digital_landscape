let x, y;

let cyberPiano;
let storyPiano;
let scarletPiano;

// Three music stars
let starOneX;
let starOneY;
let starTwoX;
let starTwoY;
let starThreeX;
let starThreeY;

let musicPlaying = false;

// Shooting Star
let shootX = 0;
let shootY = 0;
let shootSpeed = 10;
let starFalling = false;

// Different colors for the background stars
let starColor = [
  [255, 255, 255], // White
  [199, 252, 199], // Light Green
  [199, 252, 233], // Mint
  [199, 248, 252], // Light Blue
  [199, 214, 252], // Baby Blue
  [223, 199, 252], // Light Purple
  [252, 199, 248], // Light Pink
  [252, 199, 208] // Light Red
];

let colorIndex = 0;

let previousButtons = [];

function preload(){
  cyberPiano = loadSound('media/acybersworld.mp3');
  storyPiano = loadSound('media/beforethestory.mp3');
  scarletPiano = loadSound('media/scarletforest.mp3');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  x = width * 0.2;
  y = height * 0.8;
  
  // Coordinates of each music star
  starOneX = width * 0.2;
  starOneY = height * 0.4;
  starTwoX = width * 0.5;
  starTwoY = height * 0.4;
  starThreeX = width * 0.8;
  starThreeY = height * 0.4;
  
  textAlign(CENTER, CENTER);
}

function draw(){
  let gp = navigator.getGamepads()[0];
  
  if(!gp){
    background(0);
    fill(255);
    noStroke();
    textSize(24);
    text("Press any button to start", width/2, height/2);
    return;
  }
  
  // Makes background into night sky dark blue to dark purple
  // https://p5js.org/tutorials/color-gradients/
  for(let canvasY = 0; canvasY < height; canvasY++){
    let a = map(canvasY, 0, height, 0, 1);
    stroke(lerpColor(color(17, 3, 79), color(48, 3, 79), a));
    line(0, canvasY, width, canvasY);
  }
  
  fillSky();
  
  if(starFalling){
    shootY += shootSpeed;
    
    push();
    noStroke();
    fill(235, 176, 176);
    translate(shootX, shootY);
    star(0, 0, 4, 8, 8);
    pop();
    
    if(shootY > height){
      starFalling = false;
    }
  }
  
  let deadzone = 0.15;
  let dx = abs(gp.axes[0]) > deadzone ? gp.axes[0] : 0;
  let dy = abs(gp.axes[1]) > deadzone ? gp.axes[1] : 0;
  
  let speed = 5;
  x += dx * speed;
  y += dy * speed;
  
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);
  
  handleButtons(gp);
  
  push();
  translate(x, y);
  noStroke();
  rotate(60);
  fill(170, 250, 225);
  star(0, 0, 15, 35, 5);
  pop();
  
}

function handleButtons(gp){
  gp.buttons.forEach((button, index) => {
    let currentlyPressed = button.pressed;
    let previouslyPressed = previousButtons[index] || false;
    
    if(currentlyPressed && !previouslyPressed){
      switch(index){
        // Button 0 or also known as B
        case 0:
          shootX = random(width);
          shootY = 0;
          starFalling = true;
          break;
        // Button 1 or also know as A
        case 1:
          let d1 = dist(x, y, starOneX, starOneY);
          let d2 = dist(x, y, starTwoX, starTwoY);
          let d3 = dist(x, y, starThreeX, starThreeY);
          
          if(d1 < 20){
            if(musicPlaying){
              cyberPiano.stop();
              storyPiano.stop();
              scarletPiano.stop();
              musicPlaying = false;
            }
            else{
              cyberPiano.play();
              musicPlaying = true;
            }
          }
          else if(d2 < 20){
            if(musicPlaying){
              cyberPiano.stop();
              storyPiano.stop();
              scarletPiano.stop();
              musicPlaying = false;
            }
            else{
              storyPiano.play();
              musicPlaying = true;
            }
          }
          else if(d3 < 20){
            if(musicPlaying){
              cyberPiano.stop();
              storyPiano.stop();
              scarletPiano.stop();
              musicPlaying = false;
            }
            else{
              scarletPiano.play();
              musicPlaying = true;
            }
          }
          break;
        // Button 2 also known as Y
        case 2:
          if(colorIndex >= 7){
            colorIndex = 0;
          }
          else{
            colorIndex++;
          }
      }
    }
    
    previousButtons[index] = currentlyPressed;
  });
}

// https://editor.p5js.org/p5/sketches/Form:_Star
// Creates star
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function fillSky(){
  // Music Stars
  fill(255, 255, 255);
  push();
  noStroke();
  translate(starOneX, starOneY);
  star(0, 0, 10, 20, 8);
  pop();
  push();
  noStroke();
  translate(starTwoX, starTwoY);
  star(0, 0, 10, 20, 8);
  pop();
  push();
  noStroke();
  translate(starThreeX, starThreeY);
  star(0, 0, 10, 20, 8);
  pop();
  
  // Random Stars
  push();
  noStroke();
  fill(starColor[colorIndex]);
  translate(width * 0.2, height * 0.23);
  star(0, 0, 5, 8, 8);
  pop();
  push();
  noStroke();
  fill(starColor[colorIndex]);
  translate(width * 0.2, height * 0.33);
  star(0, 0, 5, 8, 8);
  pop();
  push();
  noStroke();
  fill(starColor[colorIndex]);
  translate(width * 0.25, height * 0.15);
  star(0, 0, 5, 8, 8);
  pop();
  
  
}
