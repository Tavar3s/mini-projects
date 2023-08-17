
let game
let gameWidth = 340
let gameHeight = 640
let context

let birdHeight = 24
let birdWidth = 34
let birdX = gameWidth/8
let birdY = gameHeight/2
let birdImg

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

let canoArray = []
let canoWidth = 64
let canoHeight = 512
let canoX = gameWidth
let canoY = 0

let topCanoImg
let bottomCanoImg

let velocityX = -2
let velocityY = 0
let gravity = 0.4

let gameOver = false
let pontos = 0

onload = function() {
    game = document.getElementById('game')
    game.height = gameHeight
    game.width = gameWidth
    context = game.getContext("2d")

    birdImg = new Image()
    birdImg.src="../img/flappy_bird/flappybird.png"
    birdImg.onload = function() {
        context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight)
    }

    topCanoImg = new Image();
    topCanoImg.src='../img/flappy_bird/toppipe.png'

    bottomCanoImg = new Image()
    bottomCanoImg.src='../img/flappy_bird/bottompipe.png';

    requestAnimationFrame(update)
    setInterval(placeCanos, 1700)
    document.addEventListener("keydown", jump)
}

function update() {
    requestAnimationFrame(update)
    if (gameOver) {
        return
    }
    context.clearRect(0, 0, gameWidth, gameHeight)

    velocityY += gravity
    bird.y = Math.max(bird.y + velocityY, 0)
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    if (bird.y > game.height) {
        gameOver=true;
    }

    for (let i = 0; i < canoArray.length; i++) {
        let cano = canoArray[i]
        cano.x += velocityX
        context.drawImage(cano.img, cano.x, cano.y, cano.width, cano.height)

        if (!cano.passed && bird.x > cano.x + cano.width) {
            pontos += 0.5
            cano.passed = true
        }

        if (detectCollision(bird, cano)) {
            gameOver = true
        }
    }

    while (canoArray.length > 0 && canoArray[0].x < -canoWidth) {
        canoArray.shift()
    }

    context.fillStyle = "white"
    context.font = "45px sans-serif"
    context.fillText(pontos, 8, 45)

    if(gameOver) {
        context.fillText("GAME OVER", gameWidth/11, gameHeight/2)
    }
}

function placeCanos() {
    if (gameOver) {
        return
    }

    let randomCanoY = canoY - canoHeight / 4 - Math.random() * (canoHeight / 2)
    let Vazio = gameHeight / 4

    let topCano = {
        img : topCanoImg,
        x : canoX,
        y : randomCanoY,
        width : canoWidth,
        height : canoHeight,
        passed : false
    }

    canoArray.push(topCano)

    let bottomCano = {
        img : bottomCanoImg,
        x : canoX,
        y : randomCanoY + canoHeight + Vazio,
        width : canoWidth,
        height : canoHeight,
        passed : false
    }

    canoArray.push(bottomCano)
}

function jump(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        velocityY = -6

        if (gameOver) {
            bird.y = birdY
            canoArray = []
            pontos = 0
            gameOver = false
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}
