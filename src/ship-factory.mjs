// Ship object
// Contain length - done
// Number of times hit - done
// Sunk true/false - done
// Hit function - done

export function shipFactory (newLength) {
  const isSunk = () => {
    if (ship.length === ship.hits) {
      ship.sunk = true
    }
  }
  const ship = {
    length: newLength,
    hits: 0,
    sunk: false,
    hit: function () {
      this.hits = this.hits + 1
      isSunk()
    }
  }
  return ship
}
