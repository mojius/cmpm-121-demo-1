import "./style.css";

interface Item {
  name: string;
  emoji: string;
  button: HTMLButtonElement;
  cost: number;
  rate: number;
  amount: number;
}

const items: Item[] = [
  {
    name: "clock",
    emoji: "⏰",
    button: document.createElement("button"),
    cost: 10,
    rate: 0.1,
    amount: 0,
  },
  {
    name: "pen",
    emoji: "🖊",
    button: document.createElement("button"),
    cost: 100,
    rate: 2,
    amount: 0,
  },
  {
    name: "bell",
    emoji: "🔔",
    button: document.createElement("button"),
    cost: 1000,
    rate: 50,
    amount: 0,
  },
];

const app: HTMLDivElement = document.querySelector("#app")!;

let masterCounter: number = 0;
let frameTime = 1;

let decibelsPerSecond: number = 0;
const baseClickIncrease: number = 1;

const gameName = "🔊Noisemaker🔊";

document.title = gameName;

const header: HTMLHeadingElement = document.createElement("h1");
header.innerHTML = gameName;
const subHeader: HTMLHeadingElement = document.createElement("h3");
subHeader.innerHTML = "<i>Don't worry, it's a silent game.</i>";

const dpsText: HTMLHeadingElement = document.createElement("h3");

app.append(header);

const decibelLevel: HTMLDivElement = document.createElement("h3");
decibelLevel.textContent = getDecibelText();

app.append(decibelLevel);

app.append(subHeader);

const mainButton: HTMLButtonElement = document.createElement("button"); // Look at me, all fancy with my typing!
mainButton.className = "mainButton";
mainButton.type = "button";
mainButton.className = "buttonStyle";
mainButton.textContent = "Make some noise!🔊⬆";

mainButton.addEventListener("click", onMainClicked);

app.append(mainButton);

const div = document.createElement("div");
app.append(div);
createItemButtons(items);
app.append(dpsText);

startAutoDecibelIncrease();

// Update loop
setInterval(() => {
  items.forEach((currentItem) => {
    currentItem.button.disabled = currentItem.cost > masterCounter;
  });
}, frameTime);

function onMainClicked() {
  masterCounter += baseClickIncrease;
  decibelLevel.textContent = getDecibelText();
}

function getDecibelText(): string {
  return `(${masterCounter.toFixed(2)} decibels)`;
}

// Starts the automatic increase of decibel levels.
function startAutoDecibelIncrease() {
  let previousFrameTime = performance.now();
  window.requestAnimationFrame(checkForCounterUpdate);

  function checkForCounterUpdate() {
    dpsText.textContent = `Decibels per second: ${decibelsPerSecond.toFixed(
      2,
    )}`;

    frameTime = (performance.now() - previousFrameTime) / 1000;

    masterCounter += decibelsPerSecond * frameTime;
    decibelLevel.textContent = getDecibelText();

    previousFrameTime = performance.now();
    window.requestAnimationFrame(checkForCounterUpdate);
  }
}

function createItemButtons(items: Item[]) {
  items.forEach((currentValue) => {
    refreshItemText(currentValue);
    currentValue.button.disabled = masterCounter < currentValue.cost;

    currentValue.button.addEventListener("click", () => {
      onUpgradeClicked(currentValue);
    });
    div.appendChild(currentValue.button);
    div.append(document.createElement("div"));
  });
}

function onUpgradeClicked(item: Item) {
  if (item.cost <= masterCounter) {
    masterCounter -= item.cost;
    item.amount += 1;
    item.cost *= Math.round(1.15);
    decibelsPerSecond += item.rate;
    refreshItemText(item);
  }
}

function refreshItemText(item: Item) {
  item.button.textContent = `${item.name} (${item.emoji}) [${item.amount}]: ${item.cost}`;
}
