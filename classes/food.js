class Food{
    constructor(pos, color) {
        this.x = pos.x;
        this.y = pos.y;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.rect(this.x, this.y, tileSize, tileSize);
        context.fillStyle=this.color;
        context.fill();
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.stroke();
        context.closePath();
    }
}