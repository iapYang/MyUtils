window.onload = function() {
    var canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    var context = canvas.getContext("2d");

    var skyStyle = context.createLinearGradient(0, 0, 0, canvas.height);
    // var skyStyle = context.createRadialGradient(canvas.width/2, 0, canvas.width/4, canvas.width/2, 0, canvas.width)
    skyStyle.addColorStop(0.0, 'black');
    skyStyle.addColorStop(1.0, '#035');
    context.fillStyle = skyStyle;
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 200; i++) {
        var r = Math.random() * 10;
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height *0.65;
        var rot = Math.random() * 360;
        drawStar(context, r, x, y, rot);
    }

    fillMoon(context,2,canvas.width*0.8,canvas.height*0.2,100,30);
    drawLand(context,canvas.width,canvas.height);
};

function drawStar(cxt, R, x, y, rot) {
        cxt.save();
        cxt.translate(x, y);
        cxt.rotate(rot/180*Math.PI);
        cxt.scale(R, R);
        starPath(cxt);
        cxt.fillStyle = "#fb3";
        // cxt.strokeStyle = "#fd5";
        // cxt.lineWidth = 3;
        // cxt.lineJoin = "round";
        cxt.fill();
        //cxt.stroke();
        cxt.restore();
}

function starPath(cxt) {
    cxt.beginPath();
    for (var i = 0; i < 5; i++) {
        cxt.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI), -Math.sin((18 + i * 72) / 180 * Math.PI));
        cxt.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * 0.5, -Math.sin((54 + i * 72) / 180 * Math.PI) * 0.5);
    }
    cxt.closePath();

}

function fillMoon(cxt,d,x,y,R,rot,fillColor) {
    cxt.save();
    cxt.translate(x, y);
    cxt.rotate(rot*Math.PI/180);
    cxt.scale(R,R);
    pathMoon(cxt,d);
    cxt.fillStyle = fillColor || "#fb5";
    cxt.fill();
    cxt.restore();
}

function pathMoon(cxt,d) {
    cxt.beginPath();
    cxt.arc(0, 0, 1, 0.5*Math.PI, 1.5*Math.PI, true);
    cxt.moveTo(0, -1);
    cxt.arcTo(d,0,0,1,dis(0,-1,d,0)/d);
    cxt.closePath();
}

function dis(x1,y1,x2,y2) {
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function drawLand(cxt,width,height) {
    cxt.save();
    
    cxt.beginPath();

    cxt.moveTo(0, height*0.75);
    cxt.bezierCurveTo(width*0.45, height*0.5, width*0.55, height, width, height*0.75);
    cxt.lineTo(width,height);
    cxt.lineTo(0, height);

    var landStyle = cxt.createLinearGradient(0, height, 0, 0);
    landStyle.addColorStop(0.0, "#030");
    landStyle.addColorStop(1.0, "#580");
    cxt.fillStyle = landStyle;
    cxt.fill();

    cxt.closePath();
    
    cxt.restore();
}