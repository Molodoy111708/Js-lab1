let numbers = [];
let selectedIndices = [];

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Будь ласка, виберіть файл.');
        return;
    }

    const file = fileInput.files[0];
    if (file.type && file.type !== 'text/plain') {
        alert('Помилка: виберіть текстовий файл (.txt).');
        return;
    }

    try {
        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;

            // Очищення тексту від зайвих символів і роздільників
            const cleanedText = text.replace(/[^\d\s-]/g, ''); // Дозволені тільки цифри, пробіли та мінус
            const parsedNumbers = cleanedText
                .split(/[\s,\n]+/) // Розділення за пробілами, комами або новими рядками
                .map(num => Number(num)) // Перетворення у числа
                .filter(num => !isNaN(num)); // Відфільтровування нечислових значень

            if (parsedNumbers.length === 0) {
                alert('Помилка: файл не містить дійсних чисел.');
                return;
            }

            numbers = parsedNumbers;
            displayNumbers();
            document.getElementById('output').innerText = `Завантажені числа: ${numbers.join(', ')}`;
        };
        reader.readAsText(file);
    } catch (error) {
        alert('Помилка читання файлу. Переконайтеся, що це текстовий файл.');
    }
}

function downloadFile() {
    if (numbers.length === 0) {
        alert('Немає даних для завантаження. Спочатку завантажте файл.');
        return;
    }
    const blob = new Blob([numbers.join(' ')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sorted_numbers.txt';
    a.click();
}

function displayNumbers() {
    const container = document.getElementById('numberContainer');
    container.innerHTML = '';
    numbers.forEach((num, index) => {
        const div = document.createElement('div');
        div.classList.add('number');
        div.textContent = num;
        div.onclick = () => handleNumberClick(index);
        if (selectedIndices.includes(index)) {
            div.classList.add('selected');
        }
        container.appendChild(div);
    });
}

function handleNumberClick(index) {
    if (!selectedIndices.includes(index)) {
        selectedIndices.push(index);
    } else {
        selectedIndices = selectedIndices.filter(i => i !== index);
    }

    if (selectedIndices.length === 2) {
        swapNumbers(selectedIndices[0], selectedIndices[1]);
        selectedIndices = [];
    }
    displayNumbers();
}

function swapNumbers(index1, index2) {
    [numbers[index1], numbers[index2]] = [numbers[index2], numbers[index1]];
    document.getElementById('output').innerText = `Переставлено ${index1} і ${index2}: ${numbers.join(', ')}`;
}

function digitCount(n) {
    return Math.abs(n).toString().length;
}

function sortNumbers() {
    if (numbers.length === 0) {
        alert('Будь ласка, спочатку завантажте файл!');
        return;
    }
    for (let i = 0; i < numbers.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < numbers.length; j++) {
            if (digitCount(numbers[j]) < digitCount(numbers[minIndex])) {
                minIndex = j;
            }
        }
        [numbers[i], numbers[minIndex]] = [numbers[minIndex], numbers[i]];
    }
    document.getElementById('output').innerText = `Відсортовані числа: ${numbers.join(', ')}`;
    displayNumbers();
}
