class ChessGame
{
    constructor(boardWidth, boardHeight, perspective){
        this.perspective = perspective
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.whitePieces = [];
        this.blackPieces = [];
        this.needLoaded = 12;
        this.images = {};
        this.#initImages()
        this.#initPieces()
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
            this.whitePieces.push({type: 'pawn', img: this.images['white-pawn'], pos: [i, 6]});
            this.blackPieces.push({type: 'pawn', img: this.images['black-pawn'], pos: [i, 1]});
        }
        this.whitePieces.push({type: 'rook', img: this.images['white-rook'], pos: [0, 7]});
        this.whitePieces.push({type: 'rook', img: this.images['white-rook'], pos: [7, 7]});
        this.whitePieces.push({type: 'knight', img: this.images['white-knight'], pos: [1, 7]});
        this.whitePieces.push({type: 'knight', img: this.images['white-knight'], pos: [6, 7]});
        this.whitePieces.push({type: 'bishop', img: this.images['white-bishop'], pos: [2, 7]});
        this.whitePieces.push({type: 'bishop', img: this.images['white-bishop'], pos: [5, 7]});   
        this.whitePieces.push({type: 'queen', img: this.images['white-queen'], pos: [3, 7]});   
        this.whitePieces.push({type: 'king', img: this.images['white-king'], pos: [4, 7]});   


        this.blackPieces.push({type: 'rook', img: this.images['black-rook'], pos: [0, 0]});
        this.blackPieces.push({type: 'rook', img: this.images['black-rook'], pos: [7, 0]});
        this.blackPieces.push({type: 'knight', img: this.images['black-knight'], pos: [1, 0]});
        this.blackPieces.push({type: 'knight', img: this.images['black-knight'], pos: [6, 0]});
        this.blackPieces.push({type: 'bishop', img: this.images['black-bishop'], pos: [2, 0]});
        this.blackPieces.push({type: 'bishop', img: this.images['black-bishop'], pos: [5, 0]}); 
        this.blackPieces.push({type: 'queen', img: this.images['black-queen'], pos: [3, 0]});   
        this.blackPieces.push({type: 'king', img: this.images['black-king'], pos: [4, 0]});  
    }

    // consider making canvas constructor arg
    drawBoard = (canvas) => {
        console.log(this.needLoaded)
        const ctx = canvas.getContext("2d");
        let flipper = false
        for(let i = 0; i < this.boardHeight; i += 100)
        {
            // for checkered pattern
            flipper = !flipper
            for(let j = 0; j < this.boardWidth; j += 100)
            {
                ctx.fillStyle = flipper ? "white" : "green"
                flipper = !flipper
                ctx.fillRect(i, j, this.boardWidth / 8, this.boardHeight / 8);
            }
        }
    }
    renderPieces = (canvas) => {
        const ctx = canvas.getContext("2d");
        const isWhite = this.perspective == "white"
        this.blackPieces.forEach(piece => {
            ctx.drawImage(piece.img, (isWhite ? piece.pos[0] : (-piece.pos[0] + 7)) * 100, (isWhite ? piece.pos[1] : (-piece.pos[1] + 7)) * 100, 100, 100)
        })
        this.whitePieces.forEach(piece => {
            ctx.drawImage(piece.img,(isWhite ? piece.pos[0] : (-piece.pos[0] + 7)) * 100, (isWhite ? piece.pos[1] : (-piece.pos[1] + 7)) * 100, 100, 100)
        })
    }
}