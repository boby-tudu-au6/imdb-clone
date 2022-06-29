import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
    name: "loader",
    initialState: false,
    reducers: {
        startLoading: (state) => state = true,
        stopLoading: state => state = false
    }
})

export const { startLoading, stopLoading } = loadingSlice.actions
export default loadingSlice.reducer