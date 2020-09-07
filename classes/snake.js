
class Snake {
    constructor(pos, color) {
        this.x = pos.x;
        this.y = pos.y;
        this.tail = [{ x: pos.x - tileSize, y: pos.y }, { x: pos.x - tileSize * 2, y: pos.y }];
        this.velX = 1;
        this.velY = 0;
        this.color = color;
    }

    draw(){
        //draw the head
        context.beginPath();
        context.rect(this.x, this.y, tileSize, tileSize);
        context.fillStyle = this.color;
        context.fill();
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.stroke();
        context.closePath();


        //draw the tail
        for(var i=0; i < this.tail.length; i++){
            context.beginPath();
            context.rect(this.tail[i].x, this.tail[i].y, tileSize, tileSize);
            context.fillStyle = this.color;
            context.fill();
            context.strokeStyle = "black";
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
        }
    }

    move(){
        for(var i = this.tail.length - 1; i > 0; i--){
            this.tail[i] = this.tail[i-1];
        }
        // Updating the start of the tail to acquire the position of the head.
        if (this.tail.length !== 0) {
            this.tail[0] = {x: this.x, y: this.y};
        }

        // Movement of the head.
        this.x += this.velX * tileSize;
        this.y += this.velY * tileSize;
    }

    // Changing the direction of movement of the snake.
    dir(dirX, dirY) {

        this.velX = dirX;
        this.velY = dirY;

    }

    // Determining whether the snake has eaten a piece of food.
    eat() {
        if (Math.abs(this.x - food.x) < tileSize && Math.abs(this.y - food.y) < tileSize) {
            // Adding to the tail.
            this.tail.push({});
            return true;
        }
        return false;
    }

    // Checking if the snake has died.
    die() {
        for (var i = 0; i < this.tail.length; i++) {
            if (Math.abs(this.x - this.tail[i].x) < tileSize && Math.abs(this.y - this.tail[i].y) < tileSize) {
                return true;
            }
        }
        return false;
    }

    border() {
        if (this.x + tileSize > width && this.velX != -1 || this.x < 0 && this.velX != 1)
            this.x = width - this.x;

        else if (this.y + tileSize > height && this.velY != -1 || this.velY != 1 && this.y < 0)
            this.y = height - this.y;
    }


}