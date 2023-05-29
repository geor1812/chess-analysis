import { Typography, Box, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
//@ts-ignore
import logo from '../images/white_knight.png'
import en_US from '../i18n/en_US.json'

type LinkItemProps = { url: string; text: string }

const Homepage = () => {
  console.log(en_US)
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
      <Stack direction="row" sx={{ mt: 5 }}>
        <LinkItem url="/analysis" text={en_US.homepage.analysis} />
      </Stack>
    </Box>
  )
}

const LinkItem = ({ url, text }: LinkItemProps) => {
  return (
    <Link to={url} style={{ textDecoration: 'none' }}>
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
