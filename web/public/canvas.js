const CANVAS_WID = 500;
const CANVAS_HEI = 500;
var canvas = document.getElementById('canvas');

canvas.width = CANVAS_WID;
canvas.height = CANVAS_HEI;

var ctx = canvas.getContext('2d');

var wid = 20; //width of the drawn rectangle
var hei = 20; //height of the drawn rectangle
var x = CANVAS_WID/2 - wid/2; //intial horizontal position of drawn rectangle
var y = CANVAS_HEI/2 - hei/2; //intial vertical position of drawn rectangle

var direction; // -2: up, 2: down, -1: left, 1: right
var newDirection; // -2: up, 2: down, -1: left, 1: right
var pos;
var punt = 0;
var dead = false;
var menjar = null;

//Draw Rectangle function		
function drawRect(x,y,wid,hei) {
    ctx.fillStyle = '#666'; // Fill color of rectangle drawn
    ctx.fillRect(x, y, wid, hei); //This will draw a rectangle of 20x20
}

//drawRect(x,y,wid,hei); //Drawing rectangle on initial load
initSnake();

setInterval(tick, 300);

//move rectangle inside the canvas using arrow keys
window.onkeydown = function(event) {
	if(direction){
		newDirection = {37: -1, 38: -2, 39: 1, 40: 2}[event.keyCode] || newDirection;
	}else{
		direction = {37: -1, 38: -2, 39: 1, 40: 2}[event.keyCode] || direction;
	}
};

function updatePos(){
	if(x<=500 && x>=0 && y>=0 && y<=500){
		if (direction === 1){
			x = x+wid; //fletxa dreta sumar 20 al eix x
		}
		else if(direction === -1){
	        x = x-wid; //fletxa esquerra restar 20 al eix x
	    }
	    else if(direction === -2) {
	        y = y-hei; //fletxa amunt restar 20 al eix y
	    }
	    else if(direction === 2){
	        y = y+hei; //fletxa avall afegir 20 al eix y
	    }
	}else{
		//alert("Has perdut");
		dead = true;
	}
}

function tick(){
	if (direction) {
		//nomes canvia la direccio si la nova direccio esta a un axis diferent
	    if (Math.abs(direction) !== Math.abs(newDirection) && newDirection) {
	      direction = newDirection;
	    }
		updatePos();

		pos.unshift([x,y]);

		//comprova si ha menjat
		if(menjar && pos[0][0] == menjar[0][0] && pos[0][1] == menjar[0][1]){
			menjar = null;
			punt = punt + 1;
			$('#punt').text('Puntuació: '+punt);
			console.log("ha menjat");
		}else{
			//desdibuixa i elimina el ultim element del array
			var l = pos.length-1;
	    	removeRect(pos[l][0],pos[l][1]);
	    	if(!dead) pos.splice(-1, 1);
		}

		//dibuixa menjar si no n'hi ha
	  	if(!menjar){
	  		menjar = [[randomOffset(), randomOffset()]];
	  		ctx.fillStyle = '#FF0000'; // Fill color of rectangle drawn
    		ctx.fillRect(menjar[0][0],menjar[0][1], wid, hei); //This will draw a rectangle of 20x20
	  	}

	    
		
	  	/*clearing anything drawn on canvas
	     *comment this below do draw path 
	     * ctx.clearRect(0,0, 500, 500); */
	  
	  	//Drawing rectangle at new position
	  	for(var i=0; i<pos.length; i++){
	  		drawRect(pos[i][0],pos[i][1],wid,hei);
	  	}
	}
}

function initSnake(){

	pos = [[x,y]];
	drawRect(x,y,wid,hei); //dibuixa el primer quadrat de la serp

	var l = pos[0][0];
	for(var i=0; i<5; i++){
		l=l+wid;
		pos.push([l,y]);
		drawRect(l,y,wid,hei);
	}
}

function removeRect(x,y) {
    ctx.fillStyle = '#fff'; // Fill color of rectangle drawn
    ctx.fillRect(x, y, wid, hei); //This will draw a rectangle of 20x20
}

function randomOffset() {
	var i;
	var ret;
	do{
		ret = Math.floor(Math.random() * (CANVAS_WID / wid)) * wid;
		for(i=0; i<pos.length; i++){
			if(pos[i][0] == ret || pos[i][1] == ret) break;
		}
	}while(i<pos.length-1);
    return ret;
}


