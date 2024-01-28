const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    profileImage: null,
    coverImage: null,
    followersNumber: 0,
    followingNumber: 0,
    profileData: {
        joined: null,
        firstName: '',
        lastName: '',
        bio: '',
        location: '',
        birthday: '',
        job: ''
    }
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loadProfileSuccess(state, action) {
            state.coverImage = action.payload.coverImage
        },
        uploadCoverSuccess(state, action) {
            state.coverImage = action.payload.imageUrl
        }
    }
})

export default profileSlice