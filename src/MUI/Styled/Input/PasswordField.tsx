import { TextField } from '@mui/material';
import React from 'react';

interface PasswordFieldProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  label?: string;
}

export default function PasswordField({ id, value, onChange, helperText, label }: PasswordFieldProps) {
  return (
    <TextField
      key={'field'}
      fullWidth
      id={id}
      label={helperText == null ? label : helperText}
      variant='outlined'
      type='password'
      required
      value={value}
      onChange={onChange}
    />
  );
}
