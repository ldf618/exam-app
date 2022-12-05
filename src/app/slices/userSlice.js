import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    del: (state) => {
        state.user=null
    },
    set: (state, action) => {
        state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {del, set } = userSlice.actions

export default userSlice.reducer