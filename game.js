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

    food = new Food(getSpawnLocation(), "red");
    //TODO clean
    snake = new Snake({ x: tileSize * Math.floor(width / (2 * tileSize)),
                            y: tileSize * Math.floor(height / (2 * tileSize))},
                            "mediumseagreen");


    score = 0;
    isPaused = false;
}

function game(){
    init();

    // The game loop.
    interval = setInterval(update,1000/fps);
}

// Updating the position and redrawing of game objects.
function update(directionChange) {

    if(isPaused){
       return;
    }

    if(directionChange){
        snake.dir(directionChange.x, directionChange.y);
    }

    if (snake.die()) {
        alert("GAME OVER!!!");
        window.location.reload();
    }

    snake.border();

    if (snake.eat()) {
        food = new Food(getSpawnLocation(), "red");
        score += 1;
    }

    // Clearing the canvas for redrawing.
    context.clearRect(0, 0, width, height);

    food.draw();
    snake.draw();
    snake.move();

    showScore();
}


function getSpawnLocation(){
    const xPos = Math.floor(Math.random() * rows) * tileSize;
    const yPos = Math.floor(Math.random()* cols) * tileSize;
    return {x : xPos, y : yPos};
}


function showScore() {
    context.textAlign = "center";
    context.font = "25px Arial";
    context.fillStyle = "white";
    context.fillText("SCORE: " + score, width - 120, 30);

}

function showPaused() {
    context.textAlign = "center";
    context.font = "35px Arial";
    context.fillStyle = "white";
    context.fillText("PAUSED", width / 2, height / 2);
}




// Loading the browser window.
window.addEventListener("load",function(){
    game();
});


// Adding an event listener for key presses.
window.addEventListener("keydown", function (evt) {
    if (evt.key === " ") {
        evt.preventDefault();
        isPaused = !isPaused;
        showPaused();
    }
    else if (evt.key === "ArrowUp") {
        evt.preventDefault();
        if (snake.velY != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height) {
            update({x: 0, y: -1});
        }
    }
    else if (evt.key === "ArrowDown") {
        evt.preventDefault();
        if (snake.velY != -1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height) {
            update({x:0,y:1});
        }
    }
    else if (evt.key === "ArrowLeft") {
        evt.preventDefault();
        if (snake.velX != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height) {
            update({x:-1,y:0});

        }
    }
    else if (evt.key === "ArrowRight") {
        evt.preventDefault();
        if (snake.velX != -1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height) {
            update({x:1,y:0});
        }
    }
});

