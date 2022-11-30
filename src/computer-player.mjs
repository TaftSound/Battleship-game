// computer player needs to select next move
// move needs to be not a previous move, not out of bounds

const playerFactory = () => {
  const movesMade = []
  const availableMoves = (() => {
    const movesArray = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        movesArray.push([i, j])
      }
    }
    return movesArray
  })()

  const player = {
    makeMove: function () {
      const moveIndex = Math.round(Math.random() * (availableMoves.length - 1))
      const move = availableMoves.splice(moveIndex, 1)[0]
      return move
    }
  }

  return player
}

export default playerFactory
