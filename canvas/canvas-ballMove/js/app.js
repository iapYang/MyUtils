var canvas = document.getElementById('demo');
canvas.width = 1600;
canvas.height = 400;
var demo = $('#demo');

var ctx = canvas.getContext("2d");

var ball = new Ball({
    radius: 100,
    x: canvas.width / 2,
    y: 40,
    vx: 2,
    vy: 0,
    color: "white"
});
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ball.draw(ctx);
var square;
var flagMove = false;
var flagDraw = false;

demo.on('mousedown', function(event) {
    if (ball.checkIfInBall({
        x:event.offsetX,
        y:event.offsetY
    })) {
        flagMove = true;
        flagDraw = false;
    }
}).on('mousemove', function(event) {
    if (ball.checkIfInBall({
        x:event.offsetX,
        y:event.offsetY
    })) {
        demo.css({
            cursor: 'pointer',
        });
    }else {
        demo.css({
            cursor: 'default',
        });
    }

    if (flagMove) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ball.x = event.offsetX;
        ball.y = event.offsetY;
        ball.draw(ctx);
    }
}).on('mouseup', function(event) {
    flagMove = false;
    // flagDraw = true;
    drawFrame();
});

function drawFrame() {
    if (flagDraw) {
        window.requestAnimationFrame(drawFrame, canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.draw(ctx);
        ball.x = ball.x + ball.vx;
        ball.y = ball.y + ball.vy;
    }
}
