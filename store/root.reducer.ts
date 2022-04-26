import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from './store'
import { currentCoinPricesReducer } from './modules/current-price.slice'
import { modalReducer } from '../pages/trade/__modal__/update-reservation-order/modal.reducer'
import { apiSlice } from '../pages/api/api.slice'

export const combinedReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  currentCoinPrices: currentCoinPricesReducer,
  modal: modalReducer,
})

export type CombinedReducerState = ReturnType<typeof combinedReducer>

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload }
  }
  return combinedReducer(state, action)
}

export default rootReducer
