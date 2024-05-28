document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const messageElement = document.getElementById("message");
    const resetButton = document.getElementById("reset");
    const turnIndicator = document.getElementById("turnIndicator");
    const overlay = document.getElementById("overlay");
    const winnerMessage = document.getElementById("winnerMessage");
    const quitButton = document.getElementById("quit");
    const nextRoundButton = document.getElementById("nextRound");
    const xWinsElement = document.getElementById("xWins");
    const oWinsElement = document.getElementById("oWins");
    const drawsElement = document.getElementById("draws");
  
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let xWins = 0;
    let oWins = 0;
    let draws = 0;
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.innerText = currentPlayer;
      clickedCell.style.color = currentPlayer === "X" ? "#31c4be" : "#f3b238";
      clickedCell.style.fontWeight = "bold";
    };
  
    const handlePlayerChange = () => {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      turnIndicator.innerText = `${currentPlayer}'s Turn`;
      // change color of either x and o
      if (currentPlayer === "X") {
        turnIndicator.style.color = "#31c4be";
      } else {
        turnIndicator.style.color = "#f3b238";
      }
    };
  
    const displayCrossLine = (winCondition) => {
      const board = document.querySelector(".board");
      const line = document.createElement("div");
      line.classList.add("cross-line");
  
      const [a, b, c] = winCondition;
      const rowA = Math.floor(a / 3);
      const rowC = Math.floor(c / 3);
      const colA = a % 3;
      const colC = c % 3;
  
      if (rowA === rowC) {
        line.style.width = "306px";
        line.style.height = "6px";
        line.style.transform = `translateY(${rowA * 100 + 50}px)`;
      } else if (colA === colC) {
        line.style.width = "6px";
        line.style.height = "306px";
        line.style.transform = `translateX(${colA * 100 + 50}px)`;
      } else if (a === 0 && c === 8) {
        line.classList.add("diagonal-1");
        line.style.transform = "rotate(45deg)";
      } else if (a === 2 && c === 6) {
        line.classList.add("diagonal-2");
        line.style.transform = "rotate(-45deg)";
      }
  
      board.appendChild(line);
      setTimeout(() => line.classList.add("show"), 100);
    };
  
    const handleResultValidation = () => {
      let roundWon = false;
      for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === "" || b === "" || c === "") {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          displayCrossLine(winCondition);
          break;
        }
      }
  
      if (roundWon) {
        winnerMessage.innerText = `${currentPlayer} Takes the Round`;
        overlay.classList.add("show");
        gameActive = false;
        if (currentPlayer === "X") {
          xWins++;
          xWinsElement.innerText = xWins;
        } else {
          oWins++;
          oWinsElement.innerText = oWins;
        }
        return;
      }
  
      let roundDraw = !gameState.includes("");
      if (roundDraw) {
        winnerMessage.innerText = "Game ended in a draw!";
        overlay.classList.add("show");
        gameActive = false;
        draws++;
        drawsElement.innerText = draws;
        return;
      }
  
      handlePlayerChange();
    };
  
    const handleCellClick = (event) => {
      const clickedCell = event.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));
  
      if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
      }
  
      handleCellPlayed(clickedCell, clickedCellIndex);
      handleResultValidation();
    };
  
    const handleRestartGame = () => {
      currentPlayer = "X";
      gameActive = true;
      gameState = ["", "", "", "", "", "", "", "", ""];
      turnIndicator.innerText = `${currentPlayer}'s Turn`;
      cells.forEach((cell) => (cell.innerHTML = ""));
      overlay.classList.remove("show");
      document.querySelectorAll(".cross-line").forEach((line) => line.remove());
    };
  
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", handleRestartGame);
    quitButton.addEventListener("click", () => location.reload());
    nextRoundButton.addEventListener("click", handleRestartGame);
  });
  