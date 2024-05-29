import { TextField as MuiTextField } from '@mui/material';
import React from 'react';

interface TextFieldProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  label?: string;
}

export default function TextField({ id, value, onChange, helperText, label }: TextFieldProps) {
  return (
    <MuiTextField
      fullWidth
      id={id}
      label={helperText == null ? label : helperText}
      variant='outlined'
      required
      value={value}
      onChange={onChange}
    />
  );
}
