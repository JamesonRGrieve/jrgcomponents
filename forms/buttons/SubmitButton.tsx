import { Button, FormControl } from "@mui/material";

export default function SubmitButton(props: any) {
    return <FormControl required fullWidth sx={{ my: "1rem" }}>
        <Button variant="contained" type="submit">{props.label}</Button>
    </FormControl>;
}