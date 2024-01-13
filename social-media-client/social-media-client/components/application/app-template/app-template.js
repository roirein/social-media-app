import { Box, useTheme } from "@mui/material"
import AppHeader from "./app-header"
import userApi from "@/store/user/user-api"
import { useEffect } from "react"
import { useRouter } from "next/router"

const AppTemplate = () => {

    const theme = useTheme()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            userApi.getUser(token).then((res) => {
                if (res === 'session ended') {
                    router.push('/')
                }
            })
        }
    }, [])

    return (
        <Box
            border={`${theme.spacing(3)} solid ${theme.palette.primary.light}`}
            width="100%"
            height="100vh"
        >
            <AppHeader/>
        </Box>
    )
}

export default AppTemplate