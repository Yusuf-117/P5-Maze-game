//maze attributes
var mazeSize = 800;
var cols, rows;
var w = 40;

//arrays
var grid = [];
var enemies = [];
var healers = [];
var geners = [];
var stack = [];

//player attributes
var health = 2;
var xPos = 0;
var yPos = 0;
var PlayerI = 0;
var PlayerJ = 0;

//Setup fucntion - create maze and generate the enemies and health
function setup() 
{
  goal = loadImage('images/bmet.png');
  walkRight = loadImage('images/right.png');
  cones = loadImage('images/cone.png');
  heart = loadImage('images/heart.png');
  //frameRate(5);

  var x = createCanvas(mazeSize, mazeSize);
  x.parent("main");
  cols = floor(width/w);
  rows = floor(height/w);

  for (var   j = 0; j < rows; j++) 
  {
    for (var i = 0; i < cols; i++) 
    {
     var cell = new Cell(i, j);
     grid.push(cell);
   }
 }

 for (var i= 0; i < 2; i++) 
 {
  var f = new gener(i);
  geners.push(f);
}


for (var i= 0; i <= 3; i++) 
{
  var e = new enemy();
  enemies.push(e);
}

for (var i= 0; i <= 3; i++) 
{
  var h = new heal();
  healers.push(h);
}
}


//draw function - draw player, goal, enemies, health and walls and constantly check the player attributes, if their health hits 0  
function draw() 
{
	background(51);
	for (var i = 0; i < grid.length; i++)
  {
    grid[i].show();
  }

  for (var i = 0; i < geners.length; i++) 
  {
    geners[i].generGen();
  }

 //player and Goal
 fill(0,0,0,255)
 var player = image(walkRight,xPos, yPos,w, w);
 
 fill(0,255,0,255)
 //var goal = rect(mazeSize - w, mazeSize - w,w, w);
 image(goal, mazeSize - (w*2), mazeSize - w, w*2, w);

 if (dist(xPos,yPos,mazeSize-w,mazeSize-w) < 10) 
 {
 	//alert("WIN!");
  Rdirect();

}

if (health < 1) 
{
  noLoop();
  alert("GAME OVER!! Try Again");
  location.reload();  

  

  
}

for (var i = 0; i < enemies.length; i++) 
{
  enemies[i].genEnemy();
  if (dist(xPos,yPos,enemies[i].enemyI*w,enemies[i].enemyJ*w) < 10) 
  {
    enemies.splice(i, 1);
    health--;
  }
}

for (var i = 0; i < healers.length; i++) 
{
  healers[i].genHealth();
  if (dist(xPos,yPos,healers[i].healthI*w,healers[i].healthJ*w) < 10) 
  {
    healers.splice(i, 1);
    health++;
  }
}




}

//Index function, work out the location of cells in grid using their properties
function index(i, j) 
{
	if (i < 0 || j < 0 || i > cols-1 || j > rows-1) 
	{
		return -1;
	}
	return i + j * cols;
}

// Remove the walls of a cell
function removeWalls(a, b) 
{
	var x = a.i - b.i;
	if (x === 1) 
	{
		a.walls[3] = false;
		b.walls[1] = false;
	} 
	else if (x === -1)
	{
		a.walls[1] = false;
		b.walls[3] = false;
	}
	var y = a.j - b.j;
	if (y === 1)
	{
		a.walls[0] = false;
		b.walls[2] = false;
	} 
	else if (y === -1)
	{
		a.walls[2] = false;
		b.walls[0] = false;
	}
}
//move function, controls movements of the player
function move(e)
{
   // tops    = grid[PlayerI-5, PlayerJ-5];
   //  rights  = grid[PlayerI++, PlayerJ++];
   //  bottoms = grid[PlayerI+5, PlayerJ+5];
   // lefts  = grid[PlayerI-1, PlayerJ-1];

   if (e.keyCode==37) 
   {
   	if (grid[PlayerI-1, PlayerJ-1].walls[1] == false) 
   	{
   		xPos -= w;
   		PlayerJ--;
   		PlayerI--;
   	}

   }
   if (e.keyCode==38) 
   {
   	if (grid[PlayerI-mazeSize/w, PlayerJ-mazeSize/w].walls[2] == false) 
   	{
   		yPos -= w;
   		PlayerI-= mazeSize/w;
   		PlayerJ-= mazeSize/w;
   	}
   }
   if (e.keyCode==39) 
   {
   	if (grid[PlayerI+1, PlayerJ+1].walls[3] == false) 
   	{
   		xPos += w;
   		PlayerJ++;
   		PlayerI++;
   	}

   }
   if (e.keyCode==40) 
   {
   	if (grid[PlayerI+ mazeSize/w, PlayerJ + mazeSize/w].walls[0] == false) 
   	{
   		yPos += w;
   		PlayerI+= mazeSize/w;
   		PlayerJ+= mazeSize/w;
   	}
   }
 }
//call the move function (add event listener)
document.onkeydown = move;

//Creater secondary canvas 
var secondaryCanvas = function(s)
{
  //Secondary canvas setup function
  s.setup = function()
  {
    var x = s.createCanvas(mazeSize,100);
    x.parent("secondary");
  }
  //Secondary canvas draw function, display player properties
  s.draw = function()
  {

    s.background(20);
    s.fill(255);
    s.textSize(25);
    s.text('Health = ' + health, 50, 50);
  }
}
//Add/draw the secondary canvas
var myp5 = new p5(secondaryCanvas);

//Redirect the player to the next level with updated score and stage values
function Rdirect(){
  noLoop();
  document.cookie = "stage =" + 2;
  document.cookie = "score =" + health; 

  window.location.href = "level2.php";
}