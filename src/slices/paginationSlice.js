import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    currentPage: 1,
    totalRecords: 1,
    limit: 10,
    orderBy: 'asc',
    sortBy: '',
    filterBy: '',
    filterValue: ''
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        clearPagination: state => {
            state = initialState
        },
        setData: (state, action) => {
            state.data = action.payload
        },
        setPage: (state, action) => {
            state.currentPage = action.payload
        },
        setTotal: (state, action) => {
            state.totalRecords = action.payload
        },
        setLimit: (state, action) => {
            state.limit = action.payload
        },
        setOrderBy: (state, action) => {
            state.orderBy = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setFilterBy: (state, action) => {
            state.filterBy = action.payload
        },
        setFilterValue: (state, action) => {
            state.filterValue = action.payload
        },
        setPagination: (state, action) => {
            state = action.payload
        }
    }
})

export const getPagination = (state) => state.pagination

export const {
    setPage, setTotal, setLimit,
    setOrderBy, setSortBy, setFilterBy,
    setFilterValue, setPagination, clearPagination,
    setData } = paginationSlice.actions