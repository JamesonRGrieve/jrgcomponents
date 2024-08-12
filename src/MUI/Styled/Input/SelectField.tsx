import { MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

interface SelectFieldProps {
  id: string;
  value: any;
  onChange: (event: any) => void;
  items: any[];
  name: string;
  label: string;
}

export default function SelectField({ id, value, onChange, items, name, label }: SelectFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Select
      id={id}
      labelId={`${id}-label`}
      value={value}
      onChange={onChange}
      label={label}
      name={name}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      notched={isFocused}
      displayEmpty
    >
      {items?.map((item: any, index: number) => (
        <MenuItem key={index} value={item.value ?? item}>
          {item.label ?? item}
        </MenuItem>
      ))}
    </Select>
  );
}
