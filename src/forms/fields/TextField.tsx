import { FormControl, FormLabel, Typography, TextField as MuiTextField } from '@mui/material';
import React from 'react';

export default function TextField(props: any) {
  console.log('Text Field');
  return (
    <FormControl required fullWidth sx={{ my: '1rem' }}>
      <FormLabel key={'label'} id={props.label}>
        {props.label}
      </FormLabel>
      <Typography key={'text'} variant='body1' gutterBottom>
        {props.desc}
      </Typography>
      <MuiTextField
        key={'field'}
        fullWidth
        id={props.id}
        label={props.helperText ?? props.label}
        variant='outlined'
        required
      />
    </FormControl>
  );
}
