import PasswordInput from "@/components/UI/forms-input/PasswordInput";
import { Button, FormControlLabel, Stack, Typography, Checkbox } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import { useState } from "react";
import {useRouter} from 'next/router'

const validationSchema = yup.object({
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


const ChangePasswordForm = (props) => {

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [serverError, setServerError] = useState(null);

    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${process.env.server_url}/auth/change-password/${router.query.token}`, {
                ...data,
                email: decodeURIComponent(router.query.email)
            })
            if (response.status === 200) {
                router.push('/')
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
                    width: '30%'
                }}
                onSubmit={methods.handleSubmit(onSubmit)}
                onBlur={() => setServerError(null)}
            >
                <Stack
                    direction="column"
                    rowGap="24px"
                >
                    <Typography variant="h3" textAlign="center" sx={{mb: '16px'}}>
                        Change Password
                    </Typography>
                    <PasswordInput
                        name="password"
                        label="password"
                    />
                    <PasswordInput
                        name="confirmPassword"
                        label="confirm password"
                    />
                    <Button type="submit" variant="contained" sx={{width: '50%', margin: '0 auto'}}>
                        Change Password 
                    </Button>
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

export default ChangePasswordForm