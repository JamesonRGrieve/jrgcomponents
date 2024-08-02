import { MenuItem, Select } from '@mui/material';
import React from 'react';

interface SelectFieldProps {
  id: string;
  value: any;
  onChange: (event: any) => void;
  items: any[];
  name: string;
  label: string;
}

export default function SelectField({ id, value, onChange, items, name, label }: SelectFieldProps) {
  return (
    <Select id={id} value={value} onChange={onChange} label={label} name={name} displayEmpty>
      {items?.map((item: any, index: number) => (
        <MenuItem key={index} value={item.value ?? item}>
          {item.label ?? item}
        </MenuItem>
      ))}
    </Select>
  );
}
