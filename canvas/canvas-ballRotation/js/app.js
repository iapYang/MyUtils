var canvas = document.getElementById('demo');
canvas.width = 1600;
canvas.height = 400;
var demo = $('#demo');

var ctx = canvas.getContext("2d");

var ball = [];

ball[0] = new Ball({
    radius: 10,
    x: canvas.width / 2,
    y: canvas.height / 2 - 150,
    vx: 2,
    vy: 0,
    color: "white",
    angle: 0,
});

var sun = new Ball({
    radius: 60,
    x: canvas.width / 2,
    y: canvas.height / 2 ,
    vx: 2,
    vy: 0,
    color: "white",
    angle: 0,
});


var circle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 150,
    angle: 0,
};
var count = 0;
var flag = true;
var speed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 21, 23];

var index = 0;
drawFrame();

function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.save();
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    sun.draw(ctx);

    ball[0].draw(ctx);
    ball[0].angle += speed[0];
    // console.log(index);
    // index = nextI(index);
    ball[0].x = circle.x + Math.sin(ball[0].angle * Math.PI / 180) * circle.radius;
    ball[0].y = circle.y - Math.cos(ball[0].angle * Math.PI / 180) * circle.radius;

}

function nextI(i) {
    var temp;
    if (flag) {
        temp = i + 1;
        if (temp > 17) {
            flag = false;
            temp = i - 1;
        }
    } else {
        temp = i - 1;
        if (temp < 0) {
            flag = true;
            temp = i + 1;
        }
    }
    return temp;
}
