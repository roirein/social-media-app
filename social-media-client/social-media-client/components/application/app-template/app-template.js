import { Box, useTheme } from "@mui/material"
import AppHeader from "./components/app-header"
import userApi from "@/store/user/user-api"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

const AppTemplate = () => {

    const theme = useTheme()
    const router = useRouter()
    const username = useSelector(state => userApi.getUsername(state))

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token && !username) {
            userApi.getUser(token).catch((e) => {
                router.push('/')
            })
        } else if (!token) {
            router.push('/')
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