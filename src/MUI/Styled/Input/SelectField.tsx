import { FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

interface SelectFieldProps {
  id: string;
  value: any;
  onChange: (event: any) => void;
  items: any[];
  name: string;
}

export default function SelectField({ id, value, onChange, items, name }: SelectFieldProps) {
  return (
    <FormControl fullWidth>
      <Select id={id} value={value} onChange={onChange} name={name} displayEmpty>
        {items?.map((item: any, index: number) => (
          <MenuItem key={index} value={item.value ?? item}>
            {item.label ?? item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
