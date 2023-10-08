import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

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

app.append(mainButton);
