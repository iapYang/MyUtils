var canvas = document.getElementById('canvas');

var context = canvas.getContext("2d");

var animalImg = document.getElementById('animal');
var animalLeftImg = document.getElementById('animalLeft');


var animal = {
    xTimes: 14,
    yTimes: 1,
    img: animalImg
};

var animalLeft = {
    xTimes: 32,
    yTimes: 1,
    img: animalLeftImg
};

var choice = 0;

var objs = new Array();
objs[0] = animal;
objs[1] = animalLeft;

canvas.width = objs[choice].img.width / objs[choice].xTimes;
canvas.height = objs[choice].img.height / objs[choice].yTimes;

var currentValue = animate({
    xTimes: objs[choice].xTimes,
    yTimes: objs[choice].yTimes
}, {
    cxt: context,
    width: canvas.width,
    height: canvas.height,
    image: objs[choice].img
});

var flag = false;
var hasChange = false;

$('#pause').on('click', function() {
    clearInterval(currentValue.id);
    flag = true;
});

$('#play').on('click', function() {
    if (flag || currentValue.flag) {
        currentValue = animate({
            count: currentValue.count,
            xTimes: objs[choice].xTimes,
            yTimes: objs[choice].yTimes
        }, {
            cxt: context,
            width: canvas.width,
            height: canvas.height,
            image: objs[choice].img
        });
        flag = false;
        currentValue.flag = false;
    }
});

$('#change').on('click', function() {
    if (!hasChange) {
        choice = 1;
        currentValue.count = 0;
        // currentValue = animate({
        //     count: currentValue.count,
        //     xTimes: objs[choice].xTimes,
        //     yTimes: objs[choice].yTimes
        // }, {
        //     cxt: context,
        //     width: canvas.width,
        //     height: canvas.height,
        //     image: objs[choice].img
        // });
        flag = true;
        currentValue.flag = false;
        hasChange = true;
    }
});



function animate(obj1, obj2) {
    var obj = {
        count: 0,
        xTimes: 1,
        yTimes: 1
    };

    $.extend(true, obj, obj1);

    var x_count = 0;
    var y_count = 0;
    var callback = {
        count: 0,
        id: 0,
        flag: false
    };

    var id = setInterval(function() {
        x_count = obj.count % obj.xTimes;
        y_count = parseInt(obj.count / obj.xTimes );
        animateImage(x_count, y_count, obj2);
        console.log(obj.count);
        obj.count++;
        // if (obj.count > xTimes * yTimes) {
        //     obj.count = 0;
        // }
        if (obj.count == obj.xTimes * obj.yTimes) {
            clearInterval(id);
            obj.count = 0;
            callback.flag = true;
        }
        callback.count = obj.count;
    }, 1000 / 24);
    callback.id = id;

    return callback;
}

function animateImage(sx, sy, obj) {
    obj.cxt.clearRect(0, 0, obj.width, obj.height);
    obj.cxt.drawImage(obj.image, sx * obj.width, sy * obj.height, obj.width, obj.height, 0, 0, obj.width, obj.height);
}
