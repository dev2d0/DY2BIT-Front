import React from 'react'
import styled from '@emotion/styled'
import { PageView } from '../layout/__components__/PageView'
import History from './__components__/History'

export default function HistoryPage() {
  return (
    <PageView>
      <MainBackgroundWrapper>
        <History />
      </MainBackgroundWrapper>
    </PageView>
  )
}

const MainBackgroundWrapper = styled.div`
  padding: 0 10px;
  background: linear-gradient(180deg, #000 0%, #19254c 67.59%);
  color: #f9f9f9;
`
