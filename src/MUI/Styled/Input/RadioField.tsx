import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

interface SelectFieldProps {
  id: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  items: any[];
}

export default function SelectField({ id, value, onChange, items }: SelectFieldProps) {
  return (
    <RadioGroup key={'field'} aria-labelledby={id} id={id} name={id} value={value} onChange={onChange}>
      {items?.map((item: any, index: number) => {
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
