const synth = new Tone.PolySynth(Tone.Synth);
const bend = new Tone.PitchShift();
const delay = new Tone.PingPongDelay(0);
synth.connect(bend);
bend.connect(delay)
bend.toDestination();




let notes = {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'E4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5',
  'z' : 'D5',
  'x' : 'E5',
  'c' : 'F5',
  'v' : 'G5',
  'b' : 'A5',
  'n' : 'B5',
  'm' : 'C6z'
}

function setup() {
  createCanvas(400, 400);

  pitchSlider = createSlider (0., 12., 0.01, 1);
  pitchSlider.position (125,150);
  pitchSlider.mouseMoved(() => {
    bend.pitch = pitchSlider.value();
  })

}

function keyPressed(){
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

function keyReleased(){
  let playNotes = notes[key];
  synth.triggerRelease(playNotes,'+0.03');
}

function draw() {
  background(100, 220, 150);
  text("Play A through K", 125, 100)
  text ('Pitchbend', 50, 155)
}