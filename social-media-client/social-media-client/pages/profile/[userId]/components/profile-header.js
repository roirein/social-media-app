import profileApi from "@/store/profile/profile-api"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { Stack, Avatar, useTheme, Button, Menu, MenuItem, IconButton, Backdrop } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useRouter } from "next/router";
import userApi from "@/store/user/user-api";
import CoverPhotoComponent from "./CoverPhotoComponent";
import ProfilePhotoComponent from "./ProfilePhotoComponent";

//next tasks
//handle profile upload - done
//display and editing data -TBD
//differntiate between logged in user profile to other profile - done

const ProfileHeaderComponent = (props) => {

    const theme = useTheme()

    const {coverImage, profileImage, isCurrentUserProfile} = props

    const [profileImageUrl, setProfileImageUrl] = useState(null)
    const [coverImageUrl, setCoverImageUrl] = useState(null)
    const [imageToSend, setImageToSend] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);


    const handleFileSelect = (e, imageType) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImageToSend(file)
                imageType === 'profile' ? setProfileImageUrl(ev.target.result) : setCoverImageUrl(ev.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    
    const handleImageUpload = async (imageType) => {
        const formData = new FormData()
        formData.append('profile', imageToSend)
        props.onUploadImage(imageType, formData)
        setCoverImageUrl(null)
        setProfileImageUrl(null)
        setImageToSend(null)
        setAnchorEl(null)
    }

    return (
        <Stack width="100%" position="relative">
            <CoverPhotoComponent
                handleFileSelect={handleFileSelect}
                newImage={coverImageUrl}
                currentImage={coverImage}
                showUploadButton={!coverImageUrl && isCurrentUserProfile}
                handleImageUpload={handleImageUpload}
                onCancel={() => {
                    setCoverImageUrl(null)
                    setImageToSend(null)
                }}
            />
            <ProfilePhotoComponent 
                handleFileSelect={handleFileSelect}
                newImage={profileImageUrl}
                currentImage={profileImage}
                showCameraIcon={isCurrentUserProfile}
                handleImageUpload={handleImageUpload}
                onCancel={() => {
                    setProfileImageUrl(null)
                    setImageToSend(null)
                }}
            />
        </Stack>
    )
}

export default ProfileHeaderComponent