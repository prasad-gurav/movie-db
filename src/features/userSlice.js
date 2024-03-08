import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  name:null,
  user_id : null
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.username = action.payload.username
      state.name = action.payload.name
      state.user_id = action.payload.user_id

    },
    unsetUserInfo: (state, action) => {
      state.username = null
      state.name = null
      state.user_id = null
    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer