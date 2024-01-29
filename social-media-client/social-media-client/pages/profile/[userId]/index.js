import AppTemplate from "@/components/application/app-template/app-template"
import { Avatar, Button, Menu, Stack, useTheme } from "@mui/material"
import { useState } from "react"
import CoverPhotoComponent from "./components/CoverPhotoComponent"
import ProfileHeaderComponent from "./components/profile-header"
import useSWR, {mutate} from "swr"
import { useRouter } from "next/router"
import profileApi from "@/store/profile/profile-api"
import LoadingSpinner from "@/components/UI/loading-spinner/LoadingSpinner"
import { useSelector } from "react-redux"
import userApi from "@/store/user/user-api"

const ProfilePage = () => {
        
    const theme = useTheme()
    const router = useRouter()

    const {userId} = router.query

    const fetcher = async (url) => {
        const response = await profileApi.getProfile(url)
        return response
    }

    const {data, error, isLoading} = useSWR(`/profile/profile/${userId}`, fetcher)
    
    const loggedInUserId = useSelector(state => userApi.getUserId(state))

    const onUploadImage = async (imageType, imageData) => {
        await profileApi.uploadImage(imageType, imageData)
        mutate(`/profile/profile/${userId}`)
    }

    return (
        <AppTemplate>
            <LoadingSpinner
                open={!data && !error}
            />
            {data && (
                <Stack
                    width="100%"
                    minHeight="100vh"
                >
                    <ProfileHeaderComponent
                        coverImage={data?.profile.coverImageUrl}
                        profileImage={data?.profile.profileImageUrl}
                        isCurrentUserProfile={loggedInUserId === userId}
                        onUploadImage={onUploadImage}
                    />
                </Stack>
            )}
        </AppTemplate>
    )
}

export default ProfilePage