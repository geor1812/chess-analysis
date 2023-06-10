import { useState, useEffect } from 'react'
import Board from 'chessboardjsx'

import { Orientation } from './AnalysisBoardPage'

export type EngineHighlight = {
  from: string
  to: string
}

type ChessboardProps = {
  game: any
  history: any[]
  fen: string
  setFen: (fen: string) => void
  setHistory: (history: any[]) => void
  orientation: Orientation
  engineHighlight: EngineHighlight
}

const Chessboard = ({
  game,
  history,
  setHistory,
  fen,
  setFen,
  orientation,
  engineHighlight,
}: ChessboardProps) => {
  const [pieceSquare, setPieceSquare] = useState('')
  const [squareStyles, setSquareStyles] = useState({})

  useEffect(() => {
    highlightEngineMoves()
  }, [engineHighlight])

  useEffect(() => {
    if (game && fen === game.fen()) {
      resetStyles()
    } else {
      removeStyles()
    }
  }, [fen])

  const removeStyles = () => {
    setSquareStyles({})
  }

  const resetStyles = () => {
    const styles = getSquareStyling({
      history,
      pieceSquare: null,
    })
    setSquareStyles(styles)
  }

  const highlightEngineMoves = async () => {
    if (engineHighlight) {
      const toHasPiece = game.get(engineHighlight.to) ? true : false
      const highlightStyles = {
        [engineHighlight.from]: {
          backgroundColor: 'rgba(144, 202, 249, 1)',
        },
        [engineHighlight.to]: {
          background: toHasPiece
            ? 'radial-gradient(circle, transparent 60%, #90CAF9)'
            : 'radial-gradient(circle, #90CAF9 10%, transparent 40%)',
        },
      }
      setSquareStyles({ ...squareStyles, ...highlightStyles })
    }
  }
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
    if (game.isNavigating()) {
      return null
    }
    if (game.isGameOver()) {
      return null
    }
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
    if (game.isNavigating()) {
      return null
    }
    if (game.isGameOver()) {
      return null
    }
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
      orientation={orientation}
    />
  )
}

const getSquareStyling = ({
  history,
  pieceSquare,
}: {
  history: any[]
  pieceSquare?: string
}) => {
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
