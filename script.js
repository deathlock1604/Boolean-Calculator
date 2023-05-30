// Задання змінних
const input = document.getElementById("input")
const buttons = document.getElementById("buttons")
const deleteBtn = document.getElementById("delete")
const clearBtn = document.getElementById("clear")
const equalBtn = document.getElementById("=")
const table = document.getElementById("table")
let expression = ""
let array = [0, 0, 0, 0]
let A = 0
let B = 0
let C = 0
let D = 0

// Задання змінних
buttons.addEventListener("click", function (e) {
  let val = e.target.id
  if (val != "buttons" && val != "implicationBtn") {
    expression += val
  }
  // Відображення виразу в полі вводу зі заміною логічних операторів на символи для зручності читання
  input.value = expression
    .replace(/&&/g, "˄")
    .replace(/\|\|/g, "˅")
    .replace(/!/, "¬")
    .replace(/===/, "↔")
    .replace(/¬([^)]+)\s*˅\s*([^)]+)/g, "$1 → $2")
    .replace(/!/, "¬")
})
// Обробка події натискання кнопки імплікації, додання оператора імплікації в вираз
implicationBtn.addEventListener("click", function (e) {
  expression = "!" + expression
  expression += "|| "
  input.value = expression.pop()
})

// Обробка події натискання кнопки видалення
deleteBtn.addEventListener("click", function (e) {
  expression = expression.substring(0, expression.length - 1)
  input.value = expression
    .replace(/&&/g, "˄ ")
    .replace(/\|\|/g, "˅ ")
    .replace(/!/, "¬")
    .replace(/===/, "↔")
    .replace(/¬([^)]+)\s*˅\s*([^)]+)/g, "$1 → $2")
    .replace(/!/, "¬")
})

// Обробка події натискання кнопки очищення
clearBtn.addEventListener("click", function (e) {
  expression = ""
  input.value = expression
})

// Обробка події натискання кнопки рівності
equalBtn.addEventListener("click", function (e) {
  table.innerHTML = `
    <tr>
    <th id="colA">A</th>
    <th id="colB">B</th>
    <th id="colC">C</th>
    <th id="colD">D</th>
    <th class="result">${input.value}</th>
    </tr>  
    ` // Очищення таблиці та додавання заголовків стовпців

  let isTautology = true // Змінна для перевірки тафтології
  let isDenial = true // Змінна для перевірки суперечності
  for (let j = 0; j <= 15; j++) {
    A = array[3]
    B = array[2]
    C = array[1]
    D = array[0]
    solution = eval(expression) // Очищення таблиці та додавання заголовків стовпців
    if (solution == false) {
      solution = 0 // Заміна логічного значення false на 0
    }
    if (solution == true) {
      solution = 1 // Заміна логічного значення true на 1
    }
    let list = []
    if (!expression.includes("A")) {
      list.push(A)
      document.getElementById("colA").classList.add("none")
    }
    if (!expression.includes("B")) {
      list.push(B)
      document.getElementById("colB").classList.add("none")
    }
    if (!expression.includes("C")) {
      list.push(C)
      document.getElementById("colC").classList.add("none")
    }
    if (!expression.includes("D")) {
      list.push(D)
      document.getElementById("colD").classList.add("none")
    }

    let c = 0
    list.forEach((item) => {
      if (item != 0) {
        c = 1
      }
    })
    if (c == 0) {
      let outputExpression = expression
        .replace(/&&/g, "˄")
        .replace(/\|\|/g, "˅")
        .replace(/!/, "¬")
        .replace(/===/, "↔")
        .replace(/¬([^)]+)\s*˅\s*([^)]+)/g, "$1 → $2")
        .replace(/!/, "¬")

      let data = `
      <tr>
      ${expression.includes("A") ? `<td>${A}</td>` : "<td class='none'>${A}</td>"}
      ${expression.includes("B") ? `<td>${B}</td>` : "<td class='none'>${B}</td>"}
      ${expression.includes("C") ? `<td>${C}</td>` : "<td class='none'>${C}</td>"}
      ${expression.includes("D") ? `<td>${D}</td>` : "<td class='none'>${D}</td>"}
      <td class="result">${solution}</td>
    </tr>
            `

      table.innerHTML += data // Додавання рядка з результатами до таблиці

      if (solution == 0) {
        isTautology = false // Якщо хоча б один результат не є 1, то це не тафтологія
      }
      if (solution == 1) {
        isDenial = false // Якщо хоча б один результат не є 0, то це не суперечність
      }
    }

    array[3] += 1
    for (let i = 0; i <= 3; i++) {
      num = (i - 3) * -1
      if (array[num] >= 2) {
        array[num] = 0
        array[num - 1] += 1
      }
    }
  }

  let outputExpression = expression
    .replace(/&&/g, "˄")
    .replace(/\|\|/g, "˅")
    .replace(/!/, "¬")
    .replace(/===/, "↔")
    .replace(/¬([^)]+)\s*˅\s*([^)]+)/g, "$1 → $2")
    .replace(/!/, "¬")

  let tautologyMessage = isTautology ? "Логічний вираз є тавтологією!" : isDenial ? "Логічний вираз є суперечністю!" : "Логічний вираз є нейтральним!"
  document.getElementById("p").innerHTML = "Таблиця істинності: " + outputExpression + "<br>" + tautologyMessage
})
