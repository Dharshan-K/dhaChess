export class Board{
  private static readonly WhitePawn = 1;
  private static readonly WhiteRook = 2;
  private static readonly WhiteKnight = 3;
  private static readonly WhiteBishop = 4;
  private static readonly WhiteKing = 5;
  private static readonly WhiteQueen = 6;

  private static readonly BlackPawn = -1;
  private static readonly BlackRook = -2;
  private static readonly BlackKnight = -3;
  private static readonly BlackBishop = -4;
  private static readonly BlackKing = -5;
  private static readonly BlackQueen = -6;

  private static readonly Empty = 0;
  private board: number[];

  constructor(){
    this.board = new Array(64).fill(Board.Empty);
    this.buildBoard();
  }

  buildBoard(){
    for(let i=8;i<16;i++){
      this.board[i] = Board.BlackPawn;
      this.board[i+40] = Board.WhitePawn;
    }

    this.board[0] = this.board[7] = Board.BlackRook;
    this.board[1] = this.board[6] = Board.BlackKnight;
    this.board[2] = this.board[5] = Board.BlackBishop;
    this.board[3] = Board.BlackKing;
    this.board[4] = Board.BlackQueen;

    this.board[63] = this.board[56] = Board.WhiteRook;
    this.board[62] = this.board[57] = Board.WhiteKnight;
    this.board[61] = this.board[58] = Board.WhiteBishop;
    this.board[60] = Board.WhiteKing;
    this.board[59] = Board.WhiteQueen;
    this.printBoard();
  }

  printBoard(){
    let state=0;
    for(let i=0;i<8;i++){
      let str = "";
      for(let j=0;j<8;j++){
        str = str + " " + this.board[j+state];
      }
      console.log(str)
      console.log("\n");
      state=state+8;
    }
  }
}