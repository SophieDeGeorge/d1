import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
let zero = 0;
let deltaTime = 0;
let rateUpgrades = 0;
let incrementRate = 0;
let numUpgrades = 0;
//let fps = 0;
//const oneSecond = 1000;

document.body.innerHTML = `
                                  <!-- <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p> -->
                                  <!-- <p>HI I'M AEGIS HELLO : -->
  <p>Counter: <span id="counter">0</span></p>
  <p>RateDisplay: <span id="rateDisplay">0</span></p>
  <p>UpgradesDisplay: <span id="upgrades">0</span></p>
  <button id="dog button">🐕</button>
  <div id="button-container"></div>


</p>`;

//console.log("1");

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

//rateUp Button Click handler
/*
const rateUpButton = <HTMLInputElement> document.getElementById("rateUp")!;
rateUpButton.disabled = true;
*/

//Dog Button Event Listener
dogButton.addEventListener("click", () => {
  increaseCounterBy(1);
});
//console.log("2");

//rateUp Event listener
/*
rateUpButton.addEventListener("click", () => {
  rateUpgrades += 1;
  counter -= 10;
  increaseCounterBy(0);
  fractionalIncrement();
});
*/

createNewUpgrade("10 dogs = 0.1 dogs/second", 10, 0.1);
//console.log("3");
createNewUpgrade("100 dogs = 2.0 dogs/second", 100, 2);
//console.log("7");
createNewUpgrade("1000 dogs = 10.0 dogs/second", 1000, 10);
//console.log("9");
fractionalIncrement();

function updateDogAmount() {
  counterElement.innerHTML = counter.toFixed(2) + " dogs";
}

function checkDogAmount() {
  if (counter < 10) {
    //rateUpButton.disabled = true;
  } else {
    //rateUpButton.disabled = false;
  }
}

function increaseCounterBy(x: number) {
  counter += x;
  console.log("Counter increased by " + x);
  updateDogAmount();
  checkDogAmount();
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
  incrementRate = deltaTime * rateUpgrades; //~0.004 seconds * rateUpgrades
  increaseCounterBy(incrementRate); //console.log("Dogs per second: ", incrementRate * fps); console.log("Frames per second: ", fps);
  zero = timestamp;
  requestAnimationFrame(incrementCounter);
}

function createNewUpgrade(
  name: string,
  cost: number,
  rate: number,
) {
  //Click handler

  const newButton: HTMLButtonElement = document.createElement(
    "button",
  ) as HTMLButtonElement;

  newButton.innerHTML = name;

  newButton.addEventListener("click", () => {
    /*
    if (counter > cost) {
      newButton.disabled = false;
    } else {
      newButton.disabled = true;
    }
    */

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
    //console.log("6");
  });
  buttonContainer.appendChild(newButton);
}
