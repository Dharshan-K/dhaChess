import { extractPosition, fileDict } from "./utils.js";
import { keyDict } from "./utils.js";

function validatePawnMove(position, piece, board){
  const moves = new Array();
    if(piece == "wP"){
      const value = parseInt(position[1]) + 1;
      const pieceString = position[0] + value.toString();
      if(board[pieceString] == undefined){
        moves.push(pieceString);
      }
      const leftSquare = fileDict[keyDict[position[0]]-1] + value.toString();
      const rightSquare = fileDict[keyDict[position[0]]+1] + value.toString();
      for(const key in board){
        if(key == leftSquare || key == rightSquare){
          if(board[key][0] != "w"){
            moves.push(key);
          }
        }            
      }
    }else if(piece == "bP"){
      const value = parseInt(position[1]) - 1;
      const pieceString = position[0] + value.toString();
      if(board[pieceString] == undefined){
        moves.push(pieceString);
      }
      const leftSquare = fileDict[keyDict[position[0]]+1] + value.toString();
      const rightSquare = fileDict[keyDict[position[0]]-1] + value.toString();
      for(const key in board){
        if(key == leftSquare || key == rightSquare){
          if(board[key][0] != "b"){
            moves.push(key);
          }
        }            
      }
    }
    if(position[1] == "2" && piece=="wP"){
      const value = parseInt(position[1]) + 2;
      const pieceString = position[0] + value.toString();
      if(board[pieceString] ==undefined){
        moves.push(pieceString); 
      }           
    }else if(position[1] == "7" && piece == "bP"){
      const value = parseInt(position[1]) - 2;
      const pieceString = position[0] + value.toString();
      if(board[pieceString] ==undefined){
        moves.push(pieceString); 
      }           
    }
  return moves;
}

function generateRookMoves(position, board){
  const directions = [
    [1,0],[-1,0],[0,1],[0,-1]
  ]
  const file = position.charCodeAt(0);
  const rank = parseInt(position[1]);
  let moves = new Array();

  for(const [fileOffset, rankOffset] of directions){
    let currentFile = file;
    let currentRank = rank;
    while(true){
      currentFile += fileOffset;
      currentRank += rankOffset;
      const newPosition = String.fromCharCode(currentFile) + currentRank;
      if (currentFile < 97 || currentFile > 104 || currentRank < 1 || currentRank > 8) {
        break;
      }
      if(board[newPosition] != undefined){
        if(board[newPosition][0] != board[position][0]){
          moves.push(newPosition)
        }
        break;
      }

      moves.push(newPosition);      
    }
  }
  return moves;
}


export { validatePawnMove, generateRookMoves }
