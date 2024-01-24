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
import userApi from "@/store/user/user-api";
import { useSelector } from "react-redux";
import TextLink from "@/components/UI/forms-input/TextLink";

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
    const serverError = useSelector(state => userApi.getError(state))
    const [showError, setShowError] = useState(false)

    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            await userApi.login(data.email, data.password)
            router.push('/feed')
        } catch (e) {
            setShowError(true)
        }
    }

    return (
        <FormProvider {...methods}>
            <form
                style={{
                    margin: '0 auto',
                    width: '50%',
                    padding: '16px'
                }}
                onSubmit={methods.handleSubmit(onSubmit)}
                onBlur={() => setShowError(false)}
            >
                <Stack
                    direction="column"
                    rowGap="24px"
                >
                    <Typography variant="h2" textAlign="center" sx={{mb: '16px'}} color={theme.palette.primary.light} fontWeight="bold">
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
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
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
                        <TextLink
                            message="Forgot Password?"
                            onClick={props.onForgotPassword}
                        />
                    </Stack>
                    <Button type="submit" variant="contained">
                        Sign in
                    </Button>
                    <TextLink
                        message="Don't have an account yet? click here for creating one"
                        onClick={props.onSwitchSignup}
                    />
                    {serverError && showError && (
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