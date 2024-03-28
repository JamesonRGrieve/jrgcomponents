import { FormControl, FormLabel, TextField, Typography } from '@mui/material';
import React from 'react';

export default function TimeField(props: any) {
  return (
    <TextField
      key={'field'}
      fullWidth
      required
      id={props.id}
      label={props.label}
      type='time'
      defaultValue={props.defaultValue ? props.defaultValue : '02:00'}
    />
  );
}
