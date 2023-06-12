import { useState } from 'react'
import { Box, Container, Alert, AlertColor } from '@mui/material'
import { useLocation } from 'react-router-dom'

import Login from './Login'
import Register from './Register'

export type SnackbarAlert = {
  severity: AlertColor
  message: string
}

const Auth = () => {
  const location = useLocation()

  const [isRegister, setIsRegister] = useState(
    location.state?.isRegister || false
  )

  const [alert, setAlert] = useState<SnackbarAlert>()

  return (
    <Container>
      {alert ? (
        <Box justifyContent="center" display="flex">
          <Alert
            sx={{ width: '100%', mt: 2 }}
            variant="outlined"
            severity={alert.severity}
          >
            {alert.message}
          </Alert>
        </Box>
      ) : null}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {isRegister ? (
          <Register setIsRegister={setIsRegister} setAlert={setAlert} />
        ) : (
          <Login setIsRegister={setIsRegister} setAlert={setAlert} />
        )}
      </Box>
    </Container>
  )
}

export default Auth
