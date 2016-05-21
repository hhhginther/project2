var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(200, 200, {backgroundColor: 0xe80831});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var startButton = new PIXI.Sprite(PIXI.Texture.fromImage("start.png"));
startButton.position.set(50,50);

startButton.interactive = true;
startButton.on('mousedown', onButtonDown);

stage.addChild(startButton);

function onButtonDown(){
  gameStart();
  stage.removeChild(startButton);
  //startButton.visible= false;
}

function gameStart() {
  var block = new PIXI.Sprite(PIXI.Texture.fromImage("block.png"));

  block.position.set(0,0);
  stage.addChild(block);

  var tHeight = renderer.height;
  var tWidth = renderer.width;

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
  //bird.on('mousedown',mouseHandler);

}


function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}

animate();
