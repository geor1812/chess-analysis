import { useState, useEffect } from 'react'
import { Stack, Box } from '@mui/material'
import { Chess } from 'chess.js'

import Chessboard from './Chessboard'
import Sidebar from './Sidebar'

const AnalysisBoardPage = () => {
  const [game, setGame] = useState<any>()
  const [history, setHistory] = useState([])

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
        <Chessboard game={game} history={history} setHistory={setHistory} />
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
        <Sidebar game={game} />
      </Box>
    </Stack>
  )
}
export default AnalysisBoardPage
