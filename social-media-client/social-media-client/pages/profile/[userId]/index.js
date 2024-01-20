import AppTemplate from "@/components/application/app-template/app-template"
import { Button, Menu, Stack, useTheme } from "@mui/material"
import { useState } from "react"
import CoverPhotoComponent from "./components/CoverPhotoComponent"

const ProfilePage = () => {

    return (
        <AppTemplate>
            <Stack
                width="100%"
                minHeight="100vh"
            >
                <CoverPhotoComponent/>
            </Stack>
        </AppTemplate>
    )
}

export default ProfilePage