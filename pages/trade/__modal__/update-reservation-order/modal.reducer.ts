import { combineReducers } from '@reduxjs/toolkit'
import { reservationOrderUpdateModalReducer } from '../__slices__/reservation-order-update.modal.slice'

// __slices__ 아래 slice 들을 모아 root reducer 에 연결하는 것이 목적인 reducer
export const modalReducer = combineReducers({
  reservationOrderUpdateModal: reservationOrderUpdateModalReducer,
})
