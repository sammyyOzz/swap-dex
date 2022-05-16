import { createSlice } from '@reduxjs/toolkit'
import { asyncRequest } from '../services'

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

/**
 * !pass in correct id for endpoint below
 */
export const getAccountInfo = asyncRequest(`${namespace}/getAccountInfo`, '/info/:id ', 'get')


const swiftSlice = createSlice({
    name: 'swift',
    initialState: {
      swift: null,
    },
    // reducers: {
      
    // },

    extraReducers: {

    }
})
  

export default swiftSlice.reducer