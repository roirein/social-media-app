import { Box, useTheme, Stack } from "@mui/material"
import AppHeader from "./components/app-header"
import userApi from "@/store/user/user-api"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import profileApi from "@/store/profile/profile-api"
import { useLoading } from "@/components/UI/loading-spinner/loading-context"
import LoadingSpinner from "@/components/UI/loading-spinner/LoadingSpinner"

const AppTemplate = (props) => {

    const theme = useTheme()
    const router = useRouter()
    const userId = useSelector(state => userApi.getUserId(state))
    const {loading, setIsLoading} = useLoading()

    useEffect(() => {

        const getUserData = async () => {
            const token = localStorage.getItem('accessToken')
            if (token) {
                setIsLoading(true)
                await userApi.getUser(token);
                setIsLoading(false)
            } else {
                router.push('/')
            }
        }
        getUserData()
    }, [])

    return (
        <>
            <LoadingSpinner open={loading}/>
            <Box
                border={`${theme.spacing(3)} solid ${theme.palette.primary.main}`}
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
        </>
    )
}

export default AppTemplate