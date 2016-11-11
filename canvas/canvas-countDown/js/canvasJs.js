var WINDOW_WIDTH = 1000;
var WINDOW_HEIGHT = 600;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var END_TIME = new Date();
var currentShowTime = 0;
END_TIME.setTime(END_TIME.getTime()+3600000);
var balls = [];
var colors = "#007855";
var color = ["#CC3333","#CCCCCC","#003366","#993333","#CCCC00","#663366","#FFFFCC","#CC9966","#CC9999","#666666"];
window.onload = function() {
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    currentShowTime = getCurrentShowTime();
    setInterval(function() {
        render(context);
        update();
    }, 50);
}

function update() {
    var nextShowTime = getCurrentShowTime();
    var nextHour = parseInt(nextShowTime / 3600);
    var nextMinutes = parseInt(nextShowTime / 60 - nextHour * 60);
    var nextSeconds = parseInt(nextShowTime % 60);
    var curHour = parseInt(currentShowTime / 3600);
    var curMinutes = parseInt(currentShowTime / 60 - curHour * 60);
    var curSeconds = parseInt(currentShowTime % 60);

    if (nextSeconds != curSeconds) {
        if (parseInt(curHour / 10) != parseInt(nextHour / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHour / 10));
        }
        if (parseInt(curHour % 10) != parseInt(nextHour % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHour % 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        }
        currentShowTime = nextShowTime;
    }

    updateBalls();
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y > WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }
    while (balls.length > cnt) {
        balls.pop();
    }
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    /*color: 'hsl(' + Math.round(Math.random() * 360) + ','+
                        Math.round(Math.random() * 100)+'%,'+
                        Math.round(Math.random() * 100)+'%)'*/
                    // color: 'hsl(' + Math.round(Math.random() * 360) + ',70%,50%)'
                    color:color[ Math.floor( Math.random()*colors.length ) ]
                }
                balls.push(aBall);
            }
        }
    }
}

//倒计时
/*function getCurrentShowTime() {
    var myDate = new Date();
    var ret = (END_TIME.getTime() - myDate.getTime()) / 1000;
    return ret >= 0 ? ret : 0;
}*/
//时钟
function getCurrentShowTime() {
    var myDate = new Date();
    var ret = myDate.getHours()*3600+myDate.getMinutes()*60+myDate.getSeconds();
    return ret;
}
function render(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hour = parseInt(currentShowTime / 3600);
    var minutes = parseInt(currentShowTime / 60 - hour * 60);
    var seconds = parseInt(currentShowTime % 60);
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10), ctx);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10), ctx);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }
}

function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = colors;
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j]) {
                ctx.beginPath();
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}
