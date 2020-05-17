let start = document.getElementById("start");
let budgetValue = document.getElementsByClassName("budget-value")[0];
let levelValue = document.getElementsByClassName("level-value")[0];
let optionalExpenses = document.getElementsByClassName("optionalexpenses");
let optionalExpensesValue = document.getElementsByClassName(
  "optionalexpenses-value"
)[0];
let expensesValue = document.getElementsByClassName("expenses-value")[0];
let incomeValue = document.getElementsByClassName("income-value")[0];
let monthSavings = document.getElementsByClassName("monthsavings-value")[0];
let yearSavings = document.getElementsByClassName("yearsavings-value")[0];
let dayBudgetValue = document.getElementsByClassName("daybudget-value")[0];
let expensesItem = document.getElementsByClassName("expenses-item");
let expensesItemBtn = document.getElementsByTagName("button")[0];
let optionalExpensesBtn = document.getElementsByTagName("button")[1];
let countBudgetBtn = document.getElementsByTagName("button")[2];
let optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item");
let incomeItem = document.querySelector(".choose-income");
let checkSaving = document.querySelector(".checksavings");
console.log(checkSaving);
let sumValue = document.querySelector(".choose-sum");
let percentValue = document.querySelector(".choose-percent");
let yearValue = document.querySelector(".year-value");
let monthValue = document.querySelector(".month-value");
let dayValue = document.querySelector(".day-value");

let money;
let time;

start.addEventListener("click", function () {
  time = prompt("Введите дату в формате YYYY-MM-DD", "");
  money = +prompt("Ваш бюджет на месяц?", "");

  while (isNaN(money) || money == "" || money == null) {
    money = prompt("Ваш бюджет?", "");
  }
  appData.budget = money;
  appData.timeData = time;
  // получение данных от пользователя и добвление их  toFixed-округление
  budgetValue.textContent = money.toFixed();
  // метод получения даты
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1; //месяцы начинаются с нуля поэтому +1
  dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener("click", function () {
  let sum = 0;

  for (let i = 0; i < expensesItem.length; i++) {
    let a = expensesItem[i].value;
    let b = expensesItem[++i].value;
    if (
      typeof a === "string" &&
      typeof a != null &&
      typeof b != null &&
      a != "" &&
      b != "" &&
      a.length < 50
    ) {
      console.log("Done!");
      appData.expenses[a] = b;
      sum += +b; // +b это преобразование строки b в числовое значение b
    } else {
      console.log("Not Done!");
      i = i - 1;
    }
  }
  expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener("click", function () {
  for (let i = 0; i < optionalExpensesItem.length; i++) {
    let c = optionalExpensesItem[i].value;
    // let d = prompt("Во сколько обойдеться?", "");
    if (
      typeof c === "string" &&
      typeof c != null &&
      typeof c != "" &&
      // typeof d != null &&
      // typeof d != "" &&
      c.length < 50
    ) {
      console.log("Done too!");
      appData.optionalExpenses[i] = c;
      //Динакмическое формированние данных из цикла
      optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
    } else {
      console.log("Not Done!");
      i = i--;
    }
  }
});

countBudgetBtn.addEventListener("click", function () {
  // мой вариант
  // let sum = 0;
  // for (let i = 0; i < expensesItem.length; i++) {
  //   let a = expensesItem[i].value;
  //   let b = expensesItem[++i].value;
  //   if (
  //     typeof a === "string" &&
  //     typeof a != null &&
  //     typeof b != null &&
  //     a != "" &&
  //     b != "" &&
  //     a.length < 50
  //   ) {
  //     appData.expenses[a] = b;
  //     sum += +b; // +b это преобразование строки b в числовое значение b
  //   } else {
  //     i = i - 1;
  //   }
  // } // потом вычитаем sum из бюджета

  if (appData.budget != undefined) {
    appData.moneyPerDay = (
      (appData.budget - expensesValue.textContent) /
      30
    ).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay < 100) {
      levelValue.textContent = "Минимальный уровень дохода";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      levelValue.textContent = "Средний уровень дохода";
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = "Высокий уровень дохода";
    } else {
      levelValue.textContent = "Произошла ошибка";
    }
  } else {
    dayBudgetValue.textContent = "Произошла ошибка";
  }
});

incomeItem.addEventListener("input", function () {
  let items = incomeItem.value;
  incomeValue.textContent = appData.income;
  appData.income = items.split(", ");
});

checkSaving.addEventListener("click", function () {
  if (appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});

sumValue.addEventListener("input", function () {
  if (appData.savings == true) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;
    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthSavings.textContent = appData.monthIncome.toFixed(1);
    yearSavings.textContent = appData.yearIncome.toFixed(1);
  }
});

percentValue.addEventListener("input", function () {
  if (appData.savings == true) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;
    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthSavings.textContent = appData.monthIncome.toFixed(1);
    yearSavings.textContent = appData.yearIncome.toFixed(1);
  }
});

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};

// chooseIncome: function () {
//   appData.income.push(prompt("Может что то еще?"));
//   appData.income.sort();
//   appData.income.forEach((items, i) =>
//     console.log("Способы заработка: " + (i + 1) + " - " + items)
//   );
//   if (
//     typeof items === "string" &&
//     typeof items != "" &&
//     typeof items != null
//   ) {
//     console.log("chooseIncome done!");
//   } else {
//     console.log("chooseIncome not done!");
//   }
// },

// for (let key in appData) {
//   console.log(
//     "Наша программа включает в себя данные: " +
//       key +
//       " значение: " +
//       appData[key]
//   );
// }
