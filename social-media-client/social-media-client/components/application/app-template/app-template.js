import { Box, useTheme, Stack } from "@mui/material"
import AppHeader from "./components/app-header"
import userApi from "@/store/user/user-api"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

const AppTemplate = (props) => {

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
            minHeight="100vh"
        >
            <AppHeader/>
            <Stack
                width="100%"
                direction="row"
                sx={{pt: theme.spacing(8)}}
                height="100vh"
            >
                <Stack
                    width="30%"
                    minHeight="100%"
                >

                </Stack>
                <Stack
                    width="40%"
                    minHeight="100%"
                    border={`${theme.spacing(2)} solid ${theme.palette.secondary.light}`}
                >
                    {props.children}
                </Stack>
                <Stack
                    width="30%"
                    minHeight="100%"
                >

                </Stack>
            </Stack>
        </Box>
    )
}

export default AppTemplate