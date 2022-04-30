import type { FC } from 'react'
import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import MenuIcon from '@mui/icons-material/Menu'
import HistoryIcon from '@mui/icons-material/History'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import LoginIcon from '@mui/icons-material/Login'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'

export const Header: FC = () => {
  const router = useRouter()
  const [toggle, setToggle] = useState(false)

  const showMenu = () => {
    setToggle(!toggle)
  }

  const onClickMenu = (path: string) => {
    router.push(path)
  }

  const menuList = () => (
    <Box sx={{ width: 250, height: '100%' }}>
      <List>
        <ListItem button onClick={() => onClickMenu('trade')}>
          <ListItemIcon>
            <CurrencyExchangeIcon />
          </ListItemIcon>
          <ListItemText primary="Trade" />
        </ListItem>
        <ListItem button onClick={() => onClickMenu('history')}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button onClick={() => onClickMenu('introduce')}>
          <ListItemIcon>
            <AccessibilityNewIcon />
          </ListItemIcon>
          <ListItemText primary="Introduce" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => onClickMenu('login')}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button onClick={showMenu}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
      </List>
      <Copyright>© {new Date().getFullYear()} Copyright dev2d0 all rights reserved.</Copyright>
    </Box>
  )

  return (
    <>
      <Drawer anchor="left" open={toggle} onClose={showMenu}>
        {menuList()}
      </Drawer>
      <HeaderWrapper>
        <MenuIconStyled onClick={showMenu} fontSize="large" />
      </HeaderWrapper>
    </>
  )
}

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 5px;
`

const Copyright = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  margin-top: 25px;
  font-size: 11px;
`

const MenuIconStyled = styled(MenuIcon)`
  color: #f9f9f9;
`
