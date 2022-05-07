import styled from '@emotion/styled'
import ReservationOrderForm from './__components__/ReservationOrderForm'
import ReservationOrderList from './__components__/ReservationOrderList'
import Footer from './__components__/Footer'
import CurrentCoinPrices from './__components__/CurrentCoinPrices'
import UserAccountList from './__components__/UserAccountList'
import { PageView } from '../layout/__components__/PageView'

export default function Trade() {
  return (
    <PageView>
      <MainBackgroundWrapper>
        <CurrentCoinPrices />
        <ReservationOrderForm />
        <UserAccountList />
        <ReservationOrderList />
        <Footer />
      </MainBackgroundWrapper>
    </PageView>
  )
}

const MainBackgroundWrapper = styled.div`
  padding: 0 24px;
  background: linear-gradient(180deg, #000 0%, #19254c 67.59%);
  color: #f9f9f9;
`
