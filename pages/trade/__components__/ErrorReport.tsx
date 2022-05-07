import styled from '@emotion/styled'
import { DateTime } from 'luxon'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import { apiSlice } from '../../api/api.slice'

export default function ErrorReport() {
  const { data, error, isLoading } = apiSlice.useGetErrorReportQuery({})
  const [getErrorReportTrigger, getErrorReportResult] = apiSlice.useLazyGetErrorReportQuery({})
  const [confirmErrorReportTrigger, confirmErrorReportResult] = apiSlice.useLazyConfirmErrorReportQuery()

  const onConfirmError = () => {
    if (!confirm(`정말 에러 내역을 삭제하시겠습니까?`)) {
      return
    }
    confirmErrorReportTrigger({})
  }

  useEffect(() => {
    if (confirmErrorReportResult.status === 'rejected') {
      // @ts-ignore
      alert(confirmErrorReportResult.error?.data.message)
    } else {
      getErrorReportTrigger({})
    }
  }, [confirmErrorReportResult])

  if (data?.errorFoundedAt != null) {
    return (
      <ErrorReportContainer>
        <ErrorReportFont>
          {`${DateTime.fromJSDate(new Date(Number(data.errorFoundedAt))).toFormat('MM.dd:hh.mm')}에 ${
            data?.errorTarget
          }에서 "${data?.errorMessage}"에러가 발생하였습니다. `}
        </ErrorReportFont>
        <ConfirmContainer onClick={onConfirmError}>
          <ConfirmErrorBtn>에러 해결 완료(지우기)</ConfirmErrorBtn>
        </ConfirmContainer>
      </ErrorReportContainer>
    )
  }
  return null
}

const ErrorReportContainer = styled.div`
  width: 100%;
  margin: 10px auto 12px auto;
  border: 1px solid #7282a6;
`

const ErrorReportFont = styled.p`
  font-size: 12px;
  color: red;
  padding: 0px 0px 2px 20px;
`

const ConfirmContainer = styled.div`
  border-top: 1px solid #7282a6;
  text-align: center;
`

const ConfirmErrorBtn = styled(Button)`
  background: #790f0f;
  color: white;
  width: 40%;
  height: 30px;
  font-size: 11px;
  font-weight: bold;

  &:hover {
    background: #790f0f;
    opacity: 70%;
  }
`
