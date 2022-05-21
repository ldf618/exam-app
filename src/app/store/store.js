import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/counterSlice'
import concatReducer from '../slices/concatSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        concat: concatReducer,
      },
})