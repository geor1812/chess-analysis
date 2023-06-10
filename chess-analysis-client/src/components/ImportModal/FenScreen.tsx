import { useState } from 'react'
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
  FormHelperText,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import en_US from '../../i18n/en_US.json'
import { SCREEN } from './ImportModal'

type FenScreenProps = {
  handleClose: () => void
  setScreen: (screen: SCREEN) => void
  importFen: (fen: string) => void
  hasError: boolean
}
const FenScreen = ({
  handleClose,
  setScreen,
  importFen,
  hasError,
}: FenScreenProps) => {
  const [fen, setFen] = useState('')
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
          value={fen}
          onChange={(e) => setFen(e.target.value)}
          sx={{ backgroundColor: 'background.default' }}
          error={hasError}
        />
        {hasError && (
          <FormHelperText error>
            {en_US.analysisBoardPage.invalidFen}
          </FormHelperText>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          onClick={() => {
            importFen(fen)
          }}
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
