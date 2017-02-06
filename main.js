/*global Image*/
var PLAYER1,PLAYER2,PLAYERS = [PLAYER1 = [0, 0],PLAYER2=[4,4]];
var HOUSE1,HOUSE2,HOUSES=[HOUSE1=PLAYER1.slice(),HOUSE2=PLAYER2.slice()];
var W=5, H=5;
var CHEESES = [[1, 1+Math.floor(Math.random()*3)],[3, 1+Math.floor(Math.random()*3)]];
var hasCheese = [0,0];
var RIGHT = [1,0], LEFT = [-1,0], DOWN = [0,1], UP = [0,-1];
var turn = 0;
// TODO pick up items by indexing
//var INVENTORY1, INVENTORY2, INVENTORY = [INVENTORY1 = ["red", "blue", "green", "yellow"], INVENTORY2 =["green", "red", "yellow", "blue"]];
//var EQUIP1, EQUIP2, EQUIP = [EQUIP1 = ["empty"], EQUIP2 = ["empty"]];
//var colors = ["red", "blue", "green", "yellow"];
//var DOOR = {
// 	position: [3,2],
// 	color: colors[Math.floor(Math.random()*3)],
// 	open: false
// };
// var gamestart = function gamestart() {
// 	console.log("Find the hidden cheese in the maze before the other player!");
// 	console.log("Type MOVE(player, direction) to move your character");
// 	console.log("Type PICKUPCHEESE() to pick up the cheese")
// 	//console.log("Type SHOWINVENTORY() to see your inventory")
// }
// function PLAYERTURN(direction) {
// 	MOVE(PLAYERS[turn], direction)
// 	console.log("Player " + (turn + 1) + " moved to " +  PLAYERS[turn])	//changeplayerturn()
// 	//if (CollisionBetween(PLAYERS[turn], DOOR.position) && (DOOR.open ==false)) {
// 		//console.log("Player " + turn + " is blocked by a closed " + DOOR.color + " door")
// 		//console.log("USE(INVENTORY[], DOOR.color) the inventory slot containing the matching key to pass through")
// 		//Need to prompt player for key, otherwise player must move back to original square
// 		//MOVE(PLAYERS[turn], direction, true)
// 		//return
// 	//}
// 	if (CollisionBetween(PLAYERS[turn],CHEESE))
// 		console.log("Player " + (turn + 1) +" found the cheese!");
// 	if (GotHomeWithCheese()) {
// 		console.log("Player " + (turn + 1) + " got home with the cheese!")
// 		console.log("Player " + (turn + 1) + " is the winner!")
// 		return
// 	}
// 	turn = flipturn();
// 	console.log("It is now Player " + (turn + 1) + "'s turn" )
// }
// TODO show a title that says to click to start player's turn
// and implement it and stuff so it can click n stuff

var flipturn = function flipturn() { return turn?0:1; };
var MOVE = function MOVE(PLAYER, direction, backwards) {
	if (backwards) {
		// happens directly since only we should use it internally
		PLAYER[0] -= direction[0];
		PLAYER[1] -= direction[1];
	} else {
		var TESTPLAYER = [PLAYER[0] + direction[0],PLAYER[1] + direction[1]];
		// check between new position and other player
		if (CollisionBetween(TESTPLAYER,PLAYERS[flipturn()])) {
			title = "Cannot move there, space is occupied";
			preemptitle(1000);
		} else if (TESTPLAYER[0] < 0 || TESTPLAYER[0] > 4 || TESTPLAYER[1] < 0 || TESTPLAYER[1] > 4) {
			title = "Cannot move there, out of bounds";
			preemptitle(1000);
		} else {
			PLAYER[0] = TESTPLAYER[0];
			PLAYER[1] = TESTPLAYER[1];
		}
	}
};
var PICKUPCHEESE = function PICKUPCHEESE() {
	for (var i=0;i<CHEESES.length;i++) {
		if (CollisionBetween(PLAYERS[turn],CHEESES[i])) {
			hasCheese[turn]++;
//			console.log("Player " + (turn + 1) + " has picked up the cheese!")
//			console.log("Player " + (turn +1) + " wins if they return home with the cheese!")
//			console.log("Player " + (turn?2:1 + 1) + " must tag Player " + (turn + 1) + " to make them drop the cheese")
			return true;
		} 	
	}
//	console.log("Player " + (turn +1) + " did not find the cheese")
	return false;
};
var GotHomeWithCheese = function GotHomeWithCheese() {
	return (hasCheese[turn]) && (CollisionBetween(PLAYERS[turn],HOUSES[turn]));
};
var CollisionBetween = function CollisionBetween(OB1,OB2) {
	return (OB1[0] == OB2[0]) && (OB1[1] == OB2[1]);
};

//function SHOWINVENTORY(){
	//console.log("Player " + (turn + 1) + "'s inventory has: ");
	//console.log(INVENTORY[turn]);
	//if (PLAYERS[turn] == CHEESEOWNER){
		//console.log("Player " + (turn +1) + " has the cheese")
	//}
//}

var canvas = document.getElementById("BOARD"),ctx = canvas.getContext('2d');
var HRATIO = canvas.height/H, WRATIO = canvas.width/W;
var timeperturn = 30;
var delaytimer = 2500;

var images = {};
function drawImage(imageurl,xy,size,height) {
	if (size === undefined) size = 1;
	var x,y;
	if (height === undefined) {
		x = xy[0]*WRATIO;
		y = xy[1]*HRATIO;
	} else  {
		x = xy[0];
		y = xy[1];
	}
	
	if (images[imageurl] === undefined) {
		var im = new Image();
		if (height === undefined)
			im.onload = function(){ ctx.drawImage(this,x,y,WRATIO*size,HRATIO*size); };
		else 
			im.onload = function(){ ctx.drawImage(this,x,y,size,height); };
		im.src = imageurl;
		images[imageurl] = im;
	} else {
		if (height === undefined)
			ctx.drawImage(images[imageurl],x,y,WRATIO*size,HRATIO*size);
		else 
			ctx.drawImage(images[imageurl],x,y,size,height);
	}
}

var drawCircleText = function drawCircleText(text,x,y,radius){
   var numDegreesPerLetter = Math.PI / text.length;
   ctx.save();
   ctx.font = "20px sans-serif";
   ctx.fillStyle = "white";
   ctx.translate(x,y);
   ctx.rotate(Math.PI);

   for(var i=0;i<text.length;i++){
		ctx.save();
		ctx.translate(radius, 0);
		ctx.translate(10, -10);
		ctx.rotate(1.4);
		ctx.translate(-10, 10);
		ctx.fillText(text[i],0,0);
		ctx.restore();
		ctx.rotate(numDegreesPerLetter);
   }
   ctx.restore();
};

function drawLine(p1,p2) {
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.strokeStyle = "yellow";
	ctx.moveTo(p1[0],p1[1]);
	ctx.lineTo(p2[0],p2[1]);
	ctx.stroke();
}
var XX = 0, YY = 0;
var drawBoard = function drawBoard() {
	//ctx.fillStyle = '#66cc66';
	//ctx.clearRect(0,0,canvas.width,canvas.height);
	drawImage("images/skybackground.png",[XX,0],canvas.width,canvas.height);
	drawImage("images/skybackground.png",[XX-canvas.width,0],canvas.width,canvas.height);
	drawImage("images/background.gif",[YY,0],canvas.width,canvas.height);
	drawImage("images/background.gif",[YY-canvas.width,0],canvas.width,canvas.height);
	if (canvas.width < XX++) XX=0;
	YY+=2;
	if (canvas.width < YY++) YY=0;
	for (var i=1;i<W;i++) drawLine([0,i*HRATIO],[canvas.width,i*HRATIO]);
	for (var i=1;i<H;i++) drawLine([i*WRATIO,0],[i*WRATIO,canvas.height]);
};
var drawPlayers = function drawPlayers() {
	drawImage("images/mouse1.png",PLAYER1);
	drawImage("images/mouse2.png",PLAYER2);
	if (!CollisionBetween(PLAYER1,HOUSE1))
		drawImage("images/house1.png",HOUSE1);
	if (!CollisionBetween(PLAYER2,HOUSE2))
		drawImage("images/house2.png",HOUSE2);
	var x=PLAYERS[turn][0]*WRATIO+WRATIO/2,
		y=PLAYERS[turn][1]*HRATIO+HRATIO*5/8;
	drawCircleText("This Player's Turn",x,y,Math.min(WRATIO,HRATIO)/2);
	//ctx.arc(x,y,Math.min(WRATIO,HRATIO)/2,0,7);
	//ctx.stroke();
};

var title = "";
var text = "";
var drawText = function drawText() {
	if (text) {
		ctx.fillStyle = "rgba(0, 0, 0, .7)";
		ctx.fillRect(100,100,canvas.width-200,canvas.height-200);
		
		ctx.fillStyle = "white";
		ctx.font = "20px sans-serif";
		ctx.fillText(text,100,100+20,canvas.width-200);
	}	
	if (title) {
		ctx.fillStyle = "rgba(255, 255, 255, .7)";
		ctx.fillRect(100,50,canvas.width-200,50);

		ctx.fillStyle = "black";
		ctx.font = "40px sans-serif";
		ctx.fillText(title,100,100-15,canvas.width-200);
	}
	
};

var timestart = 0;
var drawTimer = function drawTimer() {
	if (timestart === 0) return;
	ctx.font = HRATIO/2 + "px sans-serif";
	var dispnum = Math.round(timestart - Date.now()/1e3,2);
	if (dispnum < 0) {
		switchPlayers();
		timestart = 0;
	} else {
		ctx.strokeText(dispnum, canvas.width-WRATIO/2,HRATIO/2,WRATIO/2);
	}
};
var resetTimer = function resetTimer(){
	timestart = Date.now()/1e3 + timeperturn;
};

var clean = function clean() {
	text = "";
	title = "";
};
var cantype = true;
var switchPlayers = function switchPlayers() {
	turn = flipturn();
	preemptitle(3000);
	cantype= false;
	setTimeout(function() {cantype=true;clean();},delaytimer);
};

var draw = function draw() {
	drawBoard();
	drawPlayers();
	drawText();
	drawTimer();
	window.requestAnimationFrame(draw);
};

var moveregex = /mouse.move.{2,5}(?=\(\))/;
var cheeseregex = /mouse.checkForCheese()/;
var submit = function submit() {
	var savetext = text;
	text = "";
	title = "";

	var match;
	if (match = moveregex.exec(savetext)) {
		var dir = match[0].replace(/^mouse.move/,'');
		switch(dir) {
			case "Up":    MOVE(PLAYERS[turn],UP);   break;
			case "Down":  MOVE(PLAYERS[turn],DOWN); break;
			case "Left":  MOVE(PLAYERS[turn],LEFT); break;
			case "Right": MOVE(PLAYERS[turn],RIGHT);break;
			default: title = "No function move"+dir+"()"; return;
		}
		if (GotHomeWithCheese()) {
			console.log("!!");
			title = "YOUVE WON!!!!";
			timestart = 0;
		} else {
			if (levels[turn][0] < 3) levels[turn][0]++;
			preemptitle(1000);
		}
	} else if (match = cheeseregex.exec(savetext)) {
		if (PICKUPCHEESE()) {
			title = "You Found Cheese!!";
			levels[turn][0]=5;
		} else {
			if (levels[turn][0]<5) levels[turn][0]=4;
			title = "No Cheese found :c";
		}
		preemptitle(1500);
	} else {
		title = "SyntaxError !!";
		preemptitle(2000);
	}
};

var ranges = [["A".charCodeAt(0),"Z".charCodeAt(0)],["a".charCodeAt(0),"z".charCodeAt(0)],["0".charCodeAt(0),"9".charCodeAt(0)]];
var compre = ";."; //-=+*/
var levels = [
	[1,'type: "mouse.moveDown();" and click enter','type: "mouse.moveRight();" and click enter','type: "mouse.checkForCheese();" and click enter','move and check for cheese',"get home"],
	[1,'type: "mouse.moveUp();" and click enter','type: "mouse.moveLeft();" and click enter','type: "mouse.checkForCheese();" and click enter','move and check for cheese',"get home"],
];

var p_int;
var preemptitle = function(timing) {
	if (p_int < 0) clearTimeout(p_int);
	p_int = setTimeout(function(){
		title =  levels[turn][levels[turn][0]];
	},timing);
};

var keyreturn = function keyreturn(event) {
	event.preventDefault();
	if (timestart === 0) resetTimer();
	title =  levels[turn][levels[turn][0]];
	if (p_int < 0) clearTimeout(p_int);
}
document.onkeydown = canvas.onkeydown = function(event){
	if (!cantype) return;

	for (var i=0;i<ranges.length;i++) {
		if (ranges[i][0] <= event.keyCode && event.keyCode <= ranges[i][1]) {
			text += event.key;
			return keyreturn(event);
		}
	}	
	for (var i=0; i<compre.length; i++) {
		if (event.key === compre.charAt(i)) {
			text += event.key;
			return keyreturn(event);
		}
	}
	switch (event.keyCode) {
		case 8: // backspace
		text = text.slice(0,-1);
		return keyreturn(event);
		case 13: // enter/return
		submit();
		return keyreturn(event);
	}
};

draw();
preemptitle(3000);