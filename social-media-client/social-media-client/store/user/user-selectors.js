import { createSelector } from "@reduxjs/toolkit";

export const userSelector = (state) => state?.user

export const usernameSelector = createSelector(userSelector, (user) => user?.username)

export const errSelector = createSelector(userSelector, (user) => user.errorMessage)
