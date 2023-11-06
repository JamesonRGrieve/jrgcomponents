import { FormControl, FormLabel, TextField, Typography } from "@mui/material";
import React from "react";

export default function TimeField(props: any) {
    return <FormControl required fullWidth sx={{my: "1rem"}}>
        <FormLabel key={"label"} id={props.id}>{props.label}</FormLabel>,
        <Typography key={"text"} variant="body1" gutterBottom>{props.desc}</Typography>,
        <TextField key={"field"} fullWidth required id={props.id} label={props.label} type="time" defaultValue={(props.defaultValue) ? props.defaultValue : "02:00"} />
    </FormControl>;
}