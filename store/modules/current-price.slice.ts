import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { CurrentCoinPricesResult } from '../../pages/types/types'
import { RootState } from '../store'

// 초기 상태 타입

// 액션 Payload 타입

// 초기 상태
const initialState = (): CurrentCoinPricesResult => {
  return {
    kimpPer: 0,
    upbitPrice: 0,
    binancePrice: 0,
    exchangeRatePrice: 0,
  }
}

// 리듀서 슬라이스
const currentCoinPricesSlice = createSlice({
  name: 'CurrentCoinPrices',
  initialState,
  reducers: {
    updateCurrentCoinPrices: (state, action: PayloadAction<CurrentCoinPricesResult>) => {
      state.kimpPer = action.payload.kimpPer
      state.upbitPrice = action.payload.upbitPrice
      state.binancePrice = action.payload.binancePrice
      state.exchangeRatePrice = action.payload.exchangeRatePrice
    },
  },
})

const state = (state: RootState): CurrentCoinPricesResult => state.currentCoinPrices

// action creator
export const currentCoinPricesActions = currentCoinPricesSlice.actions

// selector
export const selectKimpPerState = createSelector(state, state => state.kimpPer)
export const selectUpbitPriceState = createSelector(state, state => state.upbitPrice)
export const selectBinancePriceState = createSelector(state, state => state.binancePrice)
export const selectExchangeRatePriceState = createSelector(state, state => state.exchangeRatePrice)

// reducer
export const currentCoinPricesReducer = currentCoinPricesSlice.reducer
