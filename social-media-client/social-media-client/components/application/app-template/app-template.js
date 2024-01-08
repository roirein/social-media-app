import { Box, useTheme } from "@mui/material"
import AppHeader from "./app-header"

const AppTemplate = () => {

    const theme = useTheme()

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