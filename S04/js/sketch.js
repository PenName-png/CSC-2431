
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

let currentColor = [0, 0, 0], 
//  paintThic = 2, 
// thickSlider, 
  exportButton, 
// c,
//  allChangers, 
//  palletePos = 40, 
//  testSprite, 
  bgMusic,
  seq,
  multiplayer,
  rev,
  filt,
  del;

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
  c = createCanvas(750, 750);

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
  makeSprites(); 

  Tone.Transport.bpm.value = 120;
  Tone.Transport.start();

  seq.start();
}

function draw() {
  allChangers.forEach((e) => {
    if (e.mouse.pressing()) {
      currentColor = e.color; 
      testSprite.stroke = currentColor;
    }
  });
  if (mouseIsPressed) {
    if (mouseX > 80 && mouseY < height - 15) {
      paint();
    } else if (mouseY > height) {
      changeBrush();
    }
  }
}

function paint() {
  push();
  stroke(currentColor);
  line(pmouseX, pmouseY, mouseX, mouseY);
  filt.resonance.value = map(mouseX, 0, width, 0, 1, 1);
  rev.decay = map(mouseY, 0, height, 0, 5, 1);
  pop();
}

function changeBrush() {
  paintThic = thickSlider.value();
  strokeWeight(paintThic);
}

function exportCanvas() {
  let thisImage = saveCanvas(c, "myPainting", "jpg");

  rev.decay.value = 0.5;
  filt.resonance.rampTo(0.5, 1);
  del.delayTime.rampTo(0.5, 1);

  bgMusic.volume.rampTo(-100, 5);
  multiplayer.volume.rampTo(-100, 2);
}

function makeSprites() {
  testSprite = new Sprite(width / 2, height / 2, width - 5, height - 5);
  testSprite.collider = "static";
  testSprite.color = color(255, 255, 255, 0);
  testSprite.strokeWeight = 5;
  testSprite.stroke = color(currentColor);

  for (let i = 0; i < paintColors.length; i++) {
    push();

    let changer = new allChangers.Sprite();

    if (i === 13) {
      changer.diameter = 35;
      changer.stroke = 0;
    } else {
      changer.diameter = 40;
      changer.stroke = 255;
    }
    changer.x = palletePos;
    changer.y = i * 50 + 50;
    changer.strokeWeight = 2;
    changer.collider = "static";
    allChangers[i].color = color(paintColors[i]);
    pop();
  }
}

function mousePressed() {
  let mMouseX = map(mouseX, 0, width, 0, 1, 1);
  let mMouseY = map(mouseY, 0, height, 0, 1, 1);

  del.delayTime.rampTo(mMouseY, 3);

  if (allChangers.mouse.pressing()) {
    multiplayer.player("select").start();
  }



  if (mouseX > 80 && mouseX < width - 5) {
    if (mouseY > 5 && mouseY < height - 15) {
      if (currentColor === allChangers[13].color) {
        multiplayer.player("erase").volume.value = -12;
        multiplayer.player("erase").loop = true;
        multiplayer.player("erase").start();
        rev.decay.value = 0.5;
        filt.resonance.value.rampTo(0.5, 1);
        del.delayTime.value.rampTo(0.5, 1);
      } else {
        multiplayer.player("paintFX").volume.value = -12;
        multiplayer.player("paintFX").loop = true;
        multiplayer.player("paintFX").start();
      }
    }
  }
}

function mouseReleased() {
  multiplayer.player("paintFX").stop();
  multiplayer.player("erase").stop();
  del.feedback.rampTo(0.9, 3);
}
