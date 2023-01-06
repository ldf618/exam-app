import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/counterSlice'
import concatReducer from '../slices/concatSlice'
import userReducer from '../slices/userSlice'
import answerReducer from '../slices/answerSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        concat: concatReducer,
        user: userReducer,
        answer: answerReducer,
      },
      middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false,}),
})