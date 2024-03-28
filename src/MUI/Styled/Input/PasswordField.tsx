import { FormControl, FormLabel, TextField, Typography } from '@mui/material';
import React from 'react';

export default function PasswordField(props: any) {
  return (
    <TextField
      key={'field'}
      fullWidth
      id={props.id}
      label={props.helperText == null ? props.label : props.helperText}
      variant='outlined'
      type='password'
      required
    />
  );
}
