var images = {
    mines: {},
    flags: {},
    flags_won: {},
    opened: {},
    clicked: {},
    numbers: {},
    special:
    {
        unopened: imageFromSrc("../assets/Unopened.png"),
        noMines: imageFromSrc("../assets/Ground_Blank.png")
    }
};

// Python-style range function, but without step and outputs a list instead of a range object because those don't exist in JS
function range(start, end)
{
    l = [];
    for (i = start; i < end; i++)
    {
        l.push(i);
    }
    return l;
}

const NEED_TO_LOAD = {
    mines: [1, 2, 3, "Anti"], // also controls basically everything except numbers
    numbers: range(-8, 25)
}

for (i = 0; i < NEED_TO_LOAD.mines.length; i++)
{
    mineToLoad = NEED_TO_LOAD.mines[i];
    images.mines[mineToLoad] = imageFromSrc("../assets/Mine_" + mineToLoad + ".png");
    images.flags[mineToLoad] = imageFromSrc("../assets/Flag_" + mineToLoad + ".png");
    images.flags_won[mineToLoad] = imageFromSrc("../assets/Flag_Won_" + mineToLoad + ".png");
    images.opened[mineToLoad] = imageFromSrc("../assets/Mine_" + mineToLoad + ".png");
    images.clicked[mineToLoad] = imageFromSrc("../assets/Mine_Open_" + mineToLoad + ".png");
}

for (i = 0; i < NEED_TO_LOAD.numbers.length; i++)
{
    numToLoad = NEED_TO_LOAD.numbers[i];
    images.numbers[numToLoad] = imageFromSrc("../assets/Ground_" + numToLoad + ".png");
}


function imageFromSrc(theSrc)
{
    x = new Image();
    x.src = theSrc;
    return x;
}

var canvas = document.getElementById("board");
var canvasDraw = canvas.getContext("2d");

// this function also counts things
function drawBoard()
{
  unopenedCount = 0;
  flagCounts = {};
  let oldGamestate = gamestate;

  canvasDraw.clearRect(0, 0, canvas.width, canvas.height)
  for (let y = 0; y < board.length; y++)
  {
      for (let x = 0; x < board[0].length; x++)
      {
          square = board[y][x]

          // unopened square
          if (!square.opened)
          {
              if (gamestate == -1 && square.contents instanceof Mine)
              {
                  canvasDraw.drawImage(images.mines[square.contents.texture_suffix], x*16, y*16)
              }
              else if (gamestate == 1)
              {
                  canvasDraw.drawImage(images.flags[square.contents.texture_suffix], x*16, y*16)
              }
              else if (square.flag === null)
              {
                  canvasDraw.drawImage(images.special.unopened, x*16, y*16)
              }
              else
              {
                  if (gamestate == 1)
                  {
                    canvasDraw.drawImage(images.flags_won[square.flag], x * 16, y * 16)
                  }
                  else
                  {
                    canvasDraw.drawImage(images.flags[square.flag], x * 16, y * 16)
                  }

                  if (flagCounts[square.flag] != undefined)
                  {
                    flagCounts[square.flag]++;
                  }
                  else
                  {
                    flagCounts[square.flag] = 1;
                  }
              }
              if (!(square.contents instanceof Mine))
              {
                unopenedCount++;
              }
          }
          else
          {
            // square with no mine in it
            if (square.contents instanceof Empty)
            {
                if (square.minesAround == 0)
                {
                    canvasDraw.drawImage(images.special.noMines, x * 16, y * 16)
                }
                else
                {
                    canvasDraw.drawImage(images.numbers[square.neighbors], x * 16, y * 16);
                }
            }
            else
            {
                gamestate = -1;
                canvasDraw.drawImage(images.clicked[square.contents.texture_suffix], x*16, y*16)
            }
          }
      }
  }
  // no, i have no idea what's going on with my spacing

  if (unopenedCount <= 0)
  {
      gamestate = 1;
  }

  // Updates counters
  let mineListHTML = "<img src=\"../assets/Unopened.png\">: " + (boardGenerated ? boardData.blankSquares - unopenedCount : 0) + "/" + boardData.blankSquares + "<br>";
  for (let i = 0; i < boardData.mines.length; i++)
  {
    currentMine = boardData.mines[i];
    mineListHTML += "<img src=\"../assets/Flag_" + currentMine.mine.texture_suffix + ".png\">: " +
        (flagCounts[currentMine.mine.texture_suffix] == undefined ? 0 : flagCounts[currentMine.mine.texture_suffix]) + "/" +
        currentMine.count + "<br>";
  }
  document.getElementById("mineCounters").innerHTML = mineListHTML;

  if (oldGamestate != gamestate)
  {
      drawBoard();
      clearInterval(timer);
  }
}