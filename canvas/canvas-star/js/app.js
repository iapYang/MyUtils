window.onload = function() {
	var canvas = document.getElementById("canvas");
	canvas.width = 800;
	canvas.height = 600;

	var context = canvas.getContext("2d");
	drawStar(context,150,75,200,200,0);
	var count = 1;
	var x=1;
	setInterval(function() {
		context.clearRect(0, 0, 800, 600);
		
			drawStar(context,150,75,200+(x++),200,(count++)*10);
		
		
	},50);
	
	
};

function drawWheel(cxt,R,r,x,y,rot) {
	for(var i=0;i<36;i++) {
		drawStar(cxt,R,r,x,y,i*rot);
	}
}


function drawStar(cxt,R,r,x,y,rot) {
	cxt.beginPath();
	for(var i=0;i<5;i++) {
		cxt.lineTo(Math.cos((18+i*72-rot)/180*Math.PI)*R+x, 
			-Math.sin((18+i*72-rot)/180*Math.PI)*R+y);
		cxt.lineTo(Math.cos((54+i*72-rot)/180*Math.PI)*r+x, 
			-Math.sin((54+i*72-rot)/180*Math.PI)*r+y);
	}
	cxt.closePath();
	cxt.lineWidth = 10;
	cxt.stroke();
}