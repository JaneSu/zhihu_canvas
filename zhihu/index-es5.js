function Circle(x, y) {
    this.x = x;
    this.y = y;
    this.r = Math.random() * 10;
    this._mx = Math.random();
    this._my = Math.random();
}

Circle.prototype = {
    drawCircle: function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
        ctx.fill()
    },
    drawLine: function (ctx, siblingsCircle) {
        var dif_x = this.x - siblingsCircle.x,
            dif_y = this.y - siblingsCircle.y,
            distance = Math.sqrt(dif_x * dif_x + dif_y * dif_y);
        if (distance < 150) {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(siblingsCircle.x, siblingsCircle.y)
            ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
            ctx.stroke()
        }
    },
    move: function (w, h) {
        this._mx = (this.x > 0 && this.x < w) ? this._mx : -(this._mx);
        this._my = (this.y > 0 && this.y < h) ? this._my : -(this._my);
        this.x += this._mx;
        this.y += this._my;
       
    }
}

function currentCircle(x, y) {
    Circle.call(this, x, y)
}

currentCircle.prototype = Object.create(Circle.prototype)

currentCircle.prototype.drawCircle = function (ctx) {
    ctx.beginPath();
    this.r = 10;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
    ctx.fill()
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
var w = canvas.width = canvas.offsetWidth
var h = canvas.height = canvas.offsetHeight
var circle = [];
var current_Circle = new currentCircle(0, 0)

function draw() {
    ctx.clearRect(0,0,w,h)
    for (var i = 0; i < circle.length; i++) {
        circle[i].move(w, h);
        circle[i].drawCircle(ctx);
        for (var j = i + 1; j < circle.length; j++) {
            circle[i].drawLine(ctx, circle[j])
        }
    }
    if (current_Circle.x) {
        current_Circle.drawCircle(ctx)
        for(var i = 0;i<circle.length;i++){
            current_Circle.drawLine(ctx,circle[i])
        }
    }
    requestAnimationFrame(draw)
}

function init(num) {
    for (var i = 0; i < num; i++) {
        circle.push(new Circle(Math.random() * w, Math.random() * h))
    }
    draw()
}

window.addEventListener('load',init(30))

window.addEventListener('mousemove',function(e){
    e = e || window.event;
    current_Circle.x = e.clientX
    current_Circle.y = e.clientY
})

window.addEventListener('mouseleave',function(e){
    e = e || window.event;
    current_Circle.x = null
    current_Circle.y = null
})
