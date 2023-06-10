import { useState, useEffect } from 'react'
import { Stack, IconButton, Tooltip } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import HistoryIcon from '@mui/icons-material/History'
import SyncIcon from '@mui/icons-material/Sync'

import { Orientation } from './AnalysisBoardPage'
import en_US from '../i18n/en_US.json'
import { getMoveWithOffset } from '../utils/chessUtils'

type ActionsProps = {
  game: any
  setFen: (fen: string) => void
  orientation: Orientation
  setOrientation: (orientation: Orientation) => void
  setAtMove: (atMove: string) => void
}

const Actions = ({
  game,
  setFen,
  orientation,
  setOrientation,
  setAtMove,
}: ActionsProps) => {
  const [moveOffset, setMoveOffset] = useState(0)

  const handleBack = () => {
    try {
      const previousFen = game.back()
      setFen(previousFen)
      setMoveOffset(moveOffset + 1)
    } catch (error) {
      return null
    }
  }

  const handleNext = () => {
    const nextFen = game.next()
    nextFen && setFen(nextFen)
    if (moveOffset !== 0) {
      setMoveOffset(moveOffset - 1)
    }
  }

  const handleReset = () => {
    const currentFen = game.fen()
    game.clearFuture()
    setFen(currentFen)
    setMoveOffset(0)
  }

  const handleFlip = () => {
    if (orientation === Orientation.White) {
      setOrientation(Orientation.Black)
    } else {
      setOrientation(Orientation.White)
    }
  }

  useEffect(() => {
    if (game) {
      const currentPgn = game.pgn({ maxWidth: 5, newLine: '\n' })
      setAtMove(getMoveWithOffset(currentPgn, moveOffset))
    }
  }, [moveOffset])

  return (
    <Stack sx={{ ml: 10, mt: 2 }} direction="row">
      <Tooltip title={en_US.analysisBoardPage.back}>
        <IconButton onClick={handleBack}>
          <ArrowBackIosIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={en_US.analysisBoardPage.next}>
        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={en_US.analysisBoardPage.reset}>
        <IconButton onClick={handleReset}>
          <HistoryIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={en_US.analysisBoardPage.flip}>
        <IconButton onClick={handleFlip}>
          <SyncIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

export default Actions
