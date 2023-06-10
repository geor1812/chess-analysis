// @ts-nocheck
import { useState, useEffect } from 'react'
import { Stack, Box } from '@mui/material'
import { Chess } from '../chess.js/chess'
import Chessboard from './Chessboard'
import Sidebar from './Sidebar'

import { getMoveWithOffset } from '../utils/chessUtils'
import { EngineHighlight } from './Chessboard'

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export enum Orientation {
  White = 'white',
  Black = 'black',
}

const AnalysisBoardPage = () => {
  const [game, setGame] = useState<any>()
  const [history, setHistory] = useState([])
  const [fen, setFen] = useState(START_FEN)
  const [atMove, setAtMove] = useState('Starting position')
  const [orientation, setOrientation] = useState<Orientation>(Orientation.White)
  const [engineHighlight, setEngineHighlight] =
    useState<EngineHighlight | null>(null)

  useEffect(() => {
    if (game) {
      const currentPgn = game.pgn({ maxWidth: 5, newLine: '\n' })
      setAtMove(getMoveWithOffset(currentPgn, 0))
    }
  }, [history])

  useEffect(() => {
    setGame(new Chess())
  }, [])

  return (
    <Stack direction="row">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60vw',
          height: '100vh',
        }}
      >
        <Chessboard
          game={game}
          history={history}
          setHistory={setHistory}
          fen={fen}
          setFen={setFen}
          orientation={orientation}
          engineHighlight={engineHighlight}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '35vw',
          height: '100vh',
        }}
      >
        <Sidebar
          game={game}
          fen={fen}
          setFen={setFen}
          orientation={orientation}
          setOrientation={setOrientation}
          atMove={atMove}
          setAtMove={setAtMove}
          setEngineHighlight={setEngineHighlight}
        />
      </Box>
    </Stack>
  )
}
export default AnalysisBoardPage
