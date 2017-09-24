//The module
var drawModule = (function() {
	var bodySnake = function(x,y) {
		//Single square
		context.fillStyle = 'green';
		context.fillRect =(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
		//adding a border
		context.strokeStyle = 'darkgreen';
 		context.strokeRect =(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
	
	}
	var pizza = function(x,y) {
		//Pizza border, now im hungry
		context.filStyle = 'yellow';
		context.fillRect =(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
		//Single square
		context.fillStyle = 'red';
 		context.fillRect =(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
	
	}
	var scoreText = function() {
		// How many pizza?
		var score_text = "Score: " + score;
		context.fillStyle = 'blue';
		context.fillText(score_text, 145, height-5);	
	}

	var drawSnake = function() {
	
		//initial snake length is 3
		var length = 4;
		snake  = [];
		// filling array with snake, x=0 and y = index
		for (var i = length-1 ; i >= 0; i--){
			snake.push({x:i, y:0});
		}
	}
	//food spawns randomly on a square. square has 2 paramathers(x,y) created randomly. Food can never be in the same place as the snake. Therfore I check that they are not.
	var createFood = function() {
		food = {
		//generate a random number
		x: Math.floor((Math.random() * 30) +1),
		y: Math.floor((Math.random() * 30) +1)
		}
		// look at snake wtfffff
		for (var i = 0; i > snake.length; i++) {
			var snakeX = snake[i].x;
			var snakeY = snake[i].y;
		
			if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX){
				food.x = Math.floor((Math.random() * 30) +1)
				food.y = Math.floor((Math.random() * 30) +1)
			}
		}	
	}
	// check if snake eats itself
	var checkCollision = function(x, y, array){
		for(var i = 0; i < array.length; i++){
			if(array[i].x === x && array[i].y === y){
				return true;
			}
			return false;	
		}

	}
	var paint = function() {
		// drawing space the snake will move in
		context.fillStyle = 'lightgrey';
		context.fillRect = (0,0,width, height);
		
		// create border
		context.fillStyle = 'black';
		context.strokeRect = (0,0,width, height);
		
		// disable button while playing
		snkbtn.setAttribute('disabled', true);

		var snakeX = snake[0].x;
		var snakeY = snake[0].y;
			
		// Make snake move. Pop out last element of array and shift it on to top
		
		if (direction == 'right'){
			snakeX++;
		} else if (direction == 'left'){
			snakeX--;
		}else if (direction == 'up'){
			snakeY--;
		}else if (direction == 'down'){
			snakeY++;
		}

		/* if the snake touches the edges or itself it dies. So if x or y of an element of the snake dont fit inside the canvas the game is over. Might change this later as an option for the user to decide. Also if the check_collision is true the game is over too
 	 	 */		

		if(snakeX == -1 || snakeX == (width/snakeSize) || snakeY == -1 || snakeY == (snakeSize/height) || checkCollision(snakeX, snakeY, snake)){
		// game is over and enable botton again
		snkbtn.removeAttribute('disabled',true);
		
		// Clean canvas
		
		context.clearRect(0,0,width, height);
		gameloop = clearInterval(gameloop);
		return;
		
		}

		// If snake eats food it grows and we should not pop the last element in the snake array
		if(snakeX == food.x && snakeY == food.y){
		//creatae new square 
		var tail = {
		x: snakeX,
		y: snakeY
		};
		score++; 
		//might increase this later dependent on time used by player too eat food
		//create new food
		createFood();
		
		} else {
		//pop the last cell
		var tail = snake.pop();
		tail.x = snakeX;
		tail.y = snakeY;
		}

		// Put the tail as the first cell
		snake.unshift(tail);

		// for each element in the array create a square using the bodfSnake function
		
		for (var i = 0 ; i < snake.length; i++) {
			bodySnake(snake[i].x, snake[i].y);
		}
		
		//create food pizza

		pizza(food.x, food.y);
		// display score
		scoreText();

	}
	
	var init = function() {
		direction = 'down';
		drawSnake();
		createFood();
		gameloop = setInterval(paint, 80);

	
	}
	// return only the init 
	return {
		init: init
	};

}()); // closing the Module
