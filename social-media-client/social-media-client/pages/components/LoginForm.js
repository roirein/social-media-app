import PasswordInput from "@/components/UI/forms-input/PasswordInput";
import TextInput from "@/components/UI/forms-input/TextInput";
import { Email } from "@mui/icons-material";
import { Button, FormControlLabel, Stack, Typography, Checkbox, useTheme } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import { useState } from "react";
import {useRouter} from 'next/router'

const validationSchema = yup.object({
    email: yup
        .string().
        required('email is required')
        .email('invalid email address'),
    password: yup
        .string()
        .required('password is required')
        .min(6, 'password must be at least 6 characters long')
        .max(24, 'password cannot be more than 24 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,24}$/, 'password must include both uppercase and lowercase letters')
})


const LoginForm = (props) => {

    const theme = useTheme()

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [rememberMe, setRememberMe] = useState(false);
    const [serverError, setServerError] = useState(null);

    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${process.env.server_url}/auth/login`, {
                ...data,
                rememberMe: rememberMe
            })
            if (response.status === 200) {
                const userId = response.data.id
                
                router.push(`/profile/${userId}`)
            }
        } catch (e) {
            setServerError(e.response.data.message)
        }
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
                        Sign in
                    </Typography>
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
                    <FormControlLabel control={<Checkbox 
                                    onChange={() => setRememberMe((prev) => !prev)} 
                                    value={rememberMe}
                                    sx={{
                                        '&.Mui-checked': {
                                          color: theme.palette.primary.light, // This is the color when the checkbox is checked
                                        },
                                    }}
                                />} 
                        label={<span style={{ fontSize: '16px' }}>Remember me</span>}  
                    />
                    <Button type="submit" variant="contained" sx={{width: '50%', margin: '0 auto', backgroundColor: theme.palette.primary.light}}>
                        Sign in
                    </Button>
                    <Typography textAlign="center" sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                color: theme.palette.primary.light,
                                textDecoration: 'underline',
                                fontWeight: 'bold'
                            },
                            position: 'relative',
                            bottom: '8px'
                        }} onClick={props.onSwitchSignup} variant="caption">
                            Don't have an account yet? click here for creating one
                    </Typography>
                    <Typography 
                            variant="caption"
                            fontSize="18px"
                            textAlign="center"
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    color: theme.palette.primary.light,
                                    textDecoration: 'underline',
                                    fontWeight: 'bold'
                                },
                            }}
                            onClick={props.onForgotPassword}
                        >
                            Forgot Password?
                    </Typography>
                    {serverError && (
                        <Typography color="red" textAlign="center">
                            {serverError}
                        </Typography>
                    )}
                </Stack>
            </form>
        </FormProvider>
    )
}

export default LoginForm