//Canvas properties 
var w = 20;
var xPos = 0;
var yPos = 0;
var mazeSize = 600;
var looping = false;

//Arrays
var magg = [];
var enemies = [];
var bullets = [];

//Player properties
var health = 10;
var ammo = 30;
var wave = 1;
var direction = "up";

//setup function
function setup(){
	//Setup the canvas, generate Ammo and enemies
	var x = createCanvas(mazeSize, mazeSize);
	x.parent("main");
	genAmmo();

for (var i= 0; i < 2; i++) 
{
	var e = new Enemy(i);
	enemies.push(e);
}
noLoop();
}

//Draw function
function draw(){
//Set the background properties of the canvas
//Generate enemies and ammo/health
//constanlty check the properties of the player e.g. if health hits 0, player position etc.
	background(51);
	fill(0,255,0,255)
	var player = rect(xPos, yPos,w, w);
	if (health < 1){
		noLoop();
		calcScore();

	}
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].show();
		bullets[i].move();
	}

	for (var i = 0; i < magg.length; i++) {
		if (magg[i] !== undefined && magg[i] !== null) 
		{
			magg[i].show();
		}
	}

//Make enemies follow player
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].genE();
		enemies[i].move();
		x = enemies[i].x;
		y = enemies[i].y;

		if (xPos < x) 
		{
			enemies[i].x = x-1;
		}
		if (xPos > x)
		{
			enemies[i].x = x+1;

		}

		if (yPos < y) 
		{
			enemies[i].y = y-1;
		}
		if (yPos > y)
		{
			enemies[i].y = y+1;
		}
	}

//COLLISION DETECTIONS
if (enemies.length > 0){
	for (var e = 0; e <enemies.length; e++) {
		if (enemies[e] !== undefined && enemies[e] !== null){
			if (dist(xPos, yPos, enemies[e].x, enemies[e].y) < w){
				health--;
				enemies[e].x += 100;
				enemies[e].y += 100;
			}
		}
		for (var b = 0; b < bullets.length; b++){
			if (enemies[e] !== undefined && enemies[e] !== null) 
			{
				if (dist(bullets[b].x, bullets[b].y, enemies[e].x, enemies[e].y) < w){
					enemies.splice(e,1);
					bullets.splice(b,1);
				}
			}
		}
	}
}

if (magg.length > 0){
	for (var i = 0; i < mag.length; i++) {
		if (magg[i] !== undefined && magg[i] !== null) {
			if (dist(xPos, yPos, magg[i].x, magg[i].y) < w){
				magg.splice(i,1);
				ammo += 10;
				health += 1;
			}
		}
	}
}

//if the player reaches 20 waves, and all enemies are dead calculate the score
if (wave >= 20 && enemies.length <= 0){
	calcScore();
	noLoop();
}



}
//generate ammo function, called every 5 seconds dpending on how mnay are on screen
function genAmmo(){
	if (magg.length < 3){
		var a = new Ammo();
		magg.push(a);
	}
}
//increase wave and enemies function, called every 15 seconds.
function waveUp(){
	wave++;
	for (var i= 0; i < wave * 2; i++) 
	{
		var e = new Enemy(i);
		enemies.push(e);
	}
}
//move function, controls movements of the player
function move(e){
	if (looping){

		if (e.keyCode==32) 
		{
			if (ammo != 0) 
			{
				var bullet = new Bullet(xPos + (w/2), yPos + (w/2),direction);
				bullets.push(bullet);
				ammo-= 1;
			}
		}

		if (e.keyCode==37) {
			if (xPos != 0) 
			{
				direction = "left";
				xPos -= w;
			}

		}


		if (e.keyCode==38) {
			if (yPos != 0)
			{
				direction = "up";
				yPos -= w;
			}
		}


		if (e.keyCode==39) {
			if (xPos != mazeSize -w)
			{
				direction = "right";
				xPos += w;
			}
		}


		if (e.keyCode==40) {
			if (yPos != mazeSize -w)
			{
				direction = "down";
				yPos += w;
			}
		}
	}
}
//call the move function (add event listener)
document.onkeydown = move;

//Creater secondary canvas 
var secondaryCanvas = function(s){
	//Secondary canvas setup function
	s.setup = function(){
		var x = s.createCanvas(mazeSize,100);
		x.parent("secondary");
	}
	//Secondary canvas draw function, display player properties
	s.draw = function(){
		s.background(20);
		s.fill(255);
		s.textSize(25);
		s.text('Health = ' + health, 50, 50);
		s.text('Ammo = ' + ammo, 250, 50);
		s.text('Wave = ' + wave, 150, 90);
	}
}
//Add/draw the secondary canvas
var myp5 = new p5(secondaryCanvas);


function mouseClicked() {
  //here we check if the mouse is over the canvas element when it's clicked
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {  
  	if (looping == false) {
    	//resume
    	loop();
    	looping = true;
    	ammoTimer = setInterval(genAmmo,5000);
    	waveTimer = setInterval(waveUp,15000);

    }
    else{
    	//pause
    	noLoop();
    	looping = false;
    	clearInterval(ammoTimer);
    	clearInterval(waveTimer);
    }
}
}

//calculate the score of the player when they die or complete the waves
function calcScore(){
	var x = parseInt(getCookie("score"));
	x = (x + parseInt(health)) * 2;
	x = x + parseInt(ammo);
	document.cookie = "score=" + parseInt(x);
	document.cookie = "stage=" + 3; 
	window.location.href = "results.php"; 

}

//make a function to get a specific cookie by passing in their name as this type of funciton does not exist in vanilla JavaScript of P5.js
function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}
