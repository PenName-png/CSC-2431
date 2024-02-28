let sprite;
let x
let y
let b
let character,
  bugImages = [],
  bug,
  allBugs,
  alive,
  squished,
  score,
  gameTime,
  gameState,
  timerIsDone,
  playTime;


function preload() {
  let animations = {
    stand: { row: 0, frames: 1},
    walkRight: {row: 3, frames: 4},
    walkUp: {row: 0, frames: 4},
    walkDown: {row: 2, frames: 4}
    
  };


  characters.push(new Character(100,100,160,160,'assets/Test.png',animations));
  characters.push(new Character(200,200,160,160,'assets/Test.png',animations));
  characters.push(new Character(300,300,160,160,'assets/Test.png',animations));
}

function setup() {
  createCanvas(400, 400); 
  frameRate(min)
  x = random(45, 55);
  y = random(45, 55);
  b = random(1,100)
}

function draw() {
  background(0);


  
  characters.forEach((character) => {
    
    if (kb.pressing('d')) {
      character.walkRight();
    } 
    else if (kb.pressing('a')) {
      character.walkLeft();
    } 
    else if (kb.pressing('w')) {
      character.walkUp();
    }
    else if (kb.pressing('s')) {
      character.walkDown();
    }
    else {
      character.stop();
    }

     if (character.sprite.x + character.sprite.width/4 > width) {
       character.walkLeft();
     } else if (character.sprite.x - character.sprite.width/4 < 0) {
       character.walkRight();
     }
  })
}

class Character {
  constructor(x,y,width,height,spriteSheet,animations) {
    this.sprite = new Sprite(x,y,width,height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 8;
    this.sprite.addAnis(animations);
    this.sprite.changeAni('stand');
  }

  stop() {
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.sprite.changeAni('stand');
  }
  
  walkRight() {
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = 1;
    this.sprite.scale.x = 1;
    this.sprite.vel.y = 0;
  }
  
  walkLeft() {
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = -1;
    this.sprite.scale.x = -1;
    this.sprite.vel.y = 0;
  }
  
  walkUp() {
    this.sprite.changeAni('walkUp');
    this.sprite.vel.y = -1;
    this.sprite.vel.x = 0;
  }
  
  walkDown() {
    this.sprite.changeAni('walkDown');
    this.sprite.vel.y = 1;
    this.sprite.vel.x = 0;
  }
}



function keyTypedOld() {
  switch(key) {
    case 'd':
      walkRight();
      break;
    case 'a':
      walkLeft();
      break;
    case 'w':
      
      break;
    case 's':
      
  }
}

function timer() {
  gameTime = int((millis() - playTime) / 1000);
  if (gameTime > 30) {
    timerIsDone = true;
  }
  return gameTime;
}

function walls() {
  topWall = new Sprite(width / 2, -150, width, 30);
  bottomWall = new Sprite(width / 2, height + 150, width, 30);
  leftWall = new Sprite(-150, height / 2, 30, height);
  rightWall = new Sprite(width + 150, height / 2, 30, height);
  
  topWall.collider = "static";
  bottomWall.collider = "static";
  leftWall.collider = "static";
  rightWall.collider = "static";
}


function startScreen() {
  push();
  fill("gray");
  stroke(0);
  strokeWeight(5);
  rect(width / 2 - 300, height / 2 - 100, 600, 200);

  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text(
    `Click the bugs to clear the Infestation\nClick as many as you can in 30 seconds!\nGood Luck!`,
    width / 2,
    height / 2 - 30
  );
  pop();
}

function endScreen() {
  push();
  fill("gray");
  stroke(0);
  strokeWeight(5);
  rect(width / 2 - 300, height / 2 - 100, 600, 200);

  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text(
    `Time is up!\nYou squished ${score} bugs!\nPress RETURN to play again!`,
    width / 2,
    height / 2 - 30
  );
  pop();
}

function timer() {
  gameTime = int((millis() - playTime) / 1000);
  if (gameTime > 30) {
    timerIsDone = true;
  }
  return gameTime;
}

function teleTop(item){
  item.y = -100;
  item.rotation = 180;
  item.move("down", 3, 80000);
}
function teleBot(item){
  item.y = height +100;
  item.rotation = 0;
  item.move("up", 3, 80000);
}
function teleLeft(item){
  item.x = -100;
  item.rotation = 0;
  item.move("right", 3, 80000);
}
function teleRight(item){
  item.x = height +100;
  item.rotation = -90;
  item.move("left", 3, 80000);
}
function squish(item) {
  if (item.isDead === false) {
    item.isDead = true;
    item.ani = "dead";
    item.vel.x = 0;
    item.vel.y = 0;
    item.life = 60;
    score++;
  }
  if (allBugs.size() < 1) {
    moreBugs(random(5, 50));
  }
}
