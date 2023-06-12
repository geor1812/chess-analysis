import {
  styled,
  tableCellClasses,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material'

import en_US from '../i18n/en_US.json'
import { getLastMove } from '../utils/chessUtils'

type DatabaseProps = {
  responses: any[] | undefined
}

const Database = ({ responses }: DatabaseProps) => {
  return (
    <Paper
      sx={{
        width: '100%',
        height: 220,
        overflow: 'auto',
        mt: 2,
      }}
    >
      <TableContainer>
        <Typography sx={{ fontWeight: '600' }}>
          {en_US.analysisBoardPage.responses}
        </Typography>
        <Table>
          <TableBody>
            {responses &&
              responses.map((response, index) => (
                <TableRow
                  key={`respone${index}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {response?.pgn ? getLastMove(response.pgn) : ''}
                  </TableCell>
                  <TableCell align="left">{response?.name}</TableCell>
                  <TableCell align="left">{response?.count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))

export default Database
