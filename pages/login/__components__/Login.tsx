import React, { ChangeEvent, useRef, useState, VoidFunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useEffectOnce } from 'react-use'
import { useRouter } from 'next/router'
import { Button, TextField } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { apiSlice } from '../../api/api.slice'
import { pageConfig } from '../../../lib/router/config'

const loginSchema = yup
  .object({
    email: yup.string().required('아이디는 필수 값입니다.'),
    password: yup.string().required('비밀번호는 필수 값입니다.'),
  })
  .required()

export const Login: VoidFunctionComponent = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [authenticate] = apiSlice.useAuthenticateMutation()
  const resolver = yupResolver(loginSchema)
  const { register, handleSubmit, formState, reset } = useForm<any>({
    resolver,
  })
  const { errors } = formState
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  useEffectOnce(() => {
    inputRef.current?.focus()
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setUserInfo(prevState => ({
      ...prevState,
      [id]: value,
    }))
  }

  const onSubmit = () => {
    reset(userInfo)
    handleSubmit(handleSubmitClick)()
  }

  const handleSubmitClick = async () => {
    try {
      await authenticate({ email: userInfo.email, password: userInfo.password }).unwrap()
      await router.push(pageConfig.introduce.props.build())
    } catch (e: any) {
      alert(`로그인 에러${e.data?.message}`)
    }
  }

  return (
    <BackgroundLayout>
      <LoginForm>
        <HeaderH1>
          <SystemTitleDiv>Dy2Bit Kimp Trading System</SystemTitleDiv>
        </HeaderH1>
        <div>
          <InputTextField
            {...register('email', { required: true })}
            label="아이디"
            variant="standard"
            type="email"
            id="email"
            value={userInfo.email}
            onChange={handleChange}
            ref={inputRef}
          />
          {errors.email && <ErrorMessageStyled>{errors.email?.message}</ErrorMessageStyled>}
          <InputTextField
            {...register('password', { required: true })}
            label="비밀번호"
            variant="standard"
            type="password"
            id="password"
            value={userInfo.password}
            onChange={handleChange}
            ref={inputRef}
          />
          {errors.password && <ErrorMessageStyled>{errors.password?.message}</ErrorMessageStyled>}
        </div>
        <ButtonArea>
          <LoginButton onClick={onSubmit}>로그인</LoginButton>
        </ButtonArea>
      </LoginForm>
    </BackgroundLayout>
  )
}

const BackgroundLayout = styled.div`
  width: 100%;
  background-color: #f4f4f4;
`

const LoginForm = styled.form`
  width: 100vw;
  max-width: 440px;
  padding: 40px 30px 30px 30px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.5);
`

const HeaderH1 = styled.h1`
  font-size: 28px;
  margin-bottom: 40px;
  text-align: center;
`

const SystemTitleDiv = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #19254c;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-top: 4px;
`

const InputTextField = styled(TextField)`
  width: 100%;
  font-size: 24px;
  margin-top: 20px;
`

const LoginButton = styled(Button)`
  color: white;
  background-color: #19254c;
  font-weight: 500;
  width: 100%;
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  &:hover {
    background-color: #19254c;
    opacity: 70%;
  }
`

const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

export const ErrorMessageStyled = styled.span`
  display: block;
  color: red;
  font-size: 12px;
  left: 0;
`
