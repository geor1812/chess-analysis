import { useState, useEffect } from 'react'
import Board from 'chessboardjsx'
import { Chess } from 'chess.js'
import { stringify } from 'querystring'

const Chessboard = () => {
  const [game, setGame] = useState<any>()
  const [fen, setFen] = useState('start')
  const [history, setHistory] = useState([])
  const [pieceSquare, setPieceSquare] = useState('')
  const [squareStyles, setSquareStyles] = useState({})

  useEffect(() => {
    setGame(new Chess())
  }, [])

  const highlightPossibleMoves = (
    sourceSquare: string,
    squaresToHighlight: string[]
  ) => {
    const highlightStyles = [...squaresToHighlight].reduce((a, c) => {
      const hasPiece = game.get(c) ? true : false
      return {
        ...a,
        ...{
          [c]: {
            background: hasPiece
              ? 'radial-gradient(circle, transparent 60%,  #00dc78)'
              : 'radial-gradient(circle, #00dc78 10%, transparent 40%)',
          },
        },
      }
    }, {})

    const existingStyles = getSquareStyling({
      pieceSquare: sourceSquare,
      history,
    })
    setSquareStyles({ ...existingStyles, ...highlightStyles })
  }

  const onDrop = ({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string
    targetSquare: string
  }) => {
    try {
      game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      })
    } catch (error) {
      return null
    }

    const newHistory = game.history({ verbose: true })
    setHistory(newHistory)
    setFen(game.fen())
    setSquareStyles(getSquareStyling({ pieceSquare: '', history: newHistory }))
  }

  const onSquareClick = (square: string) => {
    setPieceSquare(square)
    setSquareStyles(getSquareStyling({ pieceSquare: square, history }))

    const possibleMoves = game.moves({
      square: square,
      verbose: true,
    })
    const squaresToHighlight = []
    for (let i = 0; i < possibleMoves.length; i++) {
      squaresToHighlight.push(possibleMoves[i].to)
    }

    highlightPossibleMoves(square, squaresToHighlight)
    try {
      game.move({
        from: pieceSquare,
        to: square,
        promotion: 'q',
      })
    } catch (error) {
      return null
    }
    const newHistory = game.history({ verbose: true })
    setHistory(newHistory)
    setFen(game.fen())
    setPieceSquare('')
    setSquareStyles(getSquareStyling({ pieceSquare: '', history: newHistory }))
  }

  return (
    <Board
      width={850}
      position={fen}
      squareStyles={squareStyles}
      onDrop={onDrop}
      onSquareClick={onSquareClick}
    />
  )
}

const getSquareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from
  const targetSquare = history.length && history[history.length - 1].to

  return {
    [pieceSquare]: { backgroundColor: 'rgba(0, 220, 120, 0.4)' },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: 'rgba(255, 255, 50, 0.4)',
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: 'rgba(255, 255, 50, 0.4)',
      },
    }),
  }
}

export default Chessboard
