function generateKnightMoves(position){
  let moves = new Array();
  moves.push(String.fromCharCode(position.charCodeAt(0)+1) + (parseInt(position[1]) +2))
  moves.push(String.fromCharCode(position.charCodeAt(0)-1) + (parseInt(position[1]) +2))
  moves.push(String.fromCharCode(position.charCodeAt(0)+1) + (parseInt(position[1]) -2))
  moves.push(String.fromCharCode(position.charCodeAt(0)-1) + (parseInt(position[1]) -2))
  moves.push(String.fromCharCode(position.charCodeAt(0)+2) + (parseInt(position[1]) +1))
  moves.push(String.fromCharCode(position.charCodeAt(0)-2) + (parseInt(position[1]) +1))
  moves.push(String.fromCharCode(position.charCodeAt(0)+2) + (parseInt(position[1]) -1))
  moves.push(String.fromCharCode(position.charCodeAt(0)-2) + (parseInt(position[1]) -1))
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

