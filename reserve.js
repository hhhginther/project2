
var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(200, 200, {backgroundColor: 0xe80831});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var titlescreen = new PIXI.Sprite(PIXI.Texture.fromImage("titlescreen.png"));
titlescreen.anchor.set(0.5);
titlescreen.position.set(100,100);

titlescreen.interactive= true;
titlescreen.on('mousedown', onButtonDown);
stage.addChild(titlescreen);

function onButtonDown(){
  startScreen();
  stage.removeChild(titlescreen);
}

function startScreen(){
  var startButton = new PIXI.Sprite(PIXI.Texture.fromImage("start.png"));
  startButton.position.set(50,50);

  startButton.interactive = true;
  startButton.on('mousedown', onButtonDown2);
  stage.addChild(startButton);

  //when startButton is pressed, calls function to draw assets and start play
  function onButtonDown2(){
    gameStart();
    stage.removeChild(startButton);
  }
}

//gameplay goes here..
function gameStart() {

  var block_to_press = new PIXI.Sprite(PIXI.Texture.fromImage("ingame_button.png"));

  block_to_press.position.set(100,100);
  block_to_press.anchor.set(0.5);
  stage.addChild(block_to_press);

  var block = new PIXI.Sprite(PIXI.Texture.fromImage("block.png"));

  block.position.set(0,0);
  playerStage.addChild(block);

  //take note: movement is incremented by 50  unless < 50 from an edge
  //on outer edges, bounds to check should be 50 less than total boundary size
  function keydownEventHandler(e) {
    if (e.keyCode == 87 && block.position.y >0) { //w key
      if(block.position.y < 50){
        createjs.Tween.get(block.position).to({y: 0},500);
      }
      createjs.Tween.get(block.position).to({y: (block.position.y - 50)}, 500);
    }

    if (e.keyCode == 83) { //s key
      if(block.position.y > 100){
        createjs.Tween.get(block.position).to({y:150},500);
      }
      else{
        createjs.Tween.get(block.position).to({y:(block.position.y +50)},500);
      }
    }

    if (e.keyCode == 65 && block.position.x >0) { //a key
      if(block.position.x < 50){
          createjs.Tween.get(block.position).to({x: 0},500);
      }
      createjs.Tween.get(block.position).to({x: (block.position.x - 50)}, 500);
    }

    if(e.keyCode == 68) { //d key
      if(block.position.x > 100){
        createjs.Tween.get(block.position).to({x:150},500);
      }
      else{
      createjs.Tween.get(block.position).to({x: (block.position.x + 50)}, 500);
      }
    }

  }

  document.addEventListener('keydown', keydownEventHandler);
  block.interactive = true;

}


function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}

animate();
