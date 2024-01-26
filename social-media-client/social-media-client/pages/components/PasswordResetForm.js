import PasswordInput from "@/components/UI/forms-input/PasswordInput";
import TextInput from "@/components/UI/forms-input/TextInput";
import { Email } from "@mui/icons-material";
import { Button, FormControlLabel, Stack, Typography, Checkbox, useTheme} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import { useState } from "react";
import {useRouter} from 'next/router'
import FormError from "@/components/UI/FormError";

const validationSchema = yup.object({
    email: yup
        .string().
        required('email is required')
        .email('invalid email address'),
})


const PasswordResetForm = (props) => {

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const theme = useTheme()

    const [serverError, setServerError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [email, setEmail] = useState(null)

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${process.env.server_url}/auth/reset-password`, {
                ...data,
            })
            if (response.status === 200) {
                setIsSubmitted(true)
            }
        } catch (e) {
            setServerError(e.response.data.message)
        }
    }

    if (isSubmitted) {
        return (
            <Stack>
                <Typography varinat="body1" textAlign="center">
                    Link for password reset was sent to your email address
                </Typography>
            </Stack>
        )
    }

    return (
        <FormProvider {...methods}>
            <form
                style={{
                    margin: '0 auto',
                    width: '80%',
                    padding: '16px'
                }}
                onSubmit={methods.handleSubmit(onSubmit)}
                onBlur={() => setServerError(null)}
            >
                <Stack
                    direction="column"
                    rowGap="24px"
                >
                    <Typography variant="h3" textAlign="center" sx={{mb: '16px'}} color={theme.palette.primary.light}>
                        Reset Password
                    </Typography>
                    <TextInput
                        name="email"
                        label="email"
                        type="email"
                        inputProps={{
                            startAdornment: <Email fontSize="large"/>
                        }}
                    />
                    <Button type="submit" variant="contained" sx={{width: '50%', margin: '0 auto', backgroundColor: theme.palette.primary.light}}>
                        Reset Password
                    </Button>
                    <TextLink
                        message="Back To Login"
                        onClick={props.onSwitchLogin}
                    />
                    {serverError && showError && (
                        <Stack width="100%" alignItems="center">
                            <FormError message={serverError}/>
                        </Stack>
                    )}
                    
                </Stack>
            </form>
        </FormProvider>
    )
}

export default PasswordResetForm