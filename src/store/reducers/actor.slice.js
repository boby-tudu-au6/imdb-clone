import { createSlice } from "@reduxjs/toolkit";

const actorSlice = createSlice({
    name: "actor",
    initialState: {
        data: []
    },
    reducers: {
        addActor: (state, action) => state = action.payload
    }
})

export const { addActor } = actorSlice.actions;
export default actorSlice.reducer