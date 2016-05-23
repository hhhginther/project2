//todo: refine assets, collect them into spritesheet; create gameplay; add sounds...
//add instructions; add end screen; include menu (diff from title screen);
var gameport = document.getElementById("gameport");

PIXI.loader
  .add("Blip_Select9.mp3")
  .add("Blip_Select4.mp3")
  .add("Powerup10.mp3")
  .load(ready);

var blip;
function ready(){
  beep = PIXI.audioManager.getAudio("Blip_Select9.mp3");
  blip = PIXI.audioManager.getAudio("Blip_Select4.mp3");
  woohoo = PIXI.audioManager.getAudio("Powerup10.mp3");
}

var renderer = PIXI.autoDetectRenderer(500,500, {backgroundColor: 0x556270});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var titlescreen = new PIXI.Sprite(PIXI.Texture.fromImage("titlescreen.png"));
titlescreen.anchor.set(0.5);
titlescreen.position.set(250,250);

titlescreen.interactive = true;
titlescreen.on('mousedown', onButtonDown);
stage.addChild(titlescreen);

var title = new PIXI.Text("THIS IS A TITLE",{font: '25px Arial'} );
title.position.set(150,50);
stage.addChild(title);

var titleInstruct = new PIXI.Text("CLICK ANYWHERE TO BEGIN", {font: '15px Arial'});
titleInstruct.position.set(140,300);
stage.addChild(titleInstruct);

var startButton = new PIXI.Sprite(PIXI.Texture.fromImage("start.png"));
startButton.position.set(50,200);

var aboutButton = new PIXI.Sprite(PIXI.Texture.fromImage("about.png"));
aboutButton.position.set(50,200);

startButton.interactive = true;
startButton.on('mousedown', onButtonDown2);

//button sprite up & down textures
var block_to_press_up = PIXI.Texture.fromImage("ingame_button.png");
var block_to_press_down = PIXI.Texture.fromImage("buttonDown.png");

//var b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14,b15,b16,b17,b18;
var blockPressArray = [[0,1,1,0,0,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1],[1,1,0,0,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,0,1,1],[1,0,0,1,1,0,0,0,0,0],[1,0,0,1,1,0,1,1,1,1,],
    [1,1,1,1,1,0,1,1,0,1],[1,1,1,1,1,1,1,1,0,1]];

for(var i=0;i<blockPressArray.length;i++){
  for(var j=0;j<blockPressArray[i].length;j++){
    if(i==0&&j==0 || blockPressArray[i][j] == 0){continue}
    else{
      blockPressArray[i][j] = new PIXI.Sprite(block_to_press_up);
      blockPressArray[i][j].position.set(50*i,50*j);
    }
  }
}

var goal = new PIXI.Sprite(PIXI.Texture.fromImage("goal.png"));
goal.position.set(400,400);
goal.width = 100;

//player sprite
var block = new PIXI.Sprite(PIXI.Texture.fromImage("block.png"));
block.position.set(0,0);

var lostText = new PIXI.Text("You Lose!", {font: "Arial 20px"});
lostText.position.set(100,100);

var tryAgain = new PIXI.Sprite(PIXI.Texture.fromImage("try_again_button.png"));
tryAgain.position.set(0,0);

tryAgain.interactive = true;
tryAgain.on('mousedown', onButtonDown3);


//click on start screen calls this, start game button appears
function onButtonDown(){
  stage.addChild(startButton);
  stage.removeChild(title);
  stage.removeChild(titlescreen);
  stage.removeChild(titleInstruct)
  blip.play();
}

//click on start button calls this, game starts
function onButtonDown2(){
  //stage.addChild(block_to_press);
  for(var i=0;i<blockPressArray.length;i++){
    for(var j=0;j<blockPressArray[i].length;j++){
      if(i==0&&j==0 || blockPressArray[i][j] == 0){continue}
      else{
        stage.addChild(blockPressArray[i][j]);
      }
    }
  }
  stage.addChild(goal);
  stage.addChild(block);
  stage.removeChild(startButton);
  blip.play();
}

//click on try again button, resets game
function onButtonDown3(){
  for(var i = 0;i<blockPressArray.length;i++){
    for(var j = 0;j<blockPressArray[i].length;j++){
      if(i==0&&j==0 || blockPressArray[i][j] == 0){continue}
      else{blockPressArray[i][j].texture = block_to_press_up}
    }
  }
  gameWinnable=true;
  stage.addChild(block);
  block.position.set(0,0);
  stage.removeChild(winText);
  stage.removeChild(lostText);
  stage.removeChild(tryAgain);
  blip.play();
}

function checkForWin(){
  for(var i = 0;i<blockPressArray.length;i++){
    for(var j = 0;j<blockPressArray[i].length;j++){
      if(i==0&&j==0 || blockPressArray[i][j] == 0){continue}
      else{
        if(blockPressArray[i][j].texture == block_to_press_up){
          return false;
        }
      }
    }
  }
  if(check(block,goal)){
    return true;
  }
  else return false;
}

var winText = new PIXI.Text("You win!", {font: "Arial 20px"});
winText.position.set(100,100);

function win(){
  if(checkForWin() && gameWinnable){
    stage.addChild(tryAgain);
    stage.removeChild(block);
    //block.destroy();
    block.position.set(0,0);
    //stage.removeChild(block);
    stage.addChild(winText);
    woohoo.play();
  }
}

//function to control player movement using wasd; checks renderer boundaries
function keydownEventHandler(e) {
  if (e.keyCode == 87 && block.position.y >0) { //w key
    if(block.position.y < 50){
      createjs.Tween.get(block.position).to({y: 0},200);
    }
    createjs.Tween.get(block.position).to({y: (block.position.y - 50)}, 200);
  }

  if (e.keyCode == 83) { //s key
    if(block.position.y > 400){
      createjs.Tween.get(block.position).to({y:450},200);
    }
    else{
      createjs.Tween.get(block.position).to({y:(block.position.y + 50)},200);
    }
  }

  if (e.keyCode == 65 && block.position.x >0) { //a key
    if(block.position.x < 50){
        createjs.Tween.get(block.position).to({x: 0},200);
    }
    createjs.Tween.get(block.position).to({x: (block.position.x - 50)}, 200);
  }

  if(e.keyCode == 68) { //d key
    if(block.position.x > 400){
      createjs.Tween.get(block.position).to({x:450},200);
    }
    else{
    createjs.Tween.get(block.position).to({x: (block.position.x + 50)}, 200);
    }
  }
  beep.play();
  checkHelp();
  win();
}

var gameWinnable = true;

document.addEventListener('keydown', keydownEventHandler);
//block.interactive = true;//player sprite moveable via wasd

function gameLose(){
  //currentx = block.position.x;
  //currenty = block.position.y;
  //var loseBlock = new PIXI.Sprite(PIXI.texture.fromImage("block_lose.png"));
  //loseBlock.position.set(currentx,currenty);
  //stage.addChild(loseBlock);
  gameWinnable = false;
  stage.addChild(tryAgain);
  stage.removeChild(block);
  //block.destroy();
  block.position.set(0,0);
  stage.addChild(lostText);
}

//checks to see if player "block" sprite overlaps block_to_press
function check(sprite1, sprite2) {
  if(sprite1.x < sprite2.x + sprite2.width &&
    sprite1.x + sprite1.width > sprite2.x &&
    sprite1.y < sprite2.y + sprite2.height &&
    sprite1.height + sprite1.y > sprite2.y){
      if(sprite2.texture == block_to_press_down){
        //stage.removeChild(sprite2);
        gameLose();
      }
      else if(sprite2.texture == block_to_press_up){
      sprite2.texture = block_to_press_down;
      }
      return true;
  }
  else return false;
}

function checkHelp(){
  for(var i = 0;i<blockPressArray.length;i++){
    for(var j = 0;j<blockPressArray[i].length;j++){
      if(i==0&&j==0 || blockPressArray[i][j] == 0){continue}
      else{check(block,blockPressArray[i][j])}
    }
  }
}


function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
  //checkHelp();
}

animate();
