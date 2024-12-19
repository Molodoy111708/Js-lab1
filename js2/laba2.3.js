const readline = require('readline');

// Функция для подсчёта цифр в числе
function digitCount(n) {
    return Math.abs(n).toString().length;
}

// Сортировка выбором (Selection Sort)
function selectionSortByDigitCount(arr) {
    const indices = arr.map((_, i) => i);
    for (let i = 0; i < indices.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < indices.length; j++) {
            if (digitCount(arr[indices[j]]) < digitCount(arr[indices[minIndex]])) {
                minIndex = j;
            }
        }
        [indices[i], indices[minIndex]] = [indices[minIndex], indices[i]];
    }
    return indices;
}

// Создание интерфейса для ввода
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите последовательность чисел через пробел: ', (input) => {
    const numbers = input.split(' ').map(Number);
    if (numbers.some(isNaN)) {
        console.log('Ошибка: введите корректные числа.');
        rl.close();
        return;
    }

    const sortedIndices = selectionSortByDigitCount(numbers);
    console.log(`Отсортированные индексы: ${sortedIndices.join(' ')}`);
    rl.close();
});
