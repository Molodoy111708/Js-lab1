// Функція для перестановки значень змінних
function rearrangeVariables(order) {
  // Введення значень для змінних
  let A = prompt("Введіть значення для A:");
  let B = prompt("Введіть значення для B:");
  let C = prompt("Введіть значення для C:");
  let D = prompt("Введіть значення для D:");
  let E = prompt("Введіть значення для E:");

  // Зберігаємо значення змінних у об'єкті
  let variables = { A, B, C, D, E };

  // Створюємо новий масив відповідно до заданого порядку
  let reordered = order.split("").map(key => variables[key]);

  // Виводимо результат
  console.log("Новий порядок змінних:", reordered);
  alert("Новий порядок змінних: " + reordered.join(", "));
}

// Приклад виклику функції з порядком "AEBDC"
rearrangeVariables("AEBDC");
