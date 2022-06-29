import { createSlice } from "@reduxjs/toolkit";

const snackSlice = createSlice({
    name: 'snack',
    initialState: {
        type: "success",
        text: '',
        open: false
    },
    reducers: {
        openSnack: (state, action) => state = { open: true, ...action.payload },
        closeSnack: (state) => state = { open: false, type: 'success', text: '' }
    }
});

export const { openSnack, closeSnack } = snackSlice.actions
export default snackSlice.reducer