const readline = require('readline');

// Определяем границы фигур
const verticalStrip1 = { x1: 1, x2: 3 }; // Первая вертикальная полоска
const verticalStrip2 = { x1: 7, x2: 9 }; // Вторая вертикальная полоска
const horizontalStrip = { y1: 4, y2: 6 }; // Горизонтальная полоска

// Проверяем, попадает ли точка в целевую область
function isInsideTargetArea(x, y) {
    const inVertical1 = x >= verticalStrip1.x1 && x <= verticalStrip1.x2;
    const inVertical2 = x >= verticalStrip2.x1 && x <= verticalStrip2.x2;
    const inHorizontal = y >= horizontalStrip.y1 && y <= horizontalStrip.y2;
    return (inVertical1 || inVertical2) && inHorizontal;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let prevDistance = null;
let attempts = 0;

function askUser() {
    rl.question('Введите координаты x и y через пробел: ', (input) => {
        const [x, y] = input.split(' ').map(Number);
        if (isNaN(x) || isNaN(y)) {
            console.log('Введите корректные числа.');
            return askUser();
        }
        attempts++;
        const distance = Math.abs(x - 5) + Math.abs(y - 5); // Расстояние от центра области

        if (isInsideTargetArea(x, y)) {
            console.log(`Поздравляем! Вы попали в область с ${attempts}-й попытки.`);
            rl.close();
        } else {
            if (prevDistance === null) {
                console.log('Промах. Попробуйте снова.');
            } else if (distance < prevDistance) {
                console.log('Теплее.');
            } else {
                console.log('Холоднее.');
            }
            prevDistance = distance;
            askUser();
        }
    });
}

console.log('Попробуйте попасть в целевую область.');
askUser();