import { Box, useTheme, Stack, Typography} from "@mui/material"
import Image from "next/image"
import logo from '../../public/logo.png'

const AuthPageTemplate = ({children}) => {

    const theme = useTheme() 

    return (
        <Box
            width="100%"
            minHeight="100vh"
            display="flex"
            flexDirection="row"
            alignItems='center'
            rowGap={theme.spacing(10)}
        >
            <Stack
                width="50%"
                height="100vh"
                justifyContent="center"
                alignItems="center"
                bgcolor={theme.palette.primary.main}
            >
                <Image src={logo} width={500} height={500} />
                <Typography variant="h1" fontWeight="bold">Moment Sphere</Typography>
            </Stack>
            <Stack
                width="50%"
                height="100vh"
                bgcolor={theme.customPalette.primaryBackground.main}
                justifyContent="center"
                alignItems="center"
            >
                {children}
            </Stack>
        </Box>
    )
}

export default AuthPageTemplate