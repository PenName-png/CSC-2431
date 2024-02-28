// here we declare our sound sources using the "players" tone object
// the preload function has been removed so we can have our signal path down below

let sounds = new Tone.Players({
  'popcorn' : "Assets/popcorn.mp3",
  'water' : "Assets/water.mp3",
  'Joplin' : "Assets/Joplin.mp3",
  'Rag' : "Assets/Rag.mp3",
  'Sunshine' :"Assets/Sunshine.mp3",
  'Dry' : "Assets/Dry.mp3"
});

// here we delcare our effects objects: FeedbackDelay and Distortion
let delAmt = new Tone.FeedbackDelay ("8n", 0.5);
let distAmt = new Tone.Distortion (0.5); 

// button and slider variables
let button1, button2, button3, button4;
let delaySlider, fbSlide; 

// here is our signal path: sound source --> delay --> distortion --> audio out
sounds.connect(delAmt);
delAmt.connect(distAmt);
distAmt.toDestination();

function setup() {
  createCanvas(400, 400);

    

  button1 = createButton('Rag Time');
  button1.position(85, 150);
  button1.mousePressed(() => sounds.player("Rag").start()); 
  
  button2 = createButton('Hope the TA is having a GoodDay:)');
  button2.position(205, 150);
  button2.mousePressed(() => sounds.player("Dry").start());

  button3 = createButton('Saloon');
  button3.position(205, 100);
  button3.mousePressed(() => sounds.player("Joplin").start());

  button4 = createButton('Sunshine');
  button4.position(85, 100);
  button4.mousePressed(() => sounds.player("Sunshine").start());


  delaySlider = createSlider (0, 1, 0, 0.05);
  delaySlider.position (120, 200);
  delaySlider.mouseMoved (() => delAmt.delayTime.value = delaySlider.value()); 

  fbSlider = createSlider (0, 0.9, 0, 0.05);
  fbSlider.position (120, 250);
  fbSlider.mouseMoved (() => delAmt.feedback.value = fbSlider.value ());

  distSlider = createSlider (0, 0.9, 0, 0.05);
  distSlider.position (120, 300);
  distSlider.mouseMoved (() => distAmt.distortion = distSlider.value());
}

function draw() {
  background(50, 200, 200);
  text ("Add delay", width/3, 235);
  text ("Add feedback", width/3, 285);
  text ("Add distortion", width/3, 335);
}
