import { useTheme, Typography } from "@mui/material"

const TextLink = (props) => {

    const theme = useTheme()

    return (
        <Typography textAlign="center" fontSize="16px" sx={{
            cursor: 'pointer',
            '&:hover': {
                color: theme.palette.primary.main,
                textDecoration: 'underline',
                fontWeight: 'bold'
            }
        }} onClick={props.onClick} variant="caption">
            {props.message}
        </Typography>
    )
} 

export default TextLink