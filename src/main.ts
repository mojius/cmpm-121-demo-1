import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let masterCounter: number = 0;
let frameTime = 1;

let decibelsPerSecond: number = 1.0;
const baseClickIncrease: number = 1;
const item = { A: 0, B: 0, C: 0 };
const currentUpgradeCost: number[] = [10, 100, 1000];

const gameName = "Noisemaker";

document.title = gameName;

const header: HTMLHeadingElement = document.createElement("h1");
header.innerHTML = gameName;
const subHeader: HTMLHeadingElement = document.createElement("h3");
subHeader.innerHTML = "<i>Don't worry, it's a silent game.</i>";

const dpsText: HTMLHeadingElement = document.createElement("h3");

app.append(header);
app.append(dpsText);
app.append(subHeader);

const mainButton: HTMLButtonElement = document.createElement("button"); // Look at me, all fancy with my typing!
mainButton.className = "mainButton";
mainButton.type = "button";
mainButton.className = "buttonStyle";
mainButton.textContent = "Make some noise!🔊⬆";

const upgradeButtonA: HTMLButtonElement = document.createElement("button");
upgradeButtonA.type = "button";
upgradeButtonA.disabled = true;
upgradeButtonA.textContent = `Buy a clock 🕰 (${item.A}): ${currentUpgradeCost[0]} decibels`;
upgradeButtonA.addEventListener("click", onUpgradeClickedA);

const upgradeButtonB: HTMLButtonElement = document.createElement("button");
upgradeButtonB.type = "button";
upgradeButtonB.disabled = true;
upgradeButtonB.textContent = `Buy a pen 🖊 (${item.B}): ${currentUpgradeCost[1]} decibels`;
upgradeButtonB.addEventListener("click", onUpgradeClickedB);

const upgradeButtonC: HTMLButtonElement = document.createElement("button");
upgradeButtonC.type = "button";
upgradeButtonC.disabled = true;
upgradeButtonC.textContent = `Buy a bell 🔔 (${item.C}): ${currentUpgradeCost[2]} decibels`;
upgradeButtonC.addEventListener("click", onUpgradeClickedC);

const decibelLevel: HTMLDivElement = document.createElement("div");
decibelLevel.textContent = getDecibelText();

mainButton.addEventListener("click", onMainClicked);

app.append(mainButton);

app.append(decibelLevel);

app.append(upgradeButtonA);
app.append(upgradeButtonB);
app.append(upgradeButtonC);

startAutoDecibelIncrease();

// Update loop
setInterval(() => {
  checkUpgradePrice(0, upgradeButtonA);
  checkUpgradePrice(1, upgradeButtonB);
  checkUpgradePrice(2, upgradeButtonC);
}, frameTime);

function checkUpgradePrice(num: number, button: HTMLButtonElement): boolean {
  if (currentUpgradeCost[num] > masterCounter) {
    button.disabled = true;
    return false;
  } else {
    button.disabled = false;
    return true;
  }
}

function onUpgradeClickedA() {
  if (checkUpgradePrice(0, upgradeButtonA)) {
    item.A += 1;
    masterCounter -= currentUpgradeCost[0];
    decibelsPerSecond += 0.1;
    currentUpgradeCost[0] *= 1.15;
    upgradeButtonA.textContent = `Buy a clock 🕰 (${
      item.A
    }): ${currentUpgradeCost[0].toFixed(2)} decibels`;
  }
}

function onUpgradeClickedB() {
  if (checkUpgradePrice(1, upgradeButtonB)) {
    item.B += 1;
    masterCounter -= currentUpgradeCost[1];
    decibelsPerSecond += 2;
    currentUpgradeCost[1] *= 1.15;
    upgradeButtonB.textContent = `Buy a pen 🖊 (${
      item.B
    }): ${currentUpgradeCost[1].toFixed(2)} decibels`;
  }
}

function onUpgradeClickedC() {
  if (checkUpgradePrice(2, upgradeButtonC)) {
    item.C += 1;
    masterCounter -= currentUpgradeCost[2];
    decibelsPerSecond += 50;
    currentUpgradeCost[2] *= 1.15;
    upgradeButtonC.textContent = `Buy a bell 🔔 (${
      item.C
    }): ${currentUpgradeCost[2].toFixed(2)} decibels`;
  }
}

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
