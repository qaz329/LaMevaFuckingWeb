const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

const AMPLE_TAULER = 15;
const ALT_TAULER = 15;

var velocitat = 300;

var dead = false;
var head = [8,8];
var currentDirection = RIGHT;
var punt = 0;

$(document).ready(function() {
    console.log( "ready!" );

    $("#taula tr:nth-child("+head[0]+") td:nth-child("+head[1]+")").css("background-color", "yellow");
});

//setInterval(move(), 1000);

$(document).keydown(function(e) {
	
   switch(e.keyCode){
    	case LEFT:
    		currentDirection = LEFT;
    		break;
    	case RIGHT:
    		currentDirection = RIGHT;
    		break;
    	case UP:
    		currentDirection = UP;
    		break;
    	case DOWN:
    		currentDirection = DOWN;
    		break;
    }

    console.log(e.keyCode);
});

$("#btn-start").on("click", function(){
	var myVar = setInterval(function(){
		var d = new Date();
		var t = d.toLocaleTimeString();
		document.getElementById('demo').innerHTML = t;
		
		comprovaDireccio();
	}, velocitat);
});

function repaint(){
	$("#taula tr td").css("background-color", "white");

	$("#taula tr:nth-child("+head[0]+") td:nth-child("+head[1]+")").css("background-color", "yellow");
}

function comprovaDireccio(){

	var tmpHead = head;

	switch(currentDirection){
	    	case LEFT:
	    		head[1]-=1;
	    		break;
	    	case RIGHT:
	    		head[1]+=1;
	    		break;
	    	case UP:
	    		head[0]-=1;
	    		break;
	    	case DOWN:
	    		head[0]+=1;
	   		break;
	   }

	   if(head[1]<1 || head[1]>AMPLE_TAULER || head[0]<1 || head[0]>ALT_TAULER){
	   	console.log("Ha xocat / perdut");
	   }

	   $("#taula tr:nth-child("+tmpHead[0]+") td:nth-child("+tmpHead[1]+")").css("background-color", "white");
		$("#taula tr:nth-child("+head[0]+") td:nth-child("+head[1]+")").css("background-color", "yellow");

}

function move(){
	while(!dead){
		switch(currentDirection){
	    	case LEFT:
	    		currentDirection = LEFT;    		
	    		if(head[1]!=1) head[1]-=1;
	    		break;
	    	case RIGHT:
	    		currentDirection = RIGHT;
	    		if(head[1]!=AMPLE_TAULER) head[1]+=1;
	    		break;
	    	case UP:
	    		currentDirection = UP;
	    		if(head[0]!=1) head[0]-=1;
	    		break;
	    	case DOWN:
	    		currentDirection = DOWN;
	    		if(head[0]!=ALT_TAULER) head[0]+=1;
	    		break;
	    }
	}
}