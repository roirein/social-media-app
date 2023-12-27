import { useState } from 'react'
import {Button, Stack, TextField, Typography} from '@mui/material'
import { AccountCircle, Email, Lock } from '@mui/icons-material'
import { useForm, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import TextInput from '@/components/UI/forms-input/TextInput'
import PasswordInput from '@/components/UI/forms-input/PasswordInput'

//add-hide/show password functionality
//add server errors handling

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

const SignupForm = () => {

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    })

    const [submitted, setSubmitted] = useState(false)

    const onSubmit = async (data) => {  
        try {
            const response = await axios.post(`${process.env.server_url}/auth/register`, {
                ...data
            })
            console.log(response)
            if (response.status === 201) {
                setSubmitted(true)
            }
        } catch(e) {
            console.log(e)
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
                width: '30%'
            }}>
            <Stack
                direction="column"
                rowGap="24px"
            >
                <Typography variant="h3" textAlign="center" sx={{mb: '16px'}}>
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
                <Button type="submit" variant="contained" sx={{width: '50%', margin: '0 auto'}}>
                    Signup
                </Button>
            </Stack>
        </form>
        </FormProvider>
    )
}

export default SignupForm