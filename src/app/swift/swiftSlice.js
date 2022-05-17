import { createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../../constants/httpStatus'
import { asyncRequest } from '../services'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import hbar from '../../assets/icons/hbar.jpg'


const namespace = 'swift'

export const getLiquidityPool = asyncRequest(`${namespace}/getLiquidityPool`, '/LPs', 'get')
export const createAccount = asyncRequest(`${namespace}/createAccount`, '/createAcct', 'get')
export const importWithMnemonic = asyncRequest(`${namespace}/importWithMnemonic`, '/importM', 'post')
export const importWithPrivateKey = asyncRequest(`${namespace}/importWithPrivateKey`, '/importK', 'post')
export const addLiquidity = asyncRequest(`${namespace}/addLiquidity`, '/addliquidity', 'post')
export const removeLiquidity = asyncRequest(`${namespace}/removeLiquidity`, '/removeliquidity', 'post')
export const hbarToToken = asyncRequest(`${namespace}/hbarToToken`, '/hbartotoken', 'post')
export const tokenToHbar = asyncRequest(`${namespace}/tokenToHbar`, '/tokentohbar', 'post')
export const tokenToToken = asyncRequest(`${namespace}/tokenToToken`, '/tokentotoken', 'post')
export const getTokenAmount = asyncRequest(`${namespace}/getTokenAmount`, '/gettoken', 'post')
export const getHbarAmount = asyncRequest(`${namespace}/getHbarAmount`, '/gethbar', 'post')
export const createPair = asyncRequest(`${namespace}/createPair`, '/createpair', 'post')

/**
 * !pass in correct id for endpoint below
 */
export const getAccountInfo = asyncRequest(`${namespace}/getAccountInfo`, '/info', 'get')

const DEFAULT = { status: null, data: null, error: null }

const swiftSlice = createSlice({
    name: 'swift',
    initialState: {
      swiftAccount: null,
      holdings: { ...DEFAULT, data: [{ TokenId: 0, Pair: 'Hbar', name: 'Algorand', unit: 'Algo', image: hbar }] },
      accountInfo: DEFAULT
    },
    reducers: {
        setAccountDatails(state) {
            if (localStorage.getItem('swift_dex')) {
                state.swiftAccount = JSON.parse(localStorage.getItem('swift_dex'))
            }
        },
        saveAccountDetails(state, { payload }) {
            state.swiftAccount = payload
        }
    },

    extraReducers: {
        [getLiquidityPool.pending](state) {
            state.holdings.status = HTTP_STATUS.PENDING
        },
        [getLiquidityPool.fulfilled](state, { payload }) {
            state.holdings.status = HTTP_STATUS.FULFILLED
            const defaultHoldings = state.holdings.data
            state.holdings.data = [...defaultHoldings, ...payload.Pools]
        },
        [getLiquidityPool.rejected](state, { payload }) {
            state.holdings.status = HTTP_STATUS.REJECTED
            state.holdings.error = payload
        },
        [getAccountInfo.pending](state) {
            state.accountInfo.status = HTTP_STATUS.PENDING
        },
        [getAccountInfo.fulfilled](state, { payload }) {
            state.accountInfo.status = HTTP_STATUS.FULFILLED
            state.accountInfo.data = payload
        },
        [getAccountInfo.rejected](state, { payload }) {
            state.accountInfo.status = HTTP_STATUS.REJECTED
            state.accountInfo.error = payload
        }
    }
})

export const { setAccountDatails, saveAccountDetails } = swiftSlice.actions
  

export default swiftSlice.reducer