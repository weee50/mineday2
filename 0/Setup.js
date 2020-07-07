boardGenerated = false;
lastClickInfo = {time: 0, location: [0, 0]};
flagCounts = {};
unopenedCount = 0;
gamestate = 0;
boardStartTime = 0;

function startNewGame()
{
    if (timer != undefined)
    {
        clearInterval(timer);
        document.getElementById("timer").textContent = "00:00:00" // hacky, but whatever
    }
    gamestate = 0; // -1 = loss, 1 = win, 0 = neither
    boardGenerated = false;
    board = generateEmpty(boardData.width, boardData.height);
    boardStartTime = new Date().getTime();
    drawBoard();
}
startNewGame();

document.getElementById("board").addEventListener("click", function(event)
    {
        clickX = Math.floor(event.offsetX / 16);
        clickY = Math.floor(event.offsetY / 16);
        leftClick(clickX, clickY);
    }
)

document.getElementById("board").addEventListener("contextmenu", function(event)
    {
        event.preventDefault();
        clickX = Math.floor(event.offsetX / 16);
        clickY = Math.floor(event.offsetY / 16);
        rightClick(clickX, clickY);
    }
)

document.getElementById("board").addEventListener("selectstart", function(event)
    {
        event.preventDefault();
    }
)