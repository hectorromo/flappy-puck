var bird;
var pipes = [];
var count = 0;
var flag = true;
var pipe_flag = true;
//var w = 700;
//var h = 700;
var w = window.screen.width/1.3;
var h = window.screen.height/1.3;
var cnv;

function centerCanvas(){
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x,y);
}

function setup(){
  //cnv = createCanvas(windowWidth,windowHeight); //700,600
  cnv = createCanvas(w,h);
  centerCanvas();
  bird = new Bird;
  pipes.push(new Pipe());
}

function draw(){
  background(176,224,230);
  bird.update();
  bird.show();
  fill(0);
  textSize(32);
  str = "Streak: " + count;
  text(str, w/3, h/5);

  if (frameCount % 150 == 0){
    pipes.push(new Pipe());
  }
  for (var i = 0; i < pipes.length; i ++){
    pipes[i].show();
    if (pipe_flag == true){
      pipes[i].update();
    }
    if (flag == true && pipes[i].x < 0/*(width/15)*/){ //negative?
      flag = false;
      count += 1;
      str = "Streak: " + count;
    }

    if (pipes[i].hits(bird)){
      str = "Streak: " + count;
      startOver();
      pipe_flag = false;
    }

    if (pipes[i].x < -width/3){  //-width...goes off screen
      pipes.splice(i,1); //deletes element from array
      flag = true;
    }
  }
}

function startOver(){
  var button = createButton("Play Again?");
  button.position(windowWidth/2, windowHeight/2);
  button.mousePressed(reset);
}

function reset(){
  window.location.reload()
}

function windowResized(){
  centerCanvas();
}

function touchStarted(){
  if (pipe_flag == true){
    bird.up();
  }
  if (pipe_flag == false){
    reset();
  }
  return false;
}

function keyPressed(){
  if (key == ' ' && pipe_flag == true){
    bird.up();
  }
}
