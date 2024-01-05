import { useFormContext, Controller } from "react-hook-form"
import { IconButton, TextField, useField } from "@mui/material"
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"
import { useTheme } from "@emotion/react"

const PasswordInput = (props) => {
    
    const {control, formState: {errors}, clearErrors} = useFormContext()
    const [showPassword, setShowPassword] = useState(false)
    const theme = useTheme()

    return (
        <Controller
            name={props.name}
            control={control}
            render={({field}) => (
                <TextField
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label={props.label}
                    variant="standard"
                    InputProps={{
                        startAdornment: <Lock fontSize="large"/>,
                        endAdornment: <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Visibility fontSize="large"/> : <VisibilityOff fontSize="large"/>}
                        </IconButton>
                    }}
                    error={!!errors[props.name]}
                    helperText={errors[props.name] ? errors[props.name].message : ''}
                    onBlur={() => clearErrors(props.name)}
                    sx={{
                        '& .MuiInput-underline:after': {
                          borderBottomColor: theme.palette.primary.light,
                        },
                        '& label.Mui-focused': {
                            color: theme.palette.primary.light,
                        }
                    }}
                />
            )}
        />
    )
}

export default PasswordInput