import styled from '@emotion/styled'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useState } from 'react'

export default function IntroCurrentCoinPrices() {
  const data = [
    {
      id: 0,
      curKimp: '3.31',
      upbitBTC: '45,719,000',
      binanceBTCKRW: '44,241,350',
      binanceBTCUSDT: '34,822',
      exchangeRatePrice: '1270.5',
    },
    {
      id: 1,
      curKimp: '3.18',
      upbitBTC: '45,654,000',
      binanceBTCKRW: '44,071,880',
      binanceBTCUSDT: '34,757',
      exchangeRatePrice: '1268.0',
    },
  ]
  const [fakeCoinData, setFakeCoinData] = useState(data[0])

  const onRefresh = () => {
    const id = fakeCoinData.id === 0 ? 1 : 0
    setFakeCoinData(data[id])
  }

  return (
    <CurrentPriceWrapper>
      <FakeDataIntroAlert>
        이 페이지는 DY2BIT 김프 예약 매매의 미리보기 입니다. <br />
        소개 페이지의 데이터는 모두 가짜 데이터 입니다. <br />이 페이지에서는 값을 입력 해도 실제 예약으로 이어지지
        않으니 테스트가 가능합니다.
      </FakeDataIntroAlert>
      <Title>DY2BIT KimpTrade</Title>
      <CurrentPriceContainer>
        <CurrentPriceFont>현재 김프: {fakeCoinData.curKimp}%</CurrentPriceFont>
      </CurrentPriceContainer>
      <CurrentPriceContainer>
        <CurrentPriceFont>업비트 BTC: {fakeCoinData.upbitBTC}원</CurrentPriceFont>
      </CurrentPriceContainer>
      <CurrentPriceContainer>
        <CurrentPriceFont>
          바이낸스 BTC: {fakeCoinData.binanceBTCKRW}원, {fakeCoinData.binanceBTCUSDT}달러
        </CurrentPriceFont>
      </CurrentPriceContainer>
      <LastCurrentPriceContainer>
        <CurrentPriceFont>환율: {fakeCoinData.exchangeRatePrice}원</CurrentPriceFont>
      </LastCurrentPriceContainer>
      <RefreshContainer onClick={onRefresh}>
        <p>새로고침</p>
        <RefreshIcon />
      </RefreshContainer>
    </CurrentPriceWrapper>
  )
}

const FakeDataIntroAlert = styled.div`
  color: red;
  width: 100%;
  text-align: center;
  font-size: 10px;
`

const CurrentPriceWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Title = styled.p`
  text-align: center;
  margin-top: 5px;
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
