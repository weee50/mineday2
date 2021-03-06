boardData = {
    width: 20,
    height: 20,
    mines: [
        {mine: basicMine(1), count: 45},
        {mine: new Mine("Double_Inverse", (x) => x*-2, 1), count: 15},
    ],
    flagOrder: [null, 1, "Double_Inverse"]
};

boardData.blankSquares = boardData.width * boardData.height;
for (let i = 0; i < boardData.mines.length; i++)
{
    boardData.blankSquares -= boardData.mines[i].count;
}

function generateBoard(firstX, firstY) // x and y positions of the first click
{
    let genBoard = generateEmpty(boardData.width, boardData.height);
    for (let i = 0; i < boardData.mines.length; i++)
    {
        currentMine = boardData.mines[i];
        mineID = 0;
        while (mineID < currentMine.count)
        {
            randomX = Math.floor(Math.random() * boardData.width);
            randomY = Math.floor(Math.random() * boardData.height);
            if (!(genBoard[randomY][randomX].contents instanceof Mine))
            {
                if (!canReachFrom([firstX, firstY], [randomX, randomY]) && !(firstX == randomX && firstY == randomY))
                {
                    genBoard[randomY][randomX].contents = currentMine.mine;
                    mineID++;
                }
            }
        }
    }
    return genBoard;
}