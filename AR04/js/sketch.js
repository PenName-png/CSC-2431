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

  let usedPorts = usedSerialPorts();
if (usedPorts.length > 0) {
  port.open(usedPorts[0], 57600);
}

  seq = new Tone.Sequence(
    function (time, note) {
      bgMusic.triggerAttackRelease(note, 1);
    },
    melody,
    "2n"
  );

  allChangers = new Group(); 


  exportButton = createButton("click to save your masterpiece");
  exportButton.mousePressed(exportCanvas);
  thickSlider = createSlider(1, 5, 2, 1);

  background(255); 
  // makeSprites(); 

  Tone.Transport.bpm.value = 120;
  Tone.Transport.start();

  seq.start();

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

  // if (sw == 1) {
  //   if(joyX < 400){
  //      if(joyY < 400 && joyY >= -400){
  //         currentColor = colors[0];
  //         } else if(joyY >= 50 && joyY < 100){
  //               currentColor = colors[1];    
  //                   }else if(joyY >= 100 && joyY < 150){
  //                   currentColor = colors[2];
  //                   }else if(joyY >= 150 && joyY < 200){
  //                 currentColor = colors[3];  
  //                   }else if(joyY >= 200 && joyY < 250){
  //                   currentColor = colors[4];
  //                   }else if(joyY >= 250 && joyY < 300){
  //                   currentColor = colors[5];
  //                   }else if(joyY >= 300 && joyY < 350){
  //                   currentColor = colors[6];
  //                   }else if(joyY >= 350 && joyY < 400){
  //                   currentColor = colors[7];
  //                   }
                    


  //      }
  //     }       
    
      //  stroke(currentColor);
      //  line(joyX, joyY, circleX, circleY);

      // if(!isInFace) {
      //   fill(currentColor)
      // }
      
      // console.log("selected color is " + currentColor);
      // }
      // else {
      //   fill(currentColor);
      //   noStroke()
      // }

      // let isIntestSprite = false;
      // for(let i=0;i < paintColors.length;i++) {
      //   if(paintColors[i].contains(circleX,circleY)) {
      //     currentColor = paintColors[i].fill;
      //     isInFace = true;
      //   }
      // }
    

      // if(mouseIsPressed) {
      //   if (mouseX >= x && mouseX <= x + size && mouseY >= y && mouseY <= y + size) {
      //    fill(selectedColor);
      //     noStroke();
    
      //    x += mouseX - pmouseX;
      //    y += mouseY - pmouseY;
      // }

      // let pixel = get(circleX, circleY);
      
      // allChangers.forEach((e) => {
      //   if (sw == (1)) {
      //     if (e.pixel) {
      //     // what to do when clicked
      //       currentColor = e.color; // colors change here
      //       testSprite.stroke = currentColor;
      //     }
      //   }
      // });

      // if(!isIntestSprite){
      //   fill(currentColor)
      // }


      // if(port.opened() && frameCount % 3 == 0) {
      //   let pixel = get(circleX, circleY);
      //     if(sw == 1) {
      //         if (pixel) {
      //           get(currentColor);
      //           storeItem(currentColor)
      //           stroke(0);
    
      //               x += joyX;
      //               y += joyY;
      // }
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






// if(sw == 1) {
//   if (circleX >= x && circleX <= x + size && circleY >= y && circleY <= y + size) {
//    fill(selectedColor);
//     noStroke();

//    x += mouseX - pmouseX;
//    y += mouseY - pmouseY;
// }

// let isInFace = false;
// for(let i=0;i < faces.length;i++) {
//   if(faces[i].contains(circleX,circleY)) {
//     selectedColor = faces[i].fill;
//     isInFace = true;
//   }
// }

// if(!isInFace) {
//   fill(selectedColor)
// }

// console.log("selected color is " + selectedColor);
// }
// else {
//   fill(selectedColor);
//   noStroke()
// }
// circle(x,y, size);
// }


//     paint();


//       //  stroke(0);
//       //  line(this.x+20, this.y+50, this.x+80, this.y+50);
//       // fill(currentColor)
//       //  circle(circleX, circleY, 5)

//       //  console.log(joyX, joyY);
      

// }


function paint() {
  push();
  stroke(selectedColor)
  fill(selectedColor);
  circle(circleX, circleY, 5)
  // filt.resonance.value = map(joyX, 600, 0, -600, 1, 1);
  // rev.decay = map(joyY, -100, 0, 100, 5, 1);
  // pop();
}

// function changeBrush() {
//   paintThic = thickSlider.value();
//   strokeWeight(paintThic);
// }

function exportCanvas() {
  let thisImage = saveCanvas(c, "myPainting", "jpg");

  rev.decay.value = 0.5;
  filt.resonance.rampTo(0.5, 1);
  del.delayTime.rampTo(0.5, 1);

  bgMusic.volume.rampTo(-100, 5);
  multiplayer.volume.rampTo(-100, 2);
}

// function makeSprites() {
//   testSprite = new Sprite(width / 2, height / 2, width - 5, height - 5);
//   testSprite.collider = "static";
//   testSprite.color = color(255, 255, 255, 0);
//   testSprite.strokeWeight = 5;
//   testSprite.stroke = color(currentColor);
//   this.x = x;
//   this.y = y;
//   this.fill = fill;

//   for (let i = 0; i < paintColors.length; i++) {
//     push();

//     let changer = new allChangers.Sprite();

    

//     if (i === 13) {
//       changer.diameter = 35;
//       changer.stroke = 0;
//     } else {
//       changer.diameter = 40;
//       changer.stroke = 255;
//     }

    
//     changer.x = palletePos;
//     changer.y = i * 50 + 50;
//     changer.strokeWeight = 2;
//     changer.collider = "static";
//     allChangers[i].color = color(paintColors[i]);
//     pop();

//     // let insideX = x >= this.x && x <= this.x+100;
//     // let insideY = y >= this.y && y <= this.y+100;
//     // return insideX && insideY;
//   }

// }

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
//   let mJoyX = map(joyX, -512, 512, 0, 1, 1);
//   let mJoyY = map(joyY, -512, 512, 0, 1, 1);

//   del.delayTime.rampTo(mJoyY, 3);

//   if (allChangers.mouse.sw == 1) {
//     multiplayer.player("select").start();
//   }



//   if (circleX > 80 && circleY < width - 5) {
//     if (circleY > 5 && circleY < height - 15) {
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

// function mouseReleased() {
//   multiplayer.player("paintFX").stop();
//   multiplayer.player("erase").stop();
//   del.feedback.rampTo(0.9, 3);
// }

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}