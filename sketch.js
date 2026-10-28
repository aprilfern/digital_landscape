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

let starRotate = false;

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

let randomStars = [];

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
  
  // Coordinates of random stars
  randomStars = [
    {x: width * 0.2, y: height * 0.23},
    {x: width * 0.2, y: height * 0.33},
    {x: width * 0.25, y: height * 0.15},
    {x: width * 0.65, y: height * 0.65},
    {x: width * 0.05, y: height * 0.15},
    {x: width * 0.75, y: height * 0.1},
    {x: width * 0.5, y: height * 0.27},
    {x: width * 0.45, y: height * 0.33},
    {x: width * 0.23, y: height * 0.63},
    {x: width * 0.62, y: height * 0.43},
    {x: width * 0.72, y: height * 0.51},
    {x: width * 0.35, y: height * 0.39},
    {x: width * 0.52, y: height * 0.03},
    {x: width * 0.41, y: height * 0.14},
    {x: width * 0.15, y: height * 0.45},
    {x: width * 0.09, y: height * 0.32},
    {x: width * 0.11, y: height * 0.54},
    {x: width * 0.35, y: height * 0.55},
    {x: width * 0.48, y: height * 0.51},
    {x: width * 0.61, y: height * 0.58},
    {x: width * 0.78, y: height * 0.21},
    {x: width * 0.58, y: height * 0.19},
    {x: width * 0.65, y: height * 0.29},
    {x: width * 0.25, y: height * 0.04},
    {x: width * 0.91, y: height * 0.49},
    {x: width * 0.88, y: height * 0.14},
    {x: width * 0.89, y: height * 0.28},
    {x: width * 0.88, y: height * 0.77},
    {x: width * 0.09, y: height * 0.88},
    {x: width * 0.63, y: height * 0.74},
    {x: width * 0.39, y: height * 0.76},
    {x: width * 0.49, y: height * 0.66},
    {x: width * 0.12, y: height * 0.68},
    {x: width * 0.29, y: height * 0.91},
    {x: width * 0.75, y: height * 0.94},
    {x: width * 0.51, y: height * 0.89},
    {x: width * 0.85, y: height * 0.64},
  ];
  
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
    stroke(lerpColor(color(11, 11, 77), color(79, 16, 125), a));
    line(0, canvasY, width, canvasY);
  }
  
  // Music Stars
  // First Star
  fill(255, 255, 255);
  push();
  noStroke();
  translate(starOneX, starOneY);
  if(starRotate){
    rotate(frameCount * 0.05);
  }
  star(0, 0, 10, 20, 8);
  pop();
  
  // Second Star
  push();
  noStroke();
  translate(starTwoX, starTwoY);
  if(starRotate){
    rotate(frameCount * 0.05);
  }
  star(0, 0, 10, 20, 8);
  pop();
  
  // Third Star
  push();
  noStroke();
  translate(starThreeX, starThreeY);
  if(starRotate){
    rotate(frameCount * 0.05);
  }
  star(0, 0, 10, 20, 8);
  pop();
  
  fillSky();
  
  // Checks if boolean was changed when button was pressed
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
  
  // Left Joystick
  let deadzone = 0.15;
  let dx = abs(gp.axes[0]) > deadzone ? gp.axes[0] : 0;
  let dy = abs(gp.axes[1]) > deadzone ? gp.axes[1] : 0;
  
  let speed = 5;
  x += dx * speed;
  y += dy * speed;
  
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);
  
  handleButtons(gp);
  
  // Main green star that moves
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
          // Gets the distance of the main green star to each of the big three music stars
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
          break;
        // Button 3 also known as X
        case 3:
          if(starRotate){
            starRotate = false;
          }
          else{
            starRotate = true;
          }
          break;
      }
    }
    
    previousButtons[index] = currentlyPressed;
  });
}

// Creates star
// https://editor.p5js.org/p5/sketches/Form:_Star
function star(x, y, radius1, radius2, npoints) {
  // Divides the circle into the number of points on the star
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  
  // p5.js function to create custom shape
  beginShape();
  // Loops around the circle to create the points of the star
  for (let a = 0; a < TWO_PI; a += angle) {
    // Calculates the point of the star
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    // Adds the point to the shape
    vertex(sx, sy);
    // Calculates the dip between two points of a star
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    // Adds the dip to the shape
    vertex(sx, sy);
  }
  // Ends the drawing of the custom shape
  endShape(CLOSE);
}

function fillSky(){
  // Colors the random stars being put in the background
  fill(starColor[colorIndex]);
  
  // Gets the random stars and places them in the background
  for(let i = 0; i < randomStars.length; i++){
    let s = randomStars[i];
    push();
    noStroke();
    translate(s.x, s.y);
    star(0, 0, 5, 8, 8);
    pop();
  }
}
