let x, y;

let cyberPiano;
let storyPiano;
let scarletPiano;

function preload(){
  cyberPiano = loadSound('media/acybersworld.mp3');
  storyPiano = loadSound('media/beforethestory.mp3');
  scarletPiano = loadSound('media/scarletforest.mp3');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  x = width * 0.2;
  y = height * 0.8;
}

function draw(){
  let gp = navigator.getGamepads()[0];
  
  if(!gp){
    background(0);
    fill(255);
    noStroke();
    textSize(24);
    text("Connect a gamepad and press any button", width/2, height/2);
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
  
  let deadzone = 0.15;
  let dx = abs(gp.axes[0]) > deadzone ? gp.axes[0] : 0;
  let dy = abs(gp.axes[1]) > deadzone ? gp.axes[1] : 0;
  
  let speed = 5;
  x += dx * speed;
  y += dy * speed;
  
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);
  
  push();
  translate(x, y);
  rotate(60);
  fill(170, 250, 225);
  star(0, 0, 15, 35, 5);
  pop();
  
}

// https://editor.p5js.org/p5/sketches/Form:_Star
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
  fill(255, 255, 255);
  push();
  translate(width * 0.2, height * 0.3);
  star(0, 0, 8, 15, 8);
  pop();
  push();
  translate(width * 0.3, height * 0.4);
  star(0, 0, 8, 15, 8);
  pop();
}