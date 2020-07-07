function open(x, y)
{
  board[y][x].opened = true;
  if (board[y][x].minesAround == 0)
  {
    let reachable = reachableFrom(x, y);
    for (let i = 0; i < reachable.length; i++)
    {
      if (!(board[reachable[i][1]][reachable[i][0]].opened))
      {
        open(reachable[i][0], reachable[i][1])
      }
    }
  }
}

function nextFlag(flag)
{
  flagID = boardData.flagOrder.indexOf(flag);
  if (boardData.flagOrder[flagID + 1] == undefined)
  {
    return boardData.flagOrder[0]
  }
  else
  {
    return boardData.flagOrder[flagID + 1]
  }
}

function leftClick(x, y)
{
  if (gamestate != 0)
  {
    return;
  }

  // handle double clicks
  clickTime = new Date().getTime();
  if (clickTime - lastClickInfo.time < 500 && lastClickInfo.position[0] == x && lastClickInfo.position[1] == y)
  {
    let reach = reachableFrom(x, y);
    let suggestedNeighbors = 0;
    for (let a = 0; a < reach.length; a++)
    {
      square = board[reach[a][1]][reach[a][0]];
      if ((Number(square.flag) == square.flag || square.flag == null) && !square.opened)
      {
        suggestedNeighbors += Number(square.flag);
      }
      else if (!square.opened)
      {
        suggestedNeighbors = NaN; // this means chording won't work with non-basic mines, but whatever
      }
    }
    if (suggestedNeighbors == board[y][x].neighbors)
    {
      for (let a = 0; a < reach.length; a++)
      {
        if (board[reach[a][1]][reach[a][0]].flag == null)
        {
          open(reach[a][0], reach[a][1]);
        }
      }
    }
  }
  lastClickInfo.time = clickTime;
  lastClickInfo.position = [x, y];

  if (!boardGenerated)
  {
    board = generateBoard(x, y)
    boardStartTime = new Date().getTime();
    timer = setInterval(timerTick, 20);
    updateAllNeighbors();
    boardGenerated = true;
  }
  if (board[y][x].flag == null)
  {
    open(x, y);
  }
  drawBoard();
}

function rightClick(x, y)
{
  board[y][x].flag = nextFlag(board[y][x].flag)
  drawBoard();
}

function timerTick()
{
  let currentTime = new Date().getTime();
  let diff = (currentTime - boardStartTime) / 10;
  
  let cs = Math.floor(diff)
  let sec = Math.floor(cs / 100)
  let min = Math.floor(sec / 60)
  
  cs -= (sec * 100)
  sec -= (min * 60)

  min = (min < 10 ? "0" : "") + min
  sec = (sec < 10 ? "0" : "") + sec
  cs = (cs < 10 ? "0" : "") + cs

  document.getElementById("timer").textContent = min + ":" + sec + "." + cs;
}