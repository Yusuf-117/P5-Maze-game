//maze attributes
var level = 1; 
var maxLevel = 3; 
var mazeSize = 800 + (level - 1) * 80; // bigger per level
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

// start + goal cell helpers
var startIndex = 0;
var goalIndex;

// restore saved level
var savedLevel = localStorage.getItem("mazeLevel");
if (savedLevel) {
  level = parseInt(savedLevel);
  mazeSize = 800 + (level - 1) * 80;
}

//Setup fucntion - create maze and generate the enemies and health
function setup() {
  cones = loadImage("images/mine.png");
  heart = loadImage("images/heart.png");

  var x = createCanvas(mazeSize, mazeSize);
  x.parent("main");
  cols = floor(width / w);
  rows = floor(height / w);
  goalIndex = cols * rows - 1; 

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  // open all walls around start cell
  grid[startIndex].walls = [false, false, false, false];

  // open all walls around goal cell
  grid[goalIndex].walls = [false, false, false, false];

  // cell under start: open top
  if (grid[cols]) {
    grid[cols].walls[0] = false;
  }

  // cell right of start: open left
  if (grid[1]) {
    grid[1].walls[3] = false;
  }

  // cell above goal: open bottom + left
  var aboveGoal = grid[cols * rows - 1 - cols];
  if (aboveGoal) {
    aboveGoal.walls[2] = false;
    aboveGoal.walls[3] = false;
  }

  // cell left of goal: open right + top
  var leftGoal = grid[cols * rows - 2];
  if (leftGoal) {
    leftGoal.walls[1] = false;
    leftGoal.walls[0] = false;
  }

  for (var i = 0; i < 2; i++) {
    var f = new gener(i);
    geners.push(f);
  }

  // more cones per level, never on start/goal
  for (var i = 0; i < 3 + level; i++) {
    var e = new enemy();
    while (
      (e.enemyI === 0 && e.enemyJ === 0) ||
      (e.enemyI === cols - 1 && e.enemyJ === rows - 1)
    ) {
      e = new enemy();
    }
    enemies.push(e);
  }

  // hearts never on start/goal
  for (var i = 0; i <= 3; i++) {
    var h = new heal();
    while (
      (h.healthI === 0 && h.healthJ === 0) ||
      (h.healthI === cols - 1 && h.healthJ === rows - 1)
    ) {
      h = new heal();
    }
    healers.push(h);
  }
}

function draw() {
  background(51);

  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  for (var i = 0; i < geners.length; i++) {
    geners[i].generGen();
  }

  // player square
  fill(255);
  rect(xPos, yPos, w, w);

  // goal
  fill(0, 255, 0);
  rect(mazeSize - w, mazeSize - w, w, w);

  if (dist(xPos, yPos, mazeSize - w, mazeSize - w) < 10) {
    Rdirect();
  }

  if (health < 1) {
    noLoop();
    alert("GAME OVER!! Try Again");
    localStorage.removeItem("mazeLevel"); 
    location.reload();
  }

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].genEnemy();
    if (dist(xPos, yPos, enemies[i].enemyI * w, enemies[i].enemyJ * w) < 10) {
      enemies.splice(i, 1);
      health--;
    }
  }

  for (var i = 0; i < healers.length; i++) {
    healers[i].genHealth();
    if (dist(xPos, yPos, healers[i].healthI * w, healers[i].healthJ * w) < 10) {
      healers.splice(i, 1);
      health++;
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function move(e) {
  if (e.keyCode == 37) {
    if (grid[(PlayerI - 1, PlayerJ - 1)].walls[1] == false) {
      xPos -= w;
      PlayerJ--;
      PlayerI--;
    }
  }

  if (e.keyCode == 38) {
    if (
      grid[(PlayerI - mazeSize / w, PlayerJ - mazeSize / w)].walls[2] == false
    ) {
      yPos -= w;
      PlayerI -= mazeSize / w;
      PlayerJ -= mazeSize / w;
    }
  }

  if (e.keyCode == 39) {
    if (grid[(PlayerI + 1, PlayerJ + 1)].walls[3] == false) {
      xPos += w;
      PlayerJ++;
      PlayerI++;
    }
  }

  if (e.keyCode == 40) {
    if (
      grid[(PlayerI + mazeSize / w, PlayerJ + mazeSize / w)].walls[0] == false
    ) {
      yPos += w;
      PlayerI += mazeSize / w;
      PlayerJ += mazeSize / w;
    }
  }
}

document.onkeydown = move;

var secondaryCanvas = function (s) {
  s.setup = function () {
    var x = s.createCanvas(mazeSize, 100);
    x.parent("secondary");
  };

  s.draw = function () {
    s.background(20);
    s.fill(255);
    s.textSize(25);
    s.text("Health = " + health + " | Level = " + level, 50, 50); 
  };
};

var myp5 = new p5(secondaryCanvas);

function Rdirect() {
  noLoop();

  if (level < maxLevel) {
    level++;
    localStorage.setItem("mazeLevel", level);
    location.reload();
  } else {
    localStorage.removeItem("mazeLevel");
    alert("You beat all 3 levels!");
  }
}
