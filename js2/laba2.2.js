const readline = require('readline');

// Функция для нахождения суммы собственных делителей числа
function sumOfDivisors(n) {
    let sum = 0;
    for (let i = 1; i < n; i++) {
        if (n % i === 0) sum += i;
    }
    return sum;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите последовательность чисел через пробел: ', (input) => {
    const numbers = input.split(' ').map(Number);
    if (numbers.some(isNaN)) {
        console.log('Введите корректные числа.');
        rl.close();
        return;
    }

    let minValue = Infinity;
    let count = 0;

    for (const num of numbers) {
        if (num <= 0) continue; // Пропускаем нули и отрицательные числа

        const sumDiv = sumOfDivisors(num);

        // Відлагоджувальний лог
        console.log(`Число: ${num}, Сума дільників: ${sumDiv}, Мінімальне значення: ${minValue}`);

        // Якщо число менше поточного мінімального
        if (num < minValue) {
            minValue = num;
            count = (sumDiv % 2 === 0) ? 1 : 0; // Скидаємо лічильник і перевіряємо парність
        } else if (num === minValue && sumDiv % 2 === 0) {
            count++; // Збільшуємо лічильник, якщо число дорівнює мінімальному і має парну суму дільників
        }
    }

    console.log(`Количество минимальных значений с чётной суммой собственных делителей: ${count}`);
    rl.close();
});
