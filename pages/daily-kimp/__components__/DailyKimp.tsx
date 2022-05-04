import styled from '@emotion/styled'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { DateTime } from 'luxon'
import { apiSlice } from '../../api/api.slice'

export default function DailyKimp() {
  const { data, error, isLoading } = apiSlice.useGetDailyKimpListQuery({})

  return (
    <ReservationOrderListWrapper>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="daily kimp list">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">최소</StyledTableCell>
              <StyledTableCell align="right">최소시각</StyledTableCell>
              <StyledTableCell align="right">최대</StyledTableCell>
              <StyledTableCell align="right">최대시각</StyledTableCell>
              <StyledTableCell align="right">날짜</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(row => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="right" component="th" scope="row">
                  {row.minRate}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {DateTime.fromJSDate(new Date(Number(row.minRateAt))).toFormat('MM.dd:hh.mm')}
                </StyledTableCell>
                <StyledTableCell align="right">{row.maxRate}</StyledTableCell>
                <StyledTableCell align="right">
                  {DateTime.fromJSDate(new Date(Number(row.maxRateAt))).toFormat('MM.dd:hh.mm')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {DateTime.fromJSDate(new Date(Number(row.createdAt))).toFormat('MM.dd')}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ReservationOrderListWrapper>
  )
}

const ReservationOrderListWrapper = styled.div`
  border: 0.5px solid #f9f9f9;
  margin: 20px 0px 0px 0px;
  .css-1d6liq9-MuiTableCell-root.MuiTableCell-head {
    padding: 7px;
    font-size: 0.775rem;
  }
  .css-17b28km-MuiTableCell-root.MuiTableCell-head {
    padding: 7px;
    font-size: 0.775rem;
  }
  .css-yvtl07-MuiTableCell-root.MuiTableCell-body {
    padding: 7px;
    font-size: 0.775rem;
  }
  .css-15gzbgv-MuiTableCell-root.MuiTableCell-body {
    padding: 7px;
    font-size: 0.775rem;
  }
`

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'inherit',
    color: '#ffffff',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: 'inherit',
    color: '#ffffff',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'inherit',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
