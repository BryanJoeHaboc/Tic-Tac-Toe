// factory functions || helper functions

function Player(name, letter) {
  return {
    name,
    letter,
    winner: false,
  };
}

function checkMove(per, indexOne) {
  // horizontal
  if (gameboardArray[indexOne].every((let) => let !== " ")) {
    if (gameboardArray[0].every((let) => let === per.letter)) {
      per.winner = true;
    } else if (gameboardArray[1].every((let) => let === per.letter)) {
      per.winner = true;
    } else if (gameboardArray[2].every((let) => let === per.letter)) {
      per.winner = true;
    }
  }
  // vertical
  if (
    gameboardArray[0][0] === per.letter &&
    gameboardArray[1][0] === per.letter &&
    gameboardArray[2][0] === per.letter
  ) {
    per.winner = true;
  } else if (
    gameboardArray[0][1] === per.letter &&
    gameboardArray[1][1] === per.letter &&
    gameboardArray[2][1] === per.letter
  ) {
    per.winner = true;
  }
  if (
    gameboardArray[0][2] === per.letter &&
    gameboardArray[1][2] === per.letter &&
    gameboardArray[2][2] === per.letter
  ) {
    per.winner = true;
  }
  // diagonal
  if (
    gameboardArray[0][0] === per.letter &&
    gameboardArray[1][1] === per.letter &&
    gameboardArray[2][2] === per.letter
  ) {
    per.winner = true;
  } else if (
    gameboardArray[0][2] === per.letter &&
    gameboardArray[1][1] === per.letter &&
    gameboardArray[2][0] === per.letter
  ) {
    per.winner = true;
  }
}

function listenToClick(id) {
  const square = document.getElementById(id);

  // parse number
  const num = id.split("-")[1];
  const indexOne = Math.floor(parseInt(num) / 10) - 1;
  const indexTwo = (parseInt(num) % 10) - 1;

  function handleClick(e) {
    let person = "";
    if (square.innerHTML === "") {
      if (counter % 2 === 0) {
        square.innerHTML = "X";
        person = player1;
      } else {
        square.innerHTML = "O";
        person = player2;
      }
      gameboardArray[indexOne][indexTwo] = square.innerHTML;
      checkMove(person, indexOne);
      counter++;
    }

    person.winner ? console.log(`${person.name}`) : person.winner;

    if (person.winner || counter === 10) {
      console.log("wat");
      const square11 = document.getElementById("square-11");
      const square12 = document.getElementById("square-12");
      const square13 = document.getElementById("square-13");
      const square21 = document.getElementById("square-21");
      const square22 = document.getElementById("square-22");
      const square23 = document.getElementById("square-23");
      const square31 = document.getElementById("square-31");
      const square32 = document.getElementById("square-32");
      const square33 = document.getElementById("square-33");
      square11.removeEventListener("click", handleClick);
      square12.removeEventListener("click", handleClick);
      square13.removeEventListener("click", handleClick);
      square21.removeEventListener("click", handleClick);
      square22.removeEventListener("click", handleClick);
      square23.removeEventListener("click", handleClick);
      square31.removeEventListener("click", handleClick);
      square32.removeEventListener("click", handleClick);
      square33.removeEventListener("click", handleClick);
    }
  }

  const eventSquare = square.addEventListener("click", handleClick);
  return eventSquare;
}

//-------------------------------//

// main flow
let counter = 0;
const gameboardArray = (function () {
  const arr = new Array(3);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(" ", " ", " ");
  }

  return arr;
})();

const player1 = Player("player1", "X");
const player2 = Player("bot", "O");

if (!player1.winner && !player2.winner) {
  if (counter > -1 || counter < 10) {
    listenToClick("square-11");
    listenToClick("square-12");
    listenToClick("square-13");
    listenToClick("square-21");
    listenToClick("square-22");
    listenToClick("square-23");
    listenToClick("square-31");
    listenToClick("square-32");
    listenToClick("square-33");
  } else {
    console.log("counter is 10");
  }
} else {
  alert("bawal na");
}
