class ChessGame
{
    constructor(boardWidth, boardHeight){
        this.boardWidth = boardWidth
        this.boardHeight = boardHeight
    }
    drawBoard = (canvas) => {
        const ctx = canvas.getContext("2d");
        let flipper = false
        for(let i = 0; i < this.boardHeight; i += 100)
        {
            // for checkered pattern
            flipper = !flipper
            for(let j = 0; j < this.boardWidth; j += 100)
            {
                ctx.fillStyle = flipper ? "white" : "black"
                flipper = !flipper
                ctx.fillRect(i, j, this.boardWidth / 8, this.boardHeight / 8);
            }
        }
    }
}