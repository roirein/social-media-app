import AppTemplate from "@/components/application/app-template/app-template"
import { Avatar, Button, Menu, Stack, useTheme } from "@mui/material"
import { useState } from "react"
import CoverPhotoComponent from "./components/CoverPhotoComponent"
import ProfileHeaderComponent from "./components/profile-header"

const ProfilePage = () => {
        
    const theme = useTheme()

    return (
        <AppTemplate>
            <Stack
                width="100%"
                minHeight="100vh"
            >
                <ProfileHeaderComponent/>
            </Stack>
        </AppTemplate>
    )
}

export default ProfilePage