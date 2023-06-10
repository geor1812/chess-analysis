import { useState, useEffect } from 'react'
import { Dialog } from '@mui/material'

import SelectScreen from './SelectScreen'
import FenScreen from './FenScreen'
import PgnScreen from './PgnScreen'
type ImportModalProps = {
  open: boolean
  handleClose: () => void
  game: any
  setFen: (fen: string) => void
}

export enum SCREEN {
  Select,
  Fen,
  Pgn,
}

const ImportModal = ({ open, handleClose, game, setFen }: ImportModalProps) => {
  const [screen, setScreen] = useState(SCREEN.Select)
  const [fenError, setFenError] = useState(false)
  const [pgnError, setPgnError] = useState(false)

  const importFen = (fen: string) => {
    try {
      game.load(fen.trim())
      setFen(game.fen())
      handleClose()
    } catch (error) {
      setFenError(true)
    }
  }

  const importPgn = (pgn: string) => {
    const currentPgn = game.pgn()
    try {
      game.loadPgn(pgn)
      setFen(game.fen())
      handleClose()
    } catch (error) {
      setPgnError(true)
      game.loadPgn(currentPgn)
    }
  }

  useEffect(() => {
    //Delaying by 200ms to avoid screen jumping during closing transition
    setTimeout(() => {
      setScreen(SCREEN.Select)
      setFenError(false)
      setPgnError(false)
    }, 200)
  }, [open])

  const renderScreen = () => {
    switch (screen) {
      case SCREEN.Fen:
        return (
          <FenScreen
            handleClose={handleClose}
            setScreen={setScreen}
            importFen={importFen}
            hasError={fenError}
          />
        )
      case SCREEN.Pgn:
        return (
          <PgnScreen
            handleClose={handleClose}
            setScreen={setScreen}
            importPgn={importPgn}
            hasError={pgnError}
          />
        )
      default:
        return <SelectScreen handleClose={handleClose} setScreen={setScreen} />
    }
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        {renderScreen()}
      </Dialog>
    </>
  )
}

export default ImportModal
