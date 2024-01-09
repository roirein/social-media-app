import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/user-slice";

const rootReducer = combineReducers({
    user: userSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store