import { useState, useEffect } from 'react'
import { Dialog } from '@mui/material'

import SelectScreen from './SelectScreen'
import FenScreen from './FenScreen'
type ImportModalProps = {
  open: boolean
  handleClose: () => void
  game: any
  setFen: (fen: string) => void
}

export enum SCREEN {
  Select,
  Fen,
}

const ImportModal = ({ open, handleClose, game, setFen }: ImportModalProps) => {
  const [screen, setScreen] = useState(SCREEN.Select)
  const [fenError, setFenError] = useState(false)

  const importFen = (fen: string) => {
    game.clear()
    try {
      game.load(fen.trim())
      setFen(game.fen())
      handleClose()
    } catch (error) {
      setFenError(true)
    }
  }

  useEffect(() => {
    //Delaying by 200ms to avoid screen jumping during closing transition
    setTimeout(() => {
      setScreen(SCREEN.Select)
      setFenError(false)
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
