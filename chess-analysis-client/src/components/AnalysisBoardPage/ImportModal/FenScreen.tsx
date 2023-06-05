import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  TextField,
  Paper,
  IconButton,
  Box,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import en_US from '../../../i18n/en_US.json'
import { SCREEN } from './ImportModal'

type FenScreenProps = {
  handleClose: () => void
  setScreen: (screen: SCREEN) => void
}
const FenScreen = ({ handleClose, setScreen }: FenScreenProps) => {
  return (
    <Paper sx={{ width: 500 }}>
      <DialogTitle sx={{ display: 'flex' }}>
        <IconButton onClick={() => setScreen(SCREEN.Select)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Box
          sx={{ flexGrow: '100', display: 'flex', justifyContent: 'center' }}
        >
          <Typography variant="h5" sx={{ pr: 5, fontWeight: 600 }}>
            {en_US.analysisBoardPage.fenScreenTitle}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ justifyContent: 'center' }} dividers>
        <TextField
          fullWidth
          multiline
          sx={{ backgroundColor: 'background.default' }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          onClick={handleClose}
        >
          {en_US.analysisBoardPage.import}
        </Button>
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

export default FenScreen
