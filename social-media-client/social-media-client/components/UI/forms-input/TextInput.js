import { useFormContext, Controller } from "react-hook-form"
import { TextField, useTheme } from "@mui/material"

const TextInput = (props) => {
    
    const {control, formState: {errors}, clearErrors} = useFormContext()
    const theme = useTheme()

    return (
        <Controller
            name={props.name}
            control={control}
            render={({field}) => (
                <TextField
                    {...field}
                    type={props.type}
                    label={props.label}
                    variant="outlined"
                    InputProps={props.inputProps}
                    error={!!errors[props.name]}
                    helperText={errors[props.name] ? errors[props.name].message : ''}
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

export default TextInput