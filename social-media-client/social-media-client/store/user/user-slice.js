const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    userId: '',
    username: '',
    token: ''
}

const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.userId = action.payload.userId,
            state.username = action.payload.username,
            state.token = action.payload.token
        }
    }
})

export default userSlice