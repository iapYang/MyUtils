var canvas = document.getElementById('demo');
canvas.width = 800;
canvas.height = 200;

var ctx = canvas.getContext("2d");

var ball = [];
ball[0] = new Ball({
    x: 50,
    y: 100,
    vx: 5,
    vy:5,
});
ball[1] = new Ball({
    x: 50,
    y: 100,
    vx: 5,
});

var count = 0;
var i = 0;
var j = 1;

// ball[0].draw(ctx);

$('.up').on('click',function() {
	ball[0].y -= ball[0].vy;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball[0].draw(ctx);
});


$('.down').on('click',function() {
	ball[0].y += ball[0].vy;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball[0].draw(ctx);
});

$('.left').on('click',function() {
	ball[0].x -= ball[0].vx;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball[0].draw(ctx);
});

$('.right').on('click',function() {
	ball[0].x += ball[0].vx;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball[0].draw(ctx);
});


drawFrame();



function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball[i].draw(ctx);
    ball[i].x = ball[i].x + ball[i].vx;

    if (canvas.width - ball[i].x <= ball[i].radius) {
        if (canvas.width + ball[i].radius <= ball[i].x) {
        	ball[j].x = ball[j].x + ball[j].vx;
            ball[j].draw(ctx);
            ball[i].x = ball[j].x;
        } else {
            ball[j].x = -(canvas.width - ball[i].x);
            ball[j].x = ball[j].x + ball[j].vx;
            ball[j].draw(ctx);
        }
        
    }
}
