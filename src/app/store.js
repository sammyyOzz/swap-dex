import { configureStore } from '@reduxjs/toolkit'
import backdropReducer from './backdrop/backdropSlice'
import algorandReducer from './algorand/algorandSlice'


export default configureStore({
  reducer: {
    backdrop: backdropReducer,
    algorand: algorandReducer,
  },
})
