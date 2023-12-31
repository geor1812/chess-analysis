import { ReactNode, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
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
import Actions from './Actions'
import Evaluation from './Evaluation'
import Database from './Database'
import en_US from '../i18n/en_US.json'
import { Orientation } from './AnalysisBoardPage'
import { EngineHighlight } from './Chessboard'
import { getOpeningAndResponsesByFen } from '../queries'
import useAuth from '../hooks/useAuth'

type SidebarProps = {
  game: any
  fen: string
  setFen: (fen: string) => void
  orientation: Orientation
  setOrientation: (orientation: Orientation) => void
  atMove: string
  setAtMove: (atMove: string) => void
  setEngineHighlight: (engineHighlight: EngineHighlight) => void
}

type SectionHeaderProps = {
  text: string
  tooltip: string
}

type SectionWrapperProps = {
  children?: ReactNode
  sx?: SxProps
}

const Sidebar = ({
  game,
  fen,
  setFen,
  orientation,
  setOrientation,
  atMove,
  setAtMove,
  setEngineHighlight,
}: SidebarProps) => {
  const { user } = useAuth()

  const [openImportModal, setOpenImportModal] = useState(false)
  const handleOpen = () => setOpenImportModal(true)
  const handleClose = () => setOpenImportModal(false)

  const { isLoading, data } = useQuery(['opening', fen], () =>
    getOpeningAndResponsesByFen(fen)
  )

  if (!user) {
    return (
      <Paper
        sx={{
          p: 2,
          width: '35vw',
          height: '35vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>{en_US.analysisBoardPage.loginPrompt}</Typography>
          <Link
            to={'/auth'}
            style={{ textDecoration: 'none' }}
            state={{ isRegister: false }}
          >
            <Typography
              variant="h4"
              color="primary.main"
              sx={{
                '&:hover': {
                  color: 'primary.dark',
                  textDecoration: 'underline',
                },
              }}
            >
              {en_US.auth.login}
            </Typography>
          </Link>
        </Stack>
      </Paper>
    )
  }

  return (
    <>
      <ImportModal
        open={openImportModal}
        handleClose={handleClose}
        game={game}
        setFen={setFen}
      />
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
        <Stack direction="row" spacing={2}>
          <SectionWrapper sx={{ height: '48vh' }}>
            <SectionHeader
              text={en_US.analysisBoardPage.pgn}
              tooltip={en_US.analysisBoardPage.pgnTooltip}
            />
            <Box
              sx={{
                p: 2,
                height: 'inherit',
                width: '17vw',
                backgroundColor: 'background.default',
                overflowY: 'scroll',
              }}
            >
              {game?.pgn().length > 0 ? (
                <Typography sx={{ whiteSpace: 'pre-line' }}>
                  {game.pgn({ maxWidth: 5, newline: '\n' })}
                </Typography>
              ) : (
                <Typography>{en_US.analysisBoardPage.pgnPrompt}</Typography>
              )}
            </Box>
          </SectionWrapper>
          <SectionWrapper>
            <Actions
              game={game}
              setFen={setFen}
              orientation={orientation}
              setOrientation={setOrientation}
              setAtMove={setAtMove}
            />
            <Evaluation
              fen={fen}
              atMove={atMove}
              setEngineHighlight={setEngineHighlight}
              opening={data?.opening?.name}
            />
          </SectionWrapper>
        </Stack>
        <SectionWrapper>
          <Database responses={data?.responses} />
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
  return <Box sx={{ mb: 2, ...sx }}>{children}</Box>
}

export default Sidebar
