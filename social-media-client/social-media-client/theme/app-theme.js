import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#2de090'
        },
        secondary: {
            main: '#e1ebe6',
        }
    },
    customPalette: {
        primaryBackground: {
            main: '#FFFFFF'
        }
    },
    spacing: [0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64],
    shadows: [
        'none', // index 0
        '0px 1px 2px 0px rgba(0,0,0,0.05)', // index 1
        '0px 2px 4px 0px rgba(0,0,0,0.5)'
    ],
    typography: {
        fontFamily: [
            'Roboto', 'sans-serif'
        ].join(',')
    }
})

export default theme