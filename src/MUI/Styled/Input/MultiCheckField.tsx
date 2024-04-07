import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';

export default function MultiCheckField(props: any) {
  return (
    <FormGroup key={'field'}>
      {' '}
      {props.items.map((item: any, index: number) => {
        return <FormControlLabel key={index} control={<Checkbox id={item.replace(/[\W_]+/g, '')} />} label={item} />;
      })}
    </FormGroup>
  );
}
