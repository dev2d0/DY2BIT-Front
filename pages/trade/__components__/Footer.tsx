import type { FC } from 'react'
import styled from '@emotion/styled'
import GithubIcon from '@mui/icons-material/Github'
import LinkedinIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

export const Footer: FC = () => {
  const openUrl = (type: string) => {
    switch (type) {
      case 'github':
        window.open('https://github.com/dev2d0')
        break
      case 'linkedin':
        window.open('www.linkedin.com/in/이동영-dev2d0')
        break
      case 'blog':
        window.open('https://movezero.tistory.com/')
        break
      default:
        window.open('https://github.com/dev2d0')
        break
    }
  }

  return (
    <FooterWrapper>
      <FooterTitle>Dy2Bit</FooterTitle>
      <Description>
        Dev2d0의 김프매매 어플리케이션 입니다.
        <br /> 더 자세한 소식은 아래에서 확인해주세요.
      </Description>
      <IconWrapper>
        <a href="https://github.com/dev2d0" target="_blank" rel="noreferrer">
          <GithubIcon /> <IconText>Github</IconText>
        </a>
      </IconWrapper>
      <IconWrapper>
        <a href="https://www.linkedin.com/in/%EC%9D%B4%EB%8F%99%EC%98%81-dev2d0/" target="_blank" rel="noreferrer">
          <LinkedinIcon /> <IconText>LinkedIn</IconText>
        </a>
      </IconWrapper>
      <br />
      <IconWrapper>
        <a href="https://movezero.tistory.com/" target="_blank" rel="noreferrer">
          <LibraryBooksIcon /> <IconText>Blog</IconText>
        </a>
      </IconWrapper>
      <IconWrapper>
        <a href="mailto:dev2dy@gmail.com" target="_blank" rel="noreferrer">
          <EmailIcon />
          <IconText>Email</IconText>
        </a>
      </IconWrapper>
      <Copyright>© {new Date().getFullYear()} Copyright dev2d0 all rights reserved.</Copyright>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const FooterTitle = styled.div`
  width: 100%;
  height: 100%;
  font-weight: bold;
  padding: 30px 0px 10px 0px;
  border-bottom: 1px solid #f9f9f9;
`

const Copyright = styled.div`
  margin-top: 25px;
  font-size: 12px;
`

const Description = styled.div`
  font-size: 12px;
  padding: 10px 0px 10px 0px;
`

const IconWrapper = styled.div`
  padding: 3px 0px 3px 0px;
  font-size: 12px;
  display: inline-flex;
  width: 25%;
  padding: 5px 0px 5px 0px;
  vertical-align: middle;
`

const IconText = styled.span`
  display: inline-block;
  padding: 5px;
  font-size: 11px;
`
