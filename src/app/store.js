import { configureStore } from '@reduxjs/toolkit'
import backdropReducer from './backdrop/backdropSlice'
import algorandReducer from './algorand/algorandSlice'
import swiftReducer from './swift/swiftSlice'

export default configureStore({
  reducer: {
    backdrop: backdropReducer,
    algorand: algorandReducer,
    swift: swiftReducer
  },
})
