// Налаштування структури HTML
const canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
canvas.style.border = '1px solid black';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const instructions = document.createElement('div');
instructions.innerHTML = '<p>Використовуйте кнопки нижче, щоб перемістити точку. Спробуйте потрапити в цільову область!</p>';
document.body.appendChild(instructions);

const controls = document.createElement('div');
controls.innerHTML = `
    <button id="left">Вліво</button>
    <button id="right">Вправо</button>
    <button id="up">Вгору</button>
    <button id="down">Вниз</button>
`;
document.body.appendChild(controls);

const feedback = document.createElement('div');
feedback.innerHTML = '<p>Відгук: </p>';
document.body.appendChild(feedback);

const history = document.createElement('div');
history.innerHTML = '<p>Історія:</p>';
document.body.appendChild(history);

// Визначення меж цільових областей
const verticalStrip1 = { x1: 100, x2: 200 }; // Перша вертикальна смужка
const verticalStrip2 = { x1: 400, x2: 500 }; // Друга вертикальна смужка
const horizontalStrip = { y1: 300, y2: 400 }; // Горизонтальна смужка

// Випадкова початкова точка для користувача
let point = {
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height)
};
let prevDistance = null;
let attempts = 0;

// Масив для збереження шляху точки
let path = [ { x: point.x, y: point.y } ];

// Малювання цільової області
function drawTargetArea() {
    ctx.fillStyle = 'lightblue';

    // Вертикальні смужки
    ctx.fillRect(verticalStrip1.x1, 0, verticalStrip1.x2 - verticalStrip1.x1, canvas.height);
    ctx.fillRect(verticalStrip2.x1, 0, verticalStrip2.x2 - verticalStrip2.x1, canvas.height);

    // Горизонтальна смужка
    ctx.fillRect(0, horizontalStrip.y1, canvas.width, horizontalStrip.y2 - horizontalStrip.y1);
}

// Малювання точки
function drawPoint() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
}

// Малювання шляху точки
function drawPath() {
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
}

// Оновлення канви
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTargetArea();
    drawPath();
    drawPoint();
}

// Перевірка, чи знаходиться точка в цільовій області
function isInsideTargetArea(x, y) {
    const inVertical1 = x >= verticalStrip1.x1 && x <= verticalStrip1.x2;
    const inVertical2 = x >= verticalStrip2.x1 && x <= verticalStrip2.x2;
    const inHorizontal = y >= horizontalStrip.y1 && y <= horizontalStrip.y2;
    return (inVertical1 || inVertical2) && inHorizontal;
}

// Обробка переміщення користувача
function movePoint(direction) {
    const movement = 10;
    if (direction === 'left') point.x = Math.max(0, point.x - movement);
    if (direction === 'right') point.x = Math.min(canvas.width, point.x + movement);
    if (direction === 'up') point.y = Math.max(0, point.y - movement);
    if (direction === 'down') point.y = Math.min(canvas.height, point.y + movement);

    attempts++;

    const distance = Math.abs(point.x - 300) + Math.abs(point.y - 350); // Центр цільової області

    let feedbackText;
    if (isInsideTargetArea(point.x, point.y)) {
        feedbackText = `Вітаємо! Ви потрапили в цільову область з ${attempts}-ї спроби.`;
        disableControls();
    } else {
        if (prevDistance === null) {
            feedbackText = 'Промах. Спробуйте ще раз!';
        } else if (distance < prevDistance) {
            feedbackText = 'Стає тепліше!';
        } else {
            feedbackText = 'Стає холодніше!';
        }
        prevDistance = distance;
    }

    path.push({ x: point.x, y: point.y }); // Додати нову позицію до шляху

    feedback.innerHTML = `<p>Відгук: ${feedbackText}</p>`;
    history.innerHTML += `<p>Спроба ${attempts}: (${point.x}, ${point.y}) - ${feedbackText}</p>`;
    updateCanvas();
}

function disableControls() {
    document.getElementById('left').disabled = true;
    document.getElementById('right').disabled = true;
    document.getElementById('up').disabled = true;
    document.getElementById('down').disabled = true;
}

// Слухачі подій для кнопок
document.getElementById('left').addEventListener('click', () => movePoint('left'));
document.getElementById('right').addEventListener('click', () => movePoint('right'));
document.getElementById('up').addEventListener('click', () => movePoint('up'));
document.getElementById('down').addEventListener('click', () => movePoint('down'));

// Початкова налаштування
updateCanvas();
feedback.innerHTML = `<p>Відгук: Початок у точці (${point.x}, ${point.y})</p>`;
