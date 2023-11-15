import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography
} from '@mui/material';
import React from 'react';

export default function CheckField(props: any) {
  return (
    <FormControl required fullWidth sx={{ my: '1rem' }}>
      <FormLabel key={'label'} id={props.id}>
        {props.label}
      </FormLabel>
      ,
      <Typography key={'text'} variant='body1' gutterBottom>
        {props.desc}
      </Typography>
      ,
      <FormGroup key={'field'}>
        <FormControlLabel
          control={<Checkbox required id={props.id} />}
          label={props.helperText == null ? props.label : props.helperText}
        />
      </FormGroup>
    </FormControl>
  );
}
