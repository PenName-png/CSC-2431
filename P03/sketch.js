// Paint App With Sprites and Audio
// PDM: Game Design and Audio Programming
// Code by   [2023]


// This sketch is a function upgrade of the paint app project found here: https://pdm.lsupathways.org/2_graphics/2_paintapp/4_lesson_4/
// Functionality is handled with p5.play sprite and the audio processing is handled with tone.js

let paintColors = [ // all colors in app. all are standard extended web colors
  [0, 0, 0], // black
  [220, 20, 60], // crimson
  [255, 140, 0], // darkOrange
  [255, 215, 0], // gold
  [255, 255, 0], // yellow
  [154, 205, 50], // yellowGreen
  [60, 179, 113], // mediumSeaGreen
  [0, 128, 128], // teal
  [70, 130, 180], // steelBlue
  [0, 0, 255], // blue
  [186, 85, 211], // mediumOrchid
  [75, 0, 130], // indigo
  [255, 255, 255], // white
];

let c, saveButton, thiccSlider;

function setup() {
  c = createCanvas(600, 600);
 
  saveButton = createButton("click me to save!");
  saveButton.mousePressed(exportCanvas);
  
  thiccSlider = createSlider(1,10,2,1);
  
}

function makeSprites(){ // makes the paint selector sprites
  
}

function changeColor(){ // changes the color when the sprite is selected
  
}

function draw() {
  background(255); // white canvas
}

function paint(){ // draws a colored line when the mouse is clicked and dragged on the canvas
  
}

function exportCanvas(){ // saves the canvas as a .jpg image when the button is clicked.
  let thisImage = saveCanvas(c,'myPainting', 'jpg');
}


