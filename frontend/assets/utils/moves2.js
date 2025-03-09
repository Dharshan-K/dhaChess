import { validatePawnMove, generateRookMoves} from "./moves.js"

function generateKnightMoves(position, board){
  const directions = [
    [1,-2],[2,-1],[2,1],[1,2],[-1,2],[-1,-2],[-2,1],[-2,-1]
  ]
  let moves = new Array();
  const file = position.charCodeAt(0);
  const rank = parseInt(position[1])

  for(const [fileOffset, rankOffset] of directions){
    let currentFile = file + fileOffset;
    let currentRank = rank + rankOffset;
    const newPosition = String.fromCharCode(currentFile) + currentRank;

    if (currentFile < 97 || currentFile > 104 || currentRank < 1 || currentRank > 8) {
      continue;
    }
    if(board[newPosition] != undefined){
      if(board[newPosition][0] != board[position][0]){        
        moves.push(newPosition)
      }
      if(board[newPosition][0] != board[position][0] & board[newPosition][1] == 'k'){
        return 
      }
      continue;
    }
    moves.push(newPosition);    
  }
  return moves;
}

function generateBishopMoves(position, board) {
  const moves = new Array();
  const file = position.charCodeAt(0);  
  const rank = parseInt(position[1]);
  
  const directions = [
      [1, 1],   
      [1, -1],  
      [-1, 1],  
      [-1, -1]  
  ];
  
  for (const [fileOffset, rankOffset] of directions) {
      let currentFile = file;
      let currentRank = rank;
      
      while (true) {
        currentFile += fileOffset;
        currentRank += rankOffset;
        const newPosition = String.fromCharCode(currentFile) + currentRank;          
        if (currentFile < 97 || currentFile > 104 || currentRank < 1 || currentRank > 8) {
          break;
        }          
        if (board[newPosition] != undefined) { 
          if(board[position][0] != board[newPosition][0]){
            moves.push(newPosition)
          }
          break;
        }
        moves.push(newPosition);
      }
  }
  return moves;
}


function generateQueenMoves(position, board){
  const directions = [
    [1,1],[-1,-1],[1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]
  ]
  const file = position.charCodeAt(0);
  const rank = parseInt(position[1]);
  const moves = new Array();

  for(const [fileOffset, rankOffset] of directions){
    let currentFile = file;
    let currentRank = rank;

    while(true){
      currentFile += fileOffset;
      currentRank += rankOffset;
      const newPosition = String.fromCharCode(currentFile) + currentRank;

      if(currentFile < 97 || currentFile > 104 || currentRank < 1 || currentRank > 8){
        break;
      }
      if(board[newPosition] != undefined){
        if(board[newPosition][0] != board[position][0]){
          moves.push(newPosition)
        }
        break;
      }
      
      moves.push(newPosition)
    }
  }
  return moves;  
}

function generateKingMoves(position, board){
  const directions = [
    [1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]
  ]
  const moves = new Array();
  const file = position.charCodeAt(0);
  const rank = parseInt(position[1]);

  for(const [fileOffset, rankOffset] of directions){
    let currentFile = file;
    let currentRank = rank;

    currentFile += fileOffset;
    currentRank += rankOffset;

    const newPosition = String.fromCharCode(currentFile) + currentRank;

    if(board[newPosition] != undefined){
      if(board[newPosition][0] != board[position][0]){
        moves.push(newPosition)
      }
      continue;
    }

    if(currentFile < 97 || currentFile > 104 || currentRank < 1 || currentRank >8){
      continue;
    }

    moves.push(newPosition);
  }
  return moves;
}

function getCheckMate(board, piece){
  let checkMateMoves = new Set()
  let checkMatePosition;
  let checkStatus = false;
  let whiteKingMoves = []
  let blackKingMoves = []
  let whiteKingPosition;
  let blackKingPosition;
  for(let square in board){
    if(board[square][0] == piece[0] && board[square][1] != "K"){
      continue;
    }
    let moves=[]
    switch(board[square]){
        case "wP":
            moves = validatePawnMove(square, board[square], board);
            checkMateMoves= [...checkMateMoves, ...moves]
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        case "bP":
            moves = validatePawnMove(square, board[square], board);
            checkMateMoves= [...checkMateMoves, ...moves]
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        case "wR":
            moves = generateRookMoves(square, board)
            checkMateMoves= [...checkMateMoves, ...moves]
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        case "bR":
            moves = generateRookMoves(square, board)
            checkMateMoves= [...checkMateMoves, ...moves]
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    checkMatePosition = moves[i]
                    
                }
            }
            break;     
        case "wN":
            moves = generateKnightMoves(square, board);
            checkMateMoves= [...checkMateMoves, ...moves]
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        case "bN":
            moves = generateKnightMoves(square, board);
            checkMateMoves= [...checkMateMoves, ...moves]
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        case "wB":
            moves = generateBishopMoves(square, board)
            checkMateMoves= [...checkMateMoves, ...moves]
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    // console.log("Bishop check")
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        case "bB":
            moves = generateBishopMoves(square, board)
            checkMateMoves= [...checkMateMoves, ...moves]
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    // console.log("Bishop check")
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        case "bQ":
            moves = generateQueenMoves(square, board);
            checkMateMoves= [...checkMateMoves, ...moves]
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    // console.log("Queen check")
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        case "wQ":
            moves = generateQueenMoves(square, board);
            checkMateMoves= [...checkMateMoves, ...moves]
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    // console.log("Queen check")                    
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        case "wK":
            moves = generateKingMoves(square, board);
            whiteKingPosition = square;
            whiteKingMoves = moves
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    // console.log("king check")
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        case "bK":
            moves = generateKingMoves(square, board);
            blackKingPosition = square;
            blackKingMoves = moves;
            for(let i=0;i<moves.length;i++){
                if(board[moves[i]] != undefined && board[moves[i]][1] == "K"){
                    console.log("check")
                    checkStatus = true
                    // console.log("king check")
                    checkMatePosition = moves[i]
                    
                }
            }
            break;
        default:
            console.log("square is empty.")

    }
  }
  if(piece == "wK"){
    const moves = generateKingMoves(blackKingPosition, board);
    checkMateMoves = [...checkMateMoves, ...moves]
    // console.log("possible white check mate moves", checkMateMoves)
    // console.log("whiteKingMoves before filtering: ", whiteKingMoves)
    for(let i=0;i<checkMateMoves.length;i++){
     for(let j=0;j<whiteKingMoves.length;j++){
       if(whiteKingMoves[j] == checkMateMoves[i]){
         whiteKingMoves.splice(j,1)
      }
    }
  }
  }else if(piece=="bK"){
    const moves = generateKingMoves(whiteKingPosition, board);
    checkMateMoves = [...checkMateMoves, ...moves]
    // console.log("possible black check mate moves", checkMateMoves)
    // console.log("blackKingMoves before filtering: ", blackKingMoves)
    for(let i=0;i<checkMateMoves.length;i++){
      for(let j=0;j<blackKingMoves.length;j++){
        if(blackKingMoves[j] == checkMateMoves[i]){
         blackKingMoves.splice(j,1)
        }
      }
    }
  }else{
    console.log("not a king")
  }

  if(piece == "wK"){    
    // whiteKingMoves.filter((move)=> move!=undefined)
    // console.log("whiteKingMoves", whiteKingMoves)
    
    const info = {
      status : checkStatus,
      moves : whiteKingMoves
    }
    return info
  }else if(piece = "bK"){
      // blackKingMoves.filter((move)=> move!=undefined)
      console.log("blackKingMoves", blackKingMoves)
    const info = {
      status : checkStatus,
      moves : blackKingMoves
    }
    return info
  }else{
    console.log("not a king")
  }

  return true
}

export { generateKnightMoves, generateBishopMoves, generateQueenMoves, generateKingMoves, getCheckMate }

