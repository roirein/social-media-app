import { useRef, useState } from "react"
import { Stack, Button, useTheme } from "@mui/material"

const CoverPhotoComponent = (props) => {

    const theme = useTheme()
    const coverImageInputRef = useRef()
    const [hoverCoverPhoto, setIsHoverCoverPhoto] = useState(false);

    return (
        <>
            <input type="file" id="fileInput" style={{display: 'none'}} accept="image/*" ref={coverImageInputRef} onChange={(e) => props.handleFileSelect(e, 'cover')}/>
            <Stack 
                height="25vh" 
                onMouseEnter={() => setIsHoverCoverPhoto(true)}
                onMouseLeave={() => setIsHoverCoverPhoto(false)}
                sx={{
                    backgroundColor: hoverCoverPhoto ? theme.palette.grey[100] : theme.palette.grey[200],
                    backgroundImage : props.newImage ? `url(${props.newImage})` : `url(${props.currentImage})`,
                    backgroundSize: 'cover'
                }}
            >
                {hoverCoverPhoto && props.showUploadButton && (
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
                {props.newImage && (
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
                            onClick={() => props.handleImageUpload('cover')}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained" 
                            sx={{
                                backgroundColor: theme.palette.primary.main
                            }}
                            onClick={() => {
                                coverImageInputRef.current.value = ''
                                props.onCancel()
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                )}
            </Stack>
        
        </>
    )
}

export default CoverPhotoComponent