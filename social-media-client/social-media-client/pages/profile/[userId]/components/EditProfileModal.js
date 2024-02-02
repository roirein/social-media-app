import TextArea from "@/components/UI/forms-input/TextArea"
import TextInput from "@/components/UI/forms-input/TextInput"
import { AccountCircle, LocationOn, Work } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogTitle, Stack, Typography, useTheme } from "@mui/material"
import { useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import * as yup from "yup"

const validationSchema = yup.object({
    displayName: yup
        .string().
        required('email is required')
})

const EditProfileModal = (props) => {

    const methods = useForm({
        validationSchema,
        defaultValues: {
            displayName: props?.profile?.displayName,
            location: props?.profile?.location,
            job: props?.profile?.job,
            bio: props?.profile?.bio
        }
    })
    const theme = useTheme()
    const submitRef = useRef()

    const onSubmit = (data) => {
        props.onEditProfile(data)
    }

    return (
        <Dialog
            onClose={props.onClose}
            open={props.open}
            maxWidth="md"
        >
            <DialogTitle>
                <Typography variant="h4">
                    Edit Profile
                </Typography>
            </DialogTitle>
            <FormProvider {...methods}>
                <form
                    style={{
                        width: '35vw',
                        padding: '16px',
                        height: '100%',
                        rowGap: "12px"
                    }}
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <TextArea
                        name="bio"
                        label="bio"
                    />
                    <Stack
                        width="100%"
                        direction="column"
                        rowGap={theme.spacing(5)}
                        sx={{mt: theme.spacing(5)}}
                    >
                        <TextInput 
                            name="displayName"
                            label="display name"
                            inputProps={{
                                startAdornment: <AccountCircle fontSize="large"/>
                            }}
                        />
                        <TextInput 
                            name="job"
                            label="job"
                            inputProps={{
                                startAdornment: <Work fontSize="large"/>
                            }}
                        />
                        <TextInput
                            name="location"
                            label="location"
                            inputProps={{
                                startAdornment: <LocationOn fontSize="large"/>
                            }}
                        />
                    </Stack>
                    <button type="submit" style={{display: 'none'}} ref={submitRef} aria-hidden/>
                </form>
            </FormProvider>
            <DialogActions>
                <Stack
                    direction="row"
                    columnGap={theme.spacing(5)}
                >
                    <Button variant="contained" onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => {
                        submitRef.current.click()
                    }}>
                        Save
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}

export default EditProfileModal