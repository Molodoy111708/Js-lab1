let x1 = parseFloat(prompt("Введите x1:"));
let y1 = parseFloat(prompt("Введите y1:"));
let x2 = parseFloat(prompt("Введите x2:"));
let y2 = parseFloat(prompt("Введите y2:"));
let x3 = parseFloat(prompt("Введите x3:"));
let y3 = parseFloat(prompt("Введите y3:"));

// Отображение относительно оси абсцисс
y1 = -y1;
y2 = -y2;
y3 = -y3;

console.log(`Отображенные координаты: (${x1}, ${y1}), (${x2}, ${y2}), (${x3}, ${y3})`);
