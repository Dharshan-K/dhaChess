import { validatePawnMove, generateRookMoves } from "./utils/moves.js";
import { generateBishopMoves, generateKingMoves, generateKnightMoves, generateQueenMoves, getCheckMate } from "./utils/moves2.js";

$(async function() {
  let selectedSquare = null;
  var myColour = sessionStorage.getItem("pieceColour");
  var myTurn;
  var opponentSocketId;
  var statusMessage;
  let winnerMessage = "Winner status";


  const socket = io("http://localhost:3001");
    
  document.getElementById("playWithPlayer").addEventListener("click", () => {
    socket.emit("createGame", {
    playerName : localStorage.getItem("username"),
    socketId: socket.id,
    pieceColor: document.getElementById("pieceColor").value,
    })
    document.getElementById("winner").innerText = "waiting to Connect"
  });


  socket.on("startGame",(data)=>{
    console.log("game started")
    sessionStorage.setItem("player1Name", data.player1Name)
    sessionStorage.setItem("player1SocketId", data.player1SocketId)
    sessionStorage.setItem("player1PieceColour", data.player1PieceColour)
    sessionStorage.setItem("player2Name", data.player2Name)
    sessionStorage.setItem("player2SocketId", data.player2SocketId)
    sessionStorage.setItem("player2PieceColour", data.player2PieceColour)
    if(localStorage.getItem("username") == data.player1Name){
      sessionStorage.setItem("opponent", data.player2SocketId)  
      sessionStorage.setItem("pieceColour", data.player1PieceColour)       
    }else{
      sessionStorage.setItem("opponent", data.player1SocketId)
      sessionStorage.setItem("pieceColour", data.player2PieceColour) 
    }
    myColour = sessionStorage.getItem("pieceColour");
    board.orientation(myColour)
    myTurn = myColour == "white" ? true : false;
    document.getElementById("status").innerText = myColour == "white" ? "your move" : "opponent's move";
    document.getElementById("winner").innerText = "Game started"
  })

  socket.on("makeMove",async (data)=>{
    await board.position(data)
    const currentPosition = board.position();
    let blackKingStatus = getCheckMate(currentPosition, "bK");
    let whiteKingStatus = getCheckMate(currentPosition, "wK");
    let myStatus = myColour == "white" ? whiteKingStatus : blackKingStatus; 

    if(myColour == "white"){
        if(whiteKingStatus.status == true){
            console.log("your are on check")
            statusMessage = "your are on check"
            if(whiteKingStatus.moves.length == 0){
                console.log("Your king is in check and no moves available")
                winnerMessage = "Your have lost your King."
                document.getElementById("newGame").style.display = "block"
            }
        }        
        if(blackKingStatus.status == true){
            console.log("your opponent is on check", blackKingStatus.moves)
            statusMessage = "your opponent is on check"
            if(blackKingStatus.moves.length == 0){
                console.log("Your opponent king is in check and no moves available")
                winnerMessage = "Opponent King is captured."
                document.getElementById("newGame").style.display = "block"
            }
        }    
        document.getElementById("status").innerText = statusMessage;
        document.getElementById("winner").innerText = winnerMessage    
    }else if(myColour == "black"){
        if(blackKingStatus.status == true){
            console.log("your are on check")
            statusMessage = "your are on check"
            if(blackKingStatus.moves.length == 0){
                console.log("Your king is in check and no moves available")
                winnerMessage = "Your have lost your King."
                document.getElementById("newGame").style.display = "block"
            }
        }        
        if(whiteKingStatus.status == true){
            console.log("your opponent is on check")
            statusMessage = "your opponent is on check"
            if(whiteKingStatus.moves.length == 0){
                console.log("Your opponent king is in check and no moves available")
                winnerMessage = "Opponent King is captured."
                document.getElementById("newGame").style.display = "block"
            }
        } 
        document.getElementById("status").innerText = statusMessage;
        document.getElementById("winner").innerText = winnerMessage;       
    }else{
        console.log("nobody is in check")
    }
    console.log("myClour", myColour)
    // getCheckMate(board.position(), "wK")
    // getCheckMate(board.position(), "bK")
    statusMessage = "your turn"
    document.getElementById("status").innerText = statusMessage
    myTurn = true;
  })

  socket.on("waitingToConnect", (data)=>{
    console.log("waiting to connect")
  })

  socket.on("error",(data)=>{
    alert(data.message)
  })

   
  const config = {
    position: 'start',
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
    onChange: onChange,
    onMouseoverSquare: onMouseoverSquare,
    onMouseoutSquare: onMouseoutSquare,
    orientation: myColour
  };

  const board = Chessboard('board1', config);

  $('#board1').on('click', '.square-55d63', function(event) {
    let square = $(this).data('square');  
    if(myTurn){
        document.getElementById("status").innerText = "your move"
        if (selectedSquare === null) {
            if (board.position()[square]) {
                console.log("selectedSquare", selectedSquare)    
                selectedSquare = square;
            }
        } else {
            makeMove(selectedSquare, square);
            // if(myColour == "white"){
            //     const moves = getCheckMate(board.position(), "wK")
            //     if(moves.status == true){
            //         console.log("checkMate")
            //         statusMessage = "you are on check"
            //         if(moves.moves.length == 0){
            //             console.log("the king is in check and no moves available")
            //             winnerMessage = "you have been checkMate"
            //         }
            //     }
            //     document.getElementById("status").innerText = statusMessage;
            //     document.getElementById("winner").innerText = winnerMessage 
            // }else{
            //     const moves = getCheckMate(board.position(), "bK")
            //     console.log("moves", moves)
            //     if(moves.status == true){
            //         console.log("checkMate")
            //         statusMessage = "you are on check"
            //         if(moves.moves.length == 0){
            //             console.log("the king is in check and no moves available")
            //             winnerMessage = "you have been checkMate"
            //         }
            //     }
            //     document.getElementById("status").innerText = statusMessage;
            //     document.getElementById("winner").innerText = winnerMessage 
            // }
            removeHighlights();
            selectedSquare = null;
        }
    }else{
        statusMessage = "opponent's move"
        document.getElementById("status").innerText = statusMessage;
        console.log("Not your turn")
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
    if (position[from] && position[from][0] == myColour[0]) {
      const piece = position[from];
      let moves = [];
      switch(piece[1]){
        case "P":
            moves = validatePawnMove(from, piece, board.position());
            updateMove(moves, position, from, to);
            break;
        case "R":
            moves = generateRookMoves(from, board.position());
            if(moves.length == 0){
                console.log("no moves.")
            }
            updateMove(moves, position, from, to);
            break;
        case "N":
            moves = generateKnightMoves(from, board.position());
            updateMove(moves, position, from, to);       
            break;
        case "B":
            moves = generateBishopMoves(from, board.position());
            updateMove(moves, position, from, to);  
            break;
        case "Q":
            moves = generateQueenMoves(from, board.position());
            updateMove(moves, position, from, to);
            break;
        case "K":
            moves = getCheckMate(board.position(), piece);
            updateMove(moves.moves, position, from, to);    
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
    if(myColour[0] != piece[0]){
        return
    }
    switch(piece){
        case "wP":
            moves = validatePawnMove(square, piece, board.position());
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i]);
            }
            break;
        case "bP":
            moves = validatePawnMove(square, piece, board.position());
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }
            break;
        case "wR":
            moves = generateRookMoves(square, board.position())
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }            
            break;
        case "bR":
            moves = generateRookMoves(square, board.position())
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }
            break;     
        case "wN":
            moves = generateKnightMoves(square, board.position());
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }
            break;
        case "bN":
            moves = generateKnightMoves(square, board.position());
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }
            break;
        case "wB":
            moves = generateBishopMoves(square, board.position())
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }
            break;
        case "bB":
            moves = generateBishopMoves(square, board.position())
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }
            break;
        case "bQ":
            moves = generateQueenMoves(square, board.position());
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }
            break;
        case "wQ":
            moves = generateQueenMoves(square, board.position());
            for(let i=0;i<moves.length;i++){
                highlightSquare(moves[i])
            }
            break;
        case "wK":
            moves = getCheckMate(board.position(), piece);
            // if(moves.length == 0){
            //     console.log("checkMate")
            // }
            for(let i=0;i<moves.moves.length;i++){
                highlightSquare(moves.moves[i])
            }
            break;
        case "bK":
            moves = getCheckMate(board.position(), piece);
            // if(moves.length == 0){
            //     console.log("checkMate")
            // }
            for(let i=0;i<moves.moves.length;i++){
                highlightSquare(moves.moves[i])
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

  function updateMove(moves, position, from, to){
    for(let i=0;i<moves.length;i++){
        if(position[to] != undefined){
            const toPosition = position[to]
            if(toPosition[0] == position[from]){
                console.log("illegal move")
                return "illegal move"
            } 
        }
        if(moves[i]== to){
            const newPosition = {...position};
            newPosition[to] = newPosition[from];
            if(newPosition[from] == "wP" && to[1] == '8'){
                newPosition[to] = "wQ";
            }else if(newPosition[from] == "bP" && to[1] == '1'){
                newPosition[to] = "bQ"
            }else{
                console.log("")
            }
            delete newPosition[from];          
            board.position(newPosition);

            const currentPosition = board.position();
            let blackKingStatus = getCheckMate(currentPosition, "bK");
            let whiteKingStatus = getCheckMate(currentPosition, "wK")
            let myStatus = myColour == "white" ? whiteKingStatus : blackKingStatus; 

            if(myColour == "white"){
                if(whiteKingStatus.status == true){
                    console.log("your are on check")
                    statusMessage = "your are on check"
                    if(whiteKingStatus.moves.length == 0){
                        console.log("Your king is in check and no moves available")
                        winnerMessage = "Your have lost your King"
                        document.getElementById("newGame").style.display = "block"
                    }
                }        
                
                if(blackKingStatus.status == true){
                    console.log("your opponent is on check", blackKingStatus.moves[0])
                    statusMessage = "your opponent is on check"
                    if(blackKingStatus.moves.length == 0){
                        console.log("Your opponent king is in check and no moves available")
                        winnerMessage = "Opponent King is captured"
                        document.getElementById("newGame").style.display = "block"
                    }
                }
                document.getElementById("status").innerText = statusMessage;
                document.getElementById("winner").innerText = winnerMessage;                     
            }else if(myColour == "black"){
                if(blackKingStatus.status == true){
                    console.log("your are on check")
                    statusMessage = "your are on check"
                    if(blackKingStatus.moves.length == 0){
                        console.log("Your king is in check and no moves available")
                        winnerMessage = "Your have lost your King"
                        document.getElementById("newGame").style.display = "block"
                    }
                }        
                
                if(whiteKingStatus.status == true){
                    console.log("your opponent is on check")
                    statusMessage = "your opponent is on check"
                    if(whiteKingStatus.moves.length == 0){
                        console.log("Your opponent king is in check and no moves available")
                        winnerMessage = "Opponent King is captured."
                        document.getElementById("newGame").style.display = "block"
                    }
                }  
                document.getElementById("status").innerText = statusMessage;
                document.getElementById("winner").innerText = winnerMessage;
            }else{
                console.log("nobody is in check")
            }
            socket.emit("sendMove", {position : newPosition, socketId : sessionStorage.getItem("opponent")})
            statusMessage = "opponent's turn"
            document.getElementById("status").innerText = statusMessage
            myTurn = false;            
        }
    }

  }
});