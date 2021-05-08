import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from './slices/alertSlice'
import { userSlice } from './slices/userSlice'
import { paginationSlice } from './slices/paginationSlice'

export const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    user: userSlice.reducer,
    pagination: paginationSlice.reducer
  },
})
