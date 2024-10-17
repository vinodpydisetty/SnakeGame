let blockSize = 25;
let totalRows = 20; 
let totalCols = 20; 
let board;
let context;

let snakeX = blockSize * 10;
let snakeY = blockSize * 10;

let speedX = 0; 
let speedY = 0;  

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let score = 0; // Initialize score


window.onload = function () {
    board = document.getElementById("board");
    board.height = totalRows * blockSize;
    board.width = totalCols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection); 
    setInterval(update, 200);
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "#1c2833";
    context.fillRect(0, 0, board.width, board.height); //context.fillRect(x, y, width, height);

    // Display the food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Check if snake eats the food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += 1; // Increase score by 1 when food is eaten
    }

    // Move snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Move snake head
    context.fillStyle = "green";
    snakeX += speedX * blockSize; 
    snakeY += speedY * blockSize;  
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Display the score on the canvas
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20 );


    // Check for collision with walls
    if (snakeX < 0 || snakeX >= totalCols * blockSize || snakeY < 0 || snakeY >= totalRows * blockSize) { 
        gameOver = true;
        alert("Game Over! Final Score: " + score);
    }

    // Check for collision with itself
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            gameOver = true;
            alert("Game Over! Final Score: " + score);
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { 
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) { 
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * totalCols) * blockSize; 
    foodY = Math.floor(Math.random() * totalRows) * blockSize; 
}

function restartGame() {
    snakeX = blockSize * 10;
    snakeY = blockSize * 10;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    score = 0; // Reset score
    gameOver = false;
    placeFood();
}
