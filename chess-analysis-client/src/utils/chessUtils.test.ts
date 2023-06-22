import {
  getMoveWithOffset,
  getLastMove,
  extractEval,
  normalise,
} from './chessUtils'

const pgn_1 =
  '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O'
const pgn_2 = '1. d4 d5\n2. Nf3'
const pgn_3 = ''

const eval_1 =
  'bestmove e7e6 bestmoveSan e6 ponder g1f3 ponderSan Nf3 baseTurn b score cp -35'

const normaliseTestCases = [
  {
    value: -3,
    expected: 35,
  },
  {
    value: -113,
    expected: 0,
  },
  {
    value: 25,
    expected: 100,
  },
  {
    value: 2.5,
    expected: 62.5,
  },
]

describe('getLastMove', () => {
  it('should return O-O', () => {
    const lastMove = getLastMove(pgn_1)
    expect(lastMove).toBe('O-O')
  })
  it('should return Nf3', () => {
    const lastMove = getLastMove(pgn_2)
    expect(lastMove).toBe('Nf3')
  })
  it('should return empty string', () => {
    const lastMove = getLastMove(pgn_3)
    expect(lastMove).toBe('')
  })
})

describe('getMoveWithOffset', () => {
  test('offset 0 returns last turn', () => {
    const move = getMoveWithOffset(pgn_2, 0)
    expect(move).toBe('2. Nf3 ')
  })

  test('offset 2 returns one turn before last', () => {
    const move = getMoveWithOffset(pgn_2, 2)
    expect(move).toBe('1. d4 ')
  })
})

describe('extractEval', () => {
  it('should have all evaluation properties', () => {
    const evaluation = extractEval(eval_1)
    expect(evaluation).toHaveProperty('bestMove')
    expect(evaluation).toHaveProperty('pondering')
    expect(evaluation).toHaveProperty('pawnAdvantage')
    expect(evaluation).toHaveProperty('engineHighlight')
    expect(evaluation).toHaveProperty('evalBarPosition')
  })
  it('should return correct evaluation', () => {
    const evaluation = extractEval(eval_1)
    console.log(evaluation)
    expect(evaluation).toEqual({
      bestMove: 'e6',
      pondering: 'Nf3',
      engineHighlight: { from: 'e7', to: 'e6' },
      pawnAdvantage: 0.35,
      evalBarPosition: 51.75,
    })
  })
})

describe('normalise', () => {
  it('should correctly normalise all test cases', () => {
    normaliseTestCases.forEach((testCase) => {
      const result = normalise(testCase.value)
      expect(result).toBe(testCase.expected)
    })
  })
})
