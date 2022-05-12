import Cookies from 'js-cookie'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import router from 'next/router'
import { ACCESS_TOKEN_KEY } from './contants'
import {
  CreateReservationOrderParams,
  CurrentCoinPricesResult,
  DeleteReservationOrderParams,
  getHistoryReservationOrderListResult,
  getDailyKimpListResult,
  getReservationOrderListResult,
  UpdateReservationOrderParams,
  UserAccountResults,
  UserAuthenticateParams,
  UserAuthenticateResult,
  deleteHistoryReservationOrderParams,
  ErrorReportResult,
} from '../../lib/types/types'
import { pageConfig } from '../../lib/router/config'

const baseUrl = 'https://dy2bit-1603609200.ap-northeast-2.elb.amazonaws.com/'

const METHOD_TYPE = 'POST'

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY)

    const additionalHeaders = {
      accept: 'application/json',
      'content-type': 'application/json',
      ...(accessToken !== undefined && { Authorization: `${accessToken}` }),
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

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    Cookies.remove(ACCESS_TOKEN_KEY)
    await router.push(pageConfig.login.props.build())
  }
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
            url: `/login`,
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
      getReservationOrderList: builder.query<getReservationOrderListResult[], any>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `api/reservationOrders/getReservationOrderList`,
          }
        },
        transformResponse: (response: any) => response,
      }),
      getCurrentCoinPrices: builder.query<CurrentCoinPricesResult, any>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `api/reservationOrders/currentCoinPrices`,
          }
        },
        transformResponse: (response: CurrentCoinPricesResult) => response,
      }),
      getUserAccount: builder.query<UserAccountResults, any>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `api/reservationOrders/getUserAccount`,
          }
        },
        transformResponse: (response: UserAccountResults) => response,
      }),
      createReservationOrder: builder.query<string, CreateReservationOrderParams>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `api/reservationOrders/createReservationOrder`,
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
          url: `api/reservationOrders/updateReservationOrder`,
        }),
        transformResponse({ result }, meta) {
          return result
        },
      }),
      deleteReservationOrder: builder.query<string, DeleteReservationOrderParams>({
        query: body => ({
          body,
          method: METHOD_TYPE,
          url: `api/reservationOrders/deleteReservationOrder`,
        }),
        transformResponse({ result }, meta) {
          return result
        },
      }),
      getHistoryReservationOrderList: builder.query<getHistoryReservationOrderListResult[], any>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `api/reservationOrders/getHistoryReservationOrderList`,
          }
        },
        transformResponse: (response: any) => response,
      }),
      deleteHistoryReservationOrder: builder.query<boolean, deleteHistoryReservationOrderParams>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `api/reservationOrders/deleteHistoryReservationOrder`,
          }
        },
        transformResponse({ result }, meta) {
          return result
        },
      }),
      getDailyKimpList: builder.query<getDailyKimpListResult[], any>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `api/reservationOrders/getDailyKimpList`,
          }
        },
        transformResponse: (response: any) => response,
      }),
      getErrorReport: builder.query<ErrorReportResult, any>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `api/reservationOrders/getErrorReport`,
          }
        },
        transformResponse: (response: ErrorReportResult) => response,
      }),
      confirmErrorReport: builder.query<ErrorReportResult, any>({
        query(body) {
          return {
            body,
            method: METHOD_TYPE,
            url: `api/reservationOrders/confirmErrorReport`,
          }
        },
        transformResponse: (response: ErrorReportResult) => response,
      }),
    }
  },
})
