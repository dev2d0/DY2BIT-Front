import styled from '@emotion/styled'
import { ReservationOrderForm } from './__components__/ReservationOrderForm'
import { ReservationOrderList } from './__components__/ReservationOrderList'
import { Footer } from './__components__/Footer'
import { CurrentCoinPrices } from './__components__/CurrentCoinPrices'
import { Header } from './__components__/Header'
import { UserAccountList } from './__components__/UserAccountList'

export default function Trade() {
  return (
    <BackgroundWrapper>
      <PageWrapper>
        <MainBackgroundWrapper>
          <Header />
          <CurrentCoinPrices />
          <ReservationOrderForm />
          <UserAccountList />
          <ReservationOrderList />
          <Footer />
        </MainBackgroundWrapper>
      </PageWrapper>
    </BackgroundWrapper>
  )
}

const BackgroundWrapper = styled.div`
  background: linear-gradient(180deg, #000 0%, #19254c 100%);
  padding: 0px 0px 30px 0px;
`

const PageWrapper = styled.div`
  max-width: 440px;
  margin: 0 auto;
  color: #f9f9f9;
`

const MainBackgroundWrapper = styled.div`
  padding: 0 24px;
  background: linear-gradient(180deg, #000 0%, #19254c 67.59%);
`
