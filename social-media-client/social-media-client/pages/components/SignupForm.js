import { useState } from 'react'
import {Button, Stack, TextField, Typography} from '@mui/material'
import { AccountCircle, Email, Lock } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'

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

    const {formState: {errors}, handleSubmit, control, clearErrors} = useForm({
        resolver: yupResolver(validationSchema)
    })

    const [submitted, setSubmitted] = useState(false)

    const onSubmit = async (data) => {  
        try {
            console.log(process.env)
            const response = await axios.post(`${process.env.server_url}/auth/register`, {
                ...data
            })
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
        <form  onSubmit={handleSubmit(onSubmit)} style={{
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
                <Controller
                    name="username"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="username"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <AccountCircle fontSize="large"/>
                            }}
                            error={!!errors.username}
                            helperText={errors.username ? errors.username.message : ''}
                            onBlur={() => clearErrors('username')}
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="email"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <Email fontSize="large"/>
                            }}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ''}
                            onBlur={() => clearErrors('email')}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <Lock fontSize="large"/>
                            }}
                            type="password"
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ''}
                            onBlur={() => clearErrors('password')}
                        />
                    )}
                />
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="confirm password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <Lock fontSize="large"/>
                            }}
                            type="password"
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                            onBlur={() => clearErrors('confirmPassword')}
                        />
                    )}
                />
                <Button type="submit" variant="contained" sx={{width: '50%', margin: '0 auto'}}>
                    Signup
                </Button>
            </Stack>
        </form>
    )
}

export default SignupForm