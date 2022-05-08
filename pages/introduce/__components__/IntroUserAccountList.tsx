import styled from '@emotion/styled'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function IntroUserAccountList() {
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

  return (
    <UserAccountListListWrapper>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="user account list">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">거래소</StyledTableCell>
              <StyledTableCell align="right">포지션 가능 금액</StyledTableCell>
              <StyledTableCell align="right">보유 BTC</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell align="center" component="th" scope="row">
                업비트
              </StyledTableCell>
              <StyledTableCell align="right">130,540,000원</StyledTableCell>
              <StyledTableCell align="right">1.45BTC</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="center" component="th" scope="row">
                바이낸스(x2)
              </StyledTableCell>
              <StyledTableCell align="right">
                58,420$<UsdtToWonDescription>(148,445,220원)</UsdtToWonDescription>
              </StyledTableCell>
              <StyledTableCell align="right">-1.45BTC</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </UserAccountListListWrapper>
  )
}

const UserAccountListListWrapper = styled.div`
  border: 0.5px solid #f9f9f9;
  margin: 20px 0px 0px 0px;
  .css-1d6liq9-MuiTableCell-root.MuiTableCell-head {
    padding: 13px;
    font-size: 0.7rem;
  }
  .css-17b28km-MuiTableCell-root.MuiTableCell-head {
    padding: 13px;
    font-size: 0.7rem;
  }
  .css-yvtl07-MuiTableCell-root.MuiTableCell-body {
    padding: 13px;
    font-size: 0.7em;
  }
  .css-15gzbgv-MuiTableCell-root.MuiTableCell-body {
    padding: 13px;
    font-size: 0.7em;
  }
`

const UsdtToWonDescription = styled.span`
  font-size: 5px;
`
