import userApi from "@/store/user/user-api"
import { AccountCircle, Logout, Settings } from "@mui/icons-material"
import { Menu, MenuItem, Stack, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

const AppHeaderMenu = (props) => {

    const theme = useTheme()
    const open = Boolean(props.anchorEl)
    const router = useRouter()

    const userId = useSelector((state) => userApi.getUserId(state))

    const onClickItem = async (itemValue) => {
        switch(itemValue) {
            case 'logout': {
                await userApi.logout()
                router.push('/')
            }
            case 'profile': 
                router.push(`/profile/${userId}`)
            default: 
                break
        }

        props.onClose()
    }

    return (
        <Menu
            open={open}
            anchorEl={props.anchorEl}
            sx={{
                minWidth: '250px',
                height: "300px",
                mt: theme.spacing(8)
            }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={props.onClose}
            slotProps={{
                paper: {
                    sx: {
                        boxShadow: 2,
                        width: '200px',
                        px: theme.spacing(5),
                        bgcolor: theme.palette.secondaryBackground.main
                    }
                }
            }}
        >
            <Stack
                rowsGap={theme.spacing(4)}
            >
                <MenuItem onClick={() => onClickItem('profile')}>
                    <Stack 
                        direction="row"
                        columnGap={theme.spacing(4)}
                    >
                        <AccountCircle fontSize="large" sx={{color: theme.palette.grey[500]}}/>
                        <Typography variant="h6" fontWeight="bold">
                            Profile
                        </Typography>
                    </Stack>
                </MenuItem>
                <MenuItem>
                    <Stack 
                        direction="row"
                        columnGap={theme.spacing(4)}
                    >
                        <Settings fontSize="large" sx={{color: theme.palette.grey[500]}}/>
                        <Typography variant="h6" fontWeight="bold">
                            Settings
                        </Typography>
                    </Stack>
                </MenuItem>
                <MenuItem onClick={() => onClickItem('logout')}>
                    <Stack 
                        direction="row"
                        columnGap={theme.spacing(4)}
                    >
                        <Logout fontSize="large" sx={{color: theme.palette.grey[500]}}/>
                        <Typography variant="h6" fontWeight="bold">
                            Logout
                        </Typography>
                    </Stack>
                </MenuItem>
            </Stack>
        </Menu>
    )
}

export default AppHeaderMenu