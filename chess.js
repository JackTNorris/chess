class ChessGame
{
    constructor(boardWidth, boardHeight, perspective){
        this.squareSize = boardHeight / 8
        this.perspective = perspective
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        // this.whitePieces = [];
        // this.blackPieces = [];
        this.needLoaded = 12;
        this.images = {};
        this.selectedSquare = null;
        this.possibleSquares = null;
        this.hoveredSquare = null;
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        console.log(this.board)
        this.#initImages()
        this.#initPieces()
    }

    /* INITIALIZATION */

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
        }

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


    /* UTILS */

    // encoding the rules here
    // TODO: verify a move won't lead to putting you in check
    // TODO: probably do a better job of checking array out of bounds
    getPossibleMoves = (piece) => {
        // keeping track of black and white
        const directionality = piece.color == 'white' ? -1 : 1
        let res = []
        const getAdjacent = (pos, xSlide, ySlide) => {
            const temp_res = []
            for(let i = 1; i < 8; i++)
            {
                if (this.board[piece.pos[0] + (i * xSlide)] == undefined)
                {
                    break
                }
                if ((piece.pos[1] + (i * ySlide)) >= this.board.length)
                {
                    break
                }
                let temp = this.board[piece.pos[0] + (i * xSlide)][piece.pos[1] + (i * ySlide)]
                if (temp == null)
                {
                    temp_res.push([piece.pos[0] + (i * xSlide), piece.pos[1] + (i * ySlide)])
                }
                else if (temp.color != piece.color)
                {
                    temp_res.push([piece.pos[0] + (i * xSlide), piece.pos[1] + (i * ySlide)])
                    break
                }
                else
                {
                    break
                }
            }
            return temp_res
        }
        switch(piece.type)
        {
            case 'pawn':
                const forwardOne = [piece.pos[0], piece.pos[1] + (1 * directionality)]
                const forwardTwo = [piece.pos[0], piece.pos[1] + (2 * directionality)]
                const diagonalLeft = [piece.pos[0] + (1 * directionality), piece.pos[1] + (1 * directionality)]
                const diagonalRight = [piece.pos[0] - (1 * directionality), piece.pos[1] + (1 * directionality)]
                if(this.board[forwardOne[0]] && this.board[forwardOne[0]][forwardOne[1]] == null)
                {
                    res.push(forwardOne);
                    // checking to see if in the first file, for both black and white
                    if(this.board[forwardTwo[0]][forwardTwo[1]] == null && piece.color == 'white' ? piece.pos[1] == 6 : piece.pos[1] == 1)
                    {
                        res.push(forwardTwo);
                    }
                }
                [diagonalLeft, diagonalRight].forEach(move => {
                    if(this.board[move[0]] && this.board[move[0]][move[1]] != null && this.board[move[0]][move[1]].color != piece.color)
                    {
                        res.push(move)
                    }
                })
                return res
            case 'knight':
                console.log("here dawg")
                const possible = []
                const ones = [1, -1]
                const twos = [2, -2]
                for(let i = 0; i < ones.length; i++)
                {
                    for(let j = 0; j < twos.length; j++)
                    {
                        possible.push([piece.pos[0] + ones[i], piece.pos[1] + twos[j]])
                        possible.push([piece.pos[0] + twos[j], piece.pos[1] + ones[i]])
                    }
                }
                for(const p of possible)
                {
                    if (this.board[p[0]] && (this.board[p[0]][p[1]] == null || this.board[p[0]][p[1]].color != piece.color))
                    {
                        res.push(p)
                    }
                }
                return res
            case 'bishop':
                // function to "splay out" and find possible moves along vector (xSlie, ySlide)
                res = res.concat(getAdjacent(piece.pos, 1, 1))
                res = res.concat(getAdjacent(piece.pos, 1, -1))
                res = res.concat(getAdjacent(piece.pos, -1, 1))
                res = res.concat(getAdjacent(piece.pos, -1, -1))
                return res
            case 'rook':
                res = res.concat(getAdjacent(piece.pos, 1, 0))
                res = res.concat(getAdjacent(piece.pos, 0, 1))
                res = res.concat(getAdjacent(piece.pos, -1, 0))
                res = res.concat(getAdjacent(piece.pos, 0, -1))
                return res
            case 'queen':
                res = this.getPossibleMoves({...piece, type: 'rook'})
                res = res.concat(this.getPossibleMoves({...piece, type: 'bishop'}))
                return res
        }
    }

    setHoveredSquare = (x, y) => this.hoveredSquare = [x, y]

    resize = (canvas, boardWidth, boardHeight) => {
        this.boardHeight = boardHeight
        this.boardWidth = boardWidth
        this.squareSize = boardHeight / 8
        this.renderPieces(canvas)
    }

    // TODO: come up with a better function for possible squares search (something in O(1))
    onClickSquare = (x, y) => {
        const isWhite = this.perspective == 'white';
        let temp_x = 0;
        let temp_y = 0;
        if (this.perspective == 'black')
        {
            temp_x = 7 - x
            temp_y = 7 - y
        }
        if(isWhite && this.board[x][y] != null && this.board[x][y].color == this.perspective)
        {
            console.log("bro")
            this.selectedSquare = [x, y]
            this.possibleSquares = this.getPossibleMoves(this.board[x][y])
        }
        if(!isWhite && this.board[temp_x][temp_y] != null && this.board[temp_x][temp_y].color == this.perspective)
        {
            console.log("bro")
            this.selectedSquare = [x, y]
            this.possibleSquares = this.getPossibleMoves(this.board[x][y])
        }
        else if (this.selectedSquare != null)
        {
            if(isWhite && this.possibleSquares != null)
            {
                for(let i = 0; i < this.possibleSquares.length; i++)
                {
                    if (this.possibleSquares[i][0] == x && this.possibleSquares[i][1] == y)
                    {
                        const pieceToMove = this.board[this.selectedSquare[0]][this.selectedSquare[1]];
                        pieceToMove.pos = [x, y]
                        this.board[x][y] = pieceToMove;
                        this.board[this.selectedSquare[0]][this.selectedSquare[1]] = null;
                        this.selectedSquare = null;
                        this.possibleSquares = null;
                        return
                    }
                }
            }
            if(!isWhite && this.possibleSquares != null)
            {
                for(let i = 0; i < this.possibleSquares.length; i++)
                {
                    if (this.possibleSquares[i][0] == x && this.possibleSquares[i][1] == y)
                    {
                        const pieceToMove = this.board[7 - this.selectedSquare[0]][7 - this.selectedSquare[1]];
                        pieceToMove.pos = [temp_x, temp_y]
                        this.board[temp_x][temp_y] = pieceToMove;
                        this.board[7 - this.selectedSquare[0]][7 - this.selectedSquare[1]] = null;
                        this.selectedSquare = null;
                        this.possibleSquares = null;
                        return
                    }
                }
            }
            else
            {
                return
            }
        }
    }

    getGridLocation = (mouseX, mouseY) => {
        const x = Math.floor(Math.min(mouseX, this.boardWidth) / this.squareSize)
        const y = Math.floor(Math.min(mouseY, this.boardHeight) / this.squareSize)
        return [x, y]
    }


    /* RENDERING */

    // consider making canvas constructor arg
    renderBoard = (canvas) => {
        const ctx = canvas.getContext("2d");
        let flipper = false
        for(let i = 0; i < this.boardHeight; i += this.squareSize)
        {
            ctx.strokeStyle = "black"
            // for checkered pattern
            flipper = !flipper
            for(let j = 0; j < this.boardWidth; j += this.squareSize)
            {
                ctx.fillStyle = flipper ? "rgb(234, 245, 230)" : "rgb(86, 145, 64)"
                flipper = !flipper
                ctx.fillRect(i, j, this.boardWidth / 8, this.boardHeight / 8);
                if(this.hoveredSquare && i / this.squareSize == this.hoveredSquare[0] && j / this.squareSize == this.hoveredSquare[1])
                {
                    ctx.strokeStyle = 'red';
                    ctx.strokeRect(i, j,  this.boardWidth / 8, this.boardHeight / 8)
                    ctx.strokeStyle = null;
                }

                if(this.selectedSquare && i / this.squareSize == this.selectedSquare[0] && j / this.squareSize == this.selectedSquare[1])
                {
                    ctx.fillStyle = "rgb(215, 245, 66, 0.7)"
                    ctx.fillRect(i, j, this.boardWidth / 8, this.boardHeight / 8);
                }
                if (this.possibleSquares != null)
                {
                    this.possibleSquares.forEach(c => {
                        if (c[0] === i / this.squareSize  && c[1] === j / this.squareSize)
                        {
                            ctx.beginPath();
                            ctx.arc(i + this.squareSize / 2, j + this.squareSize / 2, this.squareSize / 5, 0, 2 * Math.PI);
                            ctx.fillStyle = "rgba(32, 45, 21, 0.8)";
                            ctx.fill();
                        }
                    })
                }
            }
        }
    }
    renderPieces = (canvas) => {
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

    renderGame = (canvas) => {
        this.renderBoard(canvas);
        this.renderPieces(canvas);
    }
}