//todo: refine assets, collect them into spritesheet; create gameplay; add sounds...
//add instructions; add end screen; include menu (diff from title screen);
var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(500,500, {backgroundColor: 0x556270});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
  .add("Blip_Select9.mp3")
  .add("Blip_Select4.mp3")
  .add("Powerup10.mp3")
  .add("assets.json")
  .load(ready);

var blip;
function ready(){
  var titlescreen = new PIXI.Sprite(PIXI.Texture.fromFrame("titlescreen.png"));
  titlescreen.anchor.set(0.5);
  titlescreen.position.set(250,250);
  titlescreen.interactive = true;
  titlescreen.on('mousedown', onButtonDown);
  stage.addChild(titlescreen);
  beep = PIXI.audioManager.getAudio("Blip_Select9.mp3");
  blip = PIXI.audioManager.getAudio("Blip_Select4.mp3");
  woohoo = PIXI.audioManager.getAudio("Powerup10.mp3");


  //click on start screen calls this, start game button appears
  function onButtonDown(){
    stage.addChild(aboutButton);
    stage.addChild(startButton);
    stage.removeChild(title);
    stage.removeChild(titlescreen);
    stage.removeChild(titleInstruct)
    blip.play();
  }

  var title = new PIXI.Text("THIS IS A TITLE",{font: '25px Arial'} );
  title.position.set(150,50);
  stage.addChild(title);

  var titleInstruct = new PIXI.Text("CLICK ANYWHERE TO BEGIN", {font: '15px Arial'});
  titleInstruct.position.set(140,300);
  stage.addChild(titleInstruct);

  var startButton = new PIXI.Sprite(PIXI.Texture.fromFrame("start.png"));
  startButton.position.set(100,200);

  var aboutButton = new PIXI.Sprite(PIXI.Texture.fromFrame("about.png"));
  aboutButton.position.set(300,200);

  startButton.interactive = true;
  startButton.on('mousedown', onButtonDown2);

  aboutButton.interactive = true;
  aboutButton.on('mousedown', onButtonDown4);

  var aboutText = new PIXI.Text("How to Play:\n\
  move your bird using WASD.\n\
  press each and every green button exactly once\n\
  press a button more than once and ya lose!\n\
  make your way to the goal, get to the goal with\n\
  every button pressed and you win!\n\
  walk slowly, the controls are sensitive :(", {font: '15px Arial'});
  aboutText.position.set(100,0);
  stage.addChild(aboutText);
  aboutText.visible = false;

  //button sprite up & down textures
  var block_to_press_up = PIXI.Texture.fromFrame("ingame_button.png");
  var block_to_press_down = PIXI.Texture.fromFrame("buttonDown.png");

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

  var goal = new PIXI.Sprite(PIXI.Texture.fromFrame("goal.png"));
  goal.position.set(400,400);
  goal.width = 100;

  //player sprite animation
  var frames = [];

  for (var i=1;i<=4;i++){
    frames.push(PIXI.Texture.fromFrame('block'+i+'.png'));
  }

  blockMov = new PIXI.extras.MovieClip(frames);
  blockMov.position.set(0,0);
  blockMov.animationSpeed = 0.1;
  blockMov.play();
  //stage.addChild(blockMov);

  //player sprite
  //var block = new PIXI.Sprite(PIXI.Texture.fromFrame("block1.png"));
  //block.position.set(0,0);

  var lostText = new PIXI.Text("You Lose!", {font: "Arial 20px"});
  lostText.position.set(100,100);

  var tryAgain = new PIXI.Sprite(PIXI.Texture.fromFrame("try_again_button.png"));
  tryAgain.position.set(200,200);

  tryAgain.interactive = true;
  tryAgain.on('mousedown', onButtonDown3);


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
    stage.removeChild(aboutButton);
    stage.removeChild(aboutText);
    stage.addChild(goal);
    stage.addChild(blockMov);
    stage.removeChild(startButton);
    startButton.visible = false;
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
    stage.addChild(blockMov);
    blockMov.position.set(0,0);
    stage.removeChild(winText);
    stage.removeChild(lostText);
    stage.removeChild(tryAgain);
    blip.play();
  }

  function onButtonDown4 (){
    if(aboutText.visible == true){
      aboutText.visible = false;
    }
    else aboutText.visible = true;
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
    if(check(blockMov,goal)){
      return true;
    }
    else return false;
  }

  var winText = new PIXI.Text("You win!", {font: "Arial 20px"});
  winText.position.set(100,100);

  function win(){
    if(checkForWin() && gameWinnable){
      woohoo.play();
      stage.addChild(tryAgain);
      stage.removeChild(blockMov);
      //block.destroy();
      blockMov.position.set(0,0);
      //stage.removeChild(block);
      stage.addChild(winText);

    }
  }

  //function to control player movement using wasd; checks renderer boundaries
  function keydownEventHandler(e) {
    if (e.keyCode == 87 && blockMov.position.y >0) { //w key
      if(blockMov.position.y < 50){
        createjs.Tween.get(blockMov.position).to({y: 0},200);
      }
      createjs.Tween.get(blockMov.position).to({y: (blockMov.position.y - 50)}, 200);
    }

    if (e.keyCode == 83) { //s key
      if(blockMov.position.y > 400){
        createjs.Tween.get(blockMov.position).to({y:450},200);
      }
      else{
        createjs.Tween.get(blockMov.position).to({y:(blockMov.position.y + 50)},200);
      }
    }

    if (e.keyCode == 65 && blockMov.position.x >0) { //a key
      if(blockMov.position.x < 50){
          createjs.Tween.get(blockMov.position).to({x: 0},200);
      }
      createjs.Tween.get(blockMov.position).to({x: (blockMov.position.x - 50)}, 200);
    }

    if(e.keyCode == 68) { //d key
      if(blockMov.position.x > 400){
        createjs.Tween.get(blockMov.position).to({x:450},200);
      }
      else{
      createjs.Tween.get(blockMov.position).to({x: (blockMov.position.x + 50)}, 200);
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
    stage.removeChild(blockMov);
    //block.destroy();
    blockMov.position.set(0,0);
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
        else{check(blockMov,blockPressArray[i][j])}
      }
    }
  }


}

//var titlescreen = new PIXI.Sprite(PIXI.Texture.fromImage("titlescreen.png"));








function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
  //checkHelp();
}

animate();
