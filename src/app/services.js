import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from './axiosService'

export const asyncRequest = (actionType, url, method) => createAsyncThunk(actionType, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios[method](`${url}${objData?.urlParams ? objData?.urlParams : ''}`, ['get', 'delete'].includes(method) ? {} : objData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})
