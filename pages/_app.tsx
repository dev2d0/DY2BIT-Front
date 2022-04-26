import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store'
import { GlobalFont } from '../styles/GlobalFont'
import { MaterialCustomStyle } from '../styles/MaterialCustomStyle'

function Dy2Bit({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalFont />
      <MaterialCustomStyle />
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(Dy2Bit)
