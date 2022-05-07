import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'
import Header from './Header'

interface IPageView {
  children?: ReactNode
}

const PageView: FC<IPageView> = props => {
  return (
    <BackgroundWrapper>
      <PageWrapper>
        <Header />
        <div>{props.children}</div>
      </PageWrapper>
    </BackgroundWrapper>
  )
}

export default PageView

const BackgroundWrapper = styled.div`
  background: linear-gradient(180deg, #000 0%, #19254c 100%);
  padding: 0px 0px 30px 0px;
  min-height: 100vh;
`

const PageWrapper = styled.div`
  max-width: 440px;
  margin: 0 auto;
`
