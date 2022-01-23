// factory functions || helper functions

function Player(name, letter) {
  return {
    name,
    letter,
    winner: false,
  };
}

function checkMove(per, _indexOne) {
  // horizontal
  if (gameboardArray.arr[_indexOne].every((let) => let !== " ")) {
    if (gameboardArray.arr[0].every((let) => let === per.letter)) {
      per.winner = true;
    } else if (gameboardArray.arr[1].every((let) => let === per.letter)) {
      per.winner = true;
    } else if (gameboardArray.arr[2].every((let) => let === per.letter)) {
      per.winner = true;
    }
  }
  // vertical
  if (
    gameboardArray.arr[0][0] === per.letter &&
    gameboardArray.arr[1][0] === per.letter &&
    gameboardArray.arr[2][0] === per.letter
  ) {
    per.winner = true;
  } else if (
    gameboardArray.arr[0][1] === per.letter &&
    gameboardArray.arr[1][1] === per.letter &&
    gameboardArray.arr[2][1] === per.letter
  ) {
    per.winner = true;
  }
  if (
    gameboardArray.arr[0][2] === per.letter &&
    gameboardArray.arr[1][2] === per.letter &&
    gameboardArray.arr[2][2] === per.letter
  ) {
    per.winner = true;
  }
  // diagonal
  if (
    gameboardArray.arr[0][0] === per.letter &&
    gameboardArray.arr[1][1] === per.letter &&
    gameboardArray.arr[2][2] === per.letter
  ) {
    per.winner = true;
  } else if (
    gameboardArray.arr[0][2] === per.letter &&
    gameboardArray.arr[1][1] === per.letter &&
    gameboardArray.arr[2][0] === per.letter
  ) {
    per.winner = true;
  }
}

function listenToClick(id) {
  const square = document.getElementById(id);

  // parse _number
  const _num = id.split("-")[1];
  const _indexOne = Math.floor(parseInt(_num) / 10) - 1;
  const _indexTwo = (parseInt(_num) % 10) - 1;

  function _handleClick(e) {
    let person = "";
    if (square.innerHTML === "") {
      if (counter % 2 === 0) {
        square.innerHTML = "X";
        person = player1;
      } else {
        square.innerHTML = "O";
        person = player2;
      }
      gameboardArray.arr[_indexOne][_indexTwo] = square.innerHTML;
      checkMove(person, _indexOne);
      counter++;
    }

    const _isThereAWinner = person.winner ? true : person.winner;

    if (_isThereAWinner) {
      gameboardArray.showResult(
        person,
        `${person.name.toUpperCase()} IS THE WINNER! 
        <p>Click Anywhere to continue </p>`
      );
      gameboardArray.clickToReset();
    }

    if (counter >= 9) {
      gameboardArray.showResult(
        person,
        `DRAW! 
      <p>Click anywhere to continue </p>`
      );
      gameboardArray.clickToReset();
    }
  }

  return square.addEventListener("click", _handleClick, false);
}

//-------------------------------//

// main flow
let counter = 0;
const gameboardArray = (function () {
  const _showWinner = document.createElement("div");
  const _blurredBg = document.createElement("div");

  const arr = new Array(3);

  function clearArray() {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(" ", " ", " ");
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(" ", " ", " ");
  }

  function clearInnerHTML() {
    document.getElementById("square-11").innerHTML = "";
    document.getElementById("square-12").innerHTML = "";
    document.getElementById("square-13").innerHTML = "";
    document.getElementById("square-21").innerHTML = "";
    document.getElementById("square-22").innerHTML = "";
    document.getElementById("square-23").innerHTML = "";
    document.getElementById("square-31").innerHTML = "";
    document.getElementById("square-32").innerHTML = "";
    document.getElementById("square-33").innerHTML = "";
  }

  function showResult(person, text) {
    _showWinner.classList.add("announce-winner");
    _blurredBg.classList.add("blurred-bg");
    _blurredBg.setAttribute("id", "blurred-bg");
    _showWinner.innerHTML = text;
    _showWinner.style.display = "block";
    document.body.prepend(_blurredBg);
    document.body.prepend(_showWinner);
  }

  function _resetAll() {
    document.body.removeChild(_blurredBg);
    document.body.removeChild(_showWinner);
    gameboardArray.clearArray();
    gameboardArray.clearInnerHTML();
    player1.winner = false;
    player2.winner = false;
    counter = 0;
  }

  function clickToReset() {
    _showWinner.addEventListener("click", _resetAll);
    _blurredBg.addEventListener("click", _resetAll);
  }

  return { arr, clearArray, clearInnerHTML, showResult, clickToReset };
})();

const player1 = Player("Player1", "X");
const player2 = Player("Bot", "O");

const displayController = (function () {
  listenToClick("square-11");
  listenToClick("square-12");
  listenToClick("square-13");
  listenToClick("square-21");
  listenToClick("square-22");
  listenToClick("square-23");
  listenToClick("square-31");
  listenToClick("square-32");
  listenToClick("square-33");
})();
