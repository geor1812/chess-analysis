import { useState, useEffect } from 'react'
import Board from 'chessboardjsx'
import { Chess } from 'chess.js'

const Chessboard = () => {
  const [game, setGame] = useState<any>()
  const [fen, setFen] = useState('start')
  const [history, setHistory] = useState([])
  const [pieceSquare, setPieceSquare] = useState('')
  const [squareStyles, setSquareStyles] = useState({})

  useEffect(() => {
    setGame(new Chess())
  }, [])

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

    setFen(game.fen())
    //setHistory(game.history({ verbose: true }))
  }

  const onSquareClick = (square: string) => {
    setPieceSquare(square)
    setSquareStyles(squareStyling({ pieceSquare, history }))

    try {
      game.move({
        from: pieceSquare,
        to: square,
        promotion: 'q',
      })
    } catch (error) {
      return null
    }

    setFen(game.fen())
    //setHistory(game.history({ verbose: true }))
    setPieceSquare('')
  }

  const onMouseOverSquare = (square: string) => {
    const possibleMoves = game.moves({
      square: square,
      verbose: true,
    })
  }

  return (
    <Board
      width={850}
      position={fen}
      onDrop={onDrop}
      onSquareClick={onSquareClick}
      onMouseOverSquare={onMouseOverSquare}
    />
  )
}

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from
  const targetSquare = history.length && history[history.length - 1].to

  return {
    [pieceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: 'rgba(255, 255, 0, 0.4)',
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: 'rgba(255, 255, 0, 0.4)',
      },
    }),
  }
}

export default Chessboard
