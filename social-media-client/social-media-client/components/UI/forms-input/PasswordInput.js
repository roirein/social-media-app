import { useFormContext, Controller } from "react-hook-form"
import { IconButton, TextField } from "@mui/material"
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"

const PasswordInput = (props) => {
    
    const {control, formState: {errors}, clearErrors} = useFormContext()
    const [showPassword, setShowPassword] = useState(false)

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
                    helperText={errors[props.name] ? errors[props.name].message : ''}
                    onBlur={() => clearErrors(props.name)}
                />
            )}
        />
    )
}

export default PasswordInput