// to do: we need to set up the game board icons to be populated from the array instead of at the same time as the array.

const gameBoard = (() => {
  const allBoardSquares = document.querySelectorAll('.boardSquare');
  const turnDiv = document.querySelector('.turnDiv');
  var roundWon = 'false';

  const checkArray = () => console.table(gameArray); // for debugging

  const restartBtn = document.querySelector('#restartBtn');
  let turnCounter = 1;

  const playerTurn = () => {
    return turnCounter % 2 == 0 ? player1 : player2; // Self challenge: at the beginning of the game i want the players to choose from 4 icons in its own little pop up (we did it in the card exercise).
  };

  restartBtn.addEventListener('click', () => {
    for (let i = 0; i < allBoardSquares.length; i++) {
      gameArray[i] = '';
      allBoardSquares[i].innerHTML = '';
      allBoardSquares[i].classList.remove('winningSquare');
    }
    console.log('restart');
    turnCounter = 1;
    roundWon = 'false';
    updateTurnDiv();
  });

  updateTurnDiv = () => {
    // playerName = playerTurn().name;

    if (roundWon === 'false') {
      turnDiv.innerHTML = `It's ${playerTurn().name}'s Turn`;
    } else if (roundWon === 'true') {
      turnCounter--;
      turnDiv.innerHTML = `${playerTurn().name} won!`;
    }

    if (roundWon === 'tie') {
      turnDiv.innerHTML = `TIE!`;
      console.log('tie');
    }
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

  // dont let this run if the game if roundWon = true or tie
  for (let i = 0; i < allBoardSquares.length; i++) {
    allBoardSquares[i].addEventListener('click', () => {
      if (allBoardSquares[i].innerHTML === '') {
        gameArray[i] = playerTurn().marker;
        allBoardSquares[i].innerHTML = playerTurn().icon;
        checkWinner();
        turnCounter++;
        updateTurnDiv();
      }
    });
  }

  function checkWinner() {
    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      //   cell a,b,c indicates the position in the win condition array,
      const cellA = gameArray[condition[0]];
      const cellB = gameArray[condition[1]];
      const cellC = gameArray[condition[2]];

      if (cellA == '' || cellB == '' || cellC == '') {
        continue;
      }
      if (cellA == cellB && cellB == cellC) {
        roundWon = 'true';

        const winSquare1 = condition[0];
        const winSquare2 = condition[1];
        const winSquare3 = condition[2];

        allBoardSquares[winSquare1].classList.add('winningSquare');
        allBoardSquares[winSquare2].classList.add('winningSquare');
        allBoardSquares[winSquare3].classList.add('winningSquare');
        console.log(`im here ${winSquare1}`);
      }
      if (turnCounter === 9 && roundWon === 'false') {
        roundWon = 'tie';
      }
    }
  }

  //   }

  //   anything returned below can be used globally
  return {
    checkArray, //prints the array to console for debugging.
  };
  // v end of factory v
})();

const playerFactory = (name, marker, icon) => {
  return {
    name, // i want to populate this from a pop up too
    marker,
    icon, //we will eventually use a function to let the player choose their marker at the start of the game.
    // getIcon() {},
  };
};

const player1 = playerFactory(
  'Alex',
  'x',
  '<span class="material-symbols-outlined">close</span>'
);

const player2 = playerFactory(
  'Billy',
  'o',
  '<span class="material-symbols-outlined">circle</span>'
);
