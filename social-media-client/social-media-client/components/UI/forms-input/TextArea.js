import { TextField } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form"

const TextArea = (props) => {

    const {control, formState: {errors}} = useFormContext()

    return (
        <Controller
            name={props.name}
            control={control}
            render={({field}) => (
                <TextField
                    {...field}
                    type="text"
                    fullWidth
                    rows={3}
                    multiline
                    variant="outlined"
                    label={props.label}
                />
            )}
        />
    )
}

export default TextArea