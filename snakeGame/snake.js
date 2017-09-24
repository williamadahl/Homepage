//Settings and start pos for snake
var snakeX = 2;
var snakeY = 2;
var height = 35;
var width = 35;
var interval = 100;
var increment = 2;
var length = 0;
var score = 0;

//Game variables snake and fruit
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; //up = 0, down = -1, left = 1, right = 2
var int;

/**
 * entry of game
**/
function run(){
	init();
	int = setInterval(gameLoop, interval);
}

function init(){
	createMap();
	createSnake();
	createFruit();
}

/*
 * Generate map for game
 */ 

function createMap(){
	document.write("<table>");

	for(var y = 0; y < height; y++){
		document.write("<tr>");
		for(var x = 0; x < width; x++){
			if(x == 0 || x == width-1 || y == 0 || y == height-1){
			// if this is true we make walls
				document.write("<td class='wall' id= '"+ x + "-"+ y +"'></td>");
			}else{
				document.write("<td class='transparent' id= '"+ x + "-"+ y +"'></td>");
			}
		}
		document.write("</tr>");
	}
	document.write("</table>");
}

function createSnake(){
	set(snakeX, snakeY, "snake");
}

function get(x,y){
	return document.getElementById(x+"-"+y);
}

function set(x, y, value){
	if(x != null && y != null)
		get(x,y).setAttribute("class", value);
}

function rand(min, max){
	return Math.floor(Math.random()*(max-min)+min);
}

function getType(x,y){
	return get(x,y).getAttribute("class");
}

function createFruit(){
	var found = false;
	while(!found && (length < (width -2)*(height-2)+1)){
		var fruitX = rand(1, width-1);
		var fruitY = rand(1, height-1);
		if(getType(fruitX, fruitY) == "transparent"){   // create fruit if its a unoccupied space 
			found = true;
		}
	}
	set(fruitX, fruitY, "fruit");
	fX = fruitX;
	fY = fruitY;
}

window.addEventListener("keypress", function key(event){
	
	//if key is W set direction to up
	var key = event.keyCode || event.which;
	if(direction != -1 && (key == 119 || key == 87))
		direction = 0;
	//if the key is S direction is down
	else if(direction != 0 && (key == 115 || key == 83))
		direction = -1;
	//if the key is A the direction is left
	else if(direction !=  2 && (key == 97 || key == 65))
		direction = 1;
	//if the key is D the direction is right 
	else if(direction != 1 && (key == 100 || key == 68))
		direction = 2;
	if(!running)
		running = true;
	// space is pause button
	else if(key == 32)
		running = false;
});

function gameLoop(){
	if(running && !gameOver){
		update();
	}else if(gameOver){	
		clearInterval(int);
	}
}

function update(){
	set(fX, fY, "fruit");
	updateTail();
	set(tailX[length], tailY[length], "transparent");
	if(direction == 0)
		snakeY--;
	else if(direction == -1)
		snakeY++;
	else if(direction == 1)
		snakeX--;
	else if(direction == 2)
		snakeX++;
	set(snakeX, snakeY, "snake");
	for(var i = tailX.length-1; i >=0; i--){
		if(snakeX == tailX[i] && snakeY == tailY[i]){
			gameOver = true;
			alert("Game Over");
			break;
		}
	}	

	if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1){
		gameOver = true; 
	}
	else if(snakeX == fX && snakeY == fY){
		score += 10;
		createFruit();
		length += increment;
		
	}
	document.getElementById("score").innerHTML = "Score: "+ score;	
}

function updateTail(){
	for(var i = length; i > 0; i--){
		tailX[i] = tailX[i-1];
		tailY[i] = tailY[i-1];
	}	
	tailX[0] = snakeX;
	tailY[0] = snakeY;
}

run();














