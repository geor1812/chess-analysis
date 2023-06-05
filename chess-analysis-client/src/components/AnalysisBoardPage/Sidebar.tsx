import { ReactNode, useState } from 'react'
import {
  Paper,
  Typography,
  Box,
  Stack,
  Tooltip,
  SxProps,
  IconButton,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

import ImportModal from './ImportModal/ImportModal'
import en_US from '../../i18n/en_US.json'

type SidebarProps = {
  game: any
}

type SectionHeaderProps = {
  text: string
  tooltip: string
}

type SectionWrapperProps = {
  children?: ReactNode
  sx?: SxProps
}

const Sidebar = ({ game }: SidebarProps) => {
  const [openImportModal, setOpenImportModal] = useState(false)
  const handleOpen = () => setOpenImportModal(true)
  const handleClose = () => setOpenImportModal(false)

  return (
    <>
      <ImportModal open={openImportModal} handleClose={handleClose} />
      <Paper
        sx={{
          p: 2,
          width: '35vw',
          height: '95vh',
        }}
      >
        <SectionWrapper
          sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}
        >
          <Tooltip title={en_US.analysisBoardPage.importText} arrow>
            <IconButton onClick={handleOpen} size="large" color="primary">
              <ControlPointIcon
                sx={{ width: 50, height: 50 }}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>
        </SectionWrapper>
        <SectionWrapper>
          <SectionHeader
            text={en_US.analysisBoardPage.fen}
            tooltip={en_US.analysisBoardPage.fenTooltip}
          />
          <Box
            sx={{
              p: 2,
              backgroundColor: 'background.default',
            }}
          >
            {game ? <Typography>{game.fen()}</Typography> : ''}
          </Box>
        </SectionWrapper>
        <SectionWrapper>
          <SectionHeader
            text={en_US.analysisBoardPage.pgn}
            tooltip={en_US.analysisBoardPage.pgnTooltip}
          />
          <Box
            sx={{
              p: 2,
              height: '20vh',
              backgroundColor: 'background.default',
            }}
          >
            {game?.pgn().length > 0 ? (
              <Typography>{game.pgn()}</Typography>
            ) : (
              <Typography sx={{ mt: 7, ml: 9 }}>
                {en_US.analysisBoardPage.pgnPrompt}
              </Typography>
            )}
          </Box>
        </SectionWrapper>
      </Paper>
    </>
  )
}

const SectionHeader = ({ text, tooltip }: SectionHeaderProps) => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography sx={{ fontWeight: '600' }}>{text}</Typography>
      <Tooltip arrow title={tooltip}>
        <InfoIcon fontSize="small" />
      </Tooltip>
    </Stack>
  )
}

const SectionWrapper = ({ children, sx }: SectionWrapperProps) => {
  return <Box sx={{ mb: 3, ...sx }}>{children}</Box>
}

export default Sidebar
