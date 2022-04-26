import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../../../store/store'

interface IState {
  updateModalIsShow: boolean
}

const initialState = (): IState => {
  return {
    updateModalIsShow: false,
  }
}

const slice = createSlice({
  initialState: initialState(),
  name: 'reservationOrderUpdateModal',
  reducers: {
    updateModalShow: state => {
      state.updateModalIsShow = true
    },
    updateModalHide: state => {
      state.updateModalIsShow = false
    },
  },
})

const state = (state: RootState): IState => state.modal.reservationOrderUpdateModal

// action creator
export const reservationOrderUpdateModalActions = slice.actions

// selector
export const selectUpdateModalState = createSelector(state, state => state.updateModalIsShow)

// reducer
export const reservationOrderUpdateModalReducer = slice.reducer
