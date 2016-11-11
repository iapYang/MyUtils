function Ball(obj) {
    this.ballValue = {
        radius: 40,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        color: "#705433",
        lineWidth: 1,
        angle:0,
    };
    $.extend(this.ballValue, obj);
    this.radius = this.ballValue.radius;
    this.x = this.ballValue.x;
    this.y = this.ballValue.y;
    this.vx = this.ballValue.vx;
    this.vy = this.ballValue.vy;
    this.rotation = this.ballValue.rotation;
    this.scaleX = this.ballValue.scaleX;
    this.scaleY = this.ballValue.scaleY;
    this.color = this.ballValue.color;
    this.lineWidth = this.ballValue.lineWidth;
    this.angle = this.ballValue.angle;
}

Ball.prototype.draw = function(context) {
    context.save();
    context.beginPath();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
    context.restore();
};

Ball.prototype.getSquare = function() {
    return {
        x: this.x - this.radius,
        y: this.y - this.radius,
        width : this.radius*2,
        height : this.radius*2,
    };
};

Ball.prototype.getCentre = function() {
    return {
        x:this.x,
        y:this.y,
    };
};

Ball.prototype.getDistance = function(point) {
    return Math.sqrt((this.x-point.x)*(this.x-point.x)+(this.y-point.y)*(this.y-point.y));
};

Ball.prototype.checkIfInBall = function(point) {
    return (this.getDistance(point)<=this.radius);
};
