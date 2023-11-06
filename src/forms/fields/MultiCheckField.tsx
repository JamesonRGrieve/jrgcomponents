import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from "@mui/material";
import React from "react";

export default function MultiCheckField(props: any) {
    return <FormControl required fullWidth sx={{my: "1rem"}}>
    <FormLabel key={"label"} id={props.id}>{props.label}</FormLabel>,
        <Typography key={"text"} variant="body1" gutterBottom>{props.desc}</Typography>,
        <FormGroup key={"field"}> {
          props.items.map((item: any, index: number) => {
            return (
              <FormControlLabel key={index} control={<Checkbox id={item.replace(/[\W_]+/g, "")} />} label={item} />
            );
          })}
        </FormGroup>
  </FormControl>;
}