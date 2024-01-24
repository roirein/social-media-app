import profileApi from "@/store/profile/profile-api"
import { useState } from "react";
import { useSelector } from "react-redux"
import { Stack, Avatar, useTheme, Button, Menu, MenuItem, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

//next task
// add functionality to profile header
// upload profile data on login
// finish rest of the profile page

const ProfileHeaderComponent = () => {

    const theme = useTheme()

    const profileImage = useSelector(state => profileApi.getImage(state, 'profile'));
    const coverImage = useSelector(state => profileApi.getImage(state, 'cover'))

    const [profileImageUrl, setProfileImageUrl] = useState(null)
    const [coverImageUrl, setCoverImageUrl] = useState(null)
    const [imageToSend, setImageToSend] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const clickUploadImage = () => {
        document.getElementById('fileInput').click()
    }

    const handleFileSelect = (e, imageType) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImageToSend({image: file, type: imageType})
                imageType === 'profile' ? setProfileImageUrl(ev.target.result) : setCoverImageUrl
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Stack width="100%" position="relative">
            <input type="file" id="fileInput" style={{display: 'none'}} accept="image/*" onChange={handleFileSelect}/>
            <Stack 
                height="25vh" 
                backgroundColor={!coverImage && !coverImageUrl ? theme.palette.primary.main : 'transparent'}
            >
            {!coverImageUrl && (
                <Button 
                    variant="contained" 
                    sx={{
                        width: '217px',
                        mt: 'auto', 
                        ml: 'auto', 
                        mr: theme.spacing(5),
                        mb: theme.spacing(6),
                        backgroundColor: theme.palette.primary.light
                    }}
                    onClick={clickUploadImage}
                >
                    Upload cover picture
                </Button>
            )}
            {coverImageUrl && (
                <Stack
                    direction="row"
                    sx={{
                        mb: theme.spacing(6), 
                        mr: theme.spacing(6), 
                    }}
                    columnGap={theme.spacing(5)}
                >
                    <Button 
                        variant="contained" 
                        sx={{
                            backgroundColor: theme.palette.primary.light
                        }}
                        onClick={handleImageUpload}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained" 
                        sx={{
                            backgroundColor: theme.palette.primary.light
                        }}
                        onClick={() => {
                            setImageFile(null)
                            document.getElementById('fileInput').value = ''
                        }}
                    >
                        Cancel
                    </Button>
                </Stack>
            )}
            </Stack>
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
                <Avatar sx={{width: '95%', height: '95%'}} src="/no-profile.jpeg"/>
                <IconButton
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        backgroundColor: theme.palette.primary.main,
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
                                bgcolor: theme.palette.primary.main
                            }
                        }
                    }}
                >
                    <MenuItem onClick={() => {}}>
                        Upload Profile Picture
                    </MenuItem>
                </Menu>
            </Stack>
        </Stack>
    )
}

export default ProfileHeaderComponent