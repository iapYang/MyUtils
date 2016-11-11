function line(obj) {
    var canvas = obj.canvas;
    var context = obj.context;
    var corner = obj.corner;
    var speed = obj.lineSpeed || 20;
    var clearArea = obj.clearArea || corner;

    //cornerPoints is the center of corner divs
    var cornerPoints = [];
    for (var i = 0; i < corner.length; i++) {
        cornerPoints[i] = {
            x: corner[i].offset().left + corner[i].width() / 2,
            y: corner[i].offset().top + corner[i].height() / 2,
        };
    }

    var start = {
        x: canvas.width,
        y: corner[0].offset().top + corner[0].height() / 2,
    };

    //gap is the px between head and tail
    var count = 0;

    //to gps the position of head and tail
    var position = {
        head: 0,
        tail: 0,
    };

    //init headPoint and tailPoint,if the flag is true,the point will move
    var headPoint = {
        x: start.x,
        y: start.y,
        flagOpen: false,
    };
    var tailPoint = {
        x: start.x,
        y: start.y,
        flagOpen: true,
    };
    //u must have known what it means
    var area = {
        head: 0,
        tail: 0,
    };

    var calculatex = Math.ceil((cornerPoints[6].x - cornerPoints[7].x) / speed);
    var calculatey = Math.ceil((cornerPoints[7].y - cornerPoints[8].y) / speed);

    var gap = obj.gap || (calculatex + calculatey)*2+1;

    id = setInterval(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (++count >= gap) {
            headPoint.flagOpen = true;
        }


        //calculate the next Point position
        tailPoint = PointMove(tailPoint, cornerPoints[area.tail],speed);
        headPoint = PointMove(headPoint, cornerPoints[area.head],speed);


        //draw lines
        if (area.tail == area.head) {
            drawLine(headPoint, tailPoint, context);
        } else {
            drawLine(headPoint, cornerPoints[area.head], context);
            for (var i = area.head; i < area.tail - 1; i++) {
                drawLine(cornerPoints[i], cornerPoints[i + 1], context);
            }
            drawLine(cornerPoints[area.tail - 1], tailPoint, context);
        }

        clearPointArea(context, clearArea);
        //find which area the point is
        if (pointEqual(tailPoint, cornerPoints[area.tail])) {
            if (area.tail < cornerPoints.length - 1) {
                ++area.tail;
            } else {
                clearInterval(id);
            }
        }
        if (pointEqual(headPoint, cornerPoints[area.head])) {
            // ++position.head;
            if (area.head < cornerPoints.length - 1) {
                ++area.head;
            }
        }

        //control to close
        // if (pointEqual(headPoint,tailPoint)) {
        //     clearInterval(id);
        // }
    }, 5);
}

function PointMove(currentPoint, finalPoint,speed) {
    if (currentPoint.x == finalPoint.x && currentPoint.y > finalPoint.y) {
        return PointMoveTop(currentPoint, finalPoint,speed);
    } else if (currentPoint.x > finalPoint.x && currentPoint.y == finalPoint.y) {
        return PointMoveLeft(currentPoint, finalPoint,speed);
    } else if (currentPoint.x == finalPoint.x && currentPoint.y < finalPoint.y) {
        return PointMoveBottom(currentPoint, finalPoint,speed);
    } else if (currentPoint.x < finalPoint.x && currentPoint.y == finalPoint.y) {
        return PointMoveRight(currentPoint, finalPoint,speed);
    } else {
        return currentPoint;
    }

}

function PointMoveBottom(currentPoint, finalPoint,speed) {
    if (currentPoint.flagOpen) {
        return {
            x: currentPoint.x,
            y: chooseSmall((currentPoint.y + speed), finalPoint.y),
            flagOpen: currentPoint.flagOpen,
        };
    } else {
        return currentPoint;
    }
}


function PointMoveTop(currentPoint, finalPoint ,speed) {
    if (currentPoint.flagOpen) {
        return {
            x: currentPoint.x,
            y: chooseBig((currentPoint.y - speed), finalPoint.y),
            flagOpen: currentPoint.flagOpen,
        };
    } else {
        return currentPoint;
    }
}


//return the next time Point Value
function PointMoveLeft(currentPoint, finalPoint,speed) {
    if (currentPoint.flagOpen) {
        return {
            x: chooseBig((currentPoint.x - speed), finalPoint.x),
            y: currentPoint.y,
            flagOpen: currentPoint.flagOpen
        };
    } else {
        return currentPoint;
    }
}

function PointMoveRight(currentPoint, finalPoint,speed) {
    if (currentPoint.flagOpen) {
        return {
            x: chooseSmall((currentPoint.x + speed), finalPoint.x),
            y: currentPoint.y,
            flagOpen: currentPoint.flagOpen,
        };
    } else {
        return currentPoint;
    }
}

function pointEqual(a, b) {
    if (a.x == b.x && a.y == b.y) {
        return true;
    } else {
        return false;
    }
}

function chooseSmall(a, b) {
    return a < b ? a : b;
}

function chooseBig(a, b) {
    return a > b ? a : b;
}

function drawLine(headPoint, finalPoint, context, lineWidth, lineColor) {
    context.save();
    context.beginPath();
    context.moveTo(headPoint.x, headPoint.y);
    context.lineTo(finalPoint.x, finalPoint.y);
    context.lineWidth = lineWidth || 5;
    context.lineCap = "square";
    context.strokeStyle = lineColor || "red";
    context.stroke();
    context.closePath();
    context.restore();
}

function clearPointArea(context, div) {
    for (var i = 0; i < div.length; i++) {
        var width = div[i].width();
        var height = div[i].height();
        var x = div[i].offset().left;
        var y = div[i].offset().top;
        context.clearRect(x, y, width, height);
    }
}
