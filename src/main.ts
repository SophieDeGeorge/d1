/////////////////////////////////////// Imports ////////////////////////////////////////////////////////////
import goddogIMG from "./god_dog.png";
import magicIMG from "./magic_dog.png";
import rescueIMG from "./rescue_dog.jpg";
import "./style.css";
import tacticalIMG from "./tactical_dog.jpg"; // From: https://www.vecteezy.com/vector-art/65811103-dog-pet-in-space-suit-and-helmet-standing-on-the-moon-surface-illustration
import techIMG from "./tech_dog.png";

/////////////////////////////////////// Variable Declaration ////////////////////////////////////////////////////////////
let counter: number = 0;
let zero = 0;
let deltaTime = 0;
let rateUpgrades = 0;
let incrementRate = 0;
let numUpgrades = 0;

/////////////////////////////////////// Page HTML ////////////////////////////////////////////////////////////
document.body.innerHTML = `
  <p>
    Safe Dogs:
    <span id="counter">0</span>
  </p>
  <p>
    Dogs Being Rescued:
    <span id="rateDisplay" >0</span>
  </p>
    <p>Rescue Squads Sent Out:
    <span id="upgrades" >0</span>
  </p>
  
  <button id="dog button" button class="portal-button">🐕</button>
  <div id="button-container"></div>
</p>`;

//////////////////////////////////// Information Display (Main button, dog counter, rate display, upgrade display) ///////////////////////////////////////////////////////////////

const buttonContainer = document.getElementById("button-container")!;

// Main Button Click handler
const dogButton = document.getElementById("dog button")!;
const counterElement = document.getElementById("counter")!;
const rateDisplayElement = document.getElementById("rateDisplay")!;
const upgradesDisplayElement = document.getElementById("upgrades")!;

counterElement.innerHTML = counter.toFixed(2) + " dogs";
rateDisplayElement.innerHTML = incrementRate + " per second";
upgradesDisplayElement.innerHTML = numUpgrades + "";

// Main Button Event Listener
dogButton.addEventListener("click", () => {
  increaseCounterBy(1);
});

//////////////////////////////////// Function Declarations ///////////////////////////////////////////////////////////////
function updateDogAmount() { // Updates the counter element with current counter value
  counterElement.innerHTML = counter.toFixed(2) + " dogs";
}

function increaseCounterBy(x: number) { // Increases Counter by value & calls updateDogAmount
  counter += x;
  console.log("Counter increased by " + x);
  updateDogAmount();
}

function fractionalIncrement() { // Increment fractionally
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

//////////////////////////////////// Upgrade Creation ///////////////////////////////////////////////////////////////
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  buttonText: string;
  imageURL: string;
}

const availableItems: Item[] = [
  {
    name: "Rescue Dogs",
    cost: 10,
    rate: 0.1,
    description: "A team of trained interdimensional-rescue dogs!",
    buttonText: "Send in rescue dogs!",
    imageURL: rescueIMG,
  },
  {
    name: "Tactical Dogs",
    cost: 100,
    rate: 2,
    description:
      "An elite unit of dogs, rigorously trained to find and save dogs across dimensions",
    buttonText: "Send in tactical dogs!",
    imageURL: tacticalIMG,
  },
  {
    name: "Magic Dog",
    cost: 1000,
    rate: 50,
    description:
      "A kind old dog trained in the art of interdimensional teleportation, teleports dogs back to safety",
    buttonText: "Send in a magic dog",
    imageURL: magicIMG,
  },
  {
    name: "Genetically Engineered Dog",
    cost: 5000,
    rate: 200,
    description:
      "An experimental super-dog created with top secret tech, abilities classified",
    buttonText: "Send in a genetically engineered dog",
    imageURL: techIMG,
  },
  {
    name: "GoddoG",
    cost: 10000,
    rate: 1000,
    description: "An all powerful dog who has ascended to a higher plane",
    buttonText: "Unleash the almighty God Dog",
    imageURL: goddogIMG,
  },
];

//////////////////////////////////// Starting the game ///////////////////////////////////////////////////////////////
fractionalIncrement(); // Starts getting the time between frames to fractionally add rates

// Create Buttons with forEach loop from AvaliableItems array
availableItems.forEach((element) => {
  const newButton: HTMLButtonElement = document.createElement(
    "button",
  ) as HTMLButtonElement;
  newButton.setAttribute("style", `background-image: url(${element.imageURL})`);
  newButton.className = "upgrade-buttons";
  newButton.innerHTML = element.buttonText + "<br>Cost: " +
    element.cost.toFixed(2) +
    "<br> (Saves " + element.rate +
    " dogs/sec)<br><br><br><br><br><br><br><br><br><br><br><br>" +
    element.description;

  // Event Listener
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
      newButton.innerHTML = element.buttonText + "<br>Cost: " +
        element.cost.toFixed(2) +
        "<br> (Saves " + element.rate +
        " dogs/sec)<br><br><br><br><br><br><br><br><br><br><br><br>" +
        element.description; //Change Displayed Price
    }
  });
  buttonContainer.appendChild(newButton);
});
