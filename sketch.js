let x, y;
let px, py;

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  x = width/2;
  y = height/2;
  px = x;
  py = y;
}

function draw(){
  let gp = navigator.getGamepads()[0];
  
  // Makes background into night sky dark blue to dark purple
  // https://p5js.org/tutorials/color-gradients/
  for(let y = 0; y < height; y++){
    let a = map(y, 0, height, 0, 1);
    stroke(lerpColor(color(17, 3, 79), color(48, 3, 79), a));
    line(0, y, width, y);
  }
  
  push();
  translate(width * 0.3, height * 0.8);
  rotate(60);
  star(0, 0, 30, 70, 5);
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