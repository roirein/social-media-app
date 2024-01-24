import { useState } from "react"
import { Stack, Button, useTheme } from "@mui/material"
import profileApi from "@/store/profile/profile-api"
import { useSelector } from "react-redux"

const CoverPhotoComponent = () => {

    const imageUrl = useSelector(state => profileApi.getImage(state)) 

    const [imageDataUrl, setImageDataUrl] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const theme = useTheme()

    const clickUploadImage = () => {
        document.getElementById('fileInput').click()
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImageFile(file)
                setImageDataUrl(ev.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleImageUpload = async () => {
        const formData = new FormData()
        formData.append('profile', imageFile)
        await profileApi.uploadImage('cover', formData)
        setImageDataUrl(null)
        setImageFile(null)
    }

    return (
        <Stack
            width="100%"
            height="25vh"
            alignItems="flex-end"
            justifyContent="flex-end"
            sx={{
                background: imageUrl ? `url(${imageUrl})` : (imageDataUrl ? `url(${imageDataUrl})` : theme.palette.primary.main),
                backgroundSize: 'cover'
            }}
        >
            <input type="file" id="fileInput" style={{display: 'none'}} accept="image/*" onChange={handleFileSelect}/>
            {!imageFile && !imageUrl && (
                <Button 
                    variant="contained" 
                    sx={{
                        mb: theme.spacing(6), 
                        mr: theme.spacing(6), 
                        backgroundColor: theme.palette.primary.light
                    }}
                    onClick={clickUploadImage}
                >
                    Upload cover picture
                </Button>
            )}
            {imageFile && (
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
    )
}

export default CoverPhotoComponent