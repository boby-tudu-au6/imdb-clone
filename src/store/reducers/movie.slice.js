import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        data: []
    },
    reducers: {
        addAllMovies: (state, action) => state = action.payload,
        addMovie: (state, action) => state = action.payload
    }
});

export const { addAllMovies, addMovie } = movieSlice.actions
export default movieSlice.reducer