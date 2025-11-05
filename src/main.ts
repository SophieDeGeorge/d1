import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
let zero = 0;
let deltaTime = 0;
let rateUpgrades = 0;
let incrementRate = 0;
//let fps = 0;
//const oneSecond = 1000;

document.body.innerHTML = `
                                  <!-- <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p> -->
                                  <!-- <p>HI I'M AEGIS HELLO : -->
  <p>Counter: <span id="counter">0</span></p>
  <button id="dog button">🐕</button>
                                  <!-- <button id="rateUp" command="disabled">Upgrade Cost: 10 dogs</button> -->
  <div id="button-container"></div>


</p>`;

console.log("1");

//Button container
const buttonContainer = document.getElementById("button-container")!;

//Dog Button Click handler
const dogButton = document.getElementById("dog button")!;
const counterElement = document.getElementById("counter")!;
counterElement.innerHTML = counter.toFixed(2) + " dogs";

//rateUp Button Click handler
/*
const rateUpButton = <HTMLInputElement> document.getElementById("rateUp")!;
rateUpButton.disabled = true;
*/

//Dog Button Event Listener
dogButton.addEventListener("click", () => {
  increaseCounterBy(1);
});
console.log("2");

//rateUp Event listener
/*
rateUpButton.addEventListener("click", () => {
  rateUpgrades += 1;
  counter -= 10;
  increaseCounterBy(0);
  fractionalIncrement();
});
*/

createNewUpgrade("10 dogs = 0.1dogs/second", 10, 0.1);
console.log("3");
createNewUpgrade("100 dogs = 2.0dogs/second", 100, 2);
console.log("7");
createNewUpgrade("1000 dogs = 10.0dogs/second", 1000, 10);
console.log("9");
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
  //fps = oneSecond / deltaTime;
  incrementRate = deltaTime * rateUpgrades; //~0.004 seconds * rateUpgrades
  //console.log("Dogs per second: ", incrementRate * fps);
  //console.log("Frames per second: ", fps);

  increaseCounterBy(incrementRate);

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

  console.log("4");

  /*
  if (counter > cost) {
    newButton.disabled = false;
  } else {
    newButton.disabled = false;
  }
  */
  console.log("5");

  newButton.addEventListener("click", () => {
    //what the button dos

    /*
    if (counter > cost) {
      newButton.disabled = false;
    } else {
      newButton.disabled = true;
    }
    */

    if (counter > cost) {
      rateUpgrades += rate;
      counter -= cost;
    }
    console.log("6");
  });
  buttonContainer.appendChild(newButton);
}
