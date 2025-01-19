import { extractPosition } from "./utils.js";
import { keyDict } from "./utils.js";

const validMoves = {}

function detectMoves(board,selectedSquare){
  const piece = board[selectedSquare];
  switch (piece[1]){
    case "P":
      console.log("detected pawn...")
      validatePawnMove(board,selectedSquare)
    default:
      extractPosition(selectedSquare)
  }
}

function validatePawnMove(board,position){
  const moves = new Array();
  const piece = board[position];
  console.log("piece", piece)
  if(piece == "wP" || piece == "bP"){
    if(piece == "wP"){
      const value = keyDict[position[0]] + 1;
      const pieceString = position[0] + value.toString();
      moves.push(pieceString);
    }else if(piece == "bP"){
      const value = keyDict[position[0]] - 1;
      const pieceString = position[0] + value.toString();
      moves.push(pieceString);
    }
    if(position[1] == "2"){
      const value = keyDict[position[0]] + 2;
      const pieceString = position[0] + value.toString();
      moves.push(pieceString);      
    }else if(position[1] == "7"){
      const value = keyDict[position[0]] - 2;
      const pieceString = position[0] + value.toString();
      moves.push(pieceString); 
    }
    console.log("moves",moves)
  }
}

export { detectMoves, validatePawnMove }

