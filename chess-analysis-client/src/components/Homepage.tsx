import { Typography, Box, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
//@ts-ignore
import logo from '../images/white_knight.png'
import en_US from '../i18n/en_US.json'
import useAuth from '../hooks/useAuth'

type LinkItemProps = { url: string; text: string; state?: object }

const Homepage = () => {
  const { user } = useAuth()

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography sx={{ mt: 5 }} variant="h2">
        {en_US.homepage.title}
      </Typography>
      <img src={logo} style={{ width: '400px' }} />
      {user && (
        <Typography sx={{ mt: 5 }} variant="h4" color="primary">
          {user.email}
        </Typography>
      )}
      <Stack direction="column" sx={{ mt: 5, alignItems: 'center' }}>
        <LinkItem url="/analysis" text={en_US.homepage.analysis} />
        {!user && (
          <>
            <LinkItem
              url="/auth"
              state={{ isRegister: false }}
              text={en_US.homepage.login}
            />
            <LinkItem
              url="/auth"
              state={{ isRegister: true }}
              text={en_US.homepage.register}
            />
          </>
        )}
      </Stack>
    </Box>
  )
}

const LinkItem = ({ url, text, state }: LinkItemProps) => {
  return (
    <Link to={url} style={{ textDecoration: 'none' }} state={state}>
      <Typography
        variant="h3"
        color="text.primary"
        sx={{
          '&:hover': { color: 'text.secondary', textDecoration: 'underline' },
        }}
      >
        {text}
      </Typography>
    </Link>
  )
}

export default Homepage
