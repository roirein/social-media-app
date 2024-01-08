import { AccountCircle, Mail, Notifications, Search } from "@mui/icons-material"
import { AppBar, useTheme, Stack, Avatar, TextField } from "@mui/material"
import Image from "next/image"
import logo from "../../../public/logo.png"

const AppHeader = () => {

    const theme = useTheme()

    return (
        <AppBar
            sx={{
                height: '50px',
                backgroundColor: theme.palette.primary.light
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
                    <Avatar sx={{width: '40px', height: '40px', marginY: theme.spacing(3), backgroundColor: theme.palette.primary.light}}>
                        <AccountCircle fontSize="large" sx={{color: theme.palette.secondary.light}}/>
                    </Avatar>
                    <Avatar sx={{width: '40px', height: '40px', marginY: theme.spacing(3), backgroundColor: theme.palette.primary.light}}>
                        <Notifications sx={{color: theme.palette.secondary.light}}/>
                    </Avatar>
                    <Avatar sx={{width: '40px', height: '40px', marginY: theme.spacing(3), backgroundColor: theme.palette.primary.light}}>
                        <Mail sx={{color: theme.palette.secondary.light}}/>
                    </Avatar>
                </Stack>
                <Stack width="50%">
                    <TextField
                        fullwidth
                        InputProps={{
                            startAdornment: <Search fontSize="large"/>,
                            sx: {
                                height: '40px',
                                bgcolor: theme.palette.secondary.light,
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
                </Stack>
            </Stack>
        </AppBar>
    )
}

export default AppHeader