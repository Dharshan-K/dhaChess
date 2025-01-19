import { detectMoves } from "./utils/moves.js";
$(function() {
  let selectedSquare = null;
  
  const config = {
      position: 'start',
      pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
      onChange: onChange
  };

  const board = Chessboard('board1', config);

  $('#board1').on('click', '.square-55d63', function(event) {
      let square = $(this).data('square');  
      if (selectedSquare === null) {
        if (board.position()[square]) {
          console.log("selectedSquare", selectedSquare)    
          selectedSquare = square;
          highlightSquare(square);
          detectMoves(board.position(), selectedSquare)
        }
      } else {
          makeMove(selectedSquare, square);
          removeHighlights();
          selectedSquare = null;
      }
  });

  function highlightSquare(square) {
      removeHighlights();      
      $(`#board1 .square-${square}`).addClass('highlight-white');
  }

  function removeHighlights() {
      $('#board1 .square-55d63').removeClass('highlight-white highlight-black');
  }

  function makeMove(from, to) {
      const position = board.position();
      
      if (position[from]) {
          const newPosition = {...position};
          newPosition[to] = newPosition[from];
          delete newPosition[from];
          
          board.position(newPosition);
      }
  }

  function onChange(oldPos, newPos) {
      console.log('Position changed:');
      console.log('Old position:', oldPos);
      console.log(oldPos)
      console.log('New position:', newPos);
  }
});