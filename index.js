let box = document.querySelectorAll(".box");
const arr = [];
const lockedBlock = [];
let minesNumber,
  a,
  calcAmount = 0,
  totalDepositeValue = 10000;
let play = false;
let depositeAmount = document.querySelector(".depositeAmount");
let amountInput = document.querySelector(".amountInput");
let profitAmount = document.querySelector(".profitAmount");
let Balance = document.getElementById("TotalWinning");
let balanceWarning = document.getElementById("balanceWarning");
let warning = document.getElementById("betWarning"); //betting amount warning.
let profit;
const openDeposite = document.getElementById("depositeOpen");
const depositeSubmit = document.getElementById("depositeSubmit");
const closeDeposite = document.getElementById("closeDeposite");
const cashOut = document.getElementById("cashOut");
const restart = document.getElementById("restart");
const restartBlock = document.querySelector(".oneBack");
const openInstruction = document.getElementById("openInstruction");
const closeInstruction = document.getElementById("closeInstruction");
const mainBoxContainer = document.querySelector(".mainBoxContainer");

let lossAudio = new Audio('assets/lose.mp3');

// +++++++++++++++++++++ Default Balance +++++++++++++++++++++++++++++++++++

window.onload = () => {
  Balance.innerText = totalDepositeValue;
  for (let j = 0; j < box.length; j++) {
    box[j].classList.remove('addShadow');
    box[j].innerHTML = "";
    box[j].style = "";
  }
};

// +++++++++++++++++++++ Deposite +++++++++++++++++++++++++++++++++++

depositeSubmit.addEventListener("click", () => {
  totalDepositeValue += Number(depositeAmount.value);
  Balance.innerText = totalDepositeValue;
  document.getElementById("deposite").style.display = "none";
  depositeAmount.value = "";
});
openDeposite.addEventListener("click", () => {
  document.getElementById("deposite").style.display = "flex";
  depositeAmount.focus();
});
closeDeposite.addEventListener("click", () => {
  document.getElementById("deposite").style.display = "none";
});

// ++++++++++++++++++++++Start button++++++++++++++++++++++++++++++++++

document.getElementById("start").addEventListener("click", () => {
  minesNumber = Number(document.querySelector("#numberOfMines").value);
  setMines(minesNumber);
  a = Number(minesNumber);
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function setMines(minesNumber) {
  if (totalDepositeValue < Number(amountInput.value)) {
    warning.innerText = "Not sufficent Balance!";
    balanceWarning.innerText = "Deposite more to play!";
  } else if (amountInput.value != "") {
    totalDepositeValue -= Number(amountInput.value);
    Balance.innerText = totalDepositeValue;

    warning.innerText = "";
    balanceWarning.innerText = "";
    for (let i = 1; i <= Math.floor(minesNumber); i++) {
      let n = Math.floor(Math.random() * 25) + 1;
      if (search(n, arr) != 0) {
        arr.push(n);
      } else {
        i -= 1;
      }
    }
    for (let i = 0; i < box.length; i++) {
      box[i].classList.add('addShadow');
      }
    play = true;
    restartBlock.style.display = "flex";
    profitAmount.innerText = amountInput.value;

    console.log(arr);
  } else {
    warning.innerText = "Enter Amount to start";
  }
}

// ++++++++++++++++++++++Reset and Cash Out++++++++++++++++++++++++++++++++++

function resetBlocks() {
  cashOut.style.background="red";
  for (let j = 0; j < box.length; j++) {
    box[j].classList.remove('addShadow');
    box[j].innerHTML = "";
    box[j].style = "";
    
  }
  restartBlock.style.display = "none";
  // amountInput.value = "";
  profitAmount.innerText = "";
  arr.length = 0;
  lockedBlock.length = 0;
}

restart.addEventListener("click", () => {
  if (play) {
    totalDepositeValue += Number(amountInput.value);
    Balance.innerText = totalDepositeValue.toFixed(2);
  }
  resetBlocks();
});

cashOut.addEventListener("click", () => {
  if (play) {
    totalDepositeValue += Number(profitAmount.innerText);
    Balance.innerText = totalDepositeValue.toFixed(2);
    resetBlocks();
  }
});

// ++++++++++++++++++++Calculation++++++++++++++++++++++++++++++++++++

function calculateProfit() {
  profit = Number(profitAmount.innerText);
  calcAmount = profit;
  calcAmount += (profit / 100) * a;
  profitAmount.innerText = calcAmount.toFixed(2);
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//----------------------MAIN GAME--------------------------
mainBoxContainer.addEventListener("click", (event) => {
  if (play) {
    if (event.target.classList.contains('box')) {
      if (search(event.target.id, arr) != 0) {

        event.target.innerHTML = '<img src="assets/diamond.png" alt="">';
        lockedBlock.push(Number(event.target.id));
       
        event.target.classList.remove('addShadow');
        

        calculateProfit();
      } else {
        cashOut.style.background="rgb(118, 0, 0)";
        event.target.innerHTML = '<img src="assets/mine.png" alt="">';
        play = false;
        event.target.classList.remove('addShadow');
        gameOver();
        profitAmount.innerText = "0";
        lossAudio.play();
      }
    }
    // else{
    //   alert(1)
    // }
  }
});
//----------------------MAIN GAME--------------------------

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function gameOver() {
  for (let i = 0; i < box.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (search(box[i].id, arr) != 0) {
        box[i].innerHTML = `<img src="assets/diamond.png" alt="">`;
      } else {
        box[i].innerHTML = `<img src="assets/mine.png" alt="">`;
      }
    }
  }
}

function search(key, a) {
  for (let j = 0; j < a.length; j++) {
    if (arr[j] == key) {
      return 0;
    }
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

openInstruction.addEventListener("click", () => {
  document.getElementById("instruction").style.display = "flex";
});
closeInstruction.addEventListener("click", () => {
  document.getElementById("instruction").style.display = "none";
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// mainBoxContainer.onmouseover=(event) => {
  
//   if (play &&
//     event.target.classList.contains('box') &&
//     search(Number(event.target.id), lockedBlock) != 0
//   ) {
//     event.target.classList.remove('addShadow');
//   }
// };
// mainBoxContainer.onmouseout=(event) => {
//   if(play){ 
//     if(event.target.classList.contains('box') && search(Number(event.target.id), lockedBlock) != 0) {
//       event.target.classList.add('addShadow');
//     }
//   }
// };