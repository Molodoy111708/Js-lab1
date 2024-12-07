let x = parseFloat(prompt("Введите координату x точки:"));
let y = parseFloat(prompt("Введите координату y точки:"));

// Параметры первой вертикальной полосы
let x_min1 = -2;
let x_max1 = 0;

// Параметры второй вертикальной полосы
let x_min2 = 1;
let x_max2 = 3;

// Проверка принадлежности
let inFirstStrip = (x >= x_min1 && x <= x_max1);
let inSecondStrip = (x >= x_min2 && x <= x_max2);

if (inFirstStrip || inSecondStrip) {
    console.log("Точка принадлежит объединению полос.");
} else {
    console.log("Точка не принадлежит объединению полос.");
}
