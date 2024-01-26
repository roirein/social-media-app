import { useFormContext, Controller } from "react-hook-form"
import { IconButton, TextField, useField } from "@mui/material"
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"
import { useTheme } from "@emotion/react"
import FormError from "../FormError"

const PasswordInput = (props) => {
    
    const {control, formState: {errors}, clearErrors} = useFormContext()
    const [showPassword, setShowPassword] = useState(false)
    const theme = useTheme()

    const getErrDeatils = (type) => {
        if (type === 'password') {
            return 'password must be 6 to 24 characters long, include lowercase and uppercase, number and a special character'
        } else {
            return 'confirm password must match password field'
        }
    }

    return (
        <Controller
            name={props.name}
            control={control}
            render={({field}) => (
                <TextField
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label={props.label}
                    variant="outlined"
                    InputProps={{
                        startAdornment: <Lock fontSize="large"/>,
                        endAdornment: <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Visibility fontSize="large"/> : <VisibilityOff fontSize="large"/>}
                        </IconButton>
                    }}
                    error={!!errors[props.name]}
                    helperText={errors[props.name] ? <FormError message={errors[props.name].message} details={getErrDeatils(props.name)} showTooltip/> : ''}
                    onBlur={() => clearErrors(props.name)}
                    sx={{
                        '& .MuiInput-underline:after': {
                          borderBottomColor: theme.palette.primary.main,
                        },
                        '& label.Mui-focused': {
                            color: theme.palette.primary.main,
                        },
                        '& label': {
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }
                    }}
                />
            )}
        />
    )
}

export default PasswordInput