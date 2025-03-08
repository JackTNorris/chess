class ChessGame
{
    constructor(boardWidth, boardHeight, perspective){
        this.squareSize = boardHeight / 8
        this.perspective = perspective
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.whitePieces = [];
        this.blackPieces = [];
        this.needLoaded = 12;
        this.images = {};
        this.selectedSquare = null
        this.possibleSquares = null
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        console.log(this.board)
        this.#initImages()
        this.#initPieces()
    }

    resize = (canvas, boardWidth, boardHeight) => {
        this.boardHeight = boardHeight
        this.boardWidth = boardWidth
        this.squareSize = boardHeight / 8
        this.renderPieces(canvas)
    }

    onClickSquare = (x, y) => {
        if(this.board[x][y] != null && this.board[x][y].color == this.perspective)
        {
            this.selectedSquare = [x, y]
        }
    }

    getClickedSquare = (mouseX, mouseY) => {
        const x = Math.floor(Math.min(mouseX, this.boardWidth) / this.squareSize)
        const y = Math.floor(Math.min(mouseY, this.boardHeight) / this.squareSize)
        return [x, y]
    }

    #initImages = () => {
        const temp = ["pawn", "knight", "bishop", "king", "queen", "rook"];
        for(let i = 0; i < temp.length; i++)
        {
            let whiteName = "white-" + temp[i];
            let blackName = "black-" + temp[i];
            this.images[whiteName] = new Image();
            this.images[blackName] = new Image();
            this.images[whiteName].src = "assets/pieces/white/" + whiteName + ".png";
            this.images[blackName].src = "assets/pieces/black/" + blackName + ".png";
            this.images[whiteName].onload = () => {this.needLoaded--;};
            this.images[blackName].onload = () => {this.needLoaded--;};
        }
    }


    // optimize this
    #initPieces = () => {
        for(let i = 0; i < 8; i ++)
        {
            this.board[i][6] = {color: 'white', type: 'pawn', img: this.images['white-pawn'], pos: [i, 6]}
            this.board[i][1] = {color: 'black', type: 'pawn', img: this.images['black-pawn'], pos: [i, 1]}
            //this.whitePieces.push({color: 'white', type: 'pawn', img: this.images['white-pawn'], pos: [i, 6]});
            //this.blackPieces.push({color: 'black', type: 'pawn', img: this.images['black-pawn'], pos: [i, 1]});
        }
        /*
        this.whitePieces.push({color: 'white', type: 'rook', img: this.images['white-rook'], pos: [0, 7]});
        this.whitePieces.push({color: 'white', type: 'rook', img: this.images['white-rook'], pos: [7, 7]});
        this.whitePieces.push({color: 'white', type: 'knight', img: this.images['white-knight'], pos: [1, 7]});
        this.whitePieces.push({color: 'white', type: 'knight', img: this.images['white-knight'], pos: [6, 7]});
        this.whitePieces.push({color: 'white', type: 'bishop', img: this.images['white-bishop'], pos: [2, 7]});
        this.whitePieces.push({color: 'white', type: 'bishop', img: this.images['white-bishop'], pos: [5, 7]});   
        this.whitePieces.push({color: 'white', type: 'queen', img: this.images['white-queen'], pos: [3, 7]});   
        this.whitePieces.push({color: 'white', type: 'king', img: this.images['white-king'], pos: [4, 7]});   
        */

	    /*
        this.blackPieces.push({color: 'black', type: 'rook', img: this.images['black-rook'], pos: [0, 0]});
        this.blackPieces.push({color: 'black', type: 'rook', img: this.images['black-rook'], pos: [7, 0]});
        this.blackPieces.push({color: 'black', type: 'knight', img: this.images['black-knight'], pos: [1, 0]});
        this.blackPieces.push({color: 'black', type: 'knight', img: this.images['black-knight'], pos: [6, 0]});
        this.blackPieces.push({color: 'black', type: 'bishop', img: this.images['black-bishop'], pos: [2, 0]});
        this.blackPieces.push({color: 'black', type: 'bishop', img: this.images['black-bishop'], pos: [5, 0]}); 
        this.blackPieces.push({color: 'black', type: 'queen', img: this.images['black-queen'], pos: [3, 0]});   
        this.blackPieces.push({color: 'black', type: 'king', img: this.images['black-king'], pos: [4, 0]}); 
	    */

        this.board[0][7] = {color: 'white', type: 'rook', img: this.images['white-rook'], pos: [0, 7]}
        this.board[7][7] = {color: 'white', type: 'rook', img: this.images['white-rook'], pos: [7, 7]}
        this.board[1][7] = {color: 'white', type: 'knight', img: this.images['white-knight'], pos: [1, 7]}
        this.board[6][7] = {color: 'white', type: 'knight', img: this.images['white-knight'], pos: [6, 7]}
        this.board[2][7] = {color: 'white', type: 'bishop', img: this.images['white-bishop'], pos: [2, 7]}
        this.board[5][7] = {color: 'white', type: 'bishop', img: this.images['white-bishop'], pos: [5, 7]}
        this.board[3][7] = {color: 'white', type: 'queen', img: this.images['white-queen'], pos: [3, 7]}
        this.board[4][7] = {color: 'white', type: 'king', img: this.images['white-king'], pos: [4, 7]}

        this.board[0][0] = {color: 'black', type: 'rook', img: this.images['black-rook'], pos: [0, 0]};
        this.board[7][0] = {color: 'black', type: 'rook', img: this.images['black-rook'], pos: [7, 0]};
        this.board[1][0] = {color: 'black', type: 'knight', img: this.images['black-knight'], pos: [1, 0]};
        this.board[6][0] = {color: 'black', type: 'knight', img: this.images['black-knight'], pos: [6, 0]};
        this.board[2][0] = {color: 'black', type: 'bishop', img: this.images['black-bishop'], pos: [2, 0]};
        this.board[5][0] = {color: 'black', type: 'bishop', img: this.images['black-bishop'], pos: [5, 0]};
        this.board[3][0] = {color: 'black', type: 'queen', img: this.images['black-queen'], pos: [3, 0]};
        this.board[4][0] = {color: 'black', type: 'king', img: this.images['black-king'], pos: [4, 0]};
    }
    // consider making canvas constructor arg
    drawBoard = (canvas) => {
        const ctx = canvas.getContext("2d");
        let flipper = false
        for(let i = 0; i < this.boardHeight; i += this.squareSize)
        {
            // for checkered pattern
            flipper = !flipper
            for(let j = 0; j < this.boardWidth; j += this.squareSize)
            {
                ctx.fillStyle = flipper ? "white" : "green"
                if(this.selectedSquare && i / this.squareSize == this.selectedSquare[0] && j / this.squareSize == this.selectedSquare[1])
                {
                    ctx.fillStyle = "rgb(215, 245, 66)"
                }
                flipper = !flipper
                ctx.fillRect(i, j, this.boardWidth / 8, this.boardHeight / 8);
            }
        }
    }
    renderPieces = (canvas) => {
        const ctx = canvas.getContext("2d");
        const isWhite = this.perspective == "white"
        this.blackPieces.forEach(piece => {
            ctx.drawImage(piece.img, (isWhite ? piece.pos[0] : (-piece.pos[0] + 7)) * this.squareSize, (isWhite ? piece.pos[1] : (-piece.pos[1] + 7)) * this.squareSize, this.squareSize, this.squareSize)
        })
        this.whitePieces.forEach(piece => {
            ctx.drawImage(piece.img,(isWhite ? piece.pos[0] : (-piece.pos[0] + 7)) * this.squareSize, (isWhite ? piece.pos[1] : (-piece.pos[1] + 7)) * this.squareSize, this.squareSize, this.squareSize)
        })
    }
    renderBoard = (canvas) => {
        const context = canvas.getContext('2d');
        // context.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBoard(canvas)
        const ctx = canvas.getContext("2d");
        const isWhite = this.perspective == "white"
        this.board.forEach(row => {
            row.forEach(block => {
                if( block != null)
                {
                    const piece = block
                    ctx.drawImage(piece.img, (isWhite ? piece.pos[0] : (-piece.pos[0] + 7)) * this.squareSize, (isWhite ? piece.pos[1] : (-piece.pos[1] + 7)) * this.squareSize, this.squareSize, this.squareSize)
                }
            })
        })
    }
}