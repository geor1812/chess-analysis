import { useState, useEffect } from 'react'
import { Dialog } from '@mui/material'

import SelectScreen from './SelectScreen'
import FenScreen from './FenScreen'
type ImportModalProps = {
  open: boolean
  handleClose: () => void
}

export enum SCREEN {
  Select,
  Fen,
}

const ImportModal = ({ open, handleClose }: ImportModalProps) => {
  const [screen, setScreen] = useState(SCREEN.Select)

  useEffect(() => {
    //Delaying by 200ms to avoid screen jumping during closing transition
    setTimeout(() => setScreen(SCREEN.Select), 200)
  }, [open])

  const renderScreen = () => {
    switch (screen) {
      case SCREEN.Fen:
        return <FenScreen handleClose={handleClose} setScreen={setScreen} />
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
