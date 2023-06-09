import { Stack, IconButton, Tooltip } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import HistoryIcon from '@mui/icons-material/History'
import SyncIcon from '@mui/icons-material/Sync'

import en_US from '../../i18n/en_US.json'
import { Orientation } from './AnalysisBoardPage'

type ActionsProps = {
  game: any
  setFen: (fen: string) => void
  orientation: Orientation
  setOrientation: (orientation: Orientation) => void
}

const Actions = ({
  game,
  setFen,
  orientation,
  setOrientation,
}: ActionsProps) => {
  const handleBack = () => {
    try {
      const previousFen = game.back()
      setFen(previousFen)
    } catch (error) {
      return null
    }
  }

  const handleNext = () => {
    const nextFen = game.next()
    nextFen && setFen(nextFen)
  }

  const handleReset = () => {
    const currentFen = game.fen()
    game.clearFuture()
    setFen(currentFen)
  }

  const handleFlip = () => {
    if (orientation === Orientation.White) {
      setOrientation(Orientation.Black)
    } else {
      setOrientation(Orientation.White)
    }
  }

  return (
    <Stack sx={{ ml: 8, mt: 2 }} direction="row">
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
