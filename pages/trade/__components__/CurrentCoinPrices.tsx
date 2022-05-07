import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useEffect } from 'react'
import { apiSlice } from '../../api/api.slice'
import { currentCoinPricesActions } from '../../../store/modules/current-price.slice'
import { CurrentCoinPricesResult } from '../../../lib/types/types'
import ErrorReport from './ErrorReport'

export default function CurrentCoinPrices() {
  const { data, error, isLoading } = apiSlice.useGetCurrentCoinPricesQuery({})
  const [getCurrentCoinPricesTrigger, getCurrentCoinPricesResult] = apiSlice.useLazyGetCurrentCoinPricesQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (getCurrentCoinPricesResult.status === 'fulfilled') {
      dispatch(
        currentCoinPricesActions.updateCurrentCoinPrices(getCurrentCoinPricesResult.data as CurrentCoinPricesResult)
      )
    } else if (data) {
      dispatch(currentCoinPricesActions.updateCurrentCoinPrices(data as CurrentCoinPricesResult))
    }
  }, [data, getCurrentCoinPricesResult])

  const onRefresh = () => {
    getCurrentCoinPricesTrigger({})
  }
  return (
    <CurrentPriceWrapper>
      <Title>DY2BIT KimpTrade</Title>
      <ErrorReport />
      <CurrentPriceContainer>
        <CurrentPriceFont>현재 김프: {data?.kimpPer ?? '###'}%</CurrentPriceFont>
      </CurrentPriceContainer>
      <CurrentPriceContainer>
        <CurrentPriceFont>업비트 BTC: {data?.upbitPrice.toLocaleString('ko-KR') ?? '###'}원</CurrentPriceFont>
      </CurrentPriceContainer>
      <CurrentPriceContainer>
        <CurrentPriceFont>
          바이낸스 BTC: {data ? Math.round(data.binancePrice * data.exchangeRatePrice).toLocaleString('ko-KR') : '###'}
          원, {Math.round(data?.binancePrice as number).toLocaleString('ko-KR') ?? '###'}
          달러
        </CurrentPriceFont>
      </CurrentPriceContainer>
      <LastCurrentPriceContainer>
        <CurrentPriceFont>환율: {data?.exchangeRatePrice ?? '###'}원</CurrentPriceFont>
      </LastCurrentPriceContainer>
      <RefreshContainer onClick={onRefresh}>
        <p>새로고침</p>
        <RefreshIcon />
      </RefreshContainer>
    </CurrentPriceWrapper>
  )
}

const CurrentPriceWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Title = styled.p`
  text-align: center;
  font-size: 17px;
  line-height: 32px;
  font-weight: bold;
`

const CurrentPriceContainer = styled.div`
  width: 100%;
  margin: 10px auto 12px auto;
  border: 1px solid #7282a6;
  border-radius: 28.2953px;
`

const LastCurrentPriceContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  border: 1px solid #7282a6;
  border-radius: 28.2953px;
`

const CurrentPriceFont = styled.p`
  font-size: 12px;
  padding: 0px 0px 2px 20px;
`

const RefreshContainer = styled.div`
  cursor: pointer;
  padding-left: 15px;
  display: inline-flex;
  p {
    margin: 0px;
    font-size: 10px;
  }
  svg {
    font-size: 15px;
  }
`
