let width, height, tileSize, canvas, context, food, rows, cols, snake, fps, score, isPaused;

//initialize game objects
function init(){
    tileSize =20;

    //Dynamically determine the size of the canvas
    //TODO revisit this
    width = tileSize * Math.floor(window.innerWidth / tileSize);
    height = tileSize * Math.floor(window.innerHeight / tileSize);
    rows = height / tileSize;
    cols = width / tileSize;
    fps = 10; //TODO let user set (difficulty/speed)

    canvas = document.getElementById("game-area");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");

    food = new Food(spawnLocation(), "red");
    //TODO clean
    snake = new Snake({ x: tileSize * Math.floor(width / (2 * tileSize)), y: tileSize * Math.floor(height / (2 * tileSize)) }, "#39ff14");


    score = 0;
    isPaused = false;

}

// Loading the browser window.
window.addEventListener("load",function(){

     game();

});


//TODO add in a less stupid way
// Adding an event listener for key presses.
window.addEventListener("keydown", function (evt) {
    if (evt.key === " ") {
        evt.preventDefault();
        isPaused = !isPaused;
        showPaused();
    }
    else if (evt.key === "ArrowUp") {
        evt.preventDefault();
        if (snake.velY != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height)
            snake.dir(0, -1);
    }
    else if (evt.key === "ArrowDown") {
        evt.preventDefault();
        if (snake.velY != -1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height)
            snake.dir(0, 1);
    }
    else if (evt.key === "ArrowLeft") {
        evt.preventDefault();
        if (snake.velX != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height)
            snake.dir(-1, 0);
    }
    else if (evt.key === "ArrowRight") {
        evt.preventDefault();
        if (snake.velX != -1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height)
            snake.dir(1, 0);
    }

});


function game(){
    init();

    // The game loop.
    interval = setInterval(update,1000/fps);
}

// Updating the position and redrawing of game objects.
function update() {

    if(isPaused){
       return;
    }

    if (snake.die()) {
        alert("GAME OVER!!!");
        window.location.reload();
    }

    snake.border();

    if (snake.eat()) {
        food = new Food(spawnLocation(), "red");
        score += 1;
    }

    // Clearing the canvas for redrawing.
    context.clearRect(0, 0, width, height);

    food.draw();
    snake.draw();
    snake.move();

    showScore();
}


function spawnLocation(){
    const xPos = Math.floor(Math.random() * rows) * tileSize;
    const yPos = Math.floor(Math.random()* cols) * tileSize;
    return {x : xPos, y : yPos};
}


// Showing the score of the player.
function showScore() {

    context.textAlign = "center";
    context.font = "25px Arial";
    context.fillStyle = "white";
    context.fillText("SCORE: " + score, width - 120, 30);

}

// Showing if the game is paused.
function showPaused() {

    context.textAlign = "center";
    context.font = "35px Arial";
    context.fillStyle = "white";
    context.fillText("PAUSED", width / 2, height / 2);

}


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