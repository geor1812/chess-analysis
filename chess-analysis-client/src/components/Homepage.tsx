import { Typography, Box, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
//@ts-ignore
import logo from '../images/white_knight.png'

type LinkItemProps = { url: string; text: string }

const Homepage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography sx={{ mt: 5 }} variant="h2">
        CHESS ANALYSIS
      </Typography>
      <img src={logo} style={{ width: '400px' }} />
      <Stack direction="row" sx={{ mt: 5 }}>
        <LinkItem url="/analysis" text="Analysis board"></LinkItem>
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
