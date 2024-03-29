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
import ProfileData from "./components/ProfileData"
import EditProfileModal from "./components/EditProfileModal"

const ProfilePage = () => {
        
    const theme = useTheme()
    const router = useRouter()
    const [showEditModal, setShowEditModal] = useState(false)

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

    const onEditProfile = async (data) => {
        await profileApi.editProfile(`/profile/profile/${userId}`, data)
        mutate(`/profile/profile/${userId}`)
        setShowEditModal(false)
    }

    const getDateString = () => {
        return new Date(data?.profile?.joined).toLocaleString('en-US', {month: 'long', year: 'numeric'})
    }


    return (
        <AppTemplate>
            <LoadingSpinner
                open={isLoading}
            />
            {!isLoading && (
                <>
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
                        <ProfileData
                            displayName={data?.profile?.displayName}
                            username={data?.profile?.username}
                            joined={getDateString()}
                            isCurrentUserProfile={loggedInUserId}
                            onClickEdit={() => setShowEditModal(true)}
                            bio={data?.profile?.bio}
                            job={data?.profile?.job}
                            location={data?.profile?.location}
                        />
                    </Stack>
                    <EditProfileModal
                        open={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        onEditProfile={(data) => onEditProfile(data)}
                        profile={data?.profile}
                    />
                </>
            )}
        </AppTemplate>
    )
}

export default ProfilePage