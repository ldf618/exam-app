import { createSlice } from '@reduxjs/toolkit'

export const answerSlice = createSlice({
  name: 'answer',
  initialState: {
    value: {},
  },
  reducers: {
    del: (state) => {
        state.value={}
    },
    set: (state, action) => {
        state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {del, set } = answerSlice.actions

export default answerSlice.reducer