import { FC } from 'react'
import styled from '@emotion/styled'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { css } from '@emotion/react'

interface IModalView {
  title: any
  width: string
  onSave: any
  onClose: any
  onDelete: any
  children?: React.ReactNode
}

export const ModalView: FC<IModalView> = props => {
  const onSave = () => {
    props.onSave()
  }

  const onClose = () => {
    props.onClose()
  }

  const onDelete = () => {
    props.onDelete()
  }

  return (
    <ModalComponent onClose={onClose} open>
      <HeaderComponent>
        <HeaderTitleComponent>{props.title()}</HeaderTitleComponent>
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </HeaderComponent>
      <BodyComponent width={props.width}>{props.children}</BodyComponent>
      <FooterComponent>
        <SaveButtonComponent onClick={onSave}>주문 수정</SaveButtonComponent>
        <DeleteButtonComponent onClick={onDelete}>주문 삭제</DeleteButtonComponent>
      </FooterComponent>
    </ModalComponent>
  )
}

export const ModalComponent = styled(Dialog)`
  .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
    background-color: #090e1d;
    color: #bbbecb;
    border: 1px solid #333d56;
  }

  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
`

export const HeaderComponent = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgray;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px;
`

export const HeaderTitleComponent = styled.div`
  display: flex;
  align-items: center;
`

export const BodyComponent = styled(DialogContent)<{ width: any }>`
  ${({ width }) => css`
    overflow: auto;
    padding: 0px 20px;
    height: 100%;
    width: ${width};
    max-width: 100%;
  `}
`

export const FooterComponent = styled(DialogActions)`
  display: flex;
  justify-content: space-between;
  padding: 0px;
  margin: 10px 20px;
`

export const SaveButtonComponent = styled(Button)`
  background: #8cc9fc;
  color: #19254c;
  width: 100%;
  height: 50px;
  border-radius: 60px;
  font-size: 15px;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background: #8cc9fc;
    opacity: 70%;
  }
`

export const DeleteButtonComponent = styled(Button)`
  background: inherit;
  color: #7282a6;
  width: 100%;
  height: 50px;
  border-radius: 60px;
  border: 1.5px solid #7282a6;
  font-size: 15px;
  font-weight: normal;
  margin-top: 20px;

  &:hover {
    opacity: 70%;
  }
`
