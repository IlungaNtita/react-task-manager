import { configureStore } from '@reduxjs/toolkit'
import counterReducer from 'store/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})