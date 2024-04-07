import { TextField as MuiTextField } from '@mui/material';
import React from 'react';

export default function TextField(props: any) {
  console.log('Text Field');
  return (
    <MuiTextField
      key={'field'}
      fullWidth
      id={props.id}
      label={props.helperText ?? props.label}
      variant='outlined'
      required
    />
  );
}
