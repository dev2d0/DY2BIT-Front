import styled from '@emotion/styled'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'
import { apiSlice } from '../../api/api.slice'
import { selectExchangeRatePriceState } from '../../../store/modules/current-price.slice'

export default function UserAccountList() {
  const { data, error, isLoading } = apiSlice.useGetUserAccountQuery({})
  const exchangeRatePrice = useSelector(selectExchangeRatePriceState)

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
              <StyledTableCell align="right">{`${
                data ? Math.round(data?.upbitBuyAccountKRW).toLocaleString('ko-KR') : '###'
              }원`}</StyledTableCell>
              <StyledTableCell align="right">{`${data?.upbitSellAccountBTC ?? '###'}BTC`}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="center" component="th" scope="row">
                {`바이낸스(x${data?.binanceLeverage ?? '###'})`}
              </StyledTableCell>
              <StyledTableCell align="right">
                {`${data ? Math.round(data?.binanceBuyAccountUSDT).toLocaleString('ko-KR') : '###'}$`}
                <UsdtToWonDescription>{`(${
                  data
                    ? Math.round(
                        (data?.binanceBuyAccountUSDT as number) * exchangeRatePrice * (data?.binanceLeverage as number)
                      ).toLocaleString('ko-KR')
                    : '###'
                }원)`}</UsdtToWonDescription>
              </StyledTableCell>
              <StyledTableCell align="right">{`${data?.binanceSellAccountBTC ?? '###'}BTC`}</StyledTableCell>
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
