import { validatePawnMove, generateRookMoves } from "./utils/moves.js";
$(function() {
  let selectedSquare = null;
  
  const config = {
      position: 'start',
      pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
      onChange: onChange,
      onMouseoverSquare: onMouseoverSquare,
      onMouseoutSquare: onMouseoutSquare
  };

  const board = Chessboard('board1', config);

  $('#board1').on('click', '.square-55d63', function(event) {
      let square = $(this).data('square');  
      if (selectedSquare === null) {
        if (board.position()[square]) {
          console.log("selectedSquare", selectedSquare)    
          selectedSquare = square;
          highlightSquare(square);
        }
      } else {
          makeMove(selectedSquare, square);
          removeHighlights();
          selectedSquare = null;
      }
  });

  function highlightSquare(square) {
      $(`#board1 .square-${square}`).addClass('highlight-white');
  }

  function removeHighlights() {
      $('#board1 .square-55d63').removeClass('highlight-white highlight-black');
  }

  function makeMove(from, to) {
    const position = board.position();  
    if (position[from]) {
      const piece = position[from];
      let moves = [];
      switch(piece[1]){
        case "P":
            moves = validatePawnMove(from, piece, board);
            for(let i=0;i<moves.length;i++){
                if(moves[i]== to){
                    const newPosition = {...position};
                    newPosition[to] = newPosition[from];
                    delete newPosition[from];          
                    board.position(newPosition);
                }
            }
            break;
        case "R":
            moves = generateRookMoves(from, piece, board);
            console.log("moves", moves)
            if(moves.length == 0){
                console.log("no moves.")
            }
            for(let i=0;i<moves.length;i++){
                
                if(position[to] != undefined){
                    const toPosition = position[to]
                    if(toPosition[0] == piece[0]){
                        console.log("illegal move")
                        return "illegal move"
                    } 
                }
                if(moves[i]== to){
                    const newPosition = {...position};
                    newPosition[to] = newPosition[from];
                    delete newPosition[from];          
                    board.position(newPosition);
                }
            }
            break;
        default:
            console.log("Move is not allowed.")
        }
    }
  }

  function onChange(oldPos, newPos) {
    //   console.log('Position changed:');
    //   console.log('Old position:', oldPos);
    //   console.log(oldPos)
    //   console.log('New position:', newPos);
  }

  // function to highlight possible moves when mouse moves to the square
  function onMouseoverSquare(square, piece){
    let moves = []
    switch(piece){
        case "wP":
            moves = validatePawnMove(square, piece, board);
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i]);
            }
            break;
        case "bP":
            moves = validatePawnMove(square, piece, board);
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }
            break;
        case "wR":
            moves = generateRookMoves(square,piece,board)
            if(moves.length != 0){
                for(let i=0;i<moves.length;i++){
                    highlightSquare(moves[i])
                }
            }
            break;
        case "bR":
            moves = generateRookMoves(square,piece,board)
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }
            break;        
        default:
            console.log("square is empty.")
    }
  }

  // function to remove the highlight when ouse moves out of the square
  function onMouseoutSquare(){
    removeHighlights();
  }  
});