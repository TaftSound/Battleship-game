import playerFactory from "./computer-player.mjs";

test('return move coordinates as numbers in an array', () => {
  const computerPlayer = playerFactory()
  const move = computerPlayer.makeMove()
  expect(move[0]).not.toBeNaN()
  expect(move[1]).not.toBeNaN()
})
test('return coordinates within bounds of board', () => {
  const computerPlayer = playerFactory()
  const move = computerPlayer.makeMove()
  expect(move[0]).toBeGreaterThanOrEqual(0)
  expect(move[1]).toBeGreaterThanOrEqual(0)
  expect(move[0]).toBeLessThanOrEqual(9)
  expect(move[1]).toBeLessThanOrEqual(9)
})
test('multiple moves do not repeat each other', () => {
  const computerPlayer = playerFactory()
  let firstMove = computerPlayer.makeMove()
  
  let repeat = false
  for (let i = 0; i < 99; i++) {
    let nextMove = computerPlayer.makeMove()
    if (nextMove[0] === firstMove[0] && nextMove[1] === firstMove[1]) {
      repeat = true
    }
  }
  expect(repeat).toBe(false)
})