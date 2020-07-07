class Square {
  // neighbors: the amount of neighbors of the square (double mines count as 2, etc.)
  // minesAround: the number of mines around a square (double mines count as 1)
  // flag: the type of flag on the square, using mine texture suffixes
  // opened: whether or not the square is opened
  // contents: the contents of the square, can either be a Mine object or an Empty object

  constructor(contents)
  {
    this.neighbors = 0;
    this.minesAround = 0;
    this.flag = null;
    this.opened = false;
    this.contents = contents;
  }
}