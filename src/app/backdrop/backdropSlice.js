import { createSlice } from '@reduxjs/toolkit'

const backdropSlice = createSlice({
  name: 'backdrop',
  initialState: {
    open: false,
  },
  reducers: {
    showBackdrop(state) {
        state.open = true
    },
    hideBackdrop(state) {
        state.open = false
    }
  },
})

export const { showBackdrop, hideBackdrop } = backdropSlice.actions

export default backdropSlice.reducer
