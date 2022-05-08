import React from 'react'
import styled from '@emotion/styled'
import PageView from '../layout/__components__/PageView'
import Footer from '../layout/__components__/Footer'
import IntroCurrentCoinPrices from './__components__/IntroCurrentCoinPrices'
import IntroReservationOrderList from './__components__/IntroReservationOrderList'
import IntroUserAccountList from './__components__/IntroUserAccountList'
import IntroReservationOrderForm from './__components__/IntroReservationOrderForm'

export default function Introduce() {
  return (
    <PageView>
      <MainBackgroundWrapper>
        <IntroCurrentCoinPrices />
        <IntroReservationOrderForm />
        <IntroUserAccountList />
        <IntroReservationOrderList />
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
