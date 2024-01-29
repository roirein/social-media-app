import { Stack, Avatar, IconButton, Button, Menu, MenuItem, useTheme} from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import { useRef, useState } from "react"

const ProfilePhotoComponent = (props) => {

    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const profileImageInputRef = useRef();

    return (
        <Stack
            position="absolute"
            bottom={-70}
            left={20}
            right={0}
            justifyContent="center"
            alignItems="center"
            width="150px"
            height="150px"
            borderRadius="50%"
            bgcolor="white"
        >
            <input type="file" id="profileFileInput" style={{display: 'none'}} ref={profileImageInputRef} accept="image/*" onChange={(e) => props.handleFileSelect(e, 'profile')}/>
            <Avatar sx={{width: '95%', height: '95%', mt: theme.spacing(8) + theme.spacing(3)}} src={props.newImage ? props.newImage : props.currentImage ? props.currentImage : '/no-profile.jpeg'}/>
            {!props.newImage && props.showCameraIcon && (
                <>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            backgroundColor: theme.palette.background.main,
                            '&:hover': { backgroundColor: 'white' },
                        }}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                        <PhotoCamera/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        slotProps={{
                            paper: {
                                sx: {
                                    boxShadow: 2,
                                    width: '200px',
                                    px: theme.spacing(5),
                                    bgcolor: theme.palette.background.main
                                }
                            }
                        }}
                    >
                        <MenuItem onClick={() => profileImageInputRef.current.click()}>
                            Upload Profile Picture
                        </MenuItem>
                    </Menu>
                </>
            )}
            {props.newImage && (
                <Stack
                    direction="row"
                    columnGap={theme.spacing(4)}
                    sx={{
                        position: 'absolute', // Position the Stack absolutely
                        bottom:`-${theme.spacing(9)}`, // Adjust the bottom spacing
                        left: 0, // Align to the left
                        right: 0, // Align to the right
                    }}
                >
                    <Button 
                        variant="contained" 
                        sx={{
                            backgroundColor: theme.palette.primary.main
                        }}
                        onClick={() => props.handleImageUpload('profile')}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained" 
                        sx={{
                            backgroundColor: theme.palette.primary.main
                        }}
                        onClick={() => {
                            profileImageInputRef.current.value = ''
                            props.onCancel()
                        }}
                    >
                        Cancel
                    </Button>
                </Stack>

            )}
        </Stack>
    )
}

export default ProfilePhotoComponent