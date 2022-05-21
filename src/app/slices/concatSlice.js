import { createSlice } from '@reduxjs/toolkit'

export const concatSlice = createSlice({
  name: 'concat',
  initialState: {
    value: "Z",
  },
  reducers: {
    add: (state) => {
      state.value += "A"
    },
    del: (state) => {
        state.value=state.value.slice(0,-1)
    },
    addElement: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, del, addElement } = concatSlice.actions

export default concatSlice.reducer