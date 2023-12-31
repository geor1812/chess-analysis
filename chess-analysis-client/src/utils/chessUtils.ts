import { Eval } from '../components/Evaluation'

export const getMoveWithOffset = (pgn: string, offset: number): string => {
  const turns = pgn.split('\n')
  const moves: string[] = []

  //Splitting the pgn into turns
  for (let i = 0; i <= turns.length - 1; i++) {
    const splitTurn = turns[i].split(' ')
    if (splitTurn.length > 3) {
      return null
    } else {
      moves.push(...splitTurn)
    }
  }

  //Remove future moves
  let counter = 0
  while (counter < offset) {
    if (moves[moves.length - 1].includes('.')) {
      moves.pop()
    }
    moves.pop()

    counter++
  }

  if (moves.length !== 1) {
    //In case last element indicates the turn number
    if (moves[moves.length - 1].includes('.')) {
      moves.pop()
    }

    let exit = false
    let lastTurn = ''
    while (!exit) {
      lastTurn = moves[moves.length - 1] + ' ' + lastTurn
      if (moves[moves.length - 1].includes('.')) {
        exit = true
      }
      moves.pop()
    }

    return lastTurn
  }
  return 'Starting position'
}

export const getLastMove = (pgn: string) => {
  const moves = pgn.split(' ')
  return moves[moves.length - 1]
}

export const extractEval = (message: string): Eval => {
  console.log(message)
  const splitMessage = message.split(' ')
  const squares = splitMessage[1]
  const bestMove = splitMessage[3]
  const pondering = splitMessage[7]
  const turn = splitMessage[9]
  const cp = splitMessage[12]

  const engineHighlight = {
    from: squares.substring(0, 2),
    to: squares.substring(2),
  }

  let cpScore = Number(cp)
  console.log(turn)

  if (turn === 'b') {
    cpScore = -cpScore
  }
  const pawnAdvantage = cpScore / 100

  const evalBarPosition = normalise(pawnAdvantage)
  const evaluation: Eval = {
    bestMove,
    pondering,
    engineHighlight,
    pawnAdvantage,
    evalBarPosition,
  }
  console.log(evaluation)
  return evaluation
}

const MIN = -10
const MAX = +10
export const normalise = (value) => {
  if (value < -10) {
    value = -10
  }
  if (value > 10) {
    value = 10
  }
  return ((value - MIN) * 100) / (MAX - MIN)
}
