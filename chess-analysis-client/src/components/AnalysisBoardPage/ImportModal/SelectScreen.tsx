import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Stack,
  Paper,
} from '@mui/material'

import en_US from '../../../i18n/en_US.json'
import { SCREEN } from './ImportModal'

type SelectScreenProps = {
  handleClose: () => void
  setScreen: (screen: SCREEN) => void
}
const SelectScreen = ({ handleClose, setScreen }: SelectScreenProps) => {
  return (
    <Paper sx={{ width: 500 }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {en_US.analysisBoardPage.importText}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ justifyContent: 'center' }} dividers>
        <Stack>
          <Button onClick={() => setScreen(SCREEN.Fen)} size="large">
            <Typography variant="h6">{en_US.analysisBoardPage.fen}</Typography>
          </Button>
          <Button size="large">
            <Typography variant="h6">{en_US.analysisBoardPage.pgn}</Typography>
          </Button>
          <Button size="large">
            <Typography variant="h6">
              {en_US.analysisBoardPage.searchDatabase}
            </Typography>
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          size="large"
          variant="outlined"
          color="error"
          onClick={handleClose}
        >
          {en_US.analysisBoardPage.cancel}
        </Button>
      </DialogActions>
    </Paper>
  )
}

export default SelectScreen
