import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/user-slice";
import profileSlice from "./profile/profile-slice";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    profile: profileSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store