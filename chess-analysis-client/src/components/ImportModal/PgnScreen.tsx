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

type PgnScreenProps = {
  handleClose: () => void
  setScreen: (screen: SCREEN) => void
  importPgn: (pgn: string) => void
  hasError: boolean
}
const PgnScreen = ({
  handleClose,
  setScreen,
  importPgn,
  hasError,
}: PgnScreenProps) => {
  const [pgn, setPgn] = useState('')
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
            {en_US.analysisBoardPage.pgnScreenTitle}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ justifyContent: 'center' }} dividers>
        <TextField
          fullWidth
          multiline
          rows={10}
          value={pgn}
          onChange={(e) => setPgn(e.target.value)}
          sx={{ backgroundColor: 'background.default' }}
          error={hasError}
        />
        {hasError && (
          <FormHelperText error>
            {en_US.analysisBoardPage.invalidPgn}
          </FormHelperText>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          onClick={() => {
            importPgn(pgn)
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

export default PgnScreen
