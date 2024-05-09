let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let port;
let joyX = 0, joyY = 0, joyB =0, sw = 0, ps = 0;
let connectButton;
let circleX, circleY, circleB;
let speed = 3;
let R;
let B;
let Y;
let selectedColor;
let k;
let r;
let start;
let first;
let second;
let third;
let win;
let lv;
var POO;
var DO;
var PEE;
var c;
var PISS;
let sum;
let bum;
let gameTime;
var  timerIsDone;
var  playTime;
let rando = false;
var b;
let BINGO;
let imgArr = [];
let numimgArr = 5; 
// var testVariable = 10 or ;
// var oldVar = testVariable;
let randoImg1;
let score = 0;
let timeRemaining = 15;
let gameOver = false;
let success, fail, normal;
// let lastAttempt;
const canvasWidth = 720, canvasHeight = 480;
let gameState = 1;
let bath = false;
let shower = false;
console.log(sw, ps)
let DM;
let melody =    ['D4', 'E4', 'G4', 'E4', 'B4', 'B4', 'A4'];
let sequence1, square;
let buh;
let bob;
let txt1;
let txt2;
let txt3;
let txt4;









// Load the image.
function preload() {
  bgMusic = new Tone.FMSynth().toDestination();
  bgMusic.volume.value = -8; 

  rev = new Tone.Reverb(2).toDestination();
  del = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
  filt = new Tone.FeedbackCombFilter(0.5, 0.5).toDestination();

  multiplayer = new Tone.Players({
    paintFX: "audio/painting.mp3",
  }).fan(rev, del, filt);

  img1 = loadImage('assets/Alien.JPG');
  img2 = loadImage('assets/Bible.JPG');
  img3 = loadImage('assets/Cat.JPG');
  img4 = loadImage('assets/Spirit.JPG');
  img5 = loadImage('assets/Nuka.JPG');
  img6 = loadImage('assets/Player_Chr.JPG')
  img7 = loadImage('assets/DungeonMaster.JPG');

}

function setup() {

  square = new Tone.Synth({
    oscillator: {
      type: "square"
    },
    envelope : {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1
    }
  }).toDestination();
  
  createCanvas(canvasWidth, canvasHeight);  

  sequence1 = new Tone.Sequence (function (time,note){
    square.triggerAttackRelease(note, 0.8); 
  }, melody, "4n");
  
  Tone.Transport.start(); 
  Tone.Transport.bpm.value = 100; 
  Tone.Transport.timeSignature = [3,4]; 

  // frameRate(90);

  port = createSerial();

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




  success = color(0, 255, 0);
  fail = color(255, 0, 0);
  normal = color(255, 0, 0);
  lastAttempt = normal; 




  circleX = width / 2;
  circleY = height /2;
  circleB = k

  connectButton = createButton("Connect")
  connectButton.mousePressed(connect);

    let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
  port.open(usedPorts[0], 57600);
  }



  filterModes = [ 
    BLUR,
    GRAY, 
    OPAQUE, 
    INVERT, 
    POSTERIZE, 
    BLUR, 
    ERODE, 
    DILATE, 
    BLUR, 
    THRESHOLD 
  ]; 

  index = 0; 
  currFilterMode = filterModes[index]; 
  // arr()

  bath = boolean(sw)

  shower = boolean(ps)



  imgArr = [img1, img2, img3, img4, img5];
  DM = [img7];
  randos()
  
}

function draw() { 

  background(lastAttempt);
  // game.update();

  // noStroke();
  // fill('purple');
  // rect(0,0,width/2,height);
  // fill('gold');
  // rect(width/2,0,width/2,height);
  
  let str = port.readUntil("\n");
  let values = str.split(",")
  if (values.length > 3){
    joyX = values[0];
    joyY = values[1];
    joyB = values[2]
    sw = values[3];
    ps = values[4];

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

    if (joyB > 0){
      circleB += speed;
    } else if (joyY < 0) {
      circleB -=speed;
    }
  }







// gamestatus()

  sum = subNum(POO, bob);

  bum = pow(sum, 2)


//  if(gameOver) {
//   gameDone();
// } else {
//   playing();
// }
if(gameState === 1){
  //place all of the code you want to have happen for each state in its specefic section of the if else if.
  intro();
    if (mouseIsPressed) {
      gameState = 2;
    }
}
if (gameState === 2) {
  playing();

} 
if (gameState === 3) {
  gameDone();

  if(keyIsPressed && keyCode(32)){
  gamestate = 1
  }

}




// prnt()

console.log(gameState)

}


function intro(){
  image(img7, 0, 0);
  textSize(40);
  buh = color('black')
  fill(buh)
  fill(0, 0, 255);
  text ("YOU!", 5, 350);
  text ("our focus puller just quit", 35, 400);
  text ("if you're good, you can have the job", 85, 450);


  if(port.opened() && frameCount % 3 == 0) {
    let pixel = get(circleX,circleY);
      let message = `${pixel[0]} ${pixel[1]} ${pixel[2]}\n`;
      port.write(message);}
  
      noStroke();
      noFill();
      circle(circleX, circleY, 5)

 
}

function playing() {
  bob = map(joyB, 0, 671, 0, 5)

  image(randoImg1, 0, 0);
  textSize(40);
  fill(0, 0, 255);

  filter(BLUR, bum); 

 console.log(bum)


  text("Time: " + ceil(timeRemaining), width-150,20);

  timeRemaining -= deltaTime / 1000;
  if (timeRemaining < 0) {
    lastAttempt = normal;
    gameOver = true;


}

if (gameOver === true){
  gameState = 3;
  }

}

// function gamestatus(){

//   if (sw == 0){
//     gamestate == 0
//   }
//   else if (sw == 1){
//     //if we are playing, then we win
//     gameState == 1
//   }
//   else if (timeRemaining > 0 && bum > 1){
//     //if we are playing, then we lose
//     if (gameState == 1){
//       gameState = 3;
//     }
//   }

// }

function gameDone() {
  // image(randoImg1, 0, 0);
  noStroke();
  fill (lastAttempt);
  rect(0,0,width,height);
  buh = color('black')
  fill(buh)
  text("Time's Up!", 100,100);
  // print(txt1, txt2)
  text (txt1, 50, 150);
  text (txt2, 50, 200);
  text (txt3, 50, 250);
  text (txt4, 50, 300);


  // text("Press Space to Play Again.", 100, 200);

  if(port.opened() && frameCount % 3 == 0) {
  let pixel = get(circleX,circleY);
    let message = `${pixel[0]} ${pixel[1]} ${pixel[2]}\n`;
    port.write(message);}

    noStroke();
    noFill();
    circle(circleX, circleY, 5)
    console.log(bum)

    if (bum < 1) {
      txt1 = "Wow good job";
      txt2 = "Hey maybe you'll"; 
      txt3 = "make a great director";
      txt4 = "some day";
      lastAttempt = success;
    } else if (bum >= 1) {
      txt1 = "You're fired";
      txt2 = "GO HOME!";
      txt3 = "You don't have what";
      txt4 = "it takes to make film";
      lastAttempt = fail;
    }
}

function mousePressed (){
  Tone.start();
  sequence1.start();
}

function mouseReleased (){
  sequence1.stop();
}


function subNum(a, b) {
  return a - b;
}

// function arr(){
//   for (let i = imgArr.length - 1; i >= 0; i--) {
//     if (gamstate = 1) {
//       imgArr.splice(i, 1);
//     }
//   }




  // imgArray
  // function randomItem(array){
  //     var arrayLength = array.length+1;
  //     console.log(arrayLength);
  //     for(var i = array.length-1;i>=0;i--){
  //       array.splice(Math.floor(Math.random()*array.length), 1);
  //       console.log(array);
  //     }
  // }
  // randomItem(imgArray);
// }

function randos(){

push()
  PEE = Math.round(random(0,1));

  POO = random(-3,3);

  PISS = Math.round(random(0,1));

  DO = Math.round(random(1,3));

  PISS = Math.round(random(0,1));

  BINGO = int(random(k))

  randoImg1 = random(imgArr)

  // for (let i = imgArr.length - 1; i >= 0; i--) {
  //   if (gameState = 2) {
  //     imgArr.splice(i, 1);
  //     }
  //   }
  console.log(gameState)
    






}

function keyTyped(){
  if (key === ' ') {
    if (gameState == 3){
      timeRemaining = 15;
      score = 0;
      gameState = 1;
    }
  }
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino',57600)
  } else {
    port.close();
  }
}

// function timer() {
//   gameTime = int((millis() - playTime) / 1000);
//   if (gameTime > 30) {
//     timerIsDone = true;
//   }
//   return gameTime;
// }

// function startScreen() {
//   push();
//   fill("gray");
//   stroke(0);
//   strokeWeight(5);
//   rect(width / 2 - 300, height / 2 - 100, 600, 200);

//   noStroke();
//   fill(0);
//   textAlign(CENTER);
//   textSize(25);
//   text(
//     `Click to Explode`,
//     width / 2,
//     height / 2 - 30
//   );
//   pop();
// }

// function endScreen() {
//   push();
//   fill("gray");
//   stroke(0);
//   strokeWeight(5);
//   rect(width / 2 - 300, height / 2 - 100, 600, 200);

//   noStroke();
//   fill(0);
//   textAlign(CENTER);
//   textSize(25);
//   text(
//     `Time is up!\nYou squished ${score} bugs!\nPress RETURN to play again!`,
//     width / 2,
//     height / 2 - 30
//   );
//   pop();
// }

// function timer() {
//   if (key === ' ') {
//     if (gameOver) {
//       timeRemaining = 15;
//       score = 0;
//       gameOver = false;
//     }
//     else {
//       if ( bum>= 345 || rotation <= 15) {
//         score++;
//         lastAttempt = success;
//       } else {
//         score--;
//         lastAttempt = fail;
//       }
//     }
// }

