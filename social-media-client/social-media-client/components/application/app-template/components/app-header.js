import { AccountCircle, Mail, Notifications, Search } from "@mui/icons-material"
import { AppBar, useTheme, Stack, Avatar, TextField, Typography } from "@mui/material"
import Image from "next/image"
import logo from "../../../../public/logo.png"
import { useSelector } from "react-redux"
import userApi from "@/store/user/user-api"
import AppHeaderMenu from "./app-header-menu"
import { useState } from "react"

// next tasks:
//redesign the header(include add dropdown with navigation to setting page and logout)
//add to profile page cover and profile image

const AppHeader = () => {

    const theme = useTheme()
    const username = useSelector(state => userApi.getUsername(state))
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)

    const onOpenMenu = (e) => {
        setMenuAnchorEl(e.currentTarget)
    }

    const onCloseMenu = (e) => {
        setMenuAnchorEl(null)
    }

    return (
        <AppBar
            sx={{
                height: '50px',
                backgroundColor: theme.palette.primary.main
            }}
        >
            <Stack
                direction="row"
                width="100%"
                height="100%"
            >
                <Stack
                    width="25%"
                    direction="row"
                    columnGap={theme.spacing(5)}
                    sx={{
                        px: theme.spacing(5)
                    }}
                >
                    <Stack
                        direction="row"
                        columnGap={theme.spacing(4)}
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            cursor: 'pointer'
                        }}
                        onClick={onOpenMenu}
                    >
                        <Avatar sx={{width: '40px', height: '40px', marginY: theme.spacing(3), backgroundColor: theme.palette.primary.main}}>
                            <AccountCircle fontSize="large" sx={{color: theme.palette.background.main}}/>
                        </Avatar>
                        <Typography color={theme.palette.primary.contrastText} fontWeight="bold">
                            Hello, {username}
                        </Typography>
                    </Stack>
                    <AppHeaderMenu
                        anchorEl={menuAnchorEl}
                        onClose={onCloseMenu}
                    />
                </Stack>
                <Stack width="50%">
                    <TextField
                        fullwidth
                        InputProps={{
                            startAdornment: <Search fontSize="large"/>,
                            sx: {
                                height: '40px',
                                bgcolor: theme.palette.background.main,
                                mt: theme.spacing(3),
                                borderRadius: theme.spacing(8)
                            }
                        }}
                        placeholder="Seacrh user, hashtag or group"
                        sx={{mt: theme.spacing(1)}}
                    />
                </Stack>
                <Stack
                    width="25%"
                    direction="row-reverse"
                    sx={{
                        pr: theme.spacing(5),
                        pt: theme.spacing(3)
                    }}
                >
                    <Image src={logo} width={40} height={40} style={{marginTop: '2px'}}/>
                    <Avatar sx={{width: '40px', height: '40px', marginY: theme.spacing(3), backgroundColor: theme.palette.primary.main}}>
                        <Notifications sx={{color: theme.palette.background.main}}/>
                    </Avatar>
                    <Avatar sx={{width: '40px', height: '40px', marginY: theme.spacing(3), backgroundColor: theme.palette.primary.main}}>
                        <Mail sx={{color: theme.palette.background.main}}/>
                    </Avatar> 
                </Stack>
            </Stack>
        </AppBar>
    )
}

export default AppHeader