import { gameboardFactory } from "./gameboard.mjs";

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
