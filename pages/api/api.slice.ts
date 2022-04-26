import Cookies from 'js-cookie'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import router from 'next/router'
import { ACCESS_TOKEN_KEY } from './contants'
import { pageConfig } from '../../lib/router/config'
import { getRuntimeConfig } from '../../lib/utils/runtimeConfig'
import {
  CreateReservationOrderParams,
  CurrentCoinPricesResult,
  DeleteReservationOrderParams,
  getReservationOrderListResult,
  UpdateReservationOrderParams,
  UserAccountResults,
  UserAuthenticateParams,
  UserAuthenticateResult,
} from '../types/types'

const baseUrl = getRuntimeConfig().HOST

const METHOD_TYPE = 'POST'

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY)

    const additionalHeaders = {
      accept: 'application/json',
      'content-type': 'application/json',
      ...(accessToken !== undefined && { Authorization: `Bearer ${accessToken}` }),
    }

    Object.entries(additionalHeaders).forEach(([key, value]) => {
      if (value !== undefined) {
        headers.set(key, value)
      }
    })

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions)

  // if (result.error && result.error.status === 401) {
  //   Cookies.remove(ACCESS_TOKEN_KEY)
  //   router.push(pageConfig.login.props.build())
  // }
  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 0,
  endpoints(builder) {
    return {
      authenticate: builder.mutation<UserAuthenticateResult, UserAuthenticateParams>({
        query(body) {
          return {
            body,
            url: `/logIn`,
            method: METHOD_TYPE,
          }
        },
        transformResponse(response: any, meta) {
          if (response.token) {
            Cookies.set(ACCESS_TOKEN_KEY, response.token)
          }

          return response
        },
      }),
      logout: builder.mutation<boolean, void>({
        query(body) {
          return {
            body,
            url: `/logout`,
            method: METHOD_TYPE,
          }
        },
        transformResponse: (response: any, meta: any) => {
          if (meta?.response?.ok) return true

          return false
        },
      }),
      getUserStatus: builder.query<any, any>({
        query: body => ({
          method: METHOD_TYPE,
          url: `/u/GetUserStatus`,
        }),
        keepUnusedDataFor: 60,
      }),
      getReservationOrderList: builder.query<getReservationOrderListResult[], any>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `/reservationOrders/getReservationOrderList`,
          }
        },
        transformResponse: (response: any) => response,
      }),
      getCurrentCoinPrices: builder.query<CurrentCoinPricesResult, any>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `/reservationOrders/currentCoinPrices`,
          }
        },
        transformResponse: (response: CurrentCoinPricesResult) => response,
      }),
      getUserAccount: builder.query<UserAccountResults, any>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `/reservationOrders/getUserAccount`,
          }
        },
        transformResponse: (response: UserAccountResults) => response,
      }),
      createReservationOrder: builder.query<string, CreateReservationOrderParams>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `/reservationOrders/createReservationOrder`,
          }
        },
        transformResponse({ result }, meta) {
          return result
        },
      }),
      updateReservationOrder: builder.query<string, UpdateReservationOrderParams>({
        query: body => ({
          body,
          method: METHOD_TYPE,
          url: `/reservationOrders/updateReservationOrder`,
        }),
        transformResponse({ result }, meta) {
          return result
        },
      }),
      deleteReservationOrder: builder.query<string, DeleteReservationOrderParams>({
        query: body => ({
          body,
          method: METHOD_TYPE,
          url: `/reservationOrders/deleteReservationOrder`,
        }),
        transformResponse({ result }, meta) {
          return result
        },
      }),
    }
  },
})
