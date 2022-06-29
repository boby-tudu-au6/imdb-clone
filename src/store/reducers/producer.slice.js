import { createSlice } from "@reduxjs/toolkit";

const producerSlice = createSlice({
    name: "producer",
    initialState: {
        data: []
    },
    reducers: {
        addProducer: (state, action) => state = action.payload
    }
})

export const { addProducer } = producerSlice.actions;
export default producerSlice.reducer