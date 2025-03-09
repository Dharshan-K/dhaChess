let board;
let game = new Chess();
let isAgainstComputer = true;
let myTurn = true;
let playerColor = "white";

function initBoard() {
  const config = {
    position: 'start',
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
    draggable: true,
    onDrop: handleMove,
    orientation: playerColor,
  };
  board = Chessboard('board1', config);

  if (playerColor === "black") {
    myTurn = false;
    setTimeout(computerMove, 500);
  } else {
    myTurn = true;
  }
  updateStatus();
}

function handleMove(source, target) {
  if (!myTurn) return false;

  let move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  board.position(game.fen());
  myTurn = false;

  updateStatus();
  setTimeout(computerMove, 500);
}

function computerMove() {
  if (!isAgainstComputer || game.game_over()) return;

  let moves = game.moves();
  if (moves.length === 0) return;

  let randomMove = moves[Math.floor(Math.random() * moves.length)];
  game.move(randomMove);
  board.position(game.fen());

  myTurn = true;
  updateStatus();
}

function updateStatus() {
  let status = "";
  if (game.in_checkmate()) {
    status = "Checkmate! Game over.";
  } else if (game.in_check()) {
    status = "Check!";
  } else if (game.in_draw()) {
    status = "It's a draw!";
  } else {
    status = myTurn ? "Your move!" : "Computer's move...";
  }
  document.getElementById("status").innerText = status;
}

document.getElementById("playWithComputer").addEventListener("click", () => {
  isAgainstComputer = true;
  playerColor = document.getElementById("pieceColor").value;
  game.reset();
  board.destroy(); 
  initBoard();
});

initBoard();
