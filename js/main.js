const cells = 49;

const items = [
  { name: "Vinograd", img: "items_icons/R10 3.svg", chanche: 10 },
  { name: "Semerki", img: "items_icons/R10 1.svg", chanche: 25 },
  { name: "Smarodina", img: "items_icons/R10 1-3.svg", chanche: 35 },
  { name: "Vishnya", img: "items_icons/R10 2-2.svg", chanche: 40 },
  { name: "Apelsin", img: "items_icons/R10 2-3.svg", chanche: 55 },
  { name: "Bels", img: "items_icons/R10 2.svg", chanche: 65 },
  { name: "Limon", img: "items_icons/R10 3-2.svg", chanche: 75 },
  { name: "Bar", img: "items_icons/R10 1.png", chanche: 80 },
  { name: "Arbuz", img: "items_icons/R10 3-3.svg", chanche: 85 },
];

const user = { balance: 1000000, profit: 0, rating: 0 };
const results = [{ isWin: false, rate: 0 }];

const rate = document.querySelector(".rate");
const btnPlus = document.querySelector(".button-plus");
const btnMinus = document.querySelector(".button-minus");
const money = document.querySelector(".money");
const rating = document.querySelector(".rating");
const score = document.querySelector(".score");
const autoBtn = document.querySelector(".auto");
const spinBtn = document.querySelector(".spin");

let rateCount = 0;
rating.innerText = `${user.rating}/9000`;
money.innerText = user.balance;
rate.innerText = rateCount;

btnPlus.addEventListener("click", () => {
  rateCount += 100;
  rate.innerText = rateCount;
});

btnMinus.addEventListener("click", () => {
  rateCount -= 100;
  rate.innerText = rateCount;
});

function checker() {
    if (rateCount === 0) {
      spinBtn.setAttribute("disabled", true);
    } else {
      spinBtn.removeAttribute("disabled");
    }
  
    if (rateCount === 0 || user.balance - rateCount < 0) {
      spinBtn.setAttribute("disabled", true);
      autoBtn.setAttribute("disabled", true);
      if (
        rateCount === 0 &&
        user.balance - rateCount > 0 &&
        results[results.length - 1].rate !== 0
      ) {
        autoBtn.removeAttribute("disabled");
      }
    } else {
      spinBtn.removeAttribute("disabled");
      autoBtn.removeAttribute("disabled");
    }
  }

function getItem() {
  let item;

  while (!item) {
    const chance = Math.floor(Math.random() * 10000);

    items.forEach((el) => {
      if (chance < el.chanche && !item) item = el;
    });
  }

  return item;
}

function generateItemsColumnOne() {
  document.querySelector(".column-1").remove();
  document.querySelector(
    ".royal-coins__container"
  ).innerHTML += `<div class="column-1"></div>`;

  let colmn = document.querySelector(".column-1");
  for (let i = 0; i < cells; i++) {
    let item = getItem();

    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `<img src="${item.img}"/>`;
    div.setAttribute("name", item.name);
    colmn.append(div);
  }
}

function generateItemsColumnTwo() {
  document.querySelector(".column-2").remove();
  document.querySelector(
    ".royal-coins__container"
  ).innerHTML += `<div class="column-2"></div>`;

  let colmn = document.querySelector(".column-2");
  for (let i = 0; i < cells; i++) {
    let item = getItem();

    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `<img src="${item.img}"/>`;
    div.setAttribute("name", item.name);
    colmn.append(div);
  }
}

function generateItemsColumnThree() {
  document.querySelector(".column-3").remove();
  document.querySelector(
    ".royal-coins__container"
  ).innerHTML += `<div class="column-3"></div>`;

  let colmn = document.querySelector(".column-3");
  for (let i = 0; i < cells; i++) {
    let item = getItem();

    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `<img src="${item.img}"/>`;
    div.setAttribute("name", item.name);
    colmn.append(div);
  }
}

generateItemsColumnOne();
generateItemsColumnTwo();
generateItemsColumnThree();
setInterval(checker, 100);
setInterval(() => {
  if (rateCount === 0) {
    btnMinus.setAttribute("disabled", true);
  } else {
    btnMinus.removeAttribute("disabled");
  }
}, 100);

let isStarted = false;

function start() {
  if (isStarted) return;
  else isStarted = true;
  generateItemsColumnOne();
  generateItemsColumnTwo();
  generateItemsColumnThree();
  let column = document.querySelector(".column-1");
  let column2 = document.querySelector(".column-2");
  let column3 = document.querySelector(".column-3");

  setTimeout(() => {
    column.style.bottom = "100%";
    column.style.transform = "translate3d(0, -426%, 0)";
    column2.style.bottom = "100%";
    column2.style.transform = "translate3d(0, -426%, 0)";
    column3.style.bottom = "100%";
    column3.style.transform = "translate3d(0, -426%, 0)";
  }, 0);
  const columnItem = column.querySelectorAll("div")[16];
  const columnItem2 = column2.querySelectorAll("div")[16];
  const columnItem3 = column3.querySelectorAll("div")[16];

  let isWin = false;
  if (
    columnItem.getAttribute("name") === columnItem2.getAttribute("name") &&
    columnItem2.getAttribute("name") === columnItem3.getAttribute("name")
  ) {
    user.profit = 5 * rateCount;
    setTimeout(() => {
      score.innerText = "";
    }, 6000);
    user.balance += 5 * rateCount;
    isWin = true;
  }

  column.addEventListener("transitionend", () => {
    if (isWin) {
      score.innerText = user.profit;
    }
    money.innerText = user.balance;
    isStarted = false;
    columnItem.classList.add("active");
    columnItem2.classList.add("active");
    columnItem3.classList.add("active");
  });

  rating.innerText = `${(user.rating += 100)}/9000`;
  user.balance -= rateCount;
  results.push({ isWin: isWin, rate: rateCount });
  sessionStorage.setItem("isWin", isWin)
  sessionStorage.setItem("rate", rateCount)
  rate.innerText = 0;
  rateCount = 0;
}

function auto() {
  rateCount = results.at(-1).rate;
  start();
}
