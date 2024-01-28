import { Backdrop, CircularProgress } from "@mui/material"

const LoadingSpinner = (props) => {
    return (
        <Backdrop
            bgcolor="red"
            width="100%"
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
        >
            <CircularProgress
                size={50}
                sx={{
                    color: 'secondary',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </Backdrop>
    )
}

export default LoadingSpinner