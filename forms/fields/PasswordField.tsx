import { FormControl, FormLabel, TextField, Typography } from "@mui/material";

export default function PasswordField(props: any) {
    return <FormControl required fullWidth sx={{ my: "1rem" }}>
        <FormLabel key={"label"} id={props.label}>{props.label}</FormLabel>,
        <Typography key={"text"} variant="body1" gutterBottom>{props.desc}</Typography>,
        <TextField key={"field"} fullWidth id={props.id} label={(props.helperText == null) ? props.label : props.helperText} variant="outlined" type="password" required />
    </FormControl>;
}