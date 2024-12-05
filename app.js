// Get references
const msg = document.querySelector("#msg");
const msgContainer = document.querySelector(".msg-container");
const boxes = document.querySelectorAll(".box");
const winSound = document.querySelector("#win-sound");
const loseSound = document.querySelector("#lose-sound");
const resetBtn = document.querySelector("#reset-btn");
const newBtn = document.querySelector("#new-btn");

let currentPlayer = "X";
let gameOver = false;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Show the winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  winSound.play(); // Play sound only for winner
  gameOver = true;
};

// Check for a winner or tie
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (boxes[a].innerText !== "" &&
        boxes[a].innerText === boxes[b].innerText &&
        boxes[b].innerText === boxes[c].innerText) {
      showWinner(boxes[a].innerText);
      return;
    }
  }

  if ([...boxes].every(box => box.innerText !== "")) {
    msg.innerText = "It's a tie!";
    msgContainer.classList.remove("hide");
    loseSound.play(); // Play sound only for tie
    gameOver = true;
  }
};

// Handle box clicks
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.innerText === "" && !gameOver) {
      box.innerText = currentPlayer;
      checkWinner();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});

// Reset or New Game
const resetGame = () => {
  boxes.forEach(box => (box.innerText = ""));
  currentPlayer = "X";
  gameOver = false;
  msgContainer.classList.add("hide");
  // No sound should play here
};

// Attach resetGame to both buttons
resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
