import { Box, useTheme, Stack, Typography} from "@mui/material"
import Image from "next/image"
import logo from '../../public/logo.png'

const AuthPageTemplate = ({children}) => {

    const theme = useTheme() 

    return (
        <Box
            width="100%"
            minHeight="100vh"
            sx={{
            background: theme.palette.primary.main,
            }}
            display="flex"
            flexDirection="column"
            alignItems='center'
            rowGap={theme.spacing(10)}
        >
            <Stack
                direction="row"
                sx={{
                width:"100%",
                justifyContent: 'center',
                alignItems: 'center',
                mt: theme.spacing(8)
                }}
            >
                <Typography variant="h2" fontWeight="bold" sx={{mb: theme.spacing(4)}} color={theme.palette.secondary.contrastText}>
                    Moment Sphere
                </Typography>
                <Image src={logo} width={100} height={100}/>
            </Stack>
            <Stack
                direction="row"
                width="60rem"
                minHeight="45vh"
                sx={{
                boxShadow: 2,
                borderRadius: theme.spacing(4),
                mt: theme.spacing(10)
                }}
            >
                <Stack
                    width="50%"
                    bgcolor={theme.palette.primary.light}
                    sx={{
                        borderTopLeftRadius: theme.spacing(4),
                        borderBottomLeftRadius: theme.spacing(4)
                    }}
                    >
            
                </Stack>
                <Stack
                    width="50%"
                    bgcolor={theme.palette.secondary.light}
                    sx={{
                        borderTopRightRadius: theme.spacing(4),
                        borderBottomRightRadius: theme.spacing(4)
                    }}
                    >
                        {children}
                </Stack>
            </Stack>
        </Box>
    )
}

export default AuthPageTemplate