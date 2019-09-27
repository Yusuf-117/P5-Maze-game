//Bullet class
function Bullet(x,y,d){
	// bullet properties
	this.x = x;
	this.y = y;

//bullet show function
	this.show = function(){
		noStroke();
		fill(50,0,200);
		ellipse(this.x, this.y, 16, 16);
	}

//bullet move function
	this.move = function(){
		if (d == "up") {
			this.y = this.y - 5;
		}
		else if (d == "down"){
			this.y = this.y + 5;
		}
		else if (d == "left"){
			this.x = this.x - 5;
		}
		else if (d == "right"){
			this.x = this.x + 5;
		}


	}
}



//Enemy Class
function Enemy(id)
{
	//Enemy properties
	var rnd = Math.floor(Math.random() * mazeSize);
	this.x = rnd;
	this.y = rnd;
	this.id = id;

//Enemy generate function
	this.genE = function()
	{
		fill(255,0,0,255);
		rect(this.x, this.y,w,w);
	}
	this.move = function(){
		for (var i = 0; i < enemies.length; i++) {
			if (enemies[i].id != this.id) 
			{
				if (dist(enemies[i].x, enemies[i].y, this.x, this.y) < w){
					this.y += w*2;
				}
			}
		}

	}   
}

//Ammo class
function Ammo(){
	//Ammo properties
	var rnd = Math.floor(Math.random() * mazeSize);
	this.x = rnd;
	this.y = rnd;

	//Ammow Show function
	this.show = function() 
	{
		fill(0,0,255,255);
		rect(this.x, this.y, w, w);
	}
}