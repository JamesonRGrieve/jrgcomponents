import { FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

interface SelectFieldProps {
  id: string;
  value: any;
  onChange: (event: any) => void;
  items: any[];
}

export default function SelectField({ id, value, onChange, items }: SelectFieldProps) {
  return (
    <FormControl fullWidth>
      <Select value={value} onChange={onChange} displayEmpty>
        {items?.map((item: any, index: number) => (
          <MenuItem key={index} value={item.value ?? item}>
            {item.label ?? item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
