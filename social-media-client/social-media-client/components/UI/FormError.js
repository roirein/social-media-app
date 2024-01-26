import { Info } from "@mui/icons-material"
import { IconButton, Stack, Tooltip, Typography, useTheme, tooltipClasses } from "@mui/material"

const FormError = (props) => {

    const theme = useTheme();

    return (
        <Stack direction="row" alignItems="center">
            <Typography color="error" textAlign="left" variant="caption" sx={{mt: theme.spacing(3)}}>
                {props.message}
            </Typography>
            {props.showTooltip && (
                <Tooltip 
                    title={props.details}
                    placement="bottom"
                    componentsProps={{
                        tooltip: {
                            sx: {
                                backgroundColor: theme.palette.secondary.main,
                            }
                        }
                    }}
                >
                    <IconButton size="small">
                        <Info fontSize="small" color="error"/>
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    )
}

export default FormError