function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);

  fill('white')
  noStroke();
  square (0,0,225)

  c= color(255,0,0,90)
  fill(c);
  noStroke();
  circle(115,60,100);

  c= color(0,0,255,90)
  fill(c);
  noStroke();
  circle(75,125,100);

  c= color(0,255,0,90)
  fill(c);
  noStroke();
  circle(150,125,100);
 


  b= color(150,150,255)
  noStroke()
  fill(b)
  square(0,280,317.5)

  fill('green')
  stroke(0)
  strokeWeight(5)
  circle(150,440,275)

  fill('red')
  stroke(0)
  strokeWeight(5)
  beginShape();
  vertex(150,300)
  vertex(115,390)
  vertex(20,390)
  vertex(90,450)
  vertex(42.5,535)
  vertex(150,480)
  vertex(252.5,535)
  vertex(210,450)
  vertex(280,390)
  vertex(185,390)
  vertex(150,300)
  endShape(close)


  noStroke()
  fill('yellow')
  //nofill();
  arc(375,400,125,125,255,210);

  noStroke()
  fill('red')
  beginShape();
  arc(525,390,100,100,PI,0);
  rect(475,390,100,75);
  endShape();

  noStroke()
  fill('white')
  circle(502,390,32)

  noStroke()
  fill('blue')
  circle(502,390,20)

  noStroke()
  fill('white')
  circle(547,390,32)

  noStroke()
  fill('blue')
  circle(547,390,20)

  noStroke();
  t= color(55,225,55)
  fill(t);
  rect(400,75,140,70)

  stroke(0)
  strokeWeight(1)
  fill('white')
  circle(440,110,51)

  stroke(0)
  fill('white')
  square(478,85,50)










}
