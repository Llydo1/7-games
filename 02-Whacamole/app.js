const squares = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", startGame);
let currentTime = 8;
let point = 0;

//point++ if mole square is clicked, also mole square become
//black square for 200mili
let countPoint = (e) => {
  if (e && e.target.classList.contains("mole")) {
    e.target.classList.remove("mole");
    e.target.classList.add("black");
    setTimeout(() => {
      e.target.classList.remove("black");
    }, 200);
    score.textContent = "Your score: " + ++point;
  }
};

function startGame() {
  //declare variable
  currentTime = 30;
  point = 0;

  //add Eventlistener for square
  squares.forEach((square) => square.addEventListener("click", countPoint));

  //Create random mole
  let moleCreate = setInterval(() => {
    let randomIndex = Math.floor(Math.random() * 3 + 1);
    for (let i = 0; i < randomIndex; i++) {
      let seletedSquare = document.getElementById(
        Math.floor(Math.random() * 9 + 1)
      );
      if (!seletedSquare.classList.contains("mole")) {
        seletedSquare.classList.add("mole");
        setTimeout(() => {
          seletedSquare.classList.remove("mole");
        }, 400 + Math.random() * 1600);
      }
    }
    countPoint();
  }, 1500);

  //Count time until 0, then clear 2 intervals
  //Also clear event click and mole class
  function countDown() {
    currentTime--;
    timeLeft.textContent = "Time left: " + currentTime;
    if (currentTime == 0) {
      alert("get go");
      clearInterval(countDownTimerId);
      clearInterval(moleCreate);
      squares.forEach((square) => {
        square.removeEventListener("click", countPoint);
        square.classList.remove("mole");
      });
    }
  }

  //Revoke countdown function
  let countDownTimerId = setInterval(countDown, 1000);
}
