import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
let zero = 0;

document.body.innerHTML = `
                                  <!-- <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p> -->
                                  <!-- <p>HI I'M AEGIS HELLO : -->
  <p>Counter: <span id="counter">0</span></p>
  <button id="dog button">🐕</button>

</p>`;

//Click handler
const button = document.getElementById("dog button")!;
const counterElement = document.getElementById("counter")!;
counterElement.innerHTML = counter.toString() + " dogs";

button.addEventListener("click", () => {
  counter++;
  counterElement.innerHTML = counter.toString() + " dogs";
  console.log("Num: ", button, counterElement, counter);
});

// Increment on Interval
//setInterval(incrementCounter, 1000);
requestAnimationFrame(firstFrame);
function firstFrame(timestamp) {
  zero = timestamp;
  incrementCounter(timestamp);
}

function incrementCounter(timestamp) {
  counter += (timestamp - zero) / 1000;
  counterElement.innerHTML = counter.toString() + " dogs";
}

console.log("hi im aegis jr");
console.log("hi im aegis sr");
