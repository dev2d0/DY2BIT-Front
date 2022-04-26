import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { GetServerSidePropsContext, GetStaticPropsContext, NextPageContext } from 'next'
import { AppContext } from 'next/app'
import thunk from 'redux-thunk'
import rootReducer, { CombinedReducerState } from './root.reducer'
import { apiSlice } from '../pages/api/api.slice'

export type MakeStoreContext = NextPageContext | AppContext | GetStaticPropsContext | GetServerSidePropsContext

export const makeStore = (context: MakeStoreContext) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => {
      return [...getDefaultMiddleware({ thunk: true, serializableCheck: false }), apiSlice.middleware]
    },
  })
  return store
}

export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV !== 'production' })

export type RootState = CombinedReducerState
