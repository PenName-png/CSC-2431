let port;
let joyX = 0; joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 3;
let R;
let B;
let Y;
let selectedColor;
let y;
let x;
const size = 30;
let buttonState;
let colorArr;
let sensors;
let jCursorX, jCursorY;
let portName = 'COM3';
let faces;
let white;
let sequence1, square;



let paintColors = [
  [0, 0, 0], 
  [139, 0, 0],
  [220, 20, 60],
  [255, 140, 0],
  [255, 215, 0],
  [255, 255, 0],
  [154, 205, 50],
  [60, 179, 113],
  [0, 128, 128],
  [70, 130, 180],
  [0, 0, 255], 
  [186, 85, 211], 
  [75, 0, 130], 
  [255, 255, 255], 
];

// let currentColor = [0, 0, 0], 
//   paintThic = 2, 
//   thickSlider, 
//   exportButton, 
//   c,
//   allChangers, 
//   palletePos = 40, 
//   testSprite, 
//   bgMusic,
//   seq,
//   multiplayer,
//   rev,
//   filt,
//   del;

let melody = [["F4#","E4","D4b","B3"],"B3b","2nr","E4b",["B3","D4b","D4","E4"]]

function preload() {
  bgMusic = new Tone.FMSynth().toDestination();
  bgMusic.volume.value = -8; 

  rev = new Tone.Reverb(2).toDestination();
  del = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
  filt = new Tone.FeedbackCombFilter(0.5, 0.5).toDestination();

  multiplayer = new Tone.Players({
    select: "audio/perc_1.mp3",
    paintFX: "audio/painting.mp3",
    erase: "audio/Bubbles.mp3",
  }).fan(rev, del, filt);
}





function setup() {
// c = createCanvas(750, 750);

//  connectButton = createButton("Connect")
//  connectButton.mousePressed(connect);



jCursorX = 50;
jCursorY = windowHeight - 50;


port = createSerial();
createCanvas(800, 800);
circleX = width / 2;
circleY = height / 2;



x = width / 2;
y = height / 2;

connectButton = createButton("Connect");
connectButton.mousePressed(connect);

sequence1 = new Tone.Sequence (function (time,note){
  square.triggerAttackRelease(note, 0.8); 
}, melody, "4n");

Tone.Transport.start(); 
Tone.Transport.bpm.value = 100; 
Tone.Transport.timeSignature = [3,4]; 

seq = new Tone.Sequence(
  function (time, note) {
    bgMusic.triggerAttackRelease(note, 1);
  },
  melody,
  "2n"
);
Tone.Transport.bpm.value = 120;
Tone.Transport.start();

seq.start();

  let usedPorts = usedSerialPorts();
if (usedPorts.length > 0) {
  port.open(usedPorts[0], 57600);
}

  // seq = new Tone.Sequence(
  //   function (time, note) {
  //     bgMusic.triggerAttackRelease(note, 1);
  //   },
  //   melody,
  //   "2n"
  // );

  // allChangers = new Group(); 


  exportButton = createButton("click to save your masterpiece");
  exportButton.mousePressed(exportCanvas);
  thickSlider = createSlider(1, 5, 2, 1);

  background(255); 
  // makeSprites(); 

  // Tone.Transport.bpm.value = 120;
  // Tone.Transport.start();

  // seq.start();


  // frameRate(90);

  port = createSerial();



  selectedColor = color('black');

  faces = [
    new Face(0,0,color('white')),  
    new Face(0,30,color('orange')),
    new Face(0,60,color('#FFFF00')),
    new Face(0,90,color('lime')),
    new Face(0,120,color('cyan')),
    new Face(0,150,color('blue')),
    new Face(0,180,color('magenta')),
    new Face(0,210,color('#89493B')),
    new Face(0,240,color('red')),
    new Face(0,270,color('black')),
    new Face(0,270,color('grey'))];
}

function draw() {

  for(let i=0;i < faces.length;i++) {
    faces[i].draw();

//
  let str = port.readUntil("\n");
  let values = str.split(",");


  if (values.length > 2){
    joyX = values[0];
    joyY = values[1];
    sw = values[2];

    if (joyX > 0){
      circleX += speed;
    } else if (joyX < 0) {
      circleX -=speed;
    }

    if (joyY > 0){
      circleY += speed;
    } else if (joyY < 0) {
      circleY -=speed;
    }
  }

  if(port.opened() && frameCount % 3 == 0) {
    let pixel = get(circleX,circleY);
      let message = `${pixel[0]} ${pixel[1]} ${pixel[2]}\n`;
      port.write(message);}
 }





  let isInFace = false;
  for(let i=0;i < faces.length;i++) {
    if(faces[i].contains(circleX,circleY)) {
      selectedColor = faces[i].fill;
      isInFace = true;
    }
  }

  if(!isInFace) {
    fill(selectedColor)
  }
  else {
    fill(selectedColor);
    noStroke()
  }
  circle(120,20, size);
  

  console.log("selected color is " + selectedColor);

      paint();
}








function paint() {
  push();
  stroke(selectedColor)
  fill(selectedColor);
  circle(circleX, circleY, 5)

  // filt.resonance.value = map(mouseX, 0, width, 0, 1, 1);
  // rev.decay = map(mouseY, 0, height, 0, 5, 1);
  // pop();
}


function exportCanvas() {
  let thisImage = saveCanvas(c, "myPainting", "jpg");

  // rev.decay.value = 0.5;
  // filt.resonance.rampTo(0.5, 1);
  // del.delayTime.rampTo(0.5, 1);

  // bgMusic.volume.rampTo(-100, 5);
  // multiplayer.volume.rampTo(-100, 2);

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
    rect(this.x,this.y,100,40);
    stroke(this.c)
    fill(0);
  }

  contains(x,y) {
    let insideX = x >= this.x && x <= this.x+100;
    let insideY = y >= this.y && y <= this.y+100;
    return insideX && insideY;
  }
}
// function mousePressed() {
//   let mMouseX = map(mouseX, 0, width, 0, 1, 1);
//   let mMouseY = map(mouseY, 0, height, 0, 1, 1);

//   del.delayTime.rampTo(mMouseY, 3);

//   if (allChangers.mouse.pressing()) {
//     multiplayer.player("select").start();
//   }



//   if (mouseX > 80 && mouseX < width - 5) {
//     if (mouseY > 5 && mouseY < height - 15) {
//       if (currentColor === allChangers[13].color) {
//         multiplayer.player("erase").volume.value = -12;
//         multiplayer.player("erase").loop = true;
//         multiplayer.player("erase").start();
//         rev.decay.value = 0.5;
//         filt.resonance.value.rampTo(0.5, 1);
//         del.delayTime.value.rampTo(0.5, 1);
//       } else {
//         multiplayer.player("paintFX").volume.value = -12;
//         multiplayer.player("paintFX").loop = true;
//         multiplayer.player("paintFX").start();
//       }
//     }
//   }
// }

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}