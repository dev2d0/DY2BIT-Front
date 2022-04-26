import type { FC } from 'react'
import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, css } from '@mui/material'
import { apiSlice } from '../../api/api.slice'
import { CreateReservationOrderParams } from '../../types/types'

const createReservationOrderDataSchema = yup
  .object({
    targetKimpRate: yup
      .number()
      .typeError('-5이상 10이하의 숫자를 입력해주세요.')
      .min(-5, '-5이상의 값을 입력해주세요.')
      .max(10, '10 이하의 값을 입력해주새요.')
      .required('목표 김프가 설정은 필수 값입니다.'),
    quantity: yup
      .number()
      .typeError('0.001이상 1이하의 숫자를 입력해주세요.')
      .min(0.001, '0.001이상의 값을 입력해주세요.')
      .max(1, '1 이하의 값을 입력해주새요.')
      .required('코인 주문 수량은 필수 값입니다.'),
    isBuy: yup.boolean().required('매수 매도 여부는 필수 값입니다.'),
  })
  .required()

export const ReservationOrderForm: FC = () => {
  const [isBuy, setIsBuy] = useState<boolean | null>()
  const [getReservationOrderListTrigger, getReservationOrderListResult] = apiSlice.useLazyGetReservationOrderListQuery()
  const [createReservationOrderTrigger, createReservationOrderResult] = apiSlice.useLazyCreateReservationOrderQuery()
  const resolver = yupResolver(createReservationOrderDataSchema)
  const { register, setValue, getValues, handleSubmit, formState, reset } = useForm<CreateReservationOrderParams>({
    resolver,
  })
  const { errors } = formState

  const onIsBuyChange = (isBuy: boolean) => {
    setIsBuy(isBuy)
  }

  const reserveTrade = () => {
    if (
      !confirm(
        `${getValues('targetKimpRate')}%, ${getValues('quantity')}BTC, ${isBuy ? '매수' : '매도'}주문을 하시겠습니까?`
      )
    ) {
      return
    }

    createReservationOrderTrigger({
      targetKimpRate: getValues('targetKimpRate'),
      quantity: getValues('quantity'),
      isBuy: isBuy ?? false,
    })
    resetDate()
  }

  const resetDate = () => {
    reset({
      targetKimpRate: null,
      quantity: null,
      isBuy: null,
    })
    setIsBuy(null)
  }

  useEffect(() => {
    getReservationOrderListTrigger({})
  }, [createReservationOrderResult])

  return (
    <MainWrapper>
      <Label>목표 김프가(%)</Label>
      <Input
        type="number"
        {...register('targetKimpRate')}
        placeholder="목표 김프가를 입력해주세요. (ex 2.8 %)"
        step="0.1"
      />
      {errors.targetKimpRate && <ErrorMessageStyled>{errors.targetKimpRate?.message}</ErrorMessageStyled>}
      <Label>주문 수량(BTC)</Label>
      <Input type="number" {...register('quantity')} placeholder="주문 수량을 입력해주세요. (ex 1.5 BTC)" step="0.1" />
      {errors.quantity && <ErrorMessageStyled>{errors.quantity?.message}</ErrorMessageStyled>}
      <SelectPositionButton
        type="button"
        marginRight={3}
        backgroundColor={`${isBuy == null ? 'inherit' : `${isBuy ? 'red' : 'inherit'}`}`}
        onClick={() => {
          setValue('isBuy', true, {
            shouldValidate: true,
          })
          onIsBuyChange(true)
        }}
      >
        매수
      </SelectPositionButton>
      <SelectPositionButton
        type="button"
        marginLeft={3}
        backgroundColor={`${isBuy == null ? 'inherit' : `${!isBuy ? 'blue' : 'inherit'}`}`}
        onClick={() => {
          setValue('isBuy', false, {
            shouldValidate: true,
          })
          onIsBuyChange(false)
        }}
      >
        매도
      </SelectPositionButton>
      {errors.isBuy && <ErrorMessageStyled>{errors.isBuy?.message}</ErrorMessageStyled>}
      <SubmitButton onClick={handleSubmit(reserveTrade)}>예약 매매</SubmitButton>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Input = styled.input`
  border: 1px solid #7282a6;
  width: 100%;
  height: 60px;
  line-height: 26px;
  background-color: inherit;
  color: #f9f9f9;
  margin-top: 10px;
  padding-left: 10px;
  font-size: 15px;
  input::placeholder {
    color: red;
    font-style: italic;
  }
`

const Label = styled.p`
  font-size: 14px;
  line-height: 27px;
  font-weight: bold;
  margin: 0;
  padding-top: 20px;
`

const SubmitButton = styled(Button)`
  background: #8cc9fc;
  color: #19254c;
  width: 100%;
  height: 60px;
  border-radius: 60px;
  font-size: 15px;
  font-weight: bold;
  margin-top: 20px;
  &:hover {
    background: #8cc9fc;
    opacity: 70%;
  }
`

const SelectPositionButton = styled.button<{
  marginLeft?: number
  marginRight?: number
  backgroundColor: string
}>`
  ${({ marginLeft, marginRight, backgroundColor }) => css`
    border: 1px solid #7282a6;
    color: #f9f9f9;
    background-color: ${backgroundColor};
    width: calc(50% - ${marginRight ?? 0}px - ${marginLeft ?? 0}px);
    height: 60px;
    font-size: 15px;
    font-weight: bold;
    margin: 20px ${marginRight ?? 0}px 0px ${marginLeft ?? 0}px;
    &:hover {
      opacity: 70%;
    }
  `}
`

export const ErrorMessageStyled = styled.span`
  display: block;
  color: red;
  font-size: 12px;
  left: 0;
`
