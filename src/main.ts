import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let masterCounter: number = 0;
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

// Increment gradually
setInterval(function () {
  masterCounter += 0.0001;
  decibelLevel.textContent = getDecibelText();
}, 4000);

function onClicked() {
  masterCounter += baseClickIncrease;
  decibelLevel.textContent = getDecibelText();
}

function getDecibelText(): string {
  return `(${masterCounter.toPrecision(2)} decibels)`;
}
