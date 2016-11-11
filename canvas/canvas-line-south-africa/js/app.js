var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

//init the corner points
var corner = [];
var corners = $('.corner');
var point = [];
var points = $('.point');


for (var i = 0; i < corners.length; i++) {
    corner[i] = corners.eq(i);
}

for (var i = 0; i < points.length; i++) {
    point[i] = points.eq(i);
}



line({
    context:ctx,
    canvas:canvas,
    corner:corner,
    clearArea:point,
});
