import { useState } from 'react'
import { Paper, TextField, Button, Stack, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'

import { SnackbarAlert } from './Auth'
import useAuth from '../../hooks/useAuth'
import en_US from '../../i18n/en_US.json'

type LoginProps = {
  setIsRegister: (isRegister: boolean) => void
  setAlert: (alert: SnackbarAlert) => void
}

const Login = ({ setIsRegister, setAlert }: LoginProps) => {
  const { setToken, setUser } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAuthenticate = async () => {
    const url = new URL(process.env.REACT_APP_SERVER_URL + '/auth/login')

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()

    if (data.error) {
      setAlert({
        severity: 'error',
        message: data.error,
      })
    } else {
      setToken(data.token)
      setUser({
        email: data.email,
      })
      window.location.assign('/')
    }
  }

  return (
    <>
      <Paper
        sx={{
          padding: '20px',
          pt: '50px',
          width: '500px',
          height: '500px',
        }}
      >
        <form>
          <Stack alignItems="center" spacing={4}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {en_US.auth.login}
            </Typography>
            <Typography>{en_US.auth.welcome}</Typography>
            <TextField
              required
              sx={{ width: '75%' }}
              id="email"
              label={en_US.auth.email}
              variant="outlined"
              type="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              sx={{ width: '75%' }}
              id="password"
              label={en_US.auth.password}
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              id="login-btn"
              sx={{ width: '50%' }}
              variant="outlined"
              endIcon={<LoginIcon />}
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                handleAuthenticate()
              }}
            >
              {en_US.auth.login}
            </Button>
          </Stack>
        </form>
      </Paper>
      <Button
        id="register-btn"
        sx={{ height: '75px' }}
        variant="outlined"
        color="secondary"
        startIcon={<AppRegistrationIcon />}
        onClick={() => {
          setIsRegister(true)
        }}
      >
        {en_US.auth.register}
      </Button>
    </>
  )
}

export default Login
