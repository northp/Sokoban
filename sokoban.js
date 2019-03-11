"use strict";


var randomNumber; // variable to store a random board number
var board; // call the function to create the board displayed on the page. Store in variable board
var boardSnapshot; // a snapshot of the original board to remember where the victory points are
var currentIndex; // run the function to get the players current position and store it in variable currentIndex
var numberOfVictoryPoints; // variable to hold total number of victory points. 
var victoryPointsCovered; // variable to compare how many barrels are on victory points. Set to zero on initialise.

// call the funtion to initialise the board
initialise();

// Using canvas to display a graphical representation of the board
var canvas = document.getElementById('canvas');
var contxt = canvas.getContext('2d');

// create new variables for each image
var empty = new Image();
var wall = new Image();
var player = new Image();
var victory_point = new Image();
var barrel = new Image();

// assign images to src for respective images
empty.src = 'Images/empty.png';
wall.src = 'Images/wall.png';
player.src = 'Images/player.png';
victory_point.src = 'Images/victory_point.png';
barrel.src = 'Images/barrel.png';

// set the x and y axis start position for drawing the board to 0
var xPosition = 0;
var yPosition = 0;

// only display the graphical board when the all page elements fully load
window.onload = displayColour;


// a function to initialise the game
function initialise(){
	
	// enable player moved by keyboard upon initialisation
	$(document).ready( function () {
		$(window).on("keydown", playerInput);
	} );
	
	randomNumber = randomNumberGenerator();
	display();
}

// a function to create the board that will be displayed (this is the array that will be displayed by the canvas function)
function display(){
	board = makeDisplay();
	boardSnapshot = makeDisplay();
	rebuildMap();
	currentIndex = getCurrentIndex();
	numberOfVictoryPoints=0;
	getNumberOfVictoryPoints();
	victoryPointsCovered = 0;
	$("#title").text("Sokoban!");
	$("#prompt").text("Use the arrow keys to move. Move grey barrels to red victory points to win!");
	$("#restart").text("Press 'ENTER' to load another level. Press 'r' to restart this level.");
}


// a function similar to initialise, except it restarts the current level (without randomising another)
function restart(){
	
	$(document).ready( function () {
		$(window).on("keydown", playerInput);
	} );
	
	display();
}


// create a function to randomise a number between 1 and 6 (for 6 different sokoban levels) which is not the same as the last randomised number. 
//Apply this number to makeDisplay for board and boardSnapshot
function randomNumberGenerator(){
	var compareNumber = Math.floor(Math.random()*6+1);
	while(compareNumber == randomNumber){
		randomNumberGenerator;
		compareNumber = Math.floor(Math.random()*6+1);
	}		
	return compareNumber;
}

// Appendix for indexes:

// "0" = wall
// "p" = player
// " " = empty space
// "#" = barrel
// "x" = victory spot
// "_" = failure spot


// function to return a board based on a random number, so game is different every time
function makeDisplay(){
	if(randomNumber == 1){
			return [
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "_", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "_", "_", "0", "_", "0", "0", "0" ],
  [ "0", "x", " ", " ", " ", "p", " ", "_", "_", "0" ],
  [ "0", " ", " ", " ", " ", " ", " ", " ", "0", "0" ],
  [ "0", "_", " ", " ", "#", " ", " ", "_", "0", "0" ],
  [ "0", "0", "_", " ", " ", " ", "_", "0", "0", "0" ],
  [ "0", "0", "0", "_", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ]
];
	}else if (randomNumber == 2){
			return [
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "_", "0", "0" ],
  [ "0", "_", " ", "_", "0", "0", "_", "_", "0", "0" ],
  [ "0", "#", " ", "p", " ", " ", "_", "_", "0", "0" ],
  [ "0", "x", " ", " ", "#", " ", "_", "0", "0", "0" ],
  [ "0", "0", "0", "0", "_", "x", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ]
];
	}else if (randomNumber == 3){
			return [
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "x", " ", "#", "_", "_", "0", "_", "0", "0" ],
  [ "0", "x", " ", " ", "_", "0", "0", "_", "0", "0" ],
  [ "0", " ", "#", "p", "0", "0", "_", "_", "0", "0" ],
  [ "0", " ", " ", " ", " ", " ", "#", " ", "0", "0" ],
  [ "0", "_", "x", " ", "#", " ", " ", " ", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "x", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ]
];
	}else if (randomNumber == 4){
			return [
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "_", " ", " ", " ", "_", "0", "0", "0", "0" ],
  [ "0", " ", " ", " ", " ", " ", "0", "0", "0", "0" ],
  [ "0", " ", " ", "x", "#", "p", "0", "0", "0", "0" ],
  [ "0", " ", " ", "x", "#", " ", "0", "0", "0", "0" ],
  [ "0", "_", " ", " ", " ", "_", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ]
];
	}else if (randomNumber == 5){
			return [
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "_", " ", " ", " ", "p", "_", "0", "0" ],
  [ "0", "0", " ", "#", "#", " ", "#", " ", "0", "0" ],
  [ "0", "0", " ", " ", " ", " ", "#", "_", "0", "0" ],
  [ "0", "0", "x", "x", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "x", "x", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ]
];
	}else{
			return [
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "x", "x", " ", " ", " ", " ", "_", "0", "0" ],
  [ "0", " ", "0", "0", " ", " ", " ", " ", "0", "0" ],
  [ "0", " ", "0", "x", "#", "p", " ", " ", "0", "0" ],
  [ "0", " ", " ", " ", "#", " ", " ", " ", "0", "0" ],
  [ "0", "_", " ", " ", " ", "#", " ", "_", "0", "0" ],
  [ "0", "0", "0", "0", "_", "_", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ],
  [ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ]
];
	}
}



// a function to redisplay victory points on the board array if a barrel or player moves off them
function redisplayVictoryPoints(){
	for(var i in boardSnapshot){
		for(var j in boardSnapshot[i]){
			if((boardSnapshot[i][j] == "x") && (board[i][j] == " ")){
				board[i][j] = "x";
			}
		}
	}
}

//function to return total number of victory points. Only needs to run once (at the start of each intialisation or restart).
function getNumberOfVictoryPoints(){
	for(var i in boardSnapshot){
		for(var j in boardSnapshot[i]){
			if(boardSnapshot[i][j] == "x"){
				numberOfVictoryPoints++;
			}
		}
	}
}



// a function that runs as soon as the player wins or a new level is selected and reinitialises the game
function gameOver(){
	// empty the board
	board = [];
	// disable listener for button pressing (to prevent the playerInput function from being called)
	$(document).ready( function () {
		$(window).off("keydown", playerInput);
	} );
			
	// reinitialise board
	setTimeout(function(){
		initialise();
		displayColour();
	}, 4000);
}

// this function is called if the player wants to restart the level
function gameRestart(){
	$(document).ready( function () {
			$(window).off("keydown", playerInput);
		} );
			
		// reinitialise board
		setTimeout(function(){
			restart();
			displayColour();
		}, 4000);
}

// function to compare how many barrels are on victory points. Should be calculated after every player move.
// this calculates if the game is still in play, if the player has won, or moved barrels into immovable positions.
function victory(){
	victoryPointsCovered=0;
	for(var i in board){
		for(var j in board[i]){
			if((boardSnapshot[i][j] == "x") && (board[i][j] == "#")){
				victoryPointsCovered = victoryPointsCovered + 1;
			}else if((boardSnapshot[i][j] == "_") && (board[i][j] == "#")){
				// template: if barrel is in immovable psotion, player loses.
				$("#prompt").text("You lose :( It's impossible to move that barrel out of the corner! Restarting level...");
				$("#restart").empty();
				//gameOver();
				gameRestart();
				break;
			}
		}
	}
		// victory condition:
		if(victoryPointsCovered == numberOfVictoryPoints){
			$("#prompt").text("Congratulations! You win! The next level will load shortly...");
			$("#restart").empty();
			gameOver();
		}
}


// a function to find the index of the player in the board array.
function getCurrentIndex(){
	for(var i=0; i<board.length; i++){
		for(var j=0; j<board[i].length; j++){
			if(board[i][j] == "p"){
				var currentIndex = [Number(i), Number(j)];
				return currentIndex;
			}
		}
	}
}


// a function to rebuild the board
function rebuildMap(){
	
	// get the players current index
	currentIndex = getCurrentIndex();
	
	for (var x in board) {
		for (var y in board[x] ) {
			var cell = document.createElement("td");
		}
	}
}

// a function to divide the canvas and paint the board with images based on index values
function displayColour(){
	
	// empty the canvas
	contxt.clearRect(0,0,500,500);
	
	// paint the board on screen
	for (var i=0; i< board.length; i++){
		for(var j=0; j < board[i].length; j++){
			if(board[i][j] == " " || board[i][j] == "_"){
				contxt.drawImage(empty, xPosition, yPosition, 50,50);
			}else if(board[i][j] == "0"){
				contxt.drawImage(wall, xPosition, yPosition, 50,50);
			}else if(board[i][j] == "p"){
				contxt.drawImage(player, xPosition, yPosition, 50,50);
			}else if(board[i][j] == "#"){
				contxt.drawImage(barrel, xPosition, yPosition, 50,50);
			}else if (board[i][j] == "x"){
				contxt.drawImage(victory_point, xPosition, yPosition, 50,50);
			}
			xPosition = xPosition + 50;
		}
		yPosition = yPosition + 50;
		xPosition = 0;
	}
	yPosition = 0;
}

// Appendix for indexes:

// "0" = wall
// "p" = player
// " " = empty space
// "#" = barrel
// "x" = victory spot
// "_" = failure spot

// a function to calculate player moves, and move the player if a move is possible, based on current index of the player and the index of surrounding objects.
// The appendix above references the index variables.
// this function also restarts the game or loads a new level.
function playerInput(input){
	if((input.key=="ArrowLeft") && (board[currentIndex[0]][currentIndex[1]-1] != "0") && (board[currentIndex[0]][currentIndex[1]-1] != "#")) {
		// move player to left open space
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]][currentIndex[1]-1] = "p";
	}else if((input.key=="ArrowLeft") && (board[currentIndex[0]][currentIndex[1]-1] == "#") && (board[currentIndex[0]][currentIndex[1]-2] != "#") && (board[currentIndex[0]][currentIndex[1]-2] != "0") ) {
		// move barrel to the left
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]][currentIndex[1]-1] = "p";
		board[currentIndex[0]][currentIndex[1]-2] = "#";
	}else if((input.key=="ArrowLeft") && (board[currentIndex[0]][currentIndex[1]-1] == "#") && (board[currentIndex[0]][currentIndex[1]-2] == "x")) {
		// move barrel to the left and place on victory spot
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]][currentIndex[1]-1] = "p";
		board[currentIndex[0]][currentIndex[1]-2] = "#";
	}else if((input.key=="ArrowUp") && (board[currentIndex[0]-1][currentIndex[1]] != "0") && (board[currentIndex[0]-1][currentIndex[1]] != "#")) {
		// move player up to open space
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]-1][currentIndex[1]] = "p";
	}else if((input.key=="ArrowUp") && (board[currentIndex[0]-1][currentIndex[1]] == "#") && (board[currentIndex[0]-2][currentIndex[1]] != "#") && (board[currentIndex[0]-2][currentIndex[1]] != "0")) {
		// move barrel up
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]-1][currentIndex[1]] = "p";
		board[currentIndex[0]-2][currentIndex[1]] = "#";
	}else if((input.key=="ArrowUp") && (board[currentIndex[0]-1][currentIndex[1]] == "#") && (board[currentIndex[0]-2][currentIndex[1]] == "x")) {
		// move barrel up and place on victory spot
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]-1][currentIndex[1]] = "p";
		board[currentIndex[0]-2][currentIndex[1]] = "#";
	}else if((input.key=="ArrowRight") && (board[currentIndex[0]][currentIndex[1]+1] != "0") && (board[currentIndex[0]][currentIndex[1]+1] != "#")) {
		// move player right to open space
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]][currentIndex[1]+1] = "p";
	}else if((input.key=="ArrowRight") && (board[currentIndex[0]][currentIndex[1]+1] == "#") && (board[currentIndex[0]][currentIndex[1]+2] != "#") && (board[currentIndex[0]][currentIndex[1]+2] != "0")) {
		// move barrel right
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]][currentIndex[1]+1] = "p";
		board[currentIndex[0]][currentIndex[1]+2] = "#";
	}else if((input.key=="ArrowRight") && (board[currentIndex[0]][currentIndex[1]+1] == "#") && (board[currentIndex[0]][currentIndex[1]+2] == "x")) {
		// move barrel right and place on victory spot
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]][currentIndex[1]+1] = "p";
		board[currentIndex[0]][currentIndex[1]+2] = "#";
	}else if((input.key=="ArrowDown") && (board[currentIndex[0]+1][currentIndex[1]] != "0") && (board[currentIndex[0]+1][currentIndex[1]] != "#")) {
		// move player down to open space
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]+1][currentIndex[1]] = "p";
	}else if((input.key=="ArrowDown") && (board[currentIndex[0]+1][currentIndex[1]] == "#") && (board[currentIndex[0]+2][currentIndex[1]] != "#") && (board[currentIndex[0]+2][currentIndex[1]] != "0")) {
		// move barrel down
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]+1][currentIndex[1]] = "p";
		board[currentIndex[0]+2][currentIndex[1]] = "#";
	}else if((input.key=="ArrowDown") && (board[currentIndex[0]+1][currentIndex[1]] == "#") && (board[currentIndex[0]+2][currentIndex[1]] == "x")) {
		// move barrel down and place on victory spot
		board[currentIndex[0]][currentIndex[1]] = " ";
		board[currentIndex[0]+1][currentIndex[1]] = "p";
		board[currentIndex[0]+2][currentIndex[1]] = "#";
	} else if(input.key == "Enter"){ // start a new level by pressing enter
		$("#prompt").text("New level starting...");
		$("#restart").empty();
		gameOver();
		return; // break out of if statement
	} else if(input.key == "r"){ // restart the current level by pressing r
		$("#prompt").text("Restarting this level...");
		$("#restart").empty();
		gameRestart();
		return;
	}
	
	redisplayVictoryPoints();
	rebuildMap();
	displayColour();
	victory();
}

