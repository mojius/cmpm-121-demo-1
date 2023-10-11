import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let masterCounter: number = 0;

const decibelsPerSecond: number = 1;
const baseClickIncrease: number = 0.01;

const gameName = "Noisemaker";

document.title = gameName;

const header: HTMLHeadingElement = document.createElement("h1");
header.innerHTML = gameName;
const subHeader: HTMLHeadingElement = document.createElement("h3");
subHeader.innerHTML = "<i>Don't worry, it's a silent game.</i>";
app.append(header);
app.append(subHeader);

const mainButton: HTMLButtonElement = document.createElement("button"); // Look at me, all fancy with my typing!
mainButton.className = "mainButton";
mainButton.type = "button";
mainButton.className = "buttonStyle";
mainButton.textContent = "🔊⬆";

const decibelLevel: HTMLDivElement = document.createElement("div");
decibelLevel.textContent = getDecibelText();

mainButton.addEventListener("click", onClicked);

app.append(mainButton);

app.append(decibelLevel);

startAutoDecibelIncrease();

function onClicked() {
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
