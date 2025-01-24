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

export { generateKnightMoves, generateBishopMoves, generateQueenMoves, generateKingMoves }

