function snake() {
    let space = 20;
    let count = 25;
    let context = Object;
    let width = 500;
    let height = 500;
    let snake = matrix(1, 2);
    let lastTime = 0;
    let requestAnimationId;
    let gameOver = false;
    let direction = 'right';
    let target = [7, 7];
    let length = snake.length;
    let start = length - 1;


    function load() {
        let canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            context = canvas.getContext('2d');

            drawField();
            drawSnake();
            moveSnake();
            addEvents();
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

    function random(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }

    function createTarget() {
        target = [random(0, 25), random(0, 25)];
    }

    function drawSnake() {
        context.clearRect(0, 0, 800, 800);
        drawField();
        drawTarget();

        snake.forEach((e) => {
            let x = e[0] * space;
            let y = e[1] * space;

            context.fillStyle = "#ff33d8";
            context.beginPath();
            context.fillRect(x, y, space, space);
            context.stroke();
        });
    }

    function drawTarget() {
        context.fillStyle = "#ff33d8";
        context.beginPath();
        context.fillRect(target[0] * space, target[1] * space, space, space);
        context.stroke();

        if (snake[0][0] === target[0] && snake[0][1] === target[1]) {
            createTarget();
            increase();
        }
    }

    function increase() {
        let lastItem = snake[snake.length - 1];
        if (direction == 'left' || direction == 'right') {
            snake.push([lastItem[0] - 1, lastItem[1]]);
        } else {
            snake.push([lastItem[0], lastItem[1] - 1]);
        }
        length++;
    }

    function changeDirection() {
        for (let i = snake.length - 1; i > 0; i--){
            snake[i][0] = snake[i - 1][0];
            snake[i][1] = snake[i - 1][1];
        }

        if (direction == 'top') {
            snake[0][1]--;
        } else if (direction == 'bottom') {
            snake[0][1]++;
        } else if (direction == 'left') {
            snake[0][0]--;
        } else if (direction == 'right') {
            snake[0][0]++;
        }
    }

    function moveSnake(timestamp) {
        requestAnimationId = requestAnimationFrame(moveSnake);

        let dt = Number(Math.floor(timestamp / 1000));

        if (timestamp >= lastTime + 400) {
            let element = snake[0];

            gameOver = checkGame(element);
            if (gameOver === true) {
                cancelAnimationFrame(requestAnimationId);
                alert('Game over');
            } else {
                changeDirection();
            }

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

    function addEvents() {
        window.addEventListener('keypress', (event) => {
            const keyName = event.key;

            switch (keyName) {
                case 'w':
                    direction = 'top';
                    break;
                case 's':
                    direction = 'bottom';
                    break;
                case 'd':
                    direction = 'right';
                    break;
                case 'a':
                    direction = 'left';
                    break;
                default:
                    direction = 'right';
                    break;
            }
        });
    }

    load();
}

snake();
