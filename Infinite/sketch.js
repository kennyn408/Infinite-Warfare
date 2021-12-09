'use strict';

// to convert to shoot 'em up
// 1. creating a projectile class
// 2. change player controls to move from left and right, space bar will launch projectile
// 3. test collisions between projectile and coins/enemies, instead of player

let state = 'title';
let cnv;
let points = 10;
let w = 1300;
let h = 615;
let player;
let coins = [];
let missiles = [];
let lazers = [];
let enemies = [];
let projectiles = [];
let playerImg;
let coinImg;
let missileImg;
let lazerImg;
let enemyImg;
let bg1;
let bg2;
// let song;

function preload(){
  playerImg = loadImage('assets/raptor2.png');
  coinImg = loadImage('assets/enemy1.png');
  missileImg = loadImage('assets/missile1.png');
  lazerImg = loadImage('assets/lazer1.png');
  enemyImg = loadImage('assets/enemy2.png');
  bg1 = loadImage('assets/galaxy7a.jpg');
  bg2 = loadImage('assets/galaxy7b.jpg');
  // song = loadSound ('assets/Album.mp3');
}

function setup() {
  cnv = createCanvas(w, h);
  frameRate(240);
  // song.loop();

  // imageMode(CORNER);
  rectMode(CENTER);

  textFont('monospace');

  player = new Player();

  // coins = new Coin();
  coins.push(new Coin());
  // missiles = new Missile();
  missiles.push(new Missile());
  // lazers = new Lazer();
  lazers.push(new Lazer());
  // enemies = new Lazer();
  enemies.push(new Enemy());
  // projectiles = new Projectile();
  projectiles.push(new Projectile);
}

function draw() {

  switch (state){
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;
    case 'You win!':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;
    case 'game over':
      gameOver();
      cnv.mouseClicked(gameOverMouseClicked);
      break;
    default:
      break;
  }

}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'
  } else if (keyCode == UP_ARROW) {
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down'
  } else if (keyCode == CONTROL) {
    projectiles.push(new Projectile);
  }
}

function keyReleased(){

  let numberKeysPressed = 0;

  if (keyIsDown(LEFT_ARROW)){
    numberKeysPressed++;
  }

  if (keyIsDown(RIGHT_ARROW)){
    numberKeysPressed++;
  }

  if (keyIsDown(DOWN_ARROW)){
    numberKeysPressed++;
  }

  if (keyIsDown(UP_ARROW)){
    numberKeysPressed++;
  }

  console.log(numberKeysPressed);

  if (numberKeysPressed == 0){
    player.direction = 'still';
  }
}

function title(){

  // if (song.isPlaying()) {
  //   // .isPlaying() returns a boolean
  //
  //   song.play();
  //   background(0);
  // } else {
  //   song.play();
  //   background(45, 72, 145);
  // }

  imageMode(CORNER);
  background(bg1);
  textSize(80);
  textFont('Helvetica');
  stroke(255);
  textAlign(CENTER);
  fill(255);
  text('Infinite Warfare ✈️🚀🌌', w/2, h/5);

  push();
    textSize(80);
    textFont('Helvetica');
    stroke(255);
    fill(144, 144, 252);
    text('Infinite Warfare', w/2.78, h/4.85);
  pop();

  push();
    textSize(20);
    textFont('Helvetica');
    noStroke();
    textStyle(BOLDITALIC);
    fill(64, 117, 230);
    text('Created by Kenny Nguyen', w/2.2, h/3.8);
  pop();

  push();
    textSize(50);
    noStroke();
    fill(18, 40, 184);
    text('________________________________________', w/2.2, h/30);
  pop();

  push();
    textSize(50);
    noStroke();
    fill(18, 40, 184);
    text('________________________________________', w/1.85, h/3.65);
  pop();

  push();
    textSize(25);
    textFont('Helvetica');
    noStroke();
    textStyle(BOLD);
    fill(112, 158, 255);
    text('Objective: Shoot red planes and avoid colliding with missiles, lasers, and black planes!', w/2, h/2.5);
    text('Point System: Red planes +1pt, Lasers -3pts, Missiles -10pts, Black planes -50pts', w/2, h/2);
  pop();

  push();
    textSize(25);
    textFont('Helvetica');
    noStroke();
    textStyle(BOLD);
    fill(0, 255, 13);
    text('+1pt', w/2.56, h/2);
  pop();

  push();
    textSize(25);
    textFont('Helvetica');
    noStroke();
    textStyle(BOLD);
    fill(255, 17, 0);
    text('-3pts', w/1.957, h/2);
  pop();

  push();
    textSize(25);
    textFont('Helvetica');
    noStroke();
    textStyle(BOLD);
    fill(255, 17, 0);
    text('-10pts', w/1.531, h/2);
  pop();

  push();
    textSize(25);
    textFont('Helvetica');
    noStroke();
    textStyle(BOLD);
    fill(255, 17, 0);
    text('-50pts', w/1.186, h/2);
  pop();

  push();
    textSize(20);
    textFont('Helvetica');
    fill(255, 255, 255);
    text('🔼', w/2.205, h/1.44);
    text('Player Controls:                      to MOVE / CTRL key to SHOOT', w/1.98, h/1.4);
    textSize(20);
    text('◀️🔽▶️', w/2.205, h/1.35);
    text('-- click the screen to begin --', w/4, h/1.15);
    text('-- click the screen to begin --', w/1.35, h/1.15);
  pop();
}

function titleMouseClicked(){
    console.log('canvas is clicked on title page');
    state = 'level 1';
}

function level1(){
  imageMode(CORNER);
  background(bg1);

  if (random(0.2) <= 0.01){
    coins.push(new Coin());
  }

  if (random(0.5) <= 0.01){
    missiles.push(new Missile());
  }

  if (random(0.1) <= 0.01){
    lazers.push(new Lazer());
  }

  if (random(2.5) <= 0.01){
    enemies.push(new Enemy());
  }

  // iterating through projectiles array to display and move them
  // using for loop
  for (let i = 0; i < projectiles.length; i++){
    projectiles[i].display();
    projectiles[i].move();
  }

  player.display();
  player.move();

  // iterating through coins array to display and move them
  // using for loop
  for (let i = 0; i < coins.length; i++){
    coins[i].display();
    coins[i].move();
  }

  // iterating through missiles array to display and move them
  // using for loop
  for (let i = 0; i < missiles.length; i++){
    missiles[i].display();
    missiles[i].move();
  }

  // iterating through lazers array to display and move them
  // using for loop
  for (let i = 0; i < lazers.length; i++){
    lazers[i].display();
    lazers[i].move();
  }

  // iterating through enemies array to display and move them
  // using for loop
  for (let i = 0; i < enemies.length; i++){
    enemies[i].display();
    enemies[i].move();
  }

for(let i = projectiles.length - 1; i >= 0; i--){
  // check for collision with COINS, if there is a collision increase points by 1 AND splice that coin out of array
  // need to iterate backwards through array
  for (let j = coins.length - 1; j >= 0; j--){
  if (dist(projectiles[i].x, projectiles[i].y, coins[j].x, coins[j].y) <= (projectiles[i].r + coins[j].r) / 2){
    points++;
    coins.splice(j, 1);
  } else if (coins[j].y > h){
    coins.splice(j, 1);
    // console.log('coin is out of town');
  }
}

  // check for collision with MISSILES, if there is a collision increase points by 1 AND splice that missile out of array
  // need to iterate backwards through array
  for (let j = missiles.length - 1; j >= 0; j--){
  if (dist(player.x, player.y, missiles[j].x, missiles[j].y) <= (player.r + missiles[j].r) / 2){
    points -= 10;
    missiles.splice(j, 1);
  } else if (missiles[j].y > h){
    missiles.splice(j, 1);
    // console.log('missile is out of town');
  }
}

  // check for collision with LAZERS, if there is a collision increase points by 1 AND splice that lazer out of array
  // need to iterate backwards through array
  for (let j = lazers.length - 1; j >= 0; j--){
  if (dist(player.x, player.y, lazers[j].x, lazers[j].y) <= (player.r + lazers[j].r) / 2){
    points -= 3;
    lazers.splice(j, 1);
  } else if (lazers[j].y > h){
    lazers.splice(j, 1);
  // console.log('lazer is out of town');
  }
}
  // check for collision with ENEMIES, if there is a collision increase points by 1 AND splice that enemie out of array
  // need to iterate backwards through array
  for (let j = enemies.length - 1; j >= 0; j--){
  if (dist(player.x, player.y, enemies[j].x, enemies[j].y) <= (player.r + enemies[j].r) / 2){
    points -= 50;
    enemies.splice(j, 1);
  } else if (enemies[j].y > h){
    enemies.splice(j, 1);
// console.log('enemy is out of town');
  }
}

}

  push();
    textSize(50);
    textFont('Helvetica');
    stroke(255);
    fill(144, 144, 252);
    text('Infinite Warfare', 1000, 70);
  pop();

  push();
    textSize(17);
    textFont('Helvetica');
    textStyle(BOLD);
    noStroke();
    fill(255, 255, 255);
    text('Red planes +1pt, Lasers -3pts, Missiles -10 pts, Black planes -50pts', 290, 30);
  pop();

  push();
    textSize(20);
    textFont('Helvetica');
    fill(255, 255, 255);
    text('Move:', 48, 80);
  pop();

  push();
    textSize(20);
    text('🔼', 135, 68);
  pop();

  push();
    textSize(20);
    text('🔽', 135, 95);
  pop();

  push();
    textSize(20);
    text('◀️', 108, 95);
  pop();

  push();
    textSize(20);
    text('▶️', 162, 95);
  pop();

  push();
    textSize(20);
    textFont('Helvetica');
    fill(255, 255, 255);
    text('Shoot: CTRL', 260, 80);
  pop();

  push();
    textSize(50);
    textFont('Helvetica');
    strokeWeight(3);
    fill(144, 144, 252);
    text(`Score: ${points} pts`, w / 5, h - 40);
  pop();

  // check point values to win or lose the game
  if (points <= 0) {
    state = 'game over';
  }
}

function level1MouseClicked(){
  // points++;
  // console.log('points = ' + points);
  //
  // if (points >= 10){
  //   state = 'You win!';
  // }
}

function youWin(){
  background(57, 168, 65);
  textSize(80);
  stroke(255);
  text('You win!', w/2, h/2);

  textSize(30);
  text('click anywhere to restart', w/2, h * 3/4);
}

function youWinMouseClicked(){
  state = 'level 1';
  points = 0;
}

function gameOver(){
  imageMode(CORNER);
  push();
  background(bg2);
  textSize(200);
  textFont('Helvetica');
  stroke(255);
  strokeWeight(5);
  fill(89, 0, 0);
  text('Game Over!', w/2, h/3);
  pop();

  push();
    textSize(100);
    textFont('Helvetica');
    text('💀                   💀', w/2, h/1.5);
  pop();

  push();
    textSize(50);
    textFont('Helvetica');
    strokeWeight(3);
    fill(144, 144, 252);
    text(`Your final score: ${points} pts`, w / 2, h / 1.55);
  pop();

  push();
    textSize(40);
    textFont('Helvetica');
    stroke(242, 78, 78);
    strokeWeight(5);
    fill(89, 0, 0);
    text('-- click anywhere to return to title screen --', w/2, h/1.07);
  pop();
}

function gameOverMouseClicked(){
  state = 'title';
  points = 10;
}
