//  need to write an array that will hold the information for the game board, the game board has nine squares, it will need a name value and a token?? value (empty, x, o)

const gameBoard = (() => {
  const allBoardSquares = document.querySelectorAll('.boardSquare');
  const statusText = document.querySelector('statusText');
  const restartBtn = document.querySelector('#restartBtn');
  let turnCounter = 1;
  const PlayerTurn = () => {
    turnCounter % 2 == 0 ? 'x' : 'o';
  };
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  const gameArray = new Array(9).fill('');

  const checkArray = () => console.table(gameArray);

  for (let i = 0; i < allBoardSquares.length; i++) {
    // some elements of this if statement are slightly redundant now, we already have a function that determines the turn. bake that in.
    allBoardSquares[i].addEventListener('click', () => {
      if (turnCounter % 2 == 0 && gameArray[i] === '') {
        gameArray[i] = 'o';
        allBoardSquares[i].innerHTML =
          '<span class="material-symbols-outlined">circle</span>';
        turnCounter++;
      } else if (turnCounter % 2 == 1 && gameArray[i] === '') {
        gameArray[i] = 'x';
        allBoardSquares[i].innerHTML =
          '<span class="material-symbols-outlined">close</span>';
        turnCounter++;
      }
      checkWinner();
    });
  }

  function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const cellA = gameArray[condition[0]];
      const cellB = gameArray[condition[1]];
      const cellC = gameArray[condition[2]];

      if (cellA == '' || cellB == '' || cellC == '') {
        // no wiener
        continue;
      }
      if (cellA == cellB && cellB == cellC) {
        roundWon = true;
        winner = cellA;
        console.log(`player ${winner} is the winner!`);
      }
    }
  }

  //   anything returned below can be used globally
  return {
    checkArray, //prints the array to console for debugging.
  };
  // v end of factory v
})();

const playerFactory = (name, marker) => {
  return {
    name,
    marker, //do i still need this now? rmb to delete from const player 1/2
    shoutName() {
      console.log(`Hello my name is ${name}.`);
    },
  };
};
const player1 = playerFactory('Alex', 'x');
const player2 = playerFactory('Billy', 'o');
