import "./style.css";

let counter: number = 0;
let zero = 0;
let deltaTime = 0;
let rateUpgrades = 0;
let incrementRate = 0;
let numUpgrades = 0;

document.body.innerHTML = `
  <p>Counter: <span id="counter">0</span></p>
  <p>RateDisplay: <span id="rateDisplay">0</span></p>
  <p>UpgradesDisplay: <span id="upgrades">0</span></p>
  <button id="dog button">🐕</button>
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
rateDisplayElement.innerHTML = incrementRate + " dogs per second";
upgradesDisplayElement.innerHTML = numUpgrades + " upgrades purchased";

//Dog Button Event Listener
dogButton.addEventListener("click", () => {
  increaseCounterBy(1);
});

//Call function to create upgrades
createNewUpgrade("10 dogs = 0.1 dogs/second", 10, 0.1);
createNewUpgrade("100 dogs = 2.0 dogs/second", 100, 2);
createNewUpgrade("1000 dogs = 10.0 dogs/second", 1000, 10);
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

function createNewUpgrade(
  name: string,
  cost: number,
  rate: number,
) {
  //Create Button
  const newButton: HTMLButtonElement = document.createElement(
    "button",
  ) as HTMLButtonElement;
  newButton.innerHTML = name;

  //Event Listener
  newButton.addEventListener("click", () => {
    if (counter >= cost) {
      rateUpgrades += rate;
      counter -= cost;
      incrementRate += rate;
      numUpgrades += 1;
      rateDisplayElement.innerHTML = rateUpgrades.toFixed(2) +
        " dogs per second";
      console.log("Changed rateDisplay, incrementRate = " + incrementRate);
      upgradesDisplayElement.innerHTML = numUpgrades + " upgrades purchased";
    }
  });
  buttonContainer.appendChild(newButton);
}
