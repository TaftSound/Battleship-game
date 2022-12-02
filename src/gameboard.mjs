import { shipFactory } from './ship-factory.mjs'

export const getAvailablePlacements = function (row, length, direction, gameboard) {
  const currentRow = gameboard[row]
  const availableInRow = []
  for (const space in currentRow) {
    if (!currentRow[space]) { continue }
    let available = false
    let count = 1
    for (let i = 1; i < length; i++) {
      if (direction === 'horizontal') {
        const index = +space + i
        if (currentRow[index]) { count++ }
      } else {
        const rowIndex = row + i
        const nextRow = gameboard[rowIndex]
        if (nextRow) {
          if (nextRow[space]) { count++ }
        }
      }
    }
    if (count === length) { available = true }
    if (available) { availableInRow.push(+space) }
  }
  return availableInRow
}

export const markUnavailableSpaces = function ([row, column], length, direction, gameboard) {
  const indexesToChange = []
  if (direction === 'horizontal') {
    let firstIndex = column - 1
    const lastIndex = column + length
    for (firstIndex; firstIndex <= lastIndex; firstIndex++) {
      indexesToChange.push([(row - 1), firstIndex])
      indexesToChange.push([(row), firstIndex])
      indexesToChange.push([(row + 1), firstIndex])
    }
  } else {
    let firstIndex = row - 1
    const lastIndex = row + length
    for (firstIndex; firstIndex <= lastIndex; firstIndex++) {
      indexesToChange.push([firstIndex, (column - 1)])
      indexesToChange.push([firstIndex, (column)])
      indexesToChange.push([firstIndex, (column + 1)])
    }
  }
  indexesToChange.forEach((index) => {
    if (isIndexOnBoard(index)) {
      gameboard[index[0]].splice(index[1], 1, 0)
    }
  })
  return gameboard

  function isIndexOnBoard (index) {
    if (index[0] < 0 || index[0] > 9) {
      return false
    } else if (index[1] < 0 || index[1] > 9) {
      return false
    } else return true
  }
}

export function gameboardFactory () {
  const allShips = []
  const attacksReceived = []
  let availableSpaces = (() => {
    const spacesArray = []
    for (let i = 0; i < 10; i++) {
      const rowArray = []
      for (let j = 0; j < 10; j++) {
        rowArray.push(1)
      }
      spacesArray.push(rowArray)
    }
    return spacesArray
  })()

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
      availableSpaces = markUnavailableSpaces(index, length, direction, availableSpaces)
      allShips.push(shipPlacementObject)
    },
    randomizeShipPlacement: function () {
      const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
      for (const length in shipLengths) {
        let randomRow = Math.round(Math.random() * 9)
        let direction = 'horizontal'
        if (Math.round(Math.random())) { direction = 'vertical' }
        let availablePlacements = getAvailablePlacements(randomRow, shipLengths[length], direction, availableSpaces)
        if (!availablePlacements.length) {
          while (!availablePlacements.length) {
            randomRow++
            if (randomRow > 9) { randomRow = 0 }
            availablePlacements = getAvailablePlacements(randomRow, shipLengths[length], direction, availableSpaces)
          }
        }
        const randomIndex = Math.round(Math.random() * (availablePlacements.length - 1))
        const randomColumn = availablePlacements[randomIndex]
        this.placeShip([randomRow, randomColumn], shipLengths[length], direction)
      }
      return allShips
    },
    receiveAttack: function (coordinates) {
      const hit = checkForHit(coordinates)
      attacksReceived.push([coordinates, hit])
      return attacksReceived
    },
    areShipsSunk: function () {
      for (const index in allShips) {
        const currentShip = allShips[index].ship
        if (!currentShip.sunk) { return false }
      }
      return true
    },
    getAllShips: function () {
      return allShips
    },
    getAttacksReceived: function () {
      return attacksReceived
    }
  }
  return gameboardObject
}
