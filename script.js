//  need to write an array that will hold the information for the game board, the game board has nine squares, it will need a name value and a token?? value (empty, x, o)

const gameBoard = (() => {
  const gameArray = Array(9).fill(null);
  let turn = 1;

  const omg = () => console.table(gameArray);

  const allBoardSquares = document.querySelectorAll('.boardSquare');
  for (let i = 0; i < allBoardSquares.length; i++) {
    allBoardSquares[i].addEventListener('click', () => {
      // console.log(`Happy ${i}`);
      if (turn % 2 == 0 && gameArray[i] === null) {
        gameArray[i] = 'o';
        allBoardSquares[i].innerHTML =
          '<span class="material-symbols-outlined">circle</span>';
        turn++;
      } else if (turn % 2 == 1 && gameArray[i] === null) {
        gameArray[i] = 'x';
        allBoardSquares[i].innerHTML =
          '<span class="material-symbols-outlined">close</span>';
        turn++;
      }
    });
  }
  return {
    omg,
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
