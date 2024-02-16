let sprite;
let blue;

function setup() {
  createCanvas(400, 400);
  sprite = new sprite(200,200);
  sprite.color = 'blue';
}

function draw() {
  background(220);
  sprite.rotation++;
}
