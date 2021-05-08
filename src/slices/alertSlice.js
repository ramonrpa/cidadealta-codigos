import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        show: false,
        message: '',
        type: 'success'
    },
    reducers: {
        setAlert: (state, action) =>
            state = action.payload
    }
})

export const getAlert = (state) => state.alert

export const { setAlert } = alertSlice.actions