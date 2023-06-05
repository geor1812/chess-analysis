import { useState, useEffect } from 'react'
import { Stack, Box } from '@mui/material'
import { Chess } from 'chess.js'

import Chessboard from './Chessboard'
import Sidebar from './Sidebar'

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

const AnalysisBoardPage = () => {
  const [game, setGame] = useState<any>()
  const [history, setHistory] = useState([])
  const [fen, setFen] = useState(START_FEN)

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
        <Sidebar game={game} setFen={setFen} />
      </Box>
    </Stack>
  )
}
export default AnalysisBoardPage
