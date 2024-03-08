import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import moveiSlice from '../features/moveiSlice'

export const store = configureStore({
    // [userAuthApi.reducerPath]: userAuthApi.reducer,
  reducer: {
    auth: authReducer,
    user: userReducer,
    movie:moveiSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
})

setupListeners(store.dispatch)