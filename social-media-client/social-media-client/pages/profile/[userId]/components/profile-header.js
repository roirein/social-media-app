import profileApi from "@/store/profile/profile-api"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { Stack, Avatar, useTheme, Button, Menu, MenuItem, IconButton, Backdrop } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useRouter } from "next/router";
import userApi from "@/store/user/user-api";

//next tasks
//handle profile upload - done
//display and editing data -TBD
//differntiate between logged in user profile to other profile - done

const ProfileHeaderComponent = (props) => {

    const theme = useTheme()

    const {coverImage, profileImage, isCurrentUserProfile} = props

    const [profileImageUrl, setProfileImageUrl] = useState(null)
    const [hoverCoverPhoto, setIsHoverCoverPhoto] = useState(false);
    const [coverImageUrl, setCoverImageUrl] = useState(null)
    const [imageToSend, setImageToSend] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const profileImageInputRef = useRef();
    const coverImageInputRef = useRef()

    const handleFileSelect = (e, imageType) => {
        console.log(e.target.files)
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImageToSend(file)
                imageType === 'profile' ? setProfileImageUrl(ev.target.result) : setCoverImageUrl(ev.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    
    const handleImageUpload = async (imageType) => {
        const formData = new FormData()
        formData.append('profile', imageToSend)
        props.onUploadImage(imageType, formData)
        setCoverImageUrl(null)
        setProfileImageUrl(null)
        setImageToSend(null)
        setAnchorEl(null)
    }

    return (
        <Stack width="100%" position="relative">
            <input type="file" id="fileInput" style={{display: 'none'}} accept="image/*" ref={coverImageInputRef} onChange={(e) => handleFileSelect(e, 'cover')}/>
            <Stack 
                height="25vh" 
                onMouseEnter={() => setIsHoverCoverPhoto(true)}
                onMouseLeave={() => setIsHoverCoverPhoto(false)}
                sx={{
                    backgroundColor: hoverCoverPhoto ? theme.palette.grey[100] : theme.palette.grey[200],
                    backgroundImage : coverImageUrl ? `url(${coverImageUrl})` : `url(${coverImage})`,
                    backgroundSize: 'cover'
                }}
            >
            {hoverCoverPhoto && !coverImageUrl && isCurrentUserProfile && (
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
                    onClick={() => coverImageInputRef.current.click()}
                >
                    Upload cover picture
                </Button>
            )}
            {coverImageUrl && (
                <Stack
                    direction="row"
                    sx={{
                        ml: 'auto',
                        mt: 'auto',
                        mr: theme.spacing(5),
                        mb: theme.spacing(5)
                    }}
                    columnGap={theme.spacing(5)}
                >
                    <Button 
                        variant="contained" 
                        sx={{
                            backgroundColor: theme.palette.primary.main
                        }}
                        onClick={() => handleImageUpload('cover')}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained" 
                        sx={{
                            backgroundColor: theme.palette.primary.main
                        }}
                        onClick={() => {
                            setImageToSend(null)
                            coverImageInputRef.current.value = ''
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
                <input type="file" id="profileFileInput" style={{display: 'none'}} ref={profileImageInputRef} accept="image/*" onChange={(e) => handleFileSelect(e, 'profile')}/>
                <Avatar sx={{width: '95%', height: '95%', mt: theme.spacing(8) + theme.spacing(3)}} src={profileImageUrl ? profileImageUrl : profileImage ? profileImage : '/no-profile.jpeg'}/>
                {!profileImageUrl && isCurrentUserProfile && (
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
                {profileImageUrl && (
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
                            onClick={() => handleImageUpload('profile')}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained" 
                            sx={{
                                backgroundColor: theme.palette.primary.main
                            }}
                            onClick={() => {
                                setImageToSend(null)
                                setProfileImageUrl(null)
                                profileImageInputRef.current.value = ''
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>

                )}
            </Stack>
        </Stack>
    )
}

export default ProfileHeaderComponent