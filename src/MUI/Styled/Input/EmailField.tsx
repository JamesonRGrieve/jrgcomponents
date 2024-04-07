import { TextField } from '@mui/material';
import React from 'react';

export default function EmailField(props: any) {
  return (
    <TextField
      key={'field'}
      fullWidth
      id={props.id}
      label={props.helperText == null ? props.label : props.helperText}
      variant='outlined'
      type='email'
      required
    />
  );
}
