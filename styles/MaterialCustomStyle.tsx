import { css, Global } from '@emotion/react'

export function MaterialCustomStyle() {
  return (
    <Global
      styles={css`
        .css-11xur9t-MuiPaper-root-MuiTableContainer-root {
          background-color: inherit !important;
        }
        // 배포 버전
        .css-13xy2my {
          background-color: inherit !important;
        }
      `}
    />
  )
}
