import { shipFactory } from './ship-factory.mjs'

test('Has length property', () => {
  expect(shipFactory(3)).toHaveProperty('length', 3)
})
test('Has hits property', () => {
  expect(shipFactory(3)).toHaveProperty('hits', 0)
})
test('Has sunk property', () => {
  expect(shipFactory(3)).toHaveProperty('sunk', false)
})
test('hitShip function adds hit', () => {
  const ship = shipFactory(3)
  ship.hit()
  expect(ship).toHaveProperty('hits', 1)
})
test('hitShip function adds multiple hits', () => {
  const ship = shipFactory(3)
  ship.hit()
  ship.hit()
  expect(ship).toHaveProperty('hits', 2)
})
test('sunk property returns true when sunk', () => {
  const ship = shipFactory(3)
  ship.hit()
  ship.hit()
  ship.hit()
  expect(ship.sunk).toBe(true)
})
test('sunk property returns false when not sunk', () => {
  const ship = shipFactory(3)
  ship.hit()
  ship.hit()
  expect(ship.sunk).toBe(false)
})
