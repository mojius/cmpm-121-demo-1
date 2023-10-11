import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let masterCounter: number = 0;

let decibelsPerSecond: number = 1;
const baseClickIncrease: number = 1;
let currentUpgradeCost: number = 10;
let speakerCount: number = 0;

const gameName = "Noisemaker";

document.title = gameName;

const header: HTMLHeadingElement = document.createElement("h1");
header.innerHTML = gameName;
const speakerCountText: HTMLHeadingElement = document.createElement("h2");
speakerCountText.textContent = `Speakers: ${speakerCount}`;
const subHeader: HTMLHeadingElement = document.createElement("h3");
subHeader.innerHTML = "<i>Don't worry, it's a silent game.</i>";
app.append(header);
app.append(speakerCountText);
app.append(subHeader);

const mainButton: HTMLButtonElement = document.createElement("button"); // Look at me, all fancy with my typing!
mainButton.className = "mainButton";
mainButton.type = "button";
mainButton.className = "buttonStyle";
mainButton.textContent = "🔊⬆";

const upgradeButton: HTMLButtonElement = document.createElement("button");
upgradeButton.type = "button";
upgradeButton.disabled = true;
upgradeButton.textContent = `Buy a speaker: (${currentUpgradeCost}) decibels`;

const decibelLevel: HTMLDivElement = document.createElement("div");
decibelLevel.textContent = getDecibelText();

mainButton.addEventListener("click", onMainClicked);

upgradeButton.addEventListener("click", onUpgradeClicked);

app.append(mainButton);

app.append(decibelLevel);

app.append(upgradeButton);

startAutoDecibelIncrease();

// Update loop
setInterval(() => {
  if (masterCounter >= currentUpgradeCost) {
    upgradeButton.disabled = false;
  } else {
    upgradeButton.disabled = true;
  }
}, 5);

function onUpgradeClicked() {
  if (masterCounter >= currentUpgradeCost) {
    speakerCount += 1;
    masterCounter -= currentUpgradeCost;
    decibelsPerSecond += 1;
    currentUpgradeCost *= 1.2;
    upgradeButton.textContent = `Buy a speaker: (${currentUpgradeCost}) decibels`;
    speakerCountText.textContent = `Speakers: ${speakerCount}`;
  }
}

function onMainClicked() {
  masterCounter += baseClickIncrease;
  decibelLevel.textContent = getDecibelText();
}

function getDecibelText(): string {
  return `(${masterCounter.toPrecision(2)} decibels)`;
}

// Starts the automatic increase of decibel levels.
function startAutoDecibelIncrease() {
  let previousFrameTime = performance.now();
  window.requestAnimationFrame(checkForCounterUpdate);

  function checkForCounterUpdate() {
    const msPerFrameUpdate = 1000 / decibelsPerSecond;

    // This way we only update the counter once it's passed that threshold.
    if (performance.now() - previousFrameTime > msPerFrameUpdate) {
      masterCounter += 1;
      decibelLevel.textContent = getDecibelText();

      previousFrameTime = performance.now();
    }
    window.requestAnimationFrame(checkForCounterUpdate);
  }
}
