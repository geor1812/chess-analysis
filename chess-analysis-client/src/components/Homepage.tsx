import { Typography, Box, Paper } from '@mui/material'
import white_knight from '../images/white_knight.png'

const Homepage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="30vh"
    >
      <Typography variant="h2">CHESS ANALYSIS</Typography>
      <Paper variant="outlined">
        <img src={white_knight} />
      </Paper>
    </Box>
  )
}

export default Homepage
