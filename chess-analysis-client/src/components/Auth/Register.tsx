import { useState } from 'react'
import { Paper, TextField, Button, Stack, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'

import { SnackbarAlert } from './Auth'

import en_US from '../../i18n/en_US.json'

type RegisterProps = {
  setIsRegister: (isRegister: boolean) => void
  setAlert: (alert: SnackbarAlert) => void
}

const Register = ({ setIsRegister, setAlert }: RegisterProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleRegister = async () => {
    const url = new URL(process.env.REACT_APP_SERVER_URL + '/auth/register')

    if (password === repeatPassword) {
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
      } else if (data.success) {
        setAlert({
          severity: 'success',
          message: data.success,
        })
        setIsRegister(false)
      }
    } else {
      setAlert({
        severity: 'error',
        message: 'The passwords do not match',
      })
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
              {en_US.auth.register}
            </Typography>
            <Typography>{en_US.auth.fill}</Typography>
            <TextField
              required
              sx={{ width: '75%' }}
              id="email"
              label={en_US.auth.email}
              variant="outlined"
              type="email"
              autoComplete="nope"
              size="small"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              sx={{ width: '75%' }}
              id="password"
              label={en_US.auth.password}
              variant="outlined"
              type="password"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              required
              sx={{ width: '75%' }}
              id="repeatPassword"
              label={en_US.auth.repeatPassword}
              variant="outlined"
              type="password"
              size="small"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <Button
              id="register-submit"
              sx={{ width: '50%', mt: 2 }}
              variant="outlined"
              type="submit"
              endIcon={<AppRegistrationIcon />}
              onClick={(e) => {
                e.preventDefault()
                handleRegister()
              }}
            >
              {en_US.auth.register}
            </Button>
          </Stack>
        </form>
      </Paper>
      <Button
        sx={{ height: '75px' }}
        variant="outlined"
        color="secondary"
        startIcon={<LoginIcon />}
        onClick={() => {
          setIsRegister(false)
        }}
      >
        {en_US.auth.login}
      </Button>
    </>
  )
}

export default Register
