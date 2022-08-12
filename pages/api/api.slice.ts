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

// const baseUrl = 'https://dy2bit.ga/'
const baseUrl = 'http://localhost:8080/'

const POST_TYPE = 'POST'
const GET_TYPE = 'GET'
const PUT_TYPE = 'PUT'
const DELETE_TYPE = 'DELETE'

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
            method: POST_TYPE,
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
            method: POST_TYPE,
          }
        },
        transformResponse: (response: any, meta: any) => {
          if (meta?.response?.ok) return true

          return false
        },
      }),
      getReservationOrderList: builder.query<getReservationOrderListResult[], void>({
        query() {
          return {
            method: GET_TYPE,
            url: `api/reservation-orders/list`,
          }
        },
      }),
      getCurrentCoinPrices: builder.query<CurrentCoinPricesResult, void>({
        query() {
          return {
            method: GET_TYPE,
            url: `api/reservation-orders/current-coin-prices`,
          }
        },
        transformResponse: (response: CurrentCoinPricesResult) => response,
      }),
      getUserAccount: builder.query<UserAccountResults, void>({
        query() {
          return {
            method: GET_TYPE,
            url: `api/reservation-orders/user-account`,
          }
        },
        transformResponse: (response: UserAccountResults) => response,
      }),
      createReservationOrder: builder.query<string, CreateReservationOrderParams>({
        query(body) {
          return {
            body,
            method: POST_TYPE,
            url: `api/reservation-orders`,
          }
        },
        transformResponse({ result }, meta) {
          return result
        },
      }),
      updateReservationOrder: builder.query<string, UpdateReservationOrderParams>({
        query: body => ({
          body,
          method: PUT_TYPE,
          url: `api/reservation-orders`,
        }),
        transformResponse({ result }, meta) {
          return result
        },
      }),
      deleteReservationOrder: builder.query<string, DeleteReservationOrderParams>({
        query: body => ({
          body,
          method: DELETE_TYPE,
          url: `api/reservation-orders`,
        }),
        transformResponse({ result }, meta) {
          return result
        },
      }),
      getHistoryReservationOrderList: builder.query<getHistoryReservationOrderListResult[], void>({
        query() {
          return {
            method: GET_TYPE,
            url: `api/reservation-orders/histories`,
          }
        },
        transformResponse: (response: any) => response,
      }),
      deleteHistoryReservationOrder: builder.query<boolean, deleteHistoryReservationOrderParams>({
        query(body) {
          return {
            body,
            method: DELETE_TYPE,
            url: `api/reservation-orders/histories`,
          }
        },
        transformResponse({ result }, meta) {
          return result
        },
      }),
      getDailyKimpList: builder.query<getDailyKimpListResult[], void>({
        query() {
          return {
            method: GET_TYPE,
            url: `api/reservation-orders/daily-kimp-list`,
          }
        },
        transformResponse: (response: any) => response,
      }),
      getErrorReport: builder.query<ErrorReportResult, void>({
        query() {
          return {
            method: GET_TYPE,
            url: `api/reservation-orders/error-report`,
          }
        },
        transformResponse: (response: ErrorReportResult) => response,
      }),
      confirmErrorReport: builder.query<ErrorReportResult, any>({
        query(body) {
          return {
            body,
            method: POST_TYPE,
            url: `api/reservation-orders/confirm-error-report`,
          }
        },
        transformResponse: (response: ErrorReportResult) => response,
      }),
    }
  },
})
