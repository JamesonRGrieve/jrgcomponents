import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

interface SelectFieldProps {
  id: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  items: any[];
  name: string;
}

export default function RadioField({ id, value, onChange, items, name }: SelectFieldProps) {
  return (
    <RadioGroup key={'field'} aria-labelledby={id} id={id} name={id} value={value} onChange={onChange}>
      {items?.map((item: any, index: number) => {
        return (
          <FormControlLabel
            key={index}
            id={(item.value ?? item).replace(/[\W_]+/g, '')}
            value={item.value ?? item}
            control={<Radio />}
            name={name}
            label={item.label ?? item}
          />
        );
      })}
    </RadioGroup>
  );
}
