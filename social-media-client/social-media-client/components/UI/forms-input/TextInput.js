import { useFormContext, Controller } from "react-hook-form"
import { TextField } from "@mui/material"

const TextInput = (props) => {
    
    const {control, formState: {errors}, clearErrors} = useFormContext()

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
                />
            )}
        />
    )
}

export default TextInput