import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#d0f2f6',
            light: '#26c6da',
            contrastText: '#FFF',
            dark: '#000'
        },
        secondary: {
            main: '#39dcd9',
            light: '#F0F0F0',
            contrastText: '#FFF'
        }
    },
    spacing: [0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64],
    shadows: [
        'none', // index 0
        '0px 1px 2px 0px rgba(0,0,0,0.05)', // index 1
        '0px 2px 4px 0px rgba(0,0,0,0.5)'
    ]
})

export default theme