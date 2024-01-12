const canvas = document.querySelector("canvas")
//.querySelector("canvas") é uma forma de selecionar o elemento canvas do html
const ctx = canvas.getContext("2d") //getContext("2d") é uma forma de selecionar o contexto 2d do canvas

const score = document.querySelector(".score--value")
const highScoreElement = document.querySelector(".high-score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audio = new Audio("../som/audio.mp3") //Adicionado um novo audio

const size = 30 //Tamanho do quadrado

const initialPosition = { x: 270, y: 240 } //Posição inicial da cobra
let snake = [initialPosition] //O array snake recebe a posição inicial da cobra

const incrementScore = () => {
    score.innerText = +score.innerText + 10 //.innerText é uma forma de pegar o texto do elemento
    //E o + antes do score.innerText é uma forma de converter o texto em número
}

let highScore = 0 //Variável que armazena o maior score

function updateHighScore() {
    if (+score.innerText > highScore) {//Se o score for maior que o highScore
        highScore = +score.innerText //O highScore recebe o score
        highScoreElement.innerText = highScore //E o highScoreElement recebe o highScore
    }
}

function gameOver() {
    updateHighScore() //Chama a função updateHighScore
    finalScore.innerText = highScore //O finalScore recebe o highScore
    direction = undefined //A direção recebe undefined
    menu.style.display = "flex"
    canvas.style.filter = "blur(2px)"
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min) //max e min são os valores máximos e mínimos
    //Math.round é uma forma de arredondar o número
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size) //.width é uma forma de pegar a largura do elemento
    return Math.round(number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})` //rgb é uma forma de definir uma cor
    //`` é uma forma de concatenar strings
    //${} é uma forma de colocar uma variável dentro de uma string
}

const food = { //Objeto food
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction, loopId

const drawFood = () => {
    const { x, y, color } = food //Desestruturação do objeto food
    //A desestruturação é uma forma de pegar os valores de um objeto e colocar em variáveis
    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size) //.fillRect é uma forma de desenhar um retângulo
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = "#ddd" //.fillStyle é uma forma de definir a cor do elemento

    snake.forEach((position, index) => { //.forEach é uma forma de percorrer um array
        if (index == snake.length - 1) {
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size, size) //.fillRect é uma forma de desenhar um retângulo
    })
}

const moveSnake = () => {
    if (!direction) return //Se a direção for undefined, a função retorna

    const head = snake[snake.length - 1]

    //Se a direção for right, left, down ou up, a cobra vai para a direção
    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift() //.shift é uma forma de remover o primeiro elemento do array
}

const drawGrid = () => {
    ctx.lineWidth = 1 //.lineWidth é uma forma de definir a largura da linha
    ctx.strokeStyle = "#191919" //.strokeStyle é uma forma de definir a cor da linha

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

const cheackEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) { //Se a cabeça da cobra estiver na mesma posição da comida
        incrementScore() //Chama a função incrementScore
        snake.push(head) //.push é uma forma de adicionar um elemento no final do array
        audio.play() //.play é uma forma de tocar o audio

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)) {
            //Enquanto a cobra estiver na mesma posição da comida
            x = randomPosition()
            y = randomPosition()
        }
        //Caso a cobra não esteja na mesma posição da comida, a comida recebe uma nova posição
        food.x = x
        food.y = y
        food.color = randomColor()
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size //O canvasLimit recebe a largura do canvas menos o tamanho do quadrado
    const neckIndex = snake.length - 2 //O neckIndex recebe o tamanho do array snake menos 2
    //Colisão acontece quando a cabeça da cobra bate na parede ou no próprio corpo

    const wallCollision =
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y //Se a cabeça da cobra estiver na mesma posição do corpo
    })

    if (wallCollision || selfCollision) { //Se a colisão com a parede ou com o próprio corpo acontecer
        updateHighScore() //Chama a função updateHighScore
        gameOver()
    }
}

const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    cheackEat()
    checkCollision()

    loopId = setTimeout(() => { //setTimeout é uma forma de chamar uma função depois de um tempo
        gameLoop()
    }, 300) //A cada 300 milissegundos, a função gameLoop é chamada
}

gameLoop()

document.addEventListener("keydown", ({ key }) => {
    //Teclas de direção
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})

buttonPlay.addEventListener("click", () => { //Quando o botão for clicado
    //O jogo é reiniciado
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = [initialPosition] //O array snake recebe a posição inicial da cobra
})
