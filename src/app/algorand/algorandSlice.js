import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CREATE, IMPORT } from '../../constants/walletStatus';
import axios from '../axios'
import * as actions from './actions';
import algorandLogo from '../../assets/icons/algorandLogo.png'

const namespace = 'algorand'


export const getActiveAlgorandWallet = createAsyncThunk(`${namespace}/getActiveAlgorandWallet`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/algorand/v1/active_wallet/`)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const createAlgorandWallet = createAsyncThunk(`${namespace}/createAlgorandWallet`, async (objData, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axios.post('/algorand/v1/wallet/', objData)
    dispatch(getActiveAlgorandWallet())
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const confirmAlgorandPassphrase = createAsyncThunk(`${namespace}/confirmAlgorandPassphrase`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`/algorand/v1/wallet/${objData.id}/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const getAllAlgorandWallets = createAsyncThunk(`${namespace}/getAllAlgorandWallets`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/algorand/v1/wallet/')
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const createAlgorandClawback = createAsyncThunk(`${namespace}/createAlgorandClawback`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/clawback/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const destroyAlgorand = createAsyncThunk(`${namespace}/destroyAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/destroy/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const freezeAlgorand = createAsyncThunk(`${namespace}/freezeAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/freeze/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const getAlgorandHoldings = createAsyncThunk(`${namespace}/getAlgorandHoldings`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/algorand/v1/holdings/`)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const modifyAlgorand = createAsyncThunk(`${namespace}/modifyAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/algorand/v1/modify/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const algorandOptIn = createAsyncThunk(`${namespace}/algorandOptIn`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/optin/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const algorandOptOut = createAsyncThunk(`${namespace}/algorandOptOut`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/optout/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const getAlgorandSendList = createAsyncThunk(`${namespace}/getAlgorandSendList`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/algorand/v1/send/')
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const sendAlgorand = createAsyncThunk(`${namespace}/sendAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/send/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const getAlgorandSwapValue = createAsyncThunk(`${namespace}/getAlgorandSwapValue`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/algorand/v1/checks/get_swap_value/${objData.from_asset}/${objData.to_asset}/${objData.asset_amount}/`)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const getAlgorandAssetBalance = createAsyncThunk(`${namespace}/getAlgorandAssetBalance`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/algorand/v1/checks/get_asset_balance/${objData}/`)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const swapAlgorand = createAsyncThunk(`${namespace}/swapAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/swap/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const algorandLiquidity = createAsyncThunk(`${namespace}/algorandLiquidity`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/liquidity/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const unfreezeAlgorand = createAsyncThunk(`${namespace}/unfreezeAlgorand`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/unfreeze/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const getAlgorandTransactions = createAsyncThunk(`${namespace}/getAlgorandTransactions`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/algorand/v1/transactions/')
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const checkAlgorandAssetIsValid = createAsyncThunk(`${namespace}/checkAlgorandAssetIsValid`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/checks/valid_asset/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const checkAlgorandAddressIsValid = createAsyncThunk(`${namespace}/checkAlgorandAddressIsValid`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/checks/valid_address/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const checkCanClawbackAlgorandAsset = createAsyncThunk(`${namespace}/checkCanClawbackAlgorandAsset`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/checks/can_clawback/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const checkCanDestroyAlgorandAsset = createAsyncThunk(`${namespace}/checkCanDestroyAlgorandAsset`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/checks/can_destroy/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const createAlgorandAsset = createAsyncThunk(`${namespace}/createAlgorandAsset`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/general_asset/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const getCreatedAssets = createAsyncThunk(`${namespace}/getCreatedAssets`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/algorand/v1/created_assets/')
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const updateActiveWallet = createAsyncThunk(`${namespace}/updateActiveWallet`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch(`/algorand/v1/wallet/${objData.id}/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const removeWallet = createAsyncThunk(`${namespace}/removeWallet`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/algorand/v1/wallet/${objData.id}/`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const setAlgorandNet = createAsyncThunk(`${namespace}/setNet`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/algorand/v1/set_net/', objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const DEFAULT = { status: null, data: null, error: null }

const algorandSlice = createSlice({
  name: 'algorand',
  initialState: {
    createWallet: { status: null, error: null },
    id: null,
    address: "",
    passphrase: "",
    user: null,
    confirmWallet: { status: null, success: null, error: "" },
    activeWallet: DEFAULT,
    allWallets: DEFAULT,
    clawback: DEFAULT,
    destroy: DEFAULT,
    freeze: DEFAULT,
    holdings: { ...DEFAULT, data: [{ id: 0, name: 'Algorand', unit: 'Algo', image: algorandLogo }] },
    modify: DEFAULT,
    optIn: DEFAULT,
    optOut: DEFAULT,
    sendList: DEFAULT,
    send: DEFAULT,
    swapValue: DEFAULT,
    swap: DEFAULT,
    liquidity: DEFAULT,
    unfreeze: DEFAULT,
    transactions: DEFAULT,
    assetIsValid: DEFAULT,
    addressIsValid: DEFAULT,
    canClawbackAsset: DEFAULT,
    canDeleteAsset: DEFAULT,
    createAsset: DEFAULT,
    createdAssets: DEFAULT,
    updateActiveWallet: DEFAULT,
    removeWallet: DEFAULT,
    setNet: DEFAULT,
  },
  reducers: {
    incorrectPassphraseError(state, action) {
      if (action.payload.status === CREATE) {
        state.confirmWallet.error = action.payload.error
      } else if (action.payload.status === IMPORT) {
        state.confirmWallet.error = action.payload.error
      }
    },
    //used to set passphase from browser db
    setAlgorandPassphrase(state, action) {
      state.passphrase = action.payload
    },
    resetSwapValueData(state) {
      state.swapValue = DEFAULT
    },
    clearError(state, { payload }) {
      state[payload].error = null
    }
  },
  extraReducers: { 
    [createAlgorandWallet.pending]: actions.createAlgorandWalletPending,
    [createAlgorandWallet.fulfilled]: actions.createAlgorandWalletFulfilled,
    [createAlgorandWallet.rejected]: actions.createAlgorandWalletRejected,
    
    [confirmAlgorandPassphrase.pending]: actions.confirmAlgorandPassphrasePending,
    [confirmAlgorandPassphrase.fulfilled]: actions.confirmAlgorandPassphraseFulfilled,
    [confirmAlgorandPassphrase.rejected]: actions.confirmAlgorandPassphraseRejected,
    
    [getActiveAlgorandWallet.pending]: actions.getActiveAlgorandWalletPending,
    [getActiveAlgorandWallet.fulfilled]: actions.getActiveAlgorandWalletFulfilled,
    [getActiveAlgorandWallet.rejected]: actions.getActiveAlgorandWalletRejected,

    [getAllAlgorandWallets.pending]: actions.getAllAlgorandWalletsPending,
    [getAllAlgorandWallets.fulfilled]: actions.getAllAlgorandWalletsFulfilled,
    [getAllAlgorandWallets.rejected]: actions.getAllAlgorandWalletsRejected,

    [createAlgorandClawback.pending]: actions.createAlgorandClawbackPending,
    [createAlgorandClawback.fulfilled]: actions.createAlgorandClawbackFulfilled,
    [createAlgorandClawback.rejected]: actions.createAlgorandClawbackRejected,

    [destroyAlgorand.pending]: actions.destroyAlgorandPending,
    [destroyAlgorand.fulfilled]: actions.destroyAlgorandFulfilled,
    [destroyAlgorand.rejected]: actions.destroyAlgorandRejected,

    [freezeAlgorand.pending]: actions.freezeAlgorandPending,
    [freezeAlgorand.fulfilled]: actions.freezeAlgorandFulfilled,
    [freezeAlgorand.rejected]: actions.freezeAlgorandRejected,

    [getAlgorandHoldings.pending]: actions.getAlgorandHoldingsPending,
    [getAlgorandHoldings.fulfilled]: actions.getAlgorandHoldingsFulfilled,
    [getAlgorandHoldings.rejected]: actions.getAlgorandHoldingsRejected,

    [modifyAlgorand.pending]: actions.modifyAlgorandPending,
    [modifyAlgorand.fulfilled]: actions.modifyAlgorandFulfilled,
    [modifyAlgorand.rejected]: actions.modifyAlgorandRejected,

    [algorandOptIn.pending]: actions.algorandOptInPending,
    [algorandOptIn.fulfilled]: actions.algorandOptInFulfilled,
    [algorandOptIn.rejected]: actions.algorandOptInRejected,

    [algorandOptOut.pending]: actions.algorandOptOutPending,
    [algorandOptOut.fulfilled]: actions.algorandOptOutFulfilled,
    [algorandOptOut.rejected]: actions.algorandOptOutRejected,

    [getAlgorandSendList.pending]: actions.getAlgorandSendListPending,
    [getAlgorandSendList.fulfilled]: actions.getAlgorandSendListFulfilled,
    [getAlgorandSendList.rejected]: actions.getAlgorandSendListRejected,

    [sendAlgorand.pending]: actions.sendAlgorandPending,
    [sendAlgorand.fulfilled]: actions.sendAlgorandFulfilled,
    [sendAlgorand.rejected]: actions.sendAlgorandRejected,

    [getAlgorandSwapValue.pending]: actions.getAlgorandSwapValuePending,
    [getAlgorandSwapValue.fulfilled]: actions.getAlgorandSwapValueFulfilled,
    [getAlgorandSwapValue.rejected]: actions.getAlgorandSwapValueRejected,

    [swapAlgorand.pending]: actions.swapAlgorandPending,
    [swapAlgorand.fulfilled]: actions.swapAlgorandFulfilled,
    [swapAlgorand.rejected]: actions.swapAlgorandRejected,

    [algorandLiquidity.pending]: actions.algorandLiquidityPending,
    [algorandLiquidity.fulfilled]: actions.algorandLiquidityFulfilled,
    [algorandLiquidity.rejected]: actions.algorandLiquidityRejected,

    [unfreezeAlgorand.pending]: actions.unfreezeAlgorandPending,
    [unfreezeAlgorand.fulfilled]: actions.unfreezeAlgorandFulfilled,
    [unfreezeAlgorand.rejected]: actions.unfreezeAlgorandRejected,

    [getAlgorandTransactions.pending]: actions.getAlgorandTransactionsPending,
    [getAlgorandTransactions.fulfilled]: actions.getAlgorandTransactionsFulfilled,
    [getAlgorandTransactions.rejected]: actions.getAlgorandTransactionsRejected,

    [checkAlgorandAssetIsValid.pending]: actions.checkAlgorandAssetIsValidPending,
    [checkAlgorandAssetIsValid.fulfilled]: actions.checkAlgorandAssetIsValidFulfilled,
    [checkAlgorandAssetIsValid.rejected]: actions.checkAlgorandAssetIsValidRejected,

    [checkAlgorandAddressIsValid.pending]: actions.checkAlgorandAddressIsValidPending,
    [checkAlgorandAddressIsValid.fulfilled]: actions.checkAlgorandAddressIsValidFulfilled,
    [checkAlgorandAddressIsValid.rejected]: actions.checkAlgorandAddressIsValidRejected,

    [checkCanClawbackAlgorandAsset.pending]: actions.checkCanClawbackAlgorandAssetPending,
    [checkCanClawbackAlgorandAsset.fulfilled]: actions.checkCanClawbackAlgorandAssetFulfilled,
    [checkCanClawbackAlgorandAsset.rejected]: actions.checkCanClawbackAlgorandAssetRejected,

    [checkCanDestroyAlgorandAsset.pending]: actions.checkCanDestroyAlgorandAssetPending,
    [checkCanDestroyAlgorandAsset.fulfilled]: actions.checkCanDestroyAlgorandAssetFulfilled,
    [checkCanDestroyAlgorandAsset.rejected]: actions.checkCanDestroyAlgorandAssetRejected,

    [createAlgorandAsset.pending]: actions.createAlgorandAssetPending,
    [createAlgorandAsset.fulfilled]: actions.createAlgorandAssetFulfilled,
    [createAlgorandAsset.rejected]: actions.createAlgorandAssetRejected,

    [getCreatedAssets.pending]: actions.getCreatedAssetsPending,
    [getCreatedAssets.fulfilled]: actions.getCreatedAssetsFulfilled,
    [getCreatedAssets.rejected]: actions.getCreatedAssetsRejected,

    [updateActiveWallet.pending]: actions.updateActiveWalletPending,
    [updateActiveWallet.fulfilled]: actions.updateActiveWalletFulfilled,
    [updateActiveWallet.rejected]: actions.updateActiveWalletRejected,

    [removeWallet.pending]: actions.removeWalletPending,
    [removeWallet.fulfilled]: actions.removeWalletFulfilled,
    [removeWallet.rejected]: actions.removeWalletRejected,

    [setAlgorandNet.pending]: actions.setAlgorandNetPending,
    [setAlgorandNet.fulfilled]: actions.setAlgorandNetFulfilled,
    [setAlgorandNet.rejected]: actions.setAlgorandNetRejected
  }
})

export const { incorrectPassphraseError, setAlgorandPassphrase, resetSwapValueData, clearError } = algorandSlice.actions

export default algorandSlice.reducer
