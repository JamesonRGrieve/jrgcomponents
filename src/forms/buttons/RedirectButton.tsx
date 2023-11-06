import { Button, FormControl } from "@mui/material";
import Router from "next/router";
import React from "react";

export default function RedirectButton(props: any) {
    return <FormControl required fullWidth sx={{my: "1rem"}}>
    <Button variant="contained" onClick={() => {
          Router.push(props.url);
        }}>{props.label}</Button>
  </FormControl>;
}