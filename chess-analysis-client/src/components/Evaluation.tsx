import { useEffect, useState } from 'react'
import {
  Button,
  Box,
  Stack,
  Typography,
  LinearProgress,
  linearProgressClasses,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import SmartToyIcon from '@mui/icons-material/SmartToy'

import en_US from '../i18n/en_US.json'
import { extractEval } from '../utils/chessUtils'
import { EngineHighlight } from './Chessboard'

const DEPTH = 15
const STOCKFISH = (window as any).STOCKFISH
let stockfish = STOCKFISH()

type EvaluationProps = {
  fen: string
  atMove: string
  setEngineHighlight: (engineHighlight: EngineHighlight) => void
}

export type Eval = {
  bestMove: string
  pondering: string
  engineHighlight: EngineHighlight
  pawnAdvantage: number
  evalBarPosition: number
}

const Evaluation = ({ fen, atMove, setEngineHighlight }: EvaluationProps) => {
  const [bestMove, setBestMove] = useState('')
  const [pondering, setPondering] = useState('')
  const [evalAt, setEvalAt] = useState('')
  const [pawnAdvantage, setPawnAdvantage] = useState(0)
  const [evalBarPosition, setEvalBarPosition] = useState(50)

  useEffect(() => {
    stockfish.postMessage('uci')
    stockfish.onmessage = (message) => {
      if (message.includes('bestmove')) {
        const evaluation = extractEval(message)
        setBestMove(evaluation.bestMove)
        setPondering(evaluation.pondering)
        setEngineHighlight(evaluation.engineHighlight)
        setPawnAdvantage(evaluation.pawnAdvantage)
        setEvalBarPosition(evaluation.evalBarPosition)
      }
      console.log(message)
    }
  }, [])

  const getEvaluation = () => {
    const positionMessage = `position fen ${fen}`
    const goDepthMessage = `go depth ${DEPTH}`
    setEvalAt(atMove)
    stockfish.postMessage(positionMessage)
    stockfish.postMessage(goDepthMessage)
  }

  return (
    <Stack
      spacing={2}
      sx={{ mt: 1, width: '16vw', display: 'flex', alignItems: 'center' }}
    >
      <Typography sx={{ fontWeight: '600' }}>
        {en_US.analysisBoardPage.atMove}
      </Typography>
      <Box
        sx={{
          p: 2,
          backgroundColor: 'background.default',
          width: 235,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography>{atMove}</Typography>
      </Box>
      <Button
        variant="outlined"
        onClick={getEvaluation}
        sx={{ mt: 4 }}
        startIcon={<SmartToyIcon />}
      >
        {en_US.analysisBoardPage.getEval}
      </Button>
      <Typography>depth = 15</Typography>
      {evalAt !== '' && (
        <Box
          sx={{
            p: 1,
            backgroundColor: 'background.default',
          }}
        >
          <Typography>{evalAt}</Typography>
        </Box>
      )}
      <Typography>{pawnAdvantage}</Typography>
      <Box>
        <BorderLinearProgress variant="determinate" value={evalBarPosition} />
      </Box>
      <Stack>
        <Stack spacing={2} direction="row">
          <Typography sx={{ mt: 1 }}>
            {en_US.analysisBoardPage.bestMove}
          </Typography>
          {bestMove !== '' && (
            <Box
              sx={{
                p: 1,
                backgroundColor: 'background.default',
              }}
            >
              <Typography>{bestMove}</Typography>
            </Box>
          )}
        </Stack>
        <Stack spacing={2} direction="row">
          <Typography sx={{ mt: 1 }}>
            {en_US.analysisBoardPage.pondering}
          </Typography>
          {pondering !== '' && (
            <Box
              sx={{
                p: 1,
                backgroundColor: 'background.default',
              }}
            >
              <Typography>{pondering}</Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 20,
  width: 250,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'black',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
}))

export default Evaluation
