let box = document.querySelectorAll(".box");
const arr = [];
let minesNumber, a;
let play = false;
let amountInput = document.querySelector(".amountInput");
let betAmount = document.querySelector(".profitAmount");
let profit;
const restart = document.getElementById("restart");
const restartBlock = document.querySelector(".oneBack");
const openInstruction=document.getElementById("openInstruction");
const closeInstruction=document.getElementById("closeInstruction");
const mainBoxContainer = document.querySelector(".mainBoxContainer");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function setMines(minesNumber) {
  if (amountInput.value != "") {
    
    for (let i = 1; i <= Math.floor(minesNumber); i++) {
      let n = Math.floor(Math.random() * 25) + 1;
      if (search(n) != 0) {
        arr.push(n);
      }
      else{
        i-=1;
      }
    }
    play = true;
    restartBlock.style.display = "flex";
    betAmount.innerText = amountInput.value;

    console.log(arr);
  }
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

restart.addEventListener("click", () => {
  for (let j = 0; j < box.length; j++) {
    box[j].innerHTML = "";
  }
  restartBlock.style.display = "none";
  amountInput.value = "";
  betAmount.innerText = "";
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

document.getElementById("start").addEventListener("click", () => {
  minesNumber = Number(document.querySelector("#numberOfMines").value);
  setMines(minesNumber);
  a = minesNumber;
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//----------------MAIN GAME--------------------------
mainBoxContainer.addEventListener("click", (event) => {
  if (play) {
    if (event.target.className == "box") {
      if (search(event.target.id) != 0) {
        event.target.innerHTML = '<img src="assets/diamond.png" alt="">';
        profit = Number(betAmount.innerText);
        profit += (profit/100)*a;
        betAmount.innerText = profit.toFixed(2);
      } else {
        event.target.innerHTML = '<img src="assets/mine.png" alt="">';
        gameOver();
        play = false;
        // betAmount.innerText = "0";
        arr.length = 0;
        console.log(arr);
      }
    }
  }
});
//----------------MAIN GAME--------------------------

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function search(key) {
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] == key) {
      return 0;
    }
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function gameOver() {
  for (let i = 0; i < box.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (search(box[i].id) != 0) {
        box[i].innerHTML = '<img src="assets/diamond.png" alt="">';
      } else {
        box[i].innerHTML = '<img src="assets/mine.png" alt="">';
      }
    }
  }
}

openInstruction.addEventListener("click",()=>{
  document.getElementById("instruction").style.display="flex";
})
closeInstruction.addEventListener("click",()=>{
  document.getElementById("instruction").style.display="none";
})