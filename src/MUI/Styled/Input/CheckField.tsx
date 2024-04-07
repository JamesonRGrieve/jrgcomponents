import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
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
