import { shipFactory } from './ship-factory.mjs'

// place ships at specific coordiantes - done

// recieveAttack function, takes pair of coordinates
// and determines if there is a hit, the sends hit
// function to correct ship - done

// records all attacks and whether hits or not

// report whether all ships are sunk or not

export function gameboardFactory () {
  const allShips = []
  const attacksReceived = []

  function checkForHit (coordinates) {
    for (const ship in allShips) {
      const placedShip = allShips[ship]
      const index = placedShip.index
      const length = placedShip.ship.length
      for (let i = 0; i < length; i++) {
        let x, y
        if (placedShip.direction === 'horizontal') {
          x = index[0] + i
          y = index[1]
        }
        if (placedShip.direction === 'vertical') {
          x = index[0]
          y = index[1] + i
        }
        if (coordinates[0] === x && coordinates[1] === y) {
          placedShip.ship.hit()
          return true
        }
      }
    }
    return false
  }

  const gameboardObject = {
    placeShip: function (index, length, direction) {
      const ship = shipFactory(length)
      const shipPlacementObject = { ship, index, direction }
      allShips.push(shipPlacementObject)
    },
    receiveAttack: function (coordinates) {
      const hit = checkForHit(coordinates)
      attacksReceived.push([coordinates, hit])
      return attacksReceived
    },
    areShipsSunk: function () {

    },
    getAllShips: function () {
      return allShips
    },
    getAttacksReceived: function () {

    }
  }
  return gameboardObject
}
