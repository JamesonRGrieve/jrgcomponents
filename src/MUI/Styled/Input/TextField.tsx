import { TextField as MuiTextField } from '@mui/material';
import React from 'react';

interface TextFieldProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  label?: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
}

export default function TextField({
  id,
  value,
  onChange,
  helperText,
  label,
  placeholder,
  name,
  autoComplete,
}: TextFieldProps) {
  return (
    <MuiTextField
      fullWidth
      id={id}
      autoComplete={autoComplete}
      name={name}
      label={helperText ?? label}
      variant='outlined'
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
    />
  );
}
