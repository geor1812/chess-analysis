import { Eval } from '../components/AnalysisBoardPage/Evaluation'

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
  console.log('CP Score', cpScore / 100)
  console.log('Sigmoid conversion', sigmoid(cpScore))

  const evaluation: Eval = {
    bestMove,
    pondering,
    engineHighlight,
  }
  return evaluation
}

const sigmoid = (p: number) => {
  return 1 / (1 + Math.pow(10, -p / 4))
}
