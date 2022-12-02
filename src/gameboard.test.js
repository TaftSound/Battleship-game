import { gameboardFactory, getAvailablePlacements, markUnavailableSpaces } from "./gameboard.mjs";

test('placeShip function adds ship', () => {
  const gameboardObject = gameboardFactory()
  gameboardObject.placeShip([1, 3], 3, 'vertical')
  expect(gameboardObject.getAllShips()[0]).toHaveProperty('ship')
})
test('placeShip function adds ship index', () => {
  const gameboardObject = gameboardFactory()
  gameboardObject.placeShip([1, 3], 3, 'vertical')
  expect(gameboardObject.getAllShips()[0]).toHaveProperty('index', [1, 3])
})
test('placeShip function adds ship direction', () => {
  const gameboardObject = gameboardFactory()
  gameboardObject.placeShip([1, 3], 3, 'vertical')
  expect(gameboardObject.getAllShips()[0]).toHaveProperty('direction', 'vertical')
})
test('receiveAttack function logs attack coords', () => {
  const gameboardObject = gameboardFactory()
  expect(gameboardObject.receiveAttack([1, 3])[0][0]).toEqual([1, 3])
})
test('receiveAttack function notes if there is a miss', () => {
  const gameboardObject = gameboardFactory()
  expect(gameboardObject.receiveAttack([1, 3])).toEqual([ [ [1, 3], false ] ])
})
test('receiveAttack logs repeated attack coords', () => {
  const gameboardObject = gameboardFactory()
  gameboardObject.receiveAttack([4, 7])
  expect(gameboardObject.receiveAttack([1, 3])).toEqual([ [ [4, 7], false ], [ [1, 3], false ] ])
})
test('receiveAttack function notes if there is a hit', () => {
  const gameboardObject = gameboardFactory()
  gameboardObject.placeShip([1, 2], 3, 'vertical')
  expect(gameboardObject.receiveAttack([1, 3])).toEqual([ [ [1, 3], true ] ])
})
test('retrieve array of attacks received', () => {
  const gameboardObject = gameboardFactory()
  gameboardObject.placeShip([1, 2], 3, 'vertical')
  gameboardObject.receiveAttack([1, 3])
  expect(gameboardObject.getAttacksReceived()).toEqual([ [ [1, 3], true ] ])
})
test('check that all ships have not been sunk', () => {
  const gameboardObject = gameboardFactory()
  gameboardObject.placeShip([2, 4], 3, 'horizontal')
  expect(gameboardObject.areShipsSunk()).toBe(false)
})
test('check that all ships have been sunk, with one ship', () => {
  const gameboardObject = gameboardFactory()
  gameboardObject.placeShip([2, 4], 3, 'horizontal')
  gameboardObject.receiveAttack([2, 4])
  gameboardObject.receiveAttack([3, 4])
  gameboardObject.receiveAttack([4, 4])
  expect(gameboardObject.areShipsSunk()).toBe(true)
})
test('check that all ships have been sunk, with multiple ships', () => {
  const gameboardObject = gameboardFactory()
  gameboardObject.placeShip([2, 4], 3, 'horizontal')
  gameboardObject.placeShip([7, 2], 2, 'vertical')
  gameboardObject.receiveAttack([2, 4])
  gameboardObject.receiveAttack([3, 4])
  gameboardObject.receiveAttack([4, 4])
  gameboardObject.receiveAttack([7, 2])
  gameboardObject.receiveAttack([7, 3])
  expect(gameboardObject.areShipsSunk()).toBe(true)
})
test('check that all ships have not been sunk, with multiple ships', () => {
  const gameboardObject = gameboardFactory()
  gameboardObject.placeShip([2, 4], 3, 'horizontal')
  gameboardObject.placeShip([7, 2], 2, 'vertical')
  gameboardObject.receiveAttack([2, 4])
  gameboardObject.receiveAttack([3, 4])
  gameboardObject.receiveAttack([4, 4])
  gameboardObject.receiveAttack([7, 2])
  expect(gameboardObject.areShipsSunk()).toBe(false)
})
test('randomize ship creates a ship', () => {
  const gameboardObject = gameboardFactory()
  let ships = gameboardObject.randomizeShipPlacement()
  let firstShip = ships[0]
  expect(firstShip).toHaveProperty('ship')
})
test('first randomized ship has length of 4', () => {
  const gameboardObject = gameboardFactory()
  let ships = gameboardObject.randomizeShipPlacement()
  let firstShip = ships[0]
  expect(firstShip.ship).toHaveProperty('length', 4)
})
test('second randomized ship has length of 3', () => {
  const gameboardObject = gameboardFactory()
  let ships = gameboardObject.randomizeShipPlacement()
  let firstShip = ships[1]
  expect(firstShip.ship).toHaveProperty('length', 3)
})
test('contains all ships', () => {
  const gameboardObject = gameboardFactory()
  let ships = gameboardObject.randomizeShipPlacement()
  expect(ships[0].ship).toHaveProperty('length', 4)
  expect(ships[1].ship).toHaveProperty('length', 3)
  expect(ships[2].ship).toHaveProperty('length', 3)
  expect(ships[3].ship).toHaveProperty('length', 2)
  expect(ships[4].ship).toHaveProperty('length', 2)
  expect(ships[5].ship).toHaveProperty('length', 2)
  expect(ships[6].ship).toHaveProperty('length', 1)
  expect(ships[7].ship).toHaveProperty('length', 1)
  expect(ships[8].ship).toHaveProperty('length', 1)
  expect(ships[9].ship).toHaveProperty('length', 1)
})

describe('getting available ship placements', () => {
    const gameboard = [
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ] 
  
  test('can determine available horizontal moves in a row', () => {
    expect(getAvailablePlacements(0, 3, 'horizontal', gameboard)).toEqual([4, 5])
    expect(getAvailablePlacements(1, 3, 'horizontal', gameboard)).toEqual([3, 4])
    expect(getAvailablePlacements(2, 3, 'horizontal', gameboard)).toEqual([0, 1, 2, 3, 4, 5])
    expect(getAvailablePlacements(3, 3, 'horizontal', gameboard)).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
    expect(getAvailablePlacements(0, 2, 'horizontal', gameboard)).toEqual([4, 5, 6])
    expect(getAvailablePlacements(1, 2, 'horizontal', gameboard)).toEqual([3, 4, 5])
    expect(getAvailablePlacements(6, 2, 'horizontal', gameboard)).toEqual([0, 6, 7, 8])
    expect(getAvailablePlacements(6, 3, 'horizontal', gameboard)).toEqual([6, 7])
  })
  test('can determine available vertical moves in a row', () => {
    expect(getAvailablePlacements(0, 3, 'vertical', gameboard)).toEqual([4, 5, 6])
    expect(getAvailablePlacements(1, 3, 'vertical', gameboard)).toEqual([3, 4, 5, 6])
    expect(getAvailablePlacements(2, 3, 'vertical', gameboard)).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
    expect(getAvailablePlacements(3, 3, 'vertical', gameboard)).toEqual([0, 1, 2, 5, 6, 7, 8, 9])
    expect(getAvailablePlacements(6, 3, 'vertical', gameboard)).toEqual([0, 1, 6, 7, 8, 9])
    expect(getAvailablePlacements(8, 3, 'vertical', gameboard)).toEqual([])
    expect(getAvailablePlacements(9, 3, 'vertical', gameboard)).toEqual([])
  })
})

describe('marking unavailable spaces', () => {
  let gameboard = []
  beforeEach(() => {
    gameboard = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ] 
  })

  test('can mark spaces unavailable around horizontal ship', () => {
    expect(markUnavailableSpaces([3, 4], 3, 'horizontal', gameboard)).toEqual([
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ])
  })
  test('can mark spaces unavailable around vertical ship', () => {
    expect(markUnavailableSpaces([2, 6], 3, 'vertical', gameboard)).toEqual([
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ])
  })
  test('can mark spaces unavailable around vertical ship', () => {
    expect(markUnavailableSpaces([0, 6], 3, 'vertical', gameboard)).toEqual([
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ])
  })
  test('can mark spaces unavailable around vertical ship', () => {
    expect(markUnavailableSpaces([4, 9], 3, 'vertical', gameboard)).toEqual([
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ])
  })
})
  test('randomize ship placement', () => {
    const gameboardObject = gameboardFactory()
    let filledGameboard = gameboardObject.randomizeShipPlacement()
    console.log(filledGameboard[0])
    console.log(filledGameboard[1])
    console.log(filledGameboard[2])
    console.log(filledGameboard[3])
    console.log(filledGameboard[4])
    console.log(filledGameboard[5])
    console.log(filledGameboard[6])
    console.log(filledGameboard[7])
    console.log(filledGameboard[8])
    console.log(filledGameboard[9])
    // [   0  1  2  3  4  5  6  7  8  9

    // 0  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // 1  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // 2  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // 3  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // 4  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // 5  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // 6  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // 7  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // 8  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // 9  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    // ]
  })