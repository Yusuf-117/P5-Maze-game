//CELL CLASS
function Cell(i, j) 
{
	//Cell properties
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];
	this.visited = false;

	//cell check neighbors function
	this.checkNeighbors = function() 
	{
		var neighbors = [];

		var top    = grid[index(i, j -1)];
		var right  = grid[index(i+1, j)];
		var bottom = grid[index(i, j+1)];
		var left   = grid[index(i-1, j)];

		if (top && !top.visited) 
		{
			neighbors.push(top);
		}
		if (right && !right.visited) 
		{
			neighbors.push(right);
		}
		if (bottom && !bottom.visited) 
		{
			neighbors.push(bottom);
		}
		if (left && !left.visited) 
		{
			neighbors.push(left);
		}

		if (neighbors.length > 0) 
		{
			var r = floor(random(0, neighbors.length));
			return neighbors[r];
		} 
		else 
		{
			return undefined;
		}


	}
	//cell highlight function
	this.highlight = function() 
	{
		var x = this.i*w;
		var y = this.j*w;
		noStroke();
		fill(0, 0, 255, 100);
		rect(x, y, w, w);

	}

	//cell show function
	this.show = function()
	{
		var x = this.i*w;
		var y = this.j*w;
		stroke(255);
		if (this.walls[0]) 
		{
			line(x    , y    , x + w, y);
		}
		if (this.walls[1])
		{
			line(x + w, y    , x + w, y + w);
		}
		if (this.walls[2]) 
		{
			line(x + w, y + w, x    , y + w);
		}
		if (this.walls[3]) 
		{
			line(x    , y + w, x    , y);
		}

		if (this.visited) 
		{
			noStroke();
			fill(0, 0, 0, 100);
			rect(x, y, w, w);
		}
	}
}

//ENEMY CLASS
function enemy() 
{
	//enemy properties
	var everyCell = mazeSize/w * mazeSize/w;

	var rnd = Math.floor(Math.random() * everyCell);

	this.enemyI = grid[rnd,rnd].i;
	this.enemyJ = grid[rnd,rnd].j;
	//Enemy generate function
	this.genEnemy = function() 
	{
		image(cones,this.enemyI*w +5, this.enemyJ*w + 5,w-10, w-10);

	}

}

//Health Class
function heal() 
{
	//health properties
	var everyCell = mazeSize/w * mazeSize/w;
	var rnd = Math.floor(Math.random() * everyCell);
	this.healthI = grid[rnd,rnd].i;
	this.healthJ = grid[rnd,rnd].j;

//Ensure that the health cannot be generated at the spame spot as an enemy
for (var i = 0; i < enemies.length; i++) 
{

	I = enemies[i].EnemyI;
	J = enemies[i].EnemyJ;
	if (this.healthI == I && this.healthJ == J) 
	{
		var rnd = Math.floor(Math.random() * everyCell);
		this.healthI = grid[rnd,rnd].i;
		this.healthJ = grid[rnd,rnd].j;
	}
}

//Health generator/ drawing
this.genHealth = function() 
{

	image(heart,this.healthI*w +5, this.healthJ*w + 5,w-10, w-10);

}

}

//maze Generator class 
function gener(num){
	//maze Generator properties
	var current = grid[num];
	this.stack = [];
	//maze Generator generate function	
	this.generGen = function(){
		current.visited = true;
		current.highlight();
  			// STEP 1
  			var next = current.checkNeighbors();
  			if (next){
  				next.visited = true;

    		// STEP 2
    		this.stack.push(current);

    		// STEP 3
    		removeWalls(current, next);

    		// STEP 4
    		current = next;
    	} 
    	else if (this.stack.length > 0){
    		current = this.stack.pop();
    	}
    }

}