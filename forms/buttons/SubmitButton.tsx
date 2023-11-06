import { Button, FormControl } from "@mui/material";
import React from "react";

export default function SubmitButton(props: any) {
    console.log("Submit Button");
    return <FormControl required fullWidth sx={{ my: "1rem" }}>
        <Button variant="contained" type="submit">{props.label}</Button>
    </FormControl>;
}