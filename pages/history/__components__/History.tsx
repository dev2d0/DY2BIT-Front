import styled from '@emotion/styled'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { apiSlice } from '../../api/api.slice'

export default function History() {
  const { data, error, isLoading } = apiSlice.useGetHistoryReservationOrderListQuery({})
  const [getHistoryReservationOrderListTrigger, getHistoryReservationOrderListResult] =
    apiSlice.useLazyGetHistoryReservationOrderListQuery()
  const [deleteHistoryReservationOrderTrigger, deleteHistoryReservationOrderResult] =
    apiSlice.useLazyDeleteHistoryReservationOrderQuery()

  const deleteHistory = (id: number) => {
    if (!confirm(`정말 예약 주문 내역을 삭제하시겠습니까?`)) {
      return
    }
    deleteHistoryReservationOrderTrigger({
      id,
    })
  }

  useEffect(() => {
    getHistoryReservationOrderListTrigger({})
  }, [deleteHistoryReservationOrderResult])

  return (
    <ReservationOrderListWrapper>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="history reservation order list">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">김프</StyledTableCell>
              <StyledTableCell align="right">체결량</StyledTableCell>
              <StyledTableCell align="right">포지션</StyledTableCell>
              <StyledTableCell align="right">생성일</StyledTableCell>
              <StyledTableCell align="right">종료일</StyledTableCell>
              <StyledTableCell align="center">삭제</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(row => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.targetKimpRate}
                </StyledTableCell>
                <StyledTableCell align="right">{row.completedQuantity}</StyledTableCell>
                <StyledTableCell align="right">{row.position ? '매수' : '매도'}</StyledTableCell>
                <StyledTableCell align="right">
                  {DateTime.fromJSDate(new Date(Number(row.createdAt))).toFormat('MM.dd')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {DateTime.fromJSDate(new Date(Number(row.endAt))).toFormat('MM.dd:hh.mm')}
                </StyledTableCell>
                <StyledTableCell onClick={() => deleteHistory(row.id)} align="center">
                  <DeleteForeverIcon fontSize="small" />
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
  .css-1rp5ql8.MuiTableCell-head {
    padding: 7px;
    font-size: 0.775rem;
  }
  .css-10jfj2g.MuiTableCell-head {
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
  .css-1c7m334.MuiTableCell-body {
    padding: 7px;
    font-size: 0.775rem;
  }
  .css-132l2wk.MuiTableCell-body {
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
