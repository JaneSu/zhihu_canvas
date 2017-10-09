class Circle {

    /**
     * Creates an instance of Circle.
     * @param {any} x 圆的x坐标
     * @param {any} y 圆的y坐标
     * @memberof Circle
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 10; //圆的半径
        this._mx = Math.random(); //圆在x轴上移动的距离
        this._my = Math.random(); //圆在y轴上移动的距离
    }


    /**
     * 
     * 
     * @param {any} ctx canvas的2d上下文对象
     * @memberof Circle
     */
    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
        ctx.fill();
    }

    drawLine(ctx, _circle) {
        let dx = this.x - _circle.x; // 两个圆心在x轴上的距离
        let dy = this.y - _circle.y; // 两个圆心在y轴上的距离
        let d = Math.sqrt(dx * dx + dy * dy) // 利用三角函数计算出两个圆心之间的距离
        if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y); // 线的起点
            ctx.lineTo(_circle.x, _circle.y); // 线的终点
            ctx.closePath();
            ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
            ctx.stroke();
        }
    }


    /**
     * 圆在界面内的移动距离
     * 
     * @param {any} w 屏幕的宽度
     * @param {any} h 屏幕的高度
     * @memberof Circle
     */
    move(w, h) {
        this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
        this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
        this.x += this._mx / 2;
        this.y += this._my / 2;
        
    }
}

//鼠标点画圆闪烁变动
class currentCircle extends Circle {
    constructor(x, y) {
        super(x, y)
    }

    drwaCircle(ctx) {
        ctx.beginPath();
        // this.r = (this.r < 14 && this.r > 1) ? (this.r + (Math.random() * 2 - 1)) : 2
        this.r = 8
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
        ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
        ctx.fill();
    }


}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


let canvas = document.createElement('canvas')
document.body.appendChild(canvas)
let ctx = canvas.getContext('2d');
let w = canvas.width = canvas.offsetWidth;
let h = canvas.height = canvas.offsetHeight;
let circles = [];
let current_circle = new currentCircle(0, 0)

let draw = function () {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < circles.length; i++) {
        circles[i].move(w, h);
        circles[i].drawCircle(ctx);
        for (let j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(ctx, circles[j])
        }
    }
    if (current_circle.x) {
        current_circle.drawCircle(ctx);
        for (var k = 1; k < circles.length; k++) {
            current_circle.drawLine(ctx, circles[k])
        }
    }
    requestAnimationFrame(draw)
}

let init = (num) => {
    for(let i=0;i<num;i++){
        circles.push(new Circle(Math.random() * w, Math.random() * h));
    }
    draw()
}


window.addEventListener('load', init(200));

window.onmousemove = function (e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
}
window.onmouseout = function () {
    current_circle.x = null;
    current_circle.y = null;

};