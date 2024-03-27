
let sequence1, square;
let melody = [["F4#","E4","D4b","B3"],"B3b","4nr","E4b",["B3","D4b","D4","E4"]]
function preload(){
  mouse = loadImage ('assets/rickroll.gif')
}

square = new Tone.Synth({
  oscillator: {
    type: "square"
  },
  envelope : {
    attack: 0.1,
    decay: 0.1,
    sustain: 1,
    release: 0.1
  }
}).toDestination();

sequence1 = new Tone.Sequence (function (time,note){
  square.triggerAttackRelease(note, 0.8); // 0.8 can be changed to make notes shorter or longer
}, melody, "4n"); //"4n" can be changed to other note values like "8n" to speed up or slow down

Tone.Transport.start(); //starts computer clock
Tone.Transport.bpm.value = 100; // can speed up or slow down sequence here
Tone.Transport.timeSignature = [3,4]; // this would be 3/4 time. Will default to 4/4 without this

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (mouseIsPressed ===true){
    background(mouse);
  } else if (mouseIsPressed === false){
    background (240);
    text ('press mouse', 150, height/3);
  }
}

function mousePressed (){
  Tone.start();
  sequence1.start();

}

function mouseReleased (){
  sequence1.stop();

}







  


