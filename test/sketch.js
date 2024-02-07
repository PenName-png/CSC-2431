let x;
let y;
const size = 30;
let dragging = false;
let selectedColor;
let faces;
let white;


function setup() {
  createCanvas(600, 600);
  selectedColor = color('white');
  x = width / 2;
  y = height / 2;

  faces = [
    new Face(0,0,color('red')),  
    new Face(0,30,color('orange')),
    new Face(0,60,color('#FFFF00')),
    new Face(0,90,color('lime')),
    new Face(0,120,color('cyan')),
    new Face(0,150,color('blue')),
    new Face(0,180,color('magenta')),
    new Face(0,210,color('#89493B')),
    new Face(0,240,color('white')),
    new Face(0,270,color('black'))];
}

function draw() {
  //background(255);

  for(let i=0;i < faces.length;i++) {
    faces[i].draw();
  }






  if(mouseIsPressed) {
    if (mouseX >= x && mouseX <= x + size && mouseY >= y && mouseY <= y + size) {
     fill(selectedColor);
      noStroke();

     x += mouseX - pmouseX;
     y += mouseY - pmouseY;
  }

  let isInFace = false;
  for(let i=0;i < faces.length;i++) {
    if(faces[i].contains(mouseX,mouseY)) {
      selectedColor = faces[i].fill;
      isInFace = true;
    }
  }

  if(!isInFace) {
    fill(selectedColor)
  }
  
  console.log("selected color is " + selectedColor);
  }
  else {
    fill(selectedColor);
    noStroke()
  }
circle(x,y, size);
}
class Face {
  constructor(x,y, fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }

  c = color('#FFFFFF')

  draw() {
    fill(this.fill);
    square(this.x,this.y,30);
    stroke(this.c)
    fill(0);
  }

  contains(x,y) {
    let insideX = x >= this.x && x <= this.x+100;
    let insideY = y >= this.y && y <= this.y+100;
    return insideX && insideY;
  }
}


function mouseReleased() {
  dragging = false;

  if (mouseX >= x && mouseX <= x + size && mouseY >= y && mouseY <= y + size) {
    fill(selectedColor);
    noStroke();
  }

}

function mouseDragged() {
  console.log(dragging);
  if (dragging) {
    x += mouseX - pmouseX;
    y += mouseY - pmouseY;
    console.log(x);
  }
}