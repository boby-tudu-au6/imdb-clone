const { createSlice } = require("@reduxjs/toolkit");


const userSlice = createSlice({
    name: "userSlice",
    initialState: null,
    reducers: {
        setUser: (state, action) => state = action.payload,
        logout: (state) => {
            localStorage.removeItem('user')
            return state = null
        }
    }
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer