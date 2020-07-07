// A helper function, returns a function that adds a given number to a value
function add(num)
{
  return (val) => val + num;
}

// Generates a "basic mine", so basicMine(1) generates a single mine, basicMine(2) generates a double mine, etc.
function basicMine(num)
{
  return new Mine(num.toString(), add(num), 0);
}

class Mine {
  // texture: what texture suffix the mine has, so if the suffix is Anti:
    // the flag texture will be Flag_Anti.png
    // the "won flag" texture will be Flag_Won_Anti.png
    // the opened texture will be Mine_Anti.png
    // the clicked texture will be Mine_Open_Anti.png
  // neighbor_adjustment: how the mine adjusts the neighbor count
  // priority: in what order the neighbor_adjusted functions should happen in, higher numbered priorities happen later

  constructor(texture_suffix, neighbor_adjust, priority)
  {
    this.texture_suffix = texture_suffix;
    this.neighbor_adjust = neighbor_adjust;
    this.priority = priority;
  }
}