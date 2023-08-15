
let game
let gameWidth = 340
let gameHeight = 640
let context

let birdHeight = 32
let birdWidth = 32
let birdX = gameWidth/8
let birdY = gameHeight/2
let birdImg

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    heigth : birdHeight
}

onload = function() {
    game = document.getElementById('game')
    game.height = gameHeight
    game.width = gameWidth
    context = game.getContext("2d")

    //context.fillStyle = "blue"
    //context.fillRect(bird.x, bird.y, bird.width, bird.heigth)

    birdImg = new Image()
    birdImg.src="../img/nave-espacial.png"
    birdImg.onload = function() {
        context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight)
    }
}
