// Завдання 2: Відображення трикутника відносно осі абсцис

// Введення координат вершин трикутника
let x1 = parseFloat(prompt("Введіть x1:"));
let y1 = parseFloat(prompt("Введіть y1:"));
let x2 = parseFloat(prompt("Введіть x2:"));
let y2 = parseFloat(prompt("Введіть y2:"));
let x3 = parseFloat(prompt("Введіть x3:"));
let y3 = parseFloat(prompt("Введіть y3:"));

// Вивід початкових координат
console.log("Початкові координати трикутника:");
console.log(`Точка A: (${x1}, ${y1})`);
console.log(`Точка B: (${x2}, ${y2})`);
console.log(`Точка C: (${x3}, ${y3})`);

// Відображення відносно осі абсцис
y1 = -y1;
y2 = -y2;
y3 = -y3;

// Вивід нових координат
console.log("Координати трикутника після відображення:");
console.log(`Точка A: (${x1}, ${y1})`);
console.log(`Точка B: (${x2}, ${y2})`);
console.log(`Точка C: (${x3}, ${y3})`);
alert(`Координати після відображення:\nA(${x1}, ${y1})\nB(${x2}, ${y2})\nC(${x3}, ${y3})`);
