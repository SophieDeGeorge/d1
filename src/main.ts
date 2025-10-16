import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
let zero = 0;
let timeBetweenFrames = 0;
let rateUpgrades = 0;
let incrementRate = 0;
const oneSecond = 1000;

document.body.innerHTML = `
                                  <!-- <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p> -->
                                  <!-- <p>HI I'M AEGIS HELLO : -->
  <p>Counter: <span id="counter">0</span></p>
  <button id="dog button">🐕</button>
  <button id="rateUp" command="disabled">Upgrade Cost: 10 dogs</button>

</p>`;

//Dog Button Click handler
const dogButton = document.getElementById("dog button")!;
const counterElement = document.getElementById("counter")!;
counterElement.innerHTML = counter.toString() + " dogs";

//Dog Button Event Listener
dogButton.addEventListener("click", () => {
  increaseCounterBy(1);
  counterElement.innerHTML = counter.toString() + " dogs";
  //console.log("Num: ", dogButton, counterElement, counter);
});

//rateUp Button Click handler
const rateUpButton = <HTMLInputElement> document.getElementById("rateUp")!;
rateUpButton.disabled = true;

//rateUp Event listener
rateUpButton.addEventListener("click", () => {
  rateUpgrades += 1;
  counter -= 10;
  increaseCounterBy(0);
});

function updateDogAmount() {
  counterElement.innerHTML = counter.toString() + " dogs";
}

function checkDogAmount() {
  if (counter < 10) {
    console.log("Disabled");
    rateUpButton.disabled = true;
  } else {
    console.log("Enabled");
    rateUpButton.disabled = false;
  }
}

function increaseCounterBy(x: number) {
  counter += x;
  updateDogAmount();
  checkDogAmount();
  fractionalIncrement();
}

// Increment fractionally
function fractionalIncrement() {
  if (rateUpgrades > 0) {
    requestAnimationFrame(firstFrame);
  }
}

function firstFrame(timestamp: number) {
  zero = timestamp;
  incrementCounter(timestamp);
}

function incrementCounter(timestamp: number) {
  timeBetweenFrames = timestamp - zero;
  incrementRate = timeBetweenFrames / (oneSecond / rateUpgrades); //divide the miliseconds between frames by the result of 1000ms / rateUpgrades
  increaseCounterBy(incrementRate);
  //counter += incrementRate;

  //console.log(timestamp - zero);

  counterElement.innerHTML = counter.toString() + " dogs";
  zero = timestamp;
  requestAnimationFrame(incrementCounter);
}

//console.log("hi im aegis jr");
//console.log("hi im aegis sr");
