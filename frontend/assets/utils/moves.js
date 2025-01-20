import { extractPosition, fileDict } from "./utils.js";
import { keyDict } from "./utils.js";

const validMoves = {}

function detectMoves(board,selectedSquare){
  const piece = board[selectedSquare];
  switch (piece[1]){
    case "P":
      validatePawnMove(board,selectedSquare, board)
      break;
    default:
      extractPosition(selectedSquare)
  }
}

function validatePawnMove(position, piece, board){
  const moves = new Array();
  const boardPosition = board.position();
  console.log("piece", piece, position[1])
    if(piece == "wP"){
      const value = parseInt(position[1]) + 1;
      console.log("value", parseInt(position[1]))
      const pieceString = position[0] + value.toString();
      if(boardPosition[pieceString] == undefined){
        moves.push(pieceString);
      }
      const leftSquare = fileDict[keyDict[position[0]]-1] + value.toString();
      const rightSquare = fileDict[keyDict[position[0]]+1] + value.toString();
      for(const key in boardPosition){
        if(key == leftSquare || key == rightSquare){
          moves.push(key);
        }            
      }
    }else if(piece == "bP"){
      const value = parseInt(position[1]) - 1;
      const pieceString = position[0] + value.toString();
      if(boardPosition[pieceString] == undefined){
        moves.push(pieceString);
      }
      const leftSquare = fileDict[keyDict[position[0]]+1] + value.toString();
      const rightSquare = fileDict[keyDict[position[0]]-1] + value.toString();
      for(const key in boardPosition){
        if(key == leftSquare || key == rightSquare){
          moves.push(key);
        }            
      }
    }
    if(position[1] == "2"){
      const value = parseInt(position[1]) + 2;
      const pieceString = position[0] + value.toString();
      moves.push(pieceString);      
    }else if(position[1] == "7"){
      const value = parseInt(position[1]) - 2;
      const pieceString = position[0] + value.toString();
      moves.push(pieceString); 
    }
    console.log("moves",moves)
  return moves;
}

// function validateRookMove()

export { detectMoves, validatePawnMove }

