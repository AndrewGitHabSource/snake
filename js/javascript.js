function snake() {
    let space = 20;
    let count = 25;
    let context = Object;
    let width = 500;
    let height = 500;
    let map = matrix(count, count);
    let snake = matrix(1, 2);
    let lastTime = 0;
    let requestId;
    let gameOver = false;

    function load() {
        let canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            context = canvas.getContext('2d');

            drawField();
            drawSnake();
            moveSnake();
        }
    }

    function line(x0, y0, x, y) {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x, y);
        context.stroke();
    }

    function drawField() {
        for (let i = 0; i < count; i++) {
            line(0, i * space, width, i * space);
            line(i * space, 0, i * space, height);
        }

        line(500, 0, 500, 500);
        line(0, 500, 500, 500);
    }

    function matrix(m, n) {
        return Array.from({
            length: m
        }, () => new Array(n).fill(0));
    }

    function drawSnake() {
        snake.forEach((e) => {
            let x = e[0] * space;
            let y = e[1] * space;

            context.clearRect(0, 0, 800, 800);
            drawField();

            context.fillStyle = "#ff33d8";
            context.beginPath();
            context.fillRect(x, y, space, space);
            context.stroke();
        });
    }

    function moveSnake(timestamp) {
        requestId = requestAnimationFrame(moveSnake);

        let dt = Number(Math.floor(timestamp / 1000));

        if (timestamp >= lastTime + 1000) {
            snake.forEach((element, index) => {
                gameOver = checkGame(element);
                if (gameOver === true){
                    cancelAnimationFrame(requestId);
                    alert('Game over');
                }
                else{
                    snake[index][0]++;
                }
            });
            drawSnake();

            lastTime = timestamp;
        }
    }

    function checkGame(element) {
        let x = element[0];
        let y = element[1];

        if (x >= count - 1 || x < 0 || y < 0 || y >= count - 1) {
            return true;
        } else {
            return false;
        }
    }

    load();
}

snake();
