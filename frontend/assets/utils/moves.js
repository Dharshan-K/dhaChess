import { extractPosition, fileDict } from "./utils.js";
import { keyDict } from "./utils.js";

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
    if(piece == "wP"){
      const value = parseInt(position[1]) + 1;
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
    if(position[1] == "2" && piece=="wP"){
      const value = parseInt(position[1]) + 2;
      const pieceString = position[0] + value.toString();
      moves.push(pieceString);      
    }else if(position[1] == "7" && piece == "bP"){
      const value = parseInt(position[1]) - 2;
      const pieceString = position[0] + value.toString();
      moves.push(pieceString); 
    }
  return moves;
}

function generateRookMoves(position,piece, board){
  const moves = new Array();
  const boardPosition = board.position();
  generateVerticalRookMove(position[0] + (parseInt(position[1])+1).toString(), boardPosition, moves, "up", piece);
  if(parseInt(position[1]) >= 1 && parseInt(position[1]) < 8){
    generateVerticalRookMove(position[0] + (parseInt(position[1])+1).toString(), boardPosition, moves, "up", piece);
  }
  if(parseInt(position[1]) > 1 && parseInt(position[1]) <= 8){
    generateVerticalRookMove(position[0] + (parseInt(position[1])-1).toString(), boardPosition, moves, "down", piece);
  }
  if(position[0] == 'h'){
    const nextSquare = fileDict[keyDict[position[0]] - 1] + position[1];
    generateHorizontalRookMove(nextSquare, boardPosition, moves, "left");    
  }else if(position[0] == 'a'){
    const nextSquare = fileDict[keyDict[position[0]] + 1] + position[1];
    generateHorizontalRookMove(nextSquare, boardPosition, moves, "right");
  }else{
    const rightSquare = fileDict[keyDict[position[0]] + 1] + position[1];
    generateHorizontalRookMove(rightSquare, boardPosition, moves, "right");
    const leftSquare = fileDict[keyDict[position[0]] - 1] + position[1];
    generateHorizontalRookMove(leftSquare, boardPosition, moves, "left")
  }
  return moves;
}

function generateVerticalRookMove(position, board, moves, movement, piece){
  if(parseInt(position[1]) == 8 || parseInt(position[1])== 1){
    moves.push(position);
    return moves;
  }
  if(board[position] != undefined){
    if(board[position][0] != piece[0]){
      moves.push(position)
    }
    return moves;
  }
  moves.push(position);
  if(movement == "up"){
    generateVerticalRookMove(position[0] + (parseInt(position[1])+1), board, moves, "up", piece);
  }else if(movement == "down"){
    generateVerticalRookMove(position[0] + (parseInt(position[1])-1), board, moves, "down", piece)
  }
}

function generateHorizontalRookMove(position, board, moves, movement){
  if(board[position] != undefined){
    moves.push(position);
    return moves;
  }
  if(movement == "left"){
    if(position[0] == 'a'){
      moves.push(position);
      return moves;
    }
    const skip = fileDict[parseInt(keyDict[position[0]]) - 1] + position[1];
    generateHorizontalRookMove(skip, board, moves, "left")
  }
  if(movement == "right"){
    if(position[0] == 'h'){
      moves.push(position);
      return moves;
    }
    const skip = fileDict[parseInt(keyDict[position[0]]) + 1] + position[1];
    generateHorizontalRookMove(skip, board, moves, "right")
  }
  
  moves.push(position);
}

export { detectMoves, validatePawnMove, generateRookMoves }
