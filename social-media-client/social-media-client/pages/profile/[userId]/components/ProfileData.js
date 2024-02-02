import { CalendarMonth, Edit, LocationOn, Work } from "@mui/icons-material";
import { Button, Stack, Typography, useTheme } from "@mui/material"

const ProfileData = (props) => {

    const theme = useTheme();

    return ( 
        <Stack
            sx={{
                mt: theme.spacing(10),
                pl: theme.spacing(7)
            }}
        >
            <Stack 
                sx={{
                    width: '100%',
                    justifyContent: 'space-between'
                }}
                direction="row"
            >
                <Stack>
                    <Typography variant="h4" sx={{mt: theme.spacing(5)}}>
                        {props.displayName}
                    </Typography>
                    <Typography variant="body1" color={theme.palette.grey[400]}>
                        @{props.username}
                    </Typography>
                </Stack>
                {props.isCurrentUserProfile && (
                    <Button variant="contained" sx={{height: '30px', borderRadius: theme.spacing(7), mr: theme.spacing(6)}} onClick={props.onClickEdit}>
                        <Typography variant="body1" sx={{mr: theme.spacing(3)}}>
                            Edit Profile
                        </Typography>
                        <Edit/>
                    </Button>
                )}
            </Stack>
            {props.bio && (
                <Stack>
                    <Typography>
                        {props.bio}
                    </Typography>
                </Stack>
            )}
            <Stack
                direction="row"
                columnGap={theme.spacing(4)}
                sx={{
                    mt: theme.spacing(4)
                }}
            >
                <Stack
                    direction="row"
                    columnGap={theme.spacing(3)}
                >
                    <CalendarMonth sx={{color: theme.palette.grey[400]}}/>
                    <Typography variant="body1" color={theme.palette.grey[400]}>
                        joined {props.joined}
                    </Typography>
                </Stack>
                {props.location && (
                    <Stack
                        direction="row"
                        columnGap={theme.spacing(3)}
                    >
                        <LocationOn sx={{color: theme.palette.grey[400]}}/>
                        <Typography variant="body1" color={theme.palette.grey[400]}>
                            {props.location}
                        </Typography>
                    </Stack>
                )}
                {props.job && (
                    <Stack
                        direction="row"
                        columnGap={theme.spacing(3)}
                    >
                        <Work sx={{color: theme.palette.grey[400]}}/>
                        <Typography variant="body1" color={theme.palette.grey[400]}>
                            {props.job}
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Stack>
    )
}

export default ProfileData