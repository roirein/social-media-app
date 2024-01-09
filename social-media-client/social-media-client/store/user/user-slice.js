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
            state = {
                userId: action.payload.userId,
                username: action.payload.username,
                token: action.payload.token
            }
        }
    }
})

export default userSlice