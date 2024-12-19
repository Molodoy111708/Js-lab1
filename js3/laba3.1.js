// Створення елементів керування та перестановки
function setupRearrangeUI() {
  // Отримуємо контейнер для розміщення кнопок
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  // Заголовок
  const title = document.createElement('h3');
  title.textContent = 'Переставте значення змінних у потрібному порядку';
  title.style.width = '100%';
  title.style.textAlign = 'center';
  container.appendChild(title);

  // Підконтейнер для кнопок змінних
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.flexDirection = 'row';
  buttonContainer.style.justifyContent = 'center';
  buttonContainer.style.flexWrap = 'wrap';
  container.appendChild(buttonContainer);

  // Масив змінних
  const variables = ['A', 'B', 'C', 'D', 'E'];

  // Зберігаємо стан змінних
  const state = variables.map((variable) => ({ key: variable, value: prompt(`Введіть значення для ${variable}:`) }));

  // Створення кнопок для змінних
  const buttons = state.map((variable, index) => {
    const button = document.createElement('button');
    button.textContent = `${variable.key}: ${variable.value}`;
    button.style.margin = '5px';
    button.style.padding = '10px';
    button.dataset.index = index;
    buttonContainer.appendChild(button);
    return button;
  });

  // Додавання логіки swap
  let selectedButton = null;
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (!selectedButton) {
        selectedButton = button;
        button.style.backgroundColor = 'lightblue';
      } else {
        // Виконуємо swap тільки значень
        const firstIndex = selectedButton.dataset.index;
        const secondIndex = button.dataset.index;

        // Зміна значень у стані
        [state[firstIndex].value, state[secondIndex].value] = [state[secondIndex].value, state[firstIndex].value];

        // Оновлення тексту кнопок
        buttons[firstIndex].textContent = `${state[firstIndex].key}: ${state[firstIndex].value}`;
        buttons[secondIndex].textContent = `${state[secondIndex].key}: ${state[secondIndex].value}`;

        // Скидання вибору
        selectedButton.style.backgroundColor = '';
        selectedButton = null;
      }
    });
  });

  // Додавання кнопки завершення
  const finishButton = document.createElement('button');
  finishButton.textContent = 'Показати результат';
  finishButton.style.marginTop = '20px';
  container.appendChild(finishButton);
  finishButton.addEventListener('click', () => {
    const result = state.map(variable => `${variable.key}: ${variable.value}`).join(', ');
    alert(`Результат перестановки: ${result}`);
  });

  // Додавання контейнера до документа
  document.body.appendChild(container);
}

// Ініціалізація програми
setupRearrangeUI();
