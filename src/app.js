import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const suits = [
  { name: "hearts", symbol: "♥" },
  { name: "diamonds", symbol: "♦" },
  { name: "clubs", symbol: "♣" },
  { name: "spades", symbol: "♠" },
];

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let currentCards = [];
let sortSteps = [];

function getCardValue(card) {
  const valueMap = {
    A: 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
  };
  return valueMap[card.value];
}

function generateRandomCards(count) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    cards.push({
      suit: randomSuit.name,
      symbol: randomSuit.symbol,
      value: randomValue,
    });
  }
  return cards;
}

function createCardHTML(card, isSmall = false) {
  if (isSmall) {
    return `
      <div class="log-card ${card.suit}">
        <div>${card.value}</div>
        <div class="log-suit">${card.symbol}</div>
        <div style="transform: rotate(180deg);">${card.value}</div>
      </div>
    `;
  } else {
    return `
      <div class="card ${card.suit}">
        <div class="card-value">${card.value}</div>
        <div class="card-suit">${card.symbol}</div>
        <div class="card-value-bottom">${card.value}</div>
      </div>
    `;
  }
}

function renderCards(cards) {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = cards.map((card) => createCardHTML(card)).join("");
}

function drawCards() {
  const count = parseInt(document.getElementById("cardCount").value);
  if (count < 1 || count > 20) {
    alert("Please enter a number between 1 and 20");
    return;
  }

  currentCards = generateRandomCards(count);
  renderCards(currentCards);

  document.getElementById("sortBtn").disabled = false;
  document.getElementById("bubbleSortBtn").disabled = false;

  document.getElementById("sortLog").style.display = "none";
  sortSteps = [];
}

function selectionSort(arr) {
  const steps = [];
  const sortedArray = [...arr];
  const n = sortedArray.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (
        getCardValue(sortedArray[j]) < getCardValue(sortedArray[minIndex])
      ) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [sortedArray[i], sortedArray[minIndex]] = [
        sortedArray[minIndex],
        sortedArray[i],
      ];
    }
    steps.push([...sortedArray]);
  }

  return { sortedArray, steps };
}

function bubbleSort(arr) {
  const steps = [];
  const sortedArray = [...arr];
  const n = sortedArray.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (getCardValue(sortedArray[j]) > getCardValue(sortedArray[j + 1])) {
        [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
      }
      steps.push([...sortedArray]);
    }
  }

  return { sortedArray, steps };
}


function sortCards() {
  if (currentCards.length === 0) return;

  const result = selectionSort(currentCards);
  currentCards = result.sortedArray;
  sortSteps = result.steps;

  renderCards(currentCards);
  displaySortLog();

  document.getElementById("sortBtn").disabled = true;
}

function sortCardsWithBubble() {
  if (currentCards.length === 0) return;

  const result = bubbleSort(currentCards);
  currentCards = result.sortedArray;
  sortSteps = result.steps;

  renderCards(currentCards);
  displaySortLog();

  document.getElementById("bubbleSortBtn").disabled = true;
  document.getElementById("sortBtn").disabled = true;
}


function displaySortLog() {
  const logContainer = document.getElementById("logSteps");
  const sortLogDiv = document.getElementById("sortLog");

  logContainer.innerHTML = sortSteps
    .map((step) => {
      return `<div class="log-step">${step
        .map((card) => createCardHTML(card, true))
        .join("")}</div>`;
    })
    .join("");

  sortLogDiv.style.display = "block";
}

window.onload = function () {
  document.getElementById("drawBtn").addEventListener("click", drawCards);
  document.getElementById("sortBtn").addEventListener("click", sortCards);
  document
    .getElementById("bubbleSortBtn")
    .addEventListener("click", sortCardsWithBubble);

  drawCards(); 
};
