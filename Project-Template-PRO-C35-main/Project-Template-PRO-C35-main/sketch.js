var balloon,balloonImage1,balloonImage2;
var database;
var positions;

function preload()
{
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup()
{
  database = firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,250,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 

  var balloonPositionRef = database.ref('ballon/height');
  balloonPositionRef.on("value",readPosition);
}

// function to display UI
function draw() 
{
  background(bg);

  if(keyDown(LEFT_ARROW))
  {
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW))
  {
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW))
  {
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW))
  {
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,1);
  }
  

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y)
{
  database.ref('ballon/height').set(
  {x:positions.x+x, y:positions.y+y})
}

function readPosition(data)
{
  positions = data.val();
  balloon.x = positions.x;
  balloon.y = positions.y;
}