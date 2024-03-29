import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from '@mui/material';
import React from 'react';

export default function CheckField(props: any) {
  return (
    <FormGroup key={'field'}>
      <FormControlLabel
        control={<Checkbox required id={props.id} />}
        label={props.helperText == null ? props.label : props.helperText}
      />
    </FormGroup>
  );
}
