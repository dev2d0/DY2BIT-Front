import { css, Global } from '@emotion/react'

export function GlobalFont() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'Spoqa Han Sans';
          font-weight: 700;
          font-display: block;
          src: local('Spoqa Han Sans Bold'),
            url('https://static.tadatada.com/resources/fonts/SpoqaHanSansBold.woff2') format('woff2'),
            url('https://static.tadatada.com/resources/fonts/SpoqaHanSansBold.woff') format('woff'),
            url('https://static.tadatada.com/resources/fonts/SpoqaHanSansBold.ttf') format('truetype');
        }

        @font-face {
          font-family: 'Spoqa Han Sans';
          font-weight: 400;
          font-display: block;
          src: local('Spoqa Han Sans Regular'),
            url('https://static.tadatada.com/resources/fonts/SpoqaHanSansRegular.woff2') format('woff2'),
            url('https://static.tadatada.com/resources/fonts/SpoqaHanSansRegular.woff') format('woff'),
            url('https://static.tadatada.com/resources/fonts/SpoqaHanSansRegular.ttf') format('truetype');
        }
      `}
    />
  )
}
