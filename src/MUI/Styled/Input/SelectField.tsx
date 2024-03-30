import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';

export default function SelectField(props: any) {
  return (
    <RadioGroup key={'field'} aria-labelledby={props.id} id={props.id} name={props.id} defaultValue={0}>
      {props.items?.map((item: any, index: number) => {
        return (
          <FormControlLabel
            key={index}
            id={(item.value ?? item).replace(/[\W_]+/g, '')}
            value={item.value ?? item}
            control={<Radio />}
            label={item.label ?? item}
          />
        );
      })}
    </RadioGroup>
  );
}
