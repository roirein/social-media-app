const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    userId: '',
    username: '',
    token: '',
    errorMessage: ''
}

const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        registerSuccess: (state) => {
            if (state.errorMessage) {
                state.errorMessage = ''
            }
        },
        loginSuccess: (state, action) => {
            state.userId = action.payload.userId
            state.username = action.payload.username
            state.token = action.payload.token
            state.errorMessage = ''
        },
        loginFailure: (state, action) => {
            state.errorMessage = action.payload.errMessage
        }
    }
})

export default userSlice