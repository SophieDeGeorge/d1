import rescueIMG from "./rescue_dog.jpg";
import "./style.css";
import tacticalIMG from "./tactical_dog.jpg"; //https://www.vecteezy.com/vector-art/65811103-dog-pet-in-space-suit-and-helmet-standing-on-the-moon-surface-illustration

let counter: number = 0;
let zero = 0;
let deltaTime = 0;
let rateUpgrades = 0;
let incrementRate = 0;
let numUpgrades = 0;

document.body.innerHTML = `
  <p>Safe Dogs: <span id="counter">0</span></p>
  <p>Dogs Being Rescued: <span id="rateDisplay">0</span></p>
  <p>Rescue Squads Sent Out: <span id="upgrades">0</span></p>
  <button id="dog button" button class="portal-button">🐕</button>
  <div id="button-container"></div>
</p>`;

//Button container
const buttonContainer = document.getElementById("button-container")!;

//Dog Button Click handler
const dogButton = document.getElementById("dog button")!;
const counterElement = document.getElementById("counter")!;
const rateDisplayElement = document.getElementById("rateDisplay")!;
const upgradesDisplayElement = document.getElementById("upgrades")!;

counterElement.innerHTML = counter.toFixed(2) + " dogs";
rateDisplayElement.innerHTML = incrementRate + " per second";
upgradesDisplayElement.innerHTML = numUpgrades + "";

//Dog Button Event Listener
dogButton.addEventListener("click", () => {
  increaseCounterBy(1);
});

fractionalIncrement();

//Updates the counter element with current counter value
function updateDogAmount() {
  counterElement.innerHTML = counter.toFixed(2) + " dogs";
}

//Increases Counter by value & calls updateDogAmount
function increaseCounterBy(x: number) {
  counter += x;
  console.log("Counter increased by " + x);
  updateDogAmount();
}

// Increment fractionally
function fractionalIncrement() {
  requestAnimationFrame(firstFrame);
}

function firstFrame(timestamp: number) {
  zero = timestamp;
  incrementCounter(timestamp);
}

function incrementCounter(timestamp: number) {
  deltaTime = (timestamp - zero) / 1000;
  incrementRate = deltaTime * rateUpgrades;
  increaseCounterBy(incrementRate);
  zero = timestamp;
  requestAnimationFrame(incrementCounter);
}

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  imageURL: string;
}

const availableItems: Item[] = [
  {
    name: "Rescue Dogs",
    cost: 10,
    rate: 0.1,
    description: "A team of trained interdimensional-rescue dogs!",
    imageURL: rescueIMG,
  },
  {
    name: "Tactical Dogs",
    cost: 100,
    rate: 2,
    description:
      "An elite unit of dogs, rigorously trained to find and save dogs across dimensions",
    imageURL: tacticalIMG,
  },
  {
    name: "Magic Dog",
    cost: 1000,
    rate: 50,
    description:
      "A kind old dog trained in the art of interdimensional teleportation, able to teleport dogs back to their home dimension",
    imageURL: "",
  },
];

//Create Buttons forEach AvaliableItems Loop
availableItems.forEach((element) => {
  const newButton: HTMLButtonElement = document.createElement(
    "button",
  ) as HTMLButtonElement;
  //newButton.style.backgroundImage = element.imageURL;
  newButton.setAttribute("style", `background-image: url(${element.imageURL})`);
  newButton.className = "upgrade-buttons";
  newButton.innerHTML = "Send in " + element.cost + " " + element.name +
    " (Saves " + element.rate + " dogs/sec)";

  //Event Listener
  newButton.addEventListener("click", () => {
    if (counter >= element.cost) {
      rateUpgrades += element.rate;
      counter -= element.cost;
      incrementRate += element.rate;
      numUpgrades += 1;
      rateDisplayElement.innerHTML = rateUpgrades.toFixed(2) +
        " per second";
      upgradesDisplayElement.innerHTML = numUpgrades + " ";
      element.cost = element.cost * 1.15; //Price Increase
      newButton.innerHTML = "Send in " + element.cost.toFixed(2) + element.name; //Change Displayed Price
    }
  });
  buttonContainer.appendChild(newButton);
});
