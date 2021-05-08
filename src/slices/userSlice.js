import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        isLogged: false
    },
    reducers: {
        setUser: (state, action) =>
            state = action.payload
    }
})

export const getUser = (state) => state.user

export const { setUser } = userSlice.actions