import { Stack, IconButton, Box } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

type ActionsProps = {
  game: any
  setFen: (fen: string) => void
}

const Actions = ({ game, setFen }: ActionsProps) => {
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

  return (
    <Stack direction="row">
      <IconButton onClick={handleBack}>
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton onClick={handleNext}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Stack>
  )
}

export default Actions
