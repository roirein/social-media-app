import { createSelector } from "@reduxjs/toolkit";

export const profileSelector = state => state?.profile

export const coverImageSelector = createSelector(profileSelector, (profile) => profile?.coverImage)

export const profileImageSelector = createSelector(profileSelector, (profile) => profile?.Image)