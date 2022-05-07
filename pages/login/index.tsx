import React from 'react'
import styled from '@emotion/styled'
import Login from './__components__/Login'
import PageView from '../layout/__components__/PageView'

export default function LoginPage() {
  return (
    <PageView>
      <MainBackgroundWrapper>
        <Login />
      </MainBackgroundWrapper>
    </PageView>
  )
}

const MainBackgroundWrapper = styled.div`
  padding: 0 10px;
  background: linear-gradient(180deg, #000 0%, #19254c 67.59%);
  color: #f9f9f9;
`
