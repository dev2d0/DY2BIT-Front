import styled from '@emotion/styled'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import EditIcon from '@mui/icons-material/Edit'
import { Portal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DateTime } from 'luxon'
import { useState } from 'react'
import IntroReservationOrderUpdateModal from './IntroReservationOrderUpdateModal'
import {
  reservationOrderUpdateModalActions,
  selectUpdateModalState,
} from '../../../store/modules/reservation-order-update.modal.slice'
import { getReservationOrderListResult } from '../../../lib/types/types'

export default function IntroReservationOrderList() {
  const dispatch = useDispatch()
  const data = [
    {
      id: 100001,
      coinName: 'BTC',
      targetKimpRate: 2.1,
      unCompletedQuantity: 0.9,
      completedQuantity: 0,
      position: true,
      createdAt: 1651995873000,
    },
    {
      id: 100002,
      coinName: 'BTC',
      targetKimpRate: 4.7,
      unCompletedQuantity: 0.7,
      completedQuantity: 0.2,
      position: false,
      createdAt: 1651895803000,
    },
  ]
  const [updateReservationOrder, setUpdateReservationOrder] = useState<getReservationOrderListResult>()
  const isModalShow = useSelector(selectUpdateModalState)

  const showUpdateModal = (id: number, target: getReservationOrderListResult) => {
    setUpdateReservationOrder(target)
    dispatch(reservationOrderUpdateModalActions.updateModalShow())
  }

  return (
    <ReservationOrderListWrapper>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="reservation order list">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">김프</StyledTableCell>
              <StyledTableCell align="right">미체결</StyledTableCell>
              <StyledTableCell align="right">체결</StyledTableCell>
              <StyledTableCell align="right">포지션</StyledTableCell>
              <StyledTableCell align="right">생성일</StyledTableCell>
              <StyledTableCell align="center">수정</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(row => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.targetKimpRate}
                </StyledTableCell>
                <StyledTableCell align="right">{row.unCompletedQuantity}</StyledTableCell>
                <StyledTableCell align="right">{row.completedQuantity}</StyledTableCell>
                <StyledTableCell align="right">{row.position ? '매수' : '매도'}</StyledTableCell>
                <StyledTableCell align="right">
                  {DateTime.fromJSDate(new Date(Number(row.createdAt))).toFormat('MM.dd')}
                </StyledTableCell>
                <StyledTableCell onClick={() => showUpdateModal(row.id, row)} align="center">
                  <EditIcon fontSize="small" />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <Portal>
            {isModalShow ? (
              <IntroReservationOrderUpdateModal
                id={updateReservationOrder?.id as number}
                coinName={updateReservationOrder?.coinName as string}
                unCompletedQuantity={updateReservationOrder?.unCompletedQuantity as number}
                completedQuantity={updateReservationOrder?.completedQuantity as number}
                position={updateReservationOrder?.position as boolean}
                targetKimpRate={updateReservationOrder?.targetKimpRate as number}
                createdAt={updateReservationOrder?.createdAt as number}
                endAt={updateReservationOrder?.endAt as number}
              />
            ) : null}
          </Portal>
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
  // 배포 버전
  .css-1rp5ql8.MuiTableCell-head { {
    padding: 7px;
    font-size: 0.775rem;
  }
    .css-10jfj2g.MuiTableCell-head {
      padding: 7px;
      font-size: 0.775rem;
    }
    .css-132l2wk.MuiTableCell-body {
      padding: 7px;
      font-size: 0.775rem;
    }
    .css-1c7m334.MuiTableCell-body {
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
