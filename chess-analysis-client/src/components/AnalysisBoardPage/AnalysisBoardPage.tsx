import { Stack, Box } from '@mui/material'
import Chessboard from './Chessboard'

const AnalysisBoardPage = () => {
  return (
    <Stack direction="row">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60vw',
          height: '100vh',
        }}
      >
        <Chessboard />
      </Box>
      <Box
        sx={{
          widht: '40vw',
          height: '100vh',
        }}
      >
        Other stuff goes here
      </Box>
    </Stack>
  )
}
export default AnalysisBoardPage
