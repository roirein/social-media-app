import { useState } from 'react'
import {Button, Stack, TextField, Typography, useTheme} from '@mui/material'
import { AccountCircle, Email, Lock } from '@mui/icons-material'
import { useForm, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import TextInput from '@/components/UI/forms-input/TextInput'
import PasswordInput from '@/components/UI/forms-input/PasswordInput'
import userApi from '@/store/user/user-api'

const validationSchema = yup.object({
    username: yup
            .string()
            .required('username is required')
            .min(3, 'username must be at least 3 characters long'),
    email: yup
            .string().
            required('email is required')
            .email('invalid email address'),
    password: yup
            .string()
            .required('password is required')
            .min(6, 'password must be at least 6 characters long')
            .max(24, 'password cannot be more than 24 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,24}$/, 'password must include both uppercase and lowercase letters'),
    confirmPassword: yup
            .string()
            .required('confirm password is required')
            .oneOf([yup.ref('password'), null], 'passwords must match')
})

const SignupForm = (props) => {

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    })

    const theme = useTheme()

    const [submitted, setSubmitted] = useState(false);
    const serverError = useSelector(state => userApi.getError(state))
    const [showError, setShowError] = useState(false)

    const onSubmit = async (data) => {  
        try {
            await userApi.register(data)
            setSubmitted(true)
        } catch(e) {
            setShowError(true)
        }
    }

    if (submitted) {
        return (
            <Stack rowGap="16px" sx={{margin: '0 auto', width: '50%'}}>
                <Typography variant="h3" textAlign="center">
                    Signup Successfully!
                </Typography>
                <Typography variant='p' textAlign="center">
                    Confirmation link was sent to your email, please click it to activate your account
                </Typography>
            </Stack>
        )
    }

    return (
        <FormProvider {...methods}>
            <form  onSubmit={methods.handleSubmit(onSubmit)} style={{
                margin: '0 auto',
                width: '80%',
                padding: '16px'
            }} onBlur={() => setServerError(null)}>
                <Stack
                    direction="column"
                    rowGap="24px"
                >
                    <Typography variant="h3" textAlign="center" sx={{mb: '16px'}} color={theme.palette.primary.light}>
                        Signup
                    </Typography>
                    <TextInput
                        name="username"
                        label="username"
                        type="text"
                        inputProps={{
                            startAdornment: <AccountCircle fontSize="large"/>
                        }}
                    />
                    <TextInput
                        name="email"
                        label="email"
                        type="email"
                        inputProps={{
                            startAdornment: <Email fontSize="large"/>
                        }}
                    />
                    <PasswordInput
                        name="password"
                        label="password"
                    />
                    <PasswordInput
                        name="confirmPassword"
                        label="confirm password"
                    />
                    <Button type="submit" variant="contained" sx={{width: '50%', margin: '0 auto', backgroundColor: theme.palette.primary.light}}>
                        Signup
                    </Button>
                    {serverError && showError && (
                        <Typography color="red" textAlign="center">
                            {serverError}
                        </Typography>
                    )}
                    <Typography textAlign="center" sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            color: theme.palette.primary.light,
                            textDecoration: 'underline',
                            fontWeight: 'bold'
                        }
                    }} onClick={props.onSwitchLogin}>
                        Already have an account? click here to signin
                    </Typography>
                </Stack>
            </form>
        </FormProvider>
    )
}

export default SignupForm