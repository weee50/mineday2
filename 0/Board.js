// Generates an empty (width) by (height) board.
function generateEmpty(width, height)
{
  let board = []
  for (let row = 0; row < height; row++)
  {
    board[row] = []
    for (let col = 0; col < width; col++)
    {
      board[row][col] = new Square(new Empty())
    }
  }
  return board;
}

// Replace this later to allow for variable widths and heights!
board = generateEmpty(3, 3)
reachVectors = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]

function reachableFrom(x, y)
{
  reachableSquares = []
  for (let i = 0; i < reachVectors.length; i++)
  {
    let reachVector = reachVectors[i];
    if (x + reachVector[0] >= 0 && y + reachVector[1] >= 0 && x + reachVector[0] < board[0].length && y + reachVector[1] < board.length)
    {
      reachableSquares.push([x + reachVector[0], y + reachVector[1]]);
    }
  }
  return reachableSquares;
}

function canReachFrom(square1, square2)
{
  reachable = reachableFrom(square1[0], square1[1]);
  for (let i = 0; i < reachable.length; i++)
  {
    let reachableSquare = reachable[i];
    if (reachableSquare[0] == square2[0] && reachableSquare[1] == square2[1])
    {
      return true;
    }
  }
  return false;
}

// Updates the neighbors and mine counts of a given square.
function updateNeighbors(x, y)
{
  let neighborCount = 0;
  let mineCount = 0;

  let square = board[y][x]
  for (let i = 0; i < reachVectors.length; i++)
  {
    let reachVector = reachVectors[i]
    let adjustedSquare = [x + reachVector[0], y + reachVector[1]]
    if (adjustedSquare[0] >= 0 && adjustedSquare[1] >= 0 &&
        adjustedSquare[0] < board[0].length && adjustedSquare[1] < board.length)
    {
      let insideSquare = board[adjustedSquare[1]][adjustedSquare[0]].contents;
      if (insideSquare instanceof Mine)
      {
        mineCount++;
        neighborCount = insideSquare.neighbor_adjust(neighborCount) // make priorities work at some point
      }
    }
  }
  square.minesAround = mineCount;
  square.neighbors = neighborCount;
}

// Updates the neighbor and mine counts of every square on the board.
function updateAllNeighbors()
{
  for (let i = 0; i < board.length; i++)
  {
    for (let j = 0; j < board[0].length; j++)
    {
      updateNeighbors(j, i)
    }
  }
}